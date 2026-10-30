// Gandi Format (from RemixWarp, id=si2022prefix)
// Name: SI转换器
// ID: si2022prefix
// Description: SI国际单位前缀转换，支持quecto‑quetta全套2022新标准前缀
// By: 炙研-bit
// License: MIT

(function(Scratch) {
  'use strict';
  // SI 2022 标准前缀表
  const SI_PREFIXES = [
    { symbol: 'q', name: 'quecto', exponent: -30 },
    { symbol: 'r', name: 'ronto', exponent: -27 },
    { symbol: 'y', name: 'yocto', exponent: -24 },
    { symbol: 'z', name: 'zepto', exponent: -21 },
    { symbol: 'a', name: 'atto', exponent: -18 },
    { symbol: 'f', name: 'femto', exponent: -15 },
    { symbol: 'p', name: 'pico', exponent: -12 },
    { symbol: 'n', name: 'nano', exponent: -9 },
    { symbol: 'µ', name: 'micro', exponent: -6 },
    { symbol: 'm', name: 'milli', exponent: -3 },
    { symbol: '', name: '', exponent: 0 },
    { symbol: 'k', name: 'kilo', exponent: 3 },
    { symbol: 'M', name: 'mega', exponent: 6 },
    { symbol: 'G', name: 'giga', exponent: 9 },
    { symbol: 'T', name: 'tera', exponent: 12 },
    { symbol: 'P', name: 'peta', exponent: 15 },
    { symbol: 'E', name: 'exa', exponent: 18 },
    { symbol: 'Z', name: 'zetta', exponent: 21 },
    { symbol: 'Y', name: 'yotta', exponent: 24 },
    { symbol: 'R', name: 'ronna', exponent: 27 },
    { symbol: 'Q', name: 'quetta', exponent: 30 },
  ];
  /**
   * 数字转为SI：数值+符号，自动剥离末尾 .000
   * @param {number} num
   * @param {number} fixed 小数位数
   * @returns {string}
   */
  function numberToSI(num, fixed = 3) {
    if (num === 0) return '0';
    const abs = Math.abs(num);
    const sign = num < 0 ? -1 : 1;
    const exp = Math.floor(Math.log10(abs));
    let best = SI_PREFIXES[0];
    for (const p of SI_PREFIXES) {
      if (p.exponent <= exp) best = p;
    }
    const scaled = sign * abs / (10 ** best.exponent);
    let str = scaled.toFixed(fixed);
    // 去掉末尾 .000
    str = str.replace(/\.0+$/, '');
    if (best.symbol === '') {
      return str;
    } else {
      return `${str} ${best.symbol}`;
    }
  }
  /**
   * SI字符串反向解析为数字
   * 支持："12k", "12 kilo", "3.4 M", "5 ronna"
   * @param {string} s
   * @returns {number|null}
   */
  function siToNumber(s) {
    s = s.trim();
    const match = s.match(/^([+-]?\d*\.?\d+)\s*([a-zA-Zµ]+)?$/);
    if (!match) return Number(s);
    const val = parseFloat(match[1]);
    const token = match[2];
    if (!token) return val;
    const prefix = SI_PREFIXES.find(p =>
      p.symbol === token || p.name === token.toLowerCase()
    );
    if (!prefix) return null;
    return val * (10 ** prefix.exponent);
  }
  class SIPrefixExtension {
    getInfo() {
      return {
        id: 'si2022prefix',
        name: 'SI转换器',
        color1: '#79fff8',
        color2: '#61e6e0',
        color3: '#49cfc9',
        blocks: [
          {
            opcode: 'numToSI',
            blockType: Scratch.BlockType.REPORTER,
            text: '数字 [NUM] 转为SI（保留 [DIG] 位小数）',
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1000 },
              DIG: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
            }
          },
          {
            opcode: 'siToNum',
            blockType: Scratch.BlockType.REPORTER,
            text: 'SI文本 [STR] 转数字',
            arguments: {
              STR: { type: Scratch.ArgumentType.STRING, defaultValue: "1 k" }
            }
          },
          {
            opcode: 'symbolToName',
            blockType: Scratch.BlockType.REPORTER,
            text: '符号 [SYM] 的SI全称',
            arguments: {
              SYM: { type: Scratch.ArgumentType.STRING, defaultValue: "k" }
            }
          },
          {
            opcode: 'nameToSymbol',
            blockType: Scratch.BlockType.REPORTER,
            text: '全称 [NAME] 的SI符号',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "kilo" }
            }
          }
        ]
      };
    }
    numToSI(args) {
      return numberToSI(Number(args.NUM), Number(args.DIG));
    }
    siToNum(args) {
      const res = siToNumber(args.STR);
      return res === null ? "NaN" : res;
    }
    symbolToName(args) {
      const p = SI_PREFIXES.find(x => x.symbol === args.SYM);
      return p ? p.name : "";
    }
    nameToSymbol(args) {
      const p = SI_PREFIXES.find(x => x.name.toLowerCase() === args.NAME.toLowerCase());
      return p ? p.symbol : "";
    }
  }
  Scratch.extensions.register(new SIPrefixExtension());
})(Scratch);

