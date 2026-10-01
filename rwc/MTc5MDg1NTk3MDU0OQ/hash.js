// Gandi Format (from RemixWarp, id=hash)
/**
 * 哈希算法 · TurboWarp / Scratch 3 自定义扩展
 *
 * 支持的算法：
 *   - MD5        （自带实现，纯 JS，任何环境都能算）
 *   - SHA-1      （Web Crypto）
 *   - SHA-256    （Web Crypto，最常用）
 *   - SHA-384    （Web Crypto）
 *   - SHA-512    （Web Crypto）
 *   - CRC32      （自带实现，8 位十六进制校验值）
 *   - FNV-1a 32  （「简单哈希」积木，把文本变成 32 位数字，适合做随机种子/索引）
 *
 * 编码：所有算法都按 **UTF-8** 处理文本，因此中文/emoji 的结果与常见在线工具一致。
 *
 * 本扩展只做纯计算、不访问网络，因此**沙盒(sandboxed)与非沙盒环境都能运行**
 * （加载时不必勾选非沙盒）。SHA 系列依赖浏览器的 Web Crypto（crypto.subtle）：
 * 在极老的浏览器或特殊的非安全上下文里可能不可用，可用「哈希算法 … 是否可用？」
 * 积木先判断；MD5 / CRC32 / 简单哈希任何时候都能用。
 *
 * ⚠️ 安全提醒（写进文档也写进代码）：MD5 与 SHA-1 已不适合用于密码等安全场景，
 *    仅适合校验、去重、索引、短码等用途；需要安全用途请用 SHA-256 及以上。
 */
