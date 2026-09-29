// Gandi Format (from RemixWarp, id=cblockargsexample)
(function (Scratch) {
    'use strict';
    const {ArgumentType, BlockType, Cast} = Scratch;
    class CBlockArgsExample {
        getInfo () {
            return {
                id: 'cblockargsexample',
                name: 'C 型参数示例',
                blocks: [
                    {opcode: 'forRange', blockType: BlockType.LOOP, text: '对 [i] 从 [FROM] 到 [TO]',
                        arguments: {i: {type: ArgumentType.CCW_HAT_PARAMETER},
                            FROM: {type: ArgumentType.NUMBER, defaultValue: 1},
                            TO: {type: ArgumentType.NUMBER, defaultValue: 10}}},
                    {opcode: 'forEachItem', blockType: BlockType.LOOP, text: '对 [item] [index] 逐项 [LIST]',
                        arguments: {item: {type: ArgumentType.CCW_HAT_PARAMETER},
                            index: {type: ArgumentType.CCW_HAT_PARAMETER},
                            LIST: {type: ArgumentType.STRING, defaultValue: 'a,b,c'}}},
                    {opcode: 'withValue', blockType: BlockType.CONDITIONAL, text: '令 [value] = [V]',
                        arguments: {value: {type: ArgumentType.CCW_HAT_PARAMETER},
                            V: {type: ArgumentType.STRING, defaultValue: 'x'}}}
                ]
            };
        }
        forRange (args, util) {
            const f = util.stackFrame;
            if (f.i === undefined) {
                f.i = Cast.toNumber(args.FROM);
                f.to = Cast.toNumber(args.TO);
            } else {
                f.i++;
            }
            if (f.i > f.to) return;
            util.startBranch(1, true, {i: f.i});
        }
        forEachItem (args, util) {
            const f = util.stackFrame;
            if (f.items === undefined) {
                f.items = Cast.toString(args.LIST).split(',');
                f.n = 0;
            }
            if (f.n >= f.items.length) return;
            f.n++;
            util.startBranch(1, true, {item: f.items[f.n - 1], index: f.n});
        }
        withValue (args, util) {
            util.startBranch(1, false, {value: args.V});   // 不是循环：身体跑一次
        }
    }
    Scratch.extensions.register(new CBlockArgsExample());
})(Scratch);