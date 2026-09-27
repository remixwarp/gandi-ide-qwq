// Gandi Format (from RemixWarp, id=strcase)
/**
 * 字符串比较 · TurboWarp / Scratch 3 自定义扩展
 *
 * 默认行为：**区分大小写**的「严格文本比较」（可选切换成忽略大小写）。
 *
 * 为什么需要它？
 *   Scratch 内置的 `=` 确实区分大小写（"Hello" = "hello" → false），但它会把
 *   "看起来像数字"的字符串**按数值比较**，于是会出现这些不符合直觉的结果：
 *       "010" = "10"      → 内置为 true （本扩展严格比较为 false）
 *       "1e2" = "100"     → 内置为 true （本扩展为 false）
 *       " 1"  = "1"       → 内置为 true （本扩展为 false）
 *   本扩展做的是**逐字符的文本比较**：只有两边文本完全一样才相等。
 *
 * 积木（[MODE] 可下拉选择「区分大小写 / 忽略大小写」，默认区分大小写）：
 *   [A] 和 [B] 相等？（[区分大小写 ▾]）   → true / false
 *   [A] 包含 [B]？（[区分大小写 ▾]）       → true / false
 *
 * 行为边界（重要，避免踩坑）：
 *   - 严格文本：不做数值归一化（"010" ≠ "10"）；
 *   - 不裁剪首尾空格（"hi " ≠ "hi"）；
 *   - 不做全角/半角归一化（"ＡＢＣ" ≠ "abc"）、不做重音归一化（"é" ≠ "e"）；
 *   - 数字按文本看：123 与 "123" 相等，但 1.0 与 "1" 不相等；
 *   - 空字符串："" 与 "" 相等；任何字符串都"包含"空字符串（与 Scratch 内置一致）。
 *
 * 本扩展只做纯字符串运算，**不需要网络**，因此在沙盒(sandboxed)与
 * 非沙盒(unsandboxed)两种方式下都能正常工作（加载时不必勾选非沙盒）。
 */
(function (Scratch) {
  'use strict';

  const BlockType = Scratch.BlockType;
  const ArgumentType = Scratch.ArgumentType;

  const MODE_CASE = 'case';     // 区分大小写（默认）
  const MODE_NOCASE = 'nocase'; // 忽略大小写

  /** 把积木输入统一成字符串（Scratch 里一切都可能是字符串/数字/布尔） */
  function toStr(value) {
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    return '';
  }

  /**
   * 按模式准备待比较文本。
   * 只有「忽略大小写」模式做小写化；「区分大小写」模式保持原样（严格文本比较）。
   */
  function prep(value, mode) {
    const s = toStr(value);
    return String(mode).toLowerCase() === MODE_NOCASE ? s.toLowerCase() : s;
  }

  class StringCompare {
    getInfo() {
      return {
        id: 'strcase',
        name: '字符串比较',
        color1: '#9966ff',
        color2: '#7c53d6',
        color3: '#6440b0',
        blocks: [
          {
            opcode: 'equalsText',
            blockType: BlockType.BOOLEAN,
            text: '[A] 和 [B] 相等？（[MODE]）',
            arguments: {
              A: { type: ArgumentType.STRING, defaultValue: 'Hello' },
              B: { type: ArgumentType.STRING, defaultValue: 'hello' },
              MODE: { type: ArgumentType.STRING, defaultValue: MODE_CASE, menu: 'MODE' },
            },
          },
          {
            opcode: 'containsText',
            blockType: BlockType.BOOLEAN,
            text: '[A] 包含 [B]？（[MODE]）',
            arguments: {
              A: { type: ArgumentType.STRING, defaultValue: 'Hello World' },
              B: { type: ArgumentType.STRING, defaultValue: 'world' },
              MODE: { type: ArgumentType.STRING, defaultValue: MODE_CASE, menu: 'MODE' },
            },
          },
        ],
        menus: {
          MODE: {
            // 允许把变量/积木拖进这个下拉框（比如用变量保存"要不要区分大小写"）
            acceptReporters: true,
            items: [
              { text: '区分大小写', value: MODE_CASE },
              { text: '忽略大小写', value: MODE_NOCASE },
            ],
          },
        },
      };
    }

    /** [A] 和 [B] 相等？（模式可选） */
    equalsText(args) {
      return prep(args.A, args.MODE) === prep(args.B, args.MODE);
    }

    /** [A] 包含 [B]？（模式可选） */
    containsText(args) {
      return prep(args.A, args.MODE).indexOf(prep(args.B, args.MODE)) !== -1;
    }
  }

  Scratch.extensions.register(new StringCompare());
})(Scratch);
