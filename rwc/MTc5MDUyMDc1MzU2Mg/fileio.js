// Gandi Format (from RemixWarp, id=fileio)
/**
 * 文件读写 · TurboWarp / Scratch 3 自定义扩展
 *
 * 让 Scratch 项目可以「读文件 / 写文件 / 下载文件 / 本地存档」。
 *
 * ⚠️ 能力边界（浏览器的硬性限制，务必先读）：
 *   浏览器里的 Scratch **不能像 Node 那样随意读写磁盘任意路径**，本扩展提供三条路：
 *   1. 读文件：弹出系统文件选择框 → 用户选中后读成文本（所有浏览器可用）；
 *   2. 写文件：Chrome / Edge / TurboWarp 桌面版支持 File System Access API，
 *      用户授权一个文件后，**可以反复把内容真正写进磁盘上的这个文件**；
 *      Firefox / Safari 不支持 → 请改用「下载文件」（内容会存到"下载"文件夹）。
 *   3. 本地存档：localStorage 键值存取，跨"关掉页面再打开"保留（不是磁盘文件）。
 *
 * ⚠️ 必须非沙盒运行（需要文件选择框与磁盘访问）。
 * ⚠️ 弹出文件选择框必须发生在"用户点击"之后：请把选择类积木放在
 *    「当绿旗被点击」的**第一块**（点绿旗算用户操作），否则浏览器会拒绝。
 *
 * 积木（扩展分类「文件读写」）：
 *   读取：选择文件并读取内容 / 文件内容 / 已选文件名
 *   写入：选择要写入的文件 / 把 [内容] 写入已选文件 / 浏览器支持写文件？
 *   导出：下载文件 [名] 内容 [内容]（全浏览器可用）
 *   存档：保存本地数据 [键] 为 [值] / 读取本地数据 [键] / 删除本地数据 [键]
 *   排障：最近提示
 */
