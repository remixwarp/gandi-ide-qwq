// Gandi Format (from RemixWarp, id=stringtools)
// Name: String Tools
// ID: stringtools
// Description: Make handling strings more convenient.
// By: DL_Grass <https://github.com/DLGrass>
// License: MIT

/* generated l10n code */Scratch.translate.setup({"zh-cn":{"extensionName":"字符串处理","extensionDescription":"让处理字符串更加便利","group.tools":"积木","group.setting":"设置","menu.upperCase":"大写","menu.lowerCase":"小写","menu.start":"开头","menu.end":"结尾","block.isInclude":"[Str1]是否包含[Str2]","block.reverse":"反转[Str]","block.isSymmetry":"[Str]是否对称","block.toCase":"将[Str]转换为[Type]","block.isCase":"[Str]是否为[Type]","block.deleteSpace":"删除[Str]中的所有空格","block.deleteSpace2":"删除[Str]开头和结尾的空格","block.deleteChar":"删除[Str]中的[Char]","block.deleteCharRange":"删除[Str]中的第[num1]到[num2]个字符","block.deleteCharRange2":"删除[Str]中的第[num]个字符","block.setStringStart":"设置字符串第一个字符位置为[num]","block.getStringStart":"返回字符串第一个字符位置","block.replaceChar":"替换[Str]中的[Char]为[Char2]","block.returnStringRange":"[Str]中的第[num1]到[num2]个字符","block.replaceString":"替换[Str]中的[Str2]为[Str3]","block.replaceStringRange":"替换[Str]中的第[num1]到[num2]个字符为[Str3]","block.replaceStringRange2":"替换[Str]中的第[num]个字符为[Str2]","block.strAppearNum":"[Str]中[Str2]出现的次数","block.splitString":"将[Str]按[Str2]分割，取得第[num]项","block.splitStringNum":"将[Str]按[Str2]分割，取得项数","block.splitStringItem":"将[Str]按[Str2]分割，取得所有项","block.repairString":"在[Str1]的[Position]中填充[Str2]到长度[Length]","block.repeatString":"重复[num]个[Str]"},"zh-tw":{"extensionName":"字串處理","extensionDescription":"讓處理字串更加便利","group.tools":"積木","group.setting":"設定","menu.upperCase":"大寫","menu.lowerCase":"小寫","menu.start":"開頭","menu.end":"結尾","block.isInclude":"[Str1]是否包含[Str2]","block.reverse":"反轉[Str]","block.isSymmetry":"[Str]是否對稱","block.toCase":"將[Str]轉換為[Type]","block.isCase":"[Str]是否為[Type]","block.deleteSpace":"刪除[Str]中的所有空格","block.deleteSpace2":"刪除[Str]開頭和結尾的空格","block.deleteChar":"刪除[Str]中的[Char]","block.deleteCharRange":"刪除[Str]中的第[num1]到[num2]個字元","block.deleteCharRange2":"刪除[Str]中的第[num]個字元","block.setStringStart":"設定字串第一個字元位置為[num]","block.getStringStart":"返回字串第一個字元位置","block.replaceChar":"替換[Str]中的[Char]為[Char2]","block.returnStringRange":"[Str]中的第[num1]到[num2]個字元","block.replaceString":"替換[Str]中的[Str2]為[Str3]","block.replaceStringRange":"替換[Str]中的第[num1]到[num2]個字元為[Str3]","block.replaceStringRange2":"替換[Str]中的第[num]個字元為[Str2]","block.strAppearNum":"[Str]中[Str2]出現的次數","block.splitString":"將[Str]按[Str2]分割，取得第[num]項","block.splitStringNum":"將[Str]按[Str2]分割，取得項數","block.splitStringItem":"將[Str]按[Str2]分割，取得所有項","block.repairString":"在[Str1]的[Position]中填充[Str2]到長度[Length]","block.repeatString":"重複[num]個[Str]"}});/* end generated l10n code */(function (Scratch) {
    // String Tools
    var startPosition = 1;

    class StringTools {

        constructor(runtime) {
            this.runtime = runtime;
        }

        getInfo() {
            return {
                id: 'stringtools',
                name: Scratch.translate({ default: 'String Tools', id: 'extensionname' }),
                description: Scratch.translate({ default: 'Make handling strings more convenient', id: 'extensiondescription' }),
                color1: '#6200ff',
                color2: '#360f9e',
                color3: '#300661',

                blocks: [
                    {blockType: Scratch.BlockType.LABEL, text: Scratch.translate({ default: 'Tools', id: 'group.tools' })},
                    {
                        blockType: Scratch.BlockType.BOOLEAN,
                        opcode: 'isEqual',
                        text: '[Str1] === [Str2]',
                        arguments: {
                            Str1: {
                                type: Scratch.ArgumentType.STRING,
                            },
                            Str2: {
                                type: Scratch.ArgumentType.STRING,
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.BOOLEAN,
                        opcode: 'isInclude',
                        text: Scratch.translate({ default: '[Str1] contains [Str2]?', id: 'block.isinclude' }),
                        arguments: {
                            Str1: {
                                type: Scratch.ArgumentType.STRING,
                            },
                            Str2: {
                                type: Scratch.ArgumentType.STRING,
                            }
                        },
                    },
                    '---',
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'reverse',
                        text: Scratch.translate({ default: 'Reverse [Str]', id: 'block.reverse' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.BOOLEAN,
                        opcode: 'isSymmetry',
                        text: Scratch.translate({ default: '[Str] is symmetric?', id: 'block.issymmetry' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'strts'
                            }
                        },
                    },
                    '---',
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'toCase',
                        text: Scratch.translate({ default: 'Convert [Str] to [Type]', id: 'block.tocase' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            Type: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'constCase'
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.BOOLEAN,
                        opcode: 'isCase',
                        text: Scratch.translate({ default: '[Str] is [Type]?', id: 'block.iscase' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            Type: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'constCase'
                            }
                        },
                    },
                    '---',
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'deleteSpace',
                        text: Scratch.translate({ default: 'Delete all spaces in [Str]', id: 'block.deletespace' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a p p l e'
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'deleteSpace2',
                        text: Scratch.translate({ default: 'Delete spaces at the beginning and end of [Str]', id: 'block.deletespace2' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '   apple   '
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'deleteChar',
                        text: Scratch.translate({ default: 'Delete [Char] in [Str]', id: 'block.deletechar' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            Char: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'p'
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'deleteCharRange',
                        text: Scratch.translate({ default: 'Delete characters [num1] to [num2] in [Str]', id: 'block.deletecharrange' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            num1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            num2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'deleteCharRange2',
                        text: Scratch.translate({ default: 'Delete character [num] in [Str]', id: 'block.deletecharrange2' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            num: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            }
                        },
                    },
                    '---',
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'replaceChar',
                        text: Scratch.translate({ default: 'Replace [Char] in [Str] with [Char2]', id: 'block.replacechar' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            Char: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'p'
                            },
                            Char2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'P'
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'replaceString',
                        text: Scratch.translate({ default: 'Replace [Str2] in [Str] with [Str3]', id: 'block.replacestring' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            Str2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'p'
                            },
                            Str3: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'P'
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'replaceStringRange',
                        text: Scratch.translate({ default: 'Replace characters [num1] to [num2] in [Str] with [Str3]', id: 'block.replacestringrange' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            num1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            num2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            },
                            Str3: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'P'
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'replaceStringRange2',
                        text: Scratch.translate({ default: 'Replace character [num] in [Str] with [Str2]', id: 'block.replacestringrange2' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            num: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            Str2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'P'
                            }
                        },
                    },
                    '---',
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'strAppearNum',
                        text: Scratch.translate({ default: 'Return number of times [Str2] appears in [Str]', id: 'block.strappearnum' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            Str2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'p'
                            }
                        },
                    },
                    '---',
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'splitStringItem',
                        text: Scratch.translate({ default: 'Return all items of [Str] split by [Str2]', id: 'block.splitstringitem' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple.banana'
                            },
                            Str2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '.'
                            },
                            num: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'splitStringNum',
                        text: Scratch.translate({ default: 'Return number of items in [Str] split by [Str2]', id: 'block.splitstringnum' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple.banana'
                            },
                            Str2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '.'
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'splitString',
                        text: Scratch.translate({ default: 'Return [num]th items of [Str] split by [Str2]', id: 'block.splitstring' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple.banana'
                            },
                            Str2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '.'
                            },
                            num: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        },
                    },
                    '---',
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'repairString',
                        text: Scratch.translate({ default: 'Repair [Str1] with [Str2] at [Position] to [Length]', id: 'block.repairstring' }),
                        arguments: {
                            Str1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'str'
                            },
                            Str2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 's'
                            },
                            Position: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'constPosition'
                            },
                            Length: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'repeatString',
                        text: Scratch.translate({ default: 'Repeat [num] times [Str]', id: 'block.repeatstring' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'str'
                            },
                            num: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'returnStringRange',
                        text: Scratch.translate({ default: 'Return characters [num1] to [num2] in [Str]', id: 'block.returnstringrange' }),
                        arguments: {
                            Str: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            num1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            num2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            }
                        },
                    },
                    
                    {blockType: Scratch.BlockType.LABEL, text: Scratch.translate({ default: 'Setting', id: 'group.setting' })},
                    {
                        blockType: Scratch.BlockType.COMMAND,
                        opcode: 'setStringStart',
                        text: Scratch.translate({ default: 'Set first character of String to [num]', id: 'block.setstringstart' }),
                        arguments: {
                            num: {
                                type: Scratch.ArgumentType.NUMBER,
                                menu: 'stringStartPosition'
                            }
                        },
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: 'getStringStart',
                        text: Scratch.translate({ default: 'Return first character of String', id: 'block.getstringstart' }),
                    },
                ],

                menus: {
                    constCase: [
                        { text: Scratch.translate({ default: 'UpperCase', id: 'menu.uppercase' }), value: 'upperCase' },
                        { text: Scratch.translate({ default: 'LowerCase', id: 'menu.lowercase' }), value: 'lowerCase' },
                    ],
                    stringStartPosition: [
                        { text: '0', value: 0 },
                        { text: '1', value: 1 },
                        
                    ],
                    constPosition: [
                        { text: Scratch.translate({ default: 'Start', id: 'menu.start' }), value: 'start' },
                        { text: Scratch.translate({ default: 'End', id: 'menu.end' }), value: 'end' },
                    ]
                },

            };
        }

        setStringStart(args) {
            let { num } = args;
            startPosition = num;
        }

        getStringStart() {
            return startPosition;
        }

        isEqual(args) {
            let { Str1, Str2 } = args;
            Str1 = Str1.toString();
            Str2 = Str2.toString();
            return Str1 === Str2;
        }

        isInclude(args) {
            let { Str1, Str2 } = args;
            Str1 = Str1.toString();
            Str2 = Str2.toString();
            if (Str2.length === 0) {
                return false;
            }
            return Str1.includes(Str2);
        }

        reverse(args) {
            let { Str } = args;
            Str = Str.toString();
            return Str.split('').reverse().join('');
        }

        isSymmetry(args) {
            let { Str } = args;
            Str = Str.toString();
            return Str === this.reverse({ Str });
        }

        toCase(args) {
            let { Str, Type } = args;
            Str = Str.toString();
            if (Type === 'upperCase') return Str.toUpperCase();
            if (Type === 'lowerCase') return Str.toLowerCase();
            return Str;
        }

        isCase(args) {
            let { Str, Type } = args;
            Str = Str.toString();
            if (Type === 'upperCase') return Str === Str.toUpperCase();
            if (Type === 'lowerCase') return Str === Str.toLowerCase();
            return false;
        }

        deleteSpace(args) {
            let { Str } = args;
            Str = Str.toString();
            return Str.replace(/\s+/g, '');
        }

        deleteSpace2(args) {
            let { Str } = args;
            Str = Str.toString();
            return Str.trim();
        }
        
        deleteChar(args) {
            let { Str, Char } = args;
            Str = Str.toString();
            return Str.replace(new RegExp(Char, 'g'), '');
        }
        
        deleteCharRange(args) {
            let { Str, num1, num2 } = args;
            Str = Str.toString();
            return Str.slice(0, num1 - startPosition) + Str.slice(num2 + 1);
        }
        
        deleteCharRange2(args) {
            let { Str, num } = args;
            Str = Str.toString();
            return Str.slice(0, num - startPosition) + Str.slice(num - startPosition + 1);
        }
        
        replaceChar(args) {
            let { Str, Char, Char2 } = args;
            Str = Str.toString();
            return Str.replace(new RegExp(Char, 'g'), Char2);
        }
        
        returnStringRange(args) {
            let { Str, num1, num2 } = args;
            Str = Str.toString();
            return Str.slice(num1 - startPosition, num2 + 1 - startPosition);
        }

        replaceString(args) {
            let { Str, Str2, Str3 } = args;
            Str = Str.toString();
            Str2 = Str2.toString();
            Str3 = Str3.toString();
            return Str.replace(new RegExp(Str2, 'g'), Str3);
        }
        
        replaceStringRange(args) {
            let { Str, num1, num2, Str3 } = args;
            Str = Str.toString();
            return Str.slice(0, num1 - startPosition) + Str3 + Str.slice(num2);
        }
        
        replaceStringRange2(args) {
            let { Str, num, Str2 } = args;
            Str = Str.toString();
            return Str.slice(0, num - startPosition) + Str2 + Str.slice(num - startPosition + 1);
        }
        
        strAppearNum(args) {
            let { Str, Str2 } = args;
            Str = Str.toString();
            Str2 = Str2.toString();
            return Str.split(Str2).length - 1;
        }
        
        splitString(args) {
            let { Str, Str2, num } = args;
            Str = Str.toString();
            Str2 = Str2.toString();
            return Str.split(Str2)[num - 1];
        }
        
        splitStringItem(args) {
            let { Str, Str2 } = args;
            Str = Str.toString();
            Str2 = Str2.toString();
            return Str.split(Str2);
        }

        splitStringNum(args) {
            let { Str, Str2 } = args;
            Str = Str.toString();
            Str2 = Str2.toString();
            return Str.split(Str2).length;
        }
        
        repairString(args) {
            let { Str1, Str2, Position, Length } = args;
            Str1 = Str1.toString();
            Str2 = Str2.toString();
            Position = Position.toString();
            Length = parseInt(Length, 10) || 0;
            const paddingLength = Math.max(0, Length - Str1.length);
            const padding = Str2.repeat(Math.ceil(paddingLength / Str2.length)).slice(0, paddingLength);
            if(Position === 'start') {
                return padding + Str1;
            }
            if(Position === 'end') {
                return Str1 + padding;
            }
            return Str1;
        }

        repeatString(args) {
            let { Str, num } = args;
            Str = Str.toString();
            return Str.repeat(num);
        }
    }

    Scratch.extensions.register(new StringTools());
})(Scratch)
