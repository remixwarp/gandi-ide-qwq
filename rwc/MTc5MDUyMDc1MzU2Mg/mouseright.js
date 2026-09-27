// Gandi Format (from RemixWarp, id=mouseright)
/**
 * 鼠标右键 · TurboWarp / Scratch 3 自定义扩展
 *
 * Scratch 本身没有"右键"积木。本扩展补上右键检测：
 *   - 当按下 / 松开鼠标右键（事件积木）
 *   - 右键被按住？（判断）
 *   - 右键点击的 X / Y 坐标（已自动换算成 Scratch 舞台坐标）
 *   - 右键点击次数（可重置）
 *   - 把鼠标右键菜单设为 阻止 / 允许（让右键能当游戏输入用）
 *
 * ⚠️ 必须非沙盒运行（要监听主窗口的鼠标事件、并拦截舞台的右键菜单）。
 *
 * 设计说明（默认不动 Scratch 原有行为）：
 *   - 右键**检测**始终生效，不会影响 Scratch；
 *   - 只有在显式使用「把鼠标右键菜单设为 阻止」之后，才会阻止舞台区域的右键菜单
 *     （舞台之外的右键菜单不受影响，方便你正常使用浏览器/编辑器功能）；
 *   - 不阻止菜单时，弹出的菜单会打断"按住"状态并可能吞掉"松开"事件，
 *     所以要把右键当游戏输入用，请先阻止菜单。
 */