(function (Scratch) {
  'use strict';

  const BlockType = Scratch.BlockType;
  const ArgumentType = Scratch.ArgumentType;
  const EXT_ID = 'hash';

  const FORMAT_LOWER = 'lower';
  const FORMAT_UPPER = 'upper';

  const ALG_MD5 = 'MD5';
  const ALG_SHA1 = 'SHA-1';
  const ALG_SHA256 = 'SHA-256';
  const ALG_SHA384 = 'SHA-384';
  const ALG_SHA512 = 'SHA-512';
  const ALG_CRC32 = 'CRC32';

  /* ================= 基础工具 ================= */

  function toStr(v) {
    if (typeof v === 'string') return v;
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    return '';
  }

  /** 文本 → UTF-8 字节（TextEncoder 缺失时用内置兜底实现） */
  function utf8Bytes(str) {
    if (typeof TextEncoder !== 'undefined') {
      try {
        return new TextEncoder().encode(str);
      } catch (err) {
        /* 落到兜底实现 */
      }
    }
    const out = [];
    for (let i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i);
      // 处理代理对（emoji 等）
      if (code >= 0xd800 && code <= 0xdbff && i + 1 < str.length) {
        const next = str.charCodeAt(i + 1);
        if (next >= 0xdc00 && next <= 0xdfff) {
          code = 0x10000 + ((code - 0xd800) << 10) + (next - 0xdc00);
          i++;
        }
      }
      if (code < 0x80) {
        out.push(code);
      } else if (code < 0x800) {
        out.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
      } else if (code < 0x10000) {
        out.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
      } else {
        out.push(
          0xf0 | (code >> 18),
          0x80 | ((code >> 12) & 0x3f),
          0x80 | ((code >> 6) & 0x3f),
          0x80 | (code & 0x3f)
        );
      }
    }
    return new Uint8Array(out);
  }

  function bytesToHex(bytes, upper) {
    let s = '';
    for (let i = 0; i < bytes.length; i++) {
      s += (bytes[i] < 16 ? '0' : '') + bytes[i].toString(16);
    }
    return upper ? s.toUpperCase() : s;
  }

  function wordToHexLE(word) {
    let s = '';
    for (let i = 0; i < 4; i++) {
      const b = (word >>> (i * 8)) & 0xff;
      s += (b < 16 ? '0' : '') + b.toString(16);
    }
    return s;
  }

  /* ================= MD5（自带实现） ================= */

  const MD5_S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];

  // K[i] = floor(2^32 * |sin(i + 1)|)
  const MD5_K = (() => {
    const k = new Uint32Array(64);
    for (let i = 0; i < 64; i++) {
      k[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) >>> 0;
    }
    return k;
  })();

  /** 计算 MD5，返回 32 位小写十六进制 */
  function md5Hex(bytes) {
    const msgLen = bytes.length;
    const padLen = (((56 - (msgLen + 1) % 64) % 64) + 64) % 64;
    const totalLen = msgLen + 1 + padLen + 8;

    const buf = new Uint8Array(totalLen);
    buf.set(bytes);
    buf[msgLen] = 0x80;

    const dv = new DataView(buf.buffer);
    // 原始长度（bit），64 位小端
    dv.setUint32(totalLen - 8, (msgLen * 8) >>> 0, true);
    dv.setUint32(totalLen - 4, Math.floor((msgLen * 8) / 4294967296) >>> 0, true);

    let a0 = 0x67452301;
    let b0 = 0xefcdab89;
    let c0 = 0x98badcfe;
    let d0 = 0x10325476;

    const m = new Uint32Array(16);
    for (let chunk = 0; chunk < totalLen; chunk += 64) {
      for (let i = 0; i < 16; i++) m[i] = dv.getUint32(chunk + i * 4, true);

      let a = a0;
      let b = b0;
      let c = c0;
      let d = d0;

      for (let i = 0; i < 64; i++) {
        let f;
        let g;
        if (i < 16) {
          f = (b & c) | (~b & d);
          g = i;
        } else if (i < 32) {
          f = (d & b) | (~d & c);
          g = (5 * i + 1) % 16;
        } else if (i < 48) {
          f = b ^ c ^ d;
          g = (3 * i + 5) % 16;
        } else {
          f = c ^ (b | ~d);
          g = (7 * i) % 16;
        }
        f = (f + a + MD5_K[i] + m[g]) >>> 0;
        a = d;
        d = c;
        c = b;
        const s = MD5_S[i];
        b = (b + (((f << s) | (f >>> (32 - s))) >>> 0)) >>> 0;
      }

      a0 = (a0 + a) >>> 0;
      b0 = (b0 + b) >>> 0;
      c0 = (c0 + c) >>> 0;
      d0 = (d0 + d) >>> 0;
    }

    return wordToHexLE(a0) + wordToHexLE(b0) + wordToHexLE(c0) + wordToHexLE(d0);
  }

  /* ================= CRC32 / FNV-1a（自带实现） ================= */

  const CRC_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      table[n] = c >>> 0;
    }
    return table;
  })();

  /** CRC32 校验值（无符号 32 位） */
  function crc32(bytes) {
    let c = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
      c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  /** FNV-1a 32 位哈希（无符号整数） */
  function fnv1a(bytes) {
    let h = 0x811c9dc5;
    for (let i = 0; i < bytes.length; i++) {
      h ^= bytes[i];
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h >>> 0;
  }

  /* ================= SHA 系列（Web Crypto） ================= */

  function getSubtle() {
    const c = globalThis.crypto;
    return c && c.subtle ? c.subtle : null;
  }

  async function shaHex(alg, bytes) {
    const subtle = getSubtle();
    if (!subtle) throw new Error('当前环境不支持 Web Crypto（crypto.subtle）');
    const buffer = await subtle.digest(alg, bytes);
    return bytesToHex(new Uint8Array(buffer), false);
  }

  /** 把用户输入的算法名统一成规范写法（支持 sha256 / sha-256 / SHA_256 等） */
  function normalizeAlg(value) {
    let a = String(value === undefined || value === null ? '' : value)
      .trim()
      .toUpperCase()
      .replace(/[\s_]/g, '');
    if (a === 'MD5') return ALG_MD5;
    if (a === 'SHA1') return ALG_SHA1;
    if (a === 'SHA256') return ALG_SHA256;
    if (a === 'SHA384') return ALG_SHA384;
    if (a === 'SHA512') return ALG_SHA512;
    if (a === 'CRC32' || a === 'CRC') return ALG_CRC32;
    return String(value === undefined || value === null ? '' : value).trim().toUpperCase();
  }

  function isSha(alg) {
    return alg === ALG_SHA1 || alg === ALG_SHA256 || alg === ALG_SHA384 || alg === ALG_SHA512;
  }

  /* ================= 扩展本体 ================= */

  class HashTools {
    getInfo() {
      return {
        id: EXT_ID,
        name: '哈希算法',
        color1: '#8a5cf6',
        color2: '#7048d4',
        color3: '#5737a8',
        blocks: [
          {
            opcode: 'hashText',
            blockType: BlockType.REPORTER,
            text: '[TEXT] 的 [ALG] 哈希值，输出 [FORMAT]',
            arguments: {
              TEXT: { type: ArgumentType.STRING, defaultValue: 'hello' },
              ALG: { type: ArgumentType.STRING, defaultValue: ALG_SHA256, menu: 'ALG' },
              FORMAT: { type: ArgumentType.STRING, defaultValue: FORMAT_LOWER, menu: 'FORMAT' },
            },
          },
          {
            opcode: 'simpleHash',
            blockType: BlockType.REPORTER,
            text: '[TEXT] 的简单哈希值（32 位数字）',
            arguments: {
              TEXT: { type: ArgumentType.STRING, defaultValue: 'hello' },
            },
          },
          {
            opcode: 'algorithmAvailable',
            blockType: BlockType.BOOLEAN,
            text: '哈希算法 [ALG] 是否可用？',
            arguments: {
              ALG: { type: ArgumentType.STRING, defaultValue: ALG_SHA256, menu: 'ALG' },
            },
          },
        ],
        menus: {
          ALG: {
            acceptReporters: true,
            items: [ALG_MD5, ALG_SHA1, ALG_SHA256, ALG_SHA384, ALG_SHA512, ALG_CRC32],
          },
          FORMAT: {
            acceptReporters: true,
            items: [
              { text: '小写十六进制', value: FORMAT_LOWER },
              { text: '大写十六进制', value: FORMAT_UPPER },
            ],
          },
        },
      };
    }

    /**
     * [文本] 的 [算法] 哈希值，输出 [格式]
     * 返回十六进制字符串；算法不可用或输入非法算法时返回空字符串。
     */
    async hashText(args) {
      const text = toStr(args && args.TEXT);
      const alg = normalizeAlg(args && args.ALG);
      const upper = String((args && args.FORMAT) || FORMAT_LOWER) === FORMAT_UPPER;

      const bytes = utf8Bytes(text);
      let hex = '';
      try {
        if (alg === ALG_MD5) {
          hex = md5Hex(bytes);
        } else if (alg === ALG_CRC32) {
          hex = crc32(bytes).toString(16).padStart(8, '0');
        } else if (isSha(alg)) {
          hex = await shaHex(alg, bytes);
        } else {
          warnOnce('未知哈希算法：' + String((args && args.ALG) || '') + '（可用：MD5 / SHA-1 / SHA-256 / SHA-384 / SHA-512 / CRC32）');
          return '';
        }
      } catch (err) {
        warnOnce('计算哈希失败：' + ((err && err.message) || err));
        return '';
      }
      return upper ? hex.toUpperCase() : hex;
    }

    /** [文本] 的简单哈希值：FNV-1a，返回 0 ~ 4294967295 的整数 */
    simpleHash(args) {
      const text = toStr(args && args.TEXT);
      return fnv1a(utf8Bytes(text));
    }

    /** 哈希算法是否可用？（SHA 系列依赖 Web Crypto；MD5 / CRC32 始终可用） */
    algorithmAvailable(args) {
      const alg = normalizeAlg(args && args.ALG);
      if (alg === ALG_MD5 || alg === ALG_CRC32) return true;
      if (isSha(alg)) return !!getSubtle();
      return false;
    }
  }

  const warned = Object.create(null);
  function warnOnce(message) {
    if (warned[message]) return;
    warned[message] = true;
    try {
      console.warn('[哈希算法]', message);
    } catch (err) {
      /* 忽略 */
    }
  }

  Scratch.extensions.register(new HashTools());
})(Scratch);