(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      '「文件读写」扩展要打开系统文件选择框并写入磁盘，必须非沙盒(unsandboxed)运行：' +
        '加载时请勾选 "Run extension without sandbox"。'
    );
  }

  const BlockType = Scratch.BlockType;
  const ArgumentType = Scratch.ArgumentType;
  const EXT_ID = 'fileio';

  const STORE_PREFIX = 'scratchFileIO:';

  /** 当前环境是否支持 File System Access API（可真正写文件） */
  function detectFsa() {
    try {
      return (
        typeof globalThis !== 'undefined' &&
        typeof globalThis.showOpenFilePicker === 'function' &&
        typeof globalThis.showSaveFilePicker === 'function'
      );
    } catch (err) {
      return false;
    }
  }

  function toStr(v) {
    if (typeof v === 'string') return v;
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    return '';
  }

  /** 把错误翻译成对学生友好的中文提示 */
  function explainError(err) {
    const name = (err && err.name) || '';
    const msg = (err && err.message) || String(err);
    if (name === 'AbortError') return '已取消选择文件';
    if (name === 'SecurityError' || /user gesture|user activation/i.test(msg)) {
      return '浏览器要求"先点击再选文件"：请把本积木放在「当绿旗被点击」后的第一块（中间不要有等待），或使用扩展面板上的按钮积木';
    }
    if (name === 'NotAllowedError') return '浏览器拒绝了文件访问权限';
    if (/not supported|undefined is not/i.test(msg)) return '当前浏览器不支持该功能，请改用「下载文件」或 Chrome/Edge/桌面版';
    return '操作失败：' + (msg || name || '未知错误');
  }

  function safeName(name) {
    let s = String(name || '').trim();
    if (!s) s = 'scratch-data.txt';
    // 去掉路径分隔符等非法字符，避免保存出问题
    s = s.replace(/[\\/:*?"<>|]/g, '_');
    return s;
  }

  function guessMime(name) {
    const lower = name.toLowerCase();
    if (lower.endsWith('.json')) return 'application/json';
    if (lower.endsWith('.csv')) return 'text/csv';
    if (lower.endsWith('.html') || lower.endsWith('.htm')) return 'text/html';
    if (lower.endsWith('.md')) return 'text/markdown';
    return 'text/plain';
  }

  class FileIO {
    constructor() {
      // 注意：字段名不能与积木方法名(fileContent/fileName)相同，否则会遮蔽方法
      this.content = '';        // 最近读到的文本内容
      this.pickedName = '';     // 最近读到的文件名
      this.writeHandle = null;  // 已授权写入的文件句柄
      this.writeName = '';
      this.noticeText = '';
      this.supportsWrite = detectFsa();
    }

    getInfo() {
      const blocks = [
        {
          opcode: 'pickReadFile',
          blockType: BlockType.COMMAND,
          text: '选择文件并读取内容',
        },
        {
          opcode: 'fileContent',
          blockType: BlockType.REPORTER,
          text: '文件内容',
        },
        {
          opcode: 'fileName',
          blockType: BlockType.REPORTER,
          text: '已选文件名',
        },
        '---',
        {
          opcode: 'pickWriteFile',
          blockType: BlockType.COMMAND,
          text: '选择要写入的文件',
        },
        {
          opcode: 'writeFile',
          blockType: BlockType.COMMAND,
          text: '把 [CONTENT] 写入已选文件',
          arguments: {
            CONTENT: { type: ArgumentType.STRING, defaultValue: 'Hello from Scratch!' },
          },
        },
        {
          opcode: 'canWriteFile',
          blockType: BlockType.BOOLEAN,
          text: '浏览器支持写文件？',
        },
        '---',
        {
          opcode: 'downloadFile',
          blockType: BlockType.COMMAND,
          text: '下载文件 [NAME] 内容 [CONTENT]',
          arguments: {
            NAME: { type: ArgumentType.STRING, defaultValue: 'scratch-data.txt' },
            CONTENT: { type: ArgumentType.STRING, defaultValue: 'Hello from Scratch!' },
          },
        },
        '---',
        {
          opcode: 'saveStore',
          blockType: BlockType.COMMAND,
          text: '保存本地数据 [KEY] 为 [VALUE]',
          arguments: {
            KEY: { type: ArgumentType.STRING, defaultValue: '存档1' },
            VALUE: { type: ArgumentType.STRING, defaultValue: '100' },
          },
        },
        {
          opcode: 'loadStore',
          blockType: BlockType.REPORTER,
          text: '读取本地数据 [KEY]',
          arguments: {
            KEY: { type: ArgumentType.STRING, defaultValue: '存档1' },
          },
        },
        {
          opcode: 'deleteStore',
          blockType: BlockType.COMMAND,
          text: '删除本地数据 [KEY]',
          arguments: {
            KEY: { type: ArgumentType.STRING, defaultValue: '存档1' },
          },
        },
        '---',
        {
          opcode: 'notice',
          blockType: BlockType.REPORTER,
          text: '最近提示',
        },
      ];

      // 按钮积木属于 scratch-vm 的 BUTTON 类型（用 func 指定要调用的方法）。
      // 只有在当前版本确实支持时才加入，避免不同版本导致扩展加载失败。
      if (BlockType.BUTTON) {
        blocks.unshift(
          {
            opcode: 'pickReadFileButton',
            blockType: BlockType.BUTTON,
            text: '点这里：选择文件并读取',
            func: 'pickReadFile',
          },
          {
            opcode: 'pickWriteFileButton',
            blockType: BlockType.BUTTON,
            text: '点这里：选择要写入的文件',
            func: 'pickWriteFile',
          }
        );
      }

      return {
        id: EXT_ID,
        name: '文件读写',
        color1: '#ff8c1a',
        color2: '#e07610',
        color3: '#b85c08',
        blocks,
      };
    }

    /* ================= 读取文件 ================= */

    /** 选择文件并读取内容（异步：等用户选完再继续后面的积木） */
    async pickReadFile() {
      try {
        if (this.supportsWrite) {
          const handles = await globalThis.showOpenFilePicker({ multiple: false });
          const handle = handles && handles[0];
          if (!handle) return;
          const file = await handle.getFile();
          this.content = await file.text();
          this.pickedName = file.name;
          this._notice(`已读取文件「${file.name}」（${this.content.length} 字符）`);
        } else {
          const result = await this._readViaInput();
          this.content = result.content;
          this.pickedName = result.name;
          this._notice(`已读取文件「${result.name}」（${this.content.length} 字符）`);
        }
      } catch (err) {
        this._notice(explainError(err));
      }
    }

    /** 不支持 File System Access 时的回退：<input type="file"> + FileReader */
    _readViaInput() {
      return new Promise((resolve, reject) => {
        const doc = globalThis.document;
        const input = doc.createElement('input');
        input.type = 'file';
        input.accept = '.txt,.json,.csv,.md,text/*';
        if (input.style) input.style.display = 'none';

        let settled = false;
        const cleanup = () => {
          try {
            input.remove();
          } catch (err) {
            /* 忽略 */
          }
        };
        const finish = (fn, arg) => {
          if (settled) return;
          settled = true;
          cleanup();
          fn(arg);
        };
        const cancelled = () => finish(reject, { name: 'AbortError', message: 'cancelled' });

        input.addEventListener('change', () => {
          const file = input.files && input.files[0];
          if (!file) return cancelled();
          try {
            const reader = new globalThis.FileReader();
            reader.onload = () => finish(resolve, { name: file.name, content: String(reader.result) });
            reader.onerror = () => finish(reject, new Error('读取文件失败'));
            reader.readAsText(file);
          } catch (err) {
            finish(reject, err);
          }
        });
        // 现代浏览器的"取消选择"事件
        input.addEventListener('cancel', cancelled);

        if (doc.body) doc.body.appendChild(input);
        try {
          input.click();
        } catch (err) {
          finish(reject, err);
          return;
        }
        // 兜底：窗口重新获得焦点但仍没选到文件 → 视为取消（避免脚本卡死）
        if (typeof globalThis.addEventListener === 'function') {
          globalThis.addEventListener(
            'focus',
            () => {
              setTimeout(() => {
                if (!settled && (!input.files || input.files.length === 0)) cancelled();
              }, 500);
            },
            { once: true }
          );
        }
      });
    }

    /* ================= 写入文件 ================= */

    /** 选择要写入的文件（获得长期授权，可反复写入） */
    async pickWriteFile() {
      if (!this.supportsWrite) {
        this._notice('当前浏览器不支持写入文件：请用 Chrome / Edge / TurboWarp 桌面版，或改用「下载文件」积木');
        return;
      }
      try {
        const handle = await globalThis.showSaveFilePicker({
          suggestedName: 'scratch-data.txt',
          types: [{ description: '文本文件', accept: { 'text/plain': ['.txt', '.json', '.csv', '.md'] } }],
        });
        this.writeHandle = handle || null;
        this.writeName = handle && handle.name ? handle.name : '';
        this._notice(`已选择写入文件「${this.writeName}」，之后可用「把 … 写入已选文件」保存`);
      } catch (err) {
        this._notice(explainError(err));
      }
    }

    /** 把内容写入已选文件（没选过则先弹出保存框） */
    async writeFile(args) {
      const content = toStr(args && args.CONTENT);
      if (!this.supportsWrite) {
        this._notice('当前浏览器不支持写入文件：请用 Chrome / Edge / TurboWarp 桌面版，或改用「下载文件」积木');
        return;
      }
      try {
        let handle = this.writeHandle;
        if (!handle) {
          handle = await globalThis.showSaveFilePicker({
            suggestedName: 'scratch-data.txt',
            types: [{ description: '文本文件', accept: { 'text/plain': ['.txt', '.json', '.csv', '.md'] } }],
          });
          this.writeHandle = handle || null;
          this.writeName = handle && handle.name ? handle.name : '';
        }
        if (!handle) return;

        // 跨会话重新打开项目时可能还是"需要询问"状态
        if (typeof handle.queryPermission === 'function') {
          let perm = await handle.queryPermission({ mode: 'readwrite' });
          if (perm !== 'granted' && typeof handle.requestPermission === 'function') {
            perm = await handle.requestPermission({ mode: 'readwrite' });
          }
          if (perm !== 'granted') {
            this._notice('没有写入权限（浏览器要求重新授权：请再点一次绿旗后立即执行本积木）');
            return;
          }
        }

        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
        this._notice(`已写入「${this.writeName || '文件'}」（${content.length} 字符）`);
      } catch (err) {
        this._notice(explainError(err));
      }
    }

    canWriteFile() {
      return this.supportsWrite;
    }

    /* ================= 下载导出（全浏览器可用） ================= */

    downloadFile(args) {
      try {
        const name = safeName(args && args.NAME);
        const content = toStr(args && args.CONTENT);
        const doc = globalThis.document;
        const blob = new Blob([content], { type: guessMime(name) + ';charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = doc.createElement('a');
        a.href = url;
        a.download = name;
        if (a.style) a.style.display = 'none';
        if (doc.body) doc.body.appendChild(a);
        a.click();
        setTimeout(() => {
          try {
            a.remove();
          } catch (err) {
            /* 忽略 */
          }
          try {
            URL.revokeObjectURL(url);
          } catch (err) {
            /* 忽略 */
          }
        }, 1000);
        this._notice(`已下载文件「${name}」（可在浏览器"下载"文件夹里找到）`);
      } catch (err) {
        this._notice(explainError(err));
      }
    }

    /* ================= 本地存档（localStorage） ================= */

    saveStore(args) {
      const key = toStr(args && args.KEY);
      if (!key) {
        this._notice('请先填写要保存的数据名');
        return;
      }
      try {
        globalThis.localStorage.setItem(STORE_PREFIX + key, toStr(args && args.VALUE));
        this._notice(`已保存本地数据「${key}」`);
      } catch (err) {
        this._notice('本地保存失败：浏览器可能禁用了本地存储（无痕模式/隐私设置）');
      }
    }

    loadStore(args) {
      const key = toStr(args && args.KEY);
      if (!key) return '';
      try {
        const v = globalThis.localStorage.getItem(STORE_PREFIX + key);
        return v === null ? '' : String(v);
      } catch (err) {
        return '';
      }
    }

    deleteStore(args) {
      const key = toStr(args && args.KEY);
      if (!key) return;
      try {
        globalThis.localStorage.removeItem(STORE_PREFIX + key);
        this._notice(`已删除本地数据「${key}」`);
      } catch (err) {
        this._notice('删除本地数据失败：浏览器可能禁用了本地存储');
      }
    }

    /* ================= 状态 ================= */

    notice() {
      return this.noticeText;
    }

    fileContent() {
      return this.content;
    }

    fileName() {
      return this.pickedName;
    }

    _notice(text) {
      this.noticeText = String(text);
      try {
        console.log('[文件读写]', this.noticeText);
      } catch (err) {
        /* 忽略 */
      }
    }
  }

  Scratch.extensions.register(new FileIO());
})(Scratch);