(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      '「鼠标右键」扩展需要监听主窗口鼠标事件并拦截舞台右键菜单，必须非沙盒(unsandboxed)运行：' +
        '加载时请勾选 "Run extension without sandbox"。'
    );
  }

  const BlockType = Scratch.BlockType;
  const ArgumentType = Scratch.ArgumentType;
  const EXT_ID = 'mouseright';

  const MENU_BLOCK = 'block'; // 阻止右键菜单
  const MENU_ALLOW = 'allow'; // 允许右键菜单（默认）

  const DEFAULT_STAGE_WIDTH = 480;
  const DEFAULT_STAGE_HEIGHT = 360;

  class MouseRightDetector {
    constructor() {
      this.isDown = false;      // 右键当前是否按住
      this.clickX = 0;          // 最近一次右键的舞台坐标
      this.clickY = 0;
      this.clickCount = 0;
      this.menuBlocked = false; // 是否阻止舞台右键菜单（默认不阻止）
      this._resetTimer = null;
      this._install();
    }

    getInfo() {
      return {
        id: EXT_ID,
        name: '鼠标右键',
        color1: '#4c97ff',
        color2: '#3d79cc',
        color3: '#2f5fa0',
        blocks: [
          {
            opcode: 'whenRightDown',
            blockType: BlockType.EVENT,
            text: '当按下鼠标右键',
            isEdgeActivated: false,
          },
          {
            opcode: 'whenRightUp',
            blockType: BlockType.EVENT,
            text: '当松开鼠标右键',
            isEdgeActivated: false,
          },
          '---',
          {
            opcode: 'isRightDown',
            blockType: BlockType.BOOLEAN,
            text: '鼠标右键被按住？',
          },
          {
            opcode: 'rightClickX',
            blockType: BlockType.REPORTER,
            text: '右键点击的 X 坐标',
          },
          {
            opcode: 'rightClickY',
            blockType: BlockType.REPORTER,
            text: '右键点击的 Y 坐标',
          },
          {
            opcode: 'rightClickCount',
            blockType: BlockType.REPORTER,
            text: '右键点击次数',
          },
          {
            opcode: 'resetCount',
            blockType: BlockType.COMMAND,
            text: '把右键点击次数归零',
          },
          '---',
          {
            opcode: 'setBlockMenu',
            blockType: BlockType.COMMAND,
            text: '把鼠标右键菜单设为 [MODE]',
            arguments: {
              MODE: { type: ArgumentType.STRING, defaultValue: MENU_BLOCK, menu: 'MODE' },
            },
          },
          {
            opcode: 'isMenuBlocked',
            blockType: BlockType.BOOLEAN,
            text: '鼠标右键菜单被阻止？',
          },
        ],
        menus: {
          MODE: {
            acceptReporters: true,
            items: [
              { text: '阻止', value: MENU_BLOCK },
              { text: '允许', value: MENU_ALLOW },
            ],
          },
        },
      };
    }

    /* ================= 事件安装 ================= */

    _install() {
      const doc = globalThis.document;
      if (!doc || typeof doc.addEventListener !== 'function') return;
      this._onDown = (event) => this._handleDown(event);
      this._onUp = (event) => this._handleUp(event);
      this._onContextMenu = (event) => this._handleContextMenu(event);
      // 用捕获阶段，才能在 Scratch 自己的右键处理之前拦下来
      doc.addEventListener('mousedown', this._onDown, true);
      doc.addEventListener('mouseup', this._onUp, true);
      doc.addEventListener('contextmenu', this._onContextMenu, true);
    }

    /* ================= 事件处理 ================= */

    _handleDown(event) {
      if (!event || event.button !== 2) return; // 只关心右键
      this.isDown = true;
      this._recordClick(event, event.target);
      this._hat('whenRightDown');
    }

    _handleUp(event) {
      if (!event || event.button !== 2) return;
      this.isDown = false;
      this._hat('whenRightUp');
    }

    _handleContextMenu(event) {
      if (!event) return;
      const inStage = !!this._stageElement(event.target);

      // 有些环境（触屏长按等）只有 contextmenu 没有 mousedown → 这里补记一次
      if (!this.isDown) {
        this.isDown = true;
        this._recordClick(event, event.target);
        this._hat('whenRightDown');
      }

      if (this.menuBlocked && inStage) {
        // 阻止浏览器原生菜单 + 阻止事件继续传给 Scratch 自己的舞台菜单
        if (typeof event.preventDefault === 'function') event.preventDefault();
        if (typeof event.stopPropagation === 'function') event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
        // 菜单被阻止，右键"按住"状态会由 mouseup 正常结束
        return;
      }

      // 未阻止菜单：菜单弹出会打断按住状态、并可能吞掉 mouseup，这里做复位兜底
      this._resetDownSoon();
    }

    /** 菜单弹出后，右键按住状态无法保持 → 稍后复位（不触发"松开"事件） */
    _resetDownSoon() {
      if (this._resetTimer) clearTimeout(this._resetTimer);
      this._resetTimer = setTimeout(() => {
        this._resetTimer = null;
        this.isDown = false;
      }, 300);
    }

    /* ================= 坐标 ================= */

    /** 判断事件目标是否位于舞台区域内（舞台容器或舞台 canvas） */
    _stageElement(target) {
      if (!target) return null;
      const tag = target.tagName ? String(target.tagName).toLowerCase() : '';
      if (tag === 'canvas') return target;
      if (typeof target.closest === 'function') {
        const wrapper =
          target.closest('[class*="stage-wrapper"]') ||
          target.closest('[class*="stage_stage"]') ||
          target.closest('[class*="stage-wrapper_stage"]');
        if (wrapper) return wrapper;
      }
      return null;
    }

    /** 把屏幕坐标换算成 Scratch 舞台坐标（支持自定义舞台尺寸/缩放显示） */
    _stageCoords(event, target) {
      try {
        const el = this._stageElement(target) || target;
        if (!el || typeof el.getBoundingClientRect !== 'function') return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        if (!rect || !rect.width || !rect.height) return { x: 0, y: 0 };

        const runtime = Scratch.vm && Scratch.vm.runtime;
        const stageW = (runtime && runtime.stageWidth) || DEFAULT_STAGE_WIDTH;
        const stageH = (runtime && runtime.stageHeight) || DEFAULT_STAGE_HEIGHT;

        const clientX = Number(event.clientX);
        const clientY = Number(event.clientY);
        if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return { x: 0, y: 0 };

        const x = ((clientX - rect.left) / rect.width - 0.5) * stageW;
        const y = (0.5 - (clientY - rect.top) / rect.height) * stageH;
        return { x, y };
      } catch (err) {
        return { x: 0, y: 0 };
      }
    }

    _recordClick(event, target) {
      this.clickCount++;
      const c = this._stageCoords(event, target);
      this.clickX = c.x;
      this.clickY = c.y;
    }

    _hat(opcode) {
      try {
        Scratch.vm.runtime.startHats(EXT_ID + '_' + opcode);
      } catch (err) {
        /* 项目未运行时为空操作 */
      }
    }

    /* ================= 积木方法 ================= */

    isRightDown() {
      return this.isDown;
    }

    rightClickX() {
      return this.clickX;
    }

    rightClickY() {
      return this.clickY;
    }

    rightClickCount() {
      return this.clickCount;
    }

    resetCount() {
      this.clickCount = 0;
    }

    setBlockMenu(args) {
      const mode = String((args && args.MODE) || '');
      // 没填/非法值时不改动设置
      if (mode !== MENU_BLOCK && mode !== MENU_ALLOW) return;
      this.menuBlocked = mode === MENU_BLOCK;
      if (!this.menuBlocked && this._resetTimer) {
        clearTimeout(this._resetTimer);
        this._resetTimer = null;
      }
    }

    isMenuBlocked() {
      return this.menuBlocked;
    }
  }

  Scratch.extensions.register(new MouseRightDetector());
})(Scratch);
