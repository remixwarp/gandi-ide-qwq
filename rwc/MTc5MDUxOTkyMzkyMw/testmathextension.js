// Gandi Format (from RemixWarp, id=testmathextension)
(function (Scratch) {
    "use strict";
    const vm = Scratch.vm ?? Scratch.runtime.extensionManager.vm;

    //                            附件
    /**
     * 三角函数输入输出范围配置
     * 包含各种三角函数的定义域和值域限制
     */
    const trigfunction = {
        input: {
            sin: {
                max: Infinity,
                min: -Infinity
            },
            cos: {
                max: Infinity,
                min: -Infinity
            },
            tan: {
                max: Infinity,
                min: -Infinity,
                oddmultiple: 90
            },
            cot: {
                max: Infinity,
                min: -Infinity,
                intmultiple: 180
            },
            sec: {
                max: Infinity,
                min: -Infinity,
                oddmultiple: 90
            },
            csc: {
                max: Infinity,
                min: -Infinity,
                intmultiple: 180
            },
        },
        output: {
            sin: {
                max: 1,
                min: -1
            },
            cos: {
                max: 1,
                min: -1
            },
            tan: {
                max: Infinity,
                min: -Infinity
            },
            cot: {
                max: Infinity,
                min: -Infinity
            },
            sec: {
                max: Infinity,
                min: 1
            },
            csc: {
                max: Infinity,
                min: 1
            }
        }
    };

    const i10n = {
        "MathExtensionName": {
            zh: "数学",
            en: "Math"
        },
        "MathOperator": {
            zh: "运算",
            en: "Operator"
        },
        "All": {
            zh: "⚙️全局工具(03)",
            en: "⚙️All Tools(03)"
        },
        "changeDecimalText": {
            zh: "设置精度为[Num]",
            en: "Set decimal to [Num]"
        },
        "changeDecimalDecs": {
            zh: `
            设置精度
            解决有限精度的问题 
            Num: 正数整数 精度
            `,
            en: `
            Set decimal
            fixes precision issues like limited decimal
            Num: integer decimal
            `,
        },
        "changeErrorText": {
            zh: "当运算出错时[menu]",
            en: "When operator have error :[menu]"
        },
        "changeErrorDecs": {
            zh: `
            出错处理 \n 有3选项
            -返回false 当错误时返回false
            -返回原生js错误 当错误时返回原生js报错
            -报错 当错误时会在控制台报错`,
            en: `
            Error handling
            have three menu thing
            -return false :When error return false
            -return javasprite error :When error return js error 
            -return error When error have a error`,
        },
        "changeSupportBooleanText": {
            zh: "是否[menu]布尔运算",
            en: "boolean [menu] operator"
        },
        "changeSupportBooleanDecs": {
            zh: `
            是否支持布尔运算 
            true为1,false为0 
            有2选项
            -支持：允许支持
            -不支持：禁用布尔
            `,
            en: `
            suppor or nonSuppor boolean operator
            true is 1,false is 0
            have two menu thing
            -Support:can boolean operator
            -nonSupport:cannot boolean operator
            `,
        },
        "SetMaxLoopLimitText": {
            zh: "设置安全循环上限为 [MaxNumber]",
            en: "Set max loop limit to [MaxNumber]"
        },
        "SetMaxLoopLimitDecs": {
            zh: `
            设置循环搜索的最大次数/数字范围上限，防止死循环或性能崩溃。
            MaxNumber: 正整数 表示循环最大次数
            `,
            en: `S
            et the maximum loop count
            number range upper bound to prevent infinite loops or performance crash.
            MxNumber: integer decimal
            `,
        },
        "SimpleOperator": {
            zh: "🛠️基础运算(08)",
            en: "🛠️ Simple operator(08)"
        },
        "AddText": {
            zh: "[Addend1] + [Addend2]",
            en: "[Addend1] + [Addend2]"
        },
        "AddDesc": {
            zh: `
            高精度加法 
            解决:
                0.1 + 0.2
                1e21 + 5
                防止高精度泄露
                防止科学计数法出现

            参数：
                Addend1: 
                    类型:数字
                    名字:加数1
                Addend2: 
                    类型:数字
                    名字:加数2
            `,
            en: `
            Big Decimal Add
            fixes precision issues like:
                0.1 + 0.2
                1e21 + 5
                prevent precision leaks
                prevent scientific notation

            Arguments:
                Addend1: 
                    type: number
                    name: addend
                Addend2: 
                    type: number
                    name: addend
            `,
        },
        "SubtractText": {
            zh: "[Minuend] - [Subtrahend]",
            en: "[Minuend] - [Subtrahend]"
        },
        "SubtractDesc": {
            zh: `高精度减法 
            解决:
                0.3 - 0.2
                1e21 - 5
                防止高精度泄露
                防止科学计数法出现

            参数：
                Minuend: 
                    类型：数字
                    名字：被减数
                Subtrahend: 
                    类型：数字
                    名字：减数
            `,
            en: `
            Big Decimal Subtract
            fixes precision issues like:
                0.3 - 0.2
                1e21 - 5
                prevent precision leaks
                prevent scientific notation

            Arguments:
                Minuend: 
                    type: number
                    name: minuend
                Subtrahend: 
                    type: number
                    name: subtrahend
            `,
        },
        "MultiplyText": {
            zh: "[Multiplier1] × [Multiplier2]",
            en: "[Multiplier1] × [Multiplier2]"
        },
        "MultiplyDesc": {
            zh: `
            高精度乘法 
            解决:
                0.1 × 0.2
                1e21 × 5
                防止高精度泄露
                防止科学计数法出现

            参数:
                Multiplier1: 
                    类型:数字
                    名字:乘数1
                Multiplier2: 
                    类型:数字
                    名字:乘数2
            `,
            en: `
            Big Decimal Multiply
            fixes precision issues like:
                0.1 × 0.2
                1e21 × 5
                prevent precision leaks
                prevent scientific notation

            Arguments:
                Multiplier1: 
                    type: number
                    name: multiplier
                Multiplier2: 
                    type: number
                    name: multiplier
            `,
        },
        "DivideText": {
            zh: "[Dividend] ÷ [Divisor]",
            en: "[Dividend] ÷ [Divisor]"
        },
        "DivideDesc": {
            zh: `
            高精度除法 
            解决:
                1 ÷ 0.03
                5 ÷ 3
                防止高精度泄露
                防止科学计数法出现

            参数：
                Dividend: 
                    类型: 数字
                    名字: 被除数
                Divisor: 
                    类型: 数字
                    名字: 除数(
                        不能为0
                    )
            `,
            en: `
            Big Decimal Multiply
            fixes precision issues like:
                1 ÷ 0.03
                5 ÷ 3
                prevent precision leaks
                prevent scientific notation

            Arguments:
                Dividend: 
                    type: number
                    name: diviend
                Divisor: 
                    type: number
                    name: divisor(
                        cannot be 0
                    )
            `,
        },
        "ModText": {
            zh: "[Dividend] ÷ [Divisor] 的余数",
            en: "[Dividend] mod [Divisor]"
        },
        "ModDesc": {
            zh: `
            高精度求余 
            解决:
                1 mod 0.03
                0.1 mod 0.3
                防止高精度泄露
                防止科学计数法出现

            参数：
                Dividend: 
                    类型: 数字
                    名字: 被除数
                Divisor: 
                    类型: 数字
                    名字: 除数(
                        不能为0
                    ),
            `,
            en: `
            Big Decimal Modulus 
            fixes precision issues like:
                1 mod 0.03
                0.1 mod 0.3
                prevent precision leaks
                prevent scientific notation

            Arguments:
                Dividend: 
                    type: number
                    name: dividend
                Divisor: 
                    type: number
                    name: divisor (cannot be 0)
            `,
        },
        "QuoText": {
            zh: "[Dividend] ÷ [Divisor] 的商数",
            en: "[Dividend] ÷ [Divisor] get quo"
        },
        "QuoDesc": {
            zh: `
            高精度求商 
            解决:
                1 quo 0.0003
                1e34 quo 4
                防止高精度泄露
                防止科学计数法出现

            参数：
                Dividend: 
                    类型: 数字
                    名字: 被除数
                Divisor: 
                    类型: 数字
                    名字: 除数(
                        不能为0
                    )
            `,
            en: `
            Big Decimal Quotient 
            fixes precision issues like:
                1 quo 0.0003
                1e34 quo 4
                prevent precision leaks
                prevent scientific notation

            Arguments:
                Dividend: 
                    type: number
                    name: dividend
                Divisor: 
                    type: number
                    name: divisor (cannot be 0)
            `,
        },
        "DivideDigitText": {
            zh: "[Dividend] ÷ [Divisor] 精度为 [Digit]",
            en: "[Dividend] ÷ [Divisor] digit [Digit]"
        },
        "DivideDigitDesc": {
            zh: `
            高精度除法（指定精度）
            解决:
                1 ÷ 3 保留指定位数
                0.1 ÷ 0.3 精确控制小数位
                防止高精度泄露
                防止科学计数法出现

            参数：
                Dividend: 
                    类型: 数字
                    名字: 被除数
                Divisor: 
                    类型: 数字
                    名字: 除数(
                        不能为0
                    )
                Digit: 
                    类型: 整数
                    名字: 保留位数（正数）
            `,
            en: `
            Big Decimal Divide (specified precision)
            fixes precision issues like:
                1 ÷ 3 with specified digits
                0.1 ÷ 0.3 with exact decimal control
                prevent precision leaks
                prevent scientific notation

            Arguments:
                Dividend: 
                    type: number
                    name: dividend
                Divisor: 
                    type: number
                    name: divisor (cannot be 0)
                Digit: 
                    type: integer
                    name: decimal places (positive)
            `,
        },
        "DivideDivText": {
            zh: "[Divisor] 除 [Dividend]",
            en: "[Divisor] divide [Dividend]"
        },
        "DivideDivDesc": {
            zh: `
            高精度"除"法（注意与"除以"区别）
            解决:
                1 除 3
                0.1 除 0.3
                防止高精度泄露
                防止科学计数法出现

            参数：
                Dividend: 
                    类型: 数字
                    名字: 被除数
                Divisor: 
                    类型: 数字
                    名字: 除数(
                        不能为0
                    )
            `,
            en: `
            Big Decimal "Divide" (Note the difference between "chu" and "chuyi")
            fixes precision issues like:
                1 divide 3
                0.1 divide 0.3
                prevent precision leaks
                prevent scientific notation

            Arguments:
                Dividend: 
                    type: number
                    name: dividend
                Divisor: 
                    type: number
                    name: divisor (cannot be 0)
            `,
        },
        "CardinalMultiplyText": {
            zh: "[Multiplier1]([Multiplier2])",
            en: "[Multiplier1]([Multiplier2])"
        },
        "CardinalMultiplyDesc": {
            zh: `
            括号乘法
            解决写公式时省略乘号的问题
            防止找半天也找不到乘法
            参数：
                Multiplier1: 
                    类型:数字
                    名字:乘数1
                Multiplier2: 
                    类型:数字
                    名字:乘数2
            `,
            en: `
            Bracket multiplication
            Fixes the problem of omitting multiplication signs when writing formulas
            Prevents spending a long time looking for multiplication
            Arguments:
                Multiplier1: 
                    type: number
                    name: multiplier
                Multiplier2: 
                    type: number
                    name: multiplier
            `,
        },
        "AdvancedOperator": {
            zh: "✨高级运算(08)",
            en: "✨Advanced operator(08)"
        },
        "PowerText": {
            zh: "[Base]^[Exponent]",
            en: "[Base]^[Exponent]"
        },
        "PowerDesc": {
            zh: `
            高精度幂运算 
            解决:
                0.0001 ^ 0.000004
                100000 ^ 1000
                防止高精度泄露
                防止科学计数法出现

            参数：
                Base: 
                    类型: 数字
                    名字: 底数
                Exponent: 
                    类型: 数字
                    名字: 指数(
                        当底数为0时:不能为0和负数
                        当底数为负数时:不能为0-1的小数
                    )
            `,
            en: `
            Big Decimal Power 
            fixes precision issues like:
                
                0.0001 ^ 0.000004
                100000 ^ 1000
                prevent precision leaks
                prevent scientific notation

            Arguments:
                Base: 
                    type: number
                    name: base
                Exponent: 
                    type: number
                    name: exponent (
                        When base is 0: cannot be 0 and negative
                        When base is negative: cannot be 0-1 fractional
                    )
            `,
        },
        "RootText": {
            zh: "[RootIndex]√[Radicand]",
            en: "[RootIndex]√[Radicand]"
        },
        "RootDesc": {
            zh: `
            高精度根运算 
            解决:
                ²√2
                ³√7
                防止高精度泄露
                防止科学计数法出现

            参数：
                RootIndex: 
                    类型: 数字
                    名字: 根指数
                Radicand: 
                    类型: 数字
                    名字: 被开方数(
                        负数的偶次根无实数解
                    )
            `,
            en: `
            Big Decimal Root 
            fixes precision issues like:
                ²√2
                ³√ 7
                prevent precision leaks
                prevent scientific notation

            Arguments:
                RootIndex: 
                    type: number
                    name: root index
                Radicand: 
                    type: number
                    name: radicand (
                        Negative numbers have no real even roots
                    )
            `,
        },
        "LogText": {
            zh: "log[Base][Logarithm]",
            en: "log[Base][Logarithm]"
        },
        "LogDesc": {
            zh: `
            高精度对数运算 
            解决:
                log 10 4
                log 1000000 5
                防止高精度泄露
                防止科学计数法出现

            参数：
                Base: 
                    类型: 数字
                    名字: 底数(
                        必须大于0且不等于1
                    )
                Logarithm: 
                    类型: 数字
                    名字: 真数(
                        必须大于0
                    )
            `,
            en: `
            Big Decimal Logarithm
            fixes precision issues like:
                log 10 4
                log 1000000 5
                prevent precision leaks
                prevent scientific notation

            Arguments:
                Base: 
                    type: number
                    name: base(
                        must be greater than 0 and not equal to 1
                    )
                Logarithm: 
                    type: number
                    name: argument(
                        must be greater than 0
                    )
            `,
        },
        "FactorialText": {
            zh: "([Number])!",
            en: "([Number])!"
        },
        "FactorialDesc": {
            zh: `
            高精度阶乘（支持小数）
            解决:
                1000000!
                0.5!
                防止高精度泄露
                防止科学计数法出现

            参数：
                Number: 
                    类型: 数字
                    名字: 输入数值(
                        负数的阶乘可能无实数解
                    )
            `,
            en: `
            High Precision Factorial (Supports Decimals)
            fixes precision issues like:
                1000000!
                0.5!
                Prevents precision leaks
                Prevents scientific notation

            Arguments:
                Number:
                    Type: Number
                    Name: Input Value (
                        Factorial of negative numbers may have no real solution
                    )
            `,
        },
        "TrigText": {
            zh: "[menu]([Number]°)",
            en: "[menu]([Number]°)"
        },
        "TrigDesc": {
            zh: `
            三角函数（角度制）
            解决:
                sin (31°)
                sin (100000°)
                防止高精度泄露
                防止科学计数法出现

            参数：
                menu: 
                    类型: 菜单
                    名字: 三角函数类型(
                        sin
                        cos
                        tan
                        cot
                        sec
                        csc
                    )
                Number: 
                    类型: 数字
                    名字: 角度值
            `,
            en: `
            Trigonometric functions (degrees)
            fixes precision issues like:
                sin (31°)
                sin (100000°)
                prevent precision leaks
                prevent scientific notation

            Arguments:
                menu: 
                    type: menu
                    name: trigonometric function type(
                        sin
                        cos
                        tan
                        cot
                        sec
                        csc
                    )
                Number: 
                    type: number
                    name: angle value
            `,
        },
        "ArctrigText": {
            zh: "[menu]([Number])",
            en: "[menu]([Number])"
        },
        "ArctrigDesc": {
            zh: `
            反三角函数（返回角度值）
            解决:
                asin (0.778°)
                asin(3°)
                防止高精度泄露
                防止科学计数法出现

            参数：
                menu: 
                    类型: 菜单
                    名字: 反三角函数类型(
                        asin
                        acos
                        atan
                        acot
                        asec
                        acsc
                    )
                Number: 
                    类型: 数字
                    名字: 比例值
            `,
            en: `
            Inverse trigonometric functions (returns degrees)
            fixes precision issues like:
                asin (0.778)
                asin (3)
                prevent precision leaks
                prevent scientific notation

            Arguments:
                menu: 
                    type: menu
                    name: inverse trigonometric function type(
                        asin
                        acos
                        atan
                        acot
                        asec
                        acsc
                    )
                Number: 
                    type: number
                    name: ratio value
            `,
        },
        "Atan2Text": {
            zh: "atan2 x:[x] y:[y]",
            en: "atan2 x:[x] y:[y]"
        },
        "Atan2Desc": {
            zh: `
            反正弦函数（简便版）
            解决:
                asin2(0.00000001,1000000)
                计算从x轴到点(x,y)的角度(角度制)
            参数:
                x:
                    类型:数字
                    名字：x坐标
                y:
                    类型：数字
                    名字：y坐标
            `,
            en: `
            arctan
            fixs precision issue like:
                asin2(0.00000001,1000000)
            Arguments:
                x:
                    type:number
                    name:x
                y:
                    type:number
                    name:y
            `,
        },
        "CalculateExpressionText": {
            zh: "计算 [expression]",
            en: "calculate [expression]"
        },
        "CalculateExpressionDesc": {
            zh: `
                解析并计算数学表达式
                支持：
                    - 运算符：+ - * / × ÷
                    - 括号：() [] 和大括号
                    - 函数：sin cos tan（角度制）
                示例：
                    sin(30) + (2×3) ÷ [5 - {1+1}]
                参数：
                    expression:
                        类型：字符串
                        名字：表达式
            `,
            en: `
                Parse and evaluate mathematical expressions
                Supports:
                    - Operators: + - * / × ÷
                    - Brackets: () [] and big bracket
                    - Functions: sin cos tan (in degrees)
                Examples:
                    sin(30) + (2×3) ÷ [5 - {1+1}]
                
                Arguments:
                    expression:
                        type:string(expression)
                        name:expression
            `,
        },
        "TriangularAddText": {
            zh: "[Number]的阶加",
            en: "triangular add of [Number]"
        },
        "TriangularAddDesc": {
            zh: `
            高精度阶加运算
            从0开始，以1为步长，累加到指定数值
            支持小数和负数
            示例：
            5的阶加 = 0+1+2+3+4+5 = 15
            0的阶加 = 0
            1的阶加 = 0+1 = 1
            0.1的阶加 = 0+0.1 = 0.1
            0.2的阶加 = 0+0.1+0.2 = 0.3
            -1的阶加 = -1+0 = -1
            -2的阶加 = -2+(-1)+0 = -3

            参数：
                Number: 
                    类型: 数字
                    名字: 目标数值
            `,
            en: `
            High precision triangular addition
            Sum from 0 to specified number with step 1
            Supports decimals and negative numbers
            Examples:
            triangular add of 5 = 0+1+2+3+4+5 = 15
            triangular add of 0 = 0
            triangular add of 1 = 0+1 = 1
            triangular add of 0.1 = 0+0.1 = 0.1
            triangular add of 0.2 = 0+0.1+0.2 = 0.3
            triangular add of -1 = -1+0 = -1
            triangular add of -2 = -2+(-1)+0 = -3

            Arguments:
                Number: 
                    type: number
                    name: target value
            `,
        },
        "KnuthArrowText": {
            zh: "[Base]↑↑[Index]",
            en: "[Base]↑↑[Index]"
        },
        "KnuthArrowDesc": {
            zh: `
            高精度高纳德箭头运算（迭代幂次）
            ↑↑表示双箭头运算（迭代幂次）
            计算规则：
            a↑↑0 = 1
            a↑↑1 = a
            a↑↑2 = a^a
            a↑↑3 = a^(a^a)
            以此类推

            参数：
                Base: 
                    类型: 数字
                    名字: 底数
                Index: 
                    类型: 数字
                    名字: 箭头指数（非负整数）
            `,
            en: `
            High precision Knuth's up-arrow notation (tetration)
            ↑↑ represents double arrow operation (tetration)
            Calculation rules:
            a↑↑0 = 1
            a↑↑1 = a
            a↑↑2 = a^a
            a↑↑3 = a^(a^a)
            and so on

            Arguments:
                Base: 
                    type: number
                    name: base
                Index: 
                    type: number
                    name: arrow index (non-negative integer)
            `,
        },
        "OtherOperator": {
            zh: "📚其他运算(05)",
            en: "📚Other operator(05)"
        },
        "NegativeNumberText": {
            zh: "-[Number]",
            en: "-[Number]"
        },
        "NegativeNumberDesc": {
            zh: `
            负号
            一元运算符
            将数字变成它的相反数
            参数:
                Number:
                    type:数字
                    name:值
            `,
            en: `
            negative
            Unary operator that negates a number
            Arguments:
                Number:
                    type:number
                    name:number
            `,
        },
        "AbsoluteText": {
            zh: "|[Number]|",
            en: "|[Number]|"
        },
        "AbsoluteDesc": {
            zh: `
            绝对值
            返回一个数的绝对值
            参数:
                Number: 
                    类型:数字
                    名字:值
            `,
            en: `
            Absolute value
            Returns the absolute value of a number
            Arguments:
                Number:
                    type: number
                    name: value
            `,
        },
        "NegativeAbsoluteText": {
            zh: "-|[Number]|",
            en: "-|[Number]|"
        },
        "NegativeAbsoluteDesc": {
            zh: `
            负绝对值
            返回一个数的绝对值的相反数
            参数:
                Number: 
                    类型:数字
                    名字:值
            `,
            en: `
            Negative absolute value
            Returns the negative of the absolute value of a number
            Arguments:
                Number:
                    type: number
                    name: value
            `,
        },
        "PercentText": {
            zh: "[Number]%",
            en: "[Number]%"
        },
        "PercentDesc": {
            zh: `
            百分比
            将数字转换为百分比形式（除以100）
            参数:
                Number: 
                    类型:数字
                    名字:值
            `,
            en: `
            Percentage
            Convert a number to percentage form (divide by 100)
            Arguments:
                Number:
                    type: number
                    name: value
            `,
        },
        "PercentOfText": {
            zh: "[Number]的[Percent]%",
            en: "[Number] of [Percent]%"
        },
        "PercentOfDesc": {
            zh: `
            计算百分比
            计算一个数的百分之几
            参数:
                Number: 
                    类型:数字
                    名字:基数
                Percent:
                    类型:数字
                    名字:百分比
            `,
            en: `
            Calculate percentage
            Calculate what percentage of a number
            Arguments:
                Number:
                    type: number
                    name: base
                Percent:
                    type: number
                    name: percentage
            `,
        },
        "ReciprocalText": {
            zh: "[Number]的倒数",
            en: "reciprocal of [Number]"
        },
        "ReciprocalDesc": {
            zh: `
            计算一个数的倒数
            即 1 除以该数

            参数：
                Number: 
                    类型: 数字
                    名字: 输入数值
            `,
            en: `
            Calculate the reciprocal of a number
            i.e., 1 divided by the number

            Arguments:
                Number: 
                    type: number
                    name: input value
            `,
        },
        "PositiveNumberText": {
            zh: "+[Number]",
            en: "+[Number]"
        },
        "PositiveNumberDesc": {
            zh: `
            正号运算符
            返回输入数值本身
            用于明确表示正数

            参数：
                Number: 
                    类型: 数字
                    名字: 输入数值
            `,
            en: `
            Positive sign operator
            Returns the input value itself
            Used to explicitly indicate a positive number

            Arguments:
                Number: 
                    type: number
                    name: input value
            `,
        },
        "DivideByTwoText": {
            zh: "[Number]÷2",
            en: "[Number]÷2"
        },
        "DivideByTwoDesc": {
            zh: `
            将数值除以2
            快速计算一半的数值

            参数：
                Number: 
                    类型: 数字
                    名字: 被除数
            `,
            en: `
            Divide the number by 2
            Quickly calculate half of a number

            Arguments:
                Number: 
                    type: number
                    name: dividend
            `,
        },
        "FastOperator": {
            zh: "⚡简便运算(06)",
            en: "⚡Fast Operator(06)"
        },
        "SquareText": {
            zh: "([Number])²",
            en: "([Number])²"
        },
        "SquareDesc": {
            zh: `
            平方
            计算一个数的平方（二次幂）
            参数:
                Number: 
                    类型:数字
                    名字:值
            `,
            en: `
            Square
            Calculate the square of a number (2nd power)
            Arguments:
                Number:
                    type: number
                    name: value
            `,
        },
        "CubeText": {
            zh: "([Number])³",
            en: "([Number])³"
        },
        "CubeDesc": {
            zh: `
            立方
            计算一个数的立方（三次幂）
            参数:
                Number: 
                    类型:数字
                    名字:值
            `,
            en: `
            Cube
            Calculate the cube of a number (3rd power)
            Arguments:
                Number:
                    type: number
                    name: value
            `,
        },
        "SquareRootText": {
            zh: "√([Number])",
            en: "√([Number])"
        },
        "SquareRootDesc": {
            zh: `
            平方根
            计算一个数的平方根（二次方根）
            参数:
                Number: 
                    类型:数字
                    名字:被开方数
            `,
            en: `
            Square root
            Calculate the square root of a number (2nd root)
            Arguments:
                Number:
                    type: number
                    name: radicand
            `,
        },
        "CubeRootText": {
            zh: "³√([Number])",
            en: "³√([Number])"
        },
        "CubeRootDesc": {
            zh: `
            立方根
            计算一个数的立方根（三次方根）
            参数:
                Number: 
                    类型:数字
                    名字:被开方数
            `,
            en: `
            Cube root
            Calculate the cube root of a number (3rd root)
            Arguments:
                Number:
                    type: number
                    name: radicand
            `,
        },
        "PowersText": {
            zh: "[Powers]([Number])",
            en: "[Powers]([Number])"
        },
        "PowersDesc": {
            zh: `
            幂函数
            计算不同底数的指数函数
            参数:
                Powers: 
                    类型:菜单
                    名字:幂函数类型
                Number:
                    类型:数字
                    名字:指数
            `,
            en: `
            Power functions
            Calculate exponential functions with different bases
            Arguments:
                Powers:
                    type: menu
                    name: power function type
                Number:
                    type: number
                    name: exponent
            `,
        },
        "LogsText": {
            zh: "[Logs]([Number])",
            en: "[Logs]([Number])"
        },
        "LogsDesc": {
            zh: `
            对数函数
            计算不同底数的对数函数
            参数:
                Logs: 
                    类型:菜单
                    名字:对数函数类型
                Number:
                    类型:数字
                    名字:真数
            `,
            en: `
            Logarithm functions
            Calculate logarithm functions with different bases
            Arguments:
                Logs:
                    type: menu
                    name: logarithm function type
                Number:
                    type: number
                    name: argument
            `,
        },
        "RangeOperator": {
            zh: "🌐范围运算(04)",
            en: "🌐 Range Operator"
        },
        "LimitInRangeText": {
            zh: "将 [Number] 限制在 [Min] 至 [Max]",
            en: "[Number] limit in [Min] to [Max]"
        },
        "LimitInRangeDesc": {
            zh: `
            限制数字在指定范围内
            如果数字在最小值和最大值之间，返回数字本身
            如果小于最小值，返回最小值
            如果大于最大值，返回最大值

            参数：
                Number: 
                    类型: 数字
                    名字: 输入数值
                Min: 
                    类型: 数字
                    名字: 最小值
                Max: 
                    类型: 数字
                    名字: 最大值（需 ≥ Min）
            `,
            en: `
            Limit a number within the specified range
            If the number is between min and max, return the number itself
            If less than min, return min
            If greater than max, return max

            Arguments:
                Number: 
                    Type: number
                    Name: Input value
                Min: 
                    Type: number
                    Name: Minimum value
                Max: 
                    Type: number
                    Name: Maximum value (must be ≥ Min)
            `,
        },
        "CycleInRangeText": {
            zh: "让 [Number] 在 [Min] 至 [Max] 中循环",
            en: "let [Number] cycles within [Min] to [Max]"
        },
        "CycleInRangeDesc": {
            zh: `
            将任意数在最小值至最大值中循环
            参数：
                Number: 
                    类型: 整数
                    名字: 输入数值
                Min: 
                    类型: 整数
                    名字: 最小值
                Max: 
                    类型: 整数
                    名字: 最大值（需 ≥ Min）
            `,
            en: `
            Cycles any number within the minimum to maximum range
            Arguments: 
                Number: 
                    Type: number
                    Name: Input value
                Min: 
                    Type: number
                    Name: Minimum value
                Max: 
                    Type: number
                    Name: Maximum value (must be ≥ Min)
            `,
        },
        "MapRangeText": {
            zh: "将 [Number] 从 [Min1]~[Max1] 映射到 [Min2]~[Max2]",
            en: "Map [Number] from [Min1]~[Max1] to [Min2]~[Max2]"
        },
        "MapRangeDesc": {
            zh: `
            将数字从一个范围线性映射到另一个范围
            公式：结果 = Min2 + (Number - Min1) × (Max2 - Min2) ÷ (Max1 - Min1)

            参数：
                Number: 
                    类型: 数字
                    名字: 输入数值
                Min1: 
                    类型: 数字
                    名字: 原范围最小值
                Max1: 
                    类型: 数字
                    名字: 原范围最大值
                Min2: 
                    类型: 数字
                    名字: 目标范围最小值
                Max2: 
                    类型: 数字
                    名字: 目标范围最大值
            `,
            en: `
            Linearly map a number from one range to another
            Formula: result = Min2 + (Number - Min1) × (Max2 - Min2) ÷ (Max1 - Min1)

            Arguments:
                Number: 
                    Type: number
                    Name: Input value
                Min1: 
                    Type: number
                    Name: Source range minimum
                Max1: 
                    Type: number
                    Name: Source range maximum
                Min2: 
                    Type: number
                    Name: Target range minimum
                Max2: 
                    Type: number
                    Name: Target range maximum
            `,
        },
        "LinearMapText": {
            zh: "将 [Number] 从 [Min] 映射到 [Max]",
            en: "Map [Number] from [Min] to [Max]"
        },
        "LinearMapDesc": {
            zh: `
            将数字从最小值线性映射到最大值
            公式：结果 = Min + Number × (Max - Min) ÷ 100
            常用于将百分比(0-100)映射到具体范围

            参数：
                Number: 
                    类型: 数字
                    名字: 输入数值（通常为0-100）
                Min: 
                    类型: 数字
                    名字: 目标范围最小值
                Max: 
                    类型: 数字
                    名字: 目标范围最大值
            `,
            en: `
            Linearly map a number from minimum to maximum
            Formula: result = Min + Number × (Max - Min) ÷ 100
            Commonly used to map percentages (0-100) to specific ranges

            Arguments:
                Number: 
                    Type: number
                    Name: Input value (usually 0-100)
                Min: 
                    Type: number
                    Name: Target range minimum
                Max: 
                    Type: number
                    Name: Target range maximum
            `,
        },
        "DecimalOperator": {
            zh: "📊小数运算(12)",
            en: "📊Decimal Operator(12)"
        },
        "RoundDecimalText": {
            zh: "[Menu]小数[Number]到小数点后[Digit]位",
            en: "[Menu] decimal [Number] to [Digit] places"
        },
        "RoundDecimalDesc": {
            zh: `
            将数字按照指定方式舍入到指定的小数位数
            支持三种舍入方式：
            - 四舍五入：最接近的数值
            - 向上取整：向正无穷方向取整
            - 向下取整：向负无穷方向取整

            参数：
                Menu: 
                    类型: 菜单
                    名字: 舍入方式
                Number: 
                    类型: 数字
                    名字: 输入数值
                Digit: 
                    类型: 整数
                    名字: 小数位数
            `,
            en: `
            Round a number to specified decimal places using the specified method
            Supports three rounding methods:
            - Round: to the nearest value
            - Ceil: towards positive infinity
            - Floor: towards negative infinity

            Arguments:
                Menu: 
                    Type: menu
                    Name: Rounding method
                Number: 
                    Type: number
                    Name: Input value
                Digit: 
                    Type: integer
                    Name: Decimal places
            `,
        },
        "RoundDecimalToIntText": {
            zh: "[Menu]小数[Number]",
            en: "[Menu] decimal [Number]"
        },
        "RoundDecimalToIntDesc": {
            zh: `
            将数字按照指定方式舍入到整数
            支持三种舍入方式：
            - 四舍五入：最接近的整数
            - 向上取整：向正无穷方向取整
            - 向下取整：向负无穷方向取整

            参数：
                Menu: 
                    类型: 菜单
                    名字: 舍入方式
                Number: 
                    类型: 数字
                    名字: 输入数值
            `,
            en: `
            Round a number to integer using the specified method
            Supports three rounding methods:
            - Round: to the nearest integer
            - Ceil: towards positive infinity
            - Floor: towards negative infinity

            Arguments:
                Menu: 
                    Type: menu
                    Name: Rounding method
                Number: 
                    Type: number
                    Name: Input value
            `,
        },
        "SimplifyDecimalText": {
            zh: "简化小数 [decimal]",
            en: "Simplify decimal [decimal]"
        },
        "SimplifyDecimalDesc": {
            zh: `
            去除小数部分末尾多余的零
            如果小数部分全为零则只保留整数部分

            示例：
            4 -> 4
            6.4 -> 6.4
            6.400 -> 6.4
            9.00000 -> 9
            6.45000 -> 6.45

            参数：
                decimal: 
                    类型: 数字
                    名字: 要化简的小数
            `,
            en: `
            Remove trailing zeros from the decimal part
            If the decimal part is all zeros, keep only the integer part

            Examples:
            4 -> 4
            6.4 -> 6.4
            6.400 -> 6.4
            9.00000 -> 9
            6.45000 -> 6.45

            Arguments:
                decimal: 
                    type: number
                    name: decimal to simplify
            `,
        },
        "RepeatingDecimalText": {
            zh: "循环小数[decimal]循环节[cycle]",
            en: "repeating decimal [decimal] cycle [cycle]"
        },
        "RepeatingDecimalDesc": {
            zh: `
            将小数表示为循环小数格式
            小数部分用大括号表示循环节
            循环节至少包含1个数字
            小数部分至少包含1个数字


            参数：
                decimal: 
                    类型: 数字
                    名字: 小数部分（至少1个数字）
                cycle: 
                    类型: 字符串
                    名字: 循环节（至少1个数字）
            `,
            en: `
            Represent decimal as repeating decimal format
            Use curly big braces to indicate repeating cycle
            Cycle must contain at least one digit
            Decimal part must contain at least one digit


            Arguments:
                decimal: 
                    type: number
                    name: decimal part (at least one digit)
                cycle: 
                    type: string
                    name: repeating cycle (at least one digit)
            `,
        },
        "ExtractCycleText": {
            zh: "小数[decimal]的循环节",
            en: "repeating cycle of decimal [decimal]"
        },
        "ExtractCycleDesc": {
            zh: `
            从循环小数表示中提取循环节
            如果没有循环节（没有花括号），则返回0


            参数：
                decimal: 
                    类型: 字符串
                    名字: 循环小数表示
            `,
            en: `
            Extract repeating cycle from repeating decimal notation
            If no cycle (no curly braces), return 0


            Arguments:
                decimal: 
                    type: string
                    name: repeating decimal notation
            `,
        },
        "RepeatingDecimalAddText": {
            zh: "[Addend1] + [Addend2]",
            en: "[Addend1] + [Addend2]"
        },
        "RepeatingDecimalAddDesc": {
            zh: `
            循环小数加法
            将循环小数转换为分数进行计算
            结果以循环小数形式返回


            参数：
                Addend1: 
                    类型: 字符串
                    名字: 第一个循环小数
                Addend2: 
                    类型: 字符串
                    名字: 第二个循环小数
            `,
            en: `
            Repeating decimal addition
            Convert repeating decimals to fractions for calculation
            Return result in repeating decimal form

            Arguments:
                Addend1: 
                    type: string
                    name: first repeating decimal
                Addend2: 
                    type: string
                    name: second repeating decimal
            `,
        },
        "RepeatingDecimalSubtractText": {
            zh: "[Minuend] - [Subtrahend]",
            en: "[Minuend] - [Subtrahend]"
        },
        "RepeatingDecimalSubtractDesc": {
            zh: `
            循环小数减法
            将循环小数转换为分数进行计算
            结果以循环小数形式返回


            参数：
                Minuend: 
                    类型: 字符串
                    名字: 被减数
                Subtrahend: 
                    类型: 字符串
                    名字: 减数
            `,
            en: `
            Repeating decimal subtraction
            Convert repeating decimals to fractions for calculation
            Return result in repeating decimal form


            Arguments:
                Minuend: 
                    type: string
                    name: minuend
                Subtrahend: 
                    type: string
                    name: subtrahend
            `,
        },
        "RepeatingDecimalMultiplyText": {
            zh: "[Multiplier1] × [Multiplier2]",
            en: "[Multiplier1] × [Multiplier2]"
        },
        "RepeatingDecimalMultiplyDesc": {
            zh: `
            循环小数乘法
            将循环小数转换为分数进行计算
            结果以循环小数形式返回


            参数：
                Multiplier1: 
                    类型: 字符串
                    名字: 第一个因数
                Multiplier2: 
                    类型: 字符串
                    名字: 第二个因数
            `,
            en: `
            Repeating decimal multiplication
            Convert repeating decimals to fractions for calculation
            Return result in repeating decimal form


            Arguments:
                Multiplier1: 
                    type: string
                    name: first factor
                Multiplier2: 
                    type: string
                    name: second factor
            `,
        },
        "RepeatingDecimalDivideText": {
            zh: "[Dividend] ÷ [Divisor]",
            en: "[Dividend] ÷ [Divisor]"
        },
        "RepeatingDecimalDivideDesc": {
            zh: `
            循环小数除法
            将循环小数转换为分数进行计算
            结果以循环小数形式返回


            参数：
                Dividend: 
                    类型: 字符串
                    名字: 被除数
                Divisor: 
                    类型: 字符串
                    名字: 除数
            `,
            en: `
            Repeating decimal division
            Convert repeating decimals to fractions for calculation
            Return result in repeating decimal form


            Arguments:
                Dividend: 
                    type: string
                    name: dividend
                Divisor: 
                    type: string
                    name: divisor
            `,
        },
        "RepeatingDecimalToFractionText": {
            zh: "循环小数[decimal]的分数",
            en: "fraction of repeating decimal [decimal]"
        },
        "RepeatingDecimalToFractionDesc": {
            zh: `
            将循环小数转换为分数
            返回分数形式的字符串


            参数：
                decimal: 
                    类型: 字符串
                    名字: 循环小数
            `,
            en: `
            Convert repeating decimal to fraction
            Return fraction as string


            Arguments:
                decimal: 
                    type: string
                    name: repeating decimal
            `,
        },
        "FractionToRepeatingDecimalText": {
            zh: "分数[fraction]的循环小数",
            en: "repeating decimal of fraction [fraction]"
        },
        "FractionToRepeatingDecimalDesc": {
            zh: `
            将分数转换为循环小数
            返回循环小数形式的字符串


            参数：
                fraction: 
                    类型: 字符串
                    名字: 分数（格式：分子/分母）
            `,
            en: `
            Convert fraction to repeating decimal
            Return repeating decimal as string


            Arguments:
                fraction: 
                    type: string
                    name: fraction (format: numerator/denominator)
            `,
        },
        "RepeatingDecimalToFixedText": {
            zh: "将循环小数[decimal]转成有限小数",
            en: "convert repeating decimal [decimal] to fixed decimal"
        },
        "RepeatingDecimalToFixedDesc": {
            zh: `
            将循环小数转换为指定精度的有限小数
            使用当前设置的精度（通过"设置精度"积木设置）
            循环节将重复计算直到达到指定的精度


            参数：
                decimal: 
                    类型: 字符串
                    名字: 循环小数
            `,
            en: `
            Convert repeating decimal to fixed decimal with specified precision
            Use current precision (set by "Set decimal" block)
            The repeating cycle will be calculated until reaching the specified precision


            Arguments:
                decimal: 
                    type: string
                    name: repeating decimal
            `,
        },
        "FractionPartText": {
            zh: "[Fraction]的[Part]",
            en: "[Part] of [Fraction]"
        },
        "FractionPartDesc": {
            zh: `
            获取分数的分子或分母
                    
            参数：
                Fraction: 
                    类型：字符串
                    名字：分数
                Part: 
                    类型：菜单
                    名字：分子或分母
            `,
            en: `
            Get numerator or denominator of a fraction
                    
            Arguments:
                Fraction: 
                    type: string
                    name: fraction
                Part: 
                    type: menu
                    name: numerator or denominator
            `,
        },
        "CreateFractionText": {
            zh: "[Denominator]分之[Numerator]",
            en: "[Denominator] over [Numerator]"
        },
        "CreateFractionDesc": {
            zh: `
            根据分子和分母创建分数
                    
            参数：
                分母: 
                    类型：数字
                    名字：分母
                分子: 
                    类型：数字
                    名字：分子
            `,
            en: `
            Create a fraction from numerator and denominator
                    
            Arguments:
                Denominator: 
                    type: number
                    name: denominator
                Numerator: 
                    type: number
                    name: numerator
            `,
        },
        "numerator": {
            zh: "分子",
            en: "numerator"
        },
        "denominator": {
            zh: "分母",
            en: "denominator"
        },
        "FractionOperator": {
            zh: "🔢分数运算(08)",
            en: "🔢Fraction Operator(08)"
        },
        "SimplifyFractionText": {
            zh: "简化分数 [Fraction]",
            en: "Simplify fraction [Fraction]"
        },
        "SimplifyFractionDesc": {
            zh: `
            将分数化为最简形式
            
            参数：
                Fraction: 
                    类型：字符串
                    名字：分数（格式：分子/分母 或 整数+分子/分母）
            `,
            en: `
            Reduce a fraction to its simplest form
            
            Arguments:
                Fraction: 
                    type: string
                    name: fraction (format: numerator/denominator or integer+numerator/denominator)
            `,
        },
        "MultiplySameFractionText": {
            zh: "分数 [Fraction] 同时乘 [Multiplier]",
            en: "Fraction [Fraction] multiply by [Multiplier]"
        },
        "MultiplySameFractionDesc": {
            zh: `
            将分数乘以一个数
            
            参数：
                Fraction: 
                    类型：字符串
                    名字：分数（格式：分子/分母 或 整数+分子/分母）
                Multiplier: 
                    类型：数字
                    名字：乘数
            `,
            en: `
            Multiply a fraction by a number
            
            Arguments:
                Fraction: 
                    type: string
                    name: fraction (format: numerator/denominator or integer+numerator/denominator)
                Multiplier: 
                    type: number
                    name: multiplier
            `,
        },
        "ToMixedNumberText": {
            zh: "分数 [Fraction] 转换成带分数",
            en: "Convert fraction [Fraction] to mixed number"
        },
        "ToMixedNumberDesc": {
            zh: `
            将假分数转换为带分数
            
            参数：
                Fraction: 
                    类型：字符串
                    名字：分数（格式：分子/分母）
            `,
            en: `
            Convert an improper fraction to a mixed number
            
            Arguments:
                Fraction: 
                    type: string
                    name: fraction (format: numerator/denominator)
            `,
        },
        "ToImproperFractionText": {
            zh: "带分数 [Fraction] 转换成假分数",
            en: "Convert mixed number [Fraction] to improper fraction"
        },
        "ToImproperFractionDesc": {
            zh: `
            将带分数转换为假分数
            
            参数：
                Fraction: 
                    类型：字符串
                    名字：带分数（格式：整数+分子/分母）
            `,
            en: `
            Convert a mixed number to an improper fraction
            
            Arguments:
                Fraction: 
                    type: string
                    name: mixed number (format: integer+numerator/denominator)
            `,
        },
        "AddFractionText": {
            zh: "[Addend1] + [Addend2]",
            en: "[Addend1] + [Addend2]"
        },
        "AddFractionDesc": {
            zh: `
            分数加法
            计算两个分数的和
            
            参数：
                Addend1: 
                    类型：字符串
                    名字：第一个分数
                Addend2: 
                    类型：字符串
                    名字：第二个分数
            `,
            en: `
            Fraction addition
            Calculate the sum of two fractions
            
            Arguments:
                Addend1: 
                    type: string
                    name: first fraction
                Addend2: 
                    type: string
                    name: second fraction
            `,
        },
        "SubtractFractionText": {
            zh: "[Minuend] - [Subtrahend]",
            en: "[Minuend] - [Subtrahend]"
        },
        "SubtractFractionDesc": {
            zh: `
            分数减法
            计算两个分数的差
            
            参数：
                Minuend: 
                    类型：字符串
                    名字：被减数
                Subtrahend: 
                    类型：字符串
                    名字：减数
            `,
            en: `
            Fraction subtraction
            Calculate the difference of two fractions
            
            Arguments:
                Minuend: 
                    type: string
                    name: minuend
                Subtrahend: 
                    type: string
                    name: subtrahend
            `,
        },
        "MultiplyFractionText": {
            zh: "[Multiplier1] × [Multiplier2]",
            en: "[Multiplier1] × [Multiplier2]"
        },
        "MultiplyFractionDesc": {
            zh: `
            分数乘法
            计算两个分数的积
            
            参数：
                Multiplier1: 
                    类型：字符串
                    名字：第一个分数
                Multiplier2: 
                    类型：字符串
                    名字：第二个分数
            `,
            en: `
            Fraction multiplication
            Calculate the product of two fractions
            
            Arguments:
                Multiplier1: 
                    type: string
                    name: first fraction
                Multiplier2: 
                    type: string
                    name: second fraction
            `,
        },
        "DivideFractionText": {
            zh: "[Dividend] ÷ [Divisor]",
            en: "[Dividend] ÷ [Divisor]"
        },
        "DivideFractionDesc": {
            zh: `
            分数除法
            计算两个分数的商
            
            参数：
                Dividend: 
                    类型：字符串
                    名字：被除数
                Divisor: 
                    类型：字符串
                    名字：除数
            `,
            en: `
            Fraction division
            Calculate the quotient of two fractions
            
            Arguments:
                Dividend: 
                    type: string
                    name: dividend
                Divisor: 
                    type: string
                    name: divisor
            `,
        },
        "TrigOperator": {
            zh: "✂️三角运算(06)",
            en: "✂️Trigonometric Operations(06)"
        },
        "TrigRadText": {
            zh: "[menu]([Radians])",
            en: "[menu]([Radians])"
        },
        "TrigRadDesc": {
            zh: `
            三角函数（弧度制）
            参数：
                menu: 
                    类型: 菜单
                    名字: 三角函数类型
                Radians: 
                    类型: 数字
                    名字: 弧度值
            `,
            en: `
            Trigonometric functions (radians)
            Arguments:
                menu: 
                    type: menu
                    name: trigonometric function type
                Radians: 
                    type: number
                    name: radian value
            `,
        },
        "ArctrigRadText": {
            zh: "[menu]([Radians])",
            en: "[menu]([Radians])"
        },
        "ArctrigRadDesc": {
            zh: `
            反三角函数（返回弧度值）
            参数：
                menu: 
                    类型: 菜单
                    名字: 反三角函数类型
                Radians: 
                    类型: 数字
                    名字: 比例值
            `,
            en: `
            Inverse trigonometric functions (returns radians)
            Arguments:
                menu: 
                    type: menu
                    name: inverse trigonometric function type
                Radians: 
                    type: number
                    name: ratio value
            `,
        },
        "HyperbolicText": {
            zh: "[menu]([Radians])",
            en: "[menu]([Radians])"
        },
        "HyperbolicDesc": {
            zh: `
            双曲函数
            参数：
                menu: 
                    类型: 菜单
                    名字: 双曲函数类型
                Radians: 
                    类型: 数字
                    名字: 弧度值
            `,
            en: `
            Hyperbolic functions
            Arguments:
                menu: 
                    type: menu
                    name: hyperbolic function type
                Radians: 
                    type: number
                    name: radian value
            `,
        },
        "AhyperbolicText": {
            zh: "[menu]([Radians])",
            en: "[menu]([Radians])"
        },
        "AhyperbolicDesc": {
            zh: `
            反双曲函数
            参数：
                menu: 
                    类型: 菜单
                    名字: 反双曲函数类型
                Radians: 
                    类型: 数字
                    名字: 数值
            `,
            en: `
            Inverse hyperbolic functions
            Arguments:
                menu: 
                    type: menu
                    name: inverse hyperbolic function type
                Radians: 
                    type: number
                    name: value
            `,
        },
        "ConvertText": {
            zh: "将[Value]转成[Menu]",
            en: "Convert [Value] to [Menu]"
        },
        "ConvertDesc": {
            zh: `
            转换为角度值或者弧度制

            参数：
                Value: 
                    类型: 数字
                    名字: 值
                Menu: 
                    类型: 菜单
                    名字: 选择角度值或者弧度制
                    `,
            en: `
            Convert value to rad or ang

            Argumets
                Value: 
                    type: number
                    name: value
                Menu: 
                    type: menu
                    name: menu 
                    `,
        },
        "HypotenuseText": {
            zh: "√([a]²+[b]²)",
            en: "√([a]²+[b]²)"
        },
        "HypotenuseDesc": {
            zh: `
            计算直角三角形的斜边长度
            使用勾股定理：c = √(a² + b²)
            参数：
                a: 
                    类型: 数字
                    名字: 直角边a
                b: 
                    类型: 数字
                    名字: 直角边b
            `,
            en: `
            Calculate the hypotenuse of a right triangle
            Using Pythagorean theorem: c = √(a² + b²)
            Arguments:
                a: 
                    type: number
                    name: leg a
                b: 
                    type: number
                    name: leg b
            `,
        },
        "ProportionOperator": {
            zh: "📏比的运算(09)",
            en: "📏Proportion Operator(09)"
        },
        "ProportionToFractionText": {
            zh: "比[Proportion]转换为分数",
            en: "proportion [Proportion] to fraction"
        },
        "ProportionToFractionDesc": {
            zh: `
            将比转换为分数形式
            支持格式：a:b 或 a/b
            示例：3:4 → 3/4
            参数：
                Proportion: 
                    类型：字符串
                    名字：比
            `,
            en: `
            Convert proportion to fraction form
            Supports formats: a:b or a/b
            Example: 3:4 → 3/4
            Arguments:
                Proportion: 
                    type: string
                    name: proportion
            `,
        },
        "FractionToProportionText": {
            zh: "分数[Proportion]转换为比",
            en: "fraction [Proportion] to proportion"
        },
        "FractionToProportionDesc": {
            zh: `
            将分数转换为比的形式
            支持格式：a/b 或 a:b
            示例：3/4 → 3:4
            参数：
                Proportion: 
                    类型：字符串
                    名字：分数或比
            `,
            en: `
            Convert fraction to proportion form
            Supports formats: a/b or a:b
            Example: 3/4 → 3:4
            Arguments:
                Proportion: 
                    type: string
                    name: fraction or proportion
            `,
        },
        "ProportionPartText": {
            zh: "比[Proportion]的[Part]",
            en: "[Part] of proportion [Proportion]"
        },
        "ProportionPartDesc": {
            zh: `
            获取比例的前项或后项
            参数：
                Proportion: 
                    类型：字符串
                    名字：比
                Part: 
                    类型：菜单
                    名字：前项或后项
            `,
            en: `
            Get the antecedent or consequent of a proportion
            Arguments:
                Proportion: 
                    type: string
                    name: proportion
                Part: 
                    type: menu
                    name: antecedent or consequent
            `,
        },
        "SimplifyProportionText": {
            zh: "简化比[Proportion]",
            en: "Simplify proportion [Proportion]"
        },
        "SimplifyProportionDesc": {
            zh: `
            简化比例到最简形式
            示例：4:8 → 1:2
            参数：
                Proportion: 
                    类型：字符串
                    名字：比
            `,
            en: `
            Simplify proportion to simplest form
            Example: 4:8 → 1:2
            Arguments:
                Proportion: 
                    type: string
                    name: proportion
            `,
        },
        "MultiplySameProportionText": {
            zh: "[Proportion]同时乘[Multiplier]",
            en: "[Proportion] multiply by [Multiplier]"
        },
        "MultiplySameProportionDesc": {
            zh: `
            比的前项和后项同时乘以一个数
            比的性质：a:b = (a×k):(b×k)
            参数：
                Proportion: 
                    类型：字符串
                    名字：比
                Multiplier: 
                    类型：数字
                    名字：乘数
            `,
            en: `
            Multiply both terms of proportion by a number
            Proportion property: a:b = (a×k):(b×k)
            Arguments:
                Proportion: 
                    type: string
                    name: proportion
                Multiplier: 
                    type: number
                    name: multiplier
            `,
        },
        "AddProportionText": {
            zh: "[Addend1] + [Addend2]",
            en: "[Addend1] + [Addend2]"
        },
        "AddProportionDesc": {
            zh: `
            比的加法
            解决比之间的加法运算
            支持格式：a:b 或 a/b
            示例：1:2 + 1:3

            参数：
                Addend1: 
                    类型：字符串
                    名字：第一个比
                Addend2: 
                    类型：字符串
                    名字：第二个比
            `,
            en: `
            Proportion addition
            Solve addition operations between proportions
            Supports formats: a:b or a/b
            Example: 1:2 + 1:3

            Arguments:
                Addend1: 
                    type: string
                    name: first proportion
                Addend2: 
                    type: string
                    name: second proportion
            `,
        },
        "SubtractProportionText": {
            zh: "[Minuend] - [Subtrahend]",
            en: "[Minuend] - [Subtrahend]"
        },
        "SubtractProportionDesc": {
            zh: `
            比的减法
            解决比之间的减法运算
            支持格式：a:b 或 a/b
            示例：1:2 - 1:3

            参数：
                Minuend: 
                    类型：字符串
                    名字：被减数
                Subtrahend: 
                    类型：字符串
                    名字：减数
            `,
            en: `
            Proportion subtraction
            Solve subtraction operations between proportions
            Supports formats: a:b or a/b
            Example: 1:2 - 1:3

            Arguments:
                Minuend: 
                    type: string
                    name: minuend
                Subtrahend: 
                    type: string
                    name: subtrahend
            `,
        },
        "MultiplyProportionText": {
            zh: "[Multiplier1] × [Multiplier2]",
            en: "[Multiplier1] × [Multiplier2]"
        },
        "MultiplyProportionDesc": {
            zh: `
            比的乘法
            解决比之间的乘法运算
            支持格式：a:b 或 a/b
            示例：1:2 × 2:3

            参数：
                Multiplier1: 
                    类型：字符串
                    名字：第一个比
                Multiplier2: 
                    类型：字符串
                    名字：第二个比
            `,
            en: `
            Proportion multiplication
            Solve multiplication operations between proportions
            Supports formats: a:b or a/b
            Example: 1:2 × 2:3

            Arguments:
                Multiplier1: 
                    type: string
                    name: first proportion
                Multiplier2: 
                    type: string
                    name: second proportion
            `,
        },
        "DivideProportionText": {
            zh: "[Dividend] ÷ [Divisor]",
            en: "[Dividend] ÷ [Divisor]"
        },
        "DivideProportionDesc": {
            zh: `
            比的除法
            解决比之间的除法运算
            支持格式：a:b 或 a/b
            示例：1:2 ÷ 2:3

            参数：
                Dividend: 
                    类型：字符串
                    名字：第一个比
                Divisor: 
                    类型：字符串
                    名字：第二个比
            `,
            en: `
            Proportion division
            Solve division operations between proportions
            Supports formats: a:b or a/b
            Example: 1:2 ÷ 2:3

            Arguments:
                Dividend: 
                    type: string
                    name: dividend
                Divisor: 
                    type: string
                    name: divisor
            `,
        },
        "BigNumberOperator": {
            zh: "🔢大数字运算(12)",
            en: "🔢Big Number Operations(12)"
        },
        "BigAddText": {
            zh: "[Num1] + [Num2]",
            en: "Big number [Num1] + [Num2]"
        },
        "BigAddDesc": {
            zh: `
            大整数加法
            支持任意长度的整数相加
            参数：
                Num1: 
                    类型: 字符串, 
                    名字: 大数1
                Num2: 
                    类型: 字符串, 
                    名字: 大数2
            `,
            en: `
            Big integer addition
            Supports integers of any length
            Arguments:
                Num1: 
                    type: string, 
                    name: big number 1
                Num2: 
                    type: string, 
                    name: big number 2
            `,
        },
        "BigSubtractText": {
            zh: "[Num1] - [Num2]",
            en: "Big number [Num1] - [Num2]"
        },
        "BigSubtractDesc": {
            zh: `
            大整数减法
            支持任意长度的整数相减
            参数：
                Num1: 
                    类型: 字符串, 
                    名字: 被减数
                Num2: 
                    类型: 字符串, 
                    名字: 减数
            `,
            en: `
            Big integer subtraction
            Supports integers of any length
            Arguments:
                Num1: 
                    type: string, 
                    name: minuend
                Num2: 
                    type: string, 
                    name: subtrahend
            `,
        },
        "BigMultiplyText": {
            zh: "[Num1] × [Num2]",
            en: "Big number [Num1] × [Num2]"
        },
        "BigMultiplyDesc": {
            zh: `
            大整数乘法
            支持任意长度的整数相乘
            参数：
                Num1: 
                    类型: 字符串, 
                    名字: 乘数1
                Num2: 
                    类型: 字符串, 
                    名字: 乘数2
            `,
            en: `
            Big integer multiplication
            Supports integers of any length
            Arguments:
                Num1: 
                    type: string, 
                    name: multiplier 1
                Num2: 
                    type: string, 
                    name: multiplier 2
            `,
        },
        "BigDivideText": {
            zh: "[Dividend] ÷ [Divisor]",
            en: "Big number [Dividend] ÷ [Divisor]"
        },
        "BigDivideDesc": {
            zh: `
            大整数除法（返回整数商）
            支持任意长度的整数相除
            参数：
                Dividend: 
                    类型: 字符串, 
                    名字: 被除数
                Divisor: 
                    类型: 字符串, 
                    名字: 除数
            `,
            en: `
            Big integer division (integer quotient)
            Supports integers of any length
            Arguments:
                Dividend: 
                    type: string, 
                    name: dividend
                Divisor: 
                    type: string, 
                    name: divisor
            `,
        },
        "BigModText": {
            zh: "[Dividend] ÷ [Divisor] 的余数",
            en: "Big number [Dividend] ÷ [Divisor] remainder"
        },
        "BigModDesc": {
            zh: `
            大整数取余
            支持任意长度的整数取余
            参数：
                Dividend: 
                    类型: 字符串, 
                    名字: 被除数
                Divisor: 
                    类型: 字符串, 
                    名字: 除数
            `,
            en: `
            Big integer modulo
            Supports integers of any length
            Arguments:
                Dividend: 
                    type: string, 
                    name: dividend
                Divisor: 
                    type: string, 
                    name: divisor
            `,
        },
        "BigQuotientText": {
            zh: "[Dividend] ÷ [Divisor] 的商数",
            en: "Big number [Dividend] ÷ [Divisor] integer quotient"
        },
        "BigQuotientDesc": {
            zh: `
            大整数求整数商
            支持任意长度的整数除法
            参数：
                Dividend: 
                    类型: 字符串, 
                    名字: 被除数
                Divisor: 
                    类型: 字符串, 
                    名字: 除数
            `,
            en: `
            Big integer integer quotient
            Supports integers of any length
            Arguments:
                Dividend: 
                    type: string, 
                    name: dividend
                Divisor: 
                    type: string, 
                    name: divisor
            `,
        },
        "BigAbsoluteText": {
            zh: "| [Num] |",
            en: "Big number absolute value [Num]"
        },
        "BigAbsoluteDesc": {
            zh: `
            大整数绝对值
            返回大整数的绝对值
            参数：
                Num: 
                    类型: 字符串, 
                    名字: 大数
            `,
            en: `
            Big integer absolute value
            Returns absolute value of big integer
            Arguments:
                Num: 
                    type: string, 
                    name: big number
            `,
        },
        "BigNegativeText": {
            zh: "-[Num]",
            en: "Big number negative -[Num]"
        },
        "BigNegativeDesc": {
            zh: `
            大整数取负
            返回大整数的相反数
            参数：
                Num: 
                    类型: 字符串, 
                    名字: 大数
            `,
            en: `
            Big integer negation
            Returns negative of big integer
            Arguments:
                Num: 
                    type: string, 
                    name: big number
            `,
        },
        "BigPowText": {
            zh: "[Base]^[Exponent]",
            en: "Big number [Base]^[Exponent]"
        },
        "BigPowDesc": {
            zh: `
            大整数幂运算
            计算大整数的整数次幂
            参数：
                Base: 
                    类型: 字符串, 
                    名字: 底数
                Exponent: 
                    类型: 字符串, 
                    名字: 指数（非负整数）
            `,
            en: `
            Big integer power
            Calculates power of big integers
            Arguments:
                Base: 
                    type: string, 
                    name: base
                Exponent: 
                    type: string, 
                    name: exponent (non-negative integer)
            `,
        },
        "BigPowModText": {
            zh: "[Base]^[Exponent] mod [Mod]",
            en: "Big number [Base]^[Exponent] mod [Mod]"
        },
        "BigPowModDesc": {
            zh: `
            大整数模幂运算
            边幂边模，高效计算 (Base^Exponent) mod Mod
            参数：
                Base: 
                    类型: 字符串, 
                    名字: 底数
                Exponent: 
                    类型: 字符串, 
                    名字: 指数（非负整数）
                Mod: 
                    类型: 字符串, 
                    名字: 模数
            `,
            en: `
            Big integer modular exponentiation
            Efficiently calculates (Base^Exponent) mod Mod
            Arguments:
                Base: 
                    type: string, 
                    name: base
                Exponent: 
                    type: string, 
                    name: exponent (non-negative integer)
                Mod: 
                    type: string, 
                    name: modulus
            `,
        },
        "BigRootText": {
            zh: "[RootIndex]√[Radicand]",
            en: "[RootIndex]√[Radicand]"
        },
        "BigRootDesc": {
            zh: `
            大整数开根（返回整数部分）
            计算大整数的整数次方根的整数部分
            参数：
                RootIndex: 
                    类型: 字符串, 
                    名字: 根指数
                Radicand: 
                    类型: 字符串, 
                    名字: 被开方数
            `,
            en: `
            Big integer root (integer part)
            Calculates integer part of big integer root
            Arguments:
                RootIndex: 
                    type: string, 
                    name: root index
                Radicand: 
                    type: string, 
                    name: radicand
            `,
        },
        "ImaginaryOperator": {
            zh: "🔮虚数运算(10)",
            en: "🔮Imaginary Operations(10)"
        },
        "CreateImaginaryText": {
            zh: "创建虚数[Number]i",
            en: "Create imaginary [Number]i"
        },
        "CreateImaginaryDesc": {
            zh: `
            创建纯虚数
            规则：
                3 -> 3i
                0 -> 0
                1 -> i
                -1 -> -i
                
            参数：
                Number: 
                    类型：数字
                    名字：虚数系数
            `,
            en: `
            Create pure imaginary number
            Rules:
                3 -> 3i
                0 -> 0
                1 -> i
                -1 -> -i
                
            Arguments:
                Number: 
                    type: number
                    name: imaginary coefficient
            `,
        },
        "GetImaginaryPartText": {
            zh: "虚数[Imaginary]的数字",
            en: "Number part of imaginary [Imaginary]"
        },
        "GetImaginaryPartDesc": {
            zh: `
            获取虚数的系数部分
            规则：
                3i -> 3
                0i -> 0
                i -> 1
                -i -> -1
                
            参数：
                Imaginary: 
                    类型：字符串
                    名字：虚数
            `,
            en: `
            Get the coefficient part of an imaginary number
            Rules:
                3i -> 3
                0i -> 0
                i -> 1
                -i -> -1
                
            Arguments:
                Imaginary: 
                    type: string
                    name: imaginary number
            `,
        },
        "ImaginaryAddText": {
            zh: "[Addend1] + [Addend2]",
            en: "[Addend1] + [Addend2]"
        },
        "ImaginaryAddDesc": {
            zh: `
            虚数加法
            将两个虚数的系数相加
            
            参数：
                Addend1: 
                    类型：字符串
                    名字：第一个虚数
                Addend2: 
                    类型：字符串
                    名字：第二个虚数
            `,
            en: `
            Imaginary number addition
            Add the coefficients of two imaginary numbers
            
            Arguments:
                Addend1: 
                    type: string
                    name: first imaginary
                Addend2: 
                    type: string
                    name: second imaginary
            `,
        },
        "ImaginarySubtractText": {
            zh: "[Minuend] - [Subtrahend]",
            en: "[Minuend] - [Subtrahend]"
        },
        "ImaginarySubtractDesc": {
            zh: `
            虚数减法
            将两个虚数的系数相减
            
            参数：
                Minuend: 
                    类型：字符串
                    名字：被减数
                Subtrahend: 
                    类型：字符串
                    名字：减数
            `,
            en: `
            Imaginary number subtraction
            Subtract the coefficients of two imaginary numbers
            
            Arguments:
                Minuend: 
                    type: string
                    name: minuend
                Subtrahend: 
                    type: string
                    name: subtrahend
            `,
        },
        "ImaginaryMultiplyText": {
            zh: "[Multiplier1] × [Multiplier2]",
            en: "[Multiplier1] × [Multiplier2]"
        },
        "ImaginaryMultiplyDesc": {
            zh: `
            虚数乘法
            计算两个虚数的乘积
            
            注意：
                i × i = -1
                
            参数：
                Multiplier1: 
                    类型：字符串
                    名字：第一个虚数
                Multiplier2: 
                    类型：字符串
                    名字：第二个虚数
            `,
            en: `
            Imaginary number multiplication
            Calculate the product of two imaginary numbers
            
            Note:
                i × i = -1
                
            Arguments:
                Multiplier1: 
                    type: string
                    name: first imaginary
                Multiplier2: 
                    type: string
                    name: second imaginary
            `,
        },
        "ImaginaryDivideText": {
            zh: "[Dividend] ÷ [Divisor]",
            en: "[Dividend] ÷ [Divisor]"
        },
        "ImaginaryDivideDesc": {
            zh: `
            虚数除法
            计算两个虚数的商
            
            参数：
                Dividend: 
                    类型：字符串
                    名字：被除数
                Divisor: 
                    类型：字符串
                    名字：除数
            `,
            en: `
            Imaginary number division
            Calculate the quotient of two imaginary numbers
            
            Arguments:
                Dividend: 
                    type: string
                    name: dividend
                Divisor: 
                    type: string
                    name: divisor
            `,
        },
        "ImaginaryModText": {
            zh: "[Dividend] ÷ [Divisor]的余数",
            en: "[Dividend] ÷ [Divisor] remainder"
        },
        "ImaginaryModDesc": {
            zh: `
            虚数取余
            计算虚数除法的余数
            
            参数：
                Dividend: 
                    类型：字符串
                    名字：被除数
                Divisor: 
                    类型：字符串
                    名字：除数
            `,
            en: `
            Imaginary number modulus
            Calculate remainder of imaginary division
            
            Arguments:
                Dividend: 
                    type: string
                    name: dividend
                Divisor: 
                    type: string
                    name: divisor
            `,
        },
        "ImaginaryQuoText": {
            zh: "[Dividend] ÷ [Divisor]的商数",
            en: "[Dividend] ÷ [Divisor] quotient"
        },
        "ImaginaryQuoDesc": {
            zh: `
            虚数求商
            计算虚数除法的整数商
            
            参数：
                Dividend: 
                    类型：字符串
                    名字：被除数
                Divisor: 
                    类型：字符串
                    名字：除数
            `,
            en: `
            Imaginary number quotient
            Calculate integer quotient of imaginary division
            
            Arguments:
                Dividend: 
                    type: string
                    name: dividend
                Divisor: 
                    type: string
                    name: divisor
            `,
        },
        "ImaginaryPowerText": {
            zh: "[Base]^[Index]",
            en: "[Base]^[Index]"
        },
        "ImaginaryPowerDesc": {
            zh: `
            虚数幂运算
            计算虚数的整数次幂
            
            注意：
                i^2 = -1
                i^3 = -i
                i^4 = 1
                
            参数：
                Base: 
                    类型：字符串
                    名字：底数（虚数）
                Index: 
                    类型：数字
                    名字：指数（整数）
            `,
            en: `
            Imaginary number power
            Calculate integer power of imaginary number
            
            Note:
                i^2 = -1
                i^3 = -i
                i^4 = 1
                
            Arguments:
                Base: 
                    type: string
                    name: base (imaginary)
                Index: 
                    type: number
                    name: exponent (integer)
            `,
        },
        "ImaginaryRootText": {
            zh: "[RootIndex]√([Base])",
            en: "[RootIndex]√([Base])"
        },
        "ImaginaryRootDesc": {
            zh: `
            虚数开根
            计算虚数的根
            
            注意：
                √(-1) = i
                √(-4) = 2i
                
            参数：
                RootIndex: 
                    类型：数字
                    名字：根指数
                Base: 
                    类型：字符串
                    名字：被开方数（虚数）
            `,
            en: `
            Imaginary number root
            Calculate root of imaginary number
            
            Note:
                √(-1) = i
                √(-4) = 2i
                
            Arguments:
                RootIndex: 
                    type: number
                    name: root index
                Base: 
                    type: string
                    name: radicand (imaginary)
            `,
        },
        "ImaginaryToRealText": {
            zh: "虚数[Imaginary]的实部",
            en: "Real part of imaginary [Imaginary]"
        },
        "ImaginaryToRealDesc": {
            zh: `
            获取虚数的实部（纯虚数的实部为0）
            
            参数：
                Imaginary: 
                    类型：字符串
                    名字：虚数
            `,
            en: `
            Get the real part of an imaginary number (0 for pure imaginary)
            
            Arguments:
                Imaginary: 
                    type: string
                    name: imaginary number
            `,
        },
        "RealToImaginaryText": {
            zh: "实数[Number]的虚部",
            en: "Imaginary part of real [Number]"
        },
        "RealToImaginaryDesc": {
            zh: `
            将实数转换为虚数（实部为0，虚部为给定实数）
            
            参数：
                Number: 
                    类型：数字
                    名字：实数
            `,
            en: `
            Convert real number to imaginary (real part 0, imaginary part given number)
            
            Arguments:
                Number: 
                    type: number
                    name: real number
            `,
        },
        "ComplexOperator": {
            zh: "🔮复数运算(14)",
            en: "🔮Complex Operations(14)"
        },
        "CreateComplexText": {
            zh: "创建复数[Real]+[Imaginary]i",
            en: "Create complex [Real]+[Imaginary]i"
        },
        "CreateComplexDesc": {
            zh: `
            创建复数
            规则：
                3, 3 -> 3+3i
                0, 0 -> 0
                0, 1 -> i
                1, 0 -> 1
                -1, 2 -> -1+2i
                
            参数：
                Real: 
                    类型：数字
                    名字：实部
                Imaginary: 
                    类型：数字
                    名字：虚部
            `,
            en: `
            Create a complex number
            Rules:
                3, 3 -> 3+3i
                0, 0 -> 0
                0, 1 -> i
                1, 0 -> 1
                -1, 2 -> -1+2i
                
            Arguments:
                Real: 
                    type: number
                    name: real part
                Imaginary: 
                    type: number
                    name: imaginary part
            `,
        },
        "GetComplexPartText": {
            zh: "复数[Complex]的[Part]",
            en: "[Part] of complex [Complex]"
        },
        "GetComplexPartDesc": {
            zh: `
            获取复数的实部或虚部
            规则：
                4+3i, 实部 -> 4
                4+3i, 虚部 -> 3
                0+0i, 实部 -> 0
                0+0i, 虚部 -> 0
                0+i, 虚部 -> 1
                
            参数：
                Complex: 
                    类型：字符串
                    名字：复数
                Part: 
                    类型：菜单
                    名字：实部或虚部
            `,
            en: `
            Get the real or imaginary part of a complex number
            Rules:
                4+3i, real part -> 4
                4+3i, imaginary part -> 3
                0+0i, real part -> 0
                0+0i, imaginary part -> 0
                0+i, imaginary part -> 1
                
            Arguments:
                Complex: 
                    type: string
                    name: complex number
                Part: 
                    type: menu
                    name: real part or imaginary part
            `,
        },
        "ComplexAddText": {
            zh: "[Addend1] + [Addend2]",
            en: "[Addend1] + [Addend2]"
        },
        "ComplexAddDesc": {
            zh: `
            复数加法
            将两个复数的实部和虚部分别相加
            
            参数：
                Addend1: 
                    类型：字符串
                    名字：第一个复数
                Addend2: 
                    类型：字符串
                    名字：第二个复数
            `,
            en: `
            Complex number addition
            Add the real and imaginary parts separately
            
            Arguments:
                Addend1: 
                    type: string
                    name: first complex
                Addend2: 
                    type: string
                    name: second complex
            `,
        },
        "ComplexSubtractText": {
            zh: "[Minuend] - [Subtrahend]",
            en: "[Minuend] - [Subtrahend]"
        },
        "ComplexSubtractDesc": {
            zh: `
            复数减法
            将两个复数的实部和虚部分别相减
            
            参数：
                Minuend: 
                    类型：字符串
                    名字：被减数
                Subtrahend: 
                    类型：字符串
                    名字：减数
            `,
            en: `
            Complex number subtraction
            Subtract the real and imaginary parts separately
            
            Arguments:
                Minuend: 
                    type: string
                    name: minuend
                Subtrahend: 
                    type: string
                    name: subtrahend
            `,
        },
        "ComplexMultiplyText": {
            zh: "[Multiplier1] × [Multiplier2]",
            en: "[Multiplier1] × [Multiplier2]"
        },
        "ComplexMultiplyDesc": {
            zh: `
            复数乘法
            计算两个复数的乘积
            
            公式：
                (a+bi) × (c+di) = (ac-bd) + (ad+bc)i
                
            参数：
                Multiplier1: 
                    类型：字符串
                    名字：第一个复数
                Multiplier2: 
                    类型：字符串
                    名字：第二个复数
            `,
            en: `
            Complex number multiplication
            Calculate the product of two complex numbers
            
            Formula:
                (a+bi) × (c+di) = (ac-bd) + (ad+bc)i
                
            Arguments:
                Multiplier1: 
                    type: string
                    name: first complex
                Multiplier2: 
                    type: string
                    name: second complex
            `,
        },
        "ComplexDivideText": {
            zh: "[Dividend] ÷ [Divisor]",
            en: "[Dividend] ÷ [Divisor]"
        },
        "ComplexDivideDesc": {
            zh: `
            复数除法
            计算两个复数的商
            
            公式：
                (a+bi) ÷ (c+di) = ((ac+bd)/(c²+d²)) + ((bc-ad)/(c²+d²))i
                
            参数：
                Dividend: 
                    类型：字符串
                    名字：被除数
                Divisor: 
                    类型：字符串
                    名字：除数
            `,
            en: `
            Complex number division
            Calculate the quotient of two complex numbers
            
            Formula:
                (a+bi) ÷ (c+di) = ((ac+bd)/(c²+d²)) + ((bc-ad)/(c²+d²))i
                
            Arguments:
                Dividend: 
                    type: string
                    name: dividend
                Divisor: 
                    type: string
                    name: divisor
            `,
        },
        "ComplexModText": {
            zh: "[Dividend] ÷ [Divisor]的余数",
            en: "[Dividend] ÷ [Divisor] remainder"
        },
        "ComplexModDesc": {
            zh: `
            复数取余
            计算复数除法的余数
            
            注意：复数取余有多种定义方式，这里采用最常见的定义
            
            参数：
                Dividend: 
                    类型：字符串
                    名字：被除数
                Divisor: 
                    类型：字符串
                    名字：除数
            `,
            en: `
            Complex number modulus
            Calculate remainder of complex division
            
            Note: Complex modulus has multiple definitions
            
            Arguments:
                Dividend: 
                    type: string
                    name: dividend
                Divisor: 
                    type: string
                    name: divisor
            `,
        },
        "ComplexQuoText": {
            zh: "[Dividend] ÷ [Divisor]的商数",
            en: "[Dividend] ÷ [Divisor] quotient"
        },
        "ComplexQuoDesc": {
            zh: `
            复数求商
            计算复数除法的整数商
            
            参数：
                Dividend: 
                    类型：字符串
                    名字：被除数
                Divisor: 
                    类型：字符串
                    名字：除数
            `,
            en: `
            Complex number quotient
            Calculate integer quotient of complex division
            
            Arguments:
                Dividend: 
                    type: string
                    name: dividend
                Divisor: 
                    type: string
                    name: divisor
            `,
        },
        "ComplexDivModText": {
            zh: "[Number1] ÷ [Number2]的模",
            en: "[Number1] ÷ [Number2] modulus"
        },
        "ComplexDivModDesc": {
            zh: `
            复数除法模运算
            计算复数除法的商和余数
            
            参数：
                Number1: 
                    类型：字符串
                    名字：被除数
                Number2: 
                    类型：字符串
                    名字：除数
            `,
            en: `
            Complex division modulus
            Calculate quotient and remainder of complex division
            
            Arguments:
                Number1: 
                    type: string
                    name: dividend
                Number2: 
                    type: string
                    name: divisor
            `,
        },
        "ComplexAbsoluteText": {
            zh: "| [Complex] |",
            en: "| [Complex] |"
        },
        "ComplexAbsoluteDesc": {
            zh: `
            复数的模（绝对值）
            计算复数的模
            
            公式：
                |a+bi| = √(a² + b²)
                
            参数：
                Complex: 
                    类型：字符串
                    名字：复数
            `,
            en: `
            Complex number modulus (absolute value)
            Calculate the modulus of a complex number
            
            Formula:
                |a+bi| = √(a² + b²)
                
            Arguments:
                Complex: 
                    type: string
                    name: complex number
            `,
        },
        "ComplexNegativeText": {
            zh: "- [Complex]",
            en: "- [Complex]"
        },
        "ComplexNegativeDesc": {
            zh: `
            复数的相反数
            计算复数的相反数
            
            公式：
                -(a+bi) = -a - bi
                
            参数：
                Complex: 
                    类型：字符串
                    名字：复数
            `,
            en: `
            Complex number negation
            Calculate the negative of a complex number
            
            Formula:
                -(a+bi) = -a - bi
                
            Arguments:
                Complex: 
                    type: string
                    name: complex number
            `,
        },
        "ComplexRoundText": {
            zh: "[Menu]复数[Complex]",
            en: "[Menu] complex [Complex]"
        },
        "ComplexRoundDesc": {
            zh: `
            复数舍入运算
            对复数的实部和虚部分别进行舍入
            
            参数：
                Menu: 
                    类型：菜单
                    名字：舍入方式
                Complex: 
                    类型：字符串
                    名字：复数
            `,
            en: `
            Complex number rounding
            Round real and imaginary parts separately
            
            Arguments:
                Menu: 
                    type: menu
                    name: rounding method
                Complex: 
                    type: string
                    name: complex number
            `,
        },
        "ComplexPowerText": {
            zh: "[Base]^[Index]",
            en: "[Base]^[Index]"
        },
        "ComplexPowerDesc": {
            zh: `
            复数幂运算
            计算复数的整数次幂
            
            参数：
                Base: 
                    类型：字符串
                    名字：底数（复数）
                Index: 
                    类型：数字
                    名字：指数（整数）
            `,
            en: `
            Complex number power
            Calculate integer power of complex number
            
            Arguments:
                Base: 
                    type: string
                    name: base (complex)
                Index: 
                    type: number
                    name: exponent (integer)
            `,
        },
        "ComplexRootText": {
            zh: "[RootIndex]√([Base])",
            en: "[RootIndex]√([Base])"
        },
        "ComplexRootDesc": {
            zh: `
            复数开根
            计算复数的n次方根
            
            参数：
                RootIndex: 
                    类型：数字
                    名字：根指数
                Base: 
                    类型：字符串
                    名字：被开方数（复数）
            `,
            en: `
            Complex number root
            Calculate nth root of complex number
            
            Arguments:
                RootIndex: 
                    type: number
                    name: root index
                Base: 
                    type: string
                    name: radicand (complex)
            `,
        },
        "ComplexSqrtText": {
            zh: "√([Base])",
            en: "√([Base])"
        },
        "ComplexSqrtDesc": {
            zh: `
            复数平方根
            计算复数的平方根
            
            参数：
                Base: 
                    类型：字符串
                    名字：被开方数（复数）
            `,
            en: `
            Complex square root
            Calculate square root of complex number
            
            Arguments:
                Base: 
                    type: string
                    name: radicand (complex)
            `,
        },
        "ComplexConjugateText": {
            zh: "~ [Complex]",
            en: "~ [Complex]"
        },
        "ComplexConjugateDesc": {
            zh: `
            复数的共轭
            计算复数的共轭复数
            
            公式：
                ~(a+bi) = a - bi
                
            参数：
                Complex: 
                    类型：字符串
                    名字：复数
            `,
            en: `
            Complex conjugate
            Calculate the complex conjugate
            
            Formula:
                ~(a+bi) = a - bi
                
            Arguments:
                Complex: 
                    type: string
                    name: complex number
            `,
        },
        "ComplexArgText": {
            zh: "arg([Complex])",
            en: "arg([Complex])"
        },
        "ComplexArgDesc": {
            zh: `
            复数的幅角（主值）
            计算复数在复平面上的角度（弧度制）
            
            参数：
                Complex: 
                    类型：字符串
                    名字：复数
            `,
            en: `
            Complex argument (principal value)
            Calculate the angle of complex number in complex plane (radians)
            
            Arguments:
                Complex: 
                    type: string
                    name: complex number
            `,
        },
        "ComplexToPolarText": {
            zh: "复数[Complex]的极坐标",
            en: "Polar form of complex [Complex]"
        },
        "ComplexToPolarDesc": {
            zh: `
            转换为极坐标形式
            返回复数的模和幅角
            
            参数：
                Complex: 
                    类型：字符串
                    名字：复数
            `,
            en: `
            Convert to polar form
            Return modulus and argument of complex number
            
            Arguments:
                Complex: 
                    type: string
                    name: complex number
            `,
        },
        "ComplexFromPolarText": {
            zh: "极坐标(r=[R], θ=[Theta])的复数",
            en: "Complex from polar (r=[R], θ=[Theta])"
        },
        "ComplexFromPolarDesc": {
            zh: `
            从极坐标创建复数
            
            公式：
                r(cosθ + i sinθ)
                
            参数：
                R: 
                    类型：数字
                    名字：模
                Theta: 
                    类型：数字
                    名字：幅角（弧度）
            `,
            en: `
            Create complex number from polar coordinates
            
            Formula:
                r(cosθ + i sinθ)
                
            Arguments:
                R: 
                    type: number
                    name: modulus
                Theta: 
                    type: number
                    name: argument (radians)
            `,
        },
        "VectorOperator": {
            zh: "📦向量运算(11)",
            en: "📦Vector(11)"
        },
        "2DVectorText": {
            zh: "二维向量([x],[y])",
            en: "2D vector([x],[y])"
        },
        "2DVectorDesc": {
            zh: `
            定义二维向量
            参数：
                x:
                    类型：数字
                    名字：横向坐标
                y:
                    类型：数字
                    名字：纵向坐标
            `,
            en: `
            Defined 2D vectors
            arguments：
                x:
                    Type: Number
                    Name: x
                y:
                    Type: Number
                    Name: y
            `,
        },
        "3DVectorText": {
            zh: "三维向量([x],[y],[z])",
            en: "3D vector([x],[y],[z])"
        },
        "3DVectorDesc": {
            zh: `
            定义三维向量
            参数：
                x: 
                    类型：数字
                    名字：x坐标
                y: 
                    类型：数字 
                    名字：y坐标
                z: 
                    类型：数字 
                    名字：z坐标`,
            en: `
            Define a 3D vector
            Arguments:
                x: 
                    type: number 
                    name: x-coordinate
                y: 
                    type: number 
                    name: y-coordinate
                z:
                    type: number
                     name: z-coordinate`,
        },
        "2DVectorAddText": {
            zh: "[Vector1] + [Vector2]",
            en: "[Vector1] + [Vector2]"
        },
        "2DVectorAddDesc": {
            zh: `
            二维向量加法
            将两个向量的对应分量相加
            参数：
                Vector1: 
                    类型：字符串 
                    名字：第一个向量
                Vector2: 
                    类型：字符串 
                    名字：第二个向量`,
            en: `
            2D vector addition
            Add corresponding components of two vectors
            Arguments:
                Vector1: 
                    type: string 
                    name: first vector
                Vector2: 
                    type: string 
                    name: second vector
            `,
        },
        "3DVectorAddText": {
            zh: "[Vector1] + [Vector2]",
            en: "[Vector1] + [Vector2]"
        },
        "3DVectorAddDesc": {
            zh: `
            三维向量加法
            将两个向量的对应分量相加
            参数：
                Vector1: 
                    类型：字符串 
                    名字：第一个向量
                Vector2: 
                    类型：字符串 
                    名字：第二个向量`,
            en: `
            3D vector addition
            Add corresponding components of two vectors
            Arguments:
                Vector1: 
                    type: string 
                    name: first vector
                Vector2: 
                    type: string 
                    name: second vector`,
        },
        "2DVectorSubtractText": {
            zh: "[Vector1] - [Vector2]",
            en: "[Vector1] - [Vector2]"
        },
        "2DVectorSubtractDesc": {
            zh: `
            二维向量减法
            将两个向量的对应分量相减
            参数：
                Vector1: 
                    类型：字符串 
                    名字：被减向量
                Vector2: 
                    类型：字符串 
                    名字：减向量`,
            en: `
            2D vector subtraction
            Subtract corresponding components of two vectors
            Arguments:
                Vector1: 
                    type: string 
                    name: minuend vector
                Vector2: 
                    type: string 
                    name: subtrahend vector`,
        },
        "3DVectorSubtractText": {
            zh: "[Vector1] - [Vector2]",
            en: "[Vector1] - [Vector2]"
        },
        "3DVectorSubtractDesc": {
            zh: `
            三维向量减法
            将两个向量的对应分量相减
            参数：
                Vector1: 
                    类型：字符串 
                    名字：被减向量
                Vector2: 
                    类型：字符串 
                    名字：减向量
            `,
            en: `
            3D vector subtraction
            Subtract corresponding components of two vectors
            Arguments:
                Vector1: 
                    type: string 
                    name: minuend vector
                Vector2: 
                    type: string 
                    name: subtrahend vector`,
        },
        "VectorMagnitudeText": {
            zh: "| [Vector] |",
            en: "| [Vector] |"
        },
        "VectorMagnitudeDesc": {
            zh: `
            计算向量的模（长度）
            参数：
                Vector: 
                    类型：字符串 
                    名字：向量
            `,
            en: `
            Calculate vector magnitude (length)
            Arguments:
                Vector: 
                    type: string 
                    name: vector`,
        },
        "VectorScalarMultiplyText": {
            zh: "[Vector] × [Scalar]",
            en: "[Vector] × [Scalar]"
        },
        "VectorScalarMultiplyDesc": {
            zh: `
            向量标量乘法
            将向量的每个分量乘以标量
            参数：
                Vector: 
                    类型：字符串 
                    名字：向量
                Scalar: 
                    类型：数字 
                    名字：标量
            `,
            en: `
            Vector scalar multiplication
            Multiply each component by scalar
            Arguments:
                Vector: 
                    type: string 
                    name: vector
                Scalar: 
                    type: number 
                    name: scalar`,
        },
        "VectorDotProductText": {
            zh: "[Vector1] · [Vector2]",
            en: "[Vector1] · [Vector2]"
        },
        "VectorDotProductDesc": {
            zh: `
            计算两个向量的点积（内积）
            参数：
                Vector1: 
                    类型：字符串 
                    名字：第一个向量
                Vector2: 
                    类型：字符串 
                    名字：第二个向量
            `,
            en: `
            Calculate dot product (inner product) of two vectors
            Arguments:
                Vector1: 
                    type: string 
                    name: first vector
                Vector2: 
                    type: string 
                    name: second vector`,
        },
        "VectorCrossMultiplyText": {
            zh: "[Vector1] × [Vector2]",
            en: "[Vector1] × [Vector2]"
        },
        "VectorCrossMultiplyDesc": {
            zh: `
            计算两个向量的叉积
            参数：
                Vector1: 
                    类型：字符串 
                    名字：第一个向量
                Vector2: 
                    类型：字符串 
                    名字：第二个向量
            `,
            en: `
            Calculate the cross product of two vectors
            Arguments:
                Vector1: 
                    Type: string
                    Name: first vector
                Vector2: 
                    Type: string 
                    Name: second vector
            `,
        },
        "VectorScalarDivideText": {
            zh: "[Vector] ÷ [Scalar]",
            en: "[Vector] ÷ [Scalar]"
        },
        "VectorScalarDivideDesc": {
            zh: `
            向量标量除法
            将向量的每个分量除以标量
            参数：
                Vector: 
                    类型：字符串 
                    名字：向量
                Scalar: 
                    类型：数字 
                    名字：标量（不能为0）
            `,
            en: `
            Vector scalar division
            Divide each component by scalar
            Arguments:
                Vector: 
                    type: string 
                    name: vector
                Scalar: 
                    type: number 
                    name: scalar (cannot be 0)`,
        },
        "VectorNegativeText": {
            zh: "- [Vector]",
            en: "- [Vector]"
        },
        "VectorNegativeDesc": {
            zh: `
            向量的相反数
            将向量的每个分量取反
            参数：
                Vector: 
                    类型：字符串 
                    名字：向量
            `,
            en: `
            Vector negation
            Negate each component of vector
            Arguments:
                Vector: 
                    type: string 
                    name: vector`,
        },
        "VectorNormalizeText": {
            zh: "归一化向量 [Vector]",
            en: "Normalize vector [Vector]"
        },
        "VectorNormalizeDesc": {
            zh: `
            将向量归一化（单位化）
            保持方向不变，将模长变为1
            参数：
                Vector: 
                    类型：字符串 
                    名字：向量
            `,
            en: `
            Normalize (unitize) vector
            Keep direction, set magnitude to 1
            Arguments:
                Vector: 
                    type: string 
                    name: vector`,
        },
        "GetVectorPartText": {
            zh: "向量[Vector]的[Part]",
            en: "[Part] of vector [Vector]"
        },
        "GetVectorPartDesc": {
            zh: `
            获取向量的分量
            参数：
                Vector: 
                    类型：字符串 
                    名字：向量
                Part: 
                    类型：菜单 
                    名字：分量名称
            `,
            en: `
            Get component of vector
            Arguments:
                Vector: 
                    type: string 
                    name: vector
                Part: 
                    type: menu 
                    name: component name`,
        },
        "EquationOperator": {
            zh: "📊方程运算(09)",
            en: "📊Equation Operations(09)"
        },
        "FunctionOperator": {
            zh: "📈函数运算(10)",
            en: "📈Function Operations(10)"
        },
        "FunctionPlotSettingsButton": {
            zh: "函数绘制设置",
            en: "Function Plot Settings"
        },
        "CreatePlotAreaText": {
            zh: "创建新的绘制区[name]",
            en: "Create new plot area [name]"
        },
        "CreatePlotAreaDesc": {
            zh: "创建一个新的函数绘制区域",
            en: "Create a new function plotting area"
        },
        "DestroyPlotAreaText": {
            zh: "销毁绘制区[name]",
            en: "Destroy plot area [name]"
        },
        "DestroyPlotAreaDesc": {
            zh: "销毁指定的函数绘制区域",
            en: "Destroy the specified function plotting area"
        },
        "SetPlotAreaPermissionText": {
            zh: "绘制区[name][permission][action]",
            en: "Plot area [name] [permission] [action]"
        },
        "SetPlotAreaPermissionDesc": {
            zh: "设置绘制区的权限和交互选项",
            en: "Set permissions and interaction options for the plot area"
        },
        "SetPlotAreaRangeText": {
            zh: "绘制区[name]的[axis]设为[value]",
            en: "Set [axis] of plot area [name] to [value]"
        },
        "SetPlotAreaRangeDesc": {
            zh: "设置绘制区的坐标轴范围",
            en: "Set the coordinate axis range of the plot area"
        },
        "ToggleGridText": {
            zh: "绘制区[name][show]网格坐标图",
            en: "[show] grid coordinate chart for plot area [name]"
        },
        "ToggleGridDesc": {
            zh: "切换绘制区网格坐标图的显示状态",
            en: "Toggle the display of the grid coordinate chart"
        },
        "DefaultPlotAreaName": {
            zh: "绘制区1",
            en: "PlotArea1"
        },
        "PermissionAllow": {
            zh: "允许",
            en: "allow"
        },
        "PermissionDeny": {
            zh: "拒绝",
            en: "deny"
        },
        "ActionDrag": {
            zh: "拖动",
            en: "drag"
        },
        "ActionFullscreen": {
            zh: "全屏",
            en: "fullscreen"
        },
        "ActionZoom": {
            zh: "缩放",
            en: "zoom"
        },
        "ActionClose": {
            zh: "关闭",
            en: "close"
        },
        "AxisMaxX": {
            zh: "最大X",
            en: "maxX"
        },
        "AxisMinX": {
            zh: "最小X",
            en: "minX"
        },
        "AxisMaxY": {
            zh: "最大Y",
            en: "maxY"
        },
        "AxisMinY": {
            zh: "最小Y",
            en: "minY"
        },
        "ShowGrid": {
            zh: "显示",
            en: "show"
        },
        "HideGrid": {
            zh: "隐藏",
            en: "hide"
        },
        "NoPlotAreas": {
            zh: "暂无绘制区",
            en: "No plot areas"
        },
        "ShowPlotArea": {
            zh: "显示",
            en: "Show"
        },
        "CloseButton": {
            zh: "关闭",
            en: "Close"
        },
        "PlotAreaTitle": {
            zh: "绘制区",
            en: "Plot Area"
        },
        "DefaultFunctionName": {
            zh: "f",
            en: "f"
        },
        "PlotFunctionText": {
            zh: "在[window]中绘制函数[name] = [text]",
            en: "Plot function [name] = [text] in [window]"
        },
        "PlotFunctionDesc": {
            zh: "在指定的绘制区窗口中绘制一个函数",
            en: "Plot a function in the specified plot area"
        },
        "SetFunctionFormulaText": {
            zh: "设置函数[name]=[text]",
            en: "Set function [name] = [text]"
        },
        "SetFunctionFormulaDesc": {
            zh: "设置函数的表达式（公式）",
            en: "Set the function expression (formula)"
        },
        "SetFunctionPropertyText": {
            zh: "设置函数[name]的[property]为[text]",
            en: "Set [property] of function [name] to [text]"
        },
        "SetFunctionPropertyDesc": {
            zh: "设置函数的属性（公式或颜色）",
            en: "Set a property of the function (formula or color)"
        },
        "DeleteFunctionText": {
            zh: "删除函数[name]",
            en: "Delete function [name]"
        },
        "DeleteFunctionDesc": {
            zh: "从绘制区中删除指定的函数",
            en: "Delete the specified function from the plot area"
        },
        "ClearPlotAreaText": {
            zh: "清空[window]绘制区",
            en: "Clear plot area [window]"
        },
        "ClearPlotAreaDesc": {
            zh: "清空指定绘制区窗口中的所有绘制内容",
            en: "Clear all plotted content in the specified plot area"
        },
        "PropertyFormula": {
            zh: "公式",
            en: "Formula"
        },
        "PropertyColor": {
            zh: "颜色",
            en: "Color"
        },
        "SimplifyExpressionText": {
            zh: "简化 [Expression]",
            en: "Simplify [Expression]"
        },
        "PlotAreaAlreadyExists": {
            zh: "绘制区 \"{name}\" 已存在",
            en: "Plot area \"{name}\" already exists"
        },
        "PlotAreaNotFound": {
            zh: "绘制区 \"{name}\" 不存在",
            en: "Plot area \"{name}\" not found"
        },
        "CreatePlotAreaLog": {
            zh: "创建绘制区: {name}",
            en: "Create plot area: {name}"
        },
        "DestroyPlotAreaLog": {
            zh: "销毁绘制区: {name}",
            en: "Destroy plot area: {name}"
        },
        "FunctionFormulaEmpty": {
            zh: "函数公式不能为空",
            en: "Function formula cannot be empty"
        },
        "NoPlotAreasAvailable": {
            zh: "没有可用的绘制区，请先创建绘制区",
            en: "No plot areas available, please create one first"
        },
        "NoPlotAreaSpecified": {
            zh: "未指定绘制区，自动使用第一个: {name}",
            en: "No plot area specified, automatically using first: {name}"
        },
        "AddFunctionLog": {
            zh: "在绘制区 \"{area}\" 中添加函数: {func} = {formula}",
            en: "Add function {func} = {formula} in plot area \"{area}\""
        },
        "FunctionNameAndFormulaEmpty": {
            zh: "函数名称/ID和公式不能为空",
            en: "Function name/ID and formula cannot be empty"
        },
        "FunctionNotFoundByName": {
            zh: "未找到名称为 \"{name}\" 的函数",
            en: "Function named \"{name}\" not found"
        },
        "UpdateFunctionFormulaLog": {
            zh: "更新函数公式: {name} -> {formula}",
            en: "Update function formula: {name} -> {formula}"
        },
        "FunctionIdAndPropertyEmpty": {
            zh: "函数ID和属性名不能为空",
            en: "Function ID and property name cannot be empty"
        },
        "FunctionNotFoundById": {
            zh: "未找到ID为 \"{id}\" 的函数",
            en: "Function with ID \"{id}\" not found"
        },
        "UnknownProperty": {
            zh: "未知属性: {property}",
            en: "Unknown property: {property}"
        },
        "UpdateFunctionPropertyLog": {
            zh: "更新函数属性: {id}.{property} = {value}",
            en: "Update function property: {id}.{property} = {value}"
        },
        "FunctionIdEmpty": {
            zh: "函数ID不能为空",
            en: "Function ID cannot be empty"
        },
        "DeleteFunctionLog": {
            zh: "删除函数: {id}",
            en: "Delete function: {id}"
        },
        "ClearPlotAreaLog": {
            zh: "清空绘制区: {name}",
            en: "Clear plot area: {name}"
        },
        "RefreshPlotAreaLog": {
            zh: "[Refresh] 刷新绘制区: {name}",
            en: "[Refresh] Refresh plot area: {name}"
        },
        "RefreshWindowNotFound": {
            zh: "[Refresh] 未找到绘制区窗口: {name}",
            en: "[Refresh] Plot area window not found: {name}"
        },
        "RefreshCanvasNotFound": {
            zh: "[Refresh] 未找到画布元素: {name}",
            en: "[Refresh] Canvas element not found: {name}"
        },
        "RefreshDataNotFound": {
            zh: "[Refresh] 未找到绘制区数据: {name}",
            en: "[Refresh] Plot area data not found: {name}"
        },
        "RefreshRedrawLog": {
            zh: "[Refresh] 重新绘制画布，函数数量: {count}",
            en: "[Refresh] Redrawing canvas, function count: {count}"
        },
        "SamplingNearZeroLog": {
            zh: "[采样] x≈0: x={x}, y={y}, 公式=\"{formula}\"",
            en: "[Sampling] x≈0: x={x}, y={y}, formula=\"{formula}\""
        },
        "SamplingMissingZeroWarning": {
            zh: "[采样] 采样点未包含 x=0，步长={step}，samples={samples}",
            en: "[Sampling] Sampling points do not include x=0, step={step}, samples={samples}"
        },
        "SimplifyExpressionError": {
            zh: "简化表达式错误: {error}",
            en: "Simplify expression error: {error}"
        },
        "RecurringDecimalToFractionError": {
            zh: "循环小数转有限小数错误: {error}",
            en: "Recurring decimal to finite decimal error: {error}"
        },
        "SimplifyExpressionDesc": {
            zh: `简化数学表达式
            规则：
                5*a（或5×a）返回5a
                1*m（或1×m）返回m
                a*a（或a×a）返回a^2
                1÷a返回1/a
            5+m+m返回5+2m
            支持的操作：
            - 合并同类项
            - 简化系数
            - 幂运算简化
            - 分数简化
            参数：
                Expression: 
                    类型：字符串 
                    名字：表达式`,
            en: `Simplify mathematical expressions
            Rules:
                5*a (or 5×a) returns 5a
                1*m (or 1×m) returns m
                a*a (or a×a) returns a^2
                1÷a returns 1/a
                5+m+m returns 5+2m
            Supported operations:
            - Combine like terms
            - Simplify coefficients
            - Power simplification
            - Fraction simplification
            Arguments:
                Expression: 
                    type: string 
                    name: expression`,
        },
        "EquationSolveText": {
            zh: "解方程 [Equation] ",
            en: "Solve equation [Equation]"
        },
        "EquationSolveDesc": {
            zh: `解方程
            求方程的根
            支持一元一次方程和一元二次方程
            参数：
                Equation: 
                    类型：字符串 
                    名字：方程`,
            en: `Solve equation
            Find roots of equation
            Supports linear and quadratic equations
            Arguments:
                Equation: 
                    type: string 
                    name: equation`,
        },
        "EquationFactorText": {
            zh: "因式分解 [Expression]",
            en: "Factorize [Expression]"
        },
        "EquationFactorDesc": {
            zh: `因式分解表达式
            将表达式分解为乘积形式
            参数：
                Expression: 
                    类型：字符串 
                    名字：表达式`,
            en: `Factorize expression
            Decompose expression into product form
            Arguments:
                Expression: 
                    type: string 
                    name: expression`,
        },
        "EquationExpandText": {
            zh: "展开 [Expression]",
            en: "Expand [Expression]"
        },
        "EquationExpandDesc": {
            zh: `展开表达式
            将因式分解的形式展开
            参数：
                Expression: 
                    类型：字符串 
                    名字：表达式`,
            en: `Expand expression
            Expand factorized form
            Arguments:
                Expression: 
                    type: string 
                    name: expression`,
        },
        "EquationValueText": {
            zh: "当[Variable]=[Value]时，[Expression]的值",
            en: "Value of [Expression] when [Variable] = [Value]"
        },
        "EquationValueDesc": {
            zh: `计算表达式的值
            用给定值替换变量
            参数：
                Expression: 
                    类型：字符串 
                    名字：表达式
                Value: 
                    类型：数字 
                    名字：变量值
                Variable:
                    类型：字符串
                    名字：未知数`,
            en: `Evaluate expression
            Substitute variable with given value
            Arguments:
                Expression: 
                    type: string 
                    name: expression
                Value: 
                    type: number 
                    name: variable value
                Variable:
                    type: string
                    name: x`,
        },
        "EquationRootsText": {
            zh: "方程 [Equation] 的根",
            en: "Roots of equation [Equation]"
        },
        "EquationRootsDesc": {
            zh: `求方程的所有根
            参数：
                Equation: 
                    类型：字符串 
                    名字：方程`,
            en: `Find all roots of equation
            Arguments:
                Equation: 
                    type: string 
                    name: equation`,
        },
        "EquationNthRootText": {
            zh: "方程 [Equation] 的第 [Index] 个解",
            en: "The [Index]th solution of equation [Equation]"
        },
        "EquationNthRootDesc": {
            zh: `求方程的第 N 个解
            参数：
                Equation: 
                    类型：字符串 
                    名字：方程
                Index:
                    类型：数字
                    名字：解的序号（从 1 开始）`,
            en: `Find the Nth solution of equation
            Arguments:
                Equation: 
                    type: string 
                    name: equation
                Index:
                    type: number
                    name: index of solution (1-based)`,
        },
        "EquationSimplifyFractionText": {
            zh: "简化分式 [Expression]",
            en: "Simplify fraction [Expression]"
        },
        "EquationSimplifyFractionDesc": {
            zh: `简化分式表达式
            参数：
                Expression: 
                    类型：字符串 
                    名字：分式表达式`,
            en: `Simplify fractional expression
            Arguments:
                Expression: 
                    type: string 
                    name: fractional expression`,
        },
        "EquationLikeTermsText": {
            zh: "合并同类项 [Expression]",
            en: "Combine like terms [Expression]"
        },
        "EquationLikeTermsDesc": {
            zh: `合并表达式中的同类项
            参数：
            Eexpression: 
                    类型：字符串 
                    名字：表达式`,
            en: `Combine like terms in expression
            Arguments:
                Expression: 
                    type: string 
                    name: expression`,
        },
        "EquationExponentText": {
            zh: "指数运算 [Expression]",
            en: "Exponent operations [Expression]"
        },
        "EquationExponentDesc": {
            zh: `简化指数运算表达式
            参数：
                Expression: 
                    类型：字符串 
                    名字：表达式`,
            en: `Simplify exponent operation expressions
            Arguments:
                Expression: 
                    type: string 
                    name: expression`,
        },
        "MathNumber": {
            zh: "数字",
            en: "Math"
        },
        "Number": {
            zh: "🔢数字(03)",
            en: "🔢Number(03)"
        },
        "StringToNumberText": {
            zh: "数字[Text]",
            en: "[Text]"
        },
        "StringToNumberDesc": {
            zh: `
            将字符串转换为数字
            参数：
                Text:
                    类型：字符串
                    名字：数字
            `,
            en: `
            Converts a string to a number.
            arguments:
                Text:
                    Type: String
                    Name: Number
            `,
        },
        "NumberToTypeStringText": {
            zh: "数字[Number]转成[Type]",
            en: "Convert Number [Number] to [Type]"
        },
        "NumberToTypeStringDesc": {
            zh: `
            将数字转换为指定类型的字符串表示
            参数：
                Number:
                    类型：数字
                    名字：数字
                Type:
                    类型：字符串
                    名字：类型
            `,
            en: `
            Converts a number to its string representation of a specified type.
            arguments:
                Number:
                    Type: Number
                    Name: Number
                Type:
                    Type: String
                    Name: Type
            `,
        },
        "TypeStringToNumberText": {
            zh: "[Type][Number]转成数字",
            en: "Convert [Type] [Number] to Number"
        },
        "TypeStringToNumberDesc": {
            zh: `
            将指定类型的字符串转换回数字
            参数：
                Type:
                    类型：字符串
                    名字：类型
                Number:
                    类型：字符串
                    名字：数字
            `,
            en: `
            Converts a string of a specified type back to a number.
            arguments:
                Type:
                    Type: String
                    Name: Type
                Number:
                    Type: String
                    Name: Number
            `,
        },
        "NumberPart": {
            zh: "📐数字部分(02)",
            en: "📐Number Part(02)"
        },
        "GetNumberPartText": {
            zh: "数字[Number]的[Type]",
            en: "The [Type] of Number [Number]"
        },
        "GetNumberPartDesc": {
            zh: `
            获取数字的部分
            参数：
                Number:
                    类型：数字
                    名字：数字
                Type:
                    类型：字符串
                    名字：类型
                
            `,
            en: `
            Gets a part of a number.
            arguments:
                Number:
                    Type: Number
                    Name: Number
                Type:
                    Type: String
                    Name: Type
            `,
        },
        "GetComplexPartFromStringText": {
            zh: "数字[Number]的[Type]",
            en: "The [Type] of Number [Number]"
        },
        "GetComplexPartFromStringDesc": {
            zh: `
            获取复数的实部或虚部
            参数：
                Number:
                    类型：数字
                    名字：数字
                Type:
                    类型：字符串
                    名字：类型
            `,
            en: `
            Gets the real or imaginary part of a complex number.
            arguments:
                Number:
                    Type: String
                    Name: Number
                Type:
                    Type: String
                    Name: Type
            `,
        },
        "RelationshipNumber": {
            zh: "📊数字关系(07)",
            en: "📊Relationship Between Number(07)"
        },
        "GcdText": {
            zh: "数字[Number]和数字[Number2]的最大公因数",
            en: "Greatest Common Divisor of Number [Number] and Number [Number2]"
        },
        "GcdDesc": {
            zh: `
            计算两个数字的最大公因数
            参数：
                Number:
                    类型：数字
                    名字：数字
                Number2:
                    类型：数字
                    名字：数字2
            `,
            en: `
            Calculates the greatest common divisor of two numbers.
            arguments:
                Number:
                    Type: Number
                    Name: Number
                Number2:
                    Type: Number
                    Name: Number2
            `,
        },
        "LcmText": {
            zh: "数字[Number]和数字[Number2]的最小公倍数",
            en: "Least Common Multiple of Number [Number] and Number [Number2]"
        },
        "LcmDesc": {
            zh: `
            计算两个数字的最小公倍数
            参数：
                Number:
                    类型：数字
                    名字：数字
                Number2:
                    类型：数字
                    名字：数字2
            `,
            en: `
            Calculates the least common multiple of two numbers.
            arguments:
                Number:
                    Type: Number
                    Name: Number
                Number2:
                    Type: Number
                    Name: Number2
            `,
        },
        "MaxFactorText": {
            zh: "数字[Number]的最大因数",
            en: "The Maximum Factor of Number [Number]"
        },
        "MaxFactorDesc": {
            zh: `
            获取数字的最大因数（不包括自身）
            参数：
                Number:
                    类型：数字
                    名字：数字
            `,
            en: `
            Gets the maximum factor of a number (excluding the number itself).
            arguments:
                Number:
                    Type: Number
                    Name: Number
            `,
        },
        "MinMultipleText": {
            zh: "数字[Number]的最小倍数",
            en: "The Minimum Multiple of Number [Number]"
        },
        "MinMultipleDesc": {
            zh: `
            获取数字的最小倍数（不包括自身）
            参数：
                Number:
                    类型：数字
                    名字：数字`,
            en: `
            Gets the minimum multiple of a number (excluding the number itself).
            arguments:
                Number:
                    Type: Number
                    Name: Number
            `,
        },
        "GetFactorsText": {
            zh: "数字[Number]的因数",
            en: "The Factors of Number [Number]"
        },
        "GetFactorsDesc": {
            zh: `
            获取数字的所有因数
            参数：
                Number:
                    类型：数字
                    名字：数字
            `,
            en: `
            Gets all factors of a number.
            arguments:
                Number:
                    Type: Number
                    Name: Number
            `,
        },
        "GetNthMultipleText": {
            zh: "数字[Number]的第[Index]个倍数",
            en: "The [Index]-th Multiple of Number [Number]"
        },
        "GetNthMultipleDesc": {
            zh: `
            获取数字的第n个倍数
            参数：
                Number:
                    类型：数字
                    名字：数字
            `,
            en: `
            Gets the n-th multiple of a number.
            Parameters:
                Number:
                    Type: Number
                    Name: Number
                Index:
                    Type: Number
                    Name: Index
            `,
        },
        "GetCommonFactorsText": {
            zh: "数字[Number]和数字[Number2]的公因数"
        },
        "GetCommonFactorsDesc": {
            zh: `
            获取所有数字的所有公因数
            参数：
                Number:
                    类型：数字
                    名字：数字
                Number2:
                    类型：数字
                    名字：数字2
            `,
        },
        "NumberOther": {
            zh: "📊数字其他(05)",
            en: "📊Other Number tools"
        },
        "GetSumText": {
            zh: "数字[Number]的每个数总和",
            en: "Sum of number [Number]"
        },
        "GetSumDesc": {
            zh: `
            获取数字的每一个数字总和
            参数：
                Number:
                    类型：数字
                    名字：数字
            `,
            en: `
            get sum of a number's each number
            arguments：
                Number:
                    Type:Number
                    Name:Number
            `,
        },

        "GetPrimeText": {
            zh: "第[Index]个质数",
            en: "The Prime of [Index]th"
        },
        "GetPrimeDesc": {
            zh: `
            找到输入数值对应的质数
            参数：
                Index:
                    类型：数字
                    名字：数字
            `,
            en: `
            Get the Prime of index
            Arguments：
                Index:
                    Type:Number
                    Name:Index
            `,
        },
        "GetNumberLengthText": {
            zh: "数字[Number]的长度",
            en: "The length of Number[Number]"
        },
        "GetNumberLengthDesc": {
            zh: `
            获取数字的长度
            参数：
                Number:
                    类型：数字
                    名字：数字
            `,
            en: `
            Get length of number
            arguments：
                Number:
                    Type:Number
                    Name:Number
            `,
        },
        "GetNumberIndexText": {
            zh: "数字[Number]的第[Index]项",
            en: "The [Index]-th of Number[Number]"
        },
        "GetNumberIndexDesc": {
            zh: `
            获取数字的第几项
            参数：
                Number:
                    类型：数字
                    名字：数字
                Index:
                    类型：数字
                    名字：项数
            `,
            en: `
            Get the index-th of number
            arguments：
                Number:
                    Type:Number
                    Name:Number
                Index:
                    Type:Number
                    Name:Index
            `,
        },
        "AdvancedMathCategory": {
            zh: "📐高数",
            en: "📐Advanced Math"
        },
        "Combinatorics": {
            zh: "🧮组合排列",
            en: "🧮Combinatorics"
        },
        "AngleOperation": {
            zh: "📐角度运算",
            en: "📐Angle Operation"
        },
        "showAngleOperationDesc": {
            zh: "角度标记、角度四则运算等",
            en: "Angle notation, angle arithmetic, etc."
        },
        "AngleDegreeText": {
            zh: "[Angle]°",
            en: "[Angle]°"
        },
        "AngleDegreeDesc": {
            zh: `
            将数字标记为角度值（度）
            参数：
                Angle：
                    类型：数字
                    名字：角度值
            `,
            en: `
            Mark a number as an angle value in degrees
            Arguments:
                Angle:
                    Type: Number
                    Name: Angle value
            `
        },
        "AngleRatioText": {
            zh: "圆的[Angle1]/[Angle2]",
            en: "the Circle of [Angle1]/[Angle2]"
        },
        "AngleRatioDesc": {
            zh: `
            计算两个角度值的比例，返回比例值
            参数：
                Angle1：
                    类型：角度
                    名字：角度1
                Angle2：
                    类型：角度
                    名字：角度2
            `,
            en: `
            Calculate the ratio of two angle values
            Arguments:
                Angle1:
                    Type: Angle
                    Name: Angle 1
                Angle2:
                    Type: Angle
                    Name: Angle 2
            `
        },
        "AngleAddText": {
            zh: "[Angle1]+[Angle2]",
            en: "[Angle1]+[Angle2]"
        },
        "AngleAddDesc": {
            zh: `
            两个角度相加
            参数：
                Angle1：
                    类型：角度
                    名字：角度1
                Angle2：
                    类型：角度
                    名字：角度2
            `,
            en: `
            Add two angles
            Arguments:
                Angle1:
                    Type: Angle
                    Name: Angle 1
                Angle2:
                    Type: Angle
                    Name: Angle 2
            `
        },
        "AngleSubtractText": {
            zh: "[Angle1]-[Angle2]",
            en: "[Angle1]-[Angle2]"
        },
        "AngleSubtractDesc": {
            zh: `
            两个角度相减
            参数：
                Angle1：
                    类型：角度
                    名字：角度1
                Angle2：
                    类型：角度
                    名字：角度2
            `,
            en: `
            Subtract two angles
            Arguments:
                Angle1:
                    Type: Angle
                    Name: Angle 1
                Angle2:
                    Type: Angle
                    Name: Angle 2
            `
        },
        "AngleMultiplyText": {
            zh: "[Angle]×[Number]",
            en: "[Angle]×[Number]"
        },
        "AngleMultiplyDesc": {
            zh: `
            角度乘以一个数
            参数：
                Angle：
                    类型：角度
                    名字：角度
                Number：
                    类型：数字
                    名字：倍数
            `,
            en: `
            Multiply an angle by a number
            Arguments:
                Angle:
                    Type: Angle
                    Name: Angle
                Number:
                    Type: Number
                    Name: Multiplier
            `
        },
        "AngleDivideText": {
            zh: "[Angle]÷[Number]",
            en: "[Angle]÷[Number]"
        },
        "AngleDivideDesc": {
            zh: `
            角度除以一个数
            参数：
                Angle：
                    类型：角度
                    名字：角度
                Number：
                    类型：数字
                    名字：除数
            `,
            en: `
            Divide an angle by a number
            Arguments:
                Angle:
                    Type: Angle
                    Name: Angle
                Number:
                    Type: Number
                    Name: Divisor
            `
        },
        "CombinationText": {
            zh: "C([N], [K])",
            en: "C([N], [K]) combination"
        },
        "CombinationDesc": {
            zh: `
            计算组合数 C(n, k) = n!
            (k!·(n−k)!)，n ≥ k ≥ 0
            参数：
                N：
                    类型：数字
                    名字：方案
                K：
                    类型：数字
                    名字：方法
            `,
            en: `Compute binomial coefficient C(n, k) = n!
            (k!·(n−k)!). n ≥ k ≥ 0
            Arguments:
                N:
                    Type:Number
                    Name:Number
                K:
                    Type:Number
                    Name:Number
            `,
        },
        "PermutationText": {
            zh: "A([N], [K])",
            en: "A([N], [K]) permutation"
        },
        "PermutationDesc": {
            zh: `
            计算排列数 A(n, k) = n!
            (n−k)!，n ≥ k ≥ 0
            参数：
                N：
                    类型：数字
                    名字：排列
                K：
                    类型：数字
                    名字：方式
            `,
            en: `
            Compute permutation number A(n, k) = n!
            (n−k)!. n ≥ k ≥ 0
            
            Arguments:
                N:
                    Type:Number
                    Name:Number
                K:
                    Type:Number
                    Name:Number
            `,
        },
        "RepetitionPermutationText": {
            zh: "[n] 的重复排列 [k]",
            en: "Repetition permutation of [n] with [k]"
        },
        "RepetitionPermutationDesc": {
            zh: `
            从 n 个不同元素中可重复地选取 k 个进行排列
            
            参数：
                n：
                    类型：数字
                    名字：数字
                k：
                    类型：数字
                    名字：数字
            `,
            en: `
            Select k elements with repetition from n distinct elements and arrange them.

            Arguments:
                n:
                    Type: number
                    Name: number
                k:
                    Type: number
                    Name: number
            `,
        },
        "CircularPermutationText": {
            zh: "P([n])",
            en: "P([n])"
        },
        "CircularPermutationDesc": {
            zh: `
            n 个不同元素的圆排列数（旋转视为相同）
            参数：
                n：
                    类型：数字
                    名字：排列
            `,
            en: `
            Number of circular permutations of n distinct elements (rotations considered identical).

            Arguments:
                n:
                    Type: number
                    Name: permutation
            `,
        },
        "MultisetPermutationText": {
            zh: "多重集排列 [list]",
            en: "Multiset permutation [list]"
        },
        "MultisetPermutationDesc": {
            zh: `
            给定每种物品的个数（用逗号分隔），计算这些物品的全排列总数。
            参数：
                list：
                    类型：数字
                    名字：数列
            `,
            en: `
            Given the count of each type of item (comma-separated), calculate the total number of permutations of these items.

            Arguments:
                list:
                    Type: number
                    Name: sequence
            `,
        },
        "Matrix": {
            zh: "📐矩阵运算",
            en: "📐Matrix"
        },
        "NumberTheory": {
            zh: "🔢数论",
            en: "🔢Number Theory"
        },
        "ConstantText": {
            zh: "常量 [Constant]",
            en: "Constant [Constant]"
        },
        "ConstantDesc": {
            zh: `返回数学常量（π、e、φ）
            参数：
                Constant: 常量类型菜单`,
            en: `Return math constant (π, e, φ)`
        },
        "ConstantDigitsText": {
            zh: "常量 [Constant] 的前 [Index] 位小数",
            en: "First [Index] decimal digits of [Constant]"
        },
        "ConstantDigitsDesc": {
            zh: `返回常量的前 N 位小数
            参数：
                Constant: 常量类型
                Index: 小数位数`,
            en: `First N decimal digits of constant`
        },
        "MakeRangeText": {
            zh: "[MinValue] 到 [MaxValue]",
            en: "[MinValue] to [MaxValue]"
        },
        "MakeRangeDesc": {
            zh: `创建一个范围类型 {Min~Max}
            参数：
                MinValue: 最小值
                MaxValue: 最大值
            返回：{MinValue~MaxValue} 格式的字符串`,
            en: `Create a range type {Min~Max}`
        },
        "CountInRangeText": {
            zh: "在 [Range] 之间 [Type] 的数量",
            en: "Count of [Type] in [Range]"
        },
        "CountInRangeDesc": {
            zh: `统计范围内满足条件的数的个数
            参数：
                Range: {Min~Max} 格式的范围
                Type: 完美数/指数/合数/半质数`,
            en: `Count numbers in range matching type`
        },
        "NthInRangeText": {
            zh: "在 [Range] 之间第 [Index] 个 [Type]",
            en: "The [Index]th [Type] in [Range]"
        },
        "NthInRangeDesc": {
            zh: `返回范围内第 N 个满足条件的数
            参数：
                Range: {Min~Max} 格式的范围
                Index: 序号（从1开始）
                Type: 完美数/指数/合数/半质数`,
            en: `The Nth number in range matching type`
        },
        "CountCongruentText": {
            zh: "在 [Range] 之间除以 [Value] 与 [Number] 同余的数量",
            en: "Count in [Range] congruent to [Number] mod [Value]"
        },
        "CountCongruentDesc": {
            zh: `统计范围内与 Number 模 Value 同余的数的个数
            参数：
                Range: {Min~Max} 格式的范围
                Value: 模数
                Number: 同余目标值`,
            en: `Count numbers congruent to Number mod Value in range`
        },
        "NthCongruentText": {
            zh: "在 [Range] 之间除以 [Value] 与 [Number] 同余的第 [Index] 个",
            en: "The [Index]th in [Range] congruent to [Number] mod [Value]"
        },
        "NthCongruentDesc": {
            zh: `返回范围内第 N 个与 Number 模 Value 同余的数
            参数：
                Range: {Min~Max} 格式的范围
                Value: 模数
                Number: 同余目标值
                Index: 序号（从1开始）`,
            en: `The Nth number congruent to Number mod Value in range`
        },
        "FactorListText": { zh: "[Number] 的因数列表", en: "Factor list of [Number]" },
        "FactorListDesc": {
            zh: `返回一个数的所有正因数列表
                参数：
                    Number: 要获取因数的数
                返回：列表字符串，如 "[1,2,3,4,6,12]"`,
            en: `Returns all positive factors of a number
                Arguments:
                    Number: the number to factorize
                Returns: list string, e.g. "[1,2,3,4,6,12]"`
        },
        "PrimeFactorText": { zh: "[Number] 的质因数分解", en: "Prime factorization of [Number]" },
        "PrimeFactorDesc": {
            zh: `返回一个数的质因数分解结果
            参数：
                Number: 要分解的数
            返回：质因数列表，如 "[2,2,3]"`,
            en: `Returns prime factorization of a number
            Arguments:
                Number: the number to factorize
            Returns: prime factor list, e.g. "[2,2,3]"`
        },
        "FactorCountText": { zh: "[Number] 的因数个数", en: "Number of factors of [Number]" },
        "FactorCountDesc": {
            zh: `返回一个数的因数总数 d(n)
                参数：
                    Number: 要统计因数的数
                返回：因数个数`,
            en: `Returns total number of factors d(n)
                Arguments:
                    Number: the number to count factors of
                Returns: number of factors`
        },
        "FactorSumText": { zh: "[Number] 的因数和", en: "Sum of factors of [Number]" },
        "FactorSumDesc": {
            zh: `返回一个数的所有因数之和 σ(n)
                参数：
                    Number: 要计算因数和数
                返回：因数和`,
            en: `Returns sum of all factors σ(n)
                Arguments:
                    Number: the number to sum factors of
                Returns: sum of factors`
        },
        "EulerPhiText": { zh: "欧拉函数 φ([Number])", en: "Euler's totient φ([Number])" },
        "EulerPhiDesc": {
            zh: `返回小于等于 n 且与 n 互质的数的个数
                参数：
                    Number: 要计算欧拉函数的数
                返回：φ(n)`,
            en: `Returns count of numbers <= n coprime to n
                Arguments:
                    Number: the number to compute φ(n) for
                Returns: φ(n)`
        },
        "NthPrimeText": { zh: "第 [Index] 个质数", en: "The [Index]th prime number" },
        "NthPrimeDesc": {
            zh: `返回第 n 个质数
                参数：
                    Index: 质数的序号（从1开始）
                返回：第 n 个质数`,
            en: `Returns the nth prime number
                Arguments:
                    Index: the index of the prime (starting from 1)
                Returns: the nth prime`
        },
        "PrimeCountText": { zh: "不超过 [Number] 的质数个数", en: "Number of primes <= [Number]" },
        "PrimeCountDesc": {
            zh: `返回不超过 n 的质数总数 π(n)
                    参数：
                        Number: 上限值
                    返回：质数个数`,
            en: `Returns count of primes <= n, π(n)
                    Arguments:
                        Number: the upper bound
                    Returns: number of primes`
        },
        "PrimeGapText": { zh: "[Number] 前后的质数间隔", en: "Prime gap around [Number]" },
        "PrimeGapDesc": {
            zh: `返回大于等于 n 的最小质数与小于等于 n 的最大质数的差值
                参数：
                    Number: 目标数
                返回：质数间隔`,
            en: `Returns difference between next prime >= n and previous prime <= n
                Arguments:
                    Number: the target number
                Returns: prime gap`
        },
        "DefineFunctionText": { zh: "定义函数 [Definition]", en: "Define function [Definition]" },
        "DefineFunctionDesc": { zh: "定义一个新的数学函数", en: "Define a new mathematical function" },
        "EvaluateFunctionText": { zh: "计算 [Func]([Args])", en: "Evaluate [Func]([Args])" },
        "EvaluateFunctionDesc": { zh: "计算函数在给定参数下的值", en: "Evaluate function with given arguments" },
        "ComposeFunctionsText": { zh: "复合函数 [Outer] ∘ [Inner]", en: "Compose functions [Outer] ∘ [Inner]" },
        "ComposeFunctionsDesc": { zh: "返回两个函数的复合函数", en: "Return composition of two functions" },
        "PerfectNumber": { zh: "完美数", en: "Perfect" },
        "ExponentialNumber": { zh: "指数", en: "Exponential" },
        "CompositeNumber": { zh: "合数", en: "Composite" },
        "SemiPrimeNumber": { zh: "半质数", en: "Semi-prime" },
        "PrimeNumber": { zh: "质数", en: "Prime" },
        "NaturalNumber": { zh: "自然数", en: "Natural" },
        "IntegerNumber": { zh: "整数", en: "Integer" },
        "SquareNumber": { zh: "平方数", en: "Square" },
        "CubeNumber": { zh: "立方数", en: "Cube" },

        "SettingsTitle": { zh: "⚙️ 数学扩展设置", en: "⚙️ Math Extension Settings" },
        "SettingsNote": {
            zh: "勾选要显示的积木分区，取消勾选可隐藏。保存后自动刷新积木栏。",
            en: "Check the block sections to show, uncheck to hide. Saving auto-refreshes the palette."
        },
        "SettingsButtonText": { zh: "⚙️ 打开设置面板", en: "⚙️ Open Settings" },
        "SettingsSave": { zh: "保存", en: "Save" },
        "SettingsCancel": { zh: "取消", en: "Cancel" },
        "SettingsToggleOn": { zh: "开", en: "ON" },
        "SettingsToggleOff": { zh: "关", en: "OFF" },
        "SettingsSectionOperator": { zh: "📐 运算类", en: "📐 Operators" },
        "SettingsSectionFunction": { zh: "📏 函数与比", en: "📏 Functions & Ratios" },
        "SettingsSectionBigNumber": { zh: "🔢 大数与复数", en: "🔢 Big Numbers & Complex" },
        "SettingsSectionLinearAlgebra": { zh: "📦 线性代数", en: "📦 Linear Algebra" },
        "SettingsSectionEquation": { zh: "📊 方程", en: "📊 Equations" },
        "SettingsSectionNumberTool": { zh: "🔢 数字工具", en: "🔢 Number Tools" },
        "SettingsSectionBoolean": { zh: "🔘 布尔运算", en: "🔘 Boolean Operations" },
        "SettingsSectionAdvancedMath": { zh: "🧮 高等数学", en: "🧮 Advanced Math" },
        "showSimpleOperatorLabel": { zh: "基础运算", en: "Basic Operators" },
        "showSimpleOperatorDesc": { zh: "加、减、乘、除、取余等", en: "Add, subtract, multiply, divide, mod, etc." },
        "showAdvancedOperatorLabel": { zh: "高级运算", en: "Advanced Operators" },
        "showAdvancedOperatorDesc": { zh: "幂运算、开方、阶乘、对数等", en: "Power, root, factorial, log, etc." },
        "showRangeOperatorLabel": { zh: "范围运算", en: "Range Operators" },
        "showRangeOperatorDesc": { zh: "限幅、循环、映射等", en: "Clamp, loop, map, etc." },
        "showDecimalOperatorLabel": { zh: "小数运算", en: "Decimal Operators" },
        "showDecimalOperatorDesc": { zh: "四舍五入、精度控制等", en: "Rounding, precision control, etc." },
        "showFractionOperatorLabel": { zh: "分数运算", en: "Fraction Operators" },
        "showFractionOperatorDesc": { zh: "分数化简、小数转分数等", en: "Simplify fractions, decimal to fraction, etc." },
        "showTrigOperatorLabel": { zh: "三角运算", en: "Trigonometry" },
        "showTrigOperatorDesc": { zh: "sin, cos, tan 及反函数", en: "sin, cos, tan and inverse functions" },
        "showProportionOperatorLabel": { zh: "比的运算", en: "Ratio Operators" },
        "showProportionOperatorDesc": { zh: "比例、百分比等", en: "Proportion, percentage, etc." },
        "showBigNumberOperatorLabel": { zh: "大数字运算", en: "Big Number Operators" },
        "showBigNumberOperatorDesc": { zh: "高精度大数运算", en: "High-precision big number operations" },
        "showImaginaryOperatorLabel": { zh: "虚数运算", en: "Imaginary Operators" },
        "showImaginaryOperatorDesc": { zh: "虚数相关运算", en: "Imaginary number operations" },
        "showComplexOperatorLabel": { zh: "复数运算", en: "Complex Operators" },
        "showComplexOperatorDesc": { zh: "复数四则运算、模、幅角等", en: "Complex arithmetic, modulus, argument, etc." },
        "showVectorOperatorLabel": { zh: "向量运算", en: "Vector Operators" },
        "showVectorOperatorDesc": { zh: "向量加减、点积、叉积等", en: "Vector add/sub, dot/cross product, etc." },
        "showMatrixLabel": { zh: "矩阵运算", en: "Matrix Operators" },
        "showMatrixDesc": { zh: "矩阵加减乘、转置、行列式等", en: "Matrix add/sub/multiply, transpose, determinant, etc." },
        "showEquationOperatorLabel": { zh: "方程运算", en: "Equation Operators" },
        "showEquationOperatorDesc": { zh: "解方程、求根等", en: "Solve equations, find roots, etc." },
        "showFunctionOperatorLabel": { zh: "函数运算", en: "Function Operators" },
        "showFunctionOperatorDesc": { zh: "函数定义、复合、求值等", en: "Function definition, composition, evaluation, etc." },
        "Boolean": {zh:"布尔",en:"Boolean"},
        "BooleanOperator": { zh: "布尔运算", en: "Boolean Operator" },
        "showBooleanOperatorLabel": { zh: "布尔运算", en: "Boolean" },
        "showBooleanOperatorDesc": { zh: "布尔比较运算", en: "Boolean comparison operations" },
        "BooleanCompareText": { zh: "[Left] = [Right]", en: "[Left] = [Right]" },
        "BooleanCompareDesc": { zh: "精确比较 Left 和 Right 是否完全相等", en: "Exactly compare Left and Right for equality" },
        "BooleanGreaterText": { zh: "[Left] > [Right]", en: "[Left] > [Right]" },
        "BooleanGreaterDesc": { zh: "比较 Left 是否大于 Right（支持所有数学类型）", en: "Compare if Left is greater than Right (supports all math types)" },
        "BooleanLessText": { zh: "[Left] < [Right]", en: "[Left] < [Right]" },
        "BooleanLessDesc": { zh: "比较 Left 是否小于 Right（支持所有数学类型）", en: "Compare if Left is less than Right (supports all math types)" },
        "BooleanNotEqualText": { zh: "[Left] ≠ [Right]", en: "[Left] ≠ [Right]" },
        "BooleanNotEqualDesc": { zh: "比较 Left 和 Right 是否不相等（支持所有数学类型）", en: "Compare if Left is not equal to Right (supports all math types)" },
        "BooleanGreaterEqualText": { zh: "[Left] ≥ [Right]", en: "[Left] ≥ [Right]" },
        "BooleanGreaterEqualDesc": { zh: "比较 Left 是否大于或等于 Right（支持所有数学类型）", en: "Compare if Left is greater than or equal to Right (supports all math types)" },
        "BooleanLessEqualText": { zh: "[Left] ≤ [Right]", en: "[Left] ≤ [Right]" },
        "BooleanLessEqualDesc": { zh: "比较 Left 是否小于或等于 Right（支持所有数学类型）", en: "Compare if Left is less than or equal to Right (supports all math types)" },
        "BooleanTrueText": { zh: "成立", en: "true" },
        "BooleanTrueDesc": { zh: "始终返回 true（成立）", en: "Always returns true" },
        "BooleanFalseText": { zh: "不成立", en: "false" },
        "BooleanFalseDesc": { zh: "始终返回 false（不成立）", en: "Always returns false" },
        "BooleanRandomText": { zh: "随机 [Number]% 的值", en: "random [Number]% value" },
        "BooleanRandomDesc": { zh: "以指定概率返回 true，否则返回 false", en: "Returns true with the specified probability, otherwise false" },
        "BooleanTypeCheckText": { zh: "[Text] 是 [Type]", en: "[Text] is [Type]" },
        "BooleanTypeCheckDesc": { zh: "判断给定值是否为指定的类型", en: "Check if the given value is of the specified type" },
        "BooleanApproxEqualText": { zh: "[RealNumber] ≈ [Number] ± [Diff]", en: "[RealNumber] ≈ [Number] ± [Diff]" },
        "BooleanApproxEqualDesc": { zh: "判断 RealNumber 是否在 Number 的 ±Diff 范围内", en: "Check if RealNumber is within ±Diff of Number" },
        "BooleanAndText": { zh: "[Boolean1] 与 [Boolean2]", en: "[Boolean1] and [Boolean2]" },
        "BooleanAndDesc": { zh: "逻辑与：两个条件都成立时返回 true", en: "Logical AND: returns true when both conditions are true" },
        "BooleanOrText": { zh: "[Left] 或 [Right]", en: "[Left] or [Right]" },
        "BooleanOrDesc": { zh: "逻辑或：至少一个条件成立时返回 true", en: "Logical OR: returns true when at least one condition is true" },
        "BooleanNotText": { zh: "非 [Boolean]", en: "not [Boolean]" },
        "BooleanNotDesc": { zh: "逻辑非：将布尔值取反", en: "Logical NOT: negates the boolean value" },
        "BooleanNotAndText": { zh: "非 [Left] 与 [Right]", en: "not [Left] and [Right]" },
        "BooleanNotAndDesc": { zh: "先对 Left 取反，再与 Right 进行逻辑与运算", en: "Negates Left then AND with Right" },
        "BooleanNotOrText": { zh: "非 [Left] 或 [Right]", en: "not [Left] or [Right]" },
        "BooleanNotOrDesc": { zh: "先对 Left 取反，再与 Right 进行逻辑或运算", en: "Negates Left then OR with Right" },
        "BooleanAndNotText": { zh: "[Left] 非与 [Right]", en: "[Left] and not [Right]" },
        "BooleanAndNotDesc": { zh: "Left 与 Right 取反后进行逻辑与运算", en: "AND Left with negated Right" },
        "BooleanOrNotText": { zh: "[Left] 非或 [Right]", en: "[Left] or not [Right]" },
        "BooleanOrNotDesc": { zh: "Left 与 Right 取反后进行逻辑或运算", en: "OR Left with negated Right" },
        "BooleanXnorText": { zh: "[Left] 同或 [Right]", en: "[Left] XNOR [Right]" },
        "BooleanXnorDesc": { zh: "逻辑同或：两个条件相同时返回 true", en: "Logical XNOR: returns true when both conditions are equal" },
        "BooleanXorText": { zh: "[Left] 异或 [Right]", en: "[Left] XOR [Right]" },
        "BooleanXorDesc": { zh: "逻辑异或：两个条件不同时返回 true", en: "Logical XOR: returns true when both conditions are different" },
        "BooleanIsTrueText": { zh: "[Text] 是真的", en: "[Text] is true" },
        "BooleanIsTrueDesc": { zh: "判断文本是否表示布尔真值（true/yes/1/on）", en: "Check if text represents a boolean true value (true/yes/1/on)" },
        "showMathNumberLabel": { zh: "数字", en: "Numbers" },
        "showMathNumberDesc": { zh: "数字相关基础积木", en: "Number-related basic blocks" },
        "showNumberPartLabel": { zh: "数字部分", en: "Number Parts" },
        "showNumberPartDesc": { zh: "提取数字的各部分", en: "Extract parts of numbers" },
        "showRelationshipNumberLabel": { zh: "数字关系", en: "Number Relations" },
        "showRelationshipNumberDesc": { zh: "数字间关系判断", en: "Number relationship checks" },
        "showNumberOtherLabel": { zh: "数字其他", en: "Number Other" },
        "showNumberOtherDesc": { zh: "其他数字工具", en: "Other number tools" },
        "showCombinatoricsLabel": { zh: "组合排列", en: "Combinatorics" },
        "showCombinatoricsDesc": { zh: "排列组合、阶乘等", en: "Permutations, combinations, factorial, etc." },
        "showNumberTheoryLabel": { zh: "数论", en: "Number Theory" },
        "showNumberTheoryDesc": { zh: "常量、范围、完美数、同余等", en: "Constants, ranges, perfect numbers, congruence, etc." },
        "CreateMatrix2x2Text": {
            zh: "创建2×2矩阵 [a],[b]   [c],[d]",
            en: "Create 2×2 matrix [a],[b]   [c],[d]"
        },
        "CreateMatrix2x2Desc": {
            zh: `
            创建2x2矩阵，参数按行输入（a,b,c,d）
            矩阵形式：
            ⎡ a  b ⎤
            ⎣ c  d ⎦

            参数：
                a: 第一行第一列元素（数字）
                b: 第一行第二列元素（数字）
                c: 第二行第一列元素（数字）
                d: 第二行第二列元素（数字）
            返回字符串表示，如 "[[1,2],[3,4]]"
            `,
            en: `
            Create a 2x2 matrix, parameters entered row-wise (a,b,c,d)
            Matrix form:
            ⎡ a  b ⎤
            ⎣ c  d ⎦

            Arguments:
                a: first row first column element (number)
                b: first row second column element (number)
                c: second row first column element (number)
                d: second row second column element (number)
            Returns string representation like "[[1,2],[3,4]]"
            `,
        },
        "CreateMatrix3x3Text": {
            zh: "创建3×3矩阵 [a],[b],[c]   [d],[e],[f]   [g],[h],[i]",
            en: "Create 3×3 matrix [a],[b],[c]   [d],[e],[f]   [g],[h],[i]"
        },
        "CreateMatrix3x3Desc": {
            zh: `
            创建3x3矩阵，参数按行输入（a,b,c,d,e,f,g,h,i）
            矩阵形式：
            ⎡ a  b  c ⎤
            ⎢ d  e  f ⎥
            ⎣ g  h  i ⎦

            参数：
                a,b,c: 第一行
                d,e,f: 第二行
                g,h,i: 第三行
            返回字符串表示，如 "[[1,2,3],[4,5,6],[7,8,9]]"
            `,
            en: `
            Create a 3x3 matrix, parameters entered row-wise (a,b,c,d,e,f,g,h,i)
            Matrix form:
            ⎡ a  b  c ⎤
            ⎢ d  e  f ⎥
            ⎣ g  h  i ⎦

            Arguments:
                a,b,c: first row
                d,e,f: second row
                g,h,i: third row
            Returns string representation like "[[1,2,3],[4,5,6],[7,8,9]]"
            `,
        },
        "CreateCustomMatrixText": {
            zh: "创建自定义矩阵 [Matrix]",
            en: "Create custom matrix [Matrix]"
        },
        "CreateCustomMatrixDesc": {
            zh: `
            创建任意尺寸的自定义矩阵。
            按行输入所有元素，用空格或逗号分隔。

            参数：
                Matrix: 按行排列的所有元素（如 "1 2 3 4 5 6" 或 "1,2,3,4,5,6"）

            示例：
                行数=2，列数=3，元素="1 2 3 4 5 6"
                返回 "[[1,2,3],[4,5,6]]"
            `,
            en: `
            Create a custom matrix of any size.
            Enter all elements row-wise, separated by spaces or commas.

            Arguments:
                Matrix: all elements row-wise (e.g. "1 2 3 4 5 6" or "1,2,3,4,5,6")

            Example:
                Rows=2, Cols=3, Elements="1 2 3 4 5 6"
                Returns "[[1,2,3],[4,5,6]]"
            `,
        },
        "MatrixAddText": {
            zh: "矩阵相加 [A] + [B]",
            en: "Matrix addition [A] + [B]"
        },
        "MatrixAddDesc": {
            zh: `
            两个同型矩阵（2x2 或 3x3）对应元素相加。
            参数：
                A: 第一个矩阵（字符串形式）
                B: 第二个矩阵（字符串形式）
            返回新矩阵的字符串表示。
            `,
            en: `
            Add corresponding elements of two matrices (2x2 or 3x3).
            Arguments:
                A: first matrix (string form)
                B: second matrix (string form)
            Returns new matrix as string.
            `,
        },
        "MatrixSubtractText": {
            zh: "矩阵相减 [A] - [B]",
            en: "Matrix subtraction [A] - [B]"
        },
        "MatrixSubtractDesc": {
            zh: `
            两个同型矩阵对应元素相减。
            `,
            en: `
            Subtract corresponding elements of two matrices.
            `,
        },
        "MatrixMultiplyText": {
            zh: "矩阵相乘 [A] × [B]",
            en: "Matrix multiplication [A] × [B]"
        },
        "MatrixMultiplyDesc": {
            zh: `
            矩阵乘法（A的列数必须等于B的行数）。
            目前仅支持2x2×2x2 或 3x3×3x3。
            `,
            en: `
            Matrix multiplication (A's columns must equal B's rows).
            Currently supports 2x2×2x2 or 3x3×3x3.
            `,
        },
        "MatrixScalarMultiplyText": {
            zh: "矩阵数乘 [λ] × [M]",
            en: "Scalar multiplication [λ] × [M]"
        },
        "MatrixScalarMultiplyDesc": {
            zh: `
            将矩阵每个元素乘以标量 λ。
            `,
            en: `
            Multiply every element of the matrix by scalar λ.
            `,
        },
        "MatrixTransposeText": {
            zh: "矩阵转置 [M]ᵀ",
            en: "Matrix transpose [M]ᵀ"
        },
        "MatrixTransposeDesc": {
            zh: `
            返回矩阵的转置。
            `,
            en: `
            Return the transpose of the matrix.
            `,
        },
        "MatrixDeterminantText": {
            zh: "矩阵行列式 det([M])",
            en: "Matrix determinant det([M])"
        },
        "MatrixDeterminantDesc": {
            zh: `
            计算2x2或3x3矩阵的行列式（高精度实数）。
            `,
            en: `
            Calculate determinant of 2x2 or 3x3 matrix (high precision real number).
            `,
        },
        "MatrixTraceText": {
            zh: "矩阵的迹 tr([M])",
            en: "Matrix trace tr([M])"
        },
        "MatrixTraceDesc": {
            zh: `
            返回矩阵对角线元素之和。
            `,
            en: `
            Return the sum of diagonal elements.
            `,
        },
        "MatrixInvertibleText": {
            zh: "矩阵的逆 [M]⁻¹",
            en: "Matrix inverse [M]⁻¹"
        },
        "MatrixInvertibleDesc": {
            zh: `
            计算矩阵的逆矩阵（如果存在）。
            仅支持2x2和3x3矩阵。
            `,
            en: `
            Calculate the inverse of the matrix (if exists).
            Only supports 2x2 and 3x3 matrices.
            `,
        },
        "UndefinedErrorText": {
            zh: "未知的错误！",
            en: "Error: Undefined Error!"
        },
        "UnknownPowerTypeError": {
            zh: "错误：未知的幂运算类型，请选择 10^x、2^x 或 e^x",
            en: "Error: Unknown power type, please select 10^x, 2^x or e^x"
        },
        "UnknownLogTypeError": {
            zh: "错误：未知的对数类型，请选择 log₁₀、log₂ 或 ln",
            en: "Error: Unknown log type, please select log₁₀, log₂ or ln"
        },
        "UnknownRoundMethodError": {
            zh: "错误：未知的舍入方法，请选择 round、ceil 或 floor",
            en: "Error: Unknown rounding method, please select round, ceil or floor"
        },
        "KnuthArrowIndexNotIntegerError": {
            zh: "错误：高纳德箭头的索引必须是非负整数",
            en: "Error: Knuth arrow index must be a non-negative integer"
        },
        "KnuthArrowIndexNegativeError": {
            zh: "错误：高纳德箭头的索引不能为负数",
            en: "Error: Knuth arrow index cannot be negative"
        },
        "KnuthArrowLoopLimitError": {
            zh: "错误：高纳德箭头运算超出安全循环上限（>100）",
            en: "Error: Knuth arrow operation exceeded safe loop limit (>100)"
        },
        "TypeStringToNumberError": {
            zh: "错误：类型转换失败，请检查输入格式是否正确",
            en: "Error: Type conversion failed, please check input format"
        },
        "GetNumberPartError": {
            zh: "错误：获取数字部分失败，请检查数字格式",
            en: "Error: Failed to get number part, please check number format"
        },
        "NoNumber": {
            zh: "错误：[Thing]不是数字",
            en: "Error: Have a argument no a number"
        },
        "DivideByZeroError": {
            zh: "错误： 除数不能为0！",
            en: "Error: Divisor by zero!"
        },
        "ZeroPowerZeroError": {
            zh: "错误：0的0次幂无意义",
            en: "Error: 0 to the power of 0 is undefined"
        },
        "ZeroNegativeExponentError": {
            zh: "错误：0的负指数幂无意义",
            en: "Error: 0 to a negative exponent is undefined"
        },
        "NegativeFractionalExponentError": {
            zh: "错误：负数的小数(0-1区域)幂无意义",
            en: "Error: Negative number to a fractional exponent is undefined"
        },
        "NegativeEvenRootError": {
            zh: "错误：负数的偶次根无实数解",
            en: "Error: Negative numbers have no real even roots"
        },
        "ZeroRootError": {
            zh: "错误：0次方根不存在",
            en: "Error: 0th root does not exist"
        },
        "LogBaseError": {
            zh: "错误：对数的底数必须大于0且不等于1",
            en: "Error: Log base must be > 0 and ≠ 1"
        },
        "LogArgumentError": {
            zh: "错误：对数的真数必须大于0",
            en: "Error: Log argument must be > 0"
        },
        "FactorialNegativeError": {
            zh: "错误：负整数的阶乘无定义",
            en: "Error: Factorial of negative integers is undefined"
        },
        "TrigDomainError": {
            zh: "错误：三角函数定义域错误",
            en: "Error: Trigonometric function domain error"
        },
        "ArctrigDomainError": {
            zh: "错误：反三角函数定义域错误",
            en: "Error: Inverse trigonometric function domain error"
        },
        "Atan2XYisZeroError": {
            zh: "错误：Atan2的x和y不能同时为0",
            en: "Error: x and y cannot be 0 in atan2"
        },
        "ExprParseError": {
            zh: "表达式解析错误",
            en: "Error:Expression parse error"
        },
        "ExprInvalidCharError": {
            zh: "表达式包含无效字符",
            en: "Expression contains invalid characters"
        },
        "ExprMismatchedBracketsError": {
            zh: "括号不匹配",
            en: "Mismatched brackets"
        },
        "ExprInvalidFunctionError": {
            zh: "无效的函数名",
            en: "Invalid function name"
        },
        "ExprExpectedRightError": {
            zh: "函数后缺少左括号"
        },
        "ExprExpectedLeftError": {
            zh: "函数后缺少右括号"
        },
        "ExprBracketNotFormaErrort": {
            zh: "函数括号不匹配"
        },
        "ExprError": {
            zh: "函数计算错误",
            en: "calculate Error"
        },
        "ExprEmpty": {
            zh: "表达式为空",
            en: "Expression is empty"
        },
        "smallBigToBig": {
            zh: "最小值大于等于最大值",
            en: "the small biger than to big"
        },
        "RepeatingDecimalError": {
            zh: "循环节必须包含至少一个数字",
            en: "Cycle must contain at least one digit"
        },
        "RepeatingDecimalInvalid": {
            zh: "小数部分无效",
            en: "Invalid decimal part"
        },
        "ExtractCycleError": {
            zh: "循环节提取失败",
            en: "Failed to extract cycle"
        },
        "RepeatingDecimalInvalidError": {
            zh: "循环小数格式无效",
            en: "Repeating decimal format invalid"
        },
        "FractionInvalidError": {
            zh: "分数格式无效",
            en: "Fraction format invalid"
        },
        "RepeatingDecimalConvertError": {
            zh: "循环小数转换错误",
            en: "Repeating decimal conversion error"
        },
        "FractionParseError": {
            zh: "分数格式无效",
            en: "Invalid fraction format"
        },
        "FractionZeroDenominatorError": {
            zh: "分母不能为零",
            en: "Denominator cannot be zero"
        },
        "ImaginaryParseError": {
            zh: "虚数格式错误",
            en: "Imaginary number format error"
        },
        "ImaginaryDivideByZeroError": {
            zh: "虚数除数不能为0",
            en: "Imaginary divisor cannot be 0"
        },
        "ImaginaryRootIndexError": {
            zh: "根指数必须为正整数",
            en: "Root index must be positive integer"
        },
        "ImaginaryNegativeRootError": {
            zh: "负数的偶次根无实数解",
            en: "Negative number has no real even root"
        },
        "ComplexParseError": {
            zh: "复数格式错误",
            en: "Complex number format error"
        },
        "ComplexDivideByZeroError": {
            zh: "复数除数不能为0",
            en: "Complex divisor cannot be 0"
        },
        "ComplexRootIndexError": {
            zh: "根指数必须为正整数",
            en: "Root index must be positive integer"
        },
        "ParseVectorError": {
            zh: "向量格式错误",
            en: "Vector format error"
        },
        "VectorDivideByZeroError": {
            zh: "向量除以零错误",
            en: "Vector division by zero error"
        },
        "EquationParseError": {
            zh: "方程解析错误",
            en: "Equation parse error"
        },
        "EquationSimplifyError": {
            zh: "表达式简化失败",
            en: "Failed to simplify expression"
        },
        "InvalidExpressionError": {
            zh: "表达式无效",
            en: "Expression is invalid"
        },
        "EquationSolveError": {
            zh: "方程求解失败",
            en: "Failed to solve equation"
        },
        "EquationValueError": {
            zh: "表达式求值失败",
            en: "Failed to evaluate expression"
        },
        "EquationInvalidVariable": {
            zh: "无效的变量名",
            en: "Invalid variable name"
        },
        "EquationUnsupported": {
            zh: "不支持的方程类型",
            en: "Unsupported equation type"
        },
        "indexNoDefined": {
            zh: "项数不存在",
            en: "Index is undefined"
        },
        "ParseMatrixError": {
            zh: "矩阵格式错误",
            en: "Matrix format error"
        },
        "setDecimalToInfinity": {
            zh: `
            将精度设置为无穷大或许不是一个好主意
            如果遇到无限小数运算就会死循环甚至崩坏你的编辑器！
            您确定要将精度设置为无穷大吗？`,
            en: `
            Setting the precision to infinity might not be a good idea
            as encountering infinite decimals could lead to an infinite accumulation or even crash your code.
            Are you sure you want to set the precision to infinity?`,
        },
        "setLoopMaxToInfinity": {
            zh: `
            将循环次数设置为无穷大或许不是一个好主意
            可能崩坏你的编辑器！
            您确定要将循环次数设置为无穷大吗？
            `,
            en: `
            Setting the loop max to infinity might not be a good idea
            Are you sure you want to set the loop max to infinity?
            `,
        },
        "returnFalse": {
            zh: '返回false',
            en: 'return false'
        },
        "returnNaN": {
            zh: '返回原生js错误',
            en: 'return javasprite error'
        },
        "returnError": {
            zh: '报错',
            en: 'return error'
        },
        "Support": {
            zh: "支持",
            en: "Support"
        },
        "nonSupport": {
            zh: "不支持",
            en: "nonSupport"
        },
        "sin": {
            zh: "sin",
            en: "sin"
        },
        "cos": {
            zh: "cos",
            en: "cos"
        },
        "tan": {
            zh: "tan",
            en: "tan"
        },
        "cot": {
            zh: "cot",
            en: "cot"
        },
        "sec": {
            zh: "sec",
            en: "sec"
        },
        "csc": {
            zh: "csc",
            en: "csc"
        },
        "asin": {
            zh: "asin",
            en: "asin"
        },
        "acos": {
            zh: "acos",
            en: "acos"
        },
        "atan": {
            zh: "atan",
            en: "atan"
        },
        "acot": {
            zh: "acot",
            en: "acot"
        },
        "asec": {
            zh: "asec",
            en: "asec"
        },
        "acsc": {
            zh: "acsc",
            en: "acsc"
        },
        "TenPower": {
            zh: "10^",
            en: "10^"
        },
        "TwoPower": {
            zh: "2^",
            en: "2^"
        },
        "EPower": {
            zh: "e^",
            en: "e^"
        },
        "TenLog": {
            zh: "log₁₀",
            en: "log₁₀"
        },
        "TwoLog": {
            zh: "log₂",
            en: "log₂"
        },
        "Ln": {
            zh: "ln",
            en: "ln"
        },
        "round": {
            zh: "四舍五入",
            en: "round"
        },
        "ceil": {
            zh: "向上取整",
            en: "ceil"
        },
        "floor": {
            zh: "向下取整",
            en: "floor"
        },
        "sinh": {
            zh: "sinh",
            en: "sinh"
        },
        "cosh": {
            zh: "cosh",
            en: "cosh"
        },
        "tanh": {
            zh: "tanh",
            en: "tanh"
        },
        "coth": {
            zh: "coth",
            en: "coth"
        },
        "sech": {
            zh: "sech",
            en: "sech"
        },
        "csch": {
            zh: "csch",
            en: "csch"
        },
        "asinh": {
            zh: "asinh",
            en: "asinh"
        },
        "acosh": {
            zh: "acosh",
            en: "acosh"
        },
        "atanh": {
            zh: "atanh",
            en: "atanh"
        },
        "acoth": {
            zh: "acoth",
            en: "acoth"
        },
        "asech": {
            zh: "asech",
            en: "asech"
        },
        "acsch": {
            zh: "acsch",
            en: "acsch"
        },
        "degrees": {
            zh: "角度制",
            en: "degrees"
        },
        "radians": {
            zh: "弧度制",
            en: "radians"
        },
        "antecedent": {
            zh: "前项",
            en: "antecedent"
        },
        "consequent": {
            zh: "后项",
            en: "consequent"
        },
        "realPart": {
            zh: "实部",
            en: "real part"
        },
        "imaginaryPart": {
            zh: "虚部",
            en: "imaginary part"
        },
        "complexConjugate": {
            zh: "共轭",
            en: "conjugate"
        },
        "bigint": {
            zh: "大整数",
            en: "big int"
        },
        "highprecision": {
            zh: "高精度",
            en: "big decmal"
        },
        "imaginary": {
            zh: "虚数",
            en: "imaginary"
        },
        "complex": {
            zh: "复数",
            en: "complex"
        },
        "integerPart": {
            zh: "整数部分",
            en: "int part"
        },
        "decimalPart": {
            zh: "小数部分",
            en: "decimal part"
        },
        "signPart": {
            zh: "符号部分",
            en: "sign part"
        },
        "xComponent": {
            zh: "x分量",
            en: "x component"
        },
        "yComponent": {
            zh: "y分量",
            en: "y component"
        },
        "zComponent": {
            zh: "z分量",
            en: "z component"
        },
        "CannotBeZero": {
            zh: "[Thing]的参数不能为0"
        },
        "CannotBeNeg": {
            zh: "[Thing]的参数不能为负数"
        },
        "CannotBeNegOrZero": {
            zh: "[Thing]的参数不能为0或负数"
        },
        "GetcommonFactorsText": {
            en: "The Factors of Number [Number] and [Number2]"
        },
        "GetcommonFactorsDesc": {
            en: `
            Get all common factors  of two numbers
            arguments:
                Number:
                    Type:Number
                    Name:Number
                Number2:
                    Type:Number
                    Name:Number2
            `,
        },
        "GetMoresumText": {
            en: "Roots of Number[Number]"
        },
        "GetMoresumDesc": {
            en: `
            Sum up the corresponding numbers until only one digit remains
            Arguments：
                Number:
                    Type:Number
                    Name:Number
            `,
        },
        "ExprExpectedRight": {
            en: "Expected ')' "
        },
        "ExprExpectedLeft": {
            en: "Expected '(' "
        },
        "ExprBracketNotFormat": {
            en: "Bracket Not Format"
        },
    };

    const _translations = { zh: {}, en: {} };
    for (const _id of Object.keys(i10n)) {
        const _v = i10n[_id];
        if (_v.zh !== undefined) _translations.zh[_id] = _v.zh;
        if (_v.en !== undefined) _translations.en[_id] = _v.en;
    }
    Scratch.translate.setup(_translations);

    const formatMessage = Scratch.translate;
    const lang = (id, defaultValue, data) => Scratch.translate({ id: id, default: defaultValue, data: data });
    const { Cast, ArgumentType, BlockType, extensions } = Scratch;
    const COLOR = {
        Operator: {
            color1: "#62c22e",
            color2: "#4e9b25",
            color3: "#4e9b25",
        },
        Number: {
            color1: "#4da823",
            color2: "#3d7a1d",
            color3: "#3d7a1d"
        },
        Combinatorics: {
            color1: "#99D777",
            color2: "#8CBE71",
            color3: "#8CBE71"
        },
        Boolean: {
            color1: "#00a889",
            color2: "#00977b",
            color3: "#00866e"
        },
    }

    // ===== NumberOps 基础高精度数字运算 =====
    class NumberOps {
        constructor(ctx) { this.ctx = ctx; }

        /**
         * SetDecimal
         * 参数 {object} args - 包含Num参数的对象
         * 返回 {void} - 无返回值，更新类的decimal属性.
         * 道理 {步骤}-
         *       1.设置计算精度
         *       2.重新计算pi值以适应新的精度
         */
        SetDecimal(args) {
            if (args.Num == Infinity) {
                const text = confirm(lang("setDecimalToInfinity"))
                if (text) {
                    this.ctx.decimal = Infinity
                    return
                }
            }
            this.ctx.decimal = Math.max(0, Math.round(Math.abs(args.Num)));
            this.ctx._calculatePi();
            this.ctx._calculateE();
        }

        /**
         * ChangeError
         * 参数 {object} args - 包含menu参数的对象
         * 返回 {void} - 无返回值，更新错误处理方式.
         * 道理 {步骤}-
         *       1.根据菜单选择设置错误处理方式
         *       2.支持三种错误处理模式
         */
        ChangeError(args) {
            switch (args.menu) {
                case "false":
                    this.ctx.errorText = 1
                    break
                case "nan":
                    this.ctx.errorText = 2
                    break
                case "error":
                    this.ctx.errorText = 3
                    break
                default:
                    this.ctx.runtime.logSystem.show()
                    this.ctx.runtime.logSystem.error(lang("UndefinedErrorText"))
                    break
            }
        }

        /**
         * ChangeSupportBoolean
         * 参数 {object} args - 包含menu参数的对象
         * 返回 {void} - 无返回值，更新布尔运算支持设置.
         * 道理 {步骤}-
         *       1.根据菜单选择设置是否支持布尔运算
         *       2.true转换为1，false转换为0
         */
        ChangeSupportBoolean(args) {
            switch (args.menu) {
                case "Support":
                    this.ctx.supportBoolean = true
                    break
                case "nonSupport":
                    this.ctx.supportBoolean = false
                    break
                default:
                    this.ctx.supportBoolean = false
                    break
            }
        }

        SetMaxLoopLimit(args) {
            if (args.Num == Infinity) {
                const text = confirm(lang("setLoopMaxToInfinity"))
                if (text) {
                    this.ctx.decimal = Infinity
                    return
                }
            }
            let limit = parseInt(args.MaxNumber, 10);
            this.ctx.maxLoopLimit = limit;
        }

        /**
         * Add
         * 参数 {object} args - 包含Addend1和Addend2参数的对象
         * 返回 {string} - 两个数字相加的结果.
         * 道理 {步骤}-
         *       1.解析两个数字的符号、整数和小数部分
         *       2.对齐小数部分长度
         *       3.根据符号情况进行加法或减法运算
         *       4.格式化最终结果
         */
        Add(args) {
            const num1Str = String(args.Addend1);
            const num2Str = String(args.Addend2);

            const { sign: sign1, integer: int1, decimal: dec1 } = this.ctx._parseNumber(num1Str);
            const { sign: sign2, integer: int2, decimal: dec2 } = this.ctx._parseNumber(num2Str);

            const maxDecLength = Math.max(dec1.length, dec2.length);
            const alignedDec1 = this.ctx._padDecimal(dec1, maxDecLength);
            const alignedDec2 = this.ctx._padDecimal(dec2, maxDecLength);

            let resultSign, resultInt, resultDec;
            if (sign1 === sign2) {
                resultSign = sign1;
                const { dec: decSum, carry: decCarry } = this.ctx._addDecimal(alignedDec1, alignedDec2, 0);
                const { int: intSum, carry: intCarry } = this.ctx._addInteger(int1, int2, decCarry);
                resultInt = intCarry > 0 ? `${intCarry}${intSum}` : intSum;
                resultDec = decSum;
            } else {
                const abs1 = this.ctx._combineIntDec(int1, alignedDec1);
                const abs2 = this.ctx._combineIntDec(int2, alignedDec2);

                if (this.ctx._isAbsGreater(abs1, abs2)) {
                    resultSign = sign1;
                    const { int: intDiff, carry: intBorrow } = this.ctx._subtractInteger(int1, int2, 0);
                    const { dec: decDiff, carry: decBorrow } = this.ctx._subtractDecimal(alignedDec1, alignedDec2, intBorrow);
                    resultInt = intDiff;
                    resultDec = decDiff;
                } else {
                    resultSign = sign2;
                    const { int: intDiff, carry: intBorrow } = this.ctx._subtractInteger(int2, int1, 0);
                    const { dec: decDiff, carry: decBorrow } = this.ctx._subtractDecimal(alignedDec2, alignedDec1, intBorrow);
                    resultInt = intDiff;
                    resultDec = decDiff;
                }
            }

            const finalResult = this.ctx._formatResult(resultSign, resultInt, resultDec);
            return finalResult;
        }

        /**
         * Subtract
         * 参数 {object} args - 包含Minuend和Subtrahend参数的对象
         * 返回 {string} - 两个数字相减的结果.
         * 道理 {步骤}-
         *       1.使用Add方法实现减法（a - b = a + (-b)）
         *       2.将第二个参数取负后相加
         */
        Subtract(args) {
            return this.ctx.Add({
                Addend1: args.Minuend,
                Addend2: this.ctx.Multiply({ Multiplier1: args.Subtrahend, Multiplier2: "-1" })
            });
        }

        /**
         * Multiply
         * 参数 {object} args - 包含Multiplier1和Multiplier2参数的对象
         * 返回 {string} - 两个数字相乘的结果.
         * 道理 {步骤}-
         *       1.解析两个数字的符号、整数和小数部分
         *       2.计算总的小数位数
         *       3.将数字转换为整数进行乘法运算
         *       4.根据小数位数确定小数点位置
         *       5.格式化最终结果
         */
        Multiply(args) {
            const num1Str = String(args.Multiplier1);
            const num2Str = String(args.Multiplier2);

            const { sign: sign1, integer: int1, decimal: dec1 } = this.ctx._parseNumber(num1Str);
            const { sign: sign2, integer: int2, decimal: dec2 } = this.ctx._parseNumber(num2Str);

            const resultSign = sign1 * sign2;
            const totalDecimalDigits = dec1.length + dec2.length;

            const intNum1 = int1 + dec1;
            const intNum2 = int2 + dec2;

            const product = this.ctx._multiplyIntegers(intNum1, intNum2);

            let resultInt, resultDec;
            if (totalDecimalDigits === 0) {
                resultInt = product;
                resultDec = '';
            } else if (product.length <= totalDecimalDigits) {
                const paddedProduct = product.padStart(totalDecimalDigits, '0');
                resultInt = '0';
                resultDec = paddedProduct.slice(0, paddedProduct.length - 0);
            } else {
                const decimalPos = product.length - totalDecimalDigits;
                resultInt = product.slice(0, decimalPos);
                resultDec = product.slice(decimalPos);
            }

            const finalResult = this.ctx._formatResult(resultSign, resultInt, resultDec);
            return finalResult;
        }

        /**
         * Divide
         * 参数 {object} args - 包含Dividend和Divisor参数的对象
         * 返回 {string} - 两个数字相除的结果.
         * 道理 {步骤}-
         *       1.检查除数是否为零
         *       2.处理无限循环小数的情况
         *       3.使用长除法算法计算商
         *       4.根据精度设置舍入结果
         */
        Divide(args) {
            const dividendStr = String(args.Dividend);
            const divisorStr = String(args.Divisor);

            if (parseFloat(divisorStr) === 0) {
                switch (this.ctx.errorText) {
                    case 1:
                        return false;
                    case 2:
                        if (args.Divisor == 0 && args.Dividend == 0) {
                            return NaN;
                        } else if (args.Dividend >= 0 && args.Divisor == 0) {
                            return Infinity;
                        } else if (args.Dividend <= 0 && args.Divisor == 0) {
                            return -Infinity;
                        } else {
                            return "error";
                        }
                    case 3:
                        this.ctx.runtime.logSystem.show();
                        this.ctx.runtime.logSystem.error("DivideByZeroError");
                        return lang("DivideByZeroError");
                    default:
                        return "error";
                }
            }

            const dividendNum = parseFloat(dividendStr);
            const divisorNum = parseFloat(divisorStr);
            const isInfinite = this.ctx._isInfiniteDecimal(dividendNum, divisorNum);

            const { sign: sign1, integer: int1, decimal: dec1 } = this.ctx._parseNumber(dividendStr);
            const { sign: sign2, integer: int2, decimal: dec2 } = this.ctx._parseNumber(divisorStr);

            const resultSign = sign1 * sign2;
            const maxDecimals = Math.max(dec1.length, dec2.length);

            const dividendInt = int1 + dec1.padEnd(maxDecimals, '0');
            const divisorInt = int2 + dec2.padEnd(maxDecimals, '0');

            let { quotient: intQuotient, remainder } = this.ctx._divideIntegers(dividendInt, divisorInt);

            let decQuotient = '';
            let decimalPlaces = 0;
            const maxPrecision = this.ctx.decimal;

            if (isInfinite) {
                while (decimalPlaces < maxPrecision) {
                    remainder += '0';
                    const division = this.ctx._divideIntegers(remainder, divisorInt);
                    decQuotient += division.quotient;
                    remainder = division.remainder;
                    decimalPlaces++;
                }
            } else {
                while (remainder !== '0' && decimalPlaces < maxPrecision) {
                    remainder += '0';
                    const division = this.ctx._divideIntegers(remainder, divisorInt);
                    decQuotient += division.quotient;
                    remainder = division.remainder;
                    decimalPlaces++;
                }
            }

            let tempResult = this.ctx._formatResult(resultSign, intQuotient, decQuotient);
            const finalResult = this.ctx._roundToPrecision(tempResult, maxPrecision);

            return finalResult;
        }

        /**
         * Mod
         * 参数 {object} args - 包含Dividend和Divisor参数的对象
         * 返回 {string} - 两个数字相除的余数.
         * 道理 {步骤}-
         *       1.检查除数是否为零
         *       2.计算商并向下取整
         *       3.计算余数：被除数 - 商 × 除数
         */
        Mod(args) {
            const dividendStr = String(args.Dividend);
            const divisorStr = String(args.Divisor);

            if (parseFloat(divisorStr) === 0) {
                switch (this.ctx.errorText) {
                    case 1:
                        return false;
                    case 2:
                        if (args.Divisor == 0 && args.Dividend == 0) {
                            return NaN;
                        } else if (args.Dividend >= 0 && args.Divisor == 0) {
                            return Infinity;
                        } else if (args.Dividend <= 0 && args.Divisor == 0) {
                            return -Infinity;
                        } else {
                            return "error";
                        }
                    case 3:
                        this.ctx.runtime.logSystem.show();
                        this.ctx.runtime.logSystem.error(lang("DivideByZeroError"));
                        return lang("DivideByZeroError");
                    default:
                        return "error";
                }
            }

            const quotient = this.ctx.Divide({ Dividend: args.Dividend, Divisor: args.Divisor });
            const floorQuotient = this.ctx._floorNumber(quotient);
            const product = this.ctx.Multiply({ Multiplier1: floorQuotient, Multiplier2: args.Divisor });
            const result = this.ctx.Subtract({ Minuend: args.Dividend, Subtrahend: product });

            return result;
        }

        /**
         * Quo
         * 参数 {object} args - 包含Dividend和Divisor参数的对象
         * 返回 {string} - 两个数字相除的商数（整数部分）.
         * 道理 {步骤}-
         *       1.检查除数是否为零
         *       2.计算余数
         *       3.计算商数：（被除数 - 余数）/ 除数
         */
        Quo(args) {
            const dividendStr = String(args.Dividend);
            const divisorStr = String(args.Divisor);

            if (parseFloat(divisorStr) === 0) {
                switch (this.ctx.errorText) {
                    case 1:
                        return false;
                    case 2:
                        if (args.Divisor == 0 && args.Dividend == 0) {
                            return NaN;
                        } else if (args.Dividend >= 0 && args.Divisor == 0) {
                            return Infinity;
                        } else if (args.Dividend <= 0 && args.Divisor == 0) {
                            return -Infinity;
                        } else {
                            return "error";
                        }
                    case 3:
                        this.ctx.runtime.logSystem.show();
                        this.ctx.runtime.logSystem.error(lang("DivideByZeroError"));
                        return lang("DivideByZeroError");
                    default:
                        return "error";
                }
            }

            const remainder = this.ctx.Mod(args);
            const subtractResult = this.ctx.Subtract({ Minuend: args.Dividend, Subtrahend: remainder });
            const quotient = this.ctx.Divide({ Dividend: subtractResult, Divisor: args.Divisor });

            return quotient;
        }

        /**
         * DivideDigit
         * 参数 {object} args - 包含Dividend、Divisor和Digit参数的对象
         * 返回 {string} - 指定精度的除法结果.
         * 道理 {步骤}-
         *       1.检查除数是否为零
         *       2.根据指定的精度计算小数部分
         *       3.处理无限循环小数的情况
         *       4.舍入到指定精度
         */
        DivideDigit(args) {
            const dividendStr = String(args.Dividend);
            const divisorStr = String(args.Divisor);

            if (parseFloat(divisorStr) === 0) {
                switch (this.ctx.errorText) {
                    case 1:
                        return false;
                    case 2:
                        if (args.Divisor == 0 && args.Dividend == 0) {
                            return NaN;
                        } else if (args.Dividend >= 0 && args.Divisor == 0) {
                            return Infinity;
                        } else if (args.Dividend <= 0 && args.Divisor == 0) {
                            return -Infinity;
                        } else {
                            return "error";
                        }
                    case 3:
                        this.ctx.runtime.logSystem.show();
                        this.ctx.runtime.logSystem.error(lang("DivideByZeroError"));
                        return lang("DivideByZeroError");
                    default:
                        return "error";
                }
            }

            const dividendNum = parseFloat(dividendStr);
            const divisorNum = parseFloat(divisorStr);
            const isInfinite = this.ctx._isInfiniteDecimal(dividendNum, divisorNum);

            const { sign: sign1, integer: int1, decimal: dec1 } = this.ctx._parseNumber(dividendStr);
            const { sign: sign2, integer: int2, decimal: dec2 } = this.ctx._parseNumber(divisorStr);

            const resultSign = sign1 * sign2;
            const maxDecimals = Math.max(dec1.length, dec2.length);

            const dividendInt = int1 + dec1.padEnd(maxDecimals, '0');
            const divisorInt = int2 + dec2.padEnd(maxDecimals, '0');

            let { quotient: intQuotient, remainder } = this.ctx._divideIntegers(dividendInt, divisorInt);

            let decQuotient = '';
            const maxDecimalPlaces = args.Digit;
            let decimalPlaces = 0;

            if (isInfinite) {
                while (decimalPlaces < maxDecimalPlaces) {
                    remainder += '0';
                    const division = this.ctx._divideIntegers(remainder, divisorInt);
                    decQuotient += division.quotient;
                    remainder = division.remainder;
                    decimalPlaces++;
                }
            } else {
                while (remainder !== '0' && decimalPlaces < maxDecimalPlaces) {
                    remainder += '0';
                    const division = this.ctx._divideIntegers(remainder, divisorInt);
                    decQuotient += division.quotient;
                    remainder = division.remainder;
                    decimalPlaces++;
                }
            }

            let tempResult = this.ctx._formatResult(resultSign, intQuotient, decQuotient);
            const finalResult = this.ctx._roundToPrecision(tempResult, maxDecimalPlaces);

            return finalResult;
        }

        /**
         * DivideDiv
         * 参数 {object} args - 包含Dividend和Divisor参数的对象
         * 返回 {string} - 除法结果.
         * 道理 {步骤}-
         *       1.调用Divide方法实现"除"法运算
         *       2.注意与"除以"的区别
         */
        DivideDiv(args) {
            return this.ctx.Divide({ Dividend: args.Dividend, Divisor: args.Divisor });
        }

        /**
         * Power
         * 参数 {object} args - 包含Base和Exponent参数的对象
         * 返回 {string} - 幂运算结果.
         * 道理 {步骤}-
         *       1.检查各种边界情况（0^0, 0的负指数等）
         *       2.处理负指数的情况
         *       3.分离整数部分和小数部分分别计算
         *       4.使用指数和对数计算小数幂
         */
        Power(args) {
            const baseStr = String(args.Base);
            const exponentStr = String(args.Exponent);

            const baseNum = parseFloat(baseStr);
            const exponentNum = parseFloat(exponentStr);

            if (baseNum === 0 && exponentNum === 0) {
                return this.ctx._handleError(lang("ZeroPowerZeroError"));
            }

            if (baseNum === 0 && exponentNum < 0) {
                return this.ctx._handleError(lang("ZeroNegativeExponentError"));
            }

            if (baseNum < 0 && exponentNum > 0 && exponentNum < 1) {
                return this.ctx._handleError(lang("NegativeFractionalExponentError"));
            }

            if (exponentNum === 0) {
                return "1";
            }

            if (baseNum === 1) {
                return "1";
            }

            if (exponentNum < 0) {
                const positiveExponent = -exponentNum;
                const result = this.ctx.Power({ Base: baseStr, Exponent: positiveExponent.toString() });
                return this.ctx._reciprocal(result);
            }

            let result = "1";
            const exponentInt = Math.floor(exponentNum);
            const fractionalPart = exponentNum - exponentInt;

            for (let i = 0; i < exponentInt; i++) {
                result = this.ctx.Multiply({ Multiplier1: result, Multiplier2: baseStr });
            }

            if (fractionalPart > 0) {
                const logResult = this.ctx._naturalLogarithm(baseStr);
                const scaledLog = this.ctx.Multiply({ Multiplier1: logResult, Multiplier2: fractionalPart.toString() });
                const expResult = this.ctx._exponentialFunction(scaledLog);
                result = this.ctx.Multiply({ Multiplier1: result, Multiplier2: expResult });
            }

            return this.ctx._roundToPrecision(result, this.ctx.decimal);
        }

        /**
         * Root
         * 参数 {object} args - 包含RootIndex和Radicand参数的对象
         * 返回 {string} - 根运算结果.
         * 道理 {步骤}-
         *       1.检查各种边界情况（0次根、负数的偶次根等）
         *       2.使用牛顿迭代法求近似解
         *       3.返回舍入到指定精度的结果
         */
        Root(args) {
            const rootIndexStr = String(args.RootIndex);
            const radicandStr = String(args.Radicand);

            const rootIndexNum = parseFloat(rootIndexStr);
            const radicandNum = parseFloat(radicandStr);

            if (rootIndexNum === 0) {
                return this.ctx._handleError(lang("ZeroRootError"));
            }
            if (radicandNum < 0 && rootIndexNum % 2 === 0) {
                return this.ctx._handleError(lang("NegativeEvenRootError"));
            }

            if (radicandNum === 0) return "0";
            if (rootIndexNum === 1) return radicandStr;

            return this.ctx._newtonRootWithPrecision(radicandStr, rootIndexStr);
        }

        /**
         * Log
         * 参数 {object} args - 包含Base和Logarithm参数的对象
         * 返回 {string} - 对数运算结果.
         * 道理 {步骤}-
         *       1.检查底数和真数的有效性
         *       2.使用换底公式：log_b(a) = ln(a) / ln(b)
         *       3.返回舍入到指定精度的结果
         */
        Log(args) {
            const baseStr = String(args.Base);
            const logarithmStr = String(args.Logarithm);

            const baseNum = parseFloat(baseStr);
            const logarithmNum = parseFloat(logarithmStr);

            if (baseNum <= 0 || baseNum === 1) {
                return this.ctx._handleError(lang("LogBaseError"));
            }
            if (logarithmNum <= 0) {
                return this.ctx._handleError(lang("LogArgumentError"));
            }

            const lnBase = this.ctx._naturalLogarithm(baseStr);
            const lnLogarithm = this.ctx._naturalLogarithm(logarithmStr);

            const result = this.ctx.Divide({
                Dividend: lnLogarithm,
                Divisor: lnBase
            });

            return this.ctx._roundToPrecision(result, this.ctx.decimal);
        }

        /**
         * Factorial
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 阶乘或伽马函数结果.
         * 道理 {步骤}-
         *       1.检查负整数的情况
         *       2.对于非负整数，使用迭代计算
         *       3.对于其他情况，使用伽马函数计算
         */
        Factorial(args) {
            const numberStr = String(args.Number);
            const numberNum = parseFloat(numberStr);

            if (numberNum < 0 && this.ctx._isInteger(numberStr)) {
                return this.ctx._handleError(lang("FactorialNegativeError"));
            }

            if (numberStr === "0" || numberStr === "1") {
                return "1";
            }

            if (this.ctx._isInteger(numberStr) && numberNum >= 0) {
                let result = "1";
                const intN = Math.floor(numberNum);
                for (let i = 2; i <= intN; i++) {
                    result = this.ctx.Multiply({ Multiplier1: result, Multiplier2: i.toString() });
                }
                return result;
            }

            const gammaInput = this.ctx.Add({ Addend1: numberStr, Addend2: "1" });
            const gammaResult = this.ctx._gammaFunctionImproved(gammaInput);

            return this.ctx._roundToPrecision(gammaResult, this.ctx.decimal);
        }

        /**
         * 计算表达式的主方法
         * @param {object} args - 包含expression参数的对象
         * @returns {string} 表达式计算结果
         */
        calculateExpression(args) {
            const expr = args.expression;
            if (!expr || expr.trim() === '') {
                return this.ctx._handleError(lang("ExprParseError") + ":" + lang("ExprEmpty"));
            }

            try {
                // 1. 预处理表达式（统一运算符、括号等）
                const processedExpr = this.ctx._preprocessExpression(expr);

                // 2. 验证表达式合法性
                this.ctx._validateExpression(processedExpr);

                // 3. 分词（将表达式拆分为令牌）
                const tokens = this.ctx._tokenizeExpression(processedExpr);

                if (tokens.length === 0) {
                    return this.ctx._handleError(lang("ExprParseError"));
                }

                // 4. 解析令牌并计算结果
                const { result } = this.ctx._parseTokens(tokens);

                // 5. 格式化结果
                return this.ctx._roundToPrecision(result.toString(), this.ctx.decimal);

            } catch (error) {
                return this.ctx._handleError(error.message || lang("ExprParseError"));
            }
        }

        Negative(args) {
            return this.ctx.Multiply({
                Multiplier1: args.Number,
                Multiplier2: "-1"
            });
        }

        /**
         * Absolute
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 数字的绝对值.
         * 道理 {步骤}-
         *       1.解析输入数字的符号、整数和小数部分
         *       2.如果符号为负，则返回正数形式
         *       3.如果符号为正，直接返回原数字
         *       4.处理零的情况
         */
        Absolute(args) {
            const numStr = String(args.Number);

            // 使用现有的解析方法获取数字的各个部分
            const { sign, integer, decimal } = this.ctx._parseNumber(numStr);

            // 如果符号为负，返回正数形式；否则返回原数字
            if (sign === -1) {
                // 对于负数，返回其绝对值（去掉负号）
                return this.ctx._formatResult(1, integer, decimal);
            } else {
                // 对于正数或零，直接返回
                return this.ctx._formatResult(sign, integer, decimal);
            }
        }

        /**
         * NegativeAbsolute
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 数字的负绝对值.
         * 道理 {步骤}-
         *       1.先计算输入数字的绝对值
         *       2.然后对绝对值取负
         *       3.返回结果
         */
        NegativeAbsolute(args) {
            // 先计算绝对值
            const absoluteValue = this.ctx.Absolute(args);

            // 然后对绝对值取负
            const result = this.ctx.Multiply({
                Multiplier1: absoluteValue,
                Multiplier2: "-1"
            });

            return result;
        }

        /**
         * Percent
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 数字除以100的结果.
         * 道理 {步骤}-
         *       1.将输入数字除以100
         *       2.返回百分比形式的结果
         */
        Percent(args) {
            const numStr = String(args.Number);

            // 使用现有的除法方法将数字除以100
            const result = this.ctx.Divide({
                Dividend: numStr,
                Divisor: "100"
            });

            return result;
        }

        /**
         * PercentOf
         * 参数 {object} args - 包含Number和Percent参数的对象
         * 返回 {string} - 基数的指定百分比值.
         * 道理 {步骤}-
         *       1.将百分比值转换为小数（除以100）
         *       2.将基数乘以这个小数
         *       3.返回计算结果
         */
        PercentOf(args) {
            const baseStr = String(args.Number);
            const percentStr = String(args.Percent);

            // 先将百分比转换为小数（除以100）
            const percentDecimal = this.ctx.Divide({
                Dividend: percentStr,
                Divisor: "100"
            });

            // 然后将基数乘以这个小数
            const result = this.ctx.Multiply({
                Multiplier1: baseStr,
                Multiplier2: percentDecimal
            });

            return result;
        }

        /**
         * Square
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 数字的平方.
         * 道理 {步骤}-
         *       1.使用现有的乘法方法计算数字乘以自身
         *       2.返回平方结果
         */
        Square(args) {
            const numStr = String(args.Number);

            // 使用乘法方法计算平方
            const result = this.ctx.Multiply({
                Multiplier1: numStr,
                Multiplier2: numStr
            });

            return result;
        }

        /**
         * Cube
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 数字的立方.
         * 道理 {步骤}-
         *       1.使用现有的乘法方法计算数字的三次幂
         *       2.返回立方结果
         */
        Cube(args) {
            const numStr = String(args.Number);

            // 先计算平方
            const square = this.ctx.Multiply({
                Multiplier1: numStr,
                Multiplier2: numStr
            });

            // 再乘以原数得到立方
            const result = this.ctx.Multiply({
                Multiplier1: square,
                Multiplier2: numStr
            });

            return result;
        }

        /**
         * SquareRoot
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 数字的平方根.
         * 道理 {步骤}-
         *       1.使用现有的根运算方法计算平方根
         *       2.根指数为2
         *       3.处理负数的特殊情况
         */
        SquareRoot(args) {
            const numStr = String(args.Number);
            const num = parseFloat(numStr);

            // 检查负数的情况
            if (num < 0) {
                return this.ctx._handleError(lang("NegativeEvenRootError"));
            }

            // 使用根运算方法计算平方根（根指数为2）
            return this.ctx.Root({
                RootIndex: "2",
                Radicand: numStr
            });
        }

        /**
         * CubeRoot
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 数字的立方根.
         * 道理 {步骤}-
         *       1.使用现有的根运算方法计算立方根
         *       2.根指数为3
         *       3.支持负数的立方根
         */
        CubeRoot(args) {
            const numStr = String(args.Number);

            // 使用根运算方法计算立方根（根指数为3）
            // 立方根支持负数，因为负数的立方也是负数
            return this.ctx.Root({
                RootIndex: "3",
                Radicand: numStr
            });
        }

        /**
         * Powers
         * 参数 {object} args - 包含Powers和Number参数的对象
         * 返回 {string} - 指定底数的指数函数结果.
         * 道理 {步骤}-
         *       1.根据菜单选择确定底数（10、2或e）
         *       2.使用幂运算计算结果
         *       3.返回计算结果
         */
        Powers(args) {
            const exponentStr = String(args.Number);
            const powerType = args.Powers;

            let base;
            switch (powerType) {
                case "TenPower":
                    base = "10";
                    break;
                case "TwoPower":
                    base = "2";
                    break;
                case "EPower":
                    base = this.ctx.e; // 使用预先计算的e值
                    break;
                default:
                    return this.ctx._handleError(lang("UnknownPowerTypeError"));
            }

            // 使用现有的幂运算方法
            const result = this.ctx.Power({
                Base: base,
                Exponent: exponentStr
            });

            return result;
        }

        /**
         * Logs
         * 参数 {object} args - 包含Logs和Number参数的对象
         * 返回 {string} - 指定底数的对数函数结果.
         * 道理 {步骤}-
         *       1.根据菜单选择确定对数类型（常用对数、二进制对数或自然对数）
         *       2.使用对数运算计算结果
         *       3.处理错误情况
         */
        Logs(args) {
            const argumentStr = String(args.Number);
            const logType = args.Logs;

            // 检查真数是否有效（必须大于0）
            const argumentNum = parseFloat(argumentStr);
            if (argumentNum <= 0) {
                return this.ctx._handleError(lang("LogArgumentError"));
            }

            let result;
            switch (logType) {
                case "TenLog":
                    // 常用对数：以10为底
                    result = this.ctx.Log({
                        Base: "10",
                        Logarithm: argumentStr
                    });
                    break;
                case "TwoLog":
                    // 二进制对数：以2为底
                    result = this.ctx.Log({
                        Base: "2",
                        Logarithm: argumentStr
                    });
                    break;
                case "Ln":
                    // 自然对数：以e为底
                    result = this.ctx._naturalLogarithm(argumentStr);
                    break;
                default:
                    return this.ctx._handleError(lang("UnknownLogTypeError"));
            }

            return result;
        }

        /**
         * LimitInRange
         * 参数 {object} args - 包含Number、Min和Max参数的对象
         * 返回 {string} - 限制在指定范围内的数字.
         * 道理 {步骤}-
         *       1.检查最小值是否大于等于最大值
         *       2.如果数字小于最小值，返回最小值
         *       3.如果数字大于最大值，返回最大值
         *       4.否则返回数字本身
         */
        LimitInRange(args) {
            const numStr = String(args.Number);
            const minStr = String(args.Min);
            const maxStr = String(args.Max);

            // 检查最小值是否大于等于最大值
            if (parseFloat(minStr) >= parseFloat(maxStr)) {
                return this.ctx._handleError(lang("smallBigToBig"));
            }

            // 比较数字与最小值
            const compareMin = this.ctx._compareNumbers(numStr, minStr);
            if (compareMin < 0) {
                // 数字小于最小值，返回最小值
                return minStr;
            }

            // 比较数字与最大值
            const compareMax = this.ctx._compareNumbers(numStr, maxStr);
            if (compareMax > 0) {
                // 数字大于最大值，返回最大值
                return maxStr;
            }

            // 数字在范围内，返回数字本身
            return numStr;
        }

        CycleInRange(args) {
            const numMax = args.Max;
            const numMin = args.Min;

            if (parseFloat(numMin) >= parseFloat(numMax)) {
                return this.ctx._handleError(lang("smallBigToBig"));
            }

            // 计算范围大小
            const RangeSize = this.ctx.Add({
                Addend1: this.ctx.Subtract({
                    Minuend: numMax,
                    Subtrahend: numMin,
                }),
                Addend2: "1"
            });

            // 简化逻辑：直接计算在范围内的位置
            const relativePos = this.ctx.Mod({
                Dividend: this.ctx.Subtract({
                    Minuend: args.Number,
                    Subtrahend: numMin,
                }),
                Divisor: RangeSize
            });

            return this.ctx.Add({
                Addend1: relativePos,
                Addend2: numMin
            });
        }

        /**
         * MapRange
         * 参数 {object} args - 包含Number、Min1、Max1、Min2、Max2参数的对象
         * 返回 {string} - 线性映射后的数字.
         * 道理 {步骤}-
         *       1.检查原范围是否有效（Min1 ≠ Max1）
         *       2.计算输入数字在原范围中的比例位置
         *       3.将比例应用到目标范围
         *       4.返回映射结果
         */
        MapRange(args) {
            const numStr = String(args.Number);
            const min1Str = String(args.Min1);
            const max1Str = String(args.Max1);
            const min2Str = String(args.Min2);
            const max2Str = String(args.Max2);

            // 检查原范围是否有效
            if (this.ctx._compareNumbers(min1Str, max1Str) === 0) {
                return this.ctx._handleError("原范围的最小值和最大值不能相同");
            }

            // 计算输入数字在原范围中的位置比例
            // (Number - Min1) / (Max1 - Min1)
            const numerator1 = this.ctx.Subtract({
                Minuend: numStr,
                Subtrahend: min1Str
            });

            const denominator1 = this.ctx.Subtract({
                Minuend: max1Str,
                Subtrahend: min1Str
            });

            const positionRatio = this.ctx.Divide({
                Dividend: numerator1,
                Divisor: denominator1
            });

            // 计算目标范围的大小
            // (Max2 - Min2)
            const targetRange = this.ctx.Subtract({
                Minuend: max2Str,
                Subtrahend: min2Str
            });

            // 计算映射结果
            // Min2 + positionRatio × targetRange
            const scaledValue = this.ctx.Multiply({
                Multiplier1: positionRatio,
                Multiplier2: targetRange
            });

            const result = this.ctx.Add({
                Addend1: min2Str,
                Addend2: scaledValue
            });

            return result;
        }

        /**
         * LinearMap
         * 参数 {object} args - 包含Number、Min和Max参数的对象
         * 返回 {string} - 线性映射后的数字.
         * 道理 {步骤}-
         *       1.将输入数字视为百分比（0-100）
         *       2.计算目标范围的大小
         *       3.将百分比应用到目标范围
         *       4.返回映射结果
         */
        LinearMap(args) {
            const numStr = String(args.Number);
            const minStr = String(args.Min);
            const maxStr = String(args.Max);

            // 计算目标范围的大小
            const targetRange = this.ctx.Subtract({
                Minuend: maxStr,
                Subtrahend: minStr
            });

            // 将输入数字视为百分比，计算比例
            // Number / 100
            const percentageRatio = this.ctx.Divide({
                Dividend: numStr,
                Divisor: "100"
            });

            // 计算映射结果
            // Min + percentageRatio × targetRange
            const scaledValue = this.ctx.Multiply({
                Multiplier1: percentageRatio,
                Multiplier2: targetRange
            });

            const result = this.ctx.Add({
                Addend1: minStr,
                Addend2: scaledValue
            });

            return result;
        }

        /**
         * RoundDecimal
         * 参数 {object} args - 包含Menu、Number和Digit参数的对象
         * 返回 {string} - 舍入到指定小数位数的数字.
         * 道理 {步骤}-
         *       1.根据菜单选择确定舍入方式
         *       2.使用相应的舍入方法处理数字
         *       3.返回舍入后的结果
         */
        RoundDecimal(args) {
            const numStr = String(args.Number);
            const digit = parseInt(args.Digit, 10);
            const method = args.Menu;

            // 确保digit是非负整数
            if (digit < 0) {
                return this.ctx._handleError("小数位数不能为负数");
            }

            let result;

            switch (method) {
                case "round":
                    result = this.ctx._roundToPrecision(numStr, digit);
                    break;
                case "ceil":
                    result = this.ctx._ceilToPrecision(numStr, digit);
                    break;
                case "floor":
                    result = this.ctx._floorToPrecision(numStr, digit);
                    break;
                default:
                    return this.ctx._handleError(lang("UnknownRoundMethodError"));
            }

            return result;
        }

        /**
         * RoundDecimalToInt
         * 参数 {object} args - 包含Menu和Number参数的对象
         * 返回 {string} - 舍入到整数的数字.
         * 道理 {步骤}-
         *       1.调用RoundDecimal方法，小数位数设为0
         *       2.返回整数结果
         */
        RoundDecimalToInt(args) {
            return this.ctx.RoundDecimal({
                Menu: args.Menu,
                Number: args.Number,
                Digit: 0
            });
        }

        /**
         * SimplifyDecimal
         * 参数 {object} args - 包含decimal参数的对象
         * 返回 {string} - 化简后的小数字符串.
         * 道理 {步骤}-
         *       1.解析输入数字的符号、整数和小数部分
         *       2.移除小数部分的尾随零
         *       3.如果小数部分为空或全为零，只返回整数部分
         *       4.如果整数部分为0且小数部分为空，返回0
         *       5.处理负零的情况
         */
        SimplifyDecimal(args) {
            const numStr = String(args.decimal);

            // 使用现有的解析方法获取数字的各个部分
            const { sign, integer, decimal } = this.ctx._parseNumber(numStr);

            // 移除小数部分的尾随零
            let simplifiedDecimal = decimal.replace(/0+$/, '');

            // 如果小数部分为空或全为零，只返回整数部分（带符号）
            if (simplifiedDecimal === '') {
                // 处理负零的情况
                if (sign === -1 && integer === '0') {
                    return '0';
                }
                const formattedInt = integer.replace(/^0+/, '') || '0';
                const formattedSign = sign === -1 ? '-' : '';
                return `${formattedSign}${formattedInt}`;
            }

            // 移除整数部分的前导零（除非整数部分就是0）
            let simplifiedInteger = integer.replace(/^0+/, '');
            if (simplifiedInteger === '') {
                simplifiedInteger = '0';
            }

            // 处理负零的情况（整数部分为0但有小数）
            if (sign === -1 && simplifiedInteger === '0') {
                // 负零但有小数的特殊情况，保留负号
                const formattedSign = simplifiedInteger === '0' ? '-' : '';
                return `${formattedSign}${simplifiedInteger}.${simplifiedDecimal}`;
            }

            // 组合结果
            const formattedSign = sign === -1 ? '-' : '';
            return `${formattedSign}${simplifiedInteger}.${simplifiedDecimal}`;
        }

        Convert(args) {
            // 确保pi已经计算
            this.ctx._calculatePi();

            // 获取输入值
            const value = String(args.Value);
            const conversionType = args.Menu;

            // 验证输入是否为有效数字
            const valueNum = parseFloat(value);
            if (isNaN(valueNum)) {
                return this.ctx._handleError(lang("NoNumber"));
            }

            let result;

            try {
                switch (conversionType) {
                    case "degrees":  // 弧度转角度
                        // 公式：角度 = 弧度 × 180 / π
                        const degrees = this.ctx.Multiply({
                            Multiplier1: value,
                            Multiplier2: this.ctx.Divide({
                                Dividend: "180",
                                Divisor: this.ctx.pi
                            })
                        });
                        result = this.ctx._roundToPrecision(degrees, this.ctx.decimal);
                        break;

                    case "radians":  // 角度转弧度
                        // 公式：弧度 = 角度 × π / 180
                        const radians = this.ctx.Multiply({
                            Multiplier1: value,
                            Multiplier2: this.ctx.Divide({
                                Dividend: this.ctx.pi,
                                Divisor: "180"
                            })
                        });
                        result = this.ctx._roundToPrecision(radians, this.ctx.decimal);
                        break;

                    default:
                        return this.ctx._handleError(lang("UndefinedErrorText"));
                }
            } catch (error) {
                return this.ctx._handleError(lang("UndefinedErrorText") + error.message);
            }

            return result;
        }

        /**
         * 计算斜边长度
         */
        Hypotenuse(args) {
            const aStr = String(args.a);
            const bStr = String(args.b);

            // 计算 a²
            const aSquared = this.ctx.Multiply({
                Multiplier1: aStr,
                Multiplier2: aStr
            });

            // 计算 b²
            const bSquared = this.ctx.Multiply({
                Multiplier1: bStr,
                Multiplier2: bStr
            });

            // 计算 a² + b²
            const sum = this.ctx.Add({
                Addend1: aSquared,
                Addend2: bSquared
            });

            // 计算 √(a² + b²)
            const result = this.ctx.Root({
                RootIndex: "2",
                Radicand: sum
            });

            return result;
        }

        CardinalMultiply(args) {
            // 直接调用现有的Multiply方法
            return this.ctx.Multiply(args);
        }

        /**
         * TriangularAdd
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 阶加运算结果.
         * 道理 {步骤}-
         *       1. 处理整数情况：使用公式 n(n+1)/2
         *       2. 处理小数情况：从0开始，以步长1/10^d累加到n
         *       3. 处理负数情况：从0开始，以步长-1累加到n
         */
        TriangularAdd(args) {
            const nStr = String(args.Number);
            const nNum = parseFloat(nStr);

            // 如果输入不是数字
            if (isNaN(nNum)) {
                return this.ctx._handleError(lang("NoNumber"));
            }

            // 处理整数情况
            if (this.ctx._isInteger(nStr)) {
                const intN = Math.floor(nNum);
                if (intN >= 0) {
                    // 非负整数：使用公式 n(n+1)/2
                    const n = intN.toString();
                    const nPlus1 = this.ctx.Add({ Addend1: n, Addend2: "1" });
                    const product = this.ctx.Multiply({ Multiplier1: n, Multiplier2: nPlus1 });
                    const result = this.ctx.Divide({ Dividend: product, Divisor: "2" });
                    return result;
                } else {
                    // 负整数：从0开始以步长-1累加到n
                    // 公式：n + (n+1) + ... + 0 = n*(n+1)/2（n为负数时，n+1可能为0或正数）
                    // 实际上就是从n累加到0：|n|*(|n|+1)/2，然后加上负号
                    const absN = (-intN).toString();
                    const absNPlus1 = this.ctx.Add({ Addend1: absN, Addend2: "1" });
                    const product = this.ctx.Multiply({ Multiplier1: absN, Multiplier2: absNPlus1 });
                    const absResult = this.ctx.Divide({ Dividend: product, Divisor: "2" });
                    const result = this.ctx.Multiply({ Multiplier1: absResult, Multiplier2: "-1" });
                    return result;
                }
            }

            // 处理小数情况
            if (nNum >= 0) {
                // 非负小数
                // 计算小数位数
                const { decimal } = this.ctx._parseNumber(nStr);
                const decimalPlaces = decimal.length;

                // 将小数转换为整数处理
                const factor = "1" + "0".repeat(decimalPlaces);
                const scaledN = this.ctx.Multiply({ Multiplier1: nStr, Multiplier2: factor });

                // 使用整数阶加公式
                const scaledNPlus1 = this.ctx.Add({ Addend1: scaledN, Addend2: factor });
                const product = this.ctx.Multiply({ Multiplier1: scaledN, Multiplier2: scaledNPlus1 });
                const scaledResult = this.ctx.Divide({ Dividend: product, Divisor: "2" });

                // 除以缩放因子
                const divisor = this.ctx.Multiply({ Multiplier1: factor, Multiplier2: factor });
                const result = this.ctx.Divide({ Dividend: scaledResult, Divisor: divisor });
                return result;
            } else {
                // 负小数：从0开始，以步长-10^{-d}累加到n
                // 计算小数位数
                const { decimal } = this.ctx._parseNumber(nStr);
                const decimalPlaces = decimal.length;

                // 转换为正数处理
                const absN = this.ctx.Multiply({ Multiplier1: nStr, Multiplier2: "-1" });
                const factor = "1" + "0".repeat(decimalPlaces);
                const scaledAbsN = this.ctx.Multiply({ Multiplier1: absN, Multiplier2: factor });

                // 使用整数阶加公式
                const scaledAbsNPlus1 = this.ctx.Add({ Addend1: scaledAbsN, Addend2: factor });
                const product = this.ctx.Multiply({ Multiplier1: scaledAbsN, Multiplier2: scaledAbsNPlus1 });
                const scaledAbsResult = this.ctx.Divide({ Dividend: product, Divisor: "2" });

                // 除以缩放因子并取负
                const divisor = this.ctx.Multiply({ Multiplier1: factor, Multiplier2: factor });
                const absResult = this.ctx.Divide({ Dividend: scaledAbsResult, Divisor: divisor });
                const result = this.ctx.Multiply({ Multiplier1: absResult, Multiplier2: "-1" });
                return result;
            }
        }

        /**
         * KnuthArrow
         * 参数 {object} args - 包含Base和Index参数的对象
         * 返回 {string} - 高纳德箭头运算结果.
         * 道理 {步骤}-
         *       1. 检查Index是否为非负整数
         *       2. 处理特殊情况：Index为0时返回1，Index为1时返回Base
         *       3. 使用递归或循环计算迭代幂次
         */
        KnuthArrow(args) {
            const baseStr = String(args.Base);
            const indexStr = String(args.Index);

            // 检查Index是否为非负整数
            if (!this.ctx._isInteger(indexStr)) {
                return this.ctx._handleError(lang("KnuthArrowIndexNotIntegerError"));
            }

            const indexNum = parseFloat(indexStr);
            if (indexNum < 0) {
                return this.ctx._handleError(lang("KnuthArrowIndexNegativeError"));
            }

            // 处理特殊情况
            if (indexNum === 0) {
                return "1";  // a↑↑0 = 1
            }

            if (indexNum === 1) {
                return baseStr;  // a↑↑1 = a
            }

            // 使用循环计算迭代幂次
            let result = baseStr;  // a↑↑1 = a

            for (let i = 2; i <= indexNum; i++) {
                // a↑↑n = a^(a↑↑(n-1))
                const temp = result;
                result = this.ctx.Power({
                    Base: baseStr,
                    Exponent: temp
                });

                // 防止无限循环（安全限制）
                if (i > 100) {
                    return this.ctx._handleError(lang("KnuthArrowLoopLimitError"));
                }
            }

            return result;
        }

        /**
         * Reciprocal
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 输入数值的倒数.
         * 道理 {步骤}-
         *       1. 检查除数是否为零
         *       2. 计算1除以输入数值
         *       3. 返回计算结果
         */
        Reciprocal(args) {
            const numberStr = String(args.Number);
            const numberNum = parseFloat(numberStr);

            // 检查除数是否为零
            if (numberNum === 0) {
                switch (this.ctx.errorText) {
                    case 1:
                        return false;
                    case 2:
                        return Infinity;
                    case 3:
                        this.ctx.runtime.logSystem.show();
                        this.ctx.runtime.logSystem.error(lang("DivideByZeroError"));
                        return lang("DivideByZeroError");
                    default:
                        return "error";
                }
            }

            // 计算倒数：1 ÷ Number
            const result = this.ctx.Divide({
                Dividend: "1",
                Divisor: numberStr
            });

            return result;
        }

        /**
         * PositiveNumber
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 输入数值本身（正号表示）.
         * 道理 {步骤}-
         *       1. 确保返回的数值为正数形式
         *       2. 对于负数，返回其绝对值
         *       3. 对于正数，直接返回
         */
        PositiveNumber(args) {
            const numberStr = String(args.Number);

            // 解析数字的符号、整数和小数部分
            const { sign, integer, decimal } = this.ctx._parseNumber(numberStr);

            // 无论原始符号如何，都返回正数形式
            // 实际上就是取绝对值
            return this.ctx._formatResult(1, integer, decimal);
        }

        /**
         * DivideByTwo
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 输入数值除以2的结果.
         * 道理 {步骤}-
         *       1. 调用Divide方法，除数为2
         *       2. 返回计算结果
         */
        DivideByTwo(args) {
            const numberStr = String(args.Number);

            // 直接调用Divide方法
            const result = this.ctx.Divide({
                Dividend: numberStr,
                Divisor: "2"
            });

            return result;
        }

        StringToNumber(args) {
            try {
                const str = String(args.Text).trim();

                // 尝试解析为数字
                const num = parseFloat(str);
                if (!isNaN(num)) {
                    return num.toString();
                }

                // 尝试解析为复数
                if (str.includes('i')) {
                    const parsed = this.ctx._parseComplex(str);
                    if (parsed.imaginary === 0) {
                        return parsed.real.toString();
                    }
                }

                // 尝试解析为大整数
                if (/^-?\d+$/.test(str)) {
                    return str; // 已经是整数形式
                }

                return "0";
            } catch (error) {
                return this.ctx._handleError("NoNumber", "simple", true, args.Text);
            }
        }

        NumberToTypeString(args) {
            try {
                const numStr = String(args.Number);
                const type = args.Type;

                switch (type) {
                    case "bigint":
                        // 大整数：数字-小数部分
                        const { sign, integer, decimal } = this.ctx._parseNumber(numStr);
                        const signStr = sign === -1 ? "-" : "";
                        return `${signStr}${integer}`;

                    case "highprecision":
                        // 高精度：原版数字（科学计数法）
                        return parseFloat(numStr).toString();

                    case "imaginary":
                        // 虚数：实数i，数字转虚数（0i）
                        const num = parseFloat(numStr);
                        if (num === 0) return "0i";
                        if (num === 1) return "i";
                        if (num === -1) return "-i";
                        return `${num}i`;

                    case "complex":
                        // 复数：实数+实数i，数字转复数（数字+0i）
                        const complexNum = parseFloat(numStr);
                        if (complexNum === 0) return "0";
                        return `${complexNum}+0i`;

                    default:
                        return numStr;
                }
            } catch (error) {
                return this.ctx._handleError(lang("TypeStringToNumberError"));
            }
        }

        TypeStringToNumber(args) {
            try {
                const type = args.Type;
                const numStr = String(args.Number).trim();

                switch (type) {
                    case "bigint":
                        // 大整数转数字
                        return parseFloat(numStr).toString();

                    case "highprecision":
                        // 高精度数字已经是数字
                        return parseFloat(numStr).toString();

                    case "imaginary":
                        // 虚数转数字（取系数）
                        const imagCoefficient = this.ctx._parseImaginary(numStr);
                        return imagCoefficient.toString();

                    case "complex":
                        // 复数转数字（取实部）
                        const complex = this.ctx._parseComplex(numStr);
                        return complex.real.toString();

                    default:
                        return "0";
                }
            } catch (error) {
                return this.ctx._handleError(lang("TypeStringToNumberError"));
            }
        }

        GetNumberPart(args) {
            try {
                const numStr = String(args.Number);
                const partType = args.Type;

                const { sign, integer, decimal } = this.ctx._parseNumber(numStr);

                switch (partType) {
                    case "integer":
                        // 整数部分
                        return integer;

                    case "decimal":
                        // 小数部分
                        return decimal || "0";

                    case "sign":
                        // 符号部分：1 表示正，-1 表示负
                        return sign.toString();

                    default:
                        return "0";
                }
            } catch (error) {
                return this.ctx._handleError(lang("GetNumberPartError"));
            }
        }
    }

    // ===== TrigOps 三角函数 =====
    class TrigOps {
        constructor(ctx) { this.ctx = ctx; }

        /**
         * TrigFunction
         * 参数 {object} args - 包含menu和Number参数的对象
         * 返回 {string} - 三角函数值.
         * 道理 {步骤}-
         *       1.验证输入是否为数字
         *       2.调用优化的三角函数计算方法
         *       3.处理错误情况
         *       4.返回舍入到指定精度的结果
         */
        TrigFunction(args) {
            const angleStr = String(args.Number);
            const func = args.menu;

            if (isNaN(parseFloat(angleStr))) {
                return this.ctx._handleError(lang("NoNumber"));
            }

            let result;

            try {
                result = this.ctx._optimizedTrigCalculation(angleStr, func);

                if (typeof result === 'string' && result.startsWith('Error:')) {
                    return this.ctx._handleError(result);
                }
            } catch (error) {
                return this.ctx._handleError(lang("TrigDomainError"));
            }

            return this.ctx._roundToPrecision(result, this.ctx.decimal);
        }

        /**
         * ArctrigFunction
         * 参数 {object} args - 包含menu和Number参数的对象
         * 返回 {string} - 反三角函数值（角度）.
         * 道理 {步骤}-
         *       1.验证输入是否为数字
         *       2.调用反三角函数计算方法
         *       3.处理错误情况
         *       4.返回舍入到指定精度的结果
         */
        ArctrigFunction(args) {
            const valueStr = String(args.Number);
            const func = args.menu;

            if (isNaN(parseFloat(valueStr))) {
                return this.ctx._handleError(lang("NoNumber"));
            }

            let result;

            try {
                result = this.ctx._arctrigCalculation(valueStr, func);

                if (typeof result === 'string' && result.startsWith('Error:')) {
                    return this.ctx._handleError(result);
                }
            } catch (error) {
                return this.ctx._handleError(lang("ArctrigDomainError"));
            }

            return this.ctx._roundToPrecision(result, this.ctx.decimal);
        }

        /**
         * Atan2
         * 参数 {object} args - 包含x和y参数的对象
         * 返回 {string} - 从x轴到点(x,y)的角度（角度制）.
         * 道理 {步骤}-
         *       1.检查x和y是否都为0（无定义）
         *       2.计算弧度的atan2(y, x)
         *       3.转换为角度并调整到-180°到180°范围
         *       4.返回舍入到指定精度的结果
         */
        Atan2(args) {
            const x = parseFloat(args.x);
            const y = parseFloat(args.y);

            if (x === 0 && y === 0) {
                return this.ctx._handleError(lang("Atan2XYisZeroError"));
            }

            // 计算基础角度（弧度）
            const rad = Math.atan2(y, x);
            // 转换为角度（-180° 到 180°）
            let deg = rad * (180 / Math.PI);

            // 确保角度在 [0, 360) 范围内（可选，根据需求调整）
            if (deg < 0) deg += 360;

            return this.ctx._roundToPrecision(deg.toString(), this.ctx.decimal);
        }

        /**
         * 弧度制三角函数计算
         */
        TrigRadFunction(args) {
            const radStr = String(args.Radians);
            const func = args.menu;

            if (isNaN(parseFloat(radStr))) {
                return this.ctx._handleError(lang("NoNumber"));
            }

            let result;

            try {
                result = this.ctx._radTrigCalculation(radStr, func);

                if (typeof result === 'string' && result.startsWith('Error:')) {
                    return this.ctx._handleError(result);
                }
            } catch (error) {
                return this.ctx._handleError(lang("TrigDomainError"));
            }

            return this.ctx._roundToPrecision(result, this.ctx.decimal);
        }

        /**
         * 弧度制反三角函数计算
         */
        ArctrigRadFunction(args) {
            const valueStr = String(args.Radians);
            const func = args.menu;

            if (isNaN(parseFloat(valueStr))) {
                return this.ctx._handleError(lang("NoNumber"));
            }

            let result;

            try {
                result = this.ctx._radArctrigCalculation(valueStr, func);

                if (typeof result === 'string' && result.startsWith('Error:')) {
                    return this.ctx._handleError(result);
                }
            } catch (error) {
                return this.ctx._handleError(lang("ArctrigDomainError"));
            }

            return this.ctx._roundToPrecision(result, this.ctx.decimal);
        }

        /**
         * 双曲函数计算
         */
        HyperbolicFunction(args) {
            const radStr = String(args.Radians);
            const func = args.menu;

            if (isNaN(parseFloat(radStr))) {
                return this.ctx._handleError(lang("NoNumber"));
            }

            let result;

            try {
                result = this.ctx._hyperbolicCalculation(radStr, func);

                if (typeof result === 'string' && result.startsWith('Error:')) {
                    return this.ctx._handleError(result);
                }
            } catch (error) {
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }

            return this.ctx._roundToPrecision(result, this.ctx.decimal);
        }

        /**
         * 反双曲函数计算
         */
        AhyperbolicFunction(args) {
            const valueStr = String(args.Radians);
            const func = args.menu;

            if (isNaN(parseFloat(valueStr))) {
                return this.ctx._handleError(lang("NoNumber"));
            }

            let result;

            try {
                result = this.ctx._ahyperbolicCalculation(valueStr, func);

                if (typeof result === 'string' && result.startsWith('Error:')) {
                    return this.ctx._handleError(result);
                }
            } catch (error) {
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }

            return this.ctx._roundToPrecision(result, this.ctx.decimal);
        }
    }

    // ===== RepeatingDecimalOps 循环小数 =====
    class RepeatingDecimalOps {
        constructor(ctx) { this.ctx = ctx; }

        /**
         * RepeatingDecimal
         * 参数 {object} args - 包含decimal和cycle参数的对象
         * 返回 {string} - 循环小数表示形式.
         * 道理 {步骤}-
         *       1.验证循环节是否有效（至少包含一个数字）
         *       2.解析输入小数，获取整数部分和小数部分
         *       3.检查小数部分是否有效（至少一个数字）
         *       4.格式化输出：整数部分.小数部分{循环节}
         *       5.处理特殊情况：如果小数部分为空，需要添加至少一个数字
         */
        RepeatingDecimal(args) {
            const decimalStr = String(args.decimal);
            const cycleStr = String(args.cycle);

            // 验证循环节是否有效
            if (!cycleStr || cycleStr.trim() === '' || !/^\d+$/.test(cycleStr)) {
                return this.ctx._handleError(lang("RepeatingDecimalError"));
            }

            // 解析小数
            const { sign, integer, decimal } = this.ctx._parseNumber(decimalStr);

            // 检查小数部分是否有效
            if (decimal === '') {
                // 如果没有小数部分，使用"0"作为小数部分
                const formattedSign = sign === -1 ? '-' : '';
                const formattedInt = integer.replace(/^0+/, '') || '0';
                return `${formattedSign}${formattedInt}.0{${cycleStr}}`;
            }

            // 格式化整数部分
            const formattedSign = sign === -1 ? '-' : '';
            const formattedInt = integer.replace(/^0+/, '') || '0';

            // 构建循环小数表示
            return `${formattedSign}${formattedInt}.${decimal}{${cycleStr}}`;
        }

        /**
         * ExtractCycle (增强版)
         * 参数 {object} args - 包含decimal参数的对象
         * 返回 {string} - 循环节或0.
         * 道理 {步骤}-
         *       1.检查输入字符串是否包含花括号{}
         *       2.使用正则表达式提取花括号内的数字内容
         *       3.如果找到循环节且只包含数字，返回循环节
         *       4.如果未找到循环节或包含非数字字符，返回"0"
         */
        ExtractCycle(args) {
            const decimalStr = String(args.decimal);

            // 如果输入为空或不是字符串，返回0
            if (!decimalStr || typeof decimalStr !== 'string') {
                return "0";
            }

            // 使用正则表达式提取花括号内的数字内容
            // 只匹配数字，确保循环节只包含数字
            const regex = /\{(\d+)\}/;
            const match = decimalStr.match(regex);

            if (match && match[1]) {
                // 返回循环节内容（只包含数字）
                return match[1];
            } else {
                // 没有找到有效的循环节（可能没有花括号或花括号内不是纯数字）
                return "0";
            }
        }

        /**
        * RepeatingDecimalAdd
        * 循环小数加法
        */
        RepeatingDecimalAdd(args) {
            try {
                const decimal1 = String(args.Addend1);
                const decimal2 = String(args.Addend2);

                // 将循环小数转换为分数
                const fraction1 = this.ctx._repeatingDecimalToFraction(decimal1);
                const fraction2 = this.ctx._repeatingDecimalToFraction(decimal2);

                // 对分数进行加法运算
                const resultFraction = this.ctx._operateFractions(fraction1, fraction2, 'add');

                // 将分数转换回循环小数
                const result = this.ctx._fractionToRepeatingDecimal(resultFraction);

                return this.ctx._normalizeRepeatingDecimal(result);
            } catch (error) {
                return this.ctx._handleError(lang("RepeatingDecimalConvertError"));
            }
        }

        /**
         * RepeatingDecimalSubtract
         * 循环小数减法
         */
        RepeatingDecimalSubtract(args) {
            try {
                const decimal1 = String(args.Minuend);
                const decimal2 = String(args.Subtrahend);

                // 将循环小数转换为分数
                const fraction1 = this.ctx._repeatingDecimalToFraction(decimal1);
                const fraction2 = this.ctx._repeatingDecimalToFraction(decimal2);

                // 对分数进行减法运算
                const resultFraction = this.ctx._operateFractions(fraction1, fraction2, 'subtract');

                // 将分数转换回循环小数
                const result = this.ctx._fractionToRepeatingDecimal(resultFraction);

                return this.ctx._normalizeRepeatingDecimal(result);
            } catch (error) {
                return this.ctx._handleError(lang("RepeatingDecimalConvertError"));
            }
        }

        /**
         * RepeatingDecimalMultiply
         * 循环小数乘法
         */
        RepeatingDecimalMultiply(args) {
            try {
                const decimal1 = String(args.Multiplier1);
                const decimal2 = String(args.Multiplier2);

                // 将循环小数转换为分数
                const fraction1 = this.ctx._repeatingDecimalToFraction(decimal1);
                const fraction2 = this.ctx._repeatingDecimalToFraction(decimal2);

                // 对分数进行乘法运算
                const resultFraction = this.ctx._operateFractions(fraction1, fraction2, 'multiply');

                // 将分数转换回循环小数
                const result = this.ctx._fractionToRepeatingDecimal(resultFraction);

                return this.ctx._normalizeRepeatingDecimal(result);
            } catch (error) {
                return this.ctx._handleError(lang("RepeatingDecimalConvertError"));
            }
        }

        /**
         * RepeatingDecimalDivide
         * 循环小数除法
         */
        RepeatingDecimalDivide(args) {
            try {
                const decimal1 = String(args.Dividend);
                const decimal2 = String(args.Divisor);

                // 将循环小数转换为分数
                const fraction1 = this.ctx._repeatingDecimalToFraction(decimal1);
                const fraction2 = this.ctx._repeatingDecimalToFraction(decimal2);

                // 检查除数是否为0
                const parts2 = fraction2.split('/');
                const num2 = parseInt(parts2[0], 10);
                if (num2 === 0) {
                    return this.ctx._handleError(lang("DivideByZeroError"));
                }

                // 对分数进行除法运算
                const resultFraction = this.ctx._operateFractions(fraction1, fraction2, 'divide');

                // 将分数转换回循环小数
                const result = this.ctx._fractionToRepeatingDecimal(resultFraction);

                return this.ctx._normalizeRepeatingDecimal(result);
            } catch (error) {
                return this.ctx._handleError(lang("RepeatingDecimalConvertError"));
            }
        }

        /**
         * RepeatingDecimalToFraction
         * 循环小数转分数
         */
        RepeatingDecimalToFraction(args) {
            try {
                const decimal = String(args.decimal);
                return this.ctx._repeatingDecimalToFraction(decimal);
            } catch (error) {
                return this.ctx._handleError(lang("RepeatingDecimalConvertError"));
            }
        }

        /**
         * FractionToRepeatingDecimal
         * 分数转循环小数
         */
        FractionToRepeatingDecimal(args) {
            try {
                const fraction = String(args.fraction);
                return this.ctx._fractionToRepeatingDecimal(fraction);
            } catch (error) {
                return this.ctx._handleError(lang("RepeatingDecimalConvertError"));
            }
        }

        /**
         * RepeatingDecimalToFixed
         * 将循环小数转换为指定精度的有限小数
         * 使用this.decimal作为精度设置
         */
        RepeatingDecimalToFixed(args) {
            try {
                const decimalStr = String(args.decimal);

                // 解析循环小数
                const parsed = this.ctx._parseRepeatingDecimal(decimalStr);

                if (!parsed.isRepeating) {
                    // 有限小数或整数，直接格式化到指定精度
                    return this.ctx._formatToPrecision(decimalStr, this.ctx.decimal);
                }

                // 处理循环小数
                const integerPart = parsed.integerPart;
                const nonRepeatingPart = parsed.nonRepeatingPart;
                const cyclePart = parsed.cyclePart;
                const sign = parsed.sign;

                // 计算需要的小数位数
                const targetPrecision = Math.max(0, this.ctx.decimal);

                // 如果不需要小数部分，直接返回整数
                if (targetPrecision === 0) {
                    const signStr = sign === -1 ? '-' : '';
                    return `${signStr}${integerPart}`;
                }

                // 构建小数部分
                let decimalDigits = '';

                // 添加非循环部分
                decimalDigits += nonRepeatingPart;

                // 如果已经达到或超过目标精度，截断
                if (decimalDigits.length >= targetPrecision) {
                    decimalDigits = decimalDigits.substring(0, targetPrecision);
                    const signStr = sign === -1 ? '-' : '';
                    return `${signStr}${integerPart}.${decimalDigits}`;
                }

                // 需要添加循环节部分
                const remainingDigits = targetPrecision - decimalDigits.length;

                // 计算需要重复多少次循环节
                const cycleLength = cyclePart.length;
                const fullCycles = Math.floor(remainingDigits / cycleLength);
                const partialCycle = remainingDigits % cycleLength;

                // 添加完整的循环节
                for (let i = 0; i < fullCycles; i++) {
                    decimalDigits += cyclePart;
                }

                // 添加部分循环节
                if (partialCycle > 0) {
                    decimalDigits += cyclePart.substring(0, partialCycle);
                }

                // 确保小数位数准确
                if (decimalDigits.length > targetPrecision) {
                    decimalDigits = decimalDigits.substring(0, targetPrecision);
                }

                // 构建结果
                const signStr = sign === -1 ? '-' : '';
                const formattedInteger = integerPart.replace(/^0+/, '') || '0';

                return `${signStr}${formattedInteger}.${decimalDigits}`;

            } catch (error) {
                console.error(lang("RecurringDecimalToFractionError").replace("{error}", error));
                return this.ctx._handleError(lang("RepeatingDecimalConvertError"));
            }
        }
    }

    // ===== FractionOps 分数 =====
    class FractionOps {
        constructor(ctx) { this.ctx = ctx; }

        /**
         * SimplifyFraction
         * 简化分数积木的实现
         */
        SimplifyFraction(args) {
            try {
                const fractionStr = String(args.Fraction);
                const fractionObj = this.ctx._parseFraction(fractionStr);

                // 简化分数
                const simplified = this.ctx._formatFraction(fractionObj, false);
                return simplified;
            } catch (error) {
                if (error.message === lang("FractionParseError") ||
                    error.message === lang("FractionZeroDenominatorError")) {
                    return this.ctx._handleError(error.message);
                }
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * MultiplySameFraction
         * 分数同时乘一个数积木的实现 - 分子分母同时乘以同一个数，不进行简化
         */
        MultiplySameFraction(args) {
            try {
                const fractionStr = String(args.Fraction);
                const multiplierStr = String(args.Multiplier);

                // 解析分数
                const fractionObj = this.ctx._parseFraction(fractionStr);

                // 将乘数转换为数字
                const multiplier = parseFloat(multiplierStr);
                if (isNaN(multiplier)) {
                    return this.ctx._handleError(lang("NoNumber"));
                }

                // 检查乘数是否为0
                if (multiplier === 0) {
                    return this.ctx._handleError(lang("FractionZeroDenominatorError"));
                }

                // 分子分母同时乘以乘数（保持精确计算）
                const newNumerator = fractionObj.numerator * multiplier;
                const newDenominator = fractionObj.denominator * multiplier;

                // 确保分母不为0
                if (newDenominator === 0) {
                    return this.ctx._handleError(lang("FractionZeroDenominatorError"));
                }

                // 处理符号：让分母为正，负号放到分子
                let finalNumerator = newNumerator;
                let finalDenominator = newDenominator;

                if (finalDenominator < 0) {
                    finalNumerator = -finalNumerator;
                    finalDenominator = -finalDenominator;
                }

                // 直接构建分数字符串，不进行简化
                // 如果结果是整数（分母为1），直接返回整数
                if (finalDenominator === 1) {
                    return finalNumerator.toString();
                }

                // 返回分数形式，保持乘以后的结果
                return `${finalNumerator}/${finalDenominator}`;
            } catch (error) {
                if (error.message === lang("FractionParseError") ||
                    error.message === lang("FractionZeroDenominatorError")) {
                    return this.ctx._handleError(error.message);
                }
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * ToMixedNumber
         * 转换为带分数积木的实现
         */
        ToMixedNumber(args) {
            try {
                const fractionStr = String(args.Fraction);
                const fractionObj = this.ctx._parseFraction(fractionStr);

                // 检查是否为假分数（分子大于等于分母）
                if (Math.abs(fractionObj.numerator) < fractionObj.denominator) {
                    // 已经是真分数，直接返回
                    return this.ctx._formatFraction(fractionObj, false);
                }

                // 格式化为带分数
                const mixedNumber = this.ctx._formatFraction(fractionObj, true);
                return mixedNumber;
            } catch (error) {
                if (error.message === lang("FractionParseError") ||
                    error.message === lang("FractionZeroDenominatorError")) {
                    return this.ctx._handleError(error.message);
                }
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * ToImproperFraction
         * 转换为假分数积木的实现
         */
        ToImproperFraction(args) {
            try {
                const fractionStr = String(args.Fraction);
                const fractionObj = this.ctx._parseFraction(fractionStr);

                // 如果已经是假分数格式，直接返回简化后的版本
                const improperFraction = this.ctx._formatFraction(fractionObj, false);
                return improperFraction;
            } catch (error) {
                if (error.message === lang("FractionParseError") ||
                    error.message === lang("FractionZeroDenominatorError")) {
                    return this.ctx._handleError(error.message);
                }
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * AddFraction
         * 分数加法积木的实现（支持整数/小数）
         */
        AddFraction(args) {
            try {
                const input1 = args.Addend1;
                const input2 = args.Addend2;

                // 转换为分数对象
                const fraction1Obj = this.ctx._convertToFractionObj(input1);
                const fraction2Obj = this.ctx._convertToFractionObj(input2);

                // 通分：计算最小公分母
                const denominator1 = fraction1Obj.denominator;
                const denominator2 = fraction2Obj.denominator;

                // 计算最小公倍数作为公分母
                const lcm = (denominator1 * denominator2) / this.ctx._gcd(denominator1, denominator2);

                // 计算通分后的分子
                const sign1 = fraction1Obj.numerator < 0 ? -1 : 1;
                const sign2 = fraction2Obj.numerator < 0 ? -1 : 1;
                const numerator1 = sign1 * Math.abs(fraction1Obj.numerator) * (lcm / denominator1);
                const numerator2 = sign2 * Math.abs(fraction2Obj.numerator) * (lcm / denominator2);

                // 计算和
                const newNumerator = numerator1 + numerator2;

                // 创建新的分数对象
                const newFractionObj = {
                    sign: newNumerator < 0 ? -1 : 1,
                    integer: 0,
                    numerator: Math.abs(newNumerator),
                    denominator: lcm,
                    isMixed: false
                };

                // 简化并格式化结果
                const result = this.ctx._formatFraction(newFractionObj, false);
                return result;
            } catch (error) {
                if (error.message === lang("FractionParseError") ||
                    error.message === lang("FractionZeroDenominatorError")) {
                    return this.ctx._handleError(error.message);
                }
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * SubtractFraction
         * 分数减法积木的实现（支持整数/小数）
         */
        SubtractFraction(args) {
            try {
                const input1 = args.Minuend;
                const input2 = args.Subtrahend;

                // 转换为分数对象
                const fraction1Obj = this.ctx._convertToFractionObj(input1);
                const fraction2Obj = this.ctx._convertToFractionObj(input2);

                // 通分：计算最小公分母
                const denominator1 = fraction1Obj.denominator;
                const denominator2 = fraction2Obj.denominator;

                // 计算最小公倍数作为公分母
                const lcm = (denominator1 * denominator2) / this.ctx._gcd(denominator1, denominator2);

                // 计算通分后的分子
                const sign1 = fraction1Obj.numerator < 0 ? -1 : 1;
                const sign2 = fraction2Obj.numerator < 0 ? -1 : 1;
                const numerator1 = sign1 * Math.abs(fraction1Obj.numerator) * (lcm / denominator1);
                const numerator2 = sign2 * Math.abs(fraction2Obj.numerator) * (lcm / denominator2);

                // 计算差
                const newNumerator = numerator1 - numerator2;

                // 创建新的分数对象
                const newFractionObj = {
                    sign: newNumerator < 0 ? -1 : 1,
                    integer: 0,
                    numerator: Math.abs(newNumerator),
                    denominator: lcm,
                    isMixed: false
                };

                // 简化并格式化结果
                const result = this.ctx._formatFraction(newFractionObj, false);
                return result;
            } catch (error) {
                if (error.message === lang("FractionParseError") ||
                    error.message === lang("FractionZeroDenominatorError")) {
                    return this.ctx._handleError(error.message);
                }
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * MultiplyFraction
         * 分数乘法积木的实现（支持整数/小数）
         */
        MultiplyFraction(args) {
            try {
                const input1 = args.Multiplier1;
                const input2 = args.Multiplier2;

                // 转换为分数对象
                const fraction1Obj = this.ctx._convertToFractionObj(input1);
                const fraction2Obj = this.ctx._convertToFractionObj(input2);

                // 分子相乘，分母相乘
                const sign1 = fraction1Obj.numerator < 0 ? -1 : 1;
                const sign2 = fraction2Obj.numerator < 0 ? -1 : 1;
                const newNumerator = Math.abs(fraction1Obj.numerator) * Math.abs(fraction2Obj.numerator) * sign1 * sign2;
                const newDenominator = fraction1Obj.denominator * fraction2Obj.denominator;

                // 创建新的分数对象
                const newFractionObj = {
                    sign: newNumerator < 0 ? -1 : 1,
                    integer: 0,
                    numerator: Math.abs(newNumerator),
                    denominator: Math.abs(newDenominator),
                    isMixed: false
                };

                // 简化并格式化结果
                const result = this.ctx._formatFraction(newFractionObj, false);
                return result;
            } catch (error) {
                if (error.message === lang("FractionParseError") ||
                    error.message === lang("FractionZeroDenominatorError")) {
                    return this.ctx._handleError(error.message);
                }
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * DivideFraction
         * 分数除法积木的实现（支持整数/小数）
         */
        DivideFraction(args) {
            try {
                const input1 = args.Dividend;
                const input2 = args.Divisor;

                // 转换为分数对象
                const fraction1Obj = this.ctx._convertToFractionObj(input1);
                const fraction2Obj = this.ctx._convertToFractionObj(input2);

                // 检查除数是否为0
                if (fraction2Obj.numerator === 0) {
                    return this.ctx._handleError(lang("DivideByZeroError"));
                }

                // 除法转换为乘法：乘以倒数
                const sign1 = fraction1Obj.numerator < 0 ? -1 : 1;
                const sign2 = fraction2Obj.numerator < 0 ? -1 : 1;
                const newNumerator = Math.abs(fraction1Obj.numerator) * fraction2Obj.denominator * sign1 * sign2;
                const newDenominator = fraction1Obj.denominator * Math.abs(fraction2Obj.numerator);

                // 创建新的分数对象
                const newFractionObj = {
                    sign: newNumerator < 0 ? -1 : 1,
                    integer: 0,
                    numerator: Math.abs(newNumerator),
                    denominator: Math.abs(newDenominator),
                    isMixed: false
                };

                // 简化并格式化结果
                const result = this.ctx._formatFraction(newFractionObj, false);
                return result;
            } catch (error) {
                if (error.message === lang("FractionParseError") ||
                    error.message === lang("FractionZeroDenominatorError")) {
                    return this.ctx._handleError(error.message);
                }
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * FractionPart积木实现
         * 获取分数的分子或分母
         */
        FractionPart(args) {
            try {
                const fractionStr = String(args.Fraction);
                const partType = args.Part;

                const result = this.ctx._getFractionPart(fractionStr, partType);
                return result;
            } catch (error) {
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * CreateFraction积木实现
         * 根据分子和分母创建分数
         */
        CreateFraction(args) {
            try {
                const numeratorStr = String(args.Numerator);
                const denominatorStr = String(args.Denominator);

                const result = this.ctx._createFraction(numeratorStr, denominatorStr);
                return result;
            } catch (error) {
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }
    }

    // ===== BigNumberOps 大整数 =====
    class BigNumberOps {
        constructor(ctx) { this.ctx = ctx; }

        BigAdd(args) {
            try {
                const num1 = String(args.Num1);
                const num2 = String(args.Num2);

                // 验证输入
                if (!this.ctx._validateBigNumber(num1) || !this.ctx._validateBigNumber(num2)) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                const result = this.ctx._bigIntegerAdd(num1, num2);
                return result;
            } catch (error) {
                return this.ctx._handleError(error.message || lang("UndefinedErrorText"));
            }
        }

        BigSubtract(args) {
            try {
                const num1 = String(args.Num1);
                const num2 = String(args.Num2);

                // 验证输入
                if (!this.ctx._validateBigNumber(num1) || !this.ctx._validateBigNumber(num2)) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                const result = this.ctx._bigIntegerSubtract(num1, num2);
                return result;
            } catch (error) {
                return this.ctx._handleError(error.message || lang("UndefinedErrorText"));
            }
        }

        BigMultiply(args) {
            try {
                const num1 = String(args.Num1);
                const num2 = String(args.Num2);

                // 验证输入
                if (!this.ctx._validateBigNumber(num1) || !this.ctx._validateBigNumber(num2)) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                const result = this.ctx._bigIntegerMultiply(num1, num2);
                return result;
            } catch (error) {
                return this.ctx._handleError(error.message || lang("UndefinedErrorText"));
            }
        }

        BigDivide(args) {
            try {
                const dividend = String(args.Dividend);
                const divisor = String(args.Divisor);

                // 验证输入
                if (!this.ctx._validateBigNumber(dividend) || !this.ctx._validateBigNumber(divisor)) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                const divisionResult = this.ctx._bigIntegerDivide(dividend, divisor);
                return divisionResult.quotient;
            } catch (error) {
                if (error.message === lang("DivideByZeroError")) {
                    return this.ctx._handleError(lang("DivideByZeroError"));
                }
                return this.ctx._handleError(error.message || lang("UndefinedErrorText"));
            }
        }

        BigMod(args) {
            try {
                const dividend = String(args.Dividend);
                const divisor = String(args.Divisor);

                // 验证输入
                if (!this.ctx._validateBigNumber(dividend) || !this.ctx._validateBigNumber(divisor)) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                const divisionResult = this.ctx._bigIntegerDivide(dividend, divisor);
                return divisionResult.remainder;
            } catch (error) {
                if (error.message === lang("DivideByZeroError")) {
                    return this.ctx._handleError(lang("DivideByZeroError"));
                }
                return this.ctx._handleError(error.message || lang("UndefinedErrorText"));
            }
        }

        BigQuotient(args) {
            try {
                const dividend = String(args.Dividend);
                const divisor = String(args.Divisor);

                // 验证输入
                if (!this.ctx._validateBigNumber(dividend) || !this.ctx._validateBigNumber(divisor)) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                const divisionResult = this.ctx._bigIntegerDivide(dividend, divisor);
                return divisionResult.quotient;
            } catch (error) {
                if (error.message === lang("DivideByZeroError")) {
                    return this.ctx._handleError(lang("DivideByZeroError"));
                }
                return this.ctx._handleError(error.message || lang("UndefinedErrorText"));
            }
        }

        BigAbsolute(args) {
            try {
                const num = String(args.Num);

                // 验证输入
                if (!this.ctx._validateBigNumber(num)) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                const result = this.ctx._bigIntegerAbsolute(num);
                return result;
            } catch (error) {
                return this.ctx._handleError(error.message || lang("UndefinedErrorText"));
            }
        }

        BigNegative(args) {
            try {
                const num = String(args.Num);

                // 验证输入
                if (!this.ctx._validateBigNumber(num)) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                const result = this.ctx._bigIntegerNegative(num);
                return result;
            } catch (error) {
                return this.ctx._handleError(error.message || lang("UndefinedErrorText"));
            }
        }

        BigPow(args) {
            try {
                const base = String(args.Base);
                const exponent = String(args.Exponent);

                // 验证输入
                if (!this.ctx._validateBigNumber(base) || !this.ctx._validateBigNumber(exponent)) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                // 验证指数为非负整数
                if (exponent.startsWith('-')) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                const result = this.ctx._bigIntegerPow(base, exponent);
                return result;
            } catch (error) {
                return this.ctx._handleError(error.message || lang("UndefinedErrorText"));
            }
        }

        BigPowMod(args) {
            try {
                const base = String(args.Base);
                const exponent = String(args.Exponent);
                const mod = String(args.Mod);

                // 验证输入
                if (!this.ctx._validateBigNumber(base) || !this.ctx._validateBigNumber(exponent) || !this.ctx._validateBigNumber(mod)) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                // 验证指数为非负整数
                if (exponent.startsWith('-')) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                const result = this.ctx._bigIntegerPowMod(base, exponent, mod);
                return result;
            } catch (error) {
                if (error.message.includes("模数不能为0")) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }
                return this.ctx._handleError(error.message || lang("UndefinedErrorText"));
            }
        }

        BigRoot(args) {
            try {
                const rootIndex = String(args.RootIndex);
                const radicand = String(args.Radicand);

                // 验证输入
                if (!this.ctx._validateBigNumber(rootIndex) || !this.ctx._validateBigNumber(radicand)) {
                    return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                const result = this.ctx._bigIntegerRoot(rootIndex, radicand);
                return result;
            } catch (error) {
                if (error.message.includes("不能为负数") || error.message.includes("不能为0")) {
                    return this.ctx._handleError(error.message);
                }
                return this.ctx._handleError(error.message || lang("UndefinedErrorText"));
            }
        }
    }

    // ===== ImaginaryOps 虚数 =====
    class ImaginaryOps {
        constructor(ctx) { this.ctx = ctx; }

        /**
         * CreateImaginary积木实现
         * 创建虚数
         */
        CreateImaginary(args) {
            try {
                const coefficient = parseFloat(String(args.Number));

                if (isNaN(coefficient)) {
                    return this.ctx._handleError(lang("NoNumber"));
                }

                return this.ctx._formatImaginary(coefficient);
            } catch (error) {
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * GetImaginaryPart积木实现
         * 获取虚数的系数部分
         */
        GetImaginaryPart(args) {
            try {
                const imaginaryStr = String(args.Imaginary);
                const coefficient = this.ctx._parseImaginary(imaginaryStr);

                return coefficient.toString();
            } catch (error) {
                if (error.message === lang("ImaginaryParseError")) {
                    return this.ctx._handleError(lang("ImaginaryParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ImaginaryAdd积木实现 - 高精度虚数加法
         */
        ImaginaryAdd(args) {
            try {
                // 获取原始字符串输入
                const a1 = String(args.Addend1);
                const a2 = String(args.Addend2);

                // 解析系数（返回数字，仅用于格式验证，实际运算用字符串）
                const coeff1 = this.ctx._parseImaginary(a1);
                const coeff2 = this.ctx._parseImaginary(a2);

                // 高精度加法
                const sum = this.ctx.Add({ Addend1: coeff1.toString(), Addend2: coeff2.toString() });
                return this.ctx._formatImaginary(parseFloat(sum));
            } catch (error) {
                if (error.message === lang("ImaginaryParseError")) {
                    return this.ctx._handleError(lang("ImaginaryParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ImaginarySubtract积木实现 - 高精度虚数减法
         */
        ImaginarySubtract(args) {
            try {
                const a1 = String(args.Minuend);
                const a2 = String(args.Subtrahend);

                const coeff1 = this.ctx._parseImaginary(a1);
                const coeff2 = this.ctx._parseImaginary(a2);

                const diff = this.ctx.Subtract({ Minuend: coeff1.toString(), Subtrahend: coeff2.toString() });
                return this.ctx._formatImaginary(parseFloat(diff));
            } catch (error) {
                if (error.message === lang("ImaginaryParseError")) {
                    return this.ctx._handleError(lang("ImaginaryParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ImaginaryMultiply积木实现 - 高精度虚数乘法
         * (a i) × (b i) = -a × b
         */
        ImaginaryMultiply(args) {
            try {
                const a1 = String(args.Multiplier1);
                const a2 = String(args.Multiplier2);

                const coeff1 = this.ctx._parseImaginary(a1);
                const coeff2 = this.ctx._parseImaginary(a2);

                // 乘积 = -coeff1 * coeff2
                const productAbs = this.ctx.Multiply({ Multiplier1: coeff1.toString(), Multiplier2: coeff2.toString() });
                const product = this.ctx.Multiply({ Multiplier1: productAbs, Multiplier2: "-1" });
                return product; // 纯实数
            } catch (error) {
                if (error.message === lang("ImaginaryParseError")) {
                    return this.ctx._handleError(lang("ImaginaryParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ImaginaryDivide积木实现 - 高精度虚数除法
         * (a i) ÷ (b i) = a ÷ b
         */
        ImaginaryDivide(args) {
            try {
                const dividendStr = String(args.Dividend);
                const divisorStr = String(args.Divisor);

                const coeffDividend = this.ctx._parseImaginary(dividendStr);
                const coeffDivisor = this.ctx._parseImaginary(divisorStr);

                if (coeffDivisor === 0) {
                    return this.ctx._handleError(lang("ImaginaryDivideByZeroError"));
                }

                const quotient = this.ctx.Divide({ Dividend: coeffDividend.toString(), Divisor: coeffDivisor.toString() });
                return quotient; // 纯实数
            } catch (error) {
                if (error.message === lang("ImaginaryParseError")) {
                    return this.ctx._handleError(lang("ImaginaryParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ImaginaryMod积木实现 - 高精度虚数取余
         * 余数定义：余数 = a % b （a、b为虚数系数）
         */
        ImaginaryMod(args) {
            try {
                const dividendStr = String(args.Dividend);
                const divisorStr = String(args.Divisor);

                const coeffDividend = this.ctx._parseImaginary(dividendStr);
                const coeffDivisor = this.ctx._parseImaginary(divisorStr);

                if (coeffDivisor === 0) {
                    return this.ctx._handleError(lang("ImaginaryDivideByZeroError"));
                }

                const remainder = this.ctx.Mod({ Dividend: coeffDividend.toString(), Divisor: coeffDivisor.toString() });
                return this.ctx._formatImaginary(parseFloat(remainder));
            } catch (error) {
                if (error.message === lang("ImaginaryParseError")) {
                    return this.ctx._handleError(lang("ImaginaryParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ImaginaryQuo积木实现 - 高精度虚数求商
         * 商定义：floor(a / b) （a、b为虚数系数）
         */
        ImaginaryQuo(args) {
            try {
                const dividendStr = String(args.Dividend);
                const divisorStr = String(args.Divisor);

                const coeffDividend = this.ctx._parseImaginary(dividendStr);
                const coeffDivisor = this.ctx._parseImaginary(divisorStr);

                if (coeffDivisor === 0) {
                    return this.ctx._handleError(lang("ImaginaryDivideByZeroError"));
                }

                // 使用高精度除法得到精确商，然后向下取整
                const exactQuotient = this.ctx.Divide({ Dividend: coeffDividend.toString(), Divisor: coeffDivisor.toString() });
                const floorQuotient = this.ctx._floorNumber(exactQuotient);
                return this.ctx._formatImaginary(parseFloat(floorQuotient));
            } catch (error) {
                if (error.message === lang("ImaginaryParseError")) {
                    return this.ctx._handleError(lang("ImaginaryParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ImaginaryPower积木实现 - 高精度虚数幂运算
         * 返回复数（可能为实数或纯虚数）
         */
        ImaginaryPower(args) {
            try {
                const baseStr = String(args.Base);
                const exponent = parseFloat(args.Index);

                if (!Number.isInteger(exponent)) {
                    return this.ctx._handleError("指数必须为整数");
                }

                const coefficient = this.ctx._parseImaginary(baseStr);
                const expAbs = Math.abs(exponent);

                // 高精度计算系数的幂
                let coeffPow = "1";
                for (let i = 0; i < expAbs; i++) {
                    coeffPow = this.ctx.Multiply({ Multiplier1: coeffPow, Multiplier2: coefficient.toString() });
                }

                // 处理 i 的周期性
                const cycle = this.ctx.CycleInRange({ Number: expAbs.toString(), Min: "0", Max: "3" });
                let real = "0", imag = "0";

                // 符号处理：如果原系数为负且指数为奇数，整体取负
                const sign = (coefficient < 0 && expAbs % 2 === 1) ? -1 : 1;
                const signedCoeffPow = this.ctx.Multiply({ Multiplier1: coeffPow, Multiplier2: sign.toString() });

                switch (cycle) {
                    case 0:
                        real = signedCoeffPow;
                        break;
                    case 1:
                        imag = signedCoeffPow;
                        break;
                    case 2:
                        real = this.ctx.Multiply({ Multiplier1: signedCoeffPow, Multiplier2: "-1" });
                        break;
                    case 3:
                        imag = this.ctx.Multiply({ Multiplier1: signedCoeffPow, Multiplier2: "-1" });
                        break;
                }

                // 处理负指数
                if (exponent < 0) {
                    // 结果取倒数（仅当结果非零）
                    if (real !== "0" || imag !== "0") {
                        const denominator = this.ctx.Add({
                            Addend1: this.ctx.Multiply({ Multiplier1: real, Multiplier2: real }),
                            Addend2: this.ctx.Multiply({ Multiplier1: imag, Multiplier2: imag })
                        });
                        real = this.ctx.Divide({ Dividend: real, Divisor: denominator });
                        imag = this.ctx.Divide({ Dividend: this.ctx.Multiply({ Multiplier1: imag, Multiplier2: "-1" }), Divisor: denominator });
                    } else {
                        return this.ctx._handleError("零的负指数幂无意义");
                    }
                }

                return this.ctx._formatComplex(parseFloat(real), parseFloat(imag));
            } catch (error) {
                if (error.message === lang("ImaginaryParseError")) {
                    return this.ctx._handleError(lang("ImaginaryParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ImaginaryRoot积木实现 - 高精度虚数开根
         * 返回复数（主值）
         */
        ImaginaryRoot(args) {
            try {
                const baseStr = String(args.Base);
                const rootIndex = parseFloat(args.RootIndex);

                if (rootIndex <= 0 || !Number.isInteger(rootIndex)) {
                    return this.ctx._handleError(lang("ImaginaryRootIndexError"));
                }

                const coefficient = this.ctx._parseImaginary(baseStr);

                // 处理特殊情况
                if (coefficient === 0) {
                    return "0";
                }

                if (rootIndex === 1) {
                    return this.ctx._formatImaginary(coefficient);
                }

                // 纯虚数开根 = sqrt(r) * (cos(θ/2) + i sin(θ/2))
                // 其中 r = |coefficient|, θ = 90° 或 -90°（符号决定）
                const r = Math.abs(coefficient);
                const thetaDeg = (coefficient > 0) ? 90 : -90;

                // 高精度计算模的 n 次方根
                const rStr = r.toString();
                const rootIndexStr = rootIndex.toString();
                const rootR = this.ctx.Root({ RootIndex: rootIndexStr, Radicand: rStr }); // r^(1/n)

                // 幅角除以 n
                const thetaDiv = this.ctx.Divide({ Dividend: thetaDeg.toString(), Divisor: rootIndexStr });

                // 角度转弧度
                const thetaRad = this.ctx.Convert({ Value: thetaDiv, Menu: "radians" });

                // 计算 cos 和 sin
                const cosVal = this.ctx.TrigRadFunction({ menu: "cos", Radians: thetaRad });
                const sinVal = this.ctx.TrigRadFunction({ menu: "sin", Radians: thetaRad });

                // 实部 = rootR * cosVal，虚部 = rootR * sinVal
                const real = this.ctx.Multiply({ Multiplier1: rootR, Multiplier2: cosVal });
                const imag = this.ctx.Multiply({ Multiplier1: rootR, Multiplier2: sinVal });

                // 格式化复数
                return this.ctx._formatComplex(parseFloat(real), parseFloat(imag));
            } catch (error) {
                if (error.message === lang("ImaginaryParseError")) {
                    return this.ctx._handleError(lang("ImaginaryParseError"));
                }
                if (error.message === lang("ImaginaryRootIndexError")) {
                    return this.ctx._handleError(lang("ImaginaryRootIndexError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }
    }

    // ===== ComplexOps 复数 =====
    class ComplexOps {
        constructor(ctx) { this.ctx = ctx; }

        /**
         * CreateComplex积木实现
         * 创建复数
         */
        CreateComplex(args) {
            try {
                const real = parseFloat(String(args.Real));
                const imaginary = parseFloat(String(args.Imaginary));

                if (isNaN(real) || isNaN(imaginary)) {
                    return this.ctx._handleError(lang("NoNumber"));
                }

                return this.ctx._formatComplex(real, imaginary);
            } catch (error) {
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * GetComplexPart积木实现
         * 获取复数的实部或虚部
         */
        GetComplexPart(args) {
            try {
                const complexStr = String(args.Complex);
                const partType = args.Part;

                const { real, imaginary } = this.ctx._parseComplex(complexStr);

                if (partType === "realPart") {
                    return real.toString();
                } else if (partType === "imaginaryPart") {
                    return imaginary.toString();
                }

                return "0";
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexAdd积木实现
         * 复数加法
         */
        ComplexAdd(args) {
            try {
                const complex1 = this.ctx._parseComplex(String(args.Addend1));
                const complex2 = this.ctx._parseComplex(String(args.Addend2));

                const result = this.ctx._complexAdd(
                    complex1.real, complex1.imaginary,
                    complex2.real, complex2.imaginary
                );

                return this.ctx._formatComplex(result.real, result.imaginary);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexSubtract积木实现
         * 复数减法
         */
        ComplexSubtract(args) {
            try {
                const complex1 = this.ctx._parseComplex(String(args.Minuend));
                const complex2 = this.ctx._parseComplex(String(args.Subtrahend));

                const result = this.ctx._complexSubtract(
                    complex1.real, complex1.imaginary,
                    complex2.real, complex2.imaginary
                );

                return this.ctx._formatComplex(result.real, result.imaginary);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexMultiply积木实现
         * 复数乘法
         */
        ComplexMultiply(args) {
            try {
                const complex1 = this.ctx._parseComplex(String(args.Multiplier1));
                const complex2 = this.ctx._parseComplex(String(args.Multiplier2));

                const result = this.ctx._complexMultiply(
                    complex1.real, complex1.imaginary,
                    complex2.real, complex2.imaginary
                );

                return this.ctx._formatComplex(result.real, result.imaginary);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexDivide积木实现
         * 复数除法
         */
        ComplexDivide(args) {
            try {
                const complex1 = this.ctx._parseComplex(String(args.Dividend));
                const complex2 = this.ctx._parseComplex(String(args.Divisor));

                const result = this.ctx._complexDivide(
                    complex1.real, complex1.imaginary,
                    complex2.real, complex2.imaginary
                );

                return this.ctx._formatComplex(result.real, result.imaginary);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                if (error.message === lang("ComplexDivideByZeroError")) {
                    return this.ctx._handleError(lang("ComplexDivideByZeroError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexMod积木实现
         * 复数取余
         */
        ComplexMod(args) {
            try {
                const complex1 = this.ctx._parseComplex(String(args.Dividend));
                const complex2 = this.ctx._parseComplex(String(args.Divisor));

                const result = this.ctx._complexMod(
                    complex1.real, complex1.imaginary,
                    complex2.real, complex2.imaginary
                );

                return this.ctx._formatComplex(result.real, result.imaginary);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                if (error.message === lang("ComplexDivideByZeroError")) {
                    return this.ctx._handleError(lang("ComplexDivideByZeroError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexQuo积木实现
         * 复数求商
         */
        ComplexQuo(args) {
            try {
                const complex1 = this.ctx._parseComplex(String(args.Dividend));
                const complex2 = this.ctx._parseComplex(String(args.Divisor));

                const result = this.ctx._complexQuo(
                    complex1.real, complex1.imaginary,
                    complex2.real, complex2.imaginary
                );

                return this.ctx._formatComplex(result.real, result.imaginary);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                if (error.message === lang("ComplexDivideByZeroError")) {
                    return this.ctx._handleError(lang("ComplexDivideByZeroError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexDivMod积木实现
         * 复数除法模运算
         */
        ComplexDivMod(args) {
            try {
                const complex1 = this.ctx._parseComplex(String(args.Number1));
                const complex2 = this.ctx._parseComplex(String(args.Number2));

                // 计算商
                const quotient = this.ctx._complexQuo(
                    complex1.real, complex1.imaginary,
                    complex2.real, complex2.imaginary
                );

                // 计算余数
                const remainder = this.ctx._complexMod(
                    complex1.real, complex1.imaginary,
                    complex2.real, complex2.imaginary
                );

                return `${this._formatComplex(quotient.real, quotient.imaginary)}……${this._formatComplex(remainder.real, remainder.imaginary)}`;
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                if (error.message === lang("ComplexDivideByZeroError")) {
                    return this.ctx._handleError(lang("ComplexDivideByZeroError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexAbsolute积木实现
         * 复数的模（绝对值）
         */
        ComplexAbsolute(args) {
            try {
                const complex = this.ctx._parseComplex(String(args.Complex));

                const modulus = this.ctx._complexModulus(complex.real, complex.imaginary);

                return modulus.toString();
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexNegative积木实现
         * 复数的相反数
         */
        ComplexNegative(args) {
            try {
                const complex = this.ctx._parseComplex(String(args.Complex));

                const result = {
                    real: -complex.real,
                    imaginary: -complex.imaginary
                };

                return this.ctx._formatComplex(result.real, result.imaginary);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexRound积木实现
         * 复数舍入
         */
        ComplexRound(args) {
            try {
                const complex = this.ctx._parseComplex(String(args.Complex));
                const method = args.Menu;

                let roundedReal, roundedImag;

                switch (method) {
                    case "round":
                        roundedReal = Math.round(complex.real);
                        roundedImag = Math.round(complex.imaginary);
                        break;
                    case "ceil":
                        roundedReal = Math.ceil(complex.real);
                        roundedImag = Math.ceil(complex.imaginary);
                        break;
                    case "floor":
                        roundedReal = Math.floor(complex.real);
                        roundedImag = Math.floor(complex.imaginary);
                        break;
                    default:
                        return this.ctx._handleError(lang("UndefinedErrorText"));
                }

                return this.ctx._formatComplex(roundedReal, roundedImag);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexPower积木实现
         * 复数幂运算
         */
        ComplexPower(args) {
            try {
                const base = this.ctx._parseComplex(String(args.Base));
                const exponent = parseFloat(args.Index);

                if (!Number.isInteger(exponent)) {
                    return this.ctx._handleError("指数必须为整数");
                }

                const result = this.ctx._complexPower(base.real, base.imaginary, exponent);

                return this.ctx._formatComplex(result.real, result.imaginary);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexRoot积木实现
         * 复数开根
         */
        ComplexRoot(args) {
            try {
                const base = this.ctx._parseComplex(String(args.Base));
                const rootIndex = parseFloat(args.RootIndex);

                if (rootIndex <= 0 || !Number.isInteger(rootIndex)) {
                    return this.ctx._handleError(lang("ComplexRootIndexError"));
                }

                const result = this.ctx._complexRoot(base.real, base.imaginary, rootIndex);

                return this.ctx._formatComplex(result.real, result.imaginary);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                if (error.message === lang("ComplexRootIndexError")) {
                    return this.ctx._handleError(lang("ComplexRootIndexError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexSqrt积木实现
         * 复数平方根
         */
        ComplexSqrt(args) {
            try {
                const base = this.ctx._parseComplex(String(args.Base));

                const result = this.ctx._complexSqrt(base.real, base.imaginary);

                return this.ctx._formatComplex(result.real, result.imaginary);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexConjugate积木实现
         * 复数的共轭
         */
        ComplexConjugate(args) {
            try {
                const complex = this.ctx._parseComplex(String(args.Complex));

                const conjugate = this.ctx._complexConjugate(complex.real, complex.imaginary);

                return this.ctx._formatComplex(conjugate.real, conjugate.imaginary);
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * ComplexArg积木实现
         * 复数的幅角
         */
        ComplexArg(args) {
            try {
                const complex = this.ctx._parseComplex(String(args.Complex));

                const argument = this.ctx._complexArgument(complex.real, complex.imaginary);

                return argument.toString();
            } catch (error) {
                if (error.message === lang("ComplexParseError")) {
                    return this.ctx._handleError(lang("ComplexParseError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        GetComplexPartFromString(args) {
            try {
                const complexStr = String(args.Number);
                const partType = args.Type;

                const complex = this.ctx._parseComplex(complexStr);

                if (partType === "realPart") {
                    return complex.real.toString();
                } else if (partType === "imaginaryPart") {
                    return complex.imaginary.toString();
                }

                return "0";
            } catch (error) {
                if (error.message === "Complex number format error") {
                    return this.ctx._handleError("ComplexParseError");
                }
                return this.ctx._handleError("UndefinedErrorText");
            }
        }
    }

    // ===== NumberTheoryOps 数论 =====
    class NumberTheoryOps {
        constructor(ctx) { this.ctx = ctx; }

        Gcd(args) {
            try {
                const a = parseInt(String(args.Number), 10);
                const b = parseInt(String(args.Number2), 10);
                if (isNaN(a) || isNaN(b)) {
                    return this.ctx._handleError("NoNumber");
                }
                let x = a;
                let y = b;
                while (y !== 0) {
                    const temp = y;
                    y = x % y;
                    x = temp;
                }
                return x.toString();
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        Lcm(args) {
            try {
                const a = parseInt(String(args.Number), 10);
                const b = parseInt(String(args.Number2), 10);
                if (isNaN(a) || isNaN(b)) {
                    return this.ctx._handleError("NoNumber");
                }
                if (a === 0 || b === 0) {
                    return "0";
                }
                // 使用类中已有的 _gcd 方法（注意下划线）
                const gcdValue = this.ctx._gcd(a, b);
                // 先除后乘，避免中间结果过大
                const lcmValue = (a / gcdValue) * b;
                return lcmValue.toString();
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        MaxFactor(args) {
            try {
                const num = parseInt(String(args.Number), 10);
                if (isNaN(num) || num <= 1) {
                    return "1";
                }
                // 从 num/2 向下查找第一个因数
                for (let i = Math.floor(num / 2); i > 0; i--) {
                    if (num % i === 0) {
                        return i.toString();
                    }
                }
                return "1";
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        MinMultiple(args) {
            try {
                const num = parseFloat(String(args.Number));
                if (isNaN(num)) {
                    return this.ctx._handleError("NoNumber");
                }
                // 最小倍数就是它本身（正整数倍，1 倍）
                return num.toString();
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        GetFactors(args) {
            try {
                const num = parseInt(String(args.Number), 10);
                if (isNaN(num)) {
                    return this.ctx._handleError("NoNumber");
                }
                if (num === 0) {
                    return "0";
                }
                const factors = [];
                const limit = Math.floor(Math.sqrt(Math.abs(num)));
                for (let i = 1; i <= limit; i++) {
                    if (num % i === 0) {
                        factors.push(i);
                        const j = num / i;
                        if (j !== i) {
                            factors.push(j);
                        }
                    }
                }
                factors.sort((a, b) => a - b);
                return factors.join(",");
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        GetNthMultiple(args) {
            try {
                const num = parseFloat(String(args.Number));
                const index = parseInt(String(args.Index), 10);
                if (isNaN(num) || isNaN(index)) {
                    return this.ctx._handleError("NoNumber");
                }
                const result = num * index;
                return result.toString();
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        CommonFactors(args) {
            try {
                const a = parseInt(String(args.Number), 10);
                const b = parseInt(String(args.Number2), 10);
                if (isNaN(a) || isNaN(b)) {
                    return this.ctx._handleError("NoNumber");
                }
                const factors = [];
                const limit = Math.min(Math.abs(a), Math.abs(b));
                for (let i = 1; i <= limit; i++) {
                    if (a % i === 0 && b % i === 0) {
                        factors.push(i);
                    }
                }
                factors.sort((x, y) => x - y);
                return factors.join(", ");
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        GetSum(args) {
            const numStr = String(args.Number);
            let sum = "0";
            for (let i = 0; i < numStr.length; i++) {
                const ch = numStr[i];
                if (ch >= '0' && ch <= '9') {
                    sum = this.ctx.Add({ Addend1: sum, Addend2: ch });
                }
                // 忽略负号和小数点
            }
            return sum;
        }



        /**
         * GetPrime
         * 获取第 n 个质数
         * @param {object} args - 包含 Index 参数的对象
         * @returns {string} 第 n 个质数的字符串表示
         */
        GetPrime(args) {
            // 获取索引并转为正整数
            let n = parseInt(args.Index, 10);
            if (isNaN(n) || n <= 0) {
                return this.ctx._handleError("Invalid index: index must be a positive integer");
            }

            let count = 0;      // 已找到的质数个数
            let candidate = 2;  // 从第一个质数 2 开始检查

            const MAX_CANDIDATE = this.ctx.maxLoopLimit;

            while (candidate <= MAX_CANDIDATE) {
                if (this.ctx._isPrime(candidate)) {
                    count++;
                    if (count === n) {
                        return candidate.toString();
                    }
                }
                candidate++;
            }

            // 若超出安全上限仍未找到，返回错误提示
            return this.ctx._handleError(`The ${n}-th prime is too large (exceeds ${MAX_CANDIDATE})`);
        }

        GetNumberLength(args) {
            const str = String(args.Number);          // 转为字符串
            return str.length;                        // 返回字符个数（包括负号和小数点）
        }

        GetNumberIndex(args) {
            const str = String(args.Number);
            const idx = parseInt(args.Index, 10);
            if (isNaN(idx) || idx < 0 || idx > str.length) {
                return this.ctx._handleError("indexNoDefined");
            }
            return str[idx - 1];                          // 返回该位置的字符
        }

        // ===== 数论积木：常量、范围、数论判定 =====

        /** 解析 {Min~Max} 格式的范围字符串，返回 {min, max} */
        _parseRange(rangeStr) {
            try {
                // 确保转换成字符串
                let str = String(rangeStr).trim();

                // 如果传入的是 [Thing] 对象，尝试提取其值
                if (str === '[Thing]' || str === 'Thing' || str.includes('Thing')) {
                    // 尝试从 args 中获取实际值
                    return null;
                }

                // 尝试匹配 {1~100} 格式
                let match = str.match(/^\{(.+)~(.+)\}$/);

                // 如果匹配失败，尝试匹配 1~100 格式（无大括号）
                if (!match) {
                    match = str.match(/^(.+)~(.+)$/);
                }

                // 如果还是失败，尝试匹配 [1,100] 或 (1,100) 等格式
                if (!match) {
                    match = str.match(/^[\[\(](.+)[\s,]+(.+)[\]\)]$/);
                }

                if (!match) return null;

                const min = parseInt(match[1], 10);
                const max = parseInt(match[2], 10);
                if (isNaN(min) || isNaN(max)) return null;
                return { min: Math.min(min, max), max: Math.max(min, max) };
            } catch (error) {
                return null;
            }
        }

        /** 判断是否为完美数（真因子之和等于自身） */
        _isPerfectNumber(n) {
            if (n < 2) return false;
            let sum = 1;
            for (let i = 2; i * i <= n; i++) {
                if (n % i === 0) {
                    sum += i;
                    if (i !== n / i) sum += n / i;
                }
            }
            return sum === n;
        }

        /** 判断是否为指数（完美幂，a^b, b≥2） */
        _isExponentialNumber(n) {
            if (n < 4) return false;
            for (let a = 2; a * a <= n; a++) {
                let power = a * a;
                while (power <= n && power > 0) {
                    if (power === n) return true;
                    power *= a;
                }
            }
            return false;
        }

        /** 判断是否为质数 */
        _isPrime(n) {
            if (n < 2) return false;
            if (n === 2 || n === 3) return true;
            if (n % 2 === 0) return false;
            for (let i = 3; i * i <= n; i += 2) {
                if (n % i === 0) return false;
            }
            return true;
        }

        /** 判断是否为自然数（0, 1, 2, ...） */
        _isNatural(n) {
            return Number.isInteger(n) && n >= 0;
        }

        /** 判断是否为整数 */
        _isInteger(n) {
            return Number.isInteger(n);
        }

        /** 判断是否为平方数 */
        _isSquare(n) {
            if (n < 0) return false;
            const root = Math.floor(Math.sqrt(n));
            return root * root === n;
        }

        /** 判断是否为立方数 */
        _isCube(n) {
            if (n < 0) return false;
            const root = Math.floor(Math.cbrt(n));
            return root * root * root === n;
        }

        /** 判断是否为合数 */
        _isComposite(n) {
            if (n < 4) return false;
            for (let i = 2; i * i <= n; i++) {
                if (n % i === 0) return true;
            }
            return false;
        }

        /** 判断是否为半质数（恰为两个质数之积） */
        _isSemiPrime(n) {
            if (n < 4) return false;
            let count = 0;
            let temp = n;
            for (let i = 2; i * i <= temp; i++) {
                while (temp % i === 0) {
                    count++;
                    temp /= i;
                    if (count > 2) return false;
                }
            }
            if (temp > 1) count++;
            return count === 2;
        }

        /** 根据 type 判定函数 */
        _getTypeChecker(type) {
            switch (String(type)) {
                case 'prime': return (n) => this._isPrime(n);
                case 'composite': return (n) => this._isComposite(n);
                case 'natural': return (n) => this._isNatural(n);
                case 'integer': return (n) => this._isInteger(n);
                case 'perfect': return (n) => this._isPerfectNumber(n);
                case 'exponential': return (n) => this._isExponentialNumber(n);
                case 'semiprime': return (n) => this._isSemiPrime(n);
                case 'square': return (n) => this._isSquare(n);
                case 'cube': return (n) => this._isCube(n);
                default: return null;
            }
        }

        /** 常量[π/e/φ] */
        Constant(args) {
            try {
                const type = String(args.Constant);
                if (type === 'pi') {
                    this.ctx._calculatePi();
                    return this.ctx.pi;
                }
                if (type === 'e') {
                    this.ctx._calculateE();
                    return this.ctx.e;
                }
                if (type === 'phi') {
                    this.ctx._calculatePhi();
                    return this.ctx.phi;
                }
                return this.ctx._handleError("NoNumber");
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 常量[π/e/φ]的前[Index]位小数 */
        ConstantDigits(args) {
            try {
                const type = String(args.Constant);
                const digits = parseInt(String(args.Index), 10);
                if (isNaN(digits) || digits < 0) {
                    return this.ctx._handleError("NoNumber");
                }
                let value;
                if (type === 'pi') {
                    this.ctx._calculatePi();
                    value = this.ctx.pi;
                } else if (type === 'e') {
                    this.ctx._calculateE();
                    value = this.ctx.e;
                } else if (type === 'phi') {
                    this.ctx._calculatePhi();
                    value = this.ctx.phi;
                } else {
                    return this.ctx._handleError("NoNumber");
                }
                // 从常量字符串中提取前 N 位小数
                const str = String(value);
                const dotIndex = str.indexOf('.');
                if (dotIndex === -1) return digits === 0 ? str : str;
                if (digits === 0) return str.substring(0, dotIndex);
                const available = str.length - dotIndex - 1;
                const take = Math.min(digits, available);
                return str.substring(0, dotIndex + 1 + take);
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** [MinValue] 到 [MaxValue] → {Min~Max} */
        MakeRange(args) {
            try {
                const min = String(args.MinValue).trim();
                const max = String(args.MaxValue).trim();
                if (min === '' || max === '') {
                    return this.ctx._handleError("NoNumber");
                }
                return `{${min}~${max}}`;
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 在 [Range] 之间 [Type] 的数量 */
        CountInRange(args) {
            try {
                const range = this._parseRange(args.Range);
                if (!range) return this.ctx._handleError("NoNumber");
                const checker = this._getTypeChecker(args.Type);
                if (!checker) return this.ctx._handleError("NoNumber");
                let count = 0;
                for (let n = range.min; n <= range.max; n++) {
                    if (checker(n)) count++;
                }
                return count.toString();
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 在 [Range] 之间第 [Index] 个 [Type] */
        NthInRange(args) {
            try {
                const range = this._parseRange(args.Range);
                if (!range) return this.ctx._handleError("NoNumber");
                const checker = this._getTypeChecker(args.Type);
                if (!checker) return this.ctx._handleError("NoNumber");
                const index = parseInt(String(args.Index), 10);
                if (isNaN(index) || index < 1) return this.ctx._handleError("indexNoDefined");
                let count = 0;
                for (let n = range.min; n <= range.max; n++) {
                    if (checker(n)) {
                        count++;
                        if (count === index) return n.toString();
                    }
                }
                return this.ctx._handleError(`Not found: no ${index}th number in range`);
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 在 [Range] 之间除以 [Value] 与 [Number] 同余的数量 */
        CountCongruent(args) {
            try {
                const range = this._parseRange(args.Range);
                if (!range) return this.ctx._handleError("NoNumber");
                const mod = parseInt(String(args.Value), 10);
                const target = parseInt(String(args.Number), 10);
                if (isNaN(mod) || mod === 0 || isNaN(target)) {
                    return this.ctx._handleError("NoNumber");
                }
                const targetRem = ((target % mod) + mod) % mod;
                let count = 0;
                for (let n = range.min; n <= range.max; n++) {
                    if (((n % mod) + mod) % mod === targetRem) count++;
                }
                return count.toString();
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 在 [Range] 之间除以 [Value] 与 [Number] 同余的第 [Index] 个 */
        NthCongruent(args) {
            try {
                const range = this._parseRange(args.Range);
                if (!range) return this.ctx._handleError("NoNumber");
                const mod = parseInt(String(args.Value), 10);
                const target = parseInt(String(args.Number), 10);
                if (isNaN(mod) || mod === 0 || isNaN(target)) {
                    return this.ctx._handleError("NoNumber");
                }
                const index = parseInt(String(args.Index), 10);
                if (isNaN(index) || index < 1) return this.ctx._handleError("indexNoDefined");
                const targetRem = ((target % mod) + mod) % mod;
                let count = 0;
                for (let n = range.min; n <= range.max; n++) {
                    if (((n % mod) + mod) % mod === targetRem) {
                        count++;
                        if (count === index) return n.toString();
                    }
                }
                return this.ctx._handleError(`Not found: no ${index}th congruent number in range`);
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 因数列表 - 返回一个数的所有正因数列表 */
        FactorList(args) {
            try {
                const n = parseInt(String(args.Number), 10);
                if (isNaN(n) || n < 1) return this.ctx._handleError("NoNumber");
                const factors = [];
                for (let i = 1; i * i <= n; i++) {
                    if (n % i === 0) {
                        factors.push(i);
                        if (i !== n / i) factors.push(n / i);
                    }
                }
                factors.sort((a, b) => a - b);
                return '[' + factors.join(',') + ']';
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 质因数分解 - 返回质因数列表 */
        PrimeFactor(args) {
            try {
                const n = parseInt(String(args.Number), 10);
                if (isNaN(n) || n < 2) return this.ctx._handleError("NoNumber");
                let temp = n;
                const factors = [];
                let divisor = 2;
                while (divisor * divisor <= temp) {
                    while (temp % divisor === 0) {
                        factors.push(divisor);
                        temp /= divisor;
                    }
                    divisor++;
                }
                if (temp > 1) factors.push(temp);
                return '[' + factors.join(',') + ']';
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 因数个数 - d(n) */
        FactorCount(args) {
            try {
                const n = parseInt(String(args.Number), 10);
                if (isNaN(n) || n < 1) return this.ctx._handleError("NoNumber");
                let count = 0;
                for (let i = 1; i * i <= n; i++) {
                    if (n % i === 0) {
                        count++;
                        if (i !== n / i) count++;
                    }
                }
                return count.toString();
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 因数和 - σ(n) */
        FactorSum(args) {
            try {
                const n = parseInt(String(args.Number), 10);
                if (isNaN(n) || n < 1) return this.ctx._handleError("NoNumber");
                let sum = 0;
                for (let i = 1; i * i <= n; i++) {
                    if (n % i === 0) {
                        sum += i;
                        if (i !== n / i) sum += n / i;
                    }
                }
                return sum.toString();
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 欧拉函数 φ(n) */
        EulerPhi(args) {
            try {
                let n = parseInt(String(args.Number), 10);
                if (isNaN(n) || n < 1) return this.ctx._handleError("NoNumber");
                let result = n;
                let temp = n;
                let p = 2;
                while (p * p <= temp) {
                    if (temp % p === 0) {
                        while (temp % p === 0) temp /= p;
                        result -= result / p;
                    }
                    p++;
                }
                if (temp > 1) result -= result / temp;
                return result.toString();
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 第 n 个质数 */
        NthPrime(args) {
            try {
                const index = parseInt(String(args.Index), 10);
                if (isNaN(index) || index < 1) return this.ctx._handleError("indexNoDefined");
                let count = 0;
                let candidate = 2;
                while (true) {
                    if (this._isPrime(candidate)) {
                        count++;
                        if (count === index) return candidate.toString();
                    }
                    candidate++;
                    // 防止死循环：设置一个合理上限
                    if (candidate > 1000000) return this.ctx._handleError("Too large");
                }
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 质数计数 π(n) - 不超过 n 的质数个数 */
        PrimeCount(args) {
            try {
                const n = parseInt(String(args.Number), 10);
                if (isNaN(n) || n < 2) return "0";
                let count = 0;
                for (let i = 2; i <= n; i++) {
                    if (this._isPrime(i)) count++;
                }
                return count.toString();
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        /** 质数间隔 - n 前后的质数差值 */
        PrimeGap(args) {
            try {
                const n = parseInt(String(args.Number), 10);
                if (isNaN(n) || n < 2) return this.ctx._handleError("NoNumber");
                // 找不大于 n 的最大质数
                let prev = n;
                while (prev >= 2 && !this._isPrime(prev)) prev--;
                // 找不小于 n 的最小质数
                let next = n;
                while (!this._isPrime(next)) next++;
                return (next - prev).toString();
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }
    }

    // ===== CombinatoricsOps 组合数学 =====
    class CombinatoricsOps {
        constructor(ctx) { this.ctx = ctx; }

        /**
         * Combination - 计算组合数 C(n, k)
         * @param {object} args - 包含 N 和 K 参数的对象
         * @returns {string} 组合数的高精度整数结果
         */
        Combination(args) {
            const n = parseInt(String(args.N), 10);
            const k = parseInt(String(args.K), 10);
            if (isNaN(n) || isNaN(k)) {
                return this.ctx._handleError("NoNumber");
            }
            if (n < 0 || k < 0 || k > n) {
                return this.ctx._handleError("We need: n ≥ k ≥ 0");
            }

            // 利用对称性减少计算量：C(n, k) = C(n, n-k)
            const k2 = Math.min(k, n - k);
            if (k2 === 0) return "1";

            // 使用递推公式：C(n, k) = C(n, k-1) * (n - k + 1) / k
            let result = "1";
            for (let i = 1; i <= k2; i++) {
                // 分子 = numerator * (n - i + 1)
                const numerator = this.ctx.Multiply({
                    Multiplier1: result,
                    Multiplier2: (n - i + 1).toString()
                });
                // 分母 = i
                result = this.ctx.Divide({
                    Dividend: numerator,
                    Divisor: i.toString()
                });
                // 由于 C(n,k) 一定是整数，除法应能整除；若因精度问题出现小数，可四舍五入
                // 但我们的高精度除法用于整数时不会产生小数，因为除数是整数且能整除
            }
            return result;
        }

        /**
         * Permutation - 计算排列数 P(n, k)
         * @param {object} args - 包含 N 和 K 参数的对象
         * @returns {string} 排列数的高精度整数结果
         */
        Permutation(args) {
            const n = parseInt(String(args.N), 10);
            const k = parseInt(String(args.K), 10);
            if (isNaN(n) || isNaN(k)) {
                return this.ctx._handleError("NoNumber");
            }
            if (n < 0 || k < 0 || k > n) {
                return this.ctx._handleError("We need: n ≥ k ≥ 0");
            }
            if (k === 0) return "1";

            // P(n, k) = n * (n-1) * ... * (n-k+1)
            let result = "1";
            for (let i = 0; i < k; i++) {
                result = this.ctx.Multiply({
                    Multiplier1: result,
                    Multiplier2: (n - i).toString()
                });
            }
            return result;
        }

        /**
         * RepetitionPermutation - 重复排列 n^k
         */
        RepetitionPermutation(args) {
            const n = parseInt(String(args.n), 10);
            const k = parseInt(String(args.k), 10);
            if (isNaN(n) || isNaN(k) || k < 0) {
                return this.ctx._handleError("参数无效，k 应为非负整数");
            }

            // n^k 的高精度计算
            if (k === 0) return "1";
            if (n === 0) return "0";
            if (n === 1) return "1";

            let result = "1";
            for (let i = 0; i < k; i++) {
                result = this.ctx.Multiply({ Multiplier1: result, Multiplier2: n.toString() });
            }
            return result;
        }

        /**
         * CircularPermutation - 圆排列 (n-1)!
         */
        CircularPermutation(args) {
            const n = parseInt(String(args.n), 10);
            if (isNaN(n) || n < 0) {
                return this.ctx._handleError("圆排列要求 n ≥ 0");
            }
            if (n === 0) return "1"; // 0个元素圆排列规定为1
            // 计算 (n-1)!
            const m = n - 1;
            if (m === 0) return "1";
            let result = "1";
            for (let i = 2; i <= m; i++) {
                result = this.ctx.Multiply({ Multiplier1: result, Multiplier2: i.toString() });
            }
            return result;
        }

        /**
         * MultisetPermutation - 多重集排列数
         * @param {object} args - 包含 list 参数（字符串，如 "2,1,1"）
         * @returns {string} 排列总数
         */
        MultisetPermutation(args) {
            const listStr = String(args.list).trim();
            if (listStr === "") return "1";

            // 解析个数列表
            const parts = listStr.split(',');
            const counts = [];
            let total = 0;
            for (const part of parts) {
                const num = parseInt(part.trim(), 10);
                if (isNaN(num) || num < 0) {
                    return this.ctx._handleError("多重集个数必须为非负整数");
                }
                counts.push(num);
                total += num;
            }

            // 公式: total! / ∏(counts[i]!)
            let resultNumerator = "1";
            // 计算 total! (高精度)
            for (let i = 2; i <= total; i++) {
                resultNumerator = this.ctx.Multiply({ Multiplier1: resultNumerator, Multiplier2: i.toString() });
            }

            let resultDenominator = "1";
            for (let c of counts) {
                if (c <= 1) continue;
                let factC = "1";
                for (let i = 2; i <= c; i++) {
                    factC = this.ctx.Multiply({ Multiplier1: factC, Multiplier2: i.toString() });
                }
                resultDenominator = this.ctx.Multiply({ Multiplier1: resultDenominator, Multiplier2: factC });
            }

            // 最终结果为 numerator / denominator
            const finalResult = this.ctx.Divide({ Dividend: resultNumerator, Divisor: resultDenominator });
            // 由于一定是整数，直接返回
            return finalResult;
        }

        /**
         * AngleDegree - 将数字标记为角度值
         * @param {object} args - 包含 Angle 参数
         * @returns {string} 角度值字符串
         */
        AngleDegree(args) {
            const angle = parseFloat(String(args.Angle));
            if (isNaN(angle)) {
                return this.ctx._handleError("NoNumber");
            }
            return angle + "°";
        }

        /**
         * AngleRatio - 计算两个角度的比例
         * @param {object} args - 包含 Angle1 和 Angle2 参数
         * @returns {number} 比例值
         */
        AngleRatio(args) {
            const a1 = parseFloat(String(args.Angle1));
            const a2 = parseFloat(String(args.Angle2));
            if (isNaN(a1) || isNaN(a2) || a2 === 0) {
                return this.ctx._handleError("NoNumber");
            }
            return a1 / a2;
        }

        /**
         * AngleAdd - 角度加法
         * @param {object} args - 包含 Angle1 和 Angle2 参数
         * @returns {string} 角度和
         */
        AngleAdd(args) {
            const a1 = parseFloat(String(args.Angle1));
            const a2 = parseFloat(String(args.Angle2));
            if (isNaN(a1) || isNaN(a2)) {
                return this.ctx._handleError("NoNumber");
            }
            return (a1 + a2) + "°";
        }

        /**
         * AngleSubtract - 角度减法
         * @param {object} args - 包含 Angle1 和 Angle2 参数
         * @returns {string} 角度差
         */
        AngleSubtract(args) {
            const a1 = parseFloat(String(args.Angle1));
            const a2 = parseFloat(String(args.Angle2));
            if (isNaN(a1) || isNaN(a2)) {
                return this.ctx._handleError("NoNumber");
            }
            return (a1 - a2) + "°";
        }

        /**
         * AngleMultiply - 角度乘法
         * @param {object} args - 包含 Angle 和 Number 参数
         * @returns {string} 角度乘以数的结果
         */
        AngleMultiply(args) {
            const angle = parseFloat(String(args.Angle));
            const num = parseFloat(String(args.Number));
            if (isNaN(angle) || isNaN(num)) {
                return this.ctx._handleError("NoNumber");
            }
            return (angle * num) + "°";
        }

        /**
         * AngleDivide - 角度除法
         * @param {object} args - 包含 Angle 和 Number 参数
         * @returns {string} 角度除以数的结果
         */
        AngleDivide(args) {
            const angle = parseFloat(String(args.Angle));
            const num = parseFloat(String(args.Number));
            if (isNaN(angle) || isNaN(num) || num === 0) {
                return this.ctx._handleError("NoNumber");
            }
            return (angle / num) + "°";
        }
    }

    // ===== ProportionOps 比例 =====
    class ProportionOps {
        constructor(ctx) { this.ctx = ctx; }

        /**
         * 将比例转换为分数形式
         */
        ProportionToFraction(args) {
            try {
                const proportionStr = String(args.Proportion);
                const { antecedent, consequent } = this.ctx._parseProportion(proportionStr);

                // 简化分数
                const simplified = this.ctx._simplifyProportionValues(antecedent, consequent);

                // 构建分数字符串
                let result = "";
                if (simplified.sign === -1) {
                    result += "-";
                }
                result += simplified.antecedent + "/" + simplified.consequent;

                return result;
            } catch (error) {
                return this.ctx._handleError(lang("UndefinedErrorText") + error.message);
            }
        }

        /**
         * 将分数转换为比例形式
         */
        FractionToProportion(args) {
            try {
                const proportionStr = String(args.Proportion);
                const { antecedent, consequent } = this.ctx._parseProportion(proportionStr);

                // 简化比例
                const simplified = this.ctx._simplifyProportionValues(antecedent, consequent);

                // 构建比例字符串
                let result = "";
                if (simplified.sign === -1) {
                    result += "-";
                }
                result += simplified.antecedent + ":" + simplified.consequent;

                return result;
            } catch (error) {
                return this.ctx._handleError(lang("UndefinedErrorText") + error.message);
            }
        }

        /**
         * 获取比例的前项或后项
         */
        ProportionPart(args) {
            try {
                const proportionStr = String(args.Proportion);
                const { antecedent, consequent } = this.ctx._parseProportion(proportionStr);

                if (args.Part === "antecedent") {
                    return antecedent.toString();
                } else {
                    return consequent.toString();
                }
            } catch (error) {
                return this.ctx._handleError(lang("UndefinedErrorText") + error.message);
            }
        }

        /**
         * 简化比例
         */
        SimplifyProportion(args) {
            try {
                const proportionStr = String(args.Proportion);
                const { antecedent, consequent } = this.ctx._parseProportion(proportionStr);

                // 简化比例
                const simplified = this.ctx._simplifyProportionValues(antecedent, consequent);

                // 构建简化后的比例字符串
                let result = "";
                if (simplified.sign === -1) {
                    result += "-";
                }
                result += simplified.antecedent + ":" + simplified.consequent;

                return result;
            } catch (error) {
                return this.ctx._handleError(lang("UndefinedErrorText") + error.message);
            }
        }

        /**
         * 比例同时乘以一个数（不化简）
         */
        MultiplySameProportion(args) {
            try {
                const proportionStr = String(args.Proportion);
                const multiplierStr = String(args.Multiplier);

                const { antecedent, consequent } = this.ctx._parseProportion(proportionStr);
                const multiplier = parseFloat(multiplierStr);

                if (isNaN(multiplier)) {
                    return this.ctx._handleError(lang("noNumber"));
                }

                // 同时乘以乘数
                const newAntecedent = antecedent * multiplier;
                const newConsequent = consequent * multiplier;

                // 构建结果字符串（不进行化简）
                let result = "";

                // 处理符号：让结果更直观
                let sign = 1;
                let absAntecedent = newAntecedent;
                let absConsequent = newConsequent;

                if (newConsequent < 0) {
                    absConsequent = -newConsequent;
                    absAntecedent = -newAntecedent;
                }

                if (absAntecedent < 0) {
                    sign = -1;
                    absAntecedent = -absAntecedent;
                }

                if (sign === -1) {
                    result += "-";
                }
                result += absAntecedent + ":" + absConsequent;

                return result;
            } catch (error) {
                return this.ctx._handleError(lang("UndefinedErrorText") + error.message);
            }
        }

        /**
         * 比例加法 - 简化实现
         */
        AddProportion(args) {
            try {
                const prop1 = String(args.Addend1);
                const prop2 = String(args.Addend2);

                // 将比例转换为分数
                const fraction1 = this.ctx.ProportionToFraction({ Proportion: prop1 });
                const fraction2 = this.ctx.ProportionToFraction({ Proportion: prop2 });

                // 使用分数加法运算
                const resultFraction = this.ctx.AddFraction({
                    Addend1: fraction1,
                    Addend2: fraction2
                });

                // 将分数结果转换回比例
                const result = this.ctx.FractionToProportion({ Proportion: resultFraction });
                return result;
            } catch (error) {
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * 比例减法 - 简化实现
         */
        SubtractProportion(args) {
            try {
                const prop1 = String(args.Minuend);
                const prop2 = String(args.Subtrahend);

                // 将比例转换为分数
                const fraction1 = this.ctx.ProportionToFraction({ Proportion: prop1 });
                const fraction2 = this.ctx.ProportionToFraction({ Proportion: prop2 });

                // 使用分数减法运算
                const resultFraction = this.ctx.SubtractFraction({
                    Minuend: fraction1,
                    Subtrahend: fraction2
                });

                // 将分数结果转换回比例
                const result = this.ctx.FractionToProportion({ Proportion: resultFraction });
                return result;
            } catch (error) {
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * 比例乘法 - 简化实现
         */
        MultiplyProportion(args) {
            try {
                const prop1 = String(args.Multiplier1);
                const prop2 = String(args.Multiplier2);

                // 将比例转换为分数
                const fraction1 = this.ctx.ProportionToFraction({ Proportion: prop1 });
                const fraction2 = this.ctx.ProportionToFraction({ Proportion: prop2 });

                // 使用分数乘法运算
                const resultFraction = this.ctx.MultiplyFraction({
                    Multiplier1: fraction1,
                    Multiplier2: fraction2
                });

                // 将分数结果转换回比例
                const result = this.ctx.FractionToProportion({ Proportion: resultFraction });
                return result;
            } catch (error) {
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }

        /**
         * 比例除法 - 简化实现
         */
        DivideProportion(args) {
            try {
                const prop1 = String(args.Dividend);
                const prop2 = String(args.Divisor);

                // 将比例转换为分数
                const fraction1 = this.ctx.ProportionToFraction({ Proportion: prop1 });
                const fraction2 = this.ctx.ProportionToFraction({ Proportion: prop2 });

                // 检查除数是否为0
                const parsed2 = this.ctx._parseProportion(prop2);
                if (parsed2.antecedent === 0) {
                    return this.ctx._handleError(lang("DivideByZeroError"));
                }

                // 使用分数除法运算
                const resultFraction = this.ctx.DivideFraction({
                    Dividend: fraction1,
                    Divisor: fraction2
                });

                // 将分数结果转换回比例
                const result = this.ctx.FractionToProportion({ Proportion: resultFraction });
                return result;
            } catch (error) {
                return this.ctx._handleError(lang("FractionParseError"));
            }
        }
    }

    // ===== VectorOps 向量 =====
    class VectorOps {
        constructor(ctx) { this.ctx = ctx; }

        // 向量积木实现
        Vector2D(args) {
            const x = parseFloat(args.x);
            const y = parseFloat(args.y);
            if (isNaN(x) || isNaN(y)) {
                return this.ctx._handleError(lang("NoNumber"));
            }
            return this.ctx._formatVector(x, y);
        }

        Vector3D(args) {
            const x = parseFloat(args.x);
            const y = parseFloat(args.y);
            const z = parseFloat(args.z);
            if (isNaN(x) || isNaN(y) || isNaN(z)) {
                return this.ctx._handleError(lang("NoNumber"));
            }
            return this.ctx._formatVector(x, y, z);
        }

        Vector2DAdd(args) {
            try {
                const vec1 = this.ctx._parseVector(String(args.Vector1));
                const vec2 = this.ctx._parseVector(String(args.Vector2));

                // 计算和
                const x = this.ctx.Add({ Addend1: vec1.x, Addend2: vec2.x });
                const y = this.ctx.Add({ Addend1: vec1.y, Addend2: vec2.y });

                return this.ctx._formatVector(x, y);
            } catch (error) {
                if (error.message === lang("ParseVectorError")) {
                    return this.ctx._handleError(lang("ParseVectorError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        Vector3DAdd(args) {
            try {
                const vec1 = this.ctx._parseVector(String(args.Vector1));
                const vec2 = this.ctx._parseVector(String(args.Vector2));

                // 确保都是3D向量
                if (!vec1.is3D || !vec2.is3D) {
                    return this.ctx._handleError(lang("ParseVectorError"));
                }

                // 计算和
                const x = this.ctx.Add({ Addend1: vec1.x, Addend2: vec2.x });
                const y = this.ctx.Add({ Addend1: vec1.y, Addend2: vec2.y });
                const z = this.ctx.Add({ Addend1: vec1.z, Addend2: vec2.z });

                return this.ctx._formatVector(x, y, z);
            } catch (error) {
                if (error.message === lang("ParseVectorError")) {
                    return this.ctx._handleError(lang("ParseVectorError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        Vector2DSubtract(args) {
            try {
                const vec1 = this.ctx._parseVector(String(args.Vector1));
                const vec2 = this.ctx._parseVector(String(args.Vector2));

                // 计算差
                const x = this.ctx.Subtract({ Minuend: vec1.x, Subtrahend: vec2.x });
                const y = this.ctx.Subtract({ Minuend: vec1.y, Subtrahend: vec2.y });

                return this.ctx._formatVector(x, y);
            } catch (error) {
                if (error.message === lang("ParseVectorError")) {
                    return this.ctx._handleError(lang("ParseVectorError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        Vector3DSubtract(args) {
            try {
                const vec1 = this.ctx._parseVector(String(args.Vector1));
                const vec2 = this.ctx._parseVector(String(args.Vector2));

                // 确保都是3D向量
                if (!vec1.is3D || !vec2.is3D) {
                    return this.ctx._handleError(lang("ParseVectorError"));
                }

                // 计算差
                const x = this.ctx.Subtract({ Minuend: vec1.x, Subtrahend: vec2.x });
                const y = this.ctx.Subtract({ Minuend: vec1.y, Subtrahend: vec2.y });
                const z = this.ctx.Subtract({ Minuend: vec1.z, Subtrahend: vec2.z });

                return this.ctx._formatVector(x, y, z);
            } catch (error) {
                if (error.message === lang("ParseVectorError")) {
                    return this.ctx._handleError(lang("ParseVectorError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        VectorMagnitude(args) {
            try {
                const vec = this.ctx._parseVector(String(args.Vector));

                // 计算平方和
                const xSquared = this.ctx.Multiply({ Multiplier1: vec.x, Multiplier2: vec.x });
                const ySquared = this.ctx.Multiply({ Multiplier1: vec.y, Multiplier2: vec.y });
                let sum = this.ctx.Add({ Addend1: xSquared, Addend2: ySquared });

                // 如果是3D向量，加上z分量
                if (vec.is3D) {
                    const zSquared = this.ctx.Multiply({ Multiplier1: vec.z, Multiplier2: vec.z });
                    sum = this.ctx.Add({ Addend1: sum, Addend2: zSquared });
                }

                // 计算平方根
                const magnitude = this.ctx.Root({ RootIndex: "2", Radicand: sum });
                return magnitude;
            } catch (error) {
                if (error.message === lang("ParseVectorError")) {
                    return this.ctx._handleError(lang("ParseVectorError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        VectorScalarMultiply(args) {
            try {
                const vec = this.ctx._parseVector(String(args.Vector));
                const scalar = parseFloat(args.Scalar);

                if (isNaN(scalar)) {
                    return this.ctx._handleError(lang("NoNumber"));
                }

                // 每个分量乘以标量
                const x = this.ctx.Multiply({ Multiplier1: vec.x, Multiplier2: scalar });
                const y = this.ctx.Multiply({ Multiplier1: vec.y, Multiplier2: scalar });

                if (vec.is3D) {
                    const z = this.ctx.Multiply({ Multiplier1: vec.z, Multiplier2: scalar });
                    return this.ctx._formatVector(x, y, z);
                }

                return this.ctx._formatVector(x, y);
            } catch (error) {
                if (error.message === lang("ParseVectorError")) {
                    return this.ctx._handleError(lang("ParseVectorError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        GetVectorPart(args) {
            try {
                const vec = this.ctx._parseVector(String(args.Vector));
                const part = args.Part;

                switch (part) {
                    case "x":
                        return vec.x.toString();
                    case "y":
                        return vec.y.toString();
                    case "z":
                        return vec.z.toString();
                    default:
                        return "0";
                }
            } catch (error) {
                if (error.message === lang("ParseVectorError")) {
                    return this.ctx._handleError(lang("ParseVectorError"));
                }
                return this.ctx._handleError(lang("UndefinedErrorText"));
            }
        }

        VectorCrossMultiply(args) {
            try {

                const vec1 = this.ctx._parseVector(String(args.Vector1));
                const vec2 = this.ctx._parseVector(String(args.Vector2));


                if (vec1.is3D && vec2.is3D) {

                    const term1 = this.ctx.Multiply({
                        Multiplier1: vec1.y,
                        Multiplier2: vec2.z
                    });

                    const term2 = this.ctx.Multiply({
                        Multiplier1: vec1.z,
                        Multiplier2: vec2.y
                    });

                    const newX = this.ctx.Subtract({
                        Minuend: term1,
                        Subtrahend: term2
                    });

                    const term3 = this.ctx.Multiply({
                        Multiplier1: vec1.z,
                        Multiplier2: vec2.x
                    });

                    const term4 = this.ctx.Multiply({
                        Multiplier1: vec1.x,
                        Multiplier2: vec2.z
                    });

                    const newY = this.ctx.Subtract({
                        Minuend: term3,
                        Subtrahend: term4
                    });

                    const term5 = this.ctx.Multiply({
                        Multiplier1: vec1.x,
                        Multiplier2: vec2.y
                    });

                    const term6 = this.ctx.Multiply({
                        Multiplier1: vec1.y,
                        Multiplier2: vec2.x
                    });

                    const newZ = this.ctx.Subtract({
                        Minuend: term5,
                        Subtrahend: term6
                    });

                    const result = `(${newX},${newY},${newZ})`

                    return result;
                } else if (!vec1.is3D && !vec2.is3D) {
                    const term1 = this.ctx.Multiply({
                        Multiplier1: vec1.x,
                        Multiplier2: vec2.y
                    });

                    const term2 = this.ctx.Multiply({
                        Multiplier1: vec1.y,
                        Multiplier2: vec2.x
                    });

                    const result = this.ctx.Subtract({
                        Minuend: term1,
                        Subtrahend: term2
                    });

                    return result;
                } else {
                    return this.ctx._handleError("UndefinedErrorText");
                }
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText");
            }
        }

        VectorDotProduct(args) {
            try {
                const vec1 = this.ctx._parseVector(String(args.Vector1))
                const vec2 = this.ctx._parseVector(String(args.Vector2))
                const one = this.ctx.Multiply({
                    Multiplier1: vec1.x,
                    Multiplier2: vec2.x
                })
                const two = this.ctx.Multiply({
                    Multiplier1: vec1.y,
                    Multiplier2: vec2.y
                })
                if (vec1.is3D && vec2.is3D) {
                    const three = this.ctx.Multiply({
                        Multiplier1: vec1.z,
                        Multiplier2: vec2.z
                    })
                    const ans = this.ctx.Add({
                        Addend1: one,
                        Addend2: this.ctx.Add({
                            Addend1: two,
                            Addend2: three
                        })
                    })
                    return ans
                } else if (!vec1.is3D && !vec2.is3D) {
                    const ans = this.ctx.Add({
                        Addend1: one,
                        Addend2: two
                    })
                    return ans
                } else {
                    return this.ctx._handleError("UndefinedErrorText")
                }
            } catch (error) {
                return this.ctx._handleError("UndefinedErrorText")
            }
        }

        VectorScalarDivide(args) {
            try {
                const vec = this.ctx._parseVector(String(args.Vector));
                const scalar = parseFloat(args.Scalar);

                if (isNaN(scalar)) {
                    return this.ctx._handleError("NoNumber");
                }

                // 每个分量乘以标量
                const x = this.ctx.Divide({ Dividend: vec.x, Divisor: scalar });
                const y = this.ctx.Divide({ Dividend: vec.y, Divisor: scalar });

                if (vec.is3D) {
                    const z = this.ctx.Divide({ Dividend: vec.z, Divisor: scalar });
                    return this.ctx._formatVector(x, y, z);
                }

                return this.ctx._formatVector(x, y);
            } catch (error) {
                if (error.message === lang("ParseVectorError")) {
                    return this.ctx._handleError("ParseVectorError");
                }
                return this.ctx._handleError("UndefinedErrorText");
            }
        }
    }

    // ===== MatrixOps 矩阵 =====
    class MatrixOps {
        constructor(ctx) { this.ctx = ctx; }

        /**
         * 创建2×2矩阵
         */
        CreateMatrix2x2(args) {
            const a = this.ctx._safeParseFloat(args.a);
            const b = this.ctx._safeParseFloat(args.b);
            const c = this.ctx._safeParseFloat(args.c);
            const d = this.ctx._safeParseFloat(args.d);

            return this.ctx._formatMatrix([[a, b], [c, d]]);
        }

        /**
         * 创建3×3矩阵
         */
        CreateMatrix3x3(args) {
            const a = this.ctx._safeParseFloat(args.a);
            const b = this.ctx._safeParseFloat(args.b);
            const c = this.ctx._safeParseFloat(args.c);
            const d = this.ctx._safeParseFloat(args.d);
            const e = this.ctx._safeParseFloat(args.e);
            const f = this.ctx._safeParseFloat(args.f);
            const g = this.ctx._safeParseFloat(args.g);
            const h = this.ctx._safeParseFloat(args.h);
            const i = this.ctx._safeParseFloat(args.i);

            return this.ctx._formatMatrix([[a, b, c], [d, e, f], [g, h, i]]);
        }

        /**
         * 创建自定义矩阵（任意尺寸）
         * 直接传入 JSON 数组格式的矩阵字符串
         */
        CreateCustomMatrix(args) {
            try {
                const matrixStr = String(args.Matrix);
                // 如果矩阵字符串为空或只包含空白字符，返回空数组
                if (!matrixStr || matrixStr.trim() === "" || matrixStr === "undefined") {
                    return "[]";
                }
                const matrix = this.ctx._parseMatrix(matrixStr);
                // 确保 matrix 是一个有效的二维数组
                if (!matrix || !Array.isArray(matrix) || matrix.length === 0 || !Array.isArray(matrix[0])) {
                    return "[]";
                }
                const result = this.ctx._formatMatrix(matrix);
                // 确保返回值是字符串
                return typeof result === 'string' ? result : "[]";
            } catch (error) {
                return "[]";
            }
        }

        /**
         * 矩阵加法
         */
        MatrixAdd(args) {
            const matrixA = this.ctx._parseMatrix(args.A);
            const matrixB = this.ctx._parseMatrix(args.B);

            // 检查维度是否相同
            if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
                return this.ctx._handleError("Matrix dimensions must match for addition");
            }

            const result = matrixA.map((row, i) =>
                row.map((val, j) => {
                    const sum = this.ctx.Add({ Addend1: val.toString(), Addend2: matrixB[i][j].toString() });
                    return this.ctx._safeParseFloat(sum);
                })
            );

            return this.ctx._formatMatrix(result);
        }

        /**
         * 矩阵减法
         */
        MatrixSubtract(args) {
            const matrixA = this.ctx._parseMatrix(args.A);
            const matrixB = this.ctx._parseMatrix(args.B);

            // 检查维度是否相同
            if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
                return this.ctx._handleError("Matrix dimensions must match for subtraction");
            }

            const result = matrixA.map((row, i) =>
                row.map((val, j) => {
                    const diff = this.ctx.Subtract({ Minuend: val.toString(), Subtrahend: matrixB[i][j].toString() });
                    return this.ctx._safeParseFloat(diff);
                })
            );

            return this.ctx._formatMatrix(result);
        }

        /**
         * 矩阵乘法
         */
        MatrixMultiply(args) {
            const matrixA = this.ctx._parseMatrix(args.A);
            const matrixB = this.ctx._parseMatrix(args.B);

            // 检查维度是否匹配：A的列数必须等于B的行数
            if (matrixA[0].length !== matrixB.length) {
                return this.ctx._handleError("Matrix dimensions incompatible for multiplication");
            }

            const rows = matrixA.length;
            const cols = matrixB[0].length;
            const inner = matrixA[0].length;

            const result = [];
            for (let i = 0; i < rows; i++) {
                result[i] = [];
                for (let j = 0; j < cols; j++) {
                    let sum = "0";
                    for (let k = 0; k < inner; k++) {
                        const product = this.ctx.Multiply({
                            Multiplier1: matrixA[i][k].toString(),
                            Multiplier2: matrixB[k][j].toString()
                        });
                        sum = this.ctx.Add({ Addend1: sum, Addend2: product });
                    }
                    result[i][j] = this.ctx._safeParseFloat(sum);
                }
            }

            return this.ctx._formatMatrix(result);
        }

        /**
         * 矩阵数乘
         */
        MatrixScalarMultiply(args) {
            const scalar = this.ctx._safeParseFloat(args.λ);
            const matrix = this.ctx._parseMatrix(args.M);

            const result = matrix.map(row =>
                row.map(val => {
                    const product = this.ctx.Multiply({
                        Multiplier1: scalar.toString(),
                        Multiplier2: val.toString()
                    });
                    return this.ctx._safeParseFloat(product);
                })
            );

            return this.ctx._formatMatrix(result);
        }

        /**
         * 矩阵转置
         */
        MatrixTranspose(args) {
            const matrix = this.ctx._parseMatrix(args.M);

            const rows = matrix.length;
            const cols = matrix[0].length;

            const result = [];
            for (let j = 0; j < cols; j++) {
                result[j] = [];
                for (let i = 0; i < rows; i++) {
                    result[j][i] = matrix[i][j];
                }
            }

            return this.ctx._formatMatrix(result);
        }

        /**
         * 矩阵行列式（支持2×2和3×3）
         */
        MatrixDeterminant(args) {
            const matrix = this.ctx._parseMatrix(args.M);
            const rows = matrix.length;
            const cols = matrix[0].length;

            if (rows !== cols) {
                return this.ctx._handleError("Determinant only defined for square matrices");
            }

            if (rows === 2) {
                // 2×2行列式：ad - bc
                const ad = this.ctx.Multiply({ Multiplier1: matrix[0][0].toString(), Multiplier2: matrix[1][1].toString() });
                const bc = this.ctx.Multiply({ Multiplier1: matrix[0][1].toString(), Multiplier2: matrix[1][0].toString() });
                const result = this.ctx.Subtract({ Minuend: ad, Subtrahend: bc });
                return result;
            } else if (rows === 3) {
                // 3×3行列式：a(ei - fh) - b(di - fg) + c(dh - eg)
                const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
                const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
                const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];

                const ei = this.ctx.Multiply({ Multiplier1: e.toString(), Multiplier2: i.toString() });
                const fh = this.ctx.Multiply({ Multiplier1: f.toString(), Multiplier2: h.toString() });
                const term1 = this.ctx.Subtract({ Minuend: ei, Subtrahend: fh });
                const part1 = this.ctx.Multiply({ Multiplier1: a.toString(), Multiplier2: term1 });

                const di = this.ctx.Multiply({ Multiplier1: d.toString(), Multiplier2: i.toString() });
                const fg = this.ctx.Multiply({ Multiplier1: f.toString(), Multiplier2: g.toString() });
                const term2 = this.ctx.Subtract({ Minuend: di, Subtrahend: fg });
                const part2 = this.ctx.Multiply({ Multiplier1: b.toString(), Multiplier2: term2 });

                const dh = this.ctx.Multiply({ Multiplier1: d.toString(), Multiplier2: h.toString() });
                const eg = this.ctx.Multiply({ Multiplier1: e.toString(), Multiplier2: g.toString() });
                const term3 = this.ctx.Subtract({ Minuend: dh, Subtrahend: eg });
                const part3 = this.ctx.Multiply({ Multiplier1: c.toString(), Multiplier2: term3 });

                const result1 = this.ctx.Subtract({ Minuend: part1, Subtrahend: part2 });
                const result = this.ctx.Add({ Addend1: result1, Addend2: part3 });

                return result;
            } else {
                return this.ctx._handleError("Determinant only supported for 2×2 and 3×3 matrices");
            }
        }

        /**
         * 矩阵的迹（对角线元素之和）
         */
        MatrixTrace(args) {
            const matrix = this.ctx._parseMatrix(args.M);
            const rows = matrix.length;
            const cols = matrix[0].length;

            if (rows !== cols) {
                return this.ctx._handleError("Trace only defined for square matrices");
            }

            let sum = "0";
            for (let i = 0; i < rows; i++) {
                sum = this.ctx.Add({ Addend1: sum, Addend2: matrix[i][i].toString() });
            }

            return sum;
        }

        /**
         * 计算矩阵的逆矩阵（如果存在）
         * 支持2x2和3x3矩阵
         */
        MatrixInvertible(args) {
            const matrix = this.ctx._parseMatrix(args.M);
            const rows = matrix.length;
            const cols = matrix[0].length;

            if (rows !== cols) {
                return this.ctx._handleError("Inverse only defined for square matrices");
            }

            // 计算行列式，检查是否可逆
            const detResult = this.ctx.MatrixDeterminant(args);
            const detNum = this.ctx._safeParseFloat(detResult);

            // 如果行列式为零，矩阵不可逆
            if (Math.abs(detNum) < 1e-12) {
                return this.ctx._handleError("Matrix is singular and cannot be inverted");
            }

            let inverse;

            if (rows === 2) {
                // 2x2 矩阵求逆
                // [a b; c d] 的逆 = 1/(ad-bc) * [d -b; -c a]
                const a = matrix[0][0], b = matrix[0][1];
                const c = matrix[1][0], d = matrix[1][1];

                // 计算 1/det
                const detInv = this.ctx.Divide({ Dividend: "1", Divisor: detResult });
                const detInvNum = this.ctx._safeParseFloat(detInv);

                inverse = [
                    [detInvNum * d, -detInvNum * b],
                    [-detInvNum * c, detInvNum * a]
                ];

            } else if (rows === 3) {
                // 3x3 矩阵求逆（使用伴随矩阵法）
                const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
                const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
                const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];

                // 计算余子式矩阵 (Cofactor matrix)
                // 每个元素是删除该行和该列后的2x2行列式
                const cofactor = [
                    [
                        e * i - f * h,  // 删除第0行第0列
                        -(d * i - f * g), // 删除第0行第1列
                        d * h - e * g   // 删除第0行第2列
                    ],
                    [
                        -(b * i - c * h), // 删除第1行第0列
                        a * i - c * g,   // 删除第1行第1列
                        -(a * h - b * g)  // 删除第1行第2列
                    ],
                    [
                        b * f - c * e,   // 删除第2行第0列
                        -(a * f - c * d), // 删除第2行第1列
                        a * e - b * d    // 删除第2行第2列
                    ]
                ];

                // 转置伴随矩阵（将余子式矩阵转置）
                const adjugate = [
                    [cofactor[0][0], cofactor[1][0], cofactor[2][0]],
                    [cofactor[0][1], cofactor[1][1], cofactor[2][1]],
                    [cofactor[0][2], cofactor[1][2], cofactor[2][2]]
                ];

                // 乘以 1/det
                const detInv = this.ctx.Divide({ Dividend: "1", Divisor: detResult });
                const detInvNum = this.ctx._safeParseFloat(detInv);

                inverse = adjugate.map(row =>
                    row.map(val => val * detInvNum)
                );

            } else {
                return this.ctx._handleError("Inverse only supported for 2x2 and 3x3 matrices");
            }

            return this.ctx._formatMatrix(inverse);
        }
    }

    // ===== EquationOps 方程 =====
    class EquationOps {
        constructor(ctx) { this.ctx = ctx; }

        // 方程运算积木实现
        SimplifyExpression(args) {
            try {
                const expression = String(args.Expression);
                if (!expression || expression.trim() === '') {
                    return '';
                }

                const result = this.ctx._simplifyExpression(expression);
                return result;
            } catch (error) {
                return this.ctx._handleError(lang("EquationSimplifyError"));
            }
        }

        EquationLikeTerms(args) {
            try {
                const expression = String(args.Expression);
                const terms = this.ctx._parseTerms(expression);
                const combined = this.ctx._combineLikeTerms(terms);
                const result = this.ctx._formatAllTerms(combined);
                return result;
            } catch (error) {
                return this.ctx._handleError("EquationSimplifyError");
            }
        }

        EquationSimplifyFraction(args) {
            try {
                const expression = String(args.Expression);

                if (expression.includes('/')) {
                    const [numerator, denominator] = expression.split('/');

                    // 匹配平方差公式： (变量^2 - 1) / (变量 - 1)  => 变量 + 1
                    const match1 = numerator.match(/\(([a-zA-Z])\^2-1\)/);
                    if (match1 && denominator === `(${match1[1]}-1)`) {
                        return `${match1[1]}+1`;
                    }

                    // 匹配平方差公式： (变量^2 - 1) / (变量 + 1)  => 变量 - 1
                    const match2 = numerator.match(/\(([a-zA-Z])\^2-1\)/);
                    if (match2 && denominator === `(${match2[1]}+1)`) {
                        return `${match2[1]}-1`;
                    }

                    // 可以继续扩展更多公式，例如 (a^2 - b^2)/(a - b) => a + b 等
                }

                return expression;
            } catch (error) {
                return this.ctx._handleError("EquationSimplifyError");
            }
        }

        EquationExponent(args) {
            try {
                const expression = String(args.Expression);

                // 简化指数运算
                if (expression.includes('*')) {
                    // 计算相同变量相乘的次数
                    const parts = expression.split('*');
                    const variableCounts = {};

                    for (const part of parts) {
                        if (/^[a-zA-Z]$/.test(part)) {
                            variableCounts[part] = (variableCounts[part] || 0) + 1;
                        }
                    }

                    // 构建简化结果
                    let result = '';
                    for (const [variable, count] of Object.entries(variableCounts)) {
                        if (count === 1) {
                            result += variable;
                        } else {
                            result += `${variable}^${count}`;
                        }
                    }

                    // 添加常数部分
                    const constants = parts.filter(p => /^\d+$/.test(p));
                    if (constants.length > 0) {
                        const constantProduct = constants.reduce((a, b) => a * parseInt(b), 1);
                        if (constantProduct !== 1) {
                            result = constantProduct + result;
                        }
                    }

                    return result || '1';
                }

                return expression;
            } catch (error) {
                return this.ctx._handleError(lang("EquationSimplifyError"));
            }
        }

        EquationFactor(args) {
            try {
                const expression = String(args.Expression);

                // 简单的因式分解
                if (expression.includes('^2')) {
                    // 平方差公式：a^2-b^2 -> (a+b)(a-b)
                    const match = expression.match(/([a-zA-Z])\^2-(\d+)/);
                    if (match) {
                        const [, variable, number] = match;
                        const sqrt = Math.sqrt(parseInt(number));
                        if (Number.isInteger(sqrt)) {
                            return `(${variable}+${sqrt})(${variable}-${sqrt})`;
                        }
                    }
                }

                return expression;
            } catch (error) {
                return this.ctx._handleError(lang("EquationSimplifyError"));
            }
        }

        EquationExpand(args) {
            try {
                const expression = String(args.Expression);
                const match = expression.match(/\(([^)]+)\)\*?\(([^)]+)\)/);
                if (match) {
                    const [, left, right] = match;

                    // 将括号内表达式分解为带符号的项（处理减法）
                    const parseTerms = (expr) => {
                        let normalized = expr.replace(/\s+/g, '');
                        normalized = normalized.replace(/-/g, '+-');
                        return normalized.split('+').filter(term => term !== '');
                    };

                    const leftTerms = parseTerms(left);
                    const rightTerms = parseTerms(right);

                    // 解析单项，提取系数和变量部分
                    const parseTerm = (term) => {
                        const matchVar = term.match(/^(-?\d*)([a-zA-Z]?)$/);
                        if (!matchVar) return { coeff: 0, variable: '' };
                        let [, numStr, varStr] = matchVar;
                        let coeff = 1;
                        if (numStr === '' || numStr === '+') {
                            coeff = 1;
                        } else if (numStr === '-') {
                            coeff = -1;
                        } else {
                            coeff = parseInt(numStr, 10);
                        }
                        return { coeff, variable: varStr };
                    };

                    const productTerms = [];
                    for (const l of leftTerms) {
                        for (const r of rightTerms) {
                            const { coeff: cl, variable: vl } = parseTerm(l);
                            const { coeff: cr, variable: vr } = parseTerm(r);
                            const coeff = cl * cr;
                            if (coeff === 0) continue;

                            let variable = '';
                            if (vl && vr) {
                                // 变量部分排序，相同字母合并为指数形式
                                let vars = [vl, vr];
                                vars.sort();
                                if (vars[0] === vars[1]) {
                                    variable = vars[0] + '^2';
                                } else {
                                    variable = vars.join('');
                                }
                            } else if (vl) {
                                variable = vl;
                            } else if (vr) {
                                variable = vr;
                            }

                            // 构造项字符串
                            let termStr = '';
                            if (coeff === 1 && variable !== '') {
                                termStr = variable;
                            } else if (coeff === -1 && variable !== '') {
                                termStr = '-' + variable;
                            } else {
                                termStr = coeff.toString() + (variable ? variable : '');
                            }
                            productTerms.push(termStr);
                        }
                    }

                    let result = productTerms.join('+');
                    return this.ctx._simplifyExpression(result);
                }
                return expression;
            } catch (error) {
                return this.ctx._handleError("EquationSimplifyError");
            }
        }

        EquationValue(args) {
            try {
                let expression = String(args.Expression).trim();
                const variable = String(args.Variable || 'x').trim();
                const value = String(args.Value);
                // 验证变量名是否为合法字母
                if (!/^[a-zA-Z]$/.test(variable)) {
                    return this.ctx._handleError("EquationInvalidVariable");
                }
                // 替换变量为数值（保留高精度）
                const regex = new RegExp(`\\b${variable}\\b`, 'g');
                expression = expression.replace(regex, value);
                // 预处理表达式（统一运算符，去除空格）
                expression = this.ctx._preprocessExpression(expression);
                // 使用安全求值器计算
                const result = this.ctx._evaluateSimpleExpression(expression);
                return result;
            } catch (error) {
                return this.ctx._handleError("EquationValueError");
            }
        }

        EquationSolve(args) {
            try {
                const equation = String(args.Equation).trim();
                const { expr, variable } = this.ctx._normalizeEquation(equation);
                if (!variable) {
                    return this.ctx._handleError("EquationSolveError", "simple", true, "未找到变量");
                }

                // 尝试将表达式解析为有理函数（多项式或分式）
                // 简单策略：检测是否包含除法运算符 "/"
                if (expr.includes('/')) {
                    // 分式方程：交叉相乘化为整式
                    return this.ctx._solveFractionalEquation(expr, variable);
                } else {
                    // 整式方程：解析为多项式
                    return this.ctx._solvePolynomialEquation(expr, variable);
                }
            } catch (error) {
                return this.ctx._handleError("EquationSolveError");
            }
        }

        EquationRoots(args) {
            try {
                // 直接调用 EquationSolve，然后提取根
                // 注意：参数键必须为 Equation（大写 E），与 EquationSolve 内部读取的 args.Equation 一致
                const solution = this.ctx.EquationSolve({ Equation: args.Equation });
                // 如果返回的是 "无实数根" 或 "无穷多解" 等，直接返回
                if (solution.includes("无实") || solution.includes("无穷") || solution === "无解") {
                    return solution;
                }
                // 提取根值
                const match = solution.match(/([^=]+)=\s*([^,]+)(?:,\s*[^=]+=\s*(.+))?/);
                if (!match) return solution;
                const root1 = match[2].trim();
                const root2 = match[3] ? match[3].trim() : null;
                return root2 ? `x₁ = ${root1}, x₂ = ${root2}` : root1;
            } catch (error) {
                return this.ctx._handleError("EquationSolveError");
            }
        }

        EquationNthRoot(args) {
            try {
                const solution = this.ctx.EquationSolve({ Equation: args.Equation });
                // 无解情况直接返回
                if (solution.includes("无实") || solution.includes("无穷") || solution === "无解") {
                    return solution;
                }
                // 从解字符串中提取所有根值
                // 格式可能是 "x = 5" 或 "x₁ = 2, x₂ = 3"
                const roots = [];
                const regex = /=\s*([^,]+)/g;
                let m;
                while ((m = regex.exec(solution)) !== null) {
                    roots.push(m[1].trim());
                }
                if (roots.length === 0) return solution;

                const index = parseInt(args.Index);
                if (isNaN(index) || index < 1 || index > roots.length) {
                    return this.ctx._handleError("EquationSolveError", "simple", true, "解的序号超出范围");
                }
                return roots[index - 1];
            } catch (error) {
                return this.ctx._handleError("EquationSolveError");
            }
        }
    }

    // ===== FunctionOps 函数运算 =====
    class FunctionOps {
        constructor(ctx) {
            this.ctx = ctx;
        }

        /**
         * BooleanCompare - 精确比较两个值是否完全相等
         * 不使用 === 或 ==，支持所有数学类型（数字、字符串、数组、对象等）
         */
        BooleanCompare(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const result = this._deepEqual(left, right);
                return result;
            } catch (error) {
                return this.ctx._handleError("BooleanCompareError");
            }
        }

        /**
         * BooleanGreater - 比较 Left 是否大于 Right
         * 支持所有数学类型（数字、字符串、数组、对象等）
         */
        BooleanGreater(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const result = this._deepGreater(left, right);
                return result;
            } catch (error) {
                return this.ctx._handleError("BooleanGreaterError");
            }
        }

        /**
         * BooleanLess - 比较 Left 是否小于 Right
         * 支持所有数学类型（数字、字符串、数组、对象等）
         */
        BooleanLess(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const result = this._deepLess(left, right);
                return result;
            } catch (error) {
                return this.ctx._handleError("BooleanLessError");
            }
        }

        /**
         * BooleanNotEqual - 比较 Left 和 Right 是否不相等
         * 支持所有数学类型（数字、字符串、数组、对象等）
         */
        BooleanNotEqual(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const result = this._deepEqual(left, right);
                return !result;
            } catch (error) {
                return this.ctx._handleError("BooleanNotEqualError");
            }
        }

        /**
         * BooleanGreaterEqual - 比较 Left 是否大于或等于 Right
         * 支持所有数学类型（数字、字符串、数组、对象等）
         */
        BooleanGreaterEqual(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const greater = this._deepGreater(left, right);
                const equal = this._deepEqual(left, right);
                return greater || equal;
            } catch (error) {
                return this.ctx._handleError("BooleanGreaterEqualError");
            }
        }

        /**
         * BooleanLessEqual - 比较 Left 是否小于或等于 Right
         * 支持所有数学类型（数字、字符串、数组、对象等）
         */
        BooleanLessEqual(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const less = this._deepLess(left, right);
                const equal = this._deepEqual(left, right);
                return less || equal;
            } catch (error) {
                return this.ctx._handleError("BooleanLessEqualError");
            }
        }

        /**
         * BooleanTrue - 始终返回 true（成立）
         */
        BooleanTrue(args) {
            try {
                return true;
            } catch (error) {
                return this.ctx._handleError("BooleanTrueError");
            }
        }

        /**
         * BooleanFalse - 始终返回 false（不成立）
         */
        BooleanFalse(args) {
            try {
                return false;
            } catch (error) {
                return this.ctx._handleError("BooleanFalseError");
            }
        }

        /**
         * BooleanRandom - 以指定概率返回 true
         * 参数 Number 表示概率百分比（0-100）
         */
        BooleanRandom(args) {
            try {
                const percent = parseFloat(args.Number) || 0;
                // 限制概率范围在 0-100 之间
                const clamped = Math.max(0, Math.min(100, percent));
                // 生成 0-100 之间的随机数，如果小于等于概率值则返回 true
                const random = Math.random() * 100;
                return random <= clamped;
            } catch (error) {
                return this.ctx._handleError("BooleanRandomError");
            }
        }

        /**
         * BooleanTypeCheck - 判断给定值是否为指定的类型
         */
        BooleanTypeCheck(args) {
            try {
                const value = args.Text;
                const type = args.Type;
                // 类型判断逻辑
                switch (type) {
                    case "数字":
                        return typeof value === "number" && !isNaN(value);
                    case "大整数":
                        return typeof value === "bigint" || (typeof value === "number" && Number.isInteger(value) && Math.abs(value) > Number.MAX_SAFE_INTEGER);
                    case "高精度":
                        return typeof value === "number" && !Number.isInteger(value) && String(value).length > 10;
                    case "虚数":
                        return typeof value === "string" && /^\d+[iI]$/.test(value);
                    case "复数":
                        return typeof value === "string" && /^\d+[+-]\d+[iI]$/.test(value);
                    case "范围":
                        return typeof value === "string" && /^\[.*,.*\]$/.test(value);
                    case "分数":
                        return typeof value === "string" && /^\d+\/\d+$/.test(value);
                    case "循环小数":
                        return typeof value === "string" && /^\d+\.\d+\(\d+\)$/.test(value);
                    case "带分数":
                        return typeof value === "string" && /^\d+\s+\d+\/\d+$/.test(value);
                    case "布尔":
                        return typeof value === "boolean";
                    case "文本":
                        return typeof value === "string";
                    case "向量":
                        return Array.isArray(value) && value.every(v => typeof v === "number");
                    case "矩阵":
                        return Array.isArray(value) && value.every(row => Array.isArray(row) && row.every(v => typeof v === "number"));
                    case "角度":
                        return typeof value === "number" && value >= 0 && value <= 360;
                    case "整数":
                        return typeof value === "number" && Number.isInteger(value);
                    case "小数":
                        return typeof value === "number" && !Number.isInteger(value);
                    case "正数":
                        return typeof value === "number" && value > 0;
                    case "负数":
                        return typeof value === "number" && value < 0;
                    case "非数字":
                        return typeof value === "number" && isNaN(value);
                    case "无定义":
                        return typeof value === "undefined";
                    case "空值":
                        return value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
                    default:
                        return false;
                }
            } catch (e) {
                return this.ctx._handleError("BooleanTypeCheckError");
            }
        }

        /**
         * BooleanApproxEqual - 判断 RealNumber 是否在 Number 的 ±Diff 范围内
         */
        BooleanApproxEqual(args) {
            try {
                const real = parseFloat(args.RealNumber);
                const num = parseFloat(args.Number);
                const diff = parseFloat(args.Diff);
                if (isNaN(real) || isNaN(num) || isNaN(diff) || diff < 0) {
                    return false;
                }
                return Math.abs(real - num) <= diff;
            } catch (e) {
                return this.ctx._handleError("BooleanApproxEqualError");
            }
        }

        /**
         * BooleanAnd - 逻辑与
         */
        BooleanAnd(args) {
            try {
                const b1 = args.Boolean1;
                const b2 = args.Boolean2;
                // 将输入转换为布尔值（支持字符串 true/false、数字 0/1 等）
                const val1 = (typeof b1 === "string") ? (b1.toLowerCase() === "true" || b1 === "1") : !!b1;
                const val2 = (typeof b2 === "string") ? (b2.toLowerCase() === "true" || b2 === "1") : !!b2;
                return val1 && val2;
            } catch (e) {
                return this.ctx._handleError("BooleanAndError");
            }
        }

        /**
         * BooleanOr - 逻辑或
         */
        BooleanOr(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                // 将输入转换为布尔值（支持字符串 true/false、数字 0/1 等）
                const val1 = (typeof left === "string") ? (left.toLowerCase() === "true" || left === "1") : !!left;
                const val2 = (typeof right === "string") ? (right.toLowerCase() === "true" || right === "1") : !!right;
                return val1 || val2;
            } catch (e) {
                return this.ctx._handleError("BooleanOrError");
            }
        }

        /**
         * BooleanNot - 逻辑非
         */
        BooleanNot(args) {
            try {
                const val = args.Boolean;
                // 将输入转换为布尔值（支持字符串 true/false、数字 0/1 等）
                const boolVal = (typeof val === "string") ? (val.toLowerCase() === "true" || val === "1") : !!val;
                return !boolVal;
            } catch (e) {
                return this.ctx._handleError("BooleanNotError");
            }
        }

        /**
         * BooleanNotAnd - 非 Left 与 Right
         */
        BooleanNotAnd(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const val1 = (typeof left === "string") ? (left.toLowerCase() === "true" || left === "1") : !!left;
                const val2 = (typeof right === "string") ? (right.toLowerCase() === "true" || right === "1") : !!right;
                return !val1 && val2;
            } catch (e) {
                return this.ctx._handleError("BooleanNotAndError");
            }
        }

        /**
         * BooleanNotOr - 非 Left 或 Right
         */
        BooleanNotOr(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const val1 = (typeof left === "string") ? (left.toLowerCase() === "true" || left === "1") : !!left;
                const val2 = (typeof right === "string") ? (right.toLowerCase() === "true" || right === "1") : !!right;
                return !val1 || val2;
            } catch (e) {
                return this.ctx._handleError("BooleanNotOrError");
            }
        }

        /**
         * BooleanAndNot - Left 非与 Right（Left && !Right）
         */
        BooleanAndNot(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const val1 = (typeof left === "string") ? (left.toLowerCase() === "true" || left === "1") : !!left;
                const val2 = (typeof right === "string") ? (right.toLowerCase() === "true" || right === "1") : !!right;
                return val1 && !val2;
            } catch (e) {
                return this.ctx._handleError("BooleanAndNotError");
            }
        }

        /**
         * BooleanOrNot - Left 非或 Right（Left || !Right）
         */
        BooleanOrNot(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const val1 = (typeof left === "string") ? (left.toLowerCase() === "true" || left === "1") : !!left;
                const val2 = (typeof right === "string") ? (right.toLowerCase() === "true" || right === "1") : !!right;
                return val1 || !val2;
            } catch (e) {
                return this.ctx._handleError("BooleanOrNotError");
            }
        }

        /**
         * BooleanXnor - 逻辑同或
         */
        BooleanXnor(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const val1 = (typeof left === "string") ? (left.toLowerCase() === "true" || left === "1") : !!left;
                const val2 = (typeof right === "string") ? (right.toLowerCase() === "true" || right === "1") : !!right;
                return val1 === val2;
            } catch (e) {
                return this.ctx._handleError("BooleanXnorError");
            }
        }

        /**
         * BooleanXor - 逻辑异或
         */
        BooleanXor(args) {
            try {
                const left = args.Left;
                const right = args.Right;
                const val1 = (typeof left === "string") ? (left.toLowerCase() === "true" || left === "1") : !!left;
                const val2 = (typeof right === "string") ? (right.toLowerCase() === "true" || right === "1") : !!right;
                return val1 !== val2;
            } catch (e) {
                return this.ctx._handleError("BooleanXorError");
            }
        }

        /**
         * BooleanIsTrue - 判断值转换为布尔值是否为 true
         * 0、null、undefined、NaN、Infinity、空字符串 -> false
         * 非0数字、非空值、非NaN、非Infinity、非空字符串 -> true
         */
        BooleanIsTrue(args) {
            try {
                const value = args.Text;
                // 将输入转换为布尔值
                // 对于字符串，先尝试转换为数字，如果无法转换则直接使用 !!value
                if (typeof value === "string") {
                    const trimmed = value.trim();
                    if (trimmed === "") return false; // 空字符串 -> false
                    const num = parseFloat(trimmed);
                    if (!isNaN(num) && isFinite(num)) {
                        // 如果是有效数字，判断是否非0
                        return num !== 0;
                    }
                    // 非数字字符串：非空字符串视为 true
                    return true;
                }
                // 非字符串类型：使用标准布尔转换
                return !!value;
            } catch (e) {
                return this.ctx._handleError("BooleanIsTrueError");
            }
        }

        /**
         * 深度精确比较两个值
         * 支持：数字、字符串、布尔值、null、undefined、数组、对象、Date、RegExp、Function
         * 处理 NaN、Infinity 等特殊值
         */
        _deepEqual(a, b, seen = new WeakMap()) {
            // 1. 处理原始类型（使用 Object.is 语义）
            if (a === b) {
                // 处理 +0 和 -0 的区别
                if (a === 0 && b === 0) {
                    return 1 / a === 1 / b;
                }
                return true;
            }

            // 2. 处理 NaN
            if (typeof a === 'number' && typeof b === 'number') {
                if (isNaN(a) && isNaN(b)) return true;
                // 处理 Infinity 和 -Infinity
                if (a === Infinity && b === Infinity) return true;
                if (a === -Infinity && b === -Infinity) return true;
            }

            // 3. 处理 null 和 undefined
            if (a === null || b === null || a === undefined || b === undefined) {
                return false;
            }

            // 4. 类型转换：如果一个是数字，另一个是数字字符串，将字符串转为数字
            const typeA = typeof a;
            const typeB = typeof b;
            if (typeA === 'number' && typeB === 'string') {
                const numB = parseFloat(b);
                if (!isNaN(numB) && b.trim() === String(numB)) {
                    return this._deepEqual(a, numB, seen);
                }
            }
            if (typeA === 'string' && typeB === 'number') {
                const numA = parseFloat(a);
                if (!isNaN(numA) && a.trim() === String(numA)) {
                    return this._deepEqual(numA, b, seen);
                }
            }

            // 5. 类型不同则不等
            if (typeA !== typeB) return false;

            // 5. 处理基本类型（string, boolean, number）
            if (typeA !== 'object') {
                // 对于 number 类型，已经处理过 NaN 和 Infinity
                return a === b;
            }

            // 6. 处理循环引用
            if (seen.has(a) || seen.has(b)) {
                return seen.get(a) === b || seen.get(b) === a;
            }

            // 7. 处理 Date
            if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime();
            }
            if (a instanceof Date || b instanceof Date) return false;

            // 8. 处理 RegExp
            if (a instanceof RegExp && b instanceof RegExp) {
                return a.source === b.source && a.flags === b.flags;
            }
            if (a instanceof RegExp || b instanceof RegExp) return false;

            // 9. 处理 Function
            if (typeof a === 'function' && typeof b === 'function') {
                return a.toString() === b.toString();
            }
            if (typeof a === 'function' || typeof b === 'function') return false;

            // 10. 处理数组
            if (Array.isArray(a) && Array.isArray(b)) {
                if (a.length !== b.length) return false;
                seen.set(a, b);
                seen.set(b, a);
                for (let i = 0; i < a.length; i++) {
                    if (!this._deepEqual(a[i], b[i], seen)) return false;
                }
                return true;
            }
            if (Array.isArray(a) || Array.isArray(b)) return false;

            // 11. 处理对象
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length) return false;

            seen.set(a, b);
            seen.set(b, a);

            for (const key of keysA) {
                if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
                if (!this._deepEqual(a[key], b[key], seen)) return false;
            }

            return true;
        }

        /**
         * 深度比较 a 是否大于 b
         * 支持：数字、字符串、数组（按字典序比较）、对象（按属性比较）
         */
        _deepGreater(a, b, seen = new WeakMap()) {
            // 1. 处理数字
            if (typeof a === 'number' && typeof b === 'number') {
                // 处理 NaN：NaN 不大于任何值
                if (isNaN(a) || isNaN(b)) return false;
                return a > b;
            }

            // 2. 处理字符串（按字典序）
            if (typeof a === 'string' && typeof b === 'string') {
                return a > b;
            }

            // 3. 处理布尔值（true > false）
            if (typeof a === 'boolean' && typeof b === 'boolean') {
                return a && !b;
            }

            // 4. 类型不同，尝试转换：如果一个是数字，另一个是数字字符串
            const typeA = typeof a;
            const typeB = typeof b;
            if (typeA === 'number' && typeB === 'string') {
                const numB = parseFloat(b);
                if (!isNaN(numB) && b.trim() === String(numB)) {
                    return this._deepGreater(a, numB, seen);
                }
            }
            if (typeA === 'string' && typeB === 'number') {
                const numA = parseFloat(a);
                if (!isNaN(numA) && a.trim() === String(numA)) {
                    return this._deepGreater(numA, b, seen);
                }
            }

            // 5. 处理循环引用
            if (seen.has(a) || seen.has(b)) {
                return false;
            }

            // 6. 处理数组（按字典序比较，逐个元素比较）
            if (Array.isArray(a) && Array.isArray(b)) {
                seen.set(a, b);
                seen.set(b, a);
                const len = Math.min(a.length, b.length);
                for (let i = 0; i < len; i++) {
                    const cmp = this._deepGreater(a[i], b[i], seen);
                    if (cmp) return true;
                    // 检查是否相等（使用 _deepEqual）
                    if (!this._deepEqual(a[i], b[i])) {
                        return false; // 当前元素小于 b[i]
                    }
                }
                return a.length > b.length;
            }

            // 7. 处理对象（按属性数量、键名、键值比较）
            if (typeof a === 'object' && typeof b === 'object') {
                if (a === null || b === null) return false;
                
                // 处理循环引用
                if (seen.has(a) || seen.has(b)) {
                    return false;
                }
                seen.set(a, b);
                seen.set(b, a);
                
                const keysA = Object.keys(a);
                const keysB = Object.keys(b);
                
                // 先比较键的数量
                if (keysA.length !== keysB.length) {
                    return keysA.length > keysB.length;
                }
                
                // 按键名排序后逐个比较
                const sortedKeysA = keysA.slice().sort();
                const sortedKeysB = keysB.slice().sort();
                for (let i = 0; i < sortedKeysA.length; i++) {
                    const keyA = sortedKeysA[i];
                    const keyB = sortedKeysB[i];
                    if (keyA !== keyB) {
                        return keyA > keyB;
                    }
                    const cmp = this._deepGreater(a[keyA], b[keyB], seen);
                    if (cmp) return true;
                    if (!this._deepEqual(a[keyA], b[keyB])) {
                        return false;
                    }
                }
                return false; // 完全相等
            }

            // 8. 处理 Date
            if (a instanceof Date && b instanceof Date) {
                return a.getTime() > b.getTime();
            }

            // 9. 类型不同或无法比较，返回 false
            return false;
        }

        /**
         * 深度比较 a 是否小于 b
         * 复用 _deepGreater 和 _deepEqual 逻辑
         */
        _deepLess(a, b) {
            // 如果 a > b 为 false，且 a == b 为 false，则 a < b
            const greater = this._deepGreater(a, b);
            const equal = this._deepEqual(a, b);
            return !greater && !equal;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    //  ✦ 设置面板 — 暗色主题样式注入
    // ═══════════════════════════════════════════════════════════════

    const MATH_SETTINGS_STYLE_ID = 'math-extension-settings-styles';

    if (!document.getElementById(MATH_SETTINGS_STYLE_ID)) {
        const style = document.createElement('style');
        style.id = MATH_SETTINGS_STYLE_ID;
        style.textContent = `
        /* ── 遮罩层 ── */
        .math-settings-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        padding: 20px;
        animation: mathFadeIn 0.25s ease;
        backdrop-filter: blur(4px);
        }

        /* ── 主弹窗（大长方体） ── */
        .math-settings-modal {
        background: #181825;
        color: #cdd6f4;
        border-radius: 16px;
        box-shadow: 0 40px 120px rgba(0, 0, 0, 0.85);
        width: 1200px;
        max-width: 1200px;
        height: 580px;
        max-height: 88vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        animation: mathSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        border: 1px solid #313244;
        }

        /* ── 头部 ── */
        .math-settings-header {
        padding: 18px 32px;
        border-bottom: 1px solid #2a2a3e;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
        background: #1c1c2e;
        min-height: 60px;
        }
        .math-settings-title {
        font-size: 20px;
        font-weight: 700;
        margin: 0;
        color: #cdd6f4;
        letter-spacing: 0.5px;
        background: linear-gradient(135deg, #89b4fa, #b4befe, #74a7f5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        }
        .math-settings-close {
        background: rgba(255, 255, 255, 0.05);
        border: none;
        font-size: 22px;
        cursor: pointer;
        color: #6c7086;
        padding: 4px 14px;
        border-radius: 8px;
        transition: all 0.3s ease;
        line-height: 1.4;
        }
        .math-settings-close:hover {
        color: #f38ba8;
        background: rgba(243, 139, 168, 0.15);
        transform: rotate(90deg);
        }

        /* ── 主体区域（横向布局） ── */
        .math-settings-body {
        padding: 0;
        overflow: hidden;
        flex: 1;
        display: flex;
        flex-direction: row;
        min-height: 0;
        }

        /* ── 左侧导航（竖向） ── */
        .math-settings-sidebar {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 24px 16px;
        min-width: 200px;
        width: 220px;
        flex-shrink: 0;
        background: #14141f;
        border-right: 1px solid #2a2a3e;
        }
        .math-settings-nav-btn {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        background: transparent;
        border: none;
        border-radius: 10px;
        color: #a6adc8;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.25s ease;
        width: 100%;
        min-width: 0;
        text-align: left;
        font-family: inherit;
        position: relative;
        }
        .math-settings-nav-btn::before {
        content: '';
        position: absolute;
        left: 0;
        top: 20%;
        height: 60%;
        width: 4px;
        border-radius: 0 4px 4px 0;
        background: transparent;
        transition: all 0.3s ease;
        }
        .math-settings-nav-btn .nav-icon {
        font-size: 20px;
        opacity: 0.5;
        transition: all 0.3s ease;
        }
        .math-settings-nav-btn .nav-label {
        flex: 0 0 auto;
        white-space: nowrap;
        font-size: 15px;
        }
        .math-settings-nav-btn .nav-badge {
        font-size: 11px;
        background: rgba(137, 180, 250, 0.15);
        color: #89b4fa;
        padding: 2px 10px;
        border-radius: 12px;
        font-weight: 600;
        }
        .math-settings-nav-btn:hover {
        background: rgba(137, 180, 250, 0.08);
        color: #cdd6f4;
        transform: translateX(2px);
        }
        .math-settings-nav-btn:hover .nav-icon {
        opacity: 1;
        transform: scale(1.1);
        }
        .math-settings-nav-btn.active {
        background: rgba(137, 180, 250, 0.14);
        color: #89b4fa;
        box-shadow: inset 0 1px 0 rgba(137, 180, 250, 0.05);
        }
        .math-settings-nav-btn.active::before {
        background: #89b4fa;
        box-shadow: 0 0 16px rgba(137, 180, 250, 0.4);
        }
        .math-settings-nav-btn.active .nav-icon {
        opacity: 1;
        }
        .math-settings-nav-btn.active .nav-badge {
        background: rgba(137, 180, 250, 0.25);
        }

        /* ── 右侧内容 ── */
        .math-settings-content {
        flex: 1;
        padding: 24px 32px 24px 28px;
        overflow-y: auto;
        min-width: 0;
        background: #1a1a2e;
        }
        .math-settings-content::-webkit-scrollbar {
        width: 6px;
        }
        .math-settings-content::-webkit-scrollbar-track {
        background: transparent;
        }
        .math-settings-content::-webkit-scrollbar-thumb {
        background: #313244;
        border-radius: 10px;
        }
        .math-settings-content::-webkit-scrollbar-thumb:hover {
        background: #45475a;
        }

        /* ── 通用组件 ── */
        .math-settings-note {
        font-size: 13px;
        color: #a6adc8;
        margin: 0 0 22px;
        line-height: 1.6;
        padding: 14px 18px;
        background: rgba(108, 112, 134, 0.08);
        border-radius: 10px;
        border-left: 4px solid #89b4fa;
        }
        .math-settings-section {
        margin-bottom: 24px;
        }
        .math-settings-section:last-child {
        margin-bottom: 0;
        }
        .math-settings-section-title {
        font-size: 12px;
        font-weight: 700;
        color: #89b4fa;
        margin: 0 0 10px;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        opacity: 0.9;
        }

        /* ── 设置项 ── */
        .math-setting-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid rgba(42, 42, 62, 0.5);
        gap: 16px;
        transition: all 0.2s ease;
        }
        .math-setting-item:hover {
        background: rgba(255, 255, 255, 0.02);
        margin: 0 -6px;
        padding: 12px 6px;
        border-radius: 8px;
        }
        .math-setting-item:last-child {
        border-bottom: none;
        }
        .math-setting-label {
        font-size: 14px;
        flex: 1;
        color: #cdd6f4;
        }
        .math-setting-label-text {
        display: block;
        font-weight: 500;
        }
        .math-setting-desc {
        font-size: 12px;
        color: #6c7086;
        display: block;
        margin-top: 3px;
        font-weight: 400;
        }

        /* ── 开关组件 ── */
        .math-toggle {
        display: flex;
        align-items: center;
        gap: 14px;
        cursor: pointer;
        flex-shrink: 0;
        user-select: none;
        padding: 4px 0;
        }
        .math-toggle-track {
        width: 48px;
        height: 26px;
        background: #313244;
        border-radius: 13px;
        position: relative;
        transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .math-toggle-track.active {
        background: #89b4fa;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 24px rgba(137, 180, 250, 0.2);
        }
        .math-toggle-knob {
        width: 20px;
        height: 20px;
        background: #cdd6f4;
        border-radius: 50%;
        position: absolute;
        top: 3px;
        left: 3px;
        transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }
        .math-toggle-track.active .math-toggle-knob {
        transform: translateX(22px);
        background: #ffffff;
        box-shadow: 0 2px 12px rgba(137, 180, 250, 0.4);
        }
        .math-toggle-status {
        font-size: 12px;
        color: #6c7086;
        min-width: 32px;
        font-weight: 600;
        transition: color 0.3s ease;
        }
        .math-toggle.active .math-toggle-status {
        color: #89b4fa;
        }

        /* ── 计算标签页 ── */
        .math-settings-compute {
        display: flex;
        flex-direction: column;
        gap: 18px;
        padding-top: 4px;
        }
        .math-setting-item-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 0;
        border-bottom: 1px solid rgba(42, 42, 62, 0.5);
        gap: 24px;
        transition: all 0.2s ease;
        }
        .math-setting-item-row:hover {
        background: rgba(255, 255, 255, 0.02);
        margin: 0 -6px;
        padding: 14px 6px;
        border-radius: 8px;
        }
        .math-setting-item-row:last-child {
        border-bottom: none;
        }
        .math-setting-item-row .math-setting-label {
        flex: 0 0 auto;
        font-weight: 500;
        font-size: 14px;
        min-width: 180px;
        }
        .math-settings-input,
        .math-settings-select {
        background: #1e1e32;
        border: 1px solid #313244;
        color: #cdd6f4;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-family: inherit;
        transition: all 0.25s ease;
        min-width: 100px;
        }
        .math-settings-input:focus,
        .math-settings-select:focus {
        outline: none;
        border-color: #89b4fa;
        box-shadow: 0 0 0 4px rgba(137, 180, 250, 0.12);
        transform: scale(1.02);
        }
        .math-settings-input {
        width: 90px;
        }
        .math-settings-select {
        min-width: 160px;
        cursor: pointer;
        }
        .math-settings-select option {
        background: #1a1a2e;
        padding: 4px;
        }

        /* ── 底部按钮 ── */
        .math-settings-footer {
        padding: 16px 32px 20px;
        border-top: 1px solid #2a2a3e;
        display: flex;
        justify-content: flex-end;
        gap: 14px;
        flex-shrink: 0;
        background: #1c1c2e;
        }
        .math-settings-btn {
        padding: 10px 30px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s ease;
        letter-spacing: 0.3px;
        }
        .math-settings-btn:active {
        transform: scale(0.94);
        }
        .math-settings-btn-primary {
        background: linear-gradient(135deg, #89b4fa, #74a7f5);
        color: #1a1a2e;
        box-shadow: 0 4px 20px rgba(137, 180, 250, 0.3);
        }
        .math-settings-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 28px rgba(137, 180, 250, 0.45);
        background: linear-gradient(135deg, #b4befe, #89b4fa);
        }
        .math-settings-btn-secondary {
        background: #313244;
        color: #cdd6f4;
        }
        .math-settings-btn-secondary:hover {
        background: #45475a;
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        /* ── 动画关键帧 ── */
        @keyframes mathFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
        }
        @keyframes mathSlideUp {
        from { transform: translateY(50px) scale(0.95); opacity: 0; }
        to   { transform: translateY(0) scale(1); opacity: 1; }
        }
    `;
        document.head.appendChild(style);
    }

    // ═══════════════════════════════════════════════════════════════
    //  ✦ 设置面板 — 弹窗控制器
    // ═══════════════════════════════════════════════════════════════

    class MathSettingsModal {
        /**
         * @param {Object} config
         * @param {string} config.title          - 弹窗标题
         * @param {string} config.note           - 顶部提示文字
         * @param {Object} config.initialValues  - 初始值
         * @param {Array}  config.sections       - 积木调整分组配置
         * @param {Function} config.onSave       - 保存回调
         * @param {Function} config.onCancel     - 取消回调
         * @param {Function} config.onChange     - 值变更回调
         */
        constructor(config) {
            this.config = config;
            this.values = { ...config.initialValues };
            this.onSave = config.onSave || (() => { });
            this.onCancel = config.onCancel || (() => { });
            this.activeTab = 'blocks';

            this._buildModal();
            this._render();
            this._bindEvents();
            this._open();
        }

        // ─── DOM 构建 ──────────────────────────────────────────────

        _buildModal() {
            this.overlay = document.createElement('div');
            this.overlay.className = 'math-settings-overlay';

            this.modal = document.createElement('div');
            this.modal.className = 'math-settings-modal';

            // 头部
            const header = document.createElement('div');
            header.className = 'math-settings-header';

            const title = document.createElement('h2');
            title.className = 'math-settings-title';
            title.textContent = this.config.title || '⚙ 设置面板';

            const closeBtn = document.createElement('button');
            closeBtn.className = 'math-settings-close';
            closeBtn.textContent = '✕';
            closeBtn.dataset.action = 'close';

            header.append(title, closeBtn);

            // 主体容器（横向 flex）
            this.body = document.createElement('div');
            this.body.className = 'math-settings-body';

            // 左侧导航
            this.sidebar = document.createElement('div');
            this.sidebar.className = 'math-settings-sidebar';

            const navItems = [
                { id: 'testmathextension', label: '积木调整', icon: '🧩', badge: '12' },
                { id: 'testmathextension', label: '计算处理', icon: '🧮', badge: '3' }
            ];

            this.navButtons = [];
            for (const item of navItems) {
                const btn = document.createElement('button');
                btn.className = 'math-settings-nav-btn';
                btn.dataset.tab = item.id;

                const iconSpan = document.createElement('span');
                iconSpan.className = 'nav-icon';
                iconSpan.textContent = item.icon;

                const labelSpan = document.createElement('span');
                labelSpan.className = 'nav-label';
                labelSpan.textContent = item.label;

                const badgeSpan = document.createElement('span');
                badgeSpan.className = 'nav-badge';
                badgeSpan.textContent = item.badge;

                btn.append(iconSpan, labelSpan, badgeSpan);
                this.sidebar.appendChild(btn);
                this.navButtons.push(btn);
            }

            // 右侧内容
            this.content = document.createElement('div');
            this.content.className = 'math-settings-content';

            this.body.append(this.sidebar, this.content);
            this.modal.appendChild(this.body);

            // 底部按钮
            const footer = document.createElement('div');
            footer.className = 'math-settings-footer';

            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'math-settings-btn math-settings-btn-secondary';
            cancelBtn.textContent = '取消';
            cancelBtn.dataset.action = 'cancel';

            const selectAllBtn = document.createElement('button');
            selectAllBtn.className = 'math-settings-btn math-settings-btn-secondary';
            selectAllBtn.textContent = '全选';
            selectAllBtn.dataset.action = 'selectAll';

            const saveBtn = document.createElement('button');
            saveBtn.className = 'math-settings-btn math-settings-btn-primary';
            saveBtn.textContent = '✓ 保存设置';
            saveBtn.dataset.action = 'save';

            footer.append(cancelBtn, selectAllBtn, saveBtn);
            this.modal.appendChild(footer);
            this.overlay.appendChild(this.modal);
        }

        // ─── 事件绑定 ──────────────────────────────────────────────

        _bindEvents() {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) this.close(false);
            });

            this.modal.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                if (action === 'close' || action === 'cancel') {
                    this.close(false);
                } else if (action === 'save') {
                    this.close(true);
                } else if (action === 'selectAll') {
                    this._handleSelectAll();
                }
            });

            this.sidebar.addEventListener('click', (e) => {
                const btn = e.target.closest('.math-settings-nav-btn');
                if (!btn) return;
                const tab = btn.dataset.tab;
                this.activeTab = tab;
                this.navButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
                this._renderContent();
            });

            this.content.addEventListener('click', (e) => {
                const toggle = e.target.closest('.math-toggle');
                if (!toggle) return;
                const key = toggle.dataset.key;
                this._setValue(key, !this.values[key]);
            });

            this.content.addEventListener('change', (e) => {
                const target = e.target;

                if (target.classList.contains('math-settings-input')) {
                    const key = target.dataset.key;
                    const val = parseInt(target.value, 10);
                    if (!isNaN(val) && val >= 0) {
                        this.values[key] = val;
                        this._notifyChange(key, val);
                    }
                    return;
                }

                if (target.classList.contains('math-settings-select')) {
                    const key = target.dataset.key;
                    let val = target.value;
                    if (key === 'supportBoolean') val = val === 'true';
                    this.values[key] = val;
                    this._notifyChange(key, val);
                }
            });

            this._escHandler = (e) => {
                if (e.key === 'Escape') this.close(false);
            };
            document.addEventListener('keydown', this._escHandler);
        }

        // ─── 渲染引擎 ──────────────────────────────────────────────

        _render() {
            this.body.innerHTML = '';
            this.body.append(this.sidebar, this.content);
            this._renderContent();
            // 默认激活第一个导航按钮
            if (this.navButtons.length) {
                this.navButtons[0].classList.add('active');
            }
        }

        _renderContent() {
            this.content.innerHTML = '';
            if (this.activeTab === 'blocks') {
                this._renderBlocksTab();
            } else {
                this._renderComputeTab();
            }
        }

        // ─── 积木调整标签页 ──────────────────────────────────────

        _renderBlocksTab() {
            if (this.config.note) {
                const note = document.createElement('p');
                note.className = 'math-settings-note';
                note.textContent = this.config.note;
                this.content.appendChild(note);
            }

            for (const section of (this.config.sections || [])) {
                const sectionEl = document.createElement('div');
                sectionEl.className = 'math-settings-section';

                if (section.title) {
                    const titleEl = document.createElement('div');
                    titleEl.className = 'math-settings-section-title';
                    titleEl.textContent = section.title;
                    sectionEl.appendChild(titleEl);
                }

                for (const field of (section.fields || [])) {
                    const item = this._createSettingItem(field);
                    if (item) sectionEl.appendChild(item);
                }

                this.content.appendChild(sectionEl);
            }
        }

        // ─── 计算处理标签页 ──────────────────────────────────────

        _renderComputeTab() {
            const container = document.createElement('div');
            container.className = 'math-settings-compute';

            // 添加说明信息
            const infoBox = document.createElement('div');
            infoBox.className = 'math-settings-info-box';
            infoBox.style.cssText = `
            background: #f0f7ff;
            border-left: 4px solid #4a9eff;
            padding: 10px 14px;
            margin-bottom: 16px;
            border-radius: 4px;
            font-size: 13px;
            color: #1a1a1a;
            line-height: 1.5;
        `;
            infoBox.textContent = '💡 计算处理设置说明：修改后立即生效，影响所有相关运算积木的行为。';
            container.appendChild(infoBox);

            // 精度设置
            const precisionWrapper = document.createElement('div');
            precisionWrapper.className = 'math-setting-wrapper';
            precisionWrapper.style.cssText = 'margin-bottom: 14px;';

            const precisionItem = this._createRowItem('精度设置', 'precision', 'number', this.values.precision ?? 10);
            precisionWrapper.appendChild(precisionItem);

            const precisionDesc = document.createElement('div');
            precisionDesc.style.cssText = `
            font-size: 12px;
            color: #888;
            padding: 2px 0 0 0;
            margin-left: 0;
            line-height: 1.4;
        `;
            precisionDesc.textContent = '控制计算结果保留的小数位数，默认 10 位，设置为 0 表示不限制。';
            precisionWrapper.appendChild(precisionDesc);
            container.appendChild(precisionWrapper);

            // 支持布尔值进入运算
            const boolWrapper = document.createElement('div');
            boolWrapper.className = 'math-setting-wrapper';
            boolWrapper.style.cssText = 'margin-bottom: 14px;';

            const boolItem = this._createSelectItem(
                '支持布尔值进入运算',
                'supportBoolean',
                [
                    { value: 'true', label: '✓ 支持' },
                    { value: 'false', label: '✗ 不支持' }
                ],
                this.values.supportBoolean !== undefined ? String(this.values.supportBoolean) : 'false'
            );
            boolWrapper.appendChild(boolItem);

            const boolDesc = document.createElement('div');
            boolDesc.style.cssText = `
            font-size: 12px;
            color: #888;
            padding: 2px 0 0 0;
            margin-left: 0;
            line-height: 1.4;
        `;
            boolDesc.textContent = '启用后，布尔值 true/false 可参与数学运算（true=1，false=0），否则会报错。';
            boolWrapper.appendChild(boolDesc);
            container.appendChild(boolWrapper);

            // 错误处理方式
            const errorWrapper = document.createElement('div');
            errorWrapper.className = 'math-setting-wrapper';
            errorWrapper.style.cssText = 'margin-bottom: 0;';

            const errorItem = this._createSelectItem(
                '错误处理方式',
                'errorHandling',
                [
                    { value: 'false', label: '返回 false' },
                    { value: 'jsError', label: '抛出 JS 错误' },
                    { value: 'console', label: 'CCW控制台输出' }
                ],
                this.values.errorHandling || 'false'
            );
            errorWrapper.appendChild(errorItem);

            const errorDesc = document.createElement('div');
            errorDesc.style.cssText = `
            font-size: 12px;
            color: #888;
            padding: 2px 0 0 0;
            margin-left: 0;
            line-height: 1.4;
        `;
            errorDesc.textContent = '选择计算出错时的反馈方式：返回 false、抛出 JavaScript 错误，或仅输出到控制台。';
            errorWrapper.appendChild(errorDesc);
            container.appendChild(errorWrapper);

            this.content.appendChild(container);
        }

        // ─── 辅助构建方法 ──────────────────────────────────────────

        _createSettingItem(field) {
            const value = this.values[field.key] ?? field.default;

            const item = document.createElement('div');
            item.className = 'math-setting-item';

            const label = document.createElement('div');
            label.className = 'math-setting-label';

            const labelText = document.createElement('span');
            labelText.className = 'math-setting-label-text';
            labelText.textContent = field.label || field.key;
            label.appendChild(labelText);

            if (field.desc) {
                const desc = document.createElement('span');
                desc.className = 'math-setting-desc';
                desc.textContent = field.desc;
                label.appendChild(desc);
            }

            const toggle = document.createElement('div');
            toggle.className = `math-toggle${value ? ' active' : ''}`;
            toggle.dataset.key = field.key;

            const track = document.createElement('div');
            track.className = `math-toggle-track${value ? ' active' : ''}`;

            const knob = document.createElement('div');
            knob.className = 'math-toggle-knob';
            track.appendChild(knob);

            const status = document.createElement('span');
            status.className = 'math-toggle-status';
            status.textContent = value ? '开' : '关';

            toggle.append(track, status);
            item.append(label, toggle);

            return item;
        }

        _createRowItem(labelText, key, type, defaultValue) {
            const item = document.createElement('div');
            item.className = 'math-setting-item-row';

            const label = document.createElement('div');
            label.className = 'math-setting-label';
            label.textContent = labelText;

            const input = document.createElement('input');
            input.type = type;
            input.className = 'math-settings-input';
            input.dataset.key = key;
            if (type === 'number') {
                input.min = 0;
                input.step = 1;
            }
            input.value = defaultValue;

            item.append(label, input);
            return item;
        }

        _createSelectItem(labelText, key, options, defaultValue) {
            const item = document.createElement('div');
            item.className = 'math-setting-item-row';

            const label = document.createElement('div');
            label.className = 'math-setting-label';
            label.textContent = labelText;

            const select = document.createElement('select');
            select.className = 'math-settings-select';
            select.dataset.key = key;

            for (const opt of options) {
                const el = document.createElement('option');
                el.value = opt.value;
                el.textContent = opt.label;
                select.appendChild(el);
            }

            select.value = defaultValue;

            item.append(label, select);
            return item;
        }

        // ─── 值操作 ──────────────────────────────────────────────────

        _setValue(key, val) {
            this.values[key] = val;

            const toggles = this.content.querySelectorAll('.math-toggle');
            for (const toggle of toggles) {
                if (toggle.dataset.key === key) {
                    const track = toggle.querySelector('.math-toggle-track');
                    const status = toggle.querySelector('.math-toggle-status');
                    const isActive = Boolean(val);

                    toggle.classList.toggle('active', isActive);
                    track.classList.toggle('active', isActive);
                    status.textContent = isActive ? '开' : '关';
                    break;
                }
            }

            const inputs = this.content.querySelectorAll('.math-settings-input');
            for (const input of inputs) {
                if (input.dataset.key === key) {
                    input.value = val;
                    break;
                }
            }

            const selects = this.content.querySelectorAll('.math-settings-select');
            for (const select of selects) {
                if (select.dataset.key === key) {
                    select.value = String(val);
                    break;
                }
            }

            this._notifyChange(key, val);
        }

        _notifyChange(key, val) {
            if (this.config.onChange) {
                this.config.onChange(key, val, this.values);
            }
        }

        // ─── 全选逻辑 ──────────────────────────────────────────────

        _handleSelectAll() {
            const toggles = this.content.querySelectorAll('.math-setting-item .math-toggle');
            for (const toggle of toggles) {
                const key = toggle.dataset.key;
                if (key && !this.values[key]) {
                    this._setValue(key, true);
                }
            }
        }

        // ─── 生命周期 ──────────────────────────────────────────────

        _open() {
            document.body.appendChild(this.overlay);
            setTimeout(() => this.modal.focus(), 50);
        }

        close(save) {
            if (this.overlay?.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
            document.removeEventListener('keydown', this._escHandler);

            if (save) {
                this.onSave({ ...this.values });
            } else {
                this.onCancel();
            }
        }

        destroy() {
            this.close(false);
        }
    }

    class MathExtension {
        constructor() {
            this.decimal = 10;
            this.errorText = 3;
            this.runtime = Scratch.runtime;
            this.supportBoolean = false;
            this.pi = 0; // 初始化pi为0
            this.e = 0; // 初始化e为0
            this.maxLoopLimit = 1000000; // 默认安全上限

            // 设置面板 - 分区显示控制
            this._settings = {
                showSimpleOperator: true,
                showAdvancedOperator: true,
                showRangeOperator: true,
                showDecimalOperator: true,
                showFractionOperator: true,
                showTrigOperator: true,
                showProportionOperator: true,
                showBigNumberOperator: true,
                showImaginaryOperator: true,
                showComplexOperator: true,
                showVectorOperator: true,
                showEquationOperator: true,
                showMathNumber: true,
                showNumberPart: true,
                showRelationshipNumber: true,
                showNumberOther: true,
                showCombinatorics: true,
                showNumberTheory: true,
                showMatrix: true,
                showFunctionOperator: true,
                showAngleOperation: true,
                showBooleanOperator: true,
            };
            this._loadSettings();
            this._openSettings = this._openSettings.bind(this);

            // 持有专门类实例（组合模式）
            this.number = new NumberOps(this);
            this.trig = new TrigOps(this);
            this.repeatingDecimal = new RepeatingDecimalOps(this);
            this.fraction = new FractionOps(this);
            this.bigNumber = new BigNumberOps(this);
            this.imaginary = new ImaginaryOps(this);
            this.complex = new ComplexOps(this);
            this.numberTheory = new NumberTheoryOps(this);
            this.combinatorics = new CombinatoricsOps(this);
            this.proportion = new ProportionOps(this);


            // 在 this.number 初始化后再计算 pi 和 e（需要用到高精度运算）
            this._calculatePi();
            this._calculateE();
            this.vector = new VectorOps(this);
            this.matrix = new MatrixOps(this);
            this.equation = new EquationOps(this);
            this.functionOps = new FunctionOps(this);

            // 将 MatrixOps 实例的方法绑定到 MathExtension 实例上
            this.CreateCustomMatrix = this.matrix.CreateCustomMatrix.bind(this.matrix);
            this.MatrixAdd = this.matrix.MatrixAdd.bind(this.matrix);
            this.MatrixSubtract = this.matrix.MatrixSubtract.bind(this.matrix);
            this.MatrixMultiply = this.matrix.MatrixMultiply.bind(this.matrix);
            this.MatrixScalarMultiply = this.matrix.MatrixScalarMultiply.bind(this.matrix);
            this.MatrixTranspose = this.matrix.MatrixTranspose.bind(this.matrix);
            this.MatrixDeterminant = this.matrix.MatrixDeterminant.bind(this.matrix);
            this.MatrixTrace = this.matrix.MatrixTrace.bind(this.matrix);
            this.MatrixInvertible = this.matrix.MatrixInvertible.bind(this.matrix);

            // 将 NumberTheoryOps 实例的新增方法绑定到 MathExtension 实例上
            this.FactorList = this.numberTheory.FactorList.bind(this.numberTheory);
            this.PrimeFactor = this.numberTheory.PrimeFactor.bind(this.numberTheory);
            this.FactorCount = this.numberTheory.FactorCount.bind(this.numberTheory);
            this.FactorSum = this.numberTheory.FactorSum.bind(this.numberTheory);
            this.EulerPhi = this.numberTheory.EulerPhi.bind(this.numberTheory);
            this.NthPrime = this.numberTheory.NthPrime.bind(this.numberTheory);
            this.PrimeCount = this.numberTheory.PrimeCount.bind(this.numberTheory);
            this.PrimeGap = this.numberTheory.PrimeGap.bind(this.numberTheory);

            // 将 FunctionOps 实例的方法绑定到 MathExtension 实例上
            this.BooleanCompare = this.functionOps.BooleanCompare.bind(this.functionOps);
            this.BooleanGreater = this.functionOps.BooleanGreater.bind(this.functionOps);
            this.BooleanLess = this.functionOps.BooleanLess.bind(this.functionOps);
            this.BooleanNotEqual = this.functionOps.BooleanNotEqual.bind(this.functionOps);
            this.BooleanGreaterEqual = this.functionOps.BooleanGreaterEqual.bind(this.functionOps);
            this.BooleanLessEqual = this.functionOps.BooleanLessEqual.bind(this.functionOps);
            this.BooleanTrue = this.functionOps.BooleanTrue.bind(this.functionOps);
            this.BooleanFalse = this.functionOps.BooleanFalse.bind(this.functionOps);
            this.BooleanRandom = this.functionOps.BooleanRandom.bind(this.functionOps);
            this.BooleanTypeCheck = this.functionOps.BooleanTypeCheck.bind(this.functionOps);
            this.BooleanApproxEqual = this.functionOps.BooleanApproxEqual.bind(this.functionOps);
            this.BooleanAnd = this.functionOps.BooleanAnd.bind(this.functionOps);
            this.BooleanOr = this.functionOps.BooleanOr.bind(this.functionOps);
            this.BooleanNot = this.functionOps.BooleanNot.bind(this.functionOps);
            this.BooleanNotAnd = this.functionOps.BooleanNotAnd.bind(this.functionOps);
            this.BooleanNotOr = this.functionOps.BooleanNotOr.bind(this.functionOps);
            this.BooleanAndNot = this.functionOps.BooleanAndNot.bind(this.functionOps);
            this.BooleanOrNot = this.functionOps.BooleanOrNot.bind(this.functionOps);
            this.BooleanXnor = this.functionOps.BooleanXnor.bind(this.functionOps);
            this.BooleanXor = this.functionOps.BooleanXor.bind(this.functionOps);
            this.BooleanIsTrue = this.functionOps.BooleanIsTrue.bind(this.functionOps);
            this._openFunctionPlotSettings = this._openFunctionPlotSettings.bind(this);
            this.CreatePlotArea = this.CreatePlotArea.bind(this);
            this.DestroyPlotArea = this.DestroyPlotArea.bind(this);

            // 将 CombinatoricsOps 实例的角度运算方法绑定到 MathExtension 实例上
            this.AngleDegree = this.combinatorics.AngleDegree.bind(this.combinatorics);
            this.AngleRatio = this.combinatorics.AngleRatio.bind(this.combinatorics);
            this.AngleAdd = this.combinatorics.AngleAdd.bind(this.combinatorics);
            this.AngleSubtract = this.combinatorics.AngleSubtract.bind(this.combinatorics);
            this.AngleMultiply = this.combinatorics.AngleMultiply.bind(this.combinatorics);
            this.AngleDivide = this.combinatorics.AngleDivide.bind(this.combinatorics);
            // 存储绘制区数据
            this._plotAreas = {};
            // 加载保存的绘制区数据
            this._loadPlotAreas();

        }

        // ===== 设置面板方法 =====
        _loadSettings() {
            try {
                const saved = localStorage.getItem('math_extension_settings');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    Object.assign(this._settings, parsed);
                }
            } catch (e) { }
        }

        _saveSettings() {
            try {
                localStorage.setItem('math_extension_settings', JSON.stringify(this._settings));
            } catch (e) { }
        }

        // ===== 绘制区管理方法 =====
        _loadPlotAreas() {
            try {
                const saved = localStorage.getItem('math_plot_areas');
                if (saved) {
                    this._plotAreas = JSON.parse(saved);
                }
            } catch (e) {
                this._plotAreas = {};
            }
        }

        _savePlotAreas() {
            try {
                localStorage.setItem('math_plot_areas', JSON.stringify(this._plotAreas));
            } catch (e) { }
        }

        CreatePlotArea(args) {
            const name = String(args.name || lang("DefaultPlotAreaName"));
            // 检查是否已存在
            if (this._plotAreas[name]) {
                console.warn(lang("PlotAreaAlreadyExists").replace("{name}", name));
                return;
            }
            // 创建绘制区数据
            this._plotAreas[name] = {
                name: name,
                permissions: {
                    drag: true,
                    fullscreen: true,
                    zoom: true,
                    close: true
                },
                range: {
                    minX: -10,
                    maxX: 10,
                    minY: -10,
                    maxY: 10
                },
                showGrid: true,
                createdAt: Date.now()
            };
            this._savePlotAreas();
            console.log(lang("CreatePlotAreaLog").replace("{name}", name));
        }

        DestroyPlotArea(args) {
            const name = String(args.name || lang("DefaultPlotAreaName"));
            if (!this._plotAreas[name]) {
                console.warn(`绘制区 "${name}" 不存在`);
                return;
            }
            delete this._plotAreas[name];
            this._savePlotAreas();
            console.log(lang("DestroyPlotAreaLog").replace("{name}", name));
        }

        _openFunctionPlotSettings() {
            // 获取所有绘制区名称列表
            const areaNames = Object.keys(this._plotAreas);

            // 创建弹窗容器
            const modalContainer = document.createElement('div');
            modalContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            `;

            // 弹窗内容
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: white;
                border-radius: 12px;
                padding: 24px;
                max-width: 500px;
                width: 90%;
                max-height: 80%;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            `;

            // 标题
            const title = document.createElement('h2');
            title.textContent = lang("FunctionPlotSettingsButton");
            title.style.cssText = `
                margin: 0 0 16px 0;
                font-size: 20px;
                font-weight: 600;
                color: #1a1a1a;
            `;
            modalContent.appendChild(title);

            // 绘制区列表
            const listContainer = document.createElement('div');
            listContainer.style.cssText = `
                margin-bottom: 16px;
            `;

            if (areaNames.length === 0) {
                const emptyMsg = document.createElement('p');
                emptyMsg.textContent = lang("NoPlotAreas");
                emptyMsg.style.cssText = `
                    color: #666;
                    font-size: 14px;
                    text-align: center;
                    padding: 20px 0;
                `;
                listContainer.appendChild(emptyMsg);
            } else {
                areaNames.forEach(name => {
                    const areaItem = document.createElement('div');
                    areaItem.style.cssText = `
                        padding: 12px 16px;
                        margin: 4px 0;
                        background: #f5f5f5;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: background 0.2s;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    `;
                    areaItem.onmouseover = () => { areaItem.style.background = '#e8e8e8'; };
                    areaItem.onmouseout = () => { areaItem.style.background = '#f5f5f5'; };

                    const nameSpan = document.createElement('span');
                    nameSpan.textContent = name;
                    nameSpan.style.cssText = `
                        font-size: 14px;
                        color: #1a1a1a;
                    `;
                    areaItem.appendChild(nameSpan);

                    // 显示按钮
                    const showBtn = document.createElement('button');
                    showBtn.textContent = lang("ShowPlotArea");
                    showBtn.style.cssText = `
                        padding: 4px 12px;
                        background: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                        transition: background 0.2s;
                    `;
                    showBtn.onmouseover = () => { showBtn.style.background = '#45a049'; };
                    showBtn.onmouseout = () => { showBtn.style.background = '#4CAF50'; };
                    showBtn.onclick = (e) => {
                        e.stopPropagation();
                        this._showPlotArea(name);
                    };
                    areaItem.appendChild(showBtn);

                    areaItem.onclick = () => {
                        this._showPlotArea(name);
                    };

                    listContainer.appendChild(areaItem);
                });
            }
            modalContent.appendChild(listContainer);

            // 关闭按钮
            const closeBtn = document.createElement('button');
            closeBtn.textContent = lang("CloseButton");
            closeBtn.style.cssText = `
                padding: 8px 24px;
                background: #f0f0f0;
                color: #333;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                transition: background 0.2s;
                width: 100%;
            `;
            closeBtn.onmouseover = () => { closeBtn.style.background = '#e0e0e0'; };
            closeBtn.onmouseout = () => { closeBtn.style.background = '#f0f0f0'; };
            closeBtn.onclick = () => {
                document.body.removeChild(modalContainer);
            };
            modalContent.appendChild(closeBtn);

            modalContainer.appendChild(modalContent);

            // 点击背景关闭
            modalContainer.onclick = (e) => {
                if (e.target === modalContainer) {
                    document.body.removeChild(modalContainer);
                }
            };

            document.body.appendChild(modalContainer);
        }

        _showPlotArea(name) {
            // 关闭设置弹窗
            const modals = document.querySelectorAll('div[style*="position: fixed"][style*="z-index: 9999"]');
            modals.forEach(modal => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            });

            // 获取绘制区数据
            const areaData = this._plotAreas[name];
            if (!areaData) {
                console.warn(`绘制区 "${name}" 不存在`);
                return;
            }

            // 检查是否已存在该绘制区的窗口
            const existingWindow = document.getElementById(`plot-window-${name}`);
            if (existingWindow) {
                // 如果已存在，则将其置顶并显示
                existingWindow.style.display = 'block';
                existingWindow.style.zIndex = 10000;
                return;
            }

            const range = areaData.range || { minX: -10, maxX: 10, minY: -10, maxY: 10 };
            const showGrid = areaData.showGrid !== false;

            // 创建窗口容器
            const windowContainer = document.createElement('div');
            windowContainer.id = `plot-window-${name}`;
            windowContainer.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 700px;
                height: 600px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                z-index: 10000;
                display: flex;
                flex-direction: column;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                overflow: hidden;
            `;

            // 标题栏
            const titleBar = document.createElement('div');
            titleBar.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 20px;
                background: #6C5CE7;
                color: white;
                cursor: move;
                user-select: none;
                flex-shrink: 0;
            `;

            const titleText = document.createElement('span');
            titleText.textContent = `${lang("PlotAreaTitle")}: ${name}`;
            titleText.style.cssText = `
                font-size: 16px;
                font-weight: 600;
            `;
            titleBar.appendChild(titleText);

            const controls = document.createElement('div');
            controls.style.cssText = `
                display: flex;
                gap: 8px;
            `;

            // 放大按钮
            const zoomInBtn = document.createElement('button');
            zoomInBtn.textContent = '+';
            zoomInBtn.style.cssText = `
                width: 28px;
                height: 28px;
                border: none;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                font-size: 18px;
                cursor: pointer;
                transition: background 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            zoomInBtn.onmouseover = () => { zoomInBtn.style.background = 'rgba(255, 255, 255, 0.4)'; };
            zoomInBtn.onmouseout = () => { zoomInBtn.style.background = 'rgba(255, 255, 255, 0.2)'; };
            zoomInBtn.onclick = () => {
                this._zoomPlotArea(name, 0.8);
            };
            controls.appendChild(zoomInBtn);

            // 缩小按钮
            const zoomOutBtn = document.createElement('button');
            zoomOutBtn.textContent = '−';
            zoomOutBtn.style.cssText = `
                width: 28px;
                height: 28px;
                border: none;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                font-size: 18px;
                cursor: pointer;
                transition: background 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            zoomOutBtn.onmouseover = () => { zoomOutBtn.style.background = 'rgba(255, 255, 255, 0.4)'; };
            zoomOutBtn.onmouseout = () => { zoomOutBtn.style.background = 'rgba(255, 255, 255, 0.2)'; };
            zoomOutBtn.onclick = () => {
                this._zoomPlotArea(name, 1.25);
            };
            controls.appendChild(zoomOutBtn);

            // 重置视图按钮
            const resetBtn = document.createElement('button');
            resetBtn.textContent = '⟳';
            resetBtn.style.cssText = `
                width: 28px;
                height: 28px;
                border: none;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                font-size: 16px;
                cursor: pointer;
                transition: background 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            resetBtn.onmouseover = () => { resetBtn.style.background = 'rgba(255, 255, 255, 0.4)'; };
            resetBtn.onmouseout = () => { resetBtn.style.background = 'rgba(255, 255, 255, 0.2)'; };
            resetBtn.onclick = () => {
                this._resetPlotAreaRange(name);
            };
            controls.appendChild(resetBtn);

            // 关闭按钮
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '✕';
            closeBtn.style.cssText = `
                width: 28px;
                height: 28px;
                border: none;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                font-size: 16px;
                cursor: pointer;
                transition: background 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            closeBtn.onmouseover = () => { closeBtn.style.background = 'rgba(255, 255, 255, 0.4)'; };
            closeBtn.onmouseout = () => { closeBtn.style.background = 'rgba(255, 255, 255, 0.2)'; };
            closeBtn.onclick = () => {
                document.body.removeChild(windowContainer);
            };
            controls.appendChild(closeBtn);
            titleBar.appendChild(controls);
            windowContainer.appendChild(titleBar);

            // 画布容器
            const canvasWrapper = document.createElement('div');
            canvasWrapper.className = 'plot-area-container';
            canvasWrapper.setAttribute('data-plot-name', name);
            canvasWrapper.style.cssText = `
                flex: 1;
                padding: 10px;
                background: #f8f9fa;
                position: relative;
                overflow: hidden;
            `;

            const canvas = document.createElement('canvas');
            canvas.id = `plot-canvas-${name}`;
            canvas.style.cssText = `
                width: 100%;
                height: 100%;
                background: white;
                border-radius: 8px;
                box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.06);
            `;
            canvasWrapper.appendChild(canvas);
            windowContainer.appendChild(canvasWrapper);

            // 添加滚轮缩放事件
            canvas.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY > 0 ? 1.1 : 0.9;
                this._zoomPlotArea(name, delta);
            }, { passive: false });

            // 添加到页面
            document.body.appendChild(windowContainer);

            // 使窗口可拖动
            let isDragging = false;
            let dragStartX, dragStartY, windowStartX, windowStartY;

            titleBar.addEventListener('mousedown', (e) => {
                if (e.target === closeBtn) return;
                isDragging = true;
                const rect = windowContainer.getBoundingClientRect();
                dragStartX = e.clientX;
                dragStartY = e.clientY;
                windowStartX = rect.left;
                windowStartY = rect.top;
                windowContainer.style.transform = 'none';
                windowContainer.style.top = rect.top + 'px';
                windowContainer.style.left = rect.left + 'px';
                document.addEventListener('mousemove', onDrag);
                document.addEventListener('mouseup', onDragEnd);
            });

            const onDrag = (e) => {
                if (!isDragging) return;
                const dx = e.clientX - dragStartX;
                const dy = e.clientY - dragStartY;
                windowContainer.style.left = (windowStartX + dx) + 'px';
                windowContainer.style.top = (windowStartY + dy) + 'px';
            };

            const onDragEnd = () => {
                isDragging = false;
                document.removeEventListener('mousemove', onDrag);
                document.removeEventListener('mouseup', onDragEnd);
            };

            // 绘制坐标轴和网格
            this._drawPlotCanvas(name, canvas, range, showGrid);

            // 窗口大小变化时重新绘制
            const resizeObserver = new ResizeObserver(() => {
                this._drawPlotCanvas(name, canvas, range, showGrid);
            });
            resizeObserver.observe(canvasWrapper);

            // 保存引用以便后续更新
            windowContainer._resizeObserver = resizeObserver;
        }

        _drawPlotCanvas(name, canvas, range, showGrid) {
            const rect = canvas.parentElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            const width = rect.width - 20;
            const height = rect.height - 20;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);

            const padding = 40;
            const plotWidth = width - padding * 2;
            const plotHeight = height - padding * 2;

            const { minX, maxX, minY, maxY } = range;
            const rangeX = maxX - minX;
            const rangeY = maxY - minY;

            // 清空画布
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);

            // 计算缩放
            const scaleX = plotWidth / rangeX;
            const scaleY = plotHeight / rangeY;

            // 坐标变换函数
            const toPixelX = (x) => padding + (x - minX) * scaleX;
            const toPixelY = (y) => padding + (maxY - y) * scaleY;

            // 计算网格步长（即使不显示网格也需要用于刻度标签）
            const gridStepX = this._calculateGridStep(rangeX);
            const gridStepY = this._calculateGridStep(rangeY);

            // 绘制网格
            if (showGrid) {
                ctx.strokeStyle = '#e8e8e8';
                ctx.lineWidth = 0.5;

                // 垂直网格线
                let startX = Math.ceil(minX / gridStepX) * gridStepX;
                for (let x = startX; x <= maxX; x += gridStepX) {
                    const px = toPixelX(x);
                    ctx.beginPath();
                    ctx.moveTo(px, padding);
                    ctx.lineTo(px, padding + plotHeight);
                    ctx.stroke();
                }

                // 水平网格线
                let startY = Math.ceil(minY / gridStepY) * gridStepY;
                for (let y = startY; y <= maxY; y += gridStepY) {
                    const py = toPixelY(y);
                    ctx.beginPath();
                    ctx.moveTo(padding, py);
                    ctx.lineTo(padding + plotWidth, py);
                    ctx.stroke();
                }
            }

            // 绘制坐标轴
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1.5;

            // X轴
            if (minY <= 0 && maxY >= 0) {
                const y0 = toPixelY(0);
                ctx.beginPath();
                ctx.moveTo(padding, y0);
                ctx.lineTo(padding + plotWidth, y0);
                ctx.stroke();
                // 箭头
                ctx.beginPath();
                ctx.moveTo(padding + plotWidth, y0);
                ctx.lineTo(padding + plotWidth - 8, y0 - 5);
                ctx.lineTo(padding + plotWidth - 8, y0 + 5);
                ctx.closePath();
                ctx.fillStyle = '#333';
                ctx.fill();
            }

            // Y轴
            if (minX <= 0 && maxX >= 0) {
                const x0 = toPixelX(0);
                ctx.beginPath();
                ctx.moveTo(x0, padding);
                ctx.lineTo(x0, padding + plotHeight);
                ctx.stroke();
                // 箭头
                ctx.beginPath();
                ctx.moveTo(x0, padding);
                ctx.lineTo(x0 - 5, padding + 8);
                ctx.lineTo(x0 + 5, padding + 8);
                ctx.closePath();
                ctx.fillStyle = '#333';
                ctx.fill();
            }

            // 绘制轴标签
            ctx.fillStyle = '#555';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

            // X轴刻度标签
            let labelStartX = Math.ceil(minX / gridStepX) * gridStepX;
            for (let x = labelStartX; x <= maxX; x += gridStepX) {
                if (Math.abs(x) < 0.0001) continue;
                const px = toPixelX(x);
                const yPos = (minY <= 0 && maxY >= 0) ? toPixelY(0) : padding + plotHeight;
                const labelY = (minY <= 0 && maxY >= 0) ? yPos + 4 : yPos + 4;
                ctx.fillText(this._formatNumber(x), px, labelY);
            }

            // Y轴刻度标签
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            let labelStartY = Math.ceil(minY / gridStepY) * gridStepY;
            for (let y = labelStartY; y <= maxY; y += gridStepY) {
                if (Math.abs(y) < 0.0001) continue;
                const py = toPixelY(y);
                const xPos = (minX <= 0 && maxX >= 0) ? toPixelX(0) : padding;
                ctx.fillText(this._formatNumber(y), xPos - 6, py);
            }

            // 原点标签
            if (minX <= 0 && maxX >= 0 && minY <= 0 && maxY >= 0) {
                const x0 = toPixelX(0);
                const y0 = toPixelY(0);
                ctx.textAlign = 'right';
                ctx.textBaseline = 'top';
                ctx.fillText('O', x0 - 6, y0 + 4);
            }

            // 轴名称
            ctx.fillStyle = '#333';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.fillText('x', width - padding + 4, padding + plotHeight);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('y', padding, 8);
        }

        _calculateGridStep(range) {
            const targetSteps = 8;
            let step = range / targetSteps;
            const magnitude = Math.pow(10, Math.floor(Math.log10(step)));
            const normalized = step / magnitude;
            let niceStep;
            if (normalized < 1.5) niceStep = 1;
            else if (normalized < 3.5) niceStep = 2;
            else if (normalized < 7.5) niceStep = 5;
            else niceStep = 10;
            return niceStep * magnitude;
        }

        _formatNumber(num) {
            if (Number.isInteger(num)) {
                return num.toString();
            }
            const str = num.toFixed(4);
            // 去掉多余的零
            return parseFloat(str).toString();
        }

        _evaluateFunction(expr, x) {
            try {
                // 预处理表达式：将 ^ 替换为 **（幂运算符）
                let processedExpr = expr.replace(/\^/g, '**');
                // 创建安全的求值环境
                const scope = {
                    x: x,
                    sin: Math.sin,
                    cos: Math.cos,
                    tan: Math.tan,
                    asin: Math.asin,
                    acos: Math.acos,
                    atan: Math.atan,
                    atan2: Math.atan2,
                    sqrt: Math.sqrt,
                    cbrt: Math.cbrt,
                    pow: Math.pow,
                    exp: Math.exp,
                    log: Math.log,
                    log10: Math.log10,
                    log2: Math.log2,
                    abs: Math.abs,
                    ceil: Math.ceil,
                    floor: Math.floor,
                    round: Math.round,
                    max: Math.max,
                    min: Math.min,
                    PI: Math.PI,
                    E: Math.E
                };
                // 将表达式中的函数名替换为作用域变量
                const fn = new Function('x', 'scope', `
                    with (scope) {
                        return (${processedExpr});
                    }
                `);
                return fn(x, scope);
            } catch (e) {
                return NaN;
            }
        }

        PlotFunction(args) {
            // 积木参数名: window=绘制区名称, name=函数名称, text=函数公式
            let areaName = String(args.window || args.area || '').trim();
            const funcName = String(args.name || '').trim() || 'f';  // 函数名称
            let formula = String(args.text || args.formula || '').trim();  // 函数公式
            const color = String(args.color || '#2196F3');
            const lineWidth = Number(args.lineWidth) || 2;
            const samples = Number(args.samples) || 200;

            if (!formula) {
                console.warn(lang("FunctionFormulaEmpty"));
                return;
            }

            // 如果未指定绘制区名称，使用第一个可用的绘制区
            if (!areaName) {
                const areaNames = Object.keys(this._plotAreas);
                if (areaNames.length === 0) {
                    console.warn(lang("NoPlotAreasAvailable"));
                    return;
                }
                areaName = areaNames[0];
                console.log(lang("NoPlotAreaSpecified").replace("{name}", areaName));
            }

            // 检查绘制区是否存在
            if (!this._plotAreas[areaName]) {
                console.warn(`绘制区 "${areaName}" 不存在`);
                return;
            }

            // 初始化函数列表
            if (!this._plotAreas[areaName].functions) {
                this._plotAreas[areaName].functions = [];
            }

            // 生成唯一ID
            const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

            // 添加函数
            const funcData = {
                id: id,
                name: funcName,
                formula: formula,
                color: color,
                lineWidth: lineWidth,
                samples: samples,
                visible: true
            };
            this._plotAreas[areaName].functions.push(funcData);
            this._savePlotAreas();

            // 重新绘制
            this._refreshPlotArea(areaName);

            console.log(lang("AddFunctionLog").replace("{area}", areaName).replace("{func}", funcName).replace("{formula}", formula));
            return id;
        }

        SetFunctionFormula(args) {
            // 积木参数名: name=函数ID或名称, text=新公式
            const areaName = String(args.window || args.area || lang("DefaultPlotAreaName"));
            const idOrName = String(args.name || args.id || '').trim();
            const formula = String(args.text || args.formula || '').trim();

            if (!idOrName || !formula) {
                console.warn(lang("FunctionNameAndFormulaEmpty"));
                return;
            }

            if (!this._plotAreas[areaName]) {
                console.warn(`绘制区 "${areaName}" 不存在`);
                return;
            }

            const funcs = this._plotAreas[areaName].functions || [];
            // 先按ID查找，再按名称查找（如果ID不匹配）
            let target = funcs.find(f => f.id === idOrName);
            if (!target) {
                target = funcs.find(f => f.name === idOrName);
            }
            if (!target) {
                console.warn(lang("FunctionNotFoundByName").replace("{name}", idOrName));
                return;
            }

            target.formula = formula;
            this._savePlotAreas();
            this._refreshPlotArea(areaName);
            console.log(lang("UpdateFunctionFormulaLog").replace("{name}", idOrName).replace("{formula}", formula));
        }

        SetFunctionProperty(args) {
            const areaName = String(args.window || args.area || lang("DefaultPlotAreaName"));
            const id = String(args.id || '');
            const property = String(args.property || '');
            const value = String(args.value || '');

            if (!id || !property) {
                console.warn(lang("FunctionIdAndPropertyEmpty"));
                return;
            }

            if (!this._plotAreas[areaName]) {
                console.warn(`绘制区 "${areaName}" 不存在`);
                return;
            }

            const funcs = this._plotAreas[areaName].functions || [];
            const target = funcs.find(f => f.id === id);
            if (!target) {
                console.warn(`未找到ID为 "${id}" 的函数`);
                return;
            }

            switch (property) {
                case 'formula':
                    target.formula = value;
                    break;
                case 'color':
                    target.color = value;
                    break;
                case 'lineWidth':
                    target.lineWidth = Number(value) || 2;
                    break;
                case 'samples':
                    target.samples = Number(value) || 200;
                    break;
                case 'visible':
                    target.visible = (value === 'true' || value === true);
                    break;
                default:
                    console.warn(lang("UnknownProperty").replace("{property}", property));
                    return;
            }

            this._savePlotAreas();
            this._refreshPlotArea(areaName);
            console.log(lang("UpdateFunctionPropertyLog").replace("{id}", id).replace("{property}", property).replace("{value}", value));
        }

        DeleteFunction(args) {
            const areaName = String(args.window || args.area || lang("DefaultPlotAreaName"));
            const id = String(args.id || '');

            if (!id) {
                console.warn(lang("FunctionIdEmpty"));
                return;
            }

            if (!this._plotAreas[areaName]) {
                console.warn(`绘制区 "${areaName}" 不存在`);
                return;
            }

            const funcs = this._plotAreas[areaName].functions || [];
            const index = funcs.findIndex(f => f.id === id);
            if (index === -1) {
                console.warn(`未找到ID为 "${id}" 的函数`);
                return;
            }

            funcs.splice(index, 1);
            this._savePlotAreas();
            this._refreshPlotArea(areaName);
            console.log(lang("DeleteFunctionLog").replace("{id}", id));
        }

        ClearPlotArea(args) {
            const areaName = String(args.window || args.area || lang("DefaultPlotAreaName"));

            if (!this._plotAreas[areaName]) {
                console.warn(`绘制区 "${areaName}" 不存在`);
                return;
            }

            this._plotAreas[areaName].functions = [];
            this._savePlotAreas();
            this._refreshPlotArea(areaName);
            console.log(lang("ClearPlotAreaLog").replace("{name}", areaName));
        }

        _refreshPlotArea(areaName) {
            console.log(lang("RefreshPlotAreaLog").replace("{name}", areaName));
            // 直接用ID查找绘制区窗口
            const windowContainer = document.getElementById(`plot-window-${areaName}`);
            if (!windowContainer) {
                console.warn(lang("RefreshWindowNotFound").replace("{name}", areaName));
                return;
            }

            const canvas = windowContainer.querySelector('canvas');
            if (!canvas) {
                console.warn(lang("RefreshCanvasNotFound").replace("{name}", areaName));
                return;
            }

            const area = this._plotAreas[areaName];
            if (!area) {
                console.warn(lang("RefreshDataNotFound").replace("{name}", areaName));
                return;
            }

            console.log(lang("RefreshRedrawLog").replace("{count}", area.functions ? area.functions.length : 0));
            // 重绘整个画布（网格 + 坐标轴 + 函数曲线）
            this._redrawPlotArea(areaName, canvas, area.range, area.showGrid);
        }

        _redrawPlotArea(name, canvas, range, showGrid) {
            // 先绘制网格和坐标轴
            this._drawPlotCanvas(name, canvas, range, showGrid);
            // 再绘制函数曲线
            this._drawFunctionsOnCanvas(name, canvas, range);
        }

        _zoomPlotArea(name, factor) {
            const area = this._plotAreas[name];
            if (!area) return;

            const range = area.range;
            const centerX = (range.minX + range.maxX) / 2;
            const centerY = (range.minY + range.maxY) / 2;
            const halfWidth = (range.maxX - range.minX) / 2 * factor;
            const halfHeight = (range.maxY - range.minY) / 2 * factor;

            // 限制缩放范围，防止过度缩放
            const minHalf = 0.001;
            const maxHalf = 1000;
            if (halfWidth < minHalf || halfHeight < minHalf || halfWidth > maxHalf || halfHeight > maxHalf) {
                return;
            }

            range.minX = centerX - halfWidth;
            range.maxX = centerX + halfWidth;
            range.minY = centerY - halfHeight;
            range.maxY = centerY + halfHeight;

            this._refreshPlotArea(name);
        }

        _resetPlotAreaRange(name) {
            const area = this._plotAreas[name];
            if (!area) return;

            // 重置为默认范围
            area.range = { minX: -10, maxX: 10, minY: -10, maxY: 10 };
            this._refreshPlotArea(name);
        }

        _drawFunctionsOnCanvas(name, canvas, range) {
            const area = this._plotAreas[name];
            if (!area || !area.functions) return;

            const rect = canvas.parentElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            // 使用与 _drawPlotCanvas 完全相同的尺寸（未乘以 dpr 的逻辑尺寸）
            const width = rect.width - 20;
            const height = rect.height - 20;

            const ctx = canvas.getContext('2d');
            ctx.save();
            // 重置变换矩阵，因为 _drawPlotCanvas 已经应用了 scale(dpr)
            // 我们需要在同一个变换下绘制
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            // 然后应用与 _drawPlotCanvas 相同的变换
            ctx.scale(dpr, dpr);

            const padding = 40;
            const plotWidth = width - padding * 2;
            const plotHeight = height - padding * 2;

            const { minX, maxX, minY, maxY } = range;
            const rangeX = maxX - minX;
            const rangeY = maxY - minY;

            const scaleX = plotWidth / rangeX;
            const scaleY = plotHeight / rangeY;

            const toPixelX = (x) => padding + (x - minX) * scaleX;
            const toPixelY = (y) => padding + (maxY - y) * scaleY;

            // 绘制每个函数
            for (const func of area.functions) {
                if (!func.visible) continue;

                const { formula, color, lineWidth, samples } = func;
                const points = [];
                const step = (maxX - minX) / samples;

                // 采样
                let foundZero = false;
                for (let i = 0; i <= samples; i++) {
                    const x = minX + i * step;
                    const y = this._evaluateFunction(formula, x);
                    if (Math.abs(x) < 0.001) {
                        foundZero = true;
                        console.log(lang("SamplingNearZeroLog").replace("{x}", x).replace("{y}", y).replace("{formula}", formula));
                    }
                    if (!isNaN(y) && isFinite(y)) {
                        points.push({ x, y });
                    } else {
                        // 遇到无效点，断开曲线
                        if (points.length > 1) {
                            this._drawPolyline(ctx, points, color, lineWidth, toPixelX, toPixelY, minY, maxY);
                        }
                        points.length = 0;
                    }
                }
                if (!foundZero) {
                    console.warn(lang("SamplingMissingZeroWarning").replace("{step}", step).replace("{samples}", samples));
                }

                if (points.length > 1) {
                    this._drawPolyline(ctx, points, color, lineWidth, toPixelX, toPixelY, minY, maxY);
                }
            }

            ctx.restore();
        }

        _drawPolyline(ctx, points, color, lineWidth, toPixelX, toPixelY, minY, maxY) {
            if (points.length < 2) return;

            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            // 先移动到第一个点
            const firstP = points[0];
            ctx.moveTo(toPixelX(firstP.x), toPixelY(firstP.y));

            // 直接连接所有点，不做裁剪（因为采样时已经确保了点在范围内）
            for (let i = 1; i < points.length; i++) {
                const p = points[i];
                ctx.lineTo(toPixelX(p.x), toPixelY(p.y));
            }
            ctx.stroke();
        }

        _openSettings() {
            const self = this;
            // 将 errorText 转换为下拉框的值
            let errorHandlingValue = 'console';
            if (this.errorText === 1) errorHandlingValue = 'false';
            else if (this.errorText === 2) errorHandlingValue = 'jsError';
            else if (this.errorText === 3) errorHandlingValue = 'console';

            new MathSettingsModal({
                title: lang("SettingsTitle"),
                note: lang("SettingsNote"),
                initialValues: {
                    ...this._settings,
                    precision: this.decimal,
                    supportBoolean: this.supportBoolean,
                    errorHandling: errorHandlingValue
                },
                onChange: (key, value) => {
                    // 如果是计算处理相关的字段，直接更新实例属性
                    if (key === 'precision') {
                        this.decimal = Number(value) || 10;
                        this._calculatePi();
                        this._calculateE();
                    } else if (key === 'supportBoolean') {
                        this.supportBoolean = value;
                    } else if (key === 'errorHandling') {
                        if (value === 'false') this.errorText = 1;
                        else if (value === 'jsError') this.errorText = 2;
                        else if (value === 'console') this.errorText = 3;
                    } else {
                        this._settings[key] = value;
                    }
                    this._saveSettings();
                },
                onSave: (values) => {
                    // 更新积木可见性设置
                    Object.assign(this._settings, values);
                    // 更新计算处理设置
                    this.decimal = Number(values.precision) || 10;
                    this.supportBoolean = Boolean(values.supportBoolean);
                    if (values.errorHandling === 'false') this.errorText = 1;
                    else if (values.errorHandling === 'jsError') this.errorText = 2;
                    else if (values.errorHandling === 'console') this.errorText = 3;

                    this._saveSettings();
                    // 重新计算常量
                    this._calculatePi();
                    this._calculateE();
                    // 刷新积木栏
                    if (this.runtime?.emit) {
                        this.runtime.emit('TOOLBOX_EXTENSIONS_NEED_UPDATE');
                    }
                },
                onCancel: () => this._loadSettings(),
                sections: [
                    {
                        title: lang("SettingsSectionOperator"),
                        fields: [
                            { key: 'showSimpleOperator', label: lang("showSimpleOperatorLabel"), desc: lang("showSimpleOperatorDesc"), default: true },
                            { key: 'showAdvancedOperator', label: lang("showAdvancedOperatorLabel"), desc: lang("showAdvancedOperatorDesc"), default: true },
                            { key: 'showRangeOperator', label: lang("showRangeOperatorLabel"), desc: lang("showRangeOperatorDesc"), default: true },
                            { key: 'showDecimalOperator', label: lang("showDecimalOperatorLabel"), desc: lang("showDecimalOperatorDesc"), default: true },
                            { key: 'showFractionOperator', label: lang("showFractionOperatorLabel"), desc: lang("showFractionOperatorDesc"), default: true },
                        ],
                    },
                    {
                        title: lang("SettingsSectionFunction"),
                        fields: [
                            { key: 'showTrigOperator', label: lang("showTrigOperatorLabel"), desc: lang("showTrigOperatorDesc"), default: true },
                            { key: 'showProportionOperator', label: lang("showProportionOperatorLabel"), desc: lang("showProportionOperatorDesc"), default: true },
                        ],
                    },
                    {
                        title: lang("SettingsSectionBigNumber"),
                        fields: [
                            { key: 'showBigNumberOperator', label: lang("showBigNumberOperatorLabel"), desc: lang("showBigNumberOperatorDesc"), default: true },
                            { key: 'showImaginaryOperator', label: lang("showImaginaryOperatorLabel"), desc: lang("showImaginaryOperatorDesc"), default: true },
                            { key: 'showComplexOperator', label: lang("showComplexOperatorLabel"), desc: lang("showComplexOperatorDesc"), default: true },
                        ],
                    },
                    {
                        title: lang("SettingsSectionLinearAlgebra"),
                        fields: [
                            { key: 'showVectorOperator', label: lang("showVectorOperatorLabel"), desc: lang("showVectorOperatorDesc"), default: true },
                            { key: 'showMatrix', label: lang("showMatrixLabel"), desc: lang("showMatrixDesc"), default: true },
                        ],
                    },
                    {
                        title: lang("SettingsSectionEquation"),
                        fields: [
                            { key: 'showEquationOperator', label: lang("showEquationOperatorLabel"), desc: lang("showEquationOperatorDesc"), default: true },

                        ],
                    },
                    {
                        title: lang("SettingsSectionNumberTool"),
                        fields: [
                            { key: 'showMathNumber', label: lang("showMathNumberLabel"), desc: lang("showMathNumberDesc"), default: true },
                            { key: 'showNumberPart', label: lang("showNumberPartLabel"), desc: lang("showNumberPartDesc"), default: true },
                            { key: 'showRelationshipNumber', label: lang("showRelationshipNumberLabel"), desc: lang("showRelationshipNumberDesc"), default: true },
                            { key: 'showNumberOther', label: lang("showNumberOtherLabel"), desc: lang("showNumberOtherDesc"), default: true },
                        ],
                    },
                    {
                        title: lang("SettingsSectionFunction"),
                        fields: [
                            { key: 'showFunctionOperator', label: lang("showFunctionOperatorLabel"), desc: lang("showFunctionOperatorDesc"), default: true },
                        ],
                    },
                    {
                        title: lang("SettingsSectionBoolean"),
                        fields: [
                            { key: 'showBooleanOperator', label: lang("showBooleanOperatorLabel"), desc: lang("showBooleanOperatorDesc"), default: true },
                        ],
                    },
                    {
                        title: lang("SettingsSectionAdvancedMath"),
                        fields: [
                            { key: 'showCombinatorics', label: lang("showCombinatoricsLabel"), desc: lang("showCombinatoricsDesc"), default: true },
                            { key: 'showNumberTheory', label: lang("showNumberTheoryLabel"), desc: lang("showNumberTheoryDesc"), default: true },
                            { key: 'showAngleOperation', label: lang("AngleOperation"), desc: lang("showAngleOperationDesc"), default: true },
                        ],
                    },
                ],
            });
        }

        /**
         * 根据设置过滤积木分区
         * ---title 为带标题的新分区，单独 --- 为上一个分区的附加部分
         */
        _filterBlocksBySettings(blocks) {
            // 分区标题 -> 设置键 的映射
            const sectionToSetting = {
                [lang('SimpleOperator')]: 'showSimpleOperator',
                [lang('AdvancedOperator')]: 'showAdvancedOperator',
                [lang('RangeOperator')]: 'showRangeOperator',
                [lang('DecimalOperator')]: 'showDecimalOperator',
                [lang('FractionOperator')]: 'showFractionOperator',
                [lang('TrigOperator')]: 'showTrigOperator',
                [lang('ProportionOperator')]: 'showProportionOperator',
                [lang('BigNumberOperator')]: 'showBigNumberOperator',
                [lang('ImaginaryOperator')]: 'showImaginaryOperator',
                [lang('ComplexOperator')]: 'showComplexOperator',
                [lang('VectorOperator')]: 'showVectorOperator',
                [lang('EquationOperator')]: 'showEquationOperator',

                [lang('MathNumber')]: 'showMathNumber',
                [lang('NumberPart')]: 'showNumberPart',
                [lang('RelationshipNumber')]: 'showRelationshipNumber',
                [lang('NumberOther')]: 'showNumberOther',
                [lang('AdvancedMathCategory')]: 'showCombinatorics',
                [lang('Combinatorics')]: 'showCombinatorics',
                [lang('AngleOperation')]: 'showAngleOperation',

                [lang('NumberTheory')]: 'showNumberTheory',
                [lang('Matrix')]: 'showMatrix',
                [lang('FunctionOperator')]: 'showFunctionOperator',
                [lang('Boolean')]: 'showBooleanOperator',
                [lang('BooleanOperator')]: 'showBooleanOperator',
            };
            // 始终显示的分区
            const alwaysVisible = new Set([lang('MathOperator'), lang('All')]);

            let currentVisible = true;
            const filtered = [];

            for (const block of blocks) {
                if (typeof block === 'string' && block.startsWith('---')) {
                    const sectionTitle = block.slice(3);
                    if (sectionTitle === '') {
                        // 单独 --- ，继承当前分区可见性
                        if (currentVisible) filtered.push(block);
                    } else if (alwaysVisible.has(sectionTitle)) {
                        currentVisible = true;
                        filtered.push(block);
                    } else if (sectionToSetting[sectionTitle]) {
                        currentVisible = this._settings[sectionToSetting[sectionTitle]] !== false;
                        if (currentVisible) filtered.push(block);
                    } else {
                        // 未知分区，默认显示
                        currentVisible = true;
                        filtered.push(block);
                    }
                } else {
                    if (currentVisible) filtered.push(block);
                }
            }
            return filtered;
        }

        getInfo() {
            const blocks = [
                {
                    blockType: BlockType.BUTTON,
                    text: lang("SettingsButtonText"),
                    onClick: this._openSettings,
                },
                '---',
                '---' + lang('MathOperator'),
                '---' + lang('All'),
                {
                    opcode: "SetDecimal",
                    blockType: BlockType.COMMAND,
                    text: lang("changeDecimalText"),
                    tooltip: lang("changeDecimalDecs"),
                    arguments: {
                        Num: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    },
                },
                {
                    opcode: "ChangeError",
                    blockType: BlockType.COMMAND,
                    text: lang("changeErrorText"),
                    tooltip: lang("changeErrorDecs"),
                    arguments: {
                        menu: {
                            type: ArgumentType.STRING,
                            menu: "ErrorText"
                        }
                    },
                },
                {
                    opcode: "ChangeSupportBoolean",
                    blockType: BlockType.COMMAND,
                    text: lang("changeSupportBooleanText"),
                    tooltip: lang("changeSupportBooleanDecs"),
                    arguments: {
                        menu: {
                            type: ArgumentType.STRING,
                            menu: "SupportBoolean"
                        }
                    }
                },
                {
                    opcode: "SetMaxLoopLimit",
                    blockType: BlockType.COMMAND,
                    text: lang("SetMaxLoopLimitText"),
                    tooltip: lang("SetMaxLoopLimitDecs"),
                    arguments: {
                        MaxNumber: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1000000
                        }
                    },
                },
                '---' + lang('SimpleOperator'),
                {
                    opcode: "Add",
                    blockType: BlockType.REPORTER,
                    text: lang("AddText"),
                    tooltip: lang("AddDesc"),
                    arguments: {
                        Addend1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Addend2: {
                            type: ArgumentType.NUMBER,

                            defaultValue: 1
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Subtract",
                    blockType: BlockType.REPORTER,
                    text: lang("SubtractText"),
                    tooltip: lang("SubtractDesc"),
                    arguments: {
                        Minuend: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        Subtrahend: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Multiply",
                    blockType: BlockType.REPORTER,
                    text: lang("MultiplyText"),
                    tooltip: lang("MultiplyDesc"),
                    arguments: {
                        Multiplier1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        Multiplier2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Divide",
                    blockType: BlockType.REPORTER,
                    text: lang("DivideText"),
                    tooltip: lang("DivideDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        },
                        Divisor: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Mod",
                    blockType: BlockType.REPORTER,
                    text: lang("ModText"),
                    tooltip: lang("ModDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        },
                        Divisor: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "Quo",
                    blockType: BlockType.REPORTER,
                    text: lang("QuoText"),
                    tooltip: lang("QuoDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        },
                        Divisor: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "DivideDigit",
                    blockType: BlockType.REPORTER,
                    text: lang("DivideDigitText"),
                    tooltip: lang("DivideDigitDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Divisor: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        Digit: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "DivideDiv",
                    blockType: BlockType.REPORTER,
                    text: lang("DivideDivText"),
                    tooltip: lang("DivideDivDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        },
                        Divisor: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "CardinalMultiply",
                    blockType: BlockType.REPORTER,
                    text: lang("CardinalMultiplyText"),
                    tooltip: lang("CardinalMultiplyDesc"),
                    arguments: {
                        Multiplier1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        Multiplier2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang("AdvancedOperator"),
                {
                    opcode: "Power",
                    blockType: BlockType.REPORTER,
                    text: lang("PowerText"),
                    tooltip: lang("PowerDesc"),
                    arguments: {
                        Base: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        Exponent: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Root",
                    blockType: BlockType.REPORTER,
                    text: lang("RootText"),
                    tooltip: lang("RootDesc"),
                    arguments: {
                        RootIndex: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        Radicand: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Log",
                    blockType: BlockType.REPORTER,
                    text: lang("LogText"),
                    tooltip: lang("LogDesc"),
                    arguments: {
                        Base: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        },
                        Logarithm: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Factorial",
                    blockType: BlockType.REPORTER,
                    text: lang("FactorialText"),
                    tooltip: lang("FactorialDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "TrigFunction",
                    blockType: BlockType.REPORTER,
                    text: lang("TrigText"),
                    tooltip: lang("TrigDesc"),
                    arguments: {
                        menu: {
                            type: ArgumentType.STRING,
                            menu: "trigfunction"
                        },
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 45
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ArctrigFunction",
                    blockType: BlockType.REPORTER,
                    text: lang("ArctrigText"),
                    tooltip: lang("ArctrigDesc"),
                    arguments: {
                        menu: {
                            type: ArgumentType.STRING,
                            menu: "arctrigfunction"
                        },
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0.5
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Atan2",
                    blockType: BlockType.REPORTER,
                    text: lang("Atan2Text"),
                    tooltip: lang("Atan2Desc"),
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "calculateExpression",
                    blockType: BlockType.REPORTER,
                    text: lang("CalculateExpressionText"),
                    tooltip: lang("CalculateExpressionDesc"),
                    arguments: {
                        expression: {
                            type: ArgumentType.STRING,
                            defaultValue: "sin(30) + (2×3) ÷ [5 - {1+1}]"
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "TriangularAdd",
                    blockType: BlockType.REPORTER,
                    text: lang("TriangularAddText"),
                    tooltip: lang("TriangularAddDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "KnuthArrow",
                    blockType: BlockType.REPORTER,
                    text: lang("KnuthArrowText"),
                    tooltip: lang("KnuthArrowDesc"),
                    arguments: {
                        Base: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        Index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        }
                    },
                    ...COLOR.Operator
                },
                "---" + lang("OtherOperator"),
                {
                    opcode: "Negative",
                    blockType: BlockType.REPORTER,
                    text: lang("NegativeNumberText"),
                    tooltip: lang("NegativeNumberDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Absolute",
                    blockType: BlockType.REPORTER,
                    text: lang("AbsoluteText"),
                    tooltip: lang("AbsoluteDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: -10
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "NegativeAbsolute",
                    blockType: BlockType.REPORTER,
                    text: lang("NegativeAbsoluteText"),
                    tooltip: lang("NegativeAbsoluteDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Percent",
                    blockType: BlockType.REPORTER,
                    text: lang("PercentText"),
                    tooltip: lang("PercentDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "PercentOf",
                    blockType: BlockType.REPORTER,
                    text: lang("PercentOfText"),
                    tooltip: lang("PercentOfDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        Percent: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 20
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Reciprocal",
                    blockType: BlockType.REPORTER,
                    text: lang("ReciprocalText"),
                    tooltip: lang("ReciprocalDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "PositiveNumber",
                    blockType: BlockType.REPORTER,
                    text: lang("PositiveNumberText"),
                    tooltip: lang("PositiveNumberDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "DivideByTwo",
                    blockType: BlockType.REPORTER,
                    text: lang("DivideByTwoText"),
                    tooltip: lang("DivideByTwoDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    },
                    ...COLOR.Operator
                },
                "---" + lang("FastOperator"),
                {
                    opcode: "Square",
                    blockType: BlockType.REPORTER,
                    text: lang("SquareText"),
                    tooltip: lang("SquareDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Cube",
                    blockType: BlockType.REPORTER,
                    text: lang("CubeText"),
                    tooltip: lang("CubeDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "SquareRoot",
                    blockType: BlockType.REPORTER,
                    text: lang("SquareRootText"),
                    tooltip: lang("SquareRootDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 16
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "CubeRoot",
                    blockType: BlockType.REPORTER,
                    text: lang("CubeRootText"),
                    tooltip: lang("CubeRootDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 27
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Powers",
                    blockType: BlockType.REPORTER,
                    text: lang("PowersText"),
                    tooltip: lang("PowersDesc"),
                    arguments: {
                        Powers: {
                            type: ArgumentType.STRING,
                            menu: "powersMenu"
                        },
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Logs",
                    blockType: BlockType.REPORTER,
                    text: lang("LogsText"),
                    tooltip: lang("LogsDesc"),
                    arguments: {
                        Logs: {
                            type: ArgumentType.STRING,
                            menu: "logsMenu"
                        },
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang("RangeOperator"),
                {
                    opcode: "LimitInRange",
                    blockType: BlockType.REPORTER,
                    text: lang("LimitInRangeText"),
                    tooltip: lang("LimitInRangeDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        Min: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Max: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "CycleInRange",
                    blockType: BlockType.REPORTER,
                    text: lang("CycleInRangeText"),
                    tooltip: lang("CycleInRangeDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        },
                        Min: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Max: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "MapRange",
                    blockType: BlockType.REPORTER,
                    text: lang("MapRangeText"),
                    tooltip: lang("MapRangeDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        },
                        Min1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        Max1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        },
                        Min2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        Max2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 200
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "LinearMap",
                    blockType: BlockType.REPORTER,
                    text: lang("LinearMapText"),
                    tooltip: lang("LinearMapDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        },
                        Min: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        },
                        Max: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang("DecimalOperator"),
                {
                    opcode: "RoundDecimal",
                    blockType: BlockType.REPORTER,
                    text: lang("RoundDecimalText"),
                    tooltip: lang("RoundDecimalDesc"),
                    arguments: {
                        Menu: {
                            type: ArgumentType.STRING,
                            menu: "roundingMenu"
                        },
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3.14159
                        },
                        Digit: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "RoundDecimalToInt",
                    blockType: BlockType.REPORTER,
                    text: lang("RoundDecimalToIntText"),
                    tooltip: lang("RoundDecimalToIntDesc"),
                    arguments: {
                        Menu: {
                            type: ArgumentType.STRING,
                            menu: "roundingMenu"
                        },
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3.7
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "SimplifyDecimal",
                    blockType: BlockType.REPORTER,
                    text: lang("SimplifyDecimalText"),
                    tooltip: lang("SimplifyDecimalDesc"),
                    arguments: {
                        decimal: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "3.14000"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "RepeatingDecimal",
                    blockType: BlockType.REPORTER,
                    text: lang("RepeatingDecimalText"),
                    tooltip: lang("RepeatingDecimalDesc"),
                    arguments: {
                        decimal: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0.9
                        },
                        cycle: {
                            type: ArgumentType.STRING,
                            defaultValue: "9"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ExtractCycle",
                    blockType: BlockType.REPORTER,
                    text: lang("ExtractCycleText"),
                    tooltip: lang("ExtractCycleDesc"),
                    arguments: {
                        decimal: {
                            type: ArgumentType.STRING,
                            defaultValue: "0.9{9}"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "RepeatingDecimalToFraction",
                    blockType: BlockType.REPORTER,
                    text: lang("RepeatingDecimalToFractionText"),
                    tooltip: lang("RepeatingDecimalToFractionDesc"),
                    arguments: {
                        decimal: {
                            type: ArgumentType.STRING,
                            defaultValue: "0.3{3}"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "FractionToRepeatingDecimal",
                    blockType: BlockType.REPORTER,
                    text: lang("FractionToRepeatingDecimalText"),
                    tooltip: lang("FractionToRepeatingDecimalDesc"),
                    arguments: {
                        fraction: {
                            type: ArgumentType.STRING,
                            defaultValue: "1/3"
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "RepeatingDecimalAdd",
                    blockType: BlockType.REPORTER,
                    text: lang("RepeatingDecimalAddText"),
                    tooltip: lang("RepeatingDecimalAddDesc"),
                    arguments: {
                        Addend1: {
                            type: ArgumentType.STRING,
                            defaultValue: "0.1{1}"
                        },
                        Addend2: {
                            type: ArgumentType.STRING,
                            defaultValue: "0.1{1}"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "RepeatingDecimalSubtract",
                    blockType: BlockType.REPORTER,
                    text: lang("RepeatingDecimalSubtractText"),
                    tooltip: lang("RepeatingDecimalSubtractDesc"),
                    arguments: {
                        Minuend: {
                            type: ArgumentType.STRING,
                            defaultValue: "0.2{2}"
                        },
                        Subtrahend: {
                            type: ArgumentType.STRING,
                            defaultValue: "0.1{1}"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "RepeatingDecimalMultiply",
                    blockType: BlockType.REPORTER,
                    text: lang("RepeatingDecimalMultiplyText"),
                    tooltip: lang("RepeatingDecimalMultiplyDesc"),
                    arguments: {
                        Multiplier1: {
                            type: ArgumentType.STRING,
                            defaultValue: "0.1{1}"
                        },
                        Multiplier2: {
                            type: ArgumentType.STRING,
                            defaultValue: "3"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "RepeatingDecimalDivide",
                    blockType: BlockType.REPORTER,
                    text: lang("RepeatingDecimalDivideText"),
                    tooltip: lang("RepeatingDecimalDivideDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "0.3{3}"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "3"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "RepeatingDecimalToFixed",
                    blockType: BlockType.REPORTER,
                    text: lang("RepeatingDecimalToFixedText"),
                    tooltip: lang("RepeatingDecimalToFixedDesc"),
                    arguments: {
                        decimal: {
                            type: ArgumentType.STRING,
                            defaultValue: "0.3{3}"
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang("FractionOperator"),
                {
                    opcode: "SimplifyFraction",
                    blockType: BlockType.REPORTER,
                    text: lang("SimplifyFractionText"),
                    tooltip: lang("SimplifyFractionDesc"),
                    arguments: {
                        Fraction: {
                            type: ArgumentType.STRING,
                            defaultValue: "6/8"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "MultiplySameFraction",
                    blockType: BlockType.REPORTER,
                    text: lang("MultiplySameFractionText"),
                    tooltip: lang("MultiplySameFractionDesc"),
                    arguments: {
                        Fraction: {
                            type: ArgumentType.STRING,
                            defaultValue: "3/4"
                        },
                        Multiplier: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ToMixedNumber",
                    blockType: BlockType.REPORTER,
                    text: lang("ToMixedNumberText"),
                    tooltip: lang("ToMixedNumberDesc"),
                    arguments: {
                        Fraction: {
                            type: ArgumentType.STRING,
                            defaultValue: "7/3"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ToImproperFraction",
                    blockType: BlockType.REPORTER,
                    text: lang("ToImproperFractionText"),
                    tooltip: lang("ToImproperFractionDesc"),
                    arguments: {
                        Fraction: {
                            type: ArgumentType.STRING,
                            defaultValue: "2+1/3"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "FractionPart",
                    blockType: BlockType.REPORTER,
                    text: lang("FractionPartText"),
                    tooltip: lang("FractionPartDesc"),
                    arguments: {
                        Fraction: {
                            type: ArgumentType.STRING,
                            defaultValue: "3/4"
                        },
                        Part: {
                            type: ArgumentType.STRING,
                            menu: "fractionPartMenu",
                            defaultValue: "numerator"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "CreateFraction",
                    blockType: BlockType.REPORTER,
                    text: lang("CreateFractionText"),
                    tooltip: lang("CreateFractionDesc"),
                    arguments: {
                        Denominator: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        },
                        Numerator: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "AddFraction",
                    blockType: BlockType.REPORTER,
                    text: lang("AddFractionText"),
                    tooltip: lang("AddFractionDesc"),
                    arguments: {
                        Addend1: {
                            type: ArgumentType.STRING,
                            defaultValue: "1/2"
                        },
                        Addend2: {
                            type: ArgumentType.STRING,
                            defaultValue: "1/3"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "SubtractFraction",
                    blockType: BlockType.REPORTER,
                    text: lang("SubtractFractionText"),
                    tooltip: lang("SubtractFractionDesc"),
                    arguments: {
                        Minuend: {
                            type: ArgumentType.STRING,
                            defaultValue: "1/2"
                        },
                        Subtrahend: {
                            type: ArgumentType.STRING,
                            defaultValue: "1/3"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "MultiplyFraction",
                    blockType: BlockType.REPORTER,
                    text: lang("MultiplyFractionText"),
                    tooltip: lang("MultiplyFractionDesc"),
                    arguments: {
                        Multiplier1: {
                            type: ArgumentType.STRING,
                            defaultValue: "2/3"
                        },
                        Multiplier2: {
                            type: ArgumentType.STRING,
                            defaultValue: "3/4"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "DivideFraction",
                    blockType: BlockType.REPORTER,
                    text: lang("DivideFractionText"),
                    tooltip: lang("DivideFractionDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "2/3"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "3/4"
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang("TrigOperator"),
                {
                    opcode: "TrigRadFunction",
                    blockType: BlockType.REPORTER,
                    text: lang("TrigRadText"),
                    tooltip: lang("TrigRadDesc"),
                    arguments: {
                        menu: {
                            type: ArgumentType.STRING,
                            menu: "trigRadMenu"
                        },
                        Radians: {
                            type: ArgumentType.NUMBER,
                            defaultValue: Math.PI / 4
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ArctrigRadFunction",
                    blockType: BlockType.REPORTER,
                    text: lang("ArctrigRadText"),
                    tooltip: lang("ArctrigRadDesc"),
                    arguments: {
                        menu: {
                            type: ArgumentType.STRING,
                            menu: "arctrigRadMenu"
                        },
                        Radians: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0.5
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "HyperbolicFunction",
                    blockType: BlockType.REPORTER,
                    text: lang("HyperbolicText"),
                    tooltip: lang("HyperbolicDesc"),
                    arguments: {
                        menu: {
                            type: ArgumentType.STRING,
                            menu: "hyperbolicMenu"
                        },
                        Radians: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "AhyperbolicFunction",
                    blockType: BlockType.REPORTER,
                    text: lang("AhyperbolicText"),
                    tooltip: lang("AhyperbolicDesc"),
                    arguments: {
                        menu: {
                            type: ArgumentType.STRING,
                            menu: "ahyperbolicMenu"
                        },
                        Radians: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Convert",
                    blockType: BlockType.REPORTER,
                    text: lang("ConvertText"),
                    tooltip: lang("ConvertDesc"),
                    arguments: {
                        Value: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        },
                        Menu: {
                            type: ArgumentType.STRING,
                            menu: "convertMenu",
                            defaultValue: lang("degrees")
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Hypotenuse",
                    blockType: BlockType.REPORTER,
                    text: lang("HypotenuseText"),
                    tooltip: lang("HypotenuseDesc"),
                    arguments: {
                        a: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        b: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang("ProportionOperator"),
                {
                    opcode: "ProportionToFraction",
                    blockType: BlockType.REPORTER,
                    text: lang("ProportionToFractionText"),
                    tooltip: lang("ProportionToFractionDesc"),
                    arguments: {
                        Proportion: {
                            type: ArgumentType.STRING,
                            defaultValue: "3:4"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "FractionToProportion",
                    blockType: BlockType.REPORTER,
                    text: lang("FractionToProportionText"),
                    tooltip: lang("FractionToProportionDesc"),
                    arguments: {
                        Proportion: {
                            type: ArgumentType.STRING,
                            defaultValue: "3/4"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ProportionPart",
                    blockType: BlockType.REPORTER,
                    text: lang("ProportionPartText"),
                    tooltip: lang("ProportionPartDesc"),
                    arguments: {
                        Proportion: {
                            type: ArgumentType.STRING,
                            defaultValue: "3:4"
                        },
                        Part: {
                            type: ArgumentType.STRING,
                            menu: "proportionPartMenu",
                            defaultValue: "antecedent"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "SimplifyProportion",
                    blockType: BlockType.REPORTER,
                    text: lang("SimplifyProportionText"),
                    tooltip: lang("SimplifyProportionDesc"),
                    arguments: {
                        Proportion: {
                            type: ArgumentType.STRING,
                            defaultValue: "4:8"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "MultiplySameProportion",
                    blockType: BlockType.REPORTER,
                    text: lang("MultiplySameProportionText"),
                    tooltip: lang("MultiplySameProportionDesc"),
                    arguments: {
                        Proportion: {
                            type: ArgumentType.STRING,
                            defaultValue: "3:4"
                        },
                        Multiplier: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "AddProportion",
                    blockType: BlockType.REPORTER,
                    text: lang("AddProportionText"),
                    tooltip: lang("AddProportionDesc"),
                    arguments: {
                        Addend1: {
                            type: ArgumentType.STRING,
                            defaultValue: "1:2"
                        },
                        Addend2: {
                            type: ArgumentType.STRING,
                            defaultValue: "1:3"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "SubtractProportion",
                    blockType: BlockType.REPORTER,
                    text: lang("SubtractProportionText"),
                    tooltip: lang("SubtractProportionDesc"),
                    arguments: {
                        Minuend: {
                            type: ArgumentType.STRING,
                            defaultValue: "1:2"
                        },
                        Subtrahend: {
                            type: ArgumentType.STRING,
                            defaultValue: "1:3"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "MultiplyProportion",
                    blockType: BlockType.REPORTER,
                    text: lang("MultiplyProportionText"),
                    tooltip: lang("MultiplyProportionDesc"),
                    arguments: {
                        Multiplier1: {
                            type: ArgumentType.STRING,
                            defaultValue: "1:2"
                        },
                        Multiplier2: {
                            type: ArgumentType.STRING,
                            defaultValue: "2:3"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "DivideProportion",
                    blockType: BlockType.REPORTER,
                    text: lang("DivideProportionText"),
                    tooltip: lang("DivideProportionDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "1:2"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "2:3"
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang("BigNumberOperator"),
                {
                    opcode: "BigAdd",
                    blockType: BlockType.REPORTER,
                    text: lang("BigAddText"),
                    tooltip: lang("BigAddDesc"),
                    arguments: {
                        Num1: {
                            type: ArgumentType.STRING,
                            defaultValue: "12345678901234567890"
                        },
                        Num2: {
                            type: ArgumentType.STRING,
                            defaultValue: "98765432109876543210"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "BigSubtract",
                    blockType: BlockType.REPORTER,
                    text: lang("BigSubtractText"),
                    tooltip: lang("BigSubtractDesc"),
                    arguments: {
                        Num1: {
                            type: ArgumentType.STRING,
                            defaultValue: "98765432109876543210"
                        },
                        Num2: {
                            type: ArgumentType.STRING,
                            defaultValue: "12345678901234567890"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "BigMultiply",
                    blockType: BlockType.REPORTER,
                    text: lang("BigMultiplyText"),
                    tooltip: lang("BigMultiplyDesc"),
                    arguments: {
                        Num1: {
                            type: ArgumentType.STRING,
                            defaultValue: "1234567890"
                        },
                        Num2: {
                            type: ArgumentType.STRING,
                            defaultValue: "9876543210"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "BigDivide",
                    blockType: BlockType.REPORTER,
                    text: lang("BigDivideText"),
                    tooltip: lang("BigDivideDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "12345678901234567890"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "1234567890"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "BigMod",
                    blockType: BlockType.REPORTER,
                    text: lang("BigModText"),
                    tooltip: lang("BigModDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "12345678901234567890"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "1234567890"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "BigQuotient",
                    blockType: BlockType.REPORTER,
                    text: lang("BigQuotientText"),
                    tooltip: lang("BigQuotientDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "12345678901234567890"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "1234567890"
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "BigAbsolute",
                    blockType: BlockType.REPORTER,
                    text: lang("BigAbsoluteText"),
                    tooltip: lang("BigAbsoluteDesc"),
                    arguments: {
                        Num: {
                            type: ArgumentType.STRING,
                            defaultValue: "-12345678901234567890"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "BigNegative",
                    blockType: BlockType.REPORTER,
                    text: lang("BigNegativeText"),
                    tooltip: lang("BigNegativeDesc"),
                    arguments: {
                        Num: {
                            type: ArgumentType.STRING,
                            defaultValue: "12345678901234567890"
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "BigPow",
                    blockType: BlockType.REPORTER,
                    text: lang("BigPowText"),
                    tooltip: lang("BigPowDesc"),
                    arguments: {
                        Base: {
                            type: ArgumentType.STRING,
                            defaultValue: "2"
                        },
                        Exponent: {
                            type: ArgumentType.STRING,
                            defaultValue: "100"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "BigPowMod",
                    blockType: BlockType.REPORTER,
                    text: lang("BigPowModText"),
                    tooltip: lang("BigPowModDesc"),
                    arguments: {
                        Base: {
                            type: ArgumentType.STRING,
                            defaultValue: "2"
                        },
                        Exponent: {
                            type: ArgumentType.STRING,
                            defaultValue: "100"
                        },
                        Mod: {
                            type: ArgumentType.STRING,
                            defaultValue: "1000000007"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "BigRoot",
                    blockType: BlockType.REPORTER,
                    text: lang("BigRootText"),
                    tooltip: lang("BigRootDesc"),
                    arguments: {
                        RootIndex: {
                            type: ArgumentType.STRING,
                            defaultValue: "2"
                        },
                        Radicand: {
                            type: ArgumentType.STRING,
                            defaultValue: "100000000000000000000"
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang("ImaginaryOperator"),
                {
                    opcode: "CreateImaginary",
                    blockType: BlockType.REPORTER,
                    text: lang("CreateImaginaryText"),
                    tooltip: lang("CreateImaginaryDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "GetImaginaryPart",
                    blockType: BlockType.REPORTER,
                    text: lang("GetImaginaryPartText"),
                    tooltip: lang("GetImaginaryPartDesc"),
                    arguments: {
                        Imaginary: {
                            type: ArgumentType.STRING,
                            defaultValue: "3i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ImaginaryAdd",
                    blockType: BlockType.REPORTER,
                    text: lang("ImaginaryAddText"),
                    tooltip: lang("ImaginaryAddDesc"),
                    arguments: {
                        Addend1: {
                            type: ArgumentType.STRING,
                            defaultValue: "2i"
                        },
                        Addend2: {
                            type: ArgumentType.STRING,
                            defaultValue: "3i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ImaginarySubtract",
                    blockType: BlockType.REPORTER,
                    text: lang("ImaginarySubtractText"),
                    tooltip: lang("ImaginarySubtractDesc"),
                    arguments: {
                        Minuend: {
                            type: ArgumentType.STRING,
                            defaultValue: "5i"
                        },
                        Subtrahend: {
                            type: ArgumentType.STRING,
                            defaultValue: "2i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ImaginaryMultiply",
                    blockType: BlockType.REPORTER,
                    text: lang("ImaginaryMultiplyText"),
                    tooltip: lang("ImaginaryMultiplyDesc"),
                    arguments: {
                        Multiplier1: {
                            type: ArgumentType.STRING,
                            defaultValue: "2i"
                        },
                        Multiplier2: {
                            type: ArgumentType.STRING,
                            defaultValue: "3i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ImaginaryDivide",
                    blockType: BlockType.REPORTER,
                    text: lang("ImaginaryDivideText"),
                    tooltip: lang("ImaginaryDivideDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "6i"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "2i"
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "ImaginaryMod",
                    blockType: BlockType.REPORTER,
                    text: lang("ImaginaryModText"),
                    tooltip: lang("ImaginaryModDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "7i"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "2i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ImaginaryQuo",
                    blockType: BlockType.REPORTER,
                    text: lang("ImaginaryQuoText"),
                    tooltip: lang("ImaginaryQuoDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "7i"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "2i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ImaginaryPower",
                    blockType: BlockType.REPORTER,
                    text: lang("ImaginaryPowerText"),
                    tooltip: lang("ImaginaryPowerDesc"),
                    arguments: {
                        Base: {
                            type: ArgumentType.STRING,
                            defaultValue: "i"
                        },
                        Index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ImaginaryRoot",
                    blockType: BlockType.REPORTER,
                    text: lang("ImaginaryRootText"),
                    tooltip: lang("ImaginaryRootDesc"),
                    arguments: {
                        RootIndex: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        Base: {
                            type: ArgumentType.STRING,
                            defaultValue: "-4"
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang("ComplexOperator"),
                {
                    opcode: "CreateComplex",
                    blockType: BlockType.REPORTER,
                    text: lang("CreateComplexText"),
                    tooltip: lang("CreateComplexDesc"),
                    arguments: {
                        Real: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        Imaginary: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "GetComplexPart",
                    blockType: BlockType.REPORTER,
                    text: lang("GetComplexPartText"),
                    tooltip: lang("GetComplexPartDesc"),
                    arguments: {
                        Complex: {
                            type: ArgumentType.STRING,
                            defaultValue: "4+3i"
                        },
                        Part: {
                            type: ArgumentType.STRING,
                            menu: "complexPartMenu",
                            defaultValue: "realPart"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexAdd",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexAddText"),
                    tooltip: lang("ComplexAddDesc"),
                    arguments: {
                        Addend1: {
                            type: ArgumentType.STRING,
                            defaultValue: "2+3i"
                        },
                        Addend2: {
                            type: ArgumentType.STRING,
                            defaultValue: "1+2i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexSubtract",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexSubtractText"),
                    tooltip: lang("ComplexSubtractDesc"),
                    arguments: {
                        Minuend: {
                            type: ArgumentType.STRING,
                            defaultValue: "5+4i"
                        },
                        Subtrahend: {
                            type: ArgumentType.STRING,
                            defaultValue: "2+1i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexMultiply",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexMultiplyText"),
                    tooltip: lang("ComplexMultiplyDesc"),
                    arguments: {
                        Multiplier1: {
                            type: ArgumentType.STRING,
                            defaultValue: "2+3i"
                        },
                        Multiplier2: {
                            type: ArgumentType.STRING,
                            defaultValue: "1+2i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexDivide",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexDivideText"),
                    tooltip: lang("ComplexDivideDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "6+8i"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "2+2i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexMod",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexModText"),
                    tooltip: lang("ComplexModDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "7+5i"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "2+1i"
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "ComplexQuo",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexQuoText"),
                    tooltip: lang("ComplexQuoDesc"),
                    arguments: {
                        Dividend: {
                            type: ArgumentType.STRING,
                            defaultValue: "7+5i"
                        },
                        Divisor: {
                            type: ArgumentType.STRING,
                            defaultValue: "2+1i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexDivMod",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexDivModText"),
                    tooltip: lang("ComplexDivModDesc"),
                    arguments: {
                        Number1: {
                            type: ArgumentType.STRING,
                            defaultValue: "7+5i"
                        },
                        Number2: {
                            type: ArgumentType.STRING,
                            defaultValue: "2+1i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexAbsolute",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexAbsoluteText"),
                    tooltip: lang("ComplexAbsoluteDesc"),
                    arguments: {
                        Complex: {
                            type: ArgumentType.STRING,
                            defaultValue: "3+4i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexNegative",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexNegativeText"),
                    tooltip: lang("ComplexNegativeDesc"),
                    arguments: {
                        Complex: {
                            type: ArgumentType.STRING,
                            defaultValue: "3+4i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexRound",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexRoundText"),
                    tooltip: lang("ComplexRoundDesc"),
                    arguments: {
                        Menu: {
                            type: ArgumentType.STRING,
                            menu: "roundingMenu",
                            defaultValue: "round"
                        },
                        Complex: {
                            type: ArgumentType.STRING,
                            defaultValue: "3.7+2.3i"
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "ComplexPower",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexPowerText"),
                    tooltip: lang("ComplexPowerDesc"),
                    arguments: {
                        Base: {
                            type: ArgumentType.STRING,
                            defaultValue: "1+i"
                        },
                        Index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexRoot",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexRootText"),
                    tooltip: lang("ComplexRootDesc"),
                    arguments: {
                        RootIndex: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        Base: {
                            type: ArgumentType.STRING,
                            defaultValue: "3+4i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexSqrt",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexSqrtText"),
                    tooltip: lang("ComplexSqrtDesc"),
                    arguments: {
                        Base: {
                            type: ArgumentType.STRING,
                            defaultValue: "3+4i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexConjugate",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexConjugateText"),
                    tooltip: lang("ComplexConjugateDesc"),
                    arguments: {
                        Complex: {
                            type: ArgumentType.STRING,
                            defaultValue: "3+4i"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "ComplexArg",
                    blockType: BlockType.REPORTER,
                    text: lang("ComplexArgText"),
                    tooltip: lang("ComplexArgDesc"),
                    arguments: {
                        Complex: {
                            type: ArgumentType.STRING,
                            defaultValue: "1+i"
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang("VectorOperator"),
                {
                    opcode: "Vector2D",
                    blockType: BlockType.REPORTER,
                    text: lang("2DVectorText"),
                    tooltip: lang("2DVectorDesc"),
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Vector3D",
                    blockType: BlockType.REPORTER,
                    text: lang("3DVectorText"),
                    tooltip: lang("3DVectorDesc"),
                    arguments: {
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Vector2DAdd",
                    blockType: BlockType.REPORTER,
                    text: lang("2DVectorAddText"),
                    tooltip: lang("2DVectorAddDesc"),
                    arguments: {
                        Vector1: {
                            type: ArgumentType.STRING,
                            defaultValue: "(1,2)"
                        },
                        Vector2: {
                            type: ArgumentType.STRING,
                            defaultValue: "(3,4)"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Vector3DAdd",
                    blockType: BlockType.REPORTER,
                    text: lang("3DVectorAddText"),
                    tooltip: lang("3DVectorAddDesc"),
                    arguments: {
                        Vector1: {
                            type: ArgumentType.STRING,
                            defaultValue: "(1,2,3)"
                        },
                        Vector2: {
                            type: ArgumentType.STRING,
                            defaultValue: "(4,5,6)"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Vector2DSubtract",
                    blockType: BlockType.REPORTER,
                    text: lang("2DVectorSubtractText"),
                    tooltip: lang("2DVectorSubtractDesc"),
                    arguments: {
                        Vector1: {
                            type: ArgumentType.STRING,
                            defaultValue: "(4,5)"
                        },
                        Vector2: {
                            type: ArgumentType.STRING,
                            defaultValue: "(1,2)"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "Vector3DSubtract",
                    blockType: BlockType.REPORTER,
                    text: lang("3DVectorSubtractText"),
                    tooltip: lang("3DVectorSubtractDesc"),
                    arguments: {
                        Vector1: {
                            type: ArgumentType.STRING,
                            defaultValue: "(4,5,6)"
                        },
                        Vector2: {
                            type: ArgumentType.STRING,
                            defaultValue: "(1,2,3)"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "VectorMagnitude",
                    blockType: BlockType.REPORTER,
                    text: lang("VectorMagnitudeText"),
                    tooltip: lang("VectorMagnitudeDesc"),
                    arguments: {
                        Vector: {
                            type: ArgumentType.STRING,
                            defaultValue: "(3,4)"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "VectorScalarMultiply",
                    blockType: BlockType.REPORTER,
                    text: lang("VectorScalarMultiplyText"),
                    tooltip: lang("VectorScalarMultiplyDesc"),
                    arguments: {
                        Vector: {
                            type: ArgumentType.STRING,
                            defaultValue: "(1,2)"
                        },
                        Scalar: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "VectorCrossMultiply",
                    blockType: BlockType.REPORTER,
                    text: lang("VectorCrossMultiplyText"),
                    tooltip: lang("VectorCrossMultiplyDesc"),
                    arguments: {
                        Vector1: {
                            type: ArgumentType.STRING,
                            defaultValue: "(1,2)"
                        },
                        Vector2: {
                            type: ArgumentType.STRING,
                            defaultValue: "(1,2)"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "VectorDotProduct",
                    blockType: BlockType.REPORTER,
                    text: lang("VectorDotProductText"),
                    tooltip: lang("VectorDotProductDesc"),
                    arguments: {
                        Vector1: {
                            type: ArgumentType.STRING,
                            defaultValue: "(1,2)"
                        },
                        Vector2: {
                            type: ArgumentType.STRING,
                            defaultValue: "(1,2)"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "VectorScalarDivide",
                    blockType: BlockType.REPORTER,
                    text: lang("VectorScalarDivideText"),
                    tooltip: lang("VectorScalarDivideDesc"),
                    arguments: {
                        Vector: {
                            type: ArgumentType.STRING,
                            defaultValue: "(2,4)"
                        },
                        Scalar: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "GetVectorPart",
                    blockType: BlockType.REPORTER,
                    text: lang("GetVectorPartText"),
                    tooltip: lang("GetVectorPartDesc"),
                    arguments: {
                        Vector: {
                            type: ArgumentType.STRING,
                            defaultValue: "(3,4,5)"
                        },
                        Part: {
                            type: ArgumentType.STRING,
                            menu: "vectorPartMenu",
                            defaultValue: "x"
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang("EquationOperator"),
                {
                    opcode: "SimplifyExpression",
                    blockType: BlockType.REPORTER,
                    text: lang("SimplifyExpressionText"),
                    tooltip: lang("SimplifyExpressionDesc"),
                    arguments: {
                        Expression: {
                            type: ArgumentType.STRING,
                            defaultValue: "5*a+3*a"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "EquationLikeTerms",
                    blockType: BlockType.REPORTER,
                    text: lang("EquationLikeTermsText"),
                    tooltip: lang("EquationLikeTermsDesc"),
                    arguments: {
                        Expression: {
                            type: ArgumentType.STRING,
                            defaultValue: "5*m+m+2*m"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "EquationSimplifyFraction",
                    blockType: BlockType.REPORTER,
                    text: lang("EquationSimplifyFractionText"),
                    tooltip: lang("EquationSimplifyFractionDesc"),
                    arguments: {
                        Expression: {
                            type: ArgumentType.STRING,
                            defaultValue: "(a^2-1)/(a-1)"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "EquationExponent",
                    blockType: BlockType.REPORTER,
                    text: lang("EquationExponentText"),
                    tooltip: lang("EquationExponentDesc"),
                    arguments: {
                        Expression: {
                            type: ArgumentType.STRING,
                            defaultValue: "a*a*a"
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "EquationFactor",
                    blockType: BlockType.REPORTER,
                    text: lang("EquationFactorText"),
                    tooltip: lang("EquationFactorDesc"),
                    arguments: {
                        Expression: {
                            type: ArgumentType.STRING,
                            defaultValue: "a^2-1"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "EquationExpand",
                    blockType: BlockType.REPORTER,
                    text: lang("EquationExpandText"),
                    tooltip: lang("EquationExpandDesc"),
                    arguments: {
                        Expression: {
                            type: ArgumentType.STRING,
                            defaultValue: "(a+1)*(a-1)"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "EquationValue",
                    blockType: BlockType.REPORTER,
                    text: lang("EquationValueText"),
                    tooltip: lang("EquationValueDesc"),
                    arguments: {
                        Variable: {
                            type: ArgumentType.STRING,
                            defaultValue: "x"
                        },
                        Expression: {
                            type: ArgumentType.STRING,
                            defaultValue: "2*x+3"
                        },
                        Value: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Operator
                },
                '---',
                {
                    opcode: "EquationSolve",
                    blockType: BlockType.REPORTER,
                    text: lang("EquationSolveText"),
                    tooltip: lang("EquationSolveDesc"),
                    arguments: {
                        Equation: {
                            type: ArgumentType.STRING,
                            defaultValue: "2*x+3=7"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "EquationRoots",
                    blockType: BlockType.REPORTER,
                    text: lang("EquationRootsText"),
                    tooltip: lang("EquationRootsDesc"),
                    arguments: {
                        Equation: {
                            type: ArgumentType.STRING,
                            defaultValue: "x^2-5*x+6=0"
                        }
                    },
                    ...COLOR.Operator
                },
                {
                    opcode: "EquationNthRoot",
                    blockType: BlockType.REPORTER,
                    text: lang("EquationNthRootText"),
                    tooltip: lang("EquationNthRootDesc"),
                    arguments: {
                        Equation: {
                            type: ArgumentType.STRING,
                            defaultValue: "x^2-5*x+6=0"
                        },
                        Index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    },
                    ...COLOR.Operator
                },
                '---' + lang('MathNumber'),
                '---' + lang("Number"),
                {
                    opcode: "StringToNumber",
                    blockType: BlockType.REPORTER,
                    text: lang("StringToNumberText"),
                    tooltip: lang("StringToNumberDesc"),
                    arguments: {
                        Text: {
                            type: ArgumentType.STRING,
                            defaultValue: "123"
                        }
                    },
                    ...COLOR.Number
                },
                {
                    opcode: "NumberToTypeString",
                    blockType: BlockType.REPORTER,
                    text: lang("NumberToTypeStringText"),
                    tooltip: lang("NumberToTypeStringDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 123.456
                        },
                        Type: {
                            type: ArgumentType.STRING,
                            menu: "numberTypeMenu",
                            defaultValue: "bigint"
                        }
                    },
                    ...COLOR.Number
                },
                {
                    opcode: "TypeStringToNumber",
                    blockType: BlockType.REPORTER,
                    text: lang("TypeStringToNumberText"),
                    tooltip: lang("TypeStringToNumberDesc"),
                    arguments: {
                        Type: {
                            type: ArgumentType.STRING,
                            menu: "numberTypeMenu",
                            defaultValue: "bigint"
                        },
                        Number: {
                            type: ArgumentType.STRING,
                            defaultValue: "123"
                        }
                    },
                    ...COLOR.Number
                },
                '---' + lang("NumberPart"),
                {
                    opcode: "GetNumberPart",
                    blockType: BlockType.REPORTER,
                    text: lang("GetNumberPartText"),
                    tooltip: lang("GetNumberPartDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: -123.456
                        },
                        Type: {
                            type: ArgumentType.STRING,
                            menu: "NumberPartMenu",
                            defaultValue: "integer"
                        }
                    },
                    ...COLOR.Number
                },
                {
                    opcode: "GetComplexPartFromString",
                    blockType: BlockType.REPORTER,
                    text: lang("GetComplexPartFromStringText"),
                    tooltip: lang("GetComplexPartFromStringDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.STRING,
                            defaultValue: "3+4i"
                        },
                        Type: {
                            type: ArgumentType.STRING,
                            menu: "complexPartMenu",
                            defaultValue: "realPart"
                        }
                    },
                    ...COLOR.Number
                },
                '---' + lang("RelationshipNumber"),
                {
                    opcode: "Gcd",
                    blockType: BlockType.REPORTER,
                    text: lang("GcdText"),
                    tooltip: lang("GcdDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 12
                        },
                        Number2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 18
                        }
                    },
                    ...COLOR.Number
                },
                {
                    opcode: "Lcm",
                    blockType: BlockType.REPORTER,
                    text: lang("LcmText"),
                    tooltip: lang("LcmDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        },
                        Number2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 6
                        }
                    },
                    ...COLOR.Number
                },
                {
                    opcode: "MaxFactor",
                    blockType: BlockType.REPORTER,
                    text: lang("MaxFactorText"),
                    tooltip: lang("MaxFactorDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 12
                        }
                    },
                    ...COLOR.Number
                },
                {
                    opcode: "MinMultiple",
                    blockType: BlockType.REPORTER,
                    text: lang("MinMultipleText"),
                    tooltip: lang("MinMultipleDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    },
                    ...COLOR.Number
                },
                {
                    opcode: "GetFactors",
                    blockType: BlockType.REPORTER,
                    text: lang("GetFactorsText"),
                    tooltip: lang("GetFactorsDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 12
                        }
                    },
                    ...COLOR.Number
                },
                {
                    opcode: "GetNthMultiple",
                    blockType: BlockType.REPORTER,
                    text: lang("GetNthMultipleText"),
                    tooltip: lang("GetNthMultipleDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        Index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        }
                    },
                    ...COLOR.Number
                },
                {
                    opcode: "CommonFactors",
                    blockType: BlockType.REPORTER,
                    text: lang("GetCommonFactorsText"),
                    tooltip: lang("GetCommonFactorsDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        },
                        Number2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Number
                },
                '---' + lang("NumberOther"),
                {
                    opcode: "GetSum",
                    blockType: BlockType.REPORTER,
                    text: lang("GetSumText"),
                    tooltip: lang("GetSumDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 123
                        },
                    },
                    ...COLOR.Number
                },

                {
                    opcode: "GetPrime",
                    blockType: BlockType.REPORTER,
                    text: lang("GetPrimeText"),
                    tooltip: lang("GetPrimeDesc"),
                    arguments: {
                        Index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    },
                    ...COLOR.Number
                },
                {
                    opcode: "GetNumberLength",
                    blockType: BlockType.REPORTER,
                    text: lang("GetNumberLengthText"),
                    tooltip: lang("GetNumberLengthDecs"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1234567890
                        }
                    },
                    ...COLOR.Number
                },
                {
                    opcode: "GetNumberIndex",
                    blockType: BlockType.REPORTER,
                    text: lang("GetNumberIndexText"),
                    tooltip: lang("GetNumberIndexDecs"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1234567890
                        },
                        Index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        }
                    },
                    ...COLOR.Number
                },
                '---' + lang("AdvancedMathCategory"),
                '---' + lang("AngleOperation"),
                // ===== 角度运算积木 =====
                {
                    opcode: "AngleDegree",
                    blockType: BlockType.REPORTER,
                    text: lang("AngleDegreeText"),
                    tooltip: lang("AngleDegreeDesc"),
                    arguments: {
                        Angle: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 45
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "AngleRatio",
                    blockType: BlockType.REPORTER,
                    text: lang("AngleRatioText"),
                    tooltip: lang("AngleRatioDesc"),
                    arguments: {
                        Angle1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 360
                        },
                        Angle2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 90
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "AngleAdd",
                    blockType: BlockType.REPORTER,
                    text: lang("AngleAddText"),
                    tooltip: lang("AngleAddDesc"),
                    arguments: {
                        Angle1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 45
                        },
                        Angle2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "AngleSubtract",
                    blockType: BlockType.REPORTER,
                    text: lang("AngleSubtractText"),
                    tooltip: lang("AngleSubtractDesc"),
                    arguments: {
                        Angle1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 90
                        },
                        Angle2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "AngleMultiply",
                    blockType: BlockType.REPORTER,
                    text: lang("AngleMultiplyText"),
                    tooltip: lang("AngleMultiplyDesc"),
                    arguments: {
                        Angle: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 45
                        },
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "AngleDivide",
                    blockType: BlockType.REPORTER,
                    text: lang("AngleDivideText"),
                    tooltip: lang("AngleDivideDesc"),
                    arguments: {
                        Angle: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 90
                        },
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Combinatorics
                },
                '---' + lang("Combinatorics"),
                // ===== 组合排列积木 =====
                {
                    opcode: "Combination",
                    blockType: BlockType.REPORTER,
                    text: lang("CombinationText"),
                    tooltip: lang("CombinationDesc"),
                    arguments: {
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        },
                        K: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "Permutation",
                    blockType: BlockType.REPORTER,
                    text: lang("PermutationText"),
                    tooltip: lang("PermutationDesc"),
                    arguments: {
                        N: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        },
                        K: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "RepetitionPermutation",
                    blockType: BlockType.REPORTER,
                    text: lang("RepetitionPermutationText"),
                    tooltip: lang("RepetitionPermutationDesc"),
                    arguments: {
                        n: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        k: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "CircularPermutation",
                    blockType: BlockType.REPORTER,
                    text: lang("CircularPermutationText"),
                    tooltip: lang("CircularPermutationDesc"),
                    arguments: {
                        n: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "MultisetPermutation",
                    blockType: BlockType.REPORTER,
                    text: lang("MultisetPermutationText"),
                    tooltip: lang("MultisetPermutationDesc"),
                    arguments: {
                        list: {
                            type: ArgumentType.STRING,
                            defaultValue: "2,1,1"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                '---' + lang("Matrix"),
                {
                    opcode: "CreateMatrix2x2",
                    blockType: BlockType.REPORTER,
                    text: lang("CreateMatrix2x2Text"),
                    tooltip: lang("CreateMatrix2x2Desc"),
                    arguments: {
                        a: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        b: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        c: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        d: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "CreateMatrix3x3",
                    blockType: BlockType.REPORTER,
                    text: lang("CreateMatrix3x3Text"),
                    tooltip: lang("CreateMatrix3x3Desc"),
                    arguments: {
                        a: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        b: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        c: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        d: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 4
                        },
                        e: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        },
                        f: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 6
                        },
                        g: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 7
                        },
                        h: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 8
                        },
                        i: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 9
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "CreateCustomMatrix",
                    blockType: BlockType.REPORTER,
                    text: lang("CreateCustomMatrixText"),
                    tooltip: lang("CreateCustomMatrixDesc"),
                    arguments: {
                        Matrix: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[1,2,3,4],[5,6,7,8]]"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "MatrixAdd",
                    blockType: BlockType.REPORTER,
                    text: lang("MatrixAddText"),
                    tooltip: lang("MatrixAddDesc"),
                    arguments: {
                        A: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[1,2],[3,4]]"
                        },
                        B: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[5,6],[7,8]]"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "MatrixSubtract",
                    blockType: BlockType.REPORTER,
                    text: lang("MatrixSubtractText"),
                    tooltip: lang("MatrixSubtractDesc"),
                    arguments: {
                        A: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[5,6],[7,8]]"
                        },
                        B: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[1,2],[3,4]]"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "MatrixMultiply",
                    blockType: BlockType.REPORTER,
                    text: lang("MatrixMultiplyText"),
                    tooltip: lang("MatrixMultiplyDesc"),
                    arguments: {
                        A: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[1,2],[3,4]]"
                        },
                        B: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[5,6],[7,8]]"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "MatrixScalarMultiply",
                    blockType: BlockType.REPORTER,
                    text: lang("MatrixScalarMultiplyText"),
                    tooltip: lang("MatrixScalarMultiplyDesc"),
                    arguments: {
                        λ: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        M: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[1,2],[3,4]]"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "MatrixTranspose",
                    blockType: BlockType.REPORTER,
                    text: lang("MatrixTransposeText"),
                    tooltip: lang("MatrixTransposeDesc"),
                    arguments: {
                        M: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[1,2],[3,4]]"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "MatrixDeterminant",
                    blockType: BlockType.REPORTER,
                    text: lang("MatrixDeterminantText"),
                    tooltip: lang("MatrixDeterminantDesc"),
                    arguments: {
                        M: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[1,2],[3,4]]"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "MatrixInvertible",
                    blockType: BlockType.REPORTER,
                    text: lang("MatrixTraceText"),
                    tooltip: lang("MatrixTraceDesc"),
                    arguments: {
                        M: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[1,2],[3,4]]"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "MatrixTrace",
                    blockType: BlockType.REPORTER,
                    text: lang("MatrixInvertibleText"),
                    tooltip: lang("MatrixInvertibleDesc"),
                    arguments: {
                        M: {
                            type: ArgumentType.STRING,
                            defaultValue: "[[1,2],[3,4]]"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                '---' + lang("NumberTheory"),
                {
                    opcode: "Constant",
                    blockType: BlockType.REPORTER,
                    text: lang("ConstantText"),
                    tooltip: lang("ConstantDesc"),
                    arguments: {
                        Constant: {
                            type: ArgumentType.STRING,
                            menu: "ConstantMenu",
                            defaultValue: "pi"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "ConstantDigits",
                    blockType: BlockType.REPORTER,
                    text: lang("ConstantDigitsText"),
                    tooltip: lang("ConstantDigitsDesc"),
                    arguments: {
                        Constant: {
                            type: ArgumentType.STRING,
                            menu: "ConstantMenu",
                            defaultValue: "pi"
                        },
                        Index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "MakeRange",
                    blockType: BlockType.REPORTER,
                    text: lang("MakeRangeText"),
                    tooltip: lang("MakeRangeDesc"),
                    arguments: {
                        MinValue: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        MaxValue: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "CountInRange",
                    blockType: BlockType.REPORTER,
                    text: lang("CountInRangeText"),
                    tooltip: lang("CountInRangeDesc"),
                    arguments: {
                        Range: {
                            type: ArgumentType.STRING,
                            defaultValue: "{1~100}"
                        },
                        Type: {
                            type: ArgumentType.STRING,
                            menu: "NumberTypeMenu",
                            defaultValue: "perfect"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "NthInRange",
                    blockType: BlockType.REPORTER,
                    text: lang("NthInRangeText"),
                    tooltip: lang("NthInRangeDesc"),
                    arguments: {
                        Range: {
                            type: ArgumentType.STRING,
                            defaultValue: "{1~100}"
                        },
                        Index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Type: {
                            type: ArgumentType.STRING,
                            menu: "NumberTypeMenu",
                            defaultValue: "perfect"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "CountCongruent",
                    blockType: BlockType.REPORTER,
                    text: lang("CountCongruentText"),
                    tooltip: lang("CountCongruentDesc"),
                    arguments: {
                        Range: {
                            type: ArgumentType.STRING,
                            defaultValue: "{1~100}"
                        },
                        Value: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "NthCongruent",
                    blockType: BlockType.REPORTER,
                    text: lang("NthCongruentText"),
                    tooltip: lang("NthCongruentDesc"),
                    arguments: {
                        Range: {
                            type: ArgumentType.STRING,
                            defaultValue: "{1~100}"
                        },
                        Value: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3
                        },
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        Index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    },
                    ...COLOR.Combinatorics
                },
                '---',
                {
                    opcode: "FactorList",
                    blockType: BlockType.REPORTER,
                    text: lang("FactorListText"),
                    tooltip: lang("FactorListDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 12
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "PrimeFactor",
                    blockType: BlockType.REPORTER,
                    text: lang("PrimeFactorText"),
                    tooltip: lang("PrimeFactorDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 12
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "FactorCount",
                    blockType: BlockType.REPORTER,
                    text: lang("FactorCountText"),
                    tooltip: lang("FactorCountDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 12
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "FactorSum",
                    blockType: BlockType.REPORTER,
                    text: lang("FactorSumText"),
                    tooltip: lang("FactorSumDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 12
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "EulerPhi",
                    blockType: BlockType.REPORTER,
                    text: lang("EulerPhiText"),
                    tooltip: lang("EulerPhiDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 12
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "NthPrime",
                    blockType: BlockType.REPORTER,
                    text: lang("NthPrimeText"),
                    tooltip: lang("NthPrimeDesc"),
                    arguments: {
                        Index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "PrimeCount",
                    blockType: BlockType.REPORTER,
                    text: lang("PrimeCountText"),
                    tooltip: lang("PrimeCountDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "PrimeGap",
                    blockType: BlockType.REPORTER,
                    text: lang("PrimeGapText"),
                    tooltip: lang("PrimeGapDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    },
                    ...COLOR.Combinatorics
                },
                '---' + lang("FunctionOperator"),
                '---',
                {
                    blockType: BlockType.BUTTON,
                    text: lang("FunctionPlotSettingsButton"),
                    onClick: this._openFunctionPlotSettings,
                },
                {
                    opcode: "CreatePlotArea",
                    blockType: BlockType.COMMAND,
                    text: lang("CreatePlotAreaText"),
                    tooltip: lang("CreatePlotAreaDesc"),
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: lang("DefaultPlotAreaName")
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "DestroyPlotArea",
                    blockType: BlockType.COMMAND,
                    text: lang("DestroyPlotAreaText"),
                    tooltip: lang("DestroyPlotAreaDesc"),
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: lang("DefaultPlotAreaName")
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "SetPlotAreaPermission",
                    blockType: BlockType.COMMAND,
                    text: lang("SetPlotAreaPermissionText"),
                    tooltip: lang("SetPlotAreaPermissionDesc"),
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: lang("DefaultPlotAreaName")
                        },
                        permission: {
                            type: ArgumentType.STRING,
                            menu: "PermissionMenu"
                        },
                        action: {
                            type: ArgumentType.STRING,
                            menu: "ActionMenu"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "SetPlotAreaRange",
                    blockType: BlockType.COMMAND,
                    text: lang("SetPlotAreaRangeText"),
                    tooltip: lang("SetPlotAreaRangeDesc"),
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: lang("DefaultPlotAreaName")
                        },
                        axis: {
                            type: ArgumentType.STRING,
                            menu: "AxisMenu"
                        },
                        value: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "ToggleGrid",
                    blockType: BlockType.COMMAND,
                    text: lang("ToggleGridText"),
                    tooltip: lang("ToggleGridDesc"),
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: lang("DefaultPlotAreaName")
                        },
                        show: {
                            type: ArgumentType.STRING,
                            menu: "ShowMenu"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                '---',
                {
                    opcode: "PlotFunction",
                    blockType: BlockType.COMMAND,
                    text: lang("PlotFunctionText"),
                    tooltip: lang("PlotFunctionDesc"),
                    arguments: {
                        window: {
                            type: ArgumentType.STRING,
                            defaultValue: lang("DefaultPlotAreaName")
                        },
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: lang("DefaultFunctionName")
                        },
                        text: {
                            type: ArgumentType.STRING,
                            defaultValue: "x^2"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "SetFunctionFormula",
                    blockType: BlockType.COMMAND,
                    text: lang("SetFunctionFormulaText"),
                    tooltip: lang("SetFunctionFormulaDesc"),
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: lang("DefaultFunctionName")
                        },
                        text: {
                            type: ArgumentType.STRING,
                            defaultValue: "x^2"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "SetFunctionProperty",
                    blockType: BlockType.COMMAND,
                    text: lang("SetFunctionPropertyText"),
                    tooltip: lang("SetFunctionPropertyDesc"),
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: lang("DefaultFunctionName")
                        },
                        property: {
                            type: ArgumentType.STRING,
                            menu: "FunctionPropertyMenu"
                        },
                        text: {
                            type: ArgumentType.STRING,
                            defaultValue: "#FF0000"
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "DeleteFunction",
                    blockType: BlockType.COMMAND,
                    text: lang("DeleteFunctionText"),
                    tooltip: lang("DeleteFunctionDesc"),
                    arguments: {
                        name: {
                            type: ArgumentType.STRING,
                            defaultValue: lang("DefaultFunctionName")
                        }
                    },
                    ...COLOR.Combinatorics
                },
                {
                    opcode: "ClearPlotArea",
                    blockType: BlockType.COMMAND,
                    text: lang("ClearPlotAreaText"),
                    tooltip: lang("ClearPlotAreaDesc"),
                    arguments: {
                        window: {
                            type: ArgumentType.STRING,
                            defaultValue: lang("DefaultPlotAreaName")
                        }
                    },
                    ...COLOR.Combinatorics
                },
                
                '---' + lang("Boolean"),
                '---' + lang("BooleanOperator"),
                {
                    opcode: "BooleanTrue",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanTrueText"),
                    tooltip: lang("BooleanTrueDesc"),
                    arguments: {},
                    disableMonitor: true,
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanFalse",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanFalseText"),
                    tooltip: lang("BooleanFalseDesc"),
                    arguments: {},
                    disableMonitor: true,
                    ...COLOR.Boolean
                },
                '---',
                {
                    opcode: "BooleanCompare",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanCompareText"),
                    tooltip: lang("BooleanCompareDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        },
                        Right: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanGreater",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanGreaterText"),
                    tooltip: lang("BooleanGreaterDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        },
                        Right: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanLess",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanLessText"),
                    tooltip: lang("BooleanLessDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        },
                        Right: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanNotEqual",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanNotEqualText"),
                    tooltip: lang("BooleanNotEqualDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        },
                        Right: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanGreaterEqual",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanGreaterEqualText"),
                    tooltip: lang("BooleanGreaterEqualDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        },
                        Right: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanLessEqual",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanLessEqualText"),
                    tooltip: lang("BooleanLessEqualDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        },
                        Right: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanRandom",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanRandomText"),
                    tooltip: lang("BooleanRandomDesc"),
                    arguments: {
                        Number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanTypeCheck",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanTypeCheckText"),
                    tooltip: lang("BooleanTypeCheckDesc"),
                    arguments: {
                        Text: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        Type: {
                            type: ArgumentType.STRING,
                            menu: "TypeMenu",
                            defaultValue: "数字"
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanApproxEqual",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanApproxEqualText"),
                    tooltip: lang("BooleanApproxEqualDesc"),
                    arguments: {
                        RealNumber: {
                            type: ArgumentType.STRING,
                            defaultValue: "5"
                        },
                        Number: {
                            type: ArgumentType.STRING,
                            defaultValue: "6"
                        },
                        Diff: {
                            type: ArgumentType.STRING,
                            defaultValue: "1"
                        }
                    },
                    ...COLOR.Boolean
                },
                '---',
                {
                    opcode: "BooleanAnd",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanAndText"),
                    tooltip: lang("BooleanAndDesc"),
                    arguments: {
                        Boolean1: {
                            type: ArgumentType.BOOLEAN,
                        },
                        Boolean2: {
                            type: ArgumentType.BOOLEAN,
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanOr",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanOrText"),
                    tooltip: lang("BooleanOrDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.BOOLEAN,
                        },
                        Right: {
                            type: ArgumentType.BOOLEAN,
                        }
                    },
                    ...COLOR.Boolean
                },
                '---',
                {
                    opcode: "BooleanNot",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanNotText"),
                    tooltip: lang("BooleanNotDesc"),
                    arguments: {
                        Boolean: {
                            type: ArgumentType.BOOLEAN,
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanNotAnd",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanNotAndText"),
                    tooltip: lang("BooleanNotAndDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.BOOLEAN,
                        },
                        Right: {
                            type: ArgumentType.BOOLEAN,
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanNotOr",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanNotOrText"),
                    tooltip: lang("BooleanNotOrDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.BOOLEAN,
                        },
                        Right: {
                            type: ArgumentType.BOOLEAN,
                        }
                    },
                    ...COLOR.Boolean
                },
                '---',
                {
                    opcode: "BooleanAndNot",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanAndNotText"),
                    tooltip: lang("BooleanAndNotDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.BOOLEAN,
                        },
                        Right: {
                            type: ArgumentType.BOOLEAN,
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanOrNot",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanOrNotText"),
                    tooltip: lang("BooleanOrNotDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.BOOLEAN,
                        },
                        Right: {
                            type: ArgumentType.BOOLEAN,
                        }
                    },
                    ...COLOR.Boolean
                },
                '---',
                {
                    opcode: "BooleanXnor",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanXnorText"),
                    tooltip: lang("BooleanXnorDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.BOOLEAN,
                        },
                        Right: {
                            type: ArgumentType.BOOLEAN,
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanXor",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanXorText"),
                    tooltip: lang("BooleanXorDesc"),
                    arguments: {
                        Left: {
                            type: ArgumentType.BOOLEAN,
                        },
                        Right: {
                            type: ArgumentType.BOOLEAN,
                        }
                    },
                    ...COLOR.Boolean
                },
                {
                    opcode: "BooleanIsTrue",
                    blockType: BlockType.BOOLEAN,
                    text: lang("BooleanIsTrueText"),
                    tooltip: lang("BooleanIsTrueDesc"),
                    arguments: {
                        Text: {
                            type: ArgumentType.STRING,
                            defaultValue: "3"
                        }
                    },
                    ...COLOR.Boolean
                },

            ];
            return {
                id: "testmathextension",
                name: lang("MathExtensionName"),
                color1: "#6859ff",
                color2: "#5e50e6",
                color3: "#5347cc",
                blocks: this._filterBlocksBySettings(blocks),
                menus: {
                    ErrorText: {
                        items: [
                            {
                                text: lang("returnFalse"),
                                value: "false"
                            },
                            {
                                text: lang("returnNaN"),
                                value: "nan"
                            },
                            {
                                text: lang("returnError"),
                                value: "error"
                            },
                        ]
                    },
                    SupportBoolean: {
                        items: [
                            {
                                text: lang("Support"),
                                value: "Support"
                            },
                            {
                                text: lang("nonSupport"),
                                value: "nonSupport"
                            }
                        ]
                    },
                    TypeMenu: {
                        items: [
                            { text: "数字", value: "数字" },
                            { text: "大整数", value: "大整数" },
                            { text: "高精度", value: "高精度" },
                            { text: "虚数", value: "虚数" },
                            { text: "复数", value: "复数" },
                            { text: "范围", value: "范围" },
                            { text: "分数", value: "分数" },
                            { text: "循环小数", value: "循环小数" },
                            { text: "带分数", value: "带分数" },
                            { text: "布尔", value: "布尔" },
                            { text: "文本", value: "文本" },
                            { text: "向量", value: "向量" },
                            { text: "矩阵", value: "矩阵" },
                            { text: "角度", value: "角度" },
                            { text: "整数", value: "整数" },
                            { text: "小数", value: "小数" },
                            { text: "正数", value: "正数" },
                            { text: "负数", value: "负数" },
                            { text: "非数字", value: "非数字" },
                            { text: "无定义", value: "无定义" },
                            { text: "空值", value: "空值" }
                        ]
                    },
                    trigfunction: {
                        items: [
                            {
                                text: lang("sin"),
                                value: "sin"
                            },
                            {
                                text: lang("cos"),
                                value: "cos"
                            },
                            {
                                text: lang("tan"),
                                value: "tan"
                            },
                            {
                                text: lang("cot"),
                                value: "cot"
                            },
                            {
                                text: lang("sec"),
                                value: "sec"
                            },
                            {
                                text: lang("csc"),
                                value: "csc"
                            }
                        ]
                    },
                    arctrigfunction: {
                        items: [
                            {
                                text: lang("asin"),
                                value: "asin"
                            },
                            {
                                text: lang("acos"),
                                value: "acos"
                            },
                            {
                                text: lang("atan"),
                                value: "atan"
                            },
                            {
                                text: lang("acot"),
                                value: "acot"
                            },
                            {
                                text: lang("asec"),
                                value: "asec"
                            },
                            {
                                text: lang("acsc"),
                                value: "acsc"
                            }
                        ]
                    },
                    powersMenu: {
                        items: [
                            {
                                text: lang("TenPower"),
                                value: "TenPower"
                            },
                            {
                                text: lang("TwoPower"),
                                value: "TwoPower"
                            },
                            {
                                text: lang("EPower"),
                                value: "EPower"
                            }
                        ]
                    },
                    logsMenu: {
                        items: [
                            {
                                text: lang("TenLog"),
                                value: "TenLog"
                            },
                            {
                                text: lang("TwoLog"),
                                value: "TwoLog"
                            },
                            {
                                text: lang("Ln"),
                                value: "Ln"
                            }
                        ]
                    },
                    roundingMenu: {
                        items: [
                            {
                                text: lang("round"),
                                value: "round"
                            },
                            {
                                text: lang("ceil"),
                                value: "ceil"
                            },
                            {
                                text: lang("floor"),
                                value: "floor"
                            }
                        ]
                    },
                    trigRadMenu: {
                        items: [
                            {
                                text: lang("sin"),
                                value: "sin"
                            },
                            {
                                text: lang("cos"),
                                value: "cos"
                            },
                            {
                                text: lang("tan"),
                                value: "tan"
                            },
                            {
                                text: lang("cot"),
                                value: "cot"
                            },
                            {
                                text: lang("sec"),
                                value: "sec"
                            },
                            {
                                text: lang("csc"),
                                value: "csc"
                            }
                        ]
                    },
                    arctrigRadMenu: {
                        items: [
                            {
                                text: lang("asin"),
                                value: "asin"
                            },
                            {
                                text: lang("acos"),
                                value: "acos"
                            },
                            {
                                text: lang("atan"),
                                value: "atan"
                            },
                            {
                                text: lang("acot"),
                                value: "acot"
                            },
                            {
                                text: lang("asec"),
                                value: "asec"
                            },
                            {
                                text: lang("acsc"),
                                value: "acsc"
                            }
                        ]
                    },
                    hyperbolicMenu: {
                        items: [
                            {
                                text: lang("sinh"),
                                value: "sinh"
                            },
                            {
                                text: lang("cosh"),
                                value: "cosh"
                            },
                            {
                                text: lang("tanh"),
                                value: "tanh"
                            },
                            {
                                text: lang("coth"),
                                value: "coth"
                            },
                            {
                                text: lang("sech"),
                                value: "sech"
                            },
                            {
                                text: lang("csch"),
                                value: "csch"
                            }
                        ]
                    },
                    ahyperbolicMenu: {
                        items: [
                            {
                                text: lang("asinh"),
                                value: "asinh"
                            },
                            {
                                text: lang("acosh"),
                                value: "acosh"
                            },
                            {
                                text: lang("atanh"),
                                value: "atanh"
                            },
                            {
                                text: lang("acoth"),
                                value: "acoth"
                            },
                            {
                                text: lang("asech"),
                                value: "asech"
                            },
                            {
                                text: lang("acsch"),
                                value: "acsch"
                            }
                        ]
                    },
                    convertMenu: {
                        items: [
                            {
                                text: lang("degrees"),
                                value: "degrees"
                            },
                            {
                                text: lang("radians"),
                                value: "radians"
                            }
                        ]
                    },
                    proportionPartMenu: {
                        items: [
                            {
                                text: lang("antecedent"),
                                value: "antecedent"
                            },
                            {
                                text: lang("consequent"),
                                value: "consequent"
                            }
                        ]
                    },
                    fractionPartMenu: {
                        items: [
                            {
                                text: lang("numerator"),
                                value: "numerator"
                            },
                            {
                                text: lang("denominator"),
                                value: "denominator"
                            }
                        ]
                    },
                    complexPartMenu: {
                        items: [
                            {
                                text: lang("realPart"),
                                value: "realPart"
                            },
                            {
                                text: lang("imaginaryPart"),
                                value: "imaginaryPart"
                            }
                        ]
                    },
                    FunctionPropertyMenu: {
                        items: [
                            {
                                text: lang("PropertyFormula"),
                                value: "formula"
                            },
                            {
                                text: lang("PropertyColor"),
                                value: "color"
                            }
                        ]
                    },
                    PermissionMenu: {
                        items: [
                            {
                                text: lang("PermissionAllow"),
                                value: "allow"
                            },
                            {
                                text: lang("PermissionDeny"),
                                value: "deny"
                            }
                        ]
                    },
                    ActionMenu: {
                        items: [
                            {
                                text: lang("ActionDrag"),
                                value: "drag"
                            },
                            {
                                text: lang("ActionFullscreen"),
                                value: "fullscreen"
                            },
                            {
                                text: lang("ActionZoom"),
                                value: "zoom"
                            },
                            {
                                text: lang("ActionClose"),
                                value: "close"
                            }
                        ]
                    },
                    AxisMenu: {
                        items: [
                            {
                                text: lang("AxisMaxX"),
                                value: "maxX"
                            },
                            {
                                text: lang("AxisMinX"),
                                value: "minX"
                            },
                            {
                                text: lang("AxisMaxY"),
                                value: "maxY"
                            },
                            {
                                text: lang("AxisMinY"),
                                value: "minY"
                            }
                        ]
                    },
                    ShowMenu: {
                        items: [
                            {
                                text: lang("ShowGrid"),
                                value: "show"
                            },
                            {
                                text: lang("HideGrid"),
                                value: "hide"
                            }
                        ]
                    },
                    numberTypeMenu: {
                        items: [
                            {
                                text: lang("bigint"),
                                value: "bigint"
                            },
                            {
                                text: lang("highprecision"),
                                value: "highprecision"
                            },
                            {
                                text: lang("imaginary"),
                                value: "imaginary"
                            },
                            {
                                text: lang("complex"),
                                value: "complex"
                            }
                        ]
                    },
                    NumberPartMenu: {
                        items: [
                            {
                                text: lang("integerPart"),
                                value: "integer"
                            },
                            {
                                text: lang("decimalPart"),
                                value: "decimal"
                            },
                            {
                                text: lang("signPart"),
                                value: "sign"
                            }
                        ]
                    },
                    vectorPartMenu: {
                        items: [
                            {
                                text: lang("xComponent"),
                                value: "x"
                            },
                            {
                                text: lang("yComponent"),
                                value: "y"
                            },
                            {
                                text: lang("zComponent"),
                                value: "z"
                            }
                        ]
                    },
                    ConstantMenu: {
                        items: [
                            { text: "π", value: "pi" },
                            { text: "e", value: "e" },
                            { text: "φ", value: "phi" }
                        ]
                    },
                    NumberTypeMenu: {
                        items: [
                            { text: lang("PrimeNumber"), value: "prime" },
                            { text: lang("CompositeNumber"), value: "composite" },
                            { text: lang("NaturalNumber"), value: "natural" },
                            { text: lang("IntegerNumber"), value: "integer" },
                            { text: lang("PerfectNumber"), value: "perfect" },
                            { text: lang("ExponentialNumber"), value: "exponential" },
                            { text: lang("SemiPrimeNumber"), value: "semiprime" },
                            { text: lang("SquareNumber"), value: "square" },
                            { text: lang("CubeNumber"), value: "cube" }
                        ]
                    },
                }
            };
        }

        //                                                                                  额外函数
        /**
         * _gcd
         * 参数 {number} a - 第一个整数
         * 参数 {number} b - 第二个整数
         * 返回 {number} - 两个整数的最大公约数.
         * 道理 {步骤}-
         *       1.使用欧几里得算法计算最大公约数
         *       2.取参数的绝对值进行计算
         *       3.通过迭代求余数直到余数为0
         */
        _gcd(a, b) {
            a = this.Absolute({ Number: a });
            b = this.Absolute({ Number: b });
            while (b !== 0) {
                const temp = b;
                b = a % b;  // 修复：使用取余操作，而不是除法
                a = temp;
            }
            return a;
        }

        /**
         * _isInfiniteDecimal
         * 参数 {number} numerator - 分子
         * 参数 {number} denominator - 分母
         * 返回 {boolean} - 是否为无限循环小数.
         * 道理 {步骤}-
         *       1.计算分子分母的最大公约数
         *       2.简化分母并移除2和5的因子
         *       3.如果简化后的分母不为1，则是无限循环小数
         */
        _isInfiniteDecimal(numerator, denominator) {
            if (denominator === 0) return true;

            // 修复：确保参数正确传递
            const gcd = this._gcd(numerator, denominator);

            let simplifiedDenominator = Math.abs(denominator) / gcd;
            while (simplifiedDenominator % 2 === 0) simplifiedDenominator /= 2;
            while (simplifiedDenominator % 5 === 0) simplifiedDenominator /= 5;

            return simplifiedDenominator !== 1;
        }

        /**
         * _parseNumber
         * 参数 {string} numStr - 要解析的数字字符串
         * 返回 {object} - 包含符号、整数部分和小数部分的对象.
         * 道理 {步骤}-
         *       1.处理布尔值（根据supportBoolean设置）
         *       2.处理科学计数法表示的数字
         *       3.解析常规数字字符串为符号、整数和小数部分
         */
        _parseNumber(numStr) {
            if (this.supportBoolean) {
                if (numStr === true || numStr === 'true') return { sign: 1, integer: '1', decimal: '' };
                if (numStr === false || numStr === 'false') return { sign: 1, integer: '0', decimal: '' };
            } else {
                if (numStr === true || numStr === 'true') return { sign: 1, integer: '0', decimal: '' };
                if (numStr === false || numStr === 'false') return { sign: 1, integer: '0', decimal: '' };
            }

            if (numStr.includes('e') || numStr.includes('E')) {
                const [base, exp] = numStr.split(/[eE]/);
                const expNum = parseInt(exp, 10);
                const { integer: baseInt, decimal: baseDec } = this._splitIntDec(base);
                if (expNum >= 0) {
                    const newInt = baseInt + baseDec.slice(0, expNum).padEnd(expNum, '0');
                    const newDec = baseDec.slice(expNum);
                    return { sign: base.startsWith('-') ? -1 : 1, integer: newInt.replace('-', ''), decimal: newDec };
                } else {
                    const padZero = Math.abs(expNum) - baseInt.length;
                    const newInt = padZero > 0 ? '0'.repeat(padZero) + baseInt : baseInt.slice(-expNum);
                    const newDec = padZero > 0 ? baseInt.slice(0, -padZero) + baseDec : baseDec;
                    return { sign: base.startsWith('-') ? -1 : 1, integer: newInt.replace('-', ''), decimal: newDec };
                }
            }

            const sign = numStr.startsWith('-') ? -1 : 1;
            const pureStr = numStr.replace('-', '');
            const { integer, decimal } = this._splitIntDec(pureStr);
            return { sign, integer, decimal };
        }

        /**
         * _splitIntDec
         * 参数 {string} str - 要分割的数字字符串
         * 返回 {object} - 包含整数部分和小数部分的对象.
         * 道理 {步骤}-
         *       1.按小数点分割字符串
         *       2.处理空字符串的情况，默认设为'0'
         *       3.返回整数和小数部分
         */
        _splitIntDec(str) {
            if (str.includes('.')) {
                const [integer, decimal] = str.split('.', 2);
                return { integer: integer || '0', decimal: decimal || '' };
            }
            return { integer: str || '0', decimal: '' };
        }

        /**
         * _padDecimal
         * 参数 {string} dec - 要填充的小数字符串
         * 参数 {number} targetLength - 目标长度
         * 返回 {string} - 填充后的小数字符串.
         * 道理 {步骤}-
         *       1.在右侧用'0'填充到目标长度
         *       2.如果超过目标长度则截断
         *       3.确保小数部分长度一致以便计算
         */
        _padDecimal(dec, targetLength) {
            return dec.padEnd(targetLength, '0').slice(0, targetLength);
        }

        /**
         * _addDecimal
         * 参数 {string} dec1 - 第一个小数字符串
         * 参数 {string} dec2 - 第二个小数字符串
         * 参数 {number} carry - 进位值
         * 返回 {object} - 包含结果小数和进位的对象.
         * 道理 {步骤}-
         *       1.反转小数字符串以便从低位开始计算
         *       2.逐位相加并处理进位
         *       3.将结果反转回正常顺序
         */
        _addDecimal(dec1, dec2, carry) {
            let decSum = '';
            const reversedDec1 = dec1.split('').reverse().join('');
            const reversedDec2 = dec2.split('').reverse().join('');

            for (let i = 0; i < reversedDec1.length; i++) {
                const digit1 = parseInt(reversedDec1[i], 10) || 0;
                const digit2 = parseInt(reversedDec2[i], 10) || 0;
                const total = digit1 + digit2 + carry;
                decSum += (total % 10).toString();
                carry = Math.floor(total / 10);
            }

            return { dec: decSum.split('').reverse().join(''), carry };
        }

        /**
         * _addInteger
         * 参数 {string} int1 - 第一个整数字符串
         * 参数 {string} int2 - 第二个整数字符串
         * 参数 {number} carry - 进位值
         * 返回 {object} - 包含结果整数和进位的对象.
         * 道理 {步骤}-
         *       1.反转整数字符串以便从低位开始计算
         *       2.逐位相加并处理进位
         *       3.将结果反转回正常顺序
         */
        _addInteger(int1, int2, carry) {
            let intSum = '';
            const reversedInt1 = int1.split('').reverse().join('');
            const reversedInt2 = int2.split('').reverse().join('');
            const maxLength = Math.max(reversedInt1.length, reversedInt2.length);

            for (let i = 0; i < maxLength; i++) {
                const digit1 = parseInt(reversedInt1[i], 10) || 0;
                const digit2 = parseInt(reversedInt2[i], 10) || 0;
                const total = digit1 + digit2 + carry;
                intSum += (total % 10).toString();
                carry = Math.floor(total / 10);
            }

            return { int: intSum.split('').reverse().join(''), carry };
        }

        /**
         * _subtractInteger
         * 参数 {string} int1 - 被减数整数字符串
         * 参数 {string} int2 - 减数整数字符串
         * 参数 {number} borrow - 借位值
         * 返回 {object} - 包含结果整数和借位的对象.
         * 道理 {步骤}-
         *       1.反转整数字符串以便从低位开始计算
         *       2.逐位相减并处理借位
         *       3.移除前导零并将结果反转回正常顺序
         */
        _subtractInteger(int1, int2, borrow) {
            let intDiff = '';
            const reversedInt1 = int1.split('').reverse().join('');
            const reversedInt2 = int2.split('').reverse().join('');
            const maxLength = Math.max(reversedInt1.length, reversedInt2.length);

            for (let i = 0; i < maxLength; i++) {
                let digit1 = parseInt(reversedInt1[i], 10) || 0;
                const digit2 = parseInt(reversedInt2[i], 10) || 0;

                digit1 -= borrow;
                borrow = 0;
                if (digit1 < digit2) {
                    digit1 += 10;
                    borrow = 1;
                }

                const diff = digit1 - digit2;
                intDiff += diff.toString();
            }

            const reversedDiff = intDiff.split('').reverse().join('').replace(/^0+/, '');
            return { int: reversedDiff || '0', carry: borrow };
        }

        /**
         * _subtractDecimal
         * 参数 {string} dec1 - 被减数小数字符串
         * 参数 {string} dec2 - 减数小数字符串
         * 参数 {number} borrow - 借位值
         * 返回 {object} - 包含结果小数和借位的对象.
         * 道理 {步骤}-
         *       1.反转小数字符串以便从低位开始计算
         *       2.逐位相减并处理借位
         *       3.移除尾随零并将结果反转回正常顺序
         */
        _subtractDecimal(dec1, dec2, borrow) {
            let decDiff = '';
            const reversedDec1 = dec1.split('').reverse().join('');
            const reversedDec2 = dec2.split('').reverse().join('');

            for (let i = 0; i < reversedDec1.length; i++) {
                let digit1 = parseInt(reversedDec1[i], 10) || 0;
                const digit2 = parseInt(reversedDec2[i], 10) || 0;

                digit1 -= borrow;
                borrow = 0;
                if (digit1 < digit2) {
                    digit1 += 10;
                    borrow = 1;
                }

                const diff = digit1 - digit2;
                decDiff += diff.toString();
            }

            const reversedDiff = decDiff.split('').reverse().join('').replace(/0+$/, '');
            return { dec: reversedDiff, carry: borrow };
        }

        /**
         * _multiplyIntegers
         * 参数 {string} num1 - 第一个乘数字符串
         * 参数 {string} num2 - 第二个乘数字符串
         * 返回 {string} - 乘法结果的字符串表示.
         * 道理 {步骤}-
         *       1.使用竖式乘法算法
         *       2.处理零的特殊情况
         *       3.逐位相乘并累加到正确位置
         *       4.处理进位并移除前导零
         */
        _multiplyIntegers(num1, num2) {
            if (num1 === '0' || num2 === '0') return '0';

            const len1 = num1.length;
            const len2 = num2.length;
            const result = new Array(len1 + len2).fill(0);

            for (let i = len1 - 1; i >= 0; i--) {
                const digit1 = parseInt(num1[i], 10);

                for (let j = len2 - 1; j >= 0; j--) {
                    const digit2 = parseInt(num2[j], 10);
                    const product = digit1 * digit2;
                    const p1 = i + j;
                    const p2 = i + j + 1;
                    const sum = product + result[p2];

                    result[p1] += Math.floor(sum / 10);
                    result[p2] = sum % 10;
                }
            }

            let resultStr = result.join('').replace(/^0+/, '');
            return resultStr || '0';
        }

        /**
         * _compareIntegers
         * 参数 {string} a - 第一个整数字符串
         * 参数 {string} b - 第二个整数字符串
         * 返回 {number} - 比较结果：1(a>b), -1(a<b), 0(a=b).
         * 道理 {步骤}-
         *       1.移除前导零
         *       2.先比较长度，长度大的数值大
         *       3.长度相同时逐位比较
         */
        _compareIntegers(a, b) {
            a = a.replace(/^0+/, '') || '0';
            b = b.replace(/^0+/, '') || '0';

            if (a.length > b.length) return 1;
            if (a.length < b.length) return -1;

            for (let i = 0; i < a.length; i++) {
                if (a[i] > b[i]) return 1;
                if (a[i] < b[i]) return -1;
            }
            return 0;
        }

        /**
         * _divideIntegers
         * 参数 {string} dividend - 被除数字符串
         * 参数 {string} divisor - 除数字符串
         * 返回 {object} - 包含商和余数的对象.
         * 道理 {步骤}-
         *       1.使用长除法算法
         *       2.处理除数为零的情况
         *       3.逐位计算商和余数
         *       4.移除商的前导零
         */
        _divideIntegers(dividend, divisor) {
            if (divisor === '0') throw new Error('Division by zero');
            if (this._compareIntegers(dividend, divisor) < 0) {
                return { quotient: '0', remainder: dividend };
            }

            let quotient = '';
            let remainder = '';
            let index = 0;

            while (index < dividend.length) {
                remainder += dividend[index];
                remainder = remainder.replace(/^0+/, '') || '0';
                index++;

                let count = 0;
                while (this._compareIntegers(remainder, divisor) >= 0) {
                    const subResult = this._subtractInteger(remainder, divisor, 0);
                    remainder = subResult.int;
                    count++;
                }

                quotient += count.toString();
            }

            quotient = quotient.replace(/^0+/, '') || '0';
            return { quotient, remainder };
        }

        /**
         * _combineIntDec
         * 参数 {string} int - 整数部分字符串
         * 参数 {string} dec - 小数部分字符串
         * 返回 {string} - 组合后的完整数字字符串.
         * 道理 {步骤}-
         *       1.简单连接整数和小数部分
         *       2.用于比较绝对值的计算
         */
        _combineIntDec(int, dec) {
            return int + dec;
        }

        /**
         * _isAbsGreater
         * 参数 {string} abs1 - 第一个绝对值字符串
         * 参数 {string} abs2 - 第二个绝对值字符串
         * 返回 {boolean} - abs1是否大于abs2.
         * 道理 {步骤}-
         *       1.先比较长度，长度大的数值大
         *       2.长度相同时逐位比较
         */
        _isAbsGreater(abs1, abs2) {
            if (abs1.length !== abs2.length) {
                return abs1.length > abs2.length;
            }
            for (let i = 0; i < abs1.length; i++) {
                const digit1 = parseInt(abs1[i], 10);
                const digit2 = parseInt(abs2[i], 10);
                if (digit1 !== digit2) {
                    return digit1 > digit2;
                }
            }
            return false;
        }

        /**
         * _formatResult
         * 参数 {number} sign - 符号（1或-1）
         * 参数 {string} int - 整数部分字符串
         * 参数 {string} dec - 小数部分字符串
         * 返回 {string} - 格式化后的数字字符串.
         * 道理 {步骤}-
         *       1.移除整数部分的前导零
         *       2.移除小数部分的尾随零
         *       3.处理负零的情况
         *       4.组合符号、整数和小数部分
         */
        _formatResult(sign, int, dec) {
            const formattedInt = int.replace(/^0+/, '') || '0';
            let processedDec = dec.replace(/0+$/, '');
            const hasDecimal = processedDec !== '';

            if (sign === -1 && formattedInt === '0' && !hasDecimal) {
                return '0';
            }

            const formattedSign = sign === -1 ? '-' : '';
            const formattedDec = hasDecimal ? `.${processedDec}` : '';

            return `${formattedSign}${formattedInt}${formattedDec}`;
        }

        /**
         * _floorNumber
         * 参数 {string} numStr - 输入数字字符串
         * 返回 {string} - 向下取整后的数字字符串.
         * 道理 {步骤}-
         *       1.解析数字的符号、整数和小数部分
         *       2.对于负数且有小数的特殊情况处理
         *       3.返回整数部分
         */
        _floorNumber(numStr) {
            const { sign, integer, decimal } = this._parseNumber(numStr);
            if (sign === -1 && decimal && decimal !== '0') {
                const { int: floorInt } = this._subtractInteger(integer, '1', 0);
                return this._formatResult(sign, floorInt, '');
            }
            return this._formatResult(sign, integer, '');
        }

        /**
         * _isInteger
         * 参数 {string} numStr - 输入数字字符串
         * 返回 {boolean} - 是否为整数.
         * 道理 {步骤}-
         *       1.检查小数部分是否为空或全为零
         */
        _isInteger(numStr) {
            const { decimal } = this._parseNumber(numStr);
            return decimal === '' || decimal.replace(/0+$/, '') === '';
        }

        /**
         * _isZero
         * 参数 {string} numStr - 输入数字字符串
         * 返回 {boolean} - 是否为零.
         * 道理 {步骤}-
         *       1.检查整数部分是否为0且小数部分为空或全为零
         */
        _isZero(numStr) {
            const { sign, integer, decimal } = this._parseNumber(numStr);
            return integer === '0' && decimal.replace(/0+$/, '') === '';
        }

        /**
         * _reciprocal
         * 参数 {string} numStr - 输入数字字符串
         * 返回 {string} - 倒数结果.
         * 道理 {步骤}-
         *       1.调用Divide方法计算1除以输入数字
         */
        _reciprocal(numStr) {
            return this.Divide({ Dividend: 1, Divisor: numStr });
        }

        /**
         * _roundToPrecision
         * 参数 {string} numStr - 要舍入的数字字符串
         * 参数 {number} precision - 精度（小数位数）
         * 返回 {string} - 舍入到指定精度的数字字符串.
         * 道理 {步骤}-
         *       1.如果精度为负，直接返回原数字
         *       2.如果小数位数小于等于精度，直接返回
         *       3.否则进行四舍五入处理
         *       4.处理进位到整数部分的情况
         */
        _roundToPrecision(numStr, precision) {
            if (precision < 0) return numStr;

            let { sign, integer, decimal } = this._parseNumber(numStr);

            // 如果小数位数小于等于精度，直接返回
            if (decimal.length <= precision) {
                return this._formatResult(sign, integer, decimal);
            }

            // 截取到指定精度的小数部分
            let truncatedDec = decimal.slice(0, precision);
            const nextDigit = parseInt(decimal[precision], 10) || 0;

            // 如果需要四舍五入
            if (nextDigit >= 5) {
                // 将截取的小数部分当作整数加1
                let carry = 1;
                let newDec = '';

                // 从右向左处理小数部分
                for (let i = truncatedDec.length - 1; i >= 0; i--) {
                    const digit = parseInt(truncatedDec[i], 10) + carry;
                    if (digit === 10) {
                        newDec = '0' + newDec;
                        carry = 1;
                    } else {
                        newDec = digit.toString() + newDec;
                        carry = 0;
                    }
                }

                truncatedDec = newDec;

                // 如果小数部分有进位到整数部分
                if (carry > 0) {
                    let newInt = integer;
                    let intCarry = carry;

                    // 从右向左处理整数部分
                    let newIntResult = '';
                    for (let i = newInt.length - 1; i >= 0; i--) {
                        const digit = parseInt(newInt[i], 10) + intCarry;
                        if (digit === 10) {
                            newIntResult = '0' + newIntResult;
                            intCarry = 1;
                        } else {
                            newIntResult = digit.toString() + newIntResult;
                            intCarry = 0;
                        }
                    }

                    if (intCarry > 0) {
                        newIntResult = '1' + newIntResult;
                    }

                    integer = newIntResult;
                }
            }

            return this._formatResult(sign, integer, truncatedDec);
        }

        /**
         * _exponentialFunction
         * 参数 {string} x - 指数函数的输入值
         * 返回 {string} - e^x的近似值.
         * 道理 {步骤}-
         *       1.使用泰勒级数展开计算指数函数
         *       2.迭代计算直到项足够小或达到最大迭代次数
         *       3.累加各项得到最终结果
         */
        _exponentialFunction(x) {
            let result = "1";
            let term = "1";
            let i = 1;
            const maxIterations = 50;

            while (i <= maxIterations) {
                term = this.Divide({
                    Dividend: this.Multiply({ Multiplier1: term, Multiplier2: x }),
                    Divisor: i.toString()
                });

                const newResult = this.Add({ Addend1: result, Addend2: term });

                if (newResult === result) {
                    break;
                }

                result = newResult;
                i++;
            }

            return result;
        }

        /**
         * _handleError
         * 参数 {string} errorMessage - 错误消息
         * 返回 {any} - 根据错误处理设置返回相应值.
         * 道理 {步骤}-
         *       1.根据errorText设置处理错误
         *       2.返回false、NaN或在控制台报错
         */
        _handleError(errorMessage, stats = "simple", toF = false, Fug = "") {
            let ErrorText = ""
            if (typeof lang(errorMessage) === "string") {
                switch (this.errorText) {
                    case 1:
                        return false;
                    case 2:
                        switch (stats) {
                            case "simple":
                                return NaN
                            case "one":
                                return 1
                            case "zero":
                                return 0;
                            case "inf":
                                return "infinity"
                            case "-inf":
                                return "-infinity"
                            default:
                                return NaN
                        }
                    case 3:
                        this.runtime.logSystem.show();
                        ErrorText = lang(errorMessage)
                        if (toF) {
                            Fug = lang(Fug);
                            this.runtime.logSystem.error(ErrorText.replace("[Thing]", Fug));
                        } else {
                            this.runtime.logSystem.error(ErrorText);
                        }
                        return ErrorText;
                    default:
                        return "error";
                }
            } else {
                switch (this.errorText) {
                    case 1:
                        return false;
                    case 2:
                        switch (stats) {
                            case "simple":
                                return NaN
                            case "one":
                                return 1
                            case "zero":
                                return 0;
                            case "inf":
                                return "infinity"
                            case "-inf":
                                return "-infinity"
                            default:
                                return NaN
                        }
                    case 3:
                        this.runtime.logSystem.show();
                        if (toF) {
                            this.runtime.logSystem.error(ErrorText.replace("[Thing]", Fug));
                        } else {
                            this.runtime.logSystem.error(ErrorText);
                        }
                        return ErrorText;
                    default:
                        return "error";
                }
            }
        }

        /**
         * _naturalLogarithm
         * 参数 {string} x - 输入值（必须大于0）
         * 返回 {string} - ln(x)的近似值.
         * 道理 {步骤}-
         *       1.使用参数缩减将输入值调整到接近1的范围
         *       2.使用对数恒等式和级数展开计算
         *       3.结合ln2的预计算值得到最终结果
         */
        _naturalLogarithm(x) {
            if (parseFloat(x) <= 0) {
                return this._handleError("CannotBeZero", "simple", true, "");
            }

            let n = 0;
            let num = x;
            while (parseFloat(num) >= 2) {
                num = this.Divide({ Dividend: num, Divisor: "2" });
                n++;
            }
            while (parseFloat(num) < 1) {
                num = this.Multiply({ Multiplier1: num, Multiplier2: "2" });
                n--;
            }

            const ln2 = "0.69314718055994530941723212145818";
            let result = this.Multiply({ Multiplier1: n.toString(), Multiplier2: ln2 });

            const y = this.Divide({
                Dividend: this.Subtract({ Minuend: num, Subtrahend: "1" }),
                Divisor: this.Add({ Addend1: num, Addend2: "1" })
            });

            let yPower = y;
            let term = y;
            let i = 1;

            while (i <= 20 && parseFloat(term) > 1e-15) {
                result = this.Add({ Addend1: result, Addend2: this.Multiply({ Multiplier1: "2", Multiplier2: term }) });
                i += 2;
                yPower = this.Multiply({
                    Multiplier1: this.Multiply({ Multiplier1: yPower, Multiplier2: y }),
                    Multiplier2: y
                });
                term = this.Divide({ Dividend: yPower, Divisor: i.toString() });
            }

            return result;
        }

        /**
         * _isPerfectPower
         * 参数 {string} numStr - 要检查的数字
         * 参数 {number} rootIndex - 根指数
         * 返回 {object} - 包含是否为完全幂和根值的对象.
         * 道理 {步骤}-
         *       1.检查数字是否为某个整数的指定次幂
         *       2.在有限范围内搜索可能的根
         *       3.返回检查结果和根值（如果找到）
         */
        _isPerfectPower(numStr, rootIndex) {
            const num = parseFloat(numStr);
            if (num < 0) return false;

            const maxCheck = Math.min(Math.floor(num) + 1, 1000);

            for (let i = 0; i <= maxCheck; i++) {
                let power = "1";
                for (let j = 0; j < rootIndex; j++) {
                    power = this.Multiply({ Multiplier1: power, Multiplier2: i.toString() });
                    if (parseFloat(power) > num) break;
                }
                if (parseFloat(power) === num) {
                    return { isPerfect: true, root: i.toString() };
                }
            }

            return { isPerfect: false, root: null };
        }

        /**
         * _exactRoot
         * 参数 {string} numStr - 被开方数
         * 参数 {string} rootIndex - 根指数
         * 返回 {string|null} - 精确的根值或null.
         * 道理 {步骤}-
         *       1.检查是否为完全幂
         *       2.处理负数的奇次根
         *       3.返回精确根值或null
         */
        _exactRoot(numStr, rootIndex) {
            const { isPerfect, root } = this._isPerfectPower(numStr, parseInt(rootIndex, 10));
            if (isPerfect) {
                const { sign } = this._parseNumber(numStr);
                const signStr = sign === -1 && rootIndex % 2 === 1 ? '-' : '';
                return signStr + root;
            }
            return null;
        }

        /**
         * _newtonRootWithPrecision
         * 参数 {string} radicand - 被开方数
         * 参数 {string} rootIndex - 根指数
         * 返回 {string} - 根运算结果.
         * 道理 {步骤}-
         *       1.先检查是否有精确解
         *       2.使用牛顿迭代法求近似解
         *       3.迭代直到收敛或达到最大迭代次数
         *       4.返回舍入到指定精度的结果
         */
        _newtonRootWithPrecision(radicand, rootIndex) {
            const exactResult = this._exactRoot(radicand, parseInt(rootIndex, 10));
            if (exactResult) {
                return exactResult;
            }

            const rootIndexNum = parseFloat(rootIndex);
            const radicandNum = parseFloat(radicand);

            let guess;
            if (radicandNum > 1) {
                guess = Math.pow(radicandNum, 1 / rootIndexNum).toString();
            } else if (radicandNum > 0) {
                guess = Math.pow(radicandNum, 1 / rootIndexNum).toString();
            } else {
                guess = (-Math.pow(-radicandNum, 1 / rootIndexNum)).toString();
            }

            const tolerance = "0." + "0".repeat(this.decimal) + "1";
            let prevGuess;
            let iterations = 0;
            const maxIterations = 100;
            let hasConverged = false;

            do {
                prevGuess = guess;

                const powerTerm = this.Power({
                    Base: guess,
                    Exponent: this.Subtract({
                        Minuend: rootIndex,
                        Subtrahend: "1"
                    })
                });

                const divisionTerm = this.Divide({
                    Dividend: radicand,
                    Divisor: powerTerm
                });

                const numerator = this.Add({
                    Addend1: this.Multiply({
                        Multiplier1: this.Subtract({
                            Minuend: rootIndex,
                            Subtrahend: "1"
                        }),
                        Multiplier2: guess
                    }),
                    Addend2: divisionTerm
                });

                guess = this.Divide({
                    Dividend: numerator,
                    Divisor: rootIndex
                });

                iterations++;

                if (guess === prevGuess || iterations >= maxIterations) {
                    hasConverged = true;
                    break;
                }

                const difference = this.Subtract({
                    Minuend: guess,
                    Subtrahend: prevGuess
                });

                const absDifference = difference.startsWith('-') ?
                    difference.substring(1) : difference;

                if (this._compareNumbers(absDifference, tolerance) < 0) {
                    hasConverged = true;
                    break;
                }

            } while (!hasConverged);

            return this._roundToPrecision(guess, this.decimal);
        }

        /**
         * _isExactRoot
         * 参数 {string} root - 根值
         * 参数 {string} radicand - 被开方数
         * 参数 {string} rootIndex - 根指数
         * 返回 {boolean} - 是否为精确根.
         * 道理 {步骤}-
         *       1.计算根的指定次幂
         *       2.检查是否等于被开方数
         */
        _isExactRoot(root, radicand, rootIndex) {
            const power = this.Power({
                Base: root,
                Exponent: rootIndex
            });

            return power === radicand;
        }

        /**
         * _compareNumbers
         * 参数 {string} a - 第一个数字字符串
         * 参数 {string} b - 第二个数字字符串
         * 返回 {number} - 比较结果：-1(a<b), 0(a=b), 1(a>b).
         * 道理 {步骤}-
         *       1.转换为浮点数进行比较
         */
        _compareNumbers(a, b) {
            const aNum = parseFloat(a);
            const bNum = parseFloat(b);
            if (aNum < bNum) return -1;
            if (aNum > bNum) return 1;
            return 0;
        }

        /**
         * _lanczosApproximation
         * 参数 {string} z - 伽马函数的输入值
         * 返回 {string} - 伽马函数的近似值.
         * 道理 {步骤}-
         *       1.使用Lanczos近似计算伽马函数
         *       2.使用预定义的系数进行计算
         *       3.组合各项得到最终结果
         */
        _lanczosApproximation(z) {
            const p = [
                "1.000000000190015",
                "76.18009172947146",
                "-86.50532032941677",
                "24.01409824083091",
                "-1.231739572450155",
                "0.1208650973866179e-2",
                "-0.5395239384953e-5"
            ];

            const g = "5";

            const zMinus1 = this.Subtract({ Minuend: z, Subtrahend: "1" });

            let series = p[0];
            for (let i = 1; i < p.length; i++) {
                const term = this.Divide({
                    Dividend: p[i],
                    Divisor: this.Add({ Addend1: zMinus1, Addend2: i.toString() })
                });
                series = this.Add({ Addend1: series, Addend2: term });
            }

            const t = this.Add({ Addend1: zMinus1, Addend2: g });
            const tPower = this.Power({
                Base: t,
                Exponent: this.Add({ Addend1: zMinus1, Addend2: "0.5" })
            });

            const ePower = this._exponentialFunction(this.Multiply({ Multiplier1: "-1", Multiplier2: t }));

            const sqrt2Pi = "2.506628274631000502415765284811";

            const result = this.Multiply({
                Multiplier1: sqrt2Pi,
                Multiplier2: this.Multiply({
                    Multiplier1: series,
                    Multiplier2: this.Multiply({
                        Multiplier1: tPower,
                        Multiplier2: ePower
                    })
                })
            });

            return result;
        }

        /**
         * _gammaFunctionImproved
         * 参数 {string} z - 输入值
         * 返回 {string} - 伽马函数值.
         * 道理 {步骤}-
         *       1.对于正整数，使用阶乘计算
         *       2.对于其他情况，使用Lanczos近似
         */
        _gammaFunctionImproved(z) {
            const zNum = parseFloat(z);

            if (this._isInteger(z) && zNum > 0) {
                let result = "1";
                const intZ = Math.floor(zNum);
                for (let i = 2; i < intZ; i++) {
                    result = this.Multiply({ Multiplier1: result, Multiplier2: i.toString() });
                }
                return result;
            }

            return this._lanczosApproximation(z);
        }

        /**
         * _sqrt
         * 参数 {object} args - 包含Number参数的对象
         * 返回 {string} - 平方根结果.
         * 道理 {步骤}-
         *       1.调用Root方法计算平方根
         */
        _sqrt(args) {
            return this.Root({ RootIndex: "2", Radicand: args.Number });
        }

        /**
         * _calculatePi
         * 使用高精度运算（Machin 公式）计算 π
         * π = 16 * arctan(1/5) - 4 * arctan(1/239)
         * arctan(x) 用级数展开，每一项都通过高精度四则运算
         */
        _calculatePi() {
            const decimal = this.decimal;
            // 迭代次数：精度每增加1位需要约0.8次迭代，加20次安全余量
            const iterations = Math.min(200, Math.max(30, Math.ceil(decimal * 0.8) + 20));

            // 高精度计算 arctan(1/n)
            // arctan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
            const arctan = (n, iter) => {
                // 初始值：x = 1/n
                let result = this.number.Divide({ Dividend: "1", Divisor: String(n) });
                let power = result; // x^1
                const nSquared = n * n; // 用于计算 x^2 = 1/n^2

                for (let i = 2; i <= iter; i++) {
                    // power = x^(2i-1) = x^(2i-3) * x^2
                    const xSquared = this.number.Divide({ Dividend: "1", Divisor: String(nSquared) });
                    power = this.number.Multiply({ Multiplier1: power, Multiplier2: xSquared });

                    const denominator = 2 * i - 1;
                    const term = this.number.Divide({ Dividend: power, Divisor: String(denominator) });

                    if (i % 2 === 1) {
                        // 奇数项加（i从2开始，所以 i=2 是第二项，应该减）
                        // 实际上：i=1 -> 加 (x^1/1)，i=2 -> 减 (x^3/3)，i=3 -> 加 (x^5/5)
                        // 所以 i 为奇数时加，i 为偶数时减
                        result = this.number.Add({ Addend1: result, Addend2: term });
                    } else {
                        result = this.number.Subtract({ Minuend: result, Subtrahend: term });
                    }
                }
                return result;
            };

            // 计算 arctan(1/5) 和 arctan(1/239)
            const atan1_5 = arctan(5, iterations);
            const atan1_239 = arctan(239, iterations);

            // π = 16 * arctan(1/5) - 4 * arctan(1/239)
            const term1 = this.number.Multiply({ Multiplier1: "16", Multiplier2: atan1_5 });
            const term2 = this.number.Multiply({ Multiplier1: "4", Multiplier2: atan1_239 });
            const piVal = this.number.Subtract({ Minuend: term1, Subtrahend: term2 });

            this.pi = this._roundToPrecision(piVal, decimal);
        }

        /**
         * _degreesToRadians
         * 参数 {string} degrees - 角度值
         * 返回 {string} - 弧度值.
         * 道理 {步骤}-
         *       1.使用公式：弧度 = 角度 × π / 180
         */
        _degreesToRadians(degrees) {
            // 使用this.pi替换硬编码pi
            return this.Divide({
                Dividend: this.Multiply({ Multiplier1: degrees, Multiplier2: this.pi }),
                Divisor: "180"
            });
        }

        /**
         * _radiansToDegrees
         * 参数 {string} radians - 弧度值
         * 返回 {string} - 角度值.
         * 道理 {步骤}-
         *       1.使用公式：角度 = 弧度 × 180 / π
         */
        _radiansToDegrees(radians) {
            // 使用this.pi替换硬编码pi
            return this.Divide({
                Dividend: this.Multiply({ Multiplier1: radians, Multiplier2: "180" }),
                Divisor: this.pi
            });
        }

        /**
         * _improvedTrigCalculation
         * 参数 {string} degrees - 角度值
         * 参数 {string} func - 三角函数类型
         * 返回 {string} - 三角函数值.
         * 道理 {步骤}-
         *       1.规范化角度到[0,360)范围
         *       2.转换为弧度
         *       3.根据函数类型计算相应的三角函数值
         *       4.处理定义域错误
         */
        _improvedTrigCalculation(degrees, func) {
            const normalized = this._normalizeAngle(degrees);
            const radians = this._degreesToRadians(normalized);

            switch (func) {
                case 'sin':
                    return this._highPrecisionSin(radians);
                case 'cos':
                    return this._highPrecisionCos(radians);
                case 'tan':
                    const sinVal = this._highPrecisionSin(radians);
                    const cosVal = this._highPrecisionCos(radians);
                    if (this._isZero(cosVal)) {
                        this._handleError("TrigDomainError");
                        this._handleError(`Number∈[${trigfunction.input.tan.min},${trigfunction.input.tan.max}]`,)
                        return lang("TrigDomainError")
                    }
                    return this.Divide({ Dividend: sinVal, Divisor: cosVal });
                case 'cot':
                    const sinVal2 = this._highPrecisionSin(radians);
                    const cosVal2 = this._highPrecisionCos(radians);
                    if (this._isZero(sinVal2)) {
                        this._handleError("TrigDomainError");
                        this._handleError(`Number∈[${trigfunction.input.cot.min},${trigfunction.input.cot.max}]`,)
                        return lang("TrigDomainError")
                    }
                    return this.Divide({ Dividend: cosVal2, Divisor: sinVal2 });
                case 'sec':
                    const cosVal3 = this._highPrecisionCos(radians);
                    if (this._isZero(cosVal3)) {
                        this._handleError("TrigDomainError");
                        this._handleError(`Number∈[${trigfunction.input.sec.min},${trigfunction.input.sec.max}]`,)
                        return lang("TrigDomainError")
                    }
                    return this._reciprocal(cosVal3);
                case 'csc':
                    const sinVal3 = this._highPrecisionSin(radians);
                    if (this._isZero(sinVal3)) {
                        this._handleError("TrigDomainError");
                        this._handleError(`Number∈[${trigfunction.input.csc.min},${trigfunction.input.csc.max}]`,)
                        return lang("TrigDomainError");
                    }
                    return this._reciprocal(sinVal3);
                default:
                    return this._handleError("UndefinedErrorText");
            }
        }

        /**
         * _highPrecisionSin
         * 参数 {string} x - 弧度值
         * 返回 {string} - 正弦值.
         * 道理 {步骤}-
         *       1.将角度缩减到主区间
         *       2.使用改进的泰勒级数计算正弦值
         */
        _highPrecisionSin(x) {
            const { reducedX, sign } = this._reduceToPrimaryInterval(x);
            return this._improvedSineTaylor(reducedX, sign);
        }

        _ensureString(value) {
            if (typeof value === 'string') {
                return value;
            }
            if (typeof value === 'number') {
                return value.toString();
            }
            if (value && value.toString) {
                return value.toString();
            }
            return String(value);
        }

        /**
         * _highPrecisionCos
         * 参数 {string} x - 弧度值
         * 返回 {string} - 余弦值.
         * 道理 {步骤}-
         *       1.利用cos(x) = sin(π/2 - x)的关系
         *       2.调用正弦函数计算余弦值
         */
        _highPrecisionCos(x) {
            // 使用this.pi替换硬编码pi
            const piOver2 = this.Divide({ Dividend: this.pi, Divisor: "2" });
            const shiftedX = this.Subtract({ Minuend: piOver2, Subtrahend: x });

            return this._highPrecisionSin(shiftedX);
        }

        /**
         * _reduceToPrimaryInterval
         * 参数 {string} x - 输入弧度值
         * 返回 {object} - 包含缩减后的弧度值和符号的对象.
         * 道理 {步骤}-
         *       1.将角度规范化到[0, 2π)范围
         *       2.利用三角函数的周期性进一步缩减到[0, π/2]
         *       3.记录符号信息用于后续计算
         */
        _reduceToPrimaryInterval(x) {
            // 使用this.pi替换硬编码pi
            const twoPi = this.Multiply({ Multiplier1: "2", Multiplier2: this.pi });
            const piOver2 = this.Divide({ Dividend: this.pi, Divisor: "2" });

            let normalized = x;
            while (this._compareNumbers(normalized, "0") < 0) {
                normalized = this.Add({ Addend1: normalized, Addend2: twoPi });
            }
            while (this._compareNumbers(normalized, twoPi) >= 0) {
                normalized = this.Subtract({ Minuend: normalized, Subtrahend: twoPi });
            }

            let sign = "1";
            let reducedX = normalized;

            if (this._compareNumbers(normalized, this.pi) > 0) {
                reducedX = this.Subtract({ Minuend: twoPi, Subtrahend: normalized });
                sign = "-1";
            }

            if (this._compareNumbers(reducedX, piOver2) > 0) {
                reducedX = this.Subtract({ Minuend: this.pi, Subtrahend: reducedX });
            }

            return { reducedX, sign };
        }

        /**
         * _improvedSineTaylor
         * 参数 {string} x - 弧度值
         * 参数 {string} sign - 符号
         * 返回 {string} - 正弦值.
         * 道理 {步骤}-
         *       1.使用泰勒级数展开计算正弦值
         *       2.迭代计算直到项足够小或达到最大迭代次数
         *       3.应用符号并舍入到指定精度
         */
        _improvedSineTaylor(x, sign) {
            const maxIterations = Math.min(50, this.decimal + 20);

            let result = x;
            let term = x;
            let xSquared = this.Multiply({ Multiplier1: x, Multiplier2: x });
            let i = 1;
            let hasConverged = false;

            while (i <= maxIterations && !hasConverged) {
                const numerator = this.Multiply({
                    Multiplier1: this.Multiply({ Multiplier1: term, Multiplier2: "-1" }),
                    Multiplier2: xSquared
                });

                const denominator = this.Multiply({
                    Multiplier1: (2 * i).toString(),
                    Multiplier2: (2 * i + 1).toString()
                });

                term = this.Divide({
                    Dividend: numerator,
                    Divisor: denominator
                });

                const newResult = this.Add({ Addend1: result, Addend2: term });

                if (newResult === result) {
                    hasConverged = true;
                } else {
                    const difference = this.Subtract({
                        Minuend: newResult,
                        Subtrahend: result
                    });

                    const absDifference = difference.startsWith('-') ?
                        difference.substring(1) : difference;

                    const tolerance = "0." + "0".repeat(this.decimal) + "1";

                    if (this._compareNumbers(absDifference, tolerance) < 0) {
                        hasConverged = true;
                    }
                }

                result = newResult;
                i++;
            }

            if (sign === "-1") {
                result = this.Multiply({ Multiplier1: "-1", Multiplier2: result });
            }

            return this._roundToPrecision(result, this.decimal);
        }

        /**
         * _optimizedTrigCalculation
         * 参数 {string} degrees - 角度值
         * 参数 {string} func - 三角函数类型
         * 返回 {string} - 三角函数值.
         * 道理 {步骤}-
         *       1.先检查常见角度的精确值
         *       2.如果没有精确值，使用改进的计算方法
         */
        _optimizedTrigCalculation(degrees, func) {
            const exactValue = this._getExactTrigValue(degrees, func);
            if (exactValue !== null) {
                return exactValue;
            }

            return this._improvedTrigCalculation(degrees, func);
        }

        /**
         * _getExactTrigValue
         * 参数 {string} degrees - 角度值
         * 参数 {string} func - 三角函数类型
         * 返回 {string|null} - 精确的三角函数值或null.
         * 道理 {步骤}-
         *       1.检查是否为常见角度（0, 30, 45, 60, 90等）
         *       2.返回预计算的精确值
         *       3.处理角度规范化后的检查
         */
        _getExactTrigValue(degrees, func) {
            const normalizedDegrees = this._normalizeAngle(degrees);
            const num = parseFloat(normalizedDegrees);

            const commonAngles = {
                "0": {
                    sin: "0",
                    cos: "1",
                    tan: "0",
                    cot: "Infinity",
                    sec: "1",
                    csc: "Infinity"
                },
                "30": {
                    sin: "0.5",
                    cos: "0.8660254037844386",
                    tan: "0.5773502691896257",
                    cot: "1.7320508075688772",
                    sec: "1.1547005383792517",
                    csc: "2"
                },
                "45": {
                    sin: "0.7071067811865476",
                    cos: "0.7071067811865476",
                    tan: "1",
                    cot: "1",
                    sec: "1.414213562373095",
                    csc: "1.414213562373095"
                },
                "60": {
                    sin: "0.8660254037844386",
                    cos: "0.5",
                    tan: "1.7320508075688772",
                    cot: "0.5773502691896257",
                    sec: "2",
                    csc: "1.1547005383792517"
                },
                "90": {
                    sin: "1",
                    cos: "0",
                    tan: "Infinity",
                    cot: "0",
                    sec: "Infinity",
                    csc: "1"
                },
                "180": {
                    sin: "0",
                    cos: "-1",
                    tan: "0",
                    cot: "Infinity",
                    sec: "-1",
                    csc: "Infinity"
                },
                "270": {
                    sin: "-1",
                    cos: "0",
                    tan: "Infinity",
                    cot: "0",
                    sec: "Infinity",
                    csc: "-1"
                },
                "360": {
                    sin: "0",
                    cos: "1",
                    tan: "0",
                    cot: "Infinity",
                    sec: "1",
                    csc: "Infinity"
                }
            };

            // 检查是否是常见角度
            for (const angle in commonAngles) {
                if (Math.abs(num - parseFloat(angle)) < 1e-10 ||
                    Math.abs(num - parseFloat(angle) - 360) < 1e-10) {
                    return commonAngles[angle][func] || null;
                }
            }

            return null;
        }

        /**
         * _normalizeAngle
         * 参数 {string} degrees - 角度值
         * 返回 {string} - 规范化到[0,360)范围的角度值.
         * 道理 {步骤}-
         *       1.对于负角度，加360直到为正
         *       2.对于大于360的角度，减360直到在范围内
         */
        _normalizeAngle(degrees) {
            let normalized = degrees;
            const fullCircle = "360";

            while (this._compareNumbers(normalized, "0") < 0) {
                normalized = this.Add({ Addend1: normalized, Addend2: fullCircle });
            }

            while (this._compareNumbers(normalized, fullCircle) >= 0) {
                normalized = this.Subtract({ Minuend: normalized, Subtrahend: fullCircle });
            }

            return normalized;
        }

        /**
         * _highPrecisionAsin
         * 参数 {string} x - 输入值，范围[-1,1]
         * 返回 {string} - 反正弦值（角度）.
         * 道理 {步骤}-
         *       1.检查输入值是否在定义域内
         *       2.处理特殊值（0, ±1, ±0.5）
         *       3.使用牛顿迭代法求近似解
         *       4.转换为角度并返回
         */
        _highPrecisionAsin(x) {
            const xNum = parseFloat(x);
            if (xNum < -1 || xNum > 1) {
                this._handleError("ArctrigDomainError");
                this._handleError("Number∉[-1,1]");
                return this._handleError("ArctrigDomainError")
            }

            if (this._isZero(x)) return "0";
            if (x === "1") return "90";
            if (x === "-1") return "-90";
            if (x === "0.5") return "30";
            if (x === "-0.5") return "-30";

            let guess;
            if (xNum > 0) {
                guess = this._degreesToRadians("30");
            } else {
                guess = this._degreesToRadians("-30");
            }

            const tolerance = "0." + "0".repeat(this.decimal) + "1";
            let prevGuess;
            let iterations = 0;
            const maxIterations = 50;

            do {
                prevGuess = guess;

                const sinGuess = this._highPrecisionSin(guess);
                const cosGuess = this._highPrecisionCos(guess);

                if (this._isZero(cosGuess)) {
                    break;
                }

                const numerator = this.Subtract({ Minuend: sinGuess, Subtrahend: x });
                const adjustment = this.Divide({ Dividend: numerator, Divisor: cosGuess });
                guess = this.Subtract({ Minuend: guess, Subtrahend: adjustment });

                iterations++;

                const difference = this.Subtract({
                    Minuend: guess,
                    Subtrahend: prevGuess
                });

                const absDifference = difference.startsWith('-') ?
                    difference.substring(1) : difference;

                if (this._compareNumbers(absDifference, tolerance) < 0 || iterations >= maxIterations) {
                    break;
                }

            } while (true);

            const resultDegrees = this._radiansToDegrees(guess);
            return this._roundToPrecision(resultDegrees, this.decimal);
        }

        /**
         * _highPrecisionAcos
         * 参数 {string} x - 输入值，范围[-1,1]
         * 返回 {string} - 反余弦值（角度）.
         * 道理 {步骤}-
         *       1.检查输入值是否在定义域内
         *       2.利用acos(x) = π/2 - asin(x)的关系
         *       3.转换为角度并返回
         */
        _highPrecisionAcos(x) {
            const xNum = parseFloat(x);
            if (xNum < -1 || xNum > 1) {
                this._handleError("ArctrigDomainError");
                this._handleError("Number∉[-1,1]");
                return this._handleError("ArctrigDomainError");
            }

            if (this._isZero(x)) return "90";
            if (x === "1") return "0";
            if (x === "-1") return "180";
            if (x === "0.5") return "60";
            if (x === "-0.5") return "120";

            // 使用this.pi替换硬编码pi
            const piOver2 = this.Divide({ Dividend: this.pi, Divisor: "2" });
            const asinResult = this._highPrecisionAsin(x);
            const asinRadians = this._degreesToRadians(asinResult);

            const acosRadians = this.Subtract({ Minuend: piOver2, Subtrahend: asinRadians });
            const resultDegrees = this._radiansToDegrees(acosRadians);

            return this._roundToPrecision(resultDegrees, this.decimal);
        }

        /**
         * _highPrecisionAtan
         * 参数 {string} x - 输入值
         * 返回 {string} - 反正切值（角度）.
         * 道理 {步骤}-
         *       1.处理特殊值（0, ±1）
         *       2.使用反正切级数展开
         *       3.转换为角度并返回
         */
        _highPrecisionAtan(x) {
            if (this._isZero(x)) return "0";
            if (x === "1") return "45";
            if (x === "-1") return "-45";

            const xNum = parseFloat(x);

            let result = x;
            let term = x;
            let xSquared = this.Multiply({ Multiplier1: x, Multiplier2: x });
            let i = 1;
            const maxIterations = Math.min(30, this.decimal + 10);

            for (let n = 1; n <= maxIterations; n++) {
                const powerTerm = this.Power({
                    Base: x,
                    Exponent: (2 * n + 1).toString()
                });

                const sign = n % 2 === 1 ? "-1" : "1";
                const denominator = (2 * n + 1).toString();

                term = this.Multiply({
                    Multiplier1: sign,
                    Multiplier2: this.Divide({
                        Dividend: powerTerm,
                        Divisor: denominator
                    })
                });

                const newResult = this.Add({ Addend1: result, Addend2: term });

                const difference = this.Subtract({
                    Minuend: newResult,
                    Subtrahend: result
                });

                const absDifference = difference.startsWith('-') ?
                    difference.substring(1) : difference;

                const tolerance = "0." + "0".repeat(this.decimal) + "1";

                if (this._compareNumbers(absDifference, tolerance) < 0) {
                    break;
                }

                result = newResult;
            }

            const resultDegrees = this._radiansToDegrees(result);
            return this._roundToPrecision(resultDegrees, this.decimal);
        }

        /**
         * _highPrecisionAcot
         * 参数 {string} x - 输入值
         * 返回 {string} - 反余切值（角度）.
         * 道理 {步骤}-
         *       1.利用acot(x) = π/2 - atan(x)的关系
         *       2.转换为角度并返回
         */
        _highPrecisionAcot(x) {
            // 使用this.pi替换硬编码pi
            const piOver2 = this.Divide({ Dividend: this.pi, Divisor: "2" });
            const atanResult = this._highPrecisionAtan(x);
            const atanRadians = this._degreesToRadians(atanResult);

            const acotRadians = this.Subtract({ Minuend: piOver2, Subtrahend: atanRadians });
            const resultDegrees = this._radiansToDegrees(acotRadians);

            return this._roundToPrecision(resultDegrees, this.decimal);
        }

        /**
         * _highPrecisionAsec
         * 参数 {string} x - 输入值
         * 返回 {string} - 反正割值（角度）.
         * 道理 {步骤}-
         *       1.利用asec(x) = acos(1/x)的关系
         *       2.调用反余弦函数计算
         */
        _highPrecisionAsec(x) {
            const reciprocal = this._reciprocal(x);
            return this._highPrecisionAcos(reciprocal);
        }

        /**
         * _highPrecisionAcsc
         * 参数 {string} x - 输入值
         * 返回 {string} - 反余割值（角度）.
         * 道理 {步骤}-
         *       1.利用acsc(x) = asin(1/x)的关系
         *       2.调用反正弦函数计算
         */
        _highPrecisionAcsc(x) {
            const reciprocal = this._reciprocal(x);
            return this._highPrecisionAsin(reciprocal);
        }

        /**
         * _arctrigCalculation
         * 参数 {string} value - 输入值
         * 参数 {string} func - 反三角函数类型
         * 返回 {string} - 反三角函数值（角度）.
         * 道理 {步骤}-
         *       1.验证输入是否为数字
         *       2.根据函数类型调用相应的计算方法
         *       3.处理错误情况
         */
        _arctrigCalculation(value, func) {
            if (isNaN(parseFloat(value))) {
                return this._handleError("NoNumber", "simple", True, value);
            }

            let result;

            try {
                switch (func) {
                    case "asin":
                        result = this._highPrecisionAsin(value);
                        break;
                    case "acos":
                        result = this._highPrecisionAcos(value);
                        break;
                    case "atan":
                        result = this._highPrecisionAtan(value);
                        break;
                    case "acot":
                        result = this._highPrecisionAcot(value);
                        break;
                    case "asec":
                        result = this._highPrecisionAsec(value);
                        break;
                    case "acsc":
                        result = this._highPrecisionAcsc(value);
                        break;
                    default:
                        return this._handleError(lang("UndefinedErrorText"));
                }

                if (typeof result === 'string' && result.startsWith('Error:')) {
                    return this._handleError(result);
                }
            } catch (error) {
                return this._handleError(lang("ArctrigDomainError"));
            }

            return result;
        }

        /**
         * 预处理表达式：统一运算符、括号格式
         * @param {string} expr - 原始表达式
         * @returns {string} 处理后的表达式
         */
        _preprocessExpression(expr) {
            // 替换中文运算符为标准运算符，保留负号识别
            return expr
                .replace(/×/g, "*")    // 乘号统一为*
                .replace(/÷/g, "/")    // 除号统一为/
                .replace(/\[/g, "(")   // 中括号统一为(
                .replace(/]/g, ")")    // 中括号统一为)
                .replace(/\{/g, "(")   // 大括号统一为(
                .replace(/\}/g, ")")   // 大括号统一为)
                .replace(/\s+/g, "");  // 去除所有空格
        }

        /**
         * 验证表达式合法性（基础检查）
         * @param {string} expr - 处理后的表达式
         * @returns {boolean} 是否合法
         */
        _validateExpression(expr) {
            // 检查空表达式
            if (!expr || expr.trim() === '') {
                throw new Error(lang("ExprParseError") + ":" + lang("ExprEmpty"));
            }

            // 检查无效字符 - 放宽限制以支持负号和函数
            const validChars = /^[0-9+\-*/().a-z]+$/i;
            if (!validChars.test(expr.replace(/\s/g, ''))) {
                throw new Error(lang("ExprInvalidCharError"));
            }

            // 检查括号匹配
            const bracketStack = [];
            for (const char of expr) {
                if (char === "(") {
                    bracketStack.push(char);
                } else if (char === ")") {
                    if (bracketStack.length === 0) {
                        throw new Error(lang("ExprMismatchedBracketsError"));
                    }
                    bracketStack.pop();
                }
            }
            if (bracketStack.length > 0) {
                throw new Error(lang("ExprMismatchedBracketsError"));
            }

            return true;
        }

        /**
         * 改进的分词器：支持负数、科学计数法、完整函数名
         * @param {string} expr - 处理后的表达式
         * @returns {Array} 令牌数组
         */
        _tokenizeExpression(expr) {
            const tokens = [];
            let i = 0;

            // 改进的正则：数字本身不含前导负号，负号统一交给运算符分支处理（再按语境判定一元/二元）
            const tokenPatterns = [
                { type: "number", pattern: /^\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/ }, // 数字（无符号）
                { type: "function", pattern: /^(sin|cos|tan)\b/ }, // 函数
                { type: "operator", pattern: /^[+\-*/()]/ }, // 运算符（包括负号）
                { type: "whitespace", pattern: /^\s+/ } // 空白字符（忽略）
            ];

            while (i < expr.length) {
                let matched = false;

                for (const { type, pattern } of tokenPatterns) {
                    const match = expr.slice(i).match(pattern);
                    if (match) {
                        if (type !== "whitespace") { // 忽略空白字符
                            // 处理负号：如果负号出现在表达式开头、运算符后或左括号后，则视为一元负号
                            // 注意：'u-' 也加入触发列表，以支持 --3 这样的连续一元负号
                            if (match[0] === '-' && (tokens.length === 0 ||
                                ['+', '-', '*', '/', '(', 'u-'].includes(tokens[tokens.length - 1]?.value))) {
                                tokens.push({ type: "operator", value: "u-" });
                            } else if (type === "number") {
                                tokens.push({ type: "number", value: match[0] });
                            } else if (type === "function") {
                                tokens.push({ type: "function", value: match[1] });
                            } else {
                                tokens.push({ type: "operator", value: match[0] });
                            }
                        }
                        i += match[0].length;
                        matched = true;
                        break;
                    }
                }

                if (!matched) {
                    throw new Error(`${lang("ExprInvalidCharError")}: ${expr[i]}`);
                }
            }

            return tokens;
        }

        // 添加辅助函数
        _simplifyRightSide(right) {
            const trimmed = right.trim();

            // 如果右侧是简单的数字或表达式，不添加额外的括号
            // 匹配：数字、带符号的数字、简单的变量表达式
            const simplePattern = /^[-+]?\d*\.?\d*(?:[a-zA-Z]?)$/;

            if (simplePattern.test(trimmed)) {
                // 简单的数字或变量，直接返回
                return trimmed;
            } else if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
                // 已经是括号表达式，直接返回
                return trimmed;
            } else {
                // 复杂表达式，添加括号
                return `(${trimmed})`;
            }
        }

        /**
         * 递归解析令牌并计算结果（核心逻辑）
         * 支持运算符优先级：函数 > 括号 > * / > + -
         * @param {Array} tokens - 令牌数组
         * @param {number} index - 当前解析索引（用于递归）
         * @returns {object} { result: 计算结果, index: 解析结束的索引 }
         */
        _parseTokens(tokens, index = 0) {
            // 解析表达式（加法和减法，最低优先级）
            let { result: left, index: i } = this._parseTerm(tokens, index);

            while (i < tokens.length) {
                const token = tokens[i];
                if (token.type !== "operator" || !["+", "-"].includes(token.value)) {
                    break;
                }

                const op = token.value;
                i++;
                const { result: right, index: j } = this._parseTerm(tokens, i);
                i = j;

                try {
                    if (op === "+") {
                        left = this.Add({ Addend1: left, Addend2: right });
                    } else {
                        left = this.Subtract({ Minuend: left, Subtrahend: right });
                    }
                } catch (error) {
                    throw new Error(`${lang("ExprParseError")}:${lang("ExprError")}`);
                }
            }

            return { result: left, index: i };
        }

        /**
         * 解析项（乘法和除法，中优先级）
         * @param {Array} tokens - 令牌数组
         * @param {number} index - 当前解析索引
         * @returns {object} { result: 计算结果, index: 解析结束的索引 }
         */
        _parseTerm(tokens, index) {
            let { result: left, index: i } = this._parseFactor(tokens, index);

            while (i < tokens.length) {
                const token = tokens[i];
                if (token.type !== "operator" || !["*", "/"].includes(token.value)) {
                    break;
                }

                const op = token.value;
                i++;
                const { result: right, index: j } = this._parseFactor(tokens, i);
                i = j;

                try {
                    if (op === "*") {
                        left = this.Multiply({ Multiplier1: left, Multiplier2: right });
                    } else {
                        left = this.Divide({ Dividend: left, Divisor: right });
                    }
                } catch (error) {
                    throw new Error(`${lang("ExprParseError")}: 除法或乘法错误`);
                }
            }

            return { result: left, index: i };
        }

        /**
         * 解析因子（数字、括号、函数，最高优先级）
         * @param {Array} tokens - 令牌数组
         * @param {number} index - 当前解析索引
         * @returns {object} { result: 计算结果, index: 解析结束的索引 }
         */
        _parseFactor(tokens, index) {
            if (index >= tokens.length) {
                throw new Error(lang("ExprParseError") + ": 意外的表达式结束");
            }

            const token = tokens[index];
            let i = index;

            // 处理一元负号（如 -3 或 -(a+b)）
            if (token.type === "operator" && token.value === "u-") {
                i++;
                const { result: val, index: j } = this._parseFactor(tokens, i);
                return {
                    result: this.Multiply({ Multiplier1: "-1", Multiplier2: val }),
                    index: j
                };
            }

            if (token.type === "number") {
                // 数字直接返回
                return { result: token.value, index: i + 1 };
            } else if (token.type === "function") {
                // 处理函数（sin, cos, tan）
                const func = token.value;
                i++;

                if (i >= tokens.length || tokens[i].value !== "(") {
                    throw new Error(lang("ExprParseError") + ":" + lang("ExprExpectedRightError"));
                }
                i++; // 跳过左括号

                // 递归解析函数参数（括号内的表达式）
                const { result: arg, index: j } = this._parseTokens(tokens, i);
                i = j;

                if (i >= tokens.length || tokens[i].value !== ")") {
                    throw new Error(lang("ExprParseError") + ":" + lang("ExprExpectedLeftError"));
                }
                i++; // 跳过右括号

                try {
                    // 计算三角函数值（角度制）
                    const funcResult = this.TrigFunction({ menu: func, Number: arg });
                    return { result: funcResult, index: i };
                } catch (error) {
                    throw new Error(`${lang("ExprParseError")}:${lang("ExprError")}`);
                }
            } else if (token.value === "(") {
                // 处理括号内的表达式
                i++; // 跳过左括号
                const { result: inner, index: j } = this._parseTokens(tokens, i);
                i = j;

                if (i >= tokens.length || tokens[i].value !== ")") {
                    throw new Error(lang("ExprParseError") + ":" + lang("ExprBracketNotFormatError"));
                }
                i++; // 跳过右括号

                return { result: inner, index: i };
            } else {
                throw new Error(`${lang("ExprParseError")}: ${token.value}`);
            }
        }

        _calculateE() {
            let e = 1;
            let factorial = 1;

            // 泰勒级数展开：e = 1 + 1/1! + 1/2! + 1/3! + ...
            const iterations = Math.max(20, this.decimal + 10); // 根据精度调整迭代次数

            for (let i = 1; i <= iterations; i++) {
                factorial *= i;
                e += 1 / factorial;
            }

            // 将e值四舍五入到指定精度
            this.e = this._roundToPrecision(e.toString(), this.decimal);
        }

        /**
         * _calculatePhi
         * 实时计算黄金分割比 φ = (1+√5)/2
         * 使用高精度 _sqrt 方法计算 √5
         */
        _calculatePhi() {
            // 使用高精度 _sqrt 计算 √5（支持任意精度）
            const sqrt5 = this._sqrt({ Number: "5" });
            // φ = (1 + √5) / 2
            const numerator = this.Add({ Addend1: "1", Addend2: sqrt5 });
            const phiVal = this.Divide({ Dividend: numerator, Divisor: "2" });
            // 四舍五入到指定精度（this.decimal 控制小数位数）
            this.phi = this._roundToPrecision(phiVal, this.decimal);
        }

        /**
         * _ceilToPrecision
         * 参数 {string} numStr - 输入数字字符串
         * 参数 {number} precision - 精度（小数位数）
         * 返回 {string} - 向上取整到指定精度的数字字符串.
         * 道理 {步骤}-
         *       1.解析数字的符号、整数和小数部分
         *       2.对于正数，向上取整；对于负数，向下取整
         *       3.根据精度要求处理小数部分
         */
        _ceilToPrecision(numStr, precision) {
            if (precision < 0) return numStr;

            const { sign, integer, decimal } = this._parseNumber(numStr);

            // 如果小数位数小于等于精度，直接补零返回
            if (decimal.length <= precision) {
                const paddedDec = decimal.padEnd(precision, '0');
                return this._formatResult(sign, integer, paddedDec);
            }

            // 截取到指定精度
            const truncatedDec = decimal.slice(0, precision);
            const remainingDec = decimal.slice(precision);
            const hasRemaining = remainingDec.replace(/0+$/, '') !== '';

            let resultInt = integer;
            let resultDec = truncatedDec;

            if (hasRemaining) {
                if (sign === 1) { // 正数向上取整
                    // 将小数部分当作整数加1
                    const decimalAsInt = this._addInteger(truncatedDec, '1', 0);
                    resultDec = decimalAsInt.int.padStart(precision, '0').slice(-precision);

                    // 处理小数部分进位到整数部分
                    if (decimalAsInt.carry > 0) {
                        const intAddResult = this._addInteger(integer, '1', 0);
                        resultInt = intAddResult.int;
                        if (intAddResult.carry > 0) {
                            resultInt = '1' + resultInt;
                        }
                        resultDec = '0'.repeat(precision);
                    }
                } else { // 负数向上取整（就是向下取整）
                    resultDec = truncatedDec;
                }
            }

            // 确保小数位数严格等于精度
            resultDec = precision === 0 ? '' : resultDec.padEnd(precision, '0').slice(0, precision);

            return this._formatResult(sign, resultInt, resultDec);
        }

        /**
         * _floorToPrecision
         * 参数 {string} numStr - 输入数字字符串
         * 参数 {number} precision - 精度（小数位数）
         * 返回 {string} - 向下取整到指定精度的数字字符串.
         * 道理 {步骤}-
         *       1.解析数字的符号、整数和小数部分
         *       2.对于正数，向下取整；对于负数，向上取整
         *       3.根据精度要求直接截断小数部分
         */
        _floorToPrecision(numStr, precision) {
            if (precision < 0) return numStr;

            const { sign, integer, decimal } = this._parseNumber(numStr);

            // 如果小数位数小于等于精度，直接补零返回
            if (decimal.length <= precision) {
                const paddedDec = decimal.padEnd(precision, '0');
                return this._formatResult(sign, integer, paddedDec);
            }

            // 截取到指定精度
            const truncatedDec = decimal.slice(0, precision);
            const remainingDec = decimal.slice(precision);
            const hasRemaining = remainingDec.replace(/0+$/, '') !== '';

            let resultInt = integer;
            let resultDec = truncatedDec;

            if (hasRemaining) {
                if (sign === -1) { // 负数向下取整（需要加1）
                    // 将小数部分当作整数加1
                    const decimalAsInt = this._addInteger(truncatedDec, '1', 0);
                    resultDec = decimalAsInt.int.padStart(precision, '0').slice(-precision);

                    // 处理小数部分进位到整数部分
                    if (decimalAsInt.carry > 0) {
                        const intAddResult = this._addInteger(integer, '1', 0);
                        resultInt = intAddResult.int;
                        if (intAddResult.carry > 0) {
                            resultInt = '1' + resultInt;
                        }
                        resultDec = '0'.repeat(precision);
                    }
                } else { // 正数向下取整（直接截断）
                    resultDec = truncatedDec;
                }
            }

            // 确保小数位数严格等于精度
            resultDec = precision === 0 ? '' : resultDec.padEnd(precision, '0').slice(0, precision);

            return this._formatResult(sign, resultInt, resultDec);
        }

        /**
         * _simplifyFraction
         * 约分分数，返回最简分数形式
         */
        _simplifyFraction(fraction) {
            // 解析分数字符串
            const parts = fraction.split('/');
            if (parts.length !== 2) {
                return fraction;
            }

            let numeratorStr = parts[0];
            let denominatorStr = parts[1];

            // 处理符号
            let sign = 1;
            if (numeratorStr.startsWith('-')) {
                sign = -1;
                numeratorStr = numeratorStr.substring(1);
            }

            // 转换为数字进行计算
            const numerator = parseInt(numeratorStr, 10);
            const denominator = parseInt(denominatorStr, 10);

            if (isNaN(numerator) || isNaN(denominator)) {
                return fraction;
            }

            // 计算最大公约数
            const divisor = this._gcd(numerator, denominator);

            // 约分
            const simplifiedNumerator = numerator / divisor;
            const simplifiedDenominator = denominator / divisor;

            // 处理符号
            const signStr = sign === -1 ? '-' : '';

            return `${signStr}${simplifiedNumerator}/${simplifiedDenominator}`;
        }

        /**
         * _parseRepeatingDecimal
         * 解析循环小数字符串为整数部分、非循环部分和循环节
         * 新格式：整数部分.小数非循环部分{循环节}
         * 规则：非循环部分必须至少有1位数字
         */
        _parseRepeatingDecimal(str) {
            // 去除空白字符
            str = str.trim();

            // 提取符号
            let sign = 1;
            let decimalStr = str;
            if (str.startsWith('-')) {
                sign = -1;
                decimalStr = str.substring(1);
            }

            // 检查是否有点号
            if (!decimalStr.includes('.')) {
                // 纯整数
                return {
                    sign,
                    integerPart: decimalStr === '' ? '0' : decimalStr,
                    nonRepeatingPart: '',
                    cyclePart: '',
                    isRepeating: false
                };
            }

            const parts = decimalStr.split('.');
            const integerPart = parts[0] || '0';
            const decimalPart = parts[1] || '';

            // 检查是否有花括号（循环节）
            if (!decimalPart.includes('{') || !decimalPart.includes('}')) {
                // 有限小数
                return {
                    sign,
                    integerPart,
                    nonRepeatingPart: decimalPart,
                    cyclePart: '',
                    isRepeating: false
                };
            }

            // 解析循环节
            const cycleMatch = decimalPart.match(/\{([^}]+)\}/);
            if (!cycleMatch) {
                return {
                    sign,
                    integerPart,
                    nonRepeatingPart: decimalPart,
                    cyclePart: '',
                    isRepeating: false
                };
            }

            const cycle = cycleMatch[1];
            const nonRepeating = decimalPart.substring(0, decimalPart.indexOf('{'));

            // 验证非循环部分至少有1位
            if (nonRepeating === '') {
                // 在新格式中，这不应该发生，但为了兼容性，我们设为"0"
                return {
                    sign,
                    integerPart,
                    nonRepeatingPart: '0',
                    cyclePart: cycle,
                    isRepeating: true
                };
            }

            return {
                sign,
                integerPart,
                nonRepeatingPart: nonRepeating,
                cyclePart: cycle,
                isRepeating: true
            };
        }

        /**
         * _repeatingDecimalToFraction
         * 将循环小数转换为分数
         * 新格式：整数部分.小数非循环部分{循环节}（非循环部分至少有1位）
         */
        _repeatingDecimalToFraction(str) {
            const parsed = this._parseRepeatingDecimal(str);

            if (!parsed.isRepeating) {
                // 有限小数或整数
                if (parsed.nonRepeatingPart === '') {
                    // 整数
                    return `${parsed.sign === -1 ? '-' : ''}${parsed.integerPart}/1`;
                } else {
                    // 有限小数
                    const numerator = parsed.integerPart + parsed.nonRepeatingPart;
                    const denominator = '1' + '0'.repeat(parsed.nonRepeatingPart.length);
                    const fraction = `${parsed.sign === -1 ? '-' : ''}${numerator}/${denominator}`;
                    return this._simplifyFraction(fraction);
                }
            }

            // 处理循环小数
            const integerPart = parsed.integerPart;
            let nonRepeatingPart = parsed.nonRepeatingPart;
            const cyclePart = parsed.cyclePart;

            // 处理特殊情况：非循环部分为"0"
            if (nonRepeatingPart === '0') {
                // 这是新格式，需要特殊处理
                // 公式：0.b{c} = (c) / (9 × 10^k) + b/10^k，其中k=1（非循环部分长度）
                const k = 1; // 非循环部分长度固定为1

                // 计算分母：9 × 10^k
                const denominator = 9 * Math.pow(10, k);

                // 计算分子：c + b × 9
                const b = parseInt(nonRepeatingPart, 10);
                const c = parseInt(cyclePart, 10);
                const numerator = c + b * 9;

                const fraction = `${parsed.sign === -1 ? '-' : ''}${numerator}/${denominator}`;
                return this._simplifyFraction(fraction);
            }

            // 特殊情况：0.{9} = 1（在新格式中表示为0.9{9}）
            if (cyclePart === '9' && nonRepeatingPart === '0' && integerPart === '0') {
                return `${parsed.sign === -1 ? '-' : ''}1/1`;
            }

            // 特殊情况：循环节为0，表示有限小数
            if (cyclePart === '0') {
                // 去掉尾随的0
                const num = integerPart + (nonRepeatingPart || '0');
                const fraction = `${parsed.sign === -1 ? '-' : ''}${num}/1`;
                return this._simplifyFraction(fraction);
            }

            // 标准公式：分数 = (N - F) / D
            // 其中：
            // N = 整数部分和非循环部分组成的数字 + 循环节重复一次
            // F = 整数部分和非循环部分组成的数字
            // D = 9重复len(c)次，后面跟len(b)个0

            const b = nonRepeatingPart;
            const c = cyclePart;
            const k = b.length; // 非循环部分长度
            const m = c.length; // 循环节长度

            // 计算F：整数部分和非循环部分组成的数字
            const F_str = integerPart + b;
            const F = parseInt(F_str || '0', 10);

            // 计算N：整数部分、非循环部分和循环节组成的数字
            const N_str = integerPart + b + c;
            const N = parseInt(N_str, 10);

            // 计算分母D
            // 9重复m次，后面跟k个0
            const nineRepeated = '9'.repeat(m);
            const zeros = '0'.repeat(k);
            const D_str = nineRepeated + zeros;
            const D = parseInt(D_str, 10);

            // 计算分子：N - F
            const numerator = N - F;

            // 添加符号
            const signedNumerator = parsed.sign === -1 ? -numerator : numerator;

            // 返回分数
            const fraction = `${signedNumerator}/${D}`;
            return this._simplifyFraction(fraction);
        }

        /**
         * _fractionToRepeatingDecimal
         * 将分数转换为循环小数，确保小数非循环部分至少有1位
         * 格式：整数部分.小数非循环部分{循环节}
         * 规则：如果循环从小数点后第一位开始，非循环部分设为"0"
         */
        _fractionToRepeatingDecimal(fraction) {
            // 解析分数
            const parts = fraction.split('/');
            if (parts.length !== 2) {
                return '0';
            }

            let numeratorStr = parts[0];
            let denominatorStr = parts[1];

            // 处理符号
            let sign = 1;
            if (numeratorStr.startsWith('-')) {
                sign = -1;
                numeratorStr = numeratorStr.substring(1);
            }

            const numerator = parseInt(numeratorStr, 10);
            const denominator = parseInt(denominatorStr, 10);

            if (denominator === 0) {
                return '0';
            }

            // 计算整数部分
            const integerPart = Math.floor(numerator / denominator);
            let remainder = numerator % denominator;

            if (remainder === 0) {
                // 整除的情况
                const signStr = sign === -1 ? '-' : '';
                return `${signStr}${integerPart}`;
            }

            // 使用长除法计算小数部分并检测循环节
            const remainders = [];
            const digits = [];
            let repeatingStart = -1;

            while (remainder !== 0) {
                // 检查余数是否重复出现
                const remainderIndex = remainders.indexOf(remainder);
                if (remainderIndex !== -1) {
                    // 发现循环
                    repeatingStart = remainderIndex;
                    break;
                }

                // 记录余数
                remainders.push(remainder);

                // 计算下一位小数
                remainder *= 10;
                const digit = Math.floor(remainder / denominator);
                digits.push(digit);

                // 更新余数
                remainder = remainder % denominator;

                // 防止无限循环
                if (digits.length > 100) {
                    break;
                }
            }

            // 构建小数部分字符串
            let decimalPart = '';

            if (repeatingStart === -1) {
                // 有限小数
                decimalPart = digits.join('');
            } else {
                // 循环小数
                const nonRepeating = digits.slice(0, repeatingStart).join('');
                const repeating = digits.slice(repeatingStart).join('');

                // 确保非循环部分至少有1位
                if (nonRepeating === '') {
                    // 如果循环从第一位开始，非循环部分设为"0"
                    decimalPart = `${repeating}{${repeating}}`;
                } else {
                    decimalPart = `${nonRepeating}{${repeating}}`;
                }
            }

            // 构建完整结果
            const signStr = sign === -1 ? '-' : '';
            return `${signStr}${integerPart}.${decimalPart}`;
        }

        /**
         * _operateFractions
         * 对两个分数进行四则运算，返回分数结果
         */
        _operateFractions(fraction1, fraction2, operation) {
            // 解析分数
            const parts1 = fraction1.split('/');
            const parts2 = fraction2.split('/');

            const num1 = parseInt(parts1[0], 10);
            const den1 = parseInt(parts1[1] || '1', 10);
            const num2 = parseInt(parts2[0], 10);
            const den2 = parseInt(parts2[1] || '1', 10);

            let resultNum, resultDen;

            switch (operation) {
                case 'add':
                    // a/b + c/d = (ad + bc)/(bd)
                    resultNum = num1 * den2 + num2 * den1;
                    resultDen = den1 * den2;
                    break;

                case 'subtract':
                    // a/b - c/d = (ad - bc)/(bd)
                    resultNum = num1 * den2 - num2 * den1;
                    resultDen = den1 * den2;
                    break;

                case 'multiply':
                    // a/b × c/d = (ac)/(bd)
                    resultNum = num1 * num2;
                    resultDen = den1 * den2;
                    break;

                case 'divide':
                    // a/b ÷ c/d = (ad)/(bc)
                    resultNum = num1 * den2;
                    resultDen = den1 * num2;
                    break;

                default:
                    return '0/1';
            }

            // 约分
            const resultFraction = `${resultNum}/${resultDen}`;
            return this._simplifyFraction(resultFraction);
        }

        /**
         * _normalizeRepeatingDecimal
         * 规范化循环小数表示，确保非循环部分至少有1位
         */
        _normalizeRepeatingDecimal(str) {
            const parsed = this._parseRepeatingDecimal(str);

            if (!parsed.isRepeating) {
                // 有限小数或整数，直接返回
                return str;
            }

            // 构建规范化的循环小数表示
            const signStr = parsed.sign === -1 ? '-' : '';
            return `${signStr}${parsed.integerPart}.${parsed.nonRepeatingPart}{${parsed.cyclePart}}`;
        }

        /**
         * _formatToPrecision
         * 将有限小数或整数格式化为指定精度
         */
        _formatToPrecision(numStr, precision) {
            if (precision < 0) return numStr;

            // 解析数字
            const { sign, integer, decimal } = this._parseNumber(numStr);

            // 格式化整数部分
            const formattedInt = integer.replace(/^0+/, '') || '0';

            if (precision === 0) {
                // 不需要小数部分
                const signStr = sign === -1 ? '-' : '';
                return `${signStr}${formattedInt}`;
            }

            // 处理小数部分
            let formattedDec = '';

            if (decimal === '') {
                // 整数，需要补零
                formattedDec = '0'.repeat(precision);
            } else if (decimal.length < precision) {
                // 小数位数不足，需要补零
                formattedDec = decimal + '0'.repeat(precision - decimal.length);
            } else {
                // 小数位数超过精度，需要截断
                formattedDec = decimal.substring(0, precision);
            }

            // 构建结果
            const signStr = sign === -1 ? '-' : '';
            return `${signStr}${formattedInt}.${formattedDec}`;
        }

        /**
         * _parseFraction
         * 解析分数字符串，支持两种格式：
         * 1. 普通分数：分子/分母
         * 2. 带分数：整数+分子/分母
         * @param {string} fractionStr - 分数字符串
         * @returns {object} 包含整数部分、分子、分母的对象
         */
        _parseFraction(fractionStr) {
            // 去除空格
            fractionStr = fractionStr.trim();

            // 处理符号
            let sign = 1;
            if (fractionStr.startsWith('-')) {
                sign = -1;
                fractionStr = fractionStr.substring(1);
            }

            // 检查是否为带分数格式（包含+号）
            if (fractionStr.includes('+')) {
                const parts = fractionStr.split('+');
                if (parts.length !== 2) {
                    throw new Error(lang("FractionParseError"));
                }

                const integerPart = parseInt(parts[0], 10);
                const fractionPart = parts[1];

                // 解析分数部分
                const fractionParts = fractionPart.split('/');
                if (fractionParts.length !== 2) {
                    throw new Error(lang("FractionParseError"));
                }

                const numerator = parseInt(fractionParts[0], 10);
                const denominator = parseInt(fractionParts[1], 10);

                if (isNaN(integerPart) || isNaN(numerator) || isNaN(denominator)) {
                    throw new Error(lang("FractionParseError"));
                }

                if (denominator === 0) {
                    throw new Error(lang("FractionZeroDenominatorError"));
                }

                // 转换为假分数
                const improperNumerator = sign * (integerPart * denominator + numerator);

                return {
                    sign: sign,
                    integer: integerPart,
                    numerator: improperNumerator,
                    denominator: denominator,
                    isMixed: true
                };
            } else {
                // 普通分数格式
                const parts = fractionStr.split('/');
                if (parts.length !== 2) {
                    throw new Error(lang("FractionParseError"));
                }

                const numerator = parseInt(parts[0], 10);
                const denominator = parseInt(parts[1], 10);

                if (isNaN(numerator) || isNaN(denominator)) {
                    throw new Error(lang("FractionParseError"));
                }

                if (denominator === 0) {
                    throw new Error(lang("FractionZeroDenominatorError"));
                }

                return {
                    sign: sign,
                    integer: 0,
                    numerator: sign * numerator,
                    denominator: denominator,
                    isMixed: false
                };
            }
        }

        /**
         * _formatFraction
         * 格式化分数对象为字符串
         * @param {object} fractionObj - 分数对象
         * @param {boolean} asMixedNumber - 是否格式化为带分数
         * @returns {string} 格式化后的分数字符串
         */
        _formatFraction(fractionObj, asMixedNumber = false) {
            let sign = fractionObj.numerator < 0 ? -1 : 1;
            let numerator = Math.abs(fractionObj.numerator);
            let denominator = fractionObj.denominator;

            // 简化分数
            const gcd = this._gcd(numerator, denominator);
            numerator = numerator / gcd;
            denominator = denominator / gcd;

            if (asMixedNumber && numerator >= denominator) {
                // 转换为带分数
                const integerPart = Math.floor(numerator / denominator);
                const newNumerator = numerator % denominator;

                let result = '';
                if (sign === -1) {
                    result += '-';
                }

                result += integerPart.toString();
                if (newNumerator > 0) {
                    result += '+' + newNumerator.toString() + '/' + denominator.toString();
                }

                return result;
            } else {
                // 普通分数格式
                let result = '';
                if (sign === -1) {
                    result += '-';
                }
                result += numerator.toString() + '/' + denominator.toString();
                return result;
            }
        }

        /**
         * _convertToFractionObj
         * 将任意输入转换为分数对象
         * 支持：整数、小数、分数、带分数
         */
        _convertToFractionObj(input) {
            const inputStr = String(input).trim();

            // 检查是否为分数（包含/）或带分数（包含+）
            if (inputStr.includes('/') || inputStr.includes('+')) {
                return this._parseFraction(inputStr);
            }

            // 否则视为整数或小数
            const { sign, integer, decimal } = this._parseNumber(inputStr);

            // 构建分数对象
            // 对于整数：整数/1
            // 对于小数：转换为分数形式
            let numerator, denominator;

            if (decimal === '') {
                // 整数
                numerator = sign * parseInt(integer, 10);
                denominator = 1;
            } else {
                // 小数，例如：0.25 = 25/100 = 1/4
                // 分子 = 整数部分+小数部分组成的整数
                // 分母 = 10的小数位数次方
                const fullNumber = integer + decimal;
                const decimalLength = decimal.length;
                numerator = sign * parseInt(fullNumber, 10);
                denominator = Math.pow(10, decimalLength);
            }

            // 简化分数
            const gcd = this._gcd(Math.abs(numerator), denominator);
            numerator = numerator / gcd;
            denominator = denominator / gcd;

            return {
                sign: numerator < 0 ? -1 : 1,
                integer: 0,
                numerator: Math.abs(numerator),
                denominator: denominator,
                isMixed: false
            };
        }

        /**
         * 弧度制三角函数计算
         */
        _radTrigCalculation(radians, func) {
            // 规范化弧度值到主区间 [0, 2π)
            const normalized = this._normalizeRadians(radians);

            switch (func) {
                case 'sin':
                    return this._highPrecisionSin(normalized);
                case 'cos':
                    return this._highPrecisionCos(normalized);
                case 'tan':
                    const sinVal = this._highPrecisionSin(normalized);
                    const cosVal = this._highPrecisionCos(normalized);
                    if (this._isZero(cosVal)) {
                        return this._handleError(lang("TrigDomainError") + ` (tan undefined at ${radians} radians)`);
                    }
                    return this.Divide({ Dividend: sinVal, Divisor: cosVal });
                case 'cot':
                    const sinVal2 = this._highPrecisionSin(normalized);
                    const cosVal2 = this._highPrecisionCos(normalized);
                    if (this._isZero(sinVal2)) {
                        return this._handleError(lang("TrigDomainError") + ` (cot undefined at ${radians} radians)`);
                    }
                    return this.Divide({ Dividend: cosVal2, Divisor: sinVal2 });
                case 'sec':
                    const cosVal3 = this._highPrecisionCos(normalized);
                    if (this._isZero(cosVal3)) {
                        return this._handleError(lang("TrigDomainError") + ` (sec undefined at ${radians} radians)`);
                    }
                    return this._reciprocal(cosVal3);
                case 'csc':
                    const sinVal3 = this._highPrecisionSin(normalized);
                    if (this._isZero(sinVal3)) {
                        return this._handleError(lang("TrigDomainError") + ` (csc undefined at ${radians} radians)`);
                    }
                    return this._reciprocal(sinVal3);
                default:
                    return this._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * 弧度制反三角函数计算
         */
        _radArctrigCalculation(value, func) {
            const valueNum = parseFloat(value);

            let result;

            try {
                switch (func) {
                    case "asin":
                        if (valueNum < -1 || valueNum > 1) {
                            return this._handleError(lang("ArctrigDomainError") + " (asin: value must be between -1 and 1)");
                        }
                        result = this._highPrecisionAsin(value);
                        // 将角度转换为弧度
                        return this._degreesToRadians(result);
                    case "acos":
                        if (valueNum < -1 || valueNum > 1) {
                            return this._handleError(lang("ArctrigDomainError") + " (acos: value must be between -1 and 1)");
                        }
                        result = this._highPrecisionAcos(value);
                        return this._degreesToRadians(result);
                    case "atan":
                        result = this._highPrecisionAtan(value);
                        return this._degreesToRadians(result);
                    case "acot":
                        result = this._highPrecisionAcot(value);
                        return this._degreesToRadians(result);
                    case "asec":
                        if (Math.abs(valueNum) < 1) {
                            return this._handleError(lang("ArctrigDomainError") + " (asec: |value| must be ≥ 1)");
                        }
                        result = this._highPrecisionAsec(value);
                        return this._degreesToRadians(result);
                    case "acsc":
                        if (Math.abs(valueNum) < 1) {
                            return this._handleError(lang("ArctrigDomainError") + " (acsc: |value| must be ≥ 1)");
                        }
                        result = this._highPrecisionAcsc(value);
                        return this._degreesToRadians(result);
                    default:
                        return this._handleError(lang("UndefinedErrorText"));
                }
            } catch (error) {
                return this._handleError(lang("ArctrigDomainError"));
            }
        }

        /**
         * 规范化弧度值到 [0, 2π)
         */
        _normalizeRadians(radians) {
            const twoPi = this.Multiply({ Multiplier1: "2", Multiplier2: this.pi });
            let normalized = radians;

            while (this._compareNumbers(normalized, "0") < 0) {
                normalized = this.Add({ Addend1: normalized, Addend2: twoPi });
            }
            while (this._compareNumbers(normalized, twoPi) >= 0) {
                normalized = this.Subtract({ Minuend: normalized, Subtrahend: twoPi });
            }

            return normalized;
        }

        /**
         * 双曲函数计算
         */
        _hyperbolicCalculation(x, func) {
            const xNum = parseFloat(x);

            switch (func) {
                case 'sinh':
                    // sinh(x) = (e^x - e^(-x)) / 2
                    return this._calculateSinh(x);
                case 'cosh':
                    // cosh(x) = (e^x + e^(-x)) / 2
                    return this._calculateCosh(x);
                case 'tanh':
                    // tanh(x) = sinh(x) / cosh(x)
                    const sinhVal = this._calculateSinh(x);
                    const coshVal = this._calculateCosh(x);
                    if (this._isZero(coshVal)) {
                        return this._handleError("tanh undefined (division by zero)");
                    }
                    return this.Divide({ Dividend: sinhVal, Divisor: coshVal });
                case 'coth':
                    // coth(x) = cosh(x) / sinh(x)
                    const sinhVal2 = this._calculateSinh(x);
                    const coshVal2 = this._calculateCosh(x);
                    if (this._isZero(sinhVal2)) {
                        return this._handleError("coth undefined (division by zero)");
                    }
                    return this.Divide({ Dividend: coshVal2, Divisor: sinhVal2 });
                case 'sech':
                    // sech(x) = 1 / cosh(x)
                    const coshVal3 = this._calculateCosh(x);
                    if (this._isZero(coshVal3)) {
                        return this._handleError("sech undefined (division by zero)");
                    }
                    return this._reciprocal(coshVal3);
                case 'csch':
                    // csch(x) = 1 / sinh(x)
                    const sinhVal3 = this._calculateSinh(x);
                    if (this._isZero(sinhVal3)) {
                        return this._handleError("csch undefined (division by zero)");
                    }
                    return this._reciprocal(sinhVal3);
                default:
                    return this._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * 计算 sinh(x)
         */
        _calculateSinh(x) {
            // sinh(x) = (e^x - e^(-x)) / 2
            const expX = this._exponentialFunction(x);
            const expNegX = this._exponentialFunction(this.Multiply({ Multiplier1: x, Multiplier2: "-1" }));
            const numerator = this.Subtract({ Minuend: expX, Subtrahend: expNegX });
            return this.Divide({ Dividend: numerator, Divisor: "2" });
        }

        /**
         * 计算 cosh(x)
         */
        _calculateCosh(x) {
            // cosh(x) = (e^x + e^(-x)) / 2
            const expX = this._exponentialFunction(x);
            const expNegX = this._exponentialFunction(this.Multiply({ Multiplier1: x, Multiplier2: "-1" }));
            const numerator = this.Add({ Addend1: expX, Addend2: expNegX });
            return this.Divide({ Dividend: numerator, Divisor: "2" });
        }

        /**
         * 反双曲函数计算
         */
        _ahyperbolicCalculation(x, func) {
            const xNum = parseFloat(x);

            switch (func) {
                case 'asinh':
                    // asinh(x) = ln(x + √(x² + 1))
                    return this._calculateAsinh(x);
                case 'acosh':
                    // acosh(x) = ln(x + √(x² - 1)), x ≥ 1
                    if (xNum < 1) {
                        return this._handleError("acosh: value must be ≥ 1");
                    }
                    return this._calculateAcosh(x);
                case 'atanh':
                    // atanh(x) = 0.5 * ln((1 + x) / (1 - x)), |x| < 1
                    if (Math.abs(xNum) >= 1) {
                        return this._handleError("atanh: |value| must be < 1");
                    }
                    return this._calculateAtanh(x);
                case 'acoth':
                    // acoth(x) = 0.5 * ln((x + 1) / (x - 1)), |x| > 1
                    if (Math.abs(xNum) <= 1) {
                        return this._handleError("acoth: |value| must be > 1");
                    }
                    return this._calculateAcoth(x);
                case 'asech':
                    // asech(x) = acosh(1/x), 0 < x ≤ 1
                    if (xNum <= 0 || xNum > 1) {
                        return this._handleError("asech: value must be in (0, 1]");
                    }
                    const reciprocal1 = this._reciprocal(x);
                    return this._calculateAcosh(reciprocal1);
                case 'acsch':
                    // acsch(x) = asinh(1/x), x ≠ 0
                    if (this._isZero(x)) {
                        return this._handleError("acsch: value must be ≠ 0");
                    }
                    const reciprocal2 = this._reciprocal(x);
                    return this._calculateAsinh(reciprocal2);
                default:
                    return this._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * 计算 asinh(x)
         */
        _calculateAsinh(x) {
            // asinh(x) = ln(x + √(x² + 1))
            const xSquared = this.Multiply({ Multiplier1: x, Multiplier2: x });
            const xSquaredPlus1 = this.Add({ Addend1: xSquared, Addend2: "1" });
            const sqrtTerm = this.Root({ RootIndex: "2", Radicand: xSquaredPlus1 });
            const sum = this.Add({ Addend1: x, Addend2: sqrtTerm });
            return this._naturalLogarithm(sum);
        }

        /**
         * 计算 acosh(x)
         */
        _calculateAcosh(x) {
            // acosh(x) = ln(x + √(x² - 1))
            const xSquared = this.Multiply({ Multiplier1: x, Multiplier2: x });
            const xSquaredMinus1 = this.Subtract({ Minuend: xSquared, Subtrahend: "1" });
            const sqrtTerm = this.Root({ RootIndex: "2", Radicand: xSquaredMinus1 });
            const sum = this.Add({ Addend1: x, Addend2: sqrtTerm });
            return this._naturalLogarithm(sum);
        }

        /**
         * 计算 atanh(x)
         */
        _calculateAtanh(x) {
            // atanh(x) = 0.5 * ln((1 + x) / (1 - x))
            const onePlusX = this.Add({ Addend1: "1", Addend2: x });
            const oneMinusX = this.Subtract({ Minuend: "1", Subtrahend: x });
            const ratio = this.Divide({ Dividend: onePlusX, Divisor: oneMinusX });
            const lnTerm = this._naturalLogarithm(ratio);
            return this.Divide({ Dividend: lnTerm, Divisor: "2" });
        }

        /**
         * 计算 acoth(x)
         */
        _calculateAcoth(x) {
            // acoth(x) = 0.5 * ln((x + 1) / (x - 1))
            const xPlus1 = this.Add({ Addend1: x, Addend2: "1" });
            const xMinus1 = this.Subtract({ Minuend: x, Subtrahend: "1" });
            const ratio = this.Divide({ Dividend: xPlus1, Divisor: xMinus1 });
            const lnTerm = this._naturalLogarithm(ratio);
            return this.Divide({ Dividend: lnTerm, Divisor: "2" });
        }

        /**
         * 解析比例字符串
         * 支持格式：a:b 或 a/b
         */
        _parseProportion(str) {
            str = str.trim();

            // 处理符号
            let sign = 1;
            if (str.startsWith('-')) {
                sign = -1;
                str = str.substring(1);
            }

            let antecedent, consequent;

            // 检查比例格式
            if (str.includes(':')) {
                // 格式：a:b
                const parts = str.split(':');
                if (parts.length !== 2) {
                    throw new Error("Invalid proportion format");
                }
                antecedent = parseFloat(parts[0]);
                consequent = parseFloat(parts[1]);
            } else if (str.includes('/')) {
                // 格式：a/b
                const parts = str.split('/');
                if (parts.length !== 2) {
                    throw new Error("Invalid fraction format");
                }
                antecedent = parseFloat(parts[0]);
                consequent = parseFloat(parts[1]);
            } else {
                // 纯数字，假设比例为 x:1
                antecedent = parseFloat(str);
                consequent = 1;
            }

            if (isNaN(antecedent) || isNaN(consequent)) {
                throw new Error("Invalid proportion values");
            }

            if (consequent === 0) {
                throw new Error("Denominator/consequent cannot be zero");
            }

            return {
                antecedent: sign * antecedent,
                consequent: consequent,
                sign: sign
            };
        }

        /**
         * 简化比例
         * @param {number} antecedent - 前项
         * @param {number} consequent - 后项
         * @returns {object} 简化后的比例
         */
        _simplifyProportionValues(antecedent, consequent) {
            // 确保分母为正
            let sign = 1;
            if (consequent < 0) {
                consequent = -consequent;
                antecedent = -antecedent;
            }
            if (antecedent < 0) {
                sign = -1;
                antecedent = -antecedent;
            }

            // 计算最大公约数
            const divisor = this._gcd(antecedent, consequent);

            // 简化比例
            const simplifiedAntecedent = antecedent / divisor;
            const simplifiedConsequent = consequent / divisor;

            return {
                antecedent: sign * simplifiedAntecedent,
                consequent: simplifiedConsequent,
                sign: sign
            };
        }

        /**
         * 直接比例运算辅助方法
         * 将比例运算简化为分数运算，避免复杂的转换过程
         */
        _proportionOperation(prop1, prop2, operation) {
            // 解析比例
            const parsed1 = this._parseProportion(prop1);
            const parsed2 = this._parseProportion(prop2);

            // 将比例转换为分数形式的值
            const value1 = parsed1.antecedent / parsed1.consequent;
            const value2 = parsed2.antecedent / parsed2.consequent;

            let resultValue;

            switch (operation) {
                case 'add':
                    resultValue = value1 + value2;
                    break;
                case 'subtract':
                    resultValue = value1 - value2;
                    break;
                case 'multiply':
                    resultValue = value1 * value2;
                    break;
                case 'divide':
                    if (value2 === 0) {
                        throw new Error(lang("DivideByZeroError"));
                    }
                    resultValue = value1 / value2;
                    break;
                default:
                    throw new Error(lang("UndefinedErrorText"));
            }

            // 将结果值转换为比例
            // 先将结果值转换为分数，然后简化
            const tolerance = 1e-10;

            // 尝试将小数转换为分数
            for (let denominator = 1; denominator <= 1000; denominator++) {
                const numerator = Math.round(resultValue * denominator);

                if (Math.abs(resultValue - (numerator / denominator)) < tolerance) {
                    // 找到合适的分数表示
                    const simplified = this._simplifyProportionValues(numerator, denominator);

                    // 构建比例字符串
                    let result = "";
                    if (simplified.sign === -1) {
                        result += "-";
                    }
                    result += simplified.antecedent + ":" + simplified.consequent;

                    return result;
                }
            }

            // 如果找不到简单分数，使用高精度小数表示
            // 将结果值格式化为小数，然后表示为1:x的比例
            const decimalStr = resultValue.toFixed(this.decimal);
            const decimalNum = parseFloat(decimalStr);

            // 将小数转换为分数：decimalNum : 1
            const simplified = this._simplifyProportionValues(decimalNum * 10000, 10000);

            let result = "";
            if (simplified.sign === -1) {
                result += "-";
            }
            result += simplified.antecedent + ":" + simplified.consequent;

            return result;
        }

        /**
         * 解分式方程：将表达式化为 A/B = 0 形式，然后交叉相乘得 A=0，并检验分母不为0
         * @param {string} expr 标准化后的表达式（已移项，例如 "a/x - b"）
         * @param {string} variable 变量名
         * @returns {string} 解或错误信息
         */
        _solveFractionalEquation(expr, variable) {
            // 将 expr 写为 "分子/分母" 的形式。由于表达式可能有多项，我们需要通分。
            // 简单实现：假设表达式已经是 "left/right" 的形式（用户方程简单时）
            // 更通用的方法：将表达式拆分为分子和分母，但这里我们利用现有的解析器。
            // 替代方案：使用数值方法？不，我们要代数解。

            // 为了简化，我们只处理形如 "a/(bx+c) - d = 0" 或 "a/x - b = 0" 的形式。
            // 实际上我们可以通过将表达式视为 A/B 形式，其中 A 和 B 是多项式。
            // 由于原解析器不能直接处理分式，我们采用模式匹配。

            // 尝试匹配常见分式形式：变量在分母中
            // 例如： "a/x - b" => a/x = b => a = b*x
            // 例如： "a/(b*x+c) - d" => a/(b*x+c) = d => a = d*(b*x+c)

            // 提取变量在分母中的项
            const varInDenomRegex = new RegExp(`([\\d.]*)\\/([\\d.]*${variable}[\\d.]*)`);
            const match = expr.match(varInDenomRegex);
            if (!match) {
                return this._handleError("EquationSolveError", "simple", true, "无法解析分式方程");
            }

            const numerator = match[1] || "1";
            const denominator = match[2];

            // 方程形式： numerator/denominator + other = 0
            // 提取 other 部分
            let otherPart = expr.replace(match[0], '').replace(/^\+/, '').replace(/^-/, '');
            if (otherPart === '') otherPart = '0';

            // 构建方程： numerator/denominator = -otherPart
            // 交叉相乘： numerator = -otherPart * denominator
            let rightExpr = this.Multiply({ Multiplier1: `-1`, Multiplier2: otherPart });
            let leftExpr = numerator;

            // 得到整式方程： leftExpr = rightExpr * denominator
            const product = this._multiplyPolynomials(rightExpr, denominator);
            let newExpr = this.Subtract({ Minuend: leftExpr, Subtrahend: product });

            // 现在 newExpr 是整式方程，再次求解
            return this._solvePolynomialEquation(newExpr, variable);
        }

        /**
         * 多项式乘法（简单实现，仅处理单项式乘多项式）
         */
        _multiplyPolynomials(a, b) {
            // 将 a 和 b 视为字符串表达式，使用乘法运算
            // 如果 a 或 b 包含变量，直接调用 Multiply 积木
            if (a.includes('*') || b.includes('*')) {
                // 复杂情况，简单拼接
                return `(${a})*(${b})`;
            }
            return this.Multiply({ Multiplier1: a, Multiplier2: b });
        }

        /**
         * 验证大数字符串是否合法（只包含数字和可选的前导负号）
         */
        _validateBigNumber(numStr) {
            if (typeof numStr !== 'string') {
                return false;
            }
            numStr = numStr.trim();
            if (numStr === '') {
                return false;
            }
            // 允许负号开头
            if (numStr.startsWith('-')) {
                numStr = numStr.substring(1);
            }
            // 移除前导零，但允许单独的0
            numStr = numStr.replace(/^0+/, '');
            if (numStr === '') {
                return '0';
            }
            // 验证是否只包含数字
            return /^\d+$/.test(numStr);
        }

        /**
         * 规范化大数字符串（移除前导零，处理负号）
         */
        _normalizeBigNumber(numStr) {
            numStr = String(numStr).trim();

            // 处理符号
            let sign = 1;
            if (numStr.startsWith('-')) {
                sign = -1;
                numStr = numStr.substring(1);
            }

            // 移除前导零
            numStr = numStr.replace(/^0+/, '');
            if (numStr === '') {
                return '0';
            }

            // 返回带符号的结果
            return sign === -1 ? '-' + numStr : numStr;
        }

        /**
         * 比较两个大整数的大小
         * 返回：1（a > b），-1（a < b），0（a == b）
         */
        _compareBigNumbers(a, b) {
            a = this._normalizeBigNumber(a);
            b = this._normalizeBigNumber(b);

            // 处理符号
            const aSign = a.startsWith('-') ? -1 : 1;
            const bSign = b.startsWith('-') ? -1 : 1;

            // 去掉符号
            const aAbs = aSign === -1 ? a.substring(1) : a;
            const bAbs = bSign === -1 ? b.substring(1) : b;

            // 比较符号
            if (aSign !== bSign) {
                return aSign > bSign ? 1 : -1;
            }

            // 比较长度
            if (aAbs.length !== bAbs.length) {
                if (aSign === 1) {
                    return aAbs.length > bAbs.length ? 1 : -1;
                } else {
                    // 负数时，绝对值大的反而小
                    return aAbs.length > bAbs.length ? -1 : 1;
                }
            }

            // 逐位比较
            for (let i = 0; i < aAbs.length; i++) {
                const digitA = parseInt(aAbs[i], 10);
                const digitB = parseInt(bAbs[i], 10);

                if (digitA !== digitB) {
                    if (aSign === 1) {
                        return digitA > digitB ? 1 : -1;
                    } else {
                        // 负数时，数字大的反而小
                        return digitA > digitB ? -1 : 1;
                    }
                }
            }

            return 0; // 相等
        }

        /**
         * 大整数加法（核心算法）
         */
        _bigIntegerAdd(a, b) {
            a = this._normalizeBigNumber(a);
            b = this._normalizeBigNumber(b);

            // 处理符号不同的情况
            if (a.startsWith('-') && !b.startsWith('-')) {
                // -a + b = b - a
                return this._bigIntegerSubtract(b, a.substring(1));
            }
            if (!a.startsWith('-') && b.startsWith('-')) {
                // a + (-b) = a - b
                return this._bigIntegerSubtract(a, b.substring(1));
            }

            // 确定符号
            let sign = '';
            if (a.startsWith('-') && b.startsWith('-')) {
                sign = '-';
                a = a.substring(1);
                b = b.substring(1);
            }

            // 确保a是较长的数字
            if (a.length < b.length) {
                [a, b] = [b, a];
            }

            let result = '';
            let carry = 0;
            let i = a.length - 1;
            let j = b.length - 1;

            while (i >= 0 || j >= 0 || carry > 0) {
                const digitA = i >= 0 ? parseInt(a[i], 10) : 0;
                const digitB = j >= 0 ? parseInt(b[j], 10) : 0;

                let sum = digitA + digitB + carry;
                carry = Math.floor(sum / 10);
                result = (sum % 10) + result;

                i--;
                j--;
            }

            // 移除前导零
            result = result.replace(/^0+/, '');
            if (result === '') {
                return '0';
            }

            return sign + result;
        }

        /**
         * 大整数减法（核心算法）
         */
        _bigIntegerSubtract(a, b) {
            a = this._normalizeBigNumber(a);
            b = this._normalizeBigNumber(b);

            // 处理符号不同的情况
            if (a.startsWith('-') && !b.startsWith('-')) {
                // -a - b = -(a + b)
                return '-' + this._bigIntegerAdd(a.substring(1), b);
            }
            if (!a.startsWith('-') && b.startsWith('-')) {
                // a - (-b) = a + b
                return this._bigIntegerAdd(a, b.substring(1));
            }
            if (a.startsWith('-') && b.startsWith('-')) {
                // -a - (-b) = b - a
                return this._bigIntegerSubtract(b.substring(1), a.substring(1));
            }

            // 比较大小，确保a >= b
            const comparison = this._compareBigNumbers(a, b);
            if (comparison < 0) {
                // a < b，返回负的(b - a)
                return '-' + this._bigIntegerSubtract(b, a);
            }
            if (comparison === 0) {
                return '0';
            }

            let result = '';
            let borrow = 0;
            let i = a.length - 1;
            let j = b.length - 1;

            while (i >= 0) {
                const digitA = parseInt(a[i], 10) - borrow;
                const digitB = j >= 0 ? parseInt(b[j], 10) : 0;

                let diff = digitA - digitB;
                if (diff < 0) {
                    diff += 10;
                    borrow = 1;
                } else {
                    borrow = 0;
                }

                result = diff + result;

                i--;
                j--;
            }

            // 移除前导零
            result = result.replace(/^0+/, '');
            if (result === '') {
                return '0';
            }

            return result;
        }

        /**
         * 大整数乘法（核心算法 - 使用竖式乘法）
         */
        _bigIntegerMultiply(a, b) {
            a = this._normalizeBigNumber(a);
            b = this._normalizeBigNumber(b);

            // 处理符号
            let sign = '';
            if ((a.startsWith('-') && !b.startsWith('-')) || (!a.startsWith('-') && b.startsWith('-'))) {
                sign = '-';
            }

            // 去掉符号
            a = a.startsWith('-') ? a.substring(1) : a;
            b = b.startsWith('-') ? b.substring(1) : b;

            // 处理0的情况
            if (a === '0' || b === '0') {
                return '0';
            }

            // 确保a是较长的数字
            if (a.length < b.length) {
                [a, b] = [b, a];
            }

            // 使用数组存储结果，每个元素对应一位
            const result = new Array(a.length + b.length).fill(0);

            // 从低位到高位相乘
            for (let i = a.length - 1; i >= 0; i--) {
                let carry = 0;
                const digitA = parseInt(a[i], 10);

                for (let j = b.length - 1; j >= 0; j--) {
                    const digitB = parseInt(b[j], 10);
                    const product = digitA * digitB + carry + result[i + j + 1];

                    result[i + j + 1] = product % 10;
                    carry = Math.floor(product / 10);
                }

                // 处理最后的进位
                if (carry > 0) {
                    result[i] += carry;
                }
            }

            // 转换为字符串
            let resultStr = result.join('').replace(/^0+/, '');
            if (resultStr === '') {
                return '0';
            }

            return sign + resultStr;
        }

        /**
         * 大整数除法（返回商和余数）
         */
        _bigIntegerDivide(dividend, divisor) {
            dividend = this._normalizeBigNumber(dividend);
            divisor = this._normalizeBigNumber(divisor);

            // 处理符号
            let sign = '';
            if ((dividend.startsWith('-') && !divisor.startsWith('-')) || (!dividend.startsWith('-') && divisor.startsWith('-'))) {
                sign = '-';
            }

            // 去掉符号
            dividend = dividend.startsWith('-') ? dividend.substring(1) : dividend;
            divisor = divisor.startsWith('-') ? divisor.substring(1) : divisor;

            // 检查除数是否为0
            if (divisor === '0') {
                throw new Error(lang("DivideByZeroError"));
            }

            // 如果被除数小于除数，商为0，余数为被除数
            if (this._compareBigNumbers(dividend, divisor) < 0) {
                return {
                    quotient: '0',
                    remainder: dividend === '0' ? '0' : sign === '-' ? '-' + dividend : dividend
                };
            }

            // 如果除数等于1
            if (divisor === '1') {
                return {
                    quotient: sign + dividend,
                    remainder: '0'
                };
            }

            // 长除法算法
            let quotient = '';
            let remainder = '';
            let index = 0;

            while (index < dividend.length) {
                // 取下一个数字
                remainder += dividend[index];
                remainder = this._normalizeBigNumber(remainder);

                let count = 0;
                let temp = remainder;

                // 减去尽可能多的除数
                while (this._compareBigNumbers(temp, divisor) >= 0) {
                    temp = this._bigIntegerSubtract(temp, divisor);
                    count++;
                }

                quotient += count;
                remainder = temp;

                index++;
            }

            // 移除商的前导零
            quotient = quotient.replace(/^0+/, '');
            if (quotient === '') {
                quotient = '0';
            }

            return {
                quotient: sign === '-' ? '-' + quotient : quotient,
                remainder: remainder === '0' ? '0' : sign === '-' ? '-' + remainder : remainder
            };
        }

        /**
         * 大整数幂运算（快速幂算法）
         */
        _bigIntegerPow(base, exponent) {
            base = this._normalizeBigNumber(base);
            exponent = this._normalizeBigNumber(exponent);

            // 验证指数是否为非负整数
            if (exponent.startsWith('-')) {
                throw new Error("指数必须为非负整数");
            }

            // 特殊情况
            if (exponent === '0') {
                return '1';
            }
            if (exponent === '1') {
                return base;
            }
            if (base === '0') {
                return '0';
            }
            if (base === '1') {
                return '1';
            }
            if (base === '-1') {
                // -1的偶数次幂为1，奇数次幂为-1
                const lastDigit = parseInt(exponent[exponent.length - 1], 10);
                return lastDigit % 2 === 0 ? '1' : '-1';
            }

            // 快速幂算法
            let result = '1';
            let currentBase = base;
            let currentExponent = exponent;

            while (this._compareBigNumbers(currentExponent, '0') > 0) {
                const lastDigit = parseInt(currentExponent[currentExponent.length - 1], 10);

                // 如果当前指数是奇数
                if (lastDigit % 2 === 1) {
                    result = this._bigIntegerMultiply(result, currentBase);
                }

                // 底数平方
                currentBase = this._bigIntegerMultiply(currentBase, currentBase);

                // 指数除以2（向下取整）
                const divisionResult = this._bigIntegerDivide(currentExponent, '2');
                currentExponent = divisionResult.quotient;

                // 防止无限循环（安全限制）
                if (currentExponent.length > 1000) {
                    throw new Error("指数太大，计算被终止");
                }
            }

            return result;
        }

        /**
         * 大整数模幂运算（快速幂模算法）
         */
        _bigIntegerPowMod(base, exponent, mod) {
            base = this._normalizeBigNumber(base);
            exponent = this._normalizeBigNumber(exponent);
            mod = this._normalizeBigNumber(mod);

            // 验证指数是否为非负整数
            if (exponent.startsWith('-')) {
                throw new Error("指数必须为非负整数");
            }

            // 模为0或1的情况
            if (mod === '0') {
                throw new Error("模数不能为0");
            }
            if (mod === '1') {
                return '0';
            }

            // 取模运算辅助函数
            const modReduce = (num) => {
                const division = this._bigIntegerDivide(num, mod);
                return division.remainder.startsWith('-') ?
                    this._bigIntegerAdd(division.remainder, mod) : division.remainder;
            };

            // 快速幂模算法
            let result = '1';
            let currentBase = modReduce(base);
            let currentExponent = exponent;

            while (this._compareBigNumbers(currentExponent, '0') > 0) {
                const lastDigit = parseInt(currentExponent[currentExponent.length - 1], 10);

                // 如果当前指数是奇数
                if (lastDigit % 2 === 1) {
                    result = modReduce(this._bigIntegerMultiply(result, currentBase));
                }

                // 底数平方并取模
                currentBase = modReduce(this._bigIntegerMultiply(currentBase, currentBase));

                // 指数除以2（向下取整）
                const divisionResult = this._bigIntegerDivide(currentExponent, '2');
                currentExponent = divisionResult.quotient;

                // 防止无限循环（安全限制）
                if (currentExponent.length > 1000) {
                    throw new Error("指数太大，计算被终止");
                }
            }

            return result;
        }

        /**
         * 解析矩阵字符串为二维数组
         * @param {string} matrixStr - 矩阵字符串，如 "[[1,2],[3,4]]"
         * @returns {Array} 二维数组
         */
        _parseMatrix(matrixStr) {
            try {
                if (typeof matrixStr !== 'string') {
                    throw new Error("Invalid matrix format");
                }
                // 移除所有空格
                matrixStr = matrixStr.replace(/\s/g, '');

                // 检查格式：必须以 [[ 开头、以 ]] 结尾
                if (!matrixStr.startsWith('[[') || !matrixStr.endsWith(']]')) {
                    throw new Error("Invalid matrix format");
                }

                // 去掉最外层的 [[ 和 ]]，剩余形如 "1,2],[3,4"
                const inner = matrixStr.slice(2, -2);

                // 按行分隔符 "],[" 拆分
                const rowStrs = inner.split('],[');

                const rows = rowStrs.map(rowStr => {
                    // 清理首尾可能残留的方括号
                    const clean = rowStr.replace(/^\[/, '').replace(/\]$/, '');
                    if (clean === '') return [];
                    return clean.split(',').map(s => this._safeParseFloat(s));
                });

                // 验证非空
                if (rows.length === 0) {
                    throw new Error("Empty matrix");
                }

                // 验证所有行长度一致
                const cols = rows[0].length;
                for (const row of rows) {
                    if (row.length !== cols) {
                        throw new Error("Inconsistent row lengths");
                    }
                }

                return rows;
            } catch (error) {
                // 直接抛出异常，让上层 catch 处理
                throw error;
            }
        }

        /**
         * 安全解析浮点数（支持高精度）
         */
        _safeParseFloat(str) {
            const num = parseFloat(str);
            if (isNaN(num)) {
                return 0;
            }
            return num;
        }

        /**
         * 格式化矩阵为字符串
         */
        _formatMatrix(matrix) {
            // 如果矩阵为空或无效，返回空数组字符串
            if (!matrix || !Array.isArray(matrix) || matrix.length === 0) {
                return '[]';
            }
            // 检查第一行是否是数组
            if (!Array.isArray(matrix[0])) {
                return '[]';
            }
            const rows = matrix.map(row =>
                '[' + row.map(val => this._formatNumber(val)).join(',') + ']'
            );
            // 每行已被 [ ] 包裹，外层只需再加一层方括号
            return '[' + rows.join(',') + ']';
        }

        /**
         * 格式化数字（高精度）
         */
        _formatNumber(value) {
            if (typeof value === 'string') {
                return value;
            }
            return this._roundToPrecision(value.toString(), this.decimal);
        }

        /**
         * 大整数开根（返回整数部分）
         */
        _bigIntegerRoot(rootIndex, radicand) {
            rootIndex = this._normalizeBigNumber(rootIndex);
            radicand = this._normalizeBigNumber(radicand);

            // 验证根指数
            if (rootIndex.startsWith('-')) {
                throw new Error("根指数必须为正数");
            }
            if (rootIndex === '0') {
                throw new Error("根指数不能为0");
            }
            if (radicand.startsWith('-')) {
                throw new Error("被开方数不能为负数");
            }

            // 特殊情况
            if (radicand === '0' || radicand === '1') {
                return radicand;
            }
            if (rootIndex === '1') {
                return radicand;
            }

            // 使用二分查找法求整数根
            let low = '1';
            let high = radicand;
            let result = '0';

            while (this._compareBigNumbers(low, high) <= 0) {
                // 计算中间值
                const sum = this._bigIntegerAdd(low, high);
                const division = this._bigIntegerDivide(sum, '2');
                let mid = division.quotient;

                // 计算mid^rootIndex
                let power;
                try {
                    power = this._bigIntegerPow(mid, rootIndex);
                } catch (e) {
                    // 如果幂太大，调整high并继续
                    high = this._bigIntegerSubtract(mid, '1');
                    continue;
                }

                const comparison = this._compareBigNumbers(power, radicand);

                if (comparison === 0) {
                    // 找到精确解
                    return mid;
                } else if (comparison < 0) {
                    // power < radicand
                    result = mid; // 更新结果为当前mid
                    low = this._bigIntegerAdd(mid, '1');
                } else {
                    // power > radicand
                    high = this._bigIntegerSubtract(mid, '1');
                }

                // 防止无限循环
                if (this._compareBigNumbers(high, low) < 0) {
                    break;
                }
            }

            return result;
        }

        /**
         * 大整数绝对值
         */
        _bigIntegerAbsolute(num) {
            num = this._normalizeBigNumber(num);
            return num.startsWith('-') ? num.substring(1) : num;
        }

        /**
         * 大整数取负
         */
        _bigIntegerNegative(num) {
            num = this._normalizeBigNumber(num);
            if (num === '0') {
                return '0';
            }
            return num.startsWith('-') ? num.substring(1) : '-' + num;
        }

        /**
         * 获取分数的分子或分母
         * @param {string} fractionStr - 分数字符串
         * @param {string} partType - 获取部分类型 ("numerator" 或 "denominator")
         * @returns {string} 分子或分母的值
         */
        _getFractionPart(fractionStr, partType) {
            try {
                // 使用现有的分数解析方法
                const fractionObj = this._parseFraction(fractionStr);

                if (partType === "numerator") {
                    return Math.abs(fractionObj.numerator).toString();
                } else if (partType === "denominator") {
                    return fractionObj.denominator.toString();
                }

                return "0";
            } catch (error) {
                return this._handleError(lang("FractionParseError"));
            }
        }

        /**
         * 根据分子和分母创建分数
         * @param {string} numeratorStr - 分子
         * @param {string} denominatorStr - 分母
         * @returns {string} 分数字符串（已简化）
         */
        _createFraction(numeratorStr, denominatorStr) {
            try {
                const numerator = parseFloat(numeratorStr);
                const denominator = parseFloat(denominatorStr);

                if (isNaN(numerator) || isNaN(denominator)) {
                    return this._handleError(lang("NoNumber"));
                }

                if (denominator === 0) {
                    return this._handleError(lang("FractionZeroDenominatorError"));
                }

                // 创建分数对象
                const fractionObj = {
                    sign: numerator < 0 ? -1 : 1,
                    integer: 0,
                    numerator: Math.abs(numerator),
                    denominator: Math.abs(denominator),
                    isMixed: false
                };

                // 简化分数
                const result = this._formatFraction(fractionObj, false);
                return result;
            } catch (error) {
                return this._handleError(lang("UndefinedErrorText"));
            }
        }

        /**
         * 解析虚数字符串
         * 支持格式：3i, -2i, i, -i, 0, 0i
         * @param {string} str - 虚数字符串
         * @returns {number} 虚数的系数
         */
        _parseImaginary(str) {
            str = String(str).trim().toLowerCase();

            // 处理纯数字（实数）
            if (!str.includes('i')) {
                const num = parseFloat(str);
                if (isNaN(num)) {
                    throw new Error(lang("ImaginaryParseError"));
                }
                return num; // 实数，虚部为0
            }

            // 处理虚数
            if (str === 'i') {
                return 1;
            }

            if (str === '-i') {
                return -1;
            }

            // 移除末尾的i
            const coefficientStr = str.replace(/i$/i, '');

            // 如果移除i后为空字符串，系数为1
            if (coefficientStr === '' || coefficientStr === '-') {
                return coefficientStr === '-' ? -1 : 1;
            }

            const coefficient = parseFloat(coefficientStr);
            if (isNaN(coefficient)) {
                throw new Error(lang("ImaginaryParseError"));
            }

            return coefficient;
        }

        /**
         * 格式化虚数
         * @param {number} coefficient - 虚数系数
         * @returns {string} 格式化后的虚数字符串
         */
        _formatImaginary(coefficient) {
            if (coefficient === 0) {
                return "0";
            }

            if (coefficient === 1) {
                return "i";
            }

            if (coefficient === -1) {
                return "-i";
            }

            // 检查是否为整数
            if (Number.isInteger(coefficient)) {
                return coefficient + "i";
            }

            // 对于小数，使用小数表示
            return coefficient + "i";
        }

        /**
         * 格式化复数结果
         * @param {number} real - 实部
         * @param {number} imaginary - 虚部
         * @returns {string} 复数字符串表示
         */
        _formatComplex(real, imaginary) {
            if (imaginary === 0) {
                return real.toString();
            }

            if (real === 0) {
                return this._formatImaginary(imaginary);
            }

            // 实部和虚部都不为0
            const imaginaryStr = this._formatImaginary(imaginary);
            const sign = imaginary > 0 ? '+' : '';

            return real + sign + imaginaryStr;
        }

        /**
         * 计算虚数的整数次幂
         * @param {number} coefficient - 虚数系数
         * @param {number} exponent - 指数（整数）
         * @returns {object} 包含实部和虚部的对象
         */
        _imaginaryPower(coefficient, exponent) {
            if (!Number.isInteger(exponent)) {
                throw new Error("指数必须为整数");
            }

            // 处理特殊情况
            if (coefficient === 0) {
                return { real: 0, imaginary: 0 };
            }

            if (exponent === 0) {
                return { real: 1, imaginary: 0 };
            }

            if (exponent === 1) {
                return { real: 0, imaginary: coefficient };
            }

            // 利用i的周期性：i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1
            const cycle = exponent % 4;
            const absCoefficientPower = Math.pow(Math.abs(coefficient), exponent);
            const sign = coefficient < 0 && exponent % 2 === 1 ? -1 : 1;

            switch (cycle) {
                case 0:
                    return { real: sign * absCoefficientPower, imaginary: 0 };
                case 1:
                    return { real: 0, imaginary: sign * absCoefficientPower };
                case 2:
                    return { real: -sign * absCoefficientPower, imaginary: 0 };
                case 3:
                    return { real: 0, imaginary: -sign * absCoefficientPower };
                default:
                    return { real: 0, imaginary: 0 };
            }
        }

        /**
         * 计算虚数的平方根
         * @param {number} coefficient - 虚数系数
         * @returns {object} 包含实部和虚部的对象
         */
        _imaginarySqrt(coefficient) {
            if (coefficient >= 0) {
                // 正数的平方根是实数
                const sqrt = Math.sqrt(coefficient);
                return { real: sqrt, imaginary: 0 };
            } else {
                // 负数的平方根是纯虚数
                const sqrt = Math.sqrt(-coefficient);
                return { real: 0, imaginary: sqrt };
            }
        }

        /**
         * 计算虚数的n次方根
         * @param {number} coefficient - 虚数系数
         * @param {number} n - 根指数
         * @returns {object} 包含实部和虚部的对象
         */
        _imaginaryRoot(coefficient, n) {
            if (n <= 0 || !Number.isInteger(n)) {
                throw new Error(lang("ImaginaryRootIndexError"));
            }

            if (n === 1) {
                return { real: 0, imaginary: coefficient };
            }

            if (n === 2) {
                return this._imaginarySqrt(coefficient);
            }

            // 对于其他根指数，使用极坐标形式计算
            if (coefficient >= 0) {
                // 正数的n次方根
                const root = Math.pow(coefficient, 1 / n);

                // 如果n是偶数，结果可能是实数或复数
                if (n % 2 === 0) {
                    // 偶次根，正数有正负两个实根
                    return { real: root, imaginary: 0 };
                } else {
                    // 奇次根，正数只有一个实根
                    return { real: root, imaginary: 0 };
                }
            } else {
                // 负数的n次方根
                const absCoefficient = Math.abs(coefficient);
                const magnitude = Math.pow(absCoefficient, 1 / n);

                if (n % 2 === 0) {
                    // 负数的偶次根是复数
                    // 使用极坐标：r = |coefficient|^(1/n), θ = π/n
                    const angle = Math.PI / n;
                    const real = magnitude * Math.cos(angle);
                    const imaginary = magnitude * Math.sin(angle);
                    return { real, imaginary };
                } else {
                    // 负数的奇次根是实数
                    return { real: -magnitude, imaginary: 0 };
                }
            }
        }

        /**
         * 解析复数字符串
         * 支持格式：a+bi, a-bi, a, bi, -a+bi, -a-bi
         * @param {string} str - 复数字符串
         * @returns {object} 包含实部和虚部的对象
         */
        _parseComplex(str) {
            str = String(str).trim().replace(/\s+/g, '');

            // 特殊处理：纯实数
            if (!str.includes('i')) {
                const real = parseFloat(str);
                if (isNaN(real)) {
                    throw new Error(lang("ComplexParseError"));
                }
                return { real, imaginary: 0 };
            }

            // 特殊处理：纯虚数（使用已有的虚数解析函数）
            if (!str.includes('+') && !str.includes('-')) {
                const imaginary = this._parseImaginary(str);
                return { real: 0, imaginary };
            }

            // 处理带符号的复数
            // 匹配格式：a+bi 或 a-bi
            const regex = /^([+-]?\d*\.?\d*)([+-]\d*\.?\d*)i$/;
            const match = str.match(regex);

            if (!match) {
                // 尝试其他格式：+bi 或 -bi
                const altRegex = /^([+-]?\d*\.?\d*)i$/;
                const altMatch = str.match(altRegex);
                if (altMatch) {
                    const imaginary = this._parseImaginary(str);
                    return { real: 0, imaginary };
                }
                throw new Error(lang("ComplexParseError"));
            }

            const realStr = match[1];
            const imaginaryStr = match[2] + 'i'; // 加上i以便使用_parseImaginary

            const real = realStr === '' || realStr === '+' ? 0 : realStr === '-' ? 0 : parseFloat(realStr);
            const imaginary = this._parseImaginary(imaginaryStr);

            if (isNaN(real)) {
                throw new Error(lang("ComplexParseError"));
            }

            return { real, imaginary };
        }

        /**
         * 格式化复数
         * @param {number} real - 实部
         * @param {number} imaginary - 虚部
         * @returns {string} 格式化后的复数字符串
         */
        _formatComplex(real, imaginary) {
            // 处理特殊情况
            if (imaginary === 0) {
                return real.toString();
            }

            if (real === 0) {
                return this._formatImaginary(imaginary);
            }

            // 格式化实部
            const realStr = real.toString();

            // 格式化虚部
            let imaginaryStr;
            if (imaginary === 1) {
                imaginaryStr = '+i';
            } else if (imaginary === -1) {
                imaginaryStr = '-i';
            } else if (imaginary > 0) {
                imaginaryStr = `+${imaginary}i`;
            } else {
                imaginaryStr = `${imaginary}i`;
            }

            return realStr + imaginaryStr;
        }

        /**
         * 从方程中提取变量名（假设为单个字母）
         * @param {string} equation 原始方程
         * @returns {string|null} 变量名，如 'x'
         */
        _extractVariable(equation) {
            const match = equation.match(/[a-zA-Z]/);
            return match ? match[0] : null;
        }

        /**
         * 将方程标准化为 "表达式 = 0" 形式
         * @param {string} equation 原始方程，如 "2x+3=7"
         * @returns {object} { expr: "2x+3-7", variable: "x" }
         */
        _normalizeEquation(equation) {
            equation = equation.trim();
            let left, right, variable;
            if (equation.includes('=')) {
                [left, right] = equation.split('=');
                variable = this._extractVariable(left + right);
            } else {
                left = equation;
                right = "0";
                variable = this._extractVariable(left);
            }
            // 将右边移到左边： left - right
            const rightProcessed = this._simplifyRightSide(right);
            let expr = `${left}-${rightProcessed}`;
            // 预处理
            expr = this._preprocessEquation(expr);
            return { expr, variable };
        }

        /**
         * 计算复数的模
         * @param {number} real - 实部
         * @param {number} imaginary - 虚部
         * @returns {number} 模
         */
        _complexModulus(real, imaginary) {
            return this.SquareRoot({
                Number: this.Add({
                    Addend1: this.Multiply({
                        Multiplier1: real,
                        Multiplier2: real
                    }),
                    Addend2: this.Multiply({
                        Multiplier1: imaginary,
                        Multiplier2: imaginary
                    })
                })
            })
        }

        /**
         * 计算复数的幅角（主值）
         * @param {number} real - 实部
         * @param {number} imaginary - 虚部
         * @returns {number} 幅角（弧度）
         */
        _complexArgument(real, imaginary) {
            return this.Atan2({ x: imaginary, y: real });
        }

        /**
         * 计算复数的共轭
         * @param {number} real - 实部
         * @param {number} imaginary - 虚部
         * @returns {object} 共轭复数的实部和虚部
         */
        _complexConjugate(real, imaginary) {
            return { real, imaginary: -imaginary };
        }

        /**
         * 复数加法
         * @param {number} real1 - 第一个复数的实部
         * @param {number} imag1 - 第一个复数的虚部
         * @param {number} real2 - 第二个复数的实部
         * @param {number} imag2 - 第二个复数的虚部
         * @returns {object} 结果复数的实部和虚部
         */
        _complexAdd(real1, imag1, real2, imag2) {

            return {
                real: this.Add({
                    Addend1: real1,
                    Addend2: real2
                }),
                imaginary: this.Add({
                    Addend1: imag1,
                    Addend2: imag2
                }),
            };
        }

        /**
         * 复数减法
         * @param {number} real1 - 第一个复数的实部
         * @param {number} imag1 - 第一个复数的虚部
         * @param {number} real2 - 第二个复数的实部
         * @param {number} imag2 - 第二个复数的虚部
         * @returns {object} 结果复数的实部和虚部
         */
        _complexSubtract(real1, imag1, real2, imag2) {
            return {
                real: this.Subtract({
                    Minuend: real1,
                    Subtrahend: real2
                }),
                imaginary: this.Subtract({
                    Minuend: imag1,
                    Subtrahend: imag2
                }),
            };
        }

        /**
         * 复数乘法
         * @param {number} real1 - 第一个复数的实部
         * @param {number} imag1 - 第一个复数的虚部
         * @param {number} real2 - 第二个复数的实部
         * @param {number} imag2 - 第二个复数的虚部
         * @returns {object} 结果复数的实部和虚部
         */
        _complexMultiply(real1, imag1, real2, imag2) {
            return {
                real: this.Subtract({
                    Minuend: this.Multiply({
                        Multiplier1: real1,
                        Multiplier2: real2
                    }),
                    Subtrahend: this.Multiply({
                        Multiplier1: imag1,
                        Multiplier2: imag2
                    }),
                }),
                imaginary: this.Add({
                    Addend1: this.Multiply({
                        Multiplier1: real1,
                        Multiplier2: real2
                    }),
                    Addend2: this.Multiply({
                        Multiplier1: imag1,
                        Multiplier2: imag2
                    }),
                }),
            };

        }

        /**
         * 复数除法
         * @param {number} real1 - 第一个复数的实部
         * @param {number} imag1 - 第一个复数的虚部
         * @param {number} real2 - 第二个复数的实部
         * @param {number} imag2 - 第二个复数的虚部
         * @returns {object} 结果复数的实部和虚部
         */
        _complexDivide(real1, imag1, real2, imag2) {
            const denominator = real2 * real2 + imag2 * imag2;
            this.Add({
                Addend1: this.Multiply({
                    Multiplier1: real2,
                    Multiplier2: real2
                }),
                Addend2: this.Multiply({
                    Multiplier1: imag2,
                    Multiplier2: imag2
                })
            })

            if (denominator === 0) {
                this._handleError(lang("ComplexDivideByZeroError"));
            }



            return {
                real: this.Divide({
                    Dividend: this.Add({
                        Addend1: this.Multiply({
                            Multiplier1: real1,
                            Multiplier2: real2
                        }),
                        Addend2: this.Multiply({
                            Multiplier1: imag1,
                            Multiplier2: imag2
                        }),
                    }),
                    Divisor: denominator
                }),
                imaginary: this.Divide({
                    Dividend: this.Subtract({
                        Minuend: this.Multiply({
                            Multiplier1: imag1,
                            Multiplier2: real2
                        }),
                        Subtrahend: this.Multiply({
                            Multiplier1: imag1,
                            Multiplier2: imag2
                        }),
                    }),
                    Divisor: denominator
                })
            };
        }

        /**
         * 复数取余（高斯整数取余）
         * @param {number} real1 - 第一个复数的实部
         * @param {number} imag1 - 第一个复数的虚部
         * @param {number} real2 - 第二个复数的实部
         * @param {number} imag2 - 第二个复数的虚部
         * @returns {object} 余数复数的实部和虚部
         */
        _complexMod(real1, imag1, real2, imag2) {
            // 计算复数除法
            const quotient = this._complexDivide(real1, imag1, real2, imag2);

            // 将商四舍五入到最近的整数（实部和虚部分别）
            const roundedReal = this.RoundDecimalToInt(quotient.real);
            const roundedImag = this.RoundDecimalToInt(quotient.imaginary);

            // 计算余数：被除数 - 除数 × 整数商
            const product = this._complexMultiply(real2, imag2, roundedReal, roundedImag);
            const remainder = this._complexSubtract(real1, imag1, product.real, product.imaginary);

            return remainder;
        }

        /**
         * 复数求商（高斯整数商）
         * @param {number} real1 - 第一个复数的实部
         * @param {number} imag1 - 第一个复数的虚部
         * @param {number} real2 - 第二个复数的实部
         * @param {number} imag2 - 第二个复数的虚部
         * @returns {object} 商复数的实部和虚部
         */
        _complexQuo(real1, imag1, real2, imag2) {
            // 计算复数除法
            const quotient = this._complexDivide(real1, imag1, real2, imag2);
            // 将商四舍五入到最近的整数（实部和虚部分别）
            return {
                real: this.RoundDecimalToInt(quotient.real),
                imaginary: this.RoundDecimalToInt(quotient.imaginary)
            };
        }

        /**
         * _isPrime
         * 判断一个正整数是否为质数（基于试除法）
         * @param {number} num - 待检测的数字
         * @returns {boolean} 是否为质数
         */
        _isPrime(num) {
            if (num < 2) return false;
            if (num === 2) return true;
            if (num % 2 === 0) return false;

            const limit = Math.sqrt(num);
            for (let i = 3; i <= limit; i += 2) {
                if (num % i === 0) return false;
            }
            return true;
        }

        /**
         * 复数幂运算（整数次幂）
         * @param {number} real - 实部
         * @param {number} imag - 虚部
         * @param {number} exponent - 指数（整数）
         * @returns {object} 结果复数的实部和虚部
         */
        _complexPower(real, imag, exponent) {
            const expNum = Number(exponent);
            if (!Number.isInteger(expNum)) {
                throw new Error("Exp must be integer");
            }

            const realStr = String(real);
            const imagStr = String(imag);

            if (expNum === 0) {
                return { real: "1", imaginary: "0" };
            }
            if (expNum === 1) {
                return { real: realStr, imaginary: imagStr };
            }

            // 快速幂算法（高精度）
            let resultReal = "1";
            let resultImag = "0";
            let baseReal = realStr;
            let baseImag = imagStr;
            let exp = this.Absolute({ Number: expNum });

            while (exp > 0) {
                if (exp % 2 === 1) {
                    // 结果 = 结果 × 基数
                    // (a+bi)*(c+di) = (ac-bd) + (ad+bc)i
                    const ac = this.Multiply({ Multiplier1: resultReal, Multiplier2: baseReal });
                    const bd = this.Multiply({ Multiplier1: resultImag, Multiplier2: baseImag });
                    const ad = this.Multiply({ Multiplier1: resultReal, Multiplier2: baseImag });
                    const bc = this.Multiply({ Multiplier1: resultImag, Multiplier2: baseReal });

                    const newReal = this.Subtract({ Minuend: ac, Subtrahend: bd });
                    const newImag = this.Add({ Addend1: ad, Addend2: bc });

                    resultReal = newReal;
                    resultImag = newImag;
                }

                // 基数 = 基数 × 基数
                const a2 = this.Multiply({ Multiplier1: baseReal, Multiplier2: baseReal });
                const b2 = this.Multiply({ Multiplier1: baseImag, Multiplier2: baseImag });
                const ab2 = this.Multiply({ Multiplier1: "2", Multiplier2: this.Multiply({ Multiplier1: baseReal, Multiplier2: baseImag }) });

                const newBaseReal = this.Subtract({ Minuend: a2, Subtrahend: b2 });
                const newBaseImag = ab2;

                baseReal = newBaseReal;
                baseImag = newBaseImag;

                exp = this._floorNumber(this.Divide({
                    Dividend: exp,
                    Divisor: 2
                })
                );
            }

            // 处理负指数
            if (expNum < 0) {
                // 分母 = real² + imag²
                const r2 = this.Multiply({ Multiplier1: resultReal, Multiplier2: resultReal });
                const i2 = this.Multiply({ Multiplier1: resultImag, Multiplier2: resultImag });
                const denominator = this.Add({ Addend1: r2, Addend2: i2 });

                // real' = real / denominator
                const newReal = this.Divide({ Dividend: resultReal, Divisor: denominator });
                // imag' = -imag / denominator
                const negImag = this.Multiply({ Multiplier1: resultImag, Multiplier2: "-1" });
                const newImag = this.Divide({ Dividend: negImag, Divisor: denominator });

                return { real: newReal, imaginary: newImag };
            }

            return { real: resultReal, imaginary: resultImag };
        }

        /**
         * 复数平方根
         * @param {number} real - 实部
         * @param {number} imag - 虚部
         * @returns {object} 结果复数的实部和虚部
         */
        _complexSqrt(real, imag) {
            const modulus = this._complexModulus(real, imag);
            const angleDeg = this._complexArgument(real, imag);

            const angleRad = this.Convert({ Value: angleDeg, Menu: "radians" });
            const halfAngle = this.Divide({ Dividend: angleRad, Divisor: "2" });


            const cosHalf = this.TrigRadFunction({ menu: "cos", Radians: halfAngle });
            const sinHalf = this.TrigRadFunction({ menu: "sin", Radians: halfAngle });

            const sqrtModulus = this.Root({ RootIndex: "2", Radicand: modulus });
            const realPart = this.Multiply({ Multiplier1: sqrtModulus, Multiplier2: cosHalf });

            const imagPart = this.Multiply({ Multiplier1: sqrtModulus, Multiplier2: sinHalf });
            return { real: realPart, imaginary: imagPart };
        }

        /**
         * 复数n次方根
         * @param {number} real - 实部
         * @param {number} imag - 虚部
         * @param {number} n - 根指数
         * @returns {object} 结果复数的实部和虚部（主值）
         */
        _complexRoot(real, imag, n) {
            const nStr = String(n);
            const nNum = parseFloat(nStr);
            if (nNum <= 0 || !Number.isInteger(nNum)) {
                this._handleError(lang("ComplexRootIndexError"));
            }

            if (nNum === 1) {
                return { real: String(real), imaginary: String(imag) };
            }

            if (nNum === 2) {
                return this._complexSqrt(real, imag);
            }

            const modulus = this._complexModulus(real, imag);
            const angleDeg = this._complexArgument(real, imag);

            const rootModulus = this.Root({
                RootIndex: nStr,
                Radicand: modulus
            });

            const rootAngleDeg = this.Divide({
                Dividend: angleDeg,
                Divisor: nStr
            });

            const rootAngleRad = this.Convert({
                Value: rootAngleDeg,
                Menu: "radians"
            });

            const cosVal = this.TrigRadFunction({
                menu: "cos",
                Radians: rootAngleRad
            });
            const sinVal = this.TrigRadFunction({
                menu: "sin",
                Radians: rootAngleRad
            });

            const realPart = this.Multiply({
                Multiplier1: rootModulus,
                Multiplier2: cosVal
            });
            const imagPart = this.Multiply({
                Multiplier1: rootModulus,
                Multiplier2: sinVal
            });

            return { real: realPart, imaginary: imagPart };
        }

        _parseVector(vectorStr) {
            vectorStr = String(vectorStr).trim().replace(/\s+/g, '');

            // 检查格式
            if (!vectorStr.startsWith('(') || !vectorStr.endsWith(')')) {
                throw new Error(lang("ParseVectorError"));
            }

            // 去掉括号，按逗号分割
            const content = vectorStr.slice(1, -1);
            const parts = content.split(',');

            // 验证分量数量
            if (parts.length < 2 || parts.length > 3) {
                throw new Error(lang("ParseVectorError"));
            }

            // 验证每个部分是否为有效数字字符串（但不转换为数字）
            const isValidNumber = (str) => {
                // 允许整数、小数、科学计数法
                return /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(str.trim());
            };

            parts.forEach(part => {
                if (!isValidNumber(part)) {
                    throw new Error(lang("ParseVectorError"));
                }
            });

            return {
                x: parts[0].trim(),  // 保持字符串
                y: parts[1].trim(),  // 保持字符串
                z: parts.length === 3 ? parts[2].trim() : "0",  // 保持字符串
                is3D: parts.length === 3
            };
        }

        /**
         * 格式化向量为字符串
         */
        _formatVector(x, y, z = null) {
            if (z !== null && z !== 0) {
                return `(${x},${y},${z})`;
            }
            return `(${x},${y})`;
        }

        /**
         * 预处理表达式
         * 统一运算符格式，去除空格
         */
        _preprocessEquation(expr) {
            if (!expr || expr.trim() === '') {
                return '';
            }

            // 去除所有空格
            let result = expr.replace(/\s+/g, '');

            // 统一运算符
            result = result.replace(/×/g, '*').replace(/÷/g, '/');

            // 处理隐式乘法：数字后跟字母或括号
            result = result.replace(/(\d)([a-zA-Z(])/g, '$1*$2');
            result = result.replace(/([a-zA-Z)])(\d|[a-zA-Z(])/g, '$1*$2');

            // 处理乘方符号
            result = result.replace(/\^/g, '**');

            return result;
        }

        /**
         * 解析表达式为项
         * 返回项的数组，每项包含系数、变量、指数
         */
        _parseTerms(expr) {
            const terms = [];
            const processedExpr = this._preprocessEquation(expr);

            // 简单的项解析（只处理加减）
            let currentTerm = '';
            let sign = '+';

            for (let i = 0; i < processedExpr.length; i++) {
                const char = processedExpr[i];

                if ((char === '+' || char === '-') && currentTerm !== '') {
                    // 完成一个项
                    terms.push(this._parseSingleTerm(sign + currentTerm));
                    sign = char;
                    currentTerm = '';
                } else if (char !== '+' && char !== '-') {
                    currentTerm += char;
                }
            }

            // 添加最后一个项
            if (currentTerm !== '') {
                terms.push(this._parseSingleTerm(sign + currentTerm));
            }

            return terms;
        }

        /**
         * 解析单个项
         */
        _parseSingleTerm(termStr) {
            // 默认值
            let term = {
                coefficient: '1',
                variable: '',
                exponent: '1',
                isConstant: false
            };

            // 如果项是空字符串
            if (!termStr) {
                return term;
            }

            // 提取符号
            let sign = 1;
            let cleanTerm = termStr;
            if (termStr[0] === '-') {
                sign = -1;
                cleanTerm = termStr.substring(1);
            } else if (termStr[0] === '+') {
                cleanTerm = termStr.substring(1);
            }

            // 检查是否是纯数字（常数项）
            if (/^-?\d*\.?\d+$/.test(cleanTerm)) {
                term.coefficient = (parseFloat(cleanTerm) * sign).toString();
                term.isConstant = true;
                return term;
            }

            // 查找变量部分（字母）
            const variableMatch = cleanTerm.match(/[a-zA-Z]/);
            if (!variableMatch) {
                // 没有变量，仍然是常数
                term.coefficient = (parseFloat(cleanTerm) * sign).toString();
                term.isConstant = true;
                return term;
            }

            // 找到变量位置
            const varIndex = variableMatch.index;
            const variable = cleanTerm[varIndex];

            // 提取系数部分（变量前的数字）
            let coefficientPart = cleanTerm.substring(0, varIndex);
            if (coefficientPart === '' || coefficientPart === '-') {
                coefficientPart = '1';
            }

            // 提取变量后的部分（指数）
            let remaining = cleanTerm.substring(varIndex + 1);
            let exponent = '1';

            if (remaining.startsWith('**') || remaining.startsWith('^')) {
                // 处理指数
                const expMatch = remaining.match(/\*\*(\d+)|^\^(\d+)/);
                if (expMatch) {
                    exponent = expMatch[1] || expMatch[2];
                }
            } else if (remaining.includes('*')) {
                // 处理多个变量相乘（如 a*b）
                // 简化为一个变量，用特殊标记
                term.variable = cleanTerm.substring(varIndex);
                term.coefficient = (parseFloat(coefficientPart) * sign).toString();
                return term;
            }

            term.coefficient = (parseFloat(coefficientPart) * sign).toString();
            term.variable = variable;
            term.exponent = exponent;

            return term;
        }

        /**
         * 合并同类项
         */
        _combineLikeTerms(terms) {
            const termMap = new Map();

            for (const term of terms) {
                if (term.isConstant) {
                    // 常数项
                    const key = 'constant';
                    const current = termMap.get(key) || { coefficient: '0', variable: '', exponent: '0', isConstant: true };
                    const newCoefficient = this.Add({
                        Addend1: current.coefficient,
                        Addend2: term.coefficient
                    });
                    termMap.set(key, { ...current, coefficient: newCoefficient });
                } else {
                    // 变量项
                    const key = `${term.variable}^${term.exponent}`;
                    const current = termMap.get(key) || {
                        coefficient: '0',
                        variable: term.variable,
                        exponent: term.exponent,
                        isConstant: false
                    };
                    const newCoefficient = this.Add({
                        Addend1: current.coefficient,
                        Addend2: term.coefficient
                    });
                    termMap.set(key, { ...current, coefficient: newCoefficient });
                }
            }

            return Array.from(termMap.values());
        }

        /**
         * 格式化项为字符串
         */
        _formatTerm(term) {
            if (term.isConstant) {
                return term.coefficient;
            }

            const coeff = parseFloat(term.coefficient);
            const exponent = parseFloat(term.exponent);

            // 系数为0，不显示
            if (coeff === 0) {
                return '';
            }

            // 系数为1或-1的特殊处理
            let coeffStr = '';
            if (coeff === 1) {
                coeffStr = '';
            } else if (coeff === -1) {
                coeffStr = '-';
            } else {
                coeffStr = coeff.toString();
            }

            // 变量部分
            let varStr = term.variable;
            if (exponent !== 1) {
                varStr += `^${exponent}`;
            }

            return coeffStr + varStr;
        }

        /**
         * 格式化所有项
         */
        _formatAllTerms(terms) {
            const formattedTerms = [];

            for (const term of terms) {
                const formatted = this._formatTerm(term);
                if (formatted !== '' && formatted !== '0') {
                    formattedTerms.push(formatted);
                }
            }

            // 排序：变量项在前，常数项在后
            formattedTerms.sort((a, b) => {
                const aHasVar = /[a-zA-Z]/.test(a);
                const bHasVar = /[a-zA-Z]/.test(b);

                if (aHasVar && !bHasVar) return -1;
                if (!aHasVar && bHasVar) return 1;
                return 0;
            });

            // 构建表达式
            let result = '';
            for (let i = 0; i < formattedTerms.length; i++) {
                const term = formattedTerms[i];

                if (i === 0) {
                    result = term;
                } else {
                    if (term[0] === '-') {
                        result += term; // 负项直接加
                    } else {
                        result += '+' + term; // 正项加加号
                    }
                }
            }

            // 如果没有项，返回0
            if (result === '') {
                return '0';
            }

            // 简化结果
            return this._finalSimplify(result);
        }

        /**
         * 最终简化
         */
        _finalSimplify(expr) {
            let result = expr;

            // 简化乘方：a**2 -> a^2
            result = result.replace(/\*\*/g, '^');

            // 简化系数1：1*a -> a, -1*a -> -a
            result = result.replace(/(^|[+-])1([a-zA-Z])/g, '$1$2');

            // 简化指数1：a^1 -> a
            result = result.replace(/([a-zA-Z])\^1(\D|$)/g, '$1$2');

            // 简化乘法符号：a*b -> ab
            result = result.replace(/([a-zA-Z0-9)])\*([a-zA-Z(])/g, '$1$2');

            // 简化除法：1/a -> 1÷a
            result = result.replace(/1\/([a-zA-Z])/g, '1÷$1');

            // 去除多余的加号
            result = result.replace(/^\+/, '');

            return result;
        }

        /**
         * 简化表达式的主要函数
         */
        _simplifyExpression(expr) {
            try {
                // 1. 预处理
                const processed = this._preprocessEquation(expr);

                // 2. 解析为项
                const terms = this._parseTerms(processed);

                // 3. 合并同类项
                const combinedTerms = this._combineLikeTerms(terms);

                // 4. 格式化为字符串
                const result = this._formatAllTerms(combinedTerms);

                return result;
            } catch (error) {
                console.error(lang("SimplifyExpressionError").replace("{error}", error));
                return this._handleError("EquationSimplifyError");
            }
        }

        /**
         * 安全计算纯算术表达式（仅支持 + - * / ^ 和括号，不允许任何字母）
         * @param {string} expr 表达式字符串，已替换变量为数字，且已预处理
         * @returns {string} 计算结果（高精度字符串）
         */
        _evaluateSimpleExpression(expr) {
            // 移除所有空格
            expr = expr.replace(/\s/g, '');
            // 允许的字符：数字、小数点、运算符+-*/^、括号
            if (!/^[0-9+\-*/^().]+$/.test(expr)) {
                throw new Error(lang("EquationValueError"));
            }
            // 将 ^ 替换为 ** 以便 JavaScript 求值
            expr = expr.replace(/\^/g, '**');
            // 使用 Function 进行安全求值（已做字符过滤）
            let result;
            try {
                result = Function('"use strict"; return (' + expr + ')')();
            } catch (e) {
                throw new Error(lang("EquationValueError"));
            }
            // 将浮点数结果转换为高精度字符串（避免科学计数法）
            if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
                return result.toString();
            }
            // 使用高精度格式化
            return this._roundToPrecision(result.toString(), this.decimal);
        }

        _simplifyRightSide(right) {
            const trimmed = right.trim();
            // 如果右侧是简单的数字或表达式，不添加额外的括号
            const simplePattern = /^[-+]?\d*\.?\d*(?:[a-zA-Z]?)$/;
            if (simplePattern.test(trimmed)) {
                return trimmed;
            } else if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
                return trimmed;
            } else {
                return `(${trimmed})`;
            }
        }

        /**
         * 解整式方程（多项式），支持一次和二次
         * @param {string} expr 标准化后的多项式表达式（例如 "2*x+3-7"）
         * @param {string} variable 变量名
         * @returns {string} 解或错误信息
         */
        _solvePolynomialEquation(expr, variable) {
            // 解析项
            const terms = this._parseTerms(expr);
            const combined = this._combineLikeTerms(terms);

            let a = 0, b = 0, c = 0;
            for (const term of combined) {
                const coeff = parseFloat(term.coefficient);
                if (isNaN(coeff)) continue;
                if (term.isConstant) {
                    c += coeff;
                } else if (term.variable === variable) {
                    const exp = parseFloat(term.exponent);
                    if (exp === 1) {
                        b += coeff;
                    } else if (exp === 2) {
                        a += coeff;
                    } else {
                        return this._handleError("EquationUnsupported");
                    }
                } else {
                    // 其他变量（如 y）视为常数？不，暂不支持多变量
                    return this._handleError("EquationUnsupported");
                }
            }

            // 解方程
            if (a === 0 && b === 0) {
                return c === 0 ? "无穷多解" : "无解";
            } else if (a === 0) {
                // 一元一次方程 b*x + c = 0 => x = -c/b
                const bStr = b.toString();
                const cStr = (-c).toString();
                if (b === 0) return "无解";
                const x = this.Divide({ Dividend: cStr, Divisor: bStr });
                return `${variable} = ${x}`;
            } else {
                // 一元二次方程 a*x^2 + b*x + c = 0
                const delta = this.Multiply({ Multiplier1: b.toString(), Multiplier2: b.toString() });
                const ac = this.Multiply({ Multiplier1: a.toString(), Multiplier2: c.toString() });
                const fourAc = this.Multiply({ Multiplier1: "4", Multiplier2: ac });
                let deltaVal = this.Subtract({ Minuend: delta, Subtrahend: fourAc });
                const deltaNum = parseFloat(deltaVal);
                if (deltaNum < 0) return "无实数根";
                if (deltaNum === 0) {
                    const numerator = this.Multiply({ Multiplier1: "-1", Multiplier2: b.toString() });
                    const denominator = this.Multiply({ Multiplier1: "2", Multiplier2: a.toString() });
                    const x = this.Divide({ Dividend: numerator, Divisor: denominator });
                    return `${variable} = ${x}`;
                } else {
                    const sqrtDelta = this.Root({ RootIndex: "2", Radicand: deltaVal });
                    const denominator = this.Multiply({ Multiplier1: "2", Multiplier2: a.toString() });
                    const numerator1 = this.Subtract({ Minuend: this.Multiply({ Multiplier1: "-1", Multiplier2: b.toString() }), Subtrahend: sqrtDelta });
                    const numerator2 = this.Add({ Addend1: this.Multiply({ Multiplier1: "-1", Multiplier2: b.toString() }), Addend2: sqrtDelta });
                    const x1 = this.Divide({ Dividend: numerator1, Divisor: denominator });
                    const x2 = this.Divide({ Dividend: numerator2, Divisor: denominator });
                    return `${variable}₁ = ${x1}, ${variable}₂ = ${x2}`;
                }
            }
        }

        // ===== 转发方法（委托给专门类）=====
        SetDecimal(args) {
            return this.number.SetDecimal(args);
        }
        ChangeError(args) {
            return this.number.ChangeError(args);
        }
        ChangeSupportBoolean(args) {
            return this.number.ChangeSupportBoolean(args);
        }
        SetMaxLoopLimit(args) {
            return this.number.SetMaxLoopLimit(args);
        }
        Add(args) {
            return this.number.Add(args);
        }
        Subtract(args) {
            return this.number.Subtract(args);
        }
        Multiply(args) {
            return this.number.Multiply(args);
        }
        Divide(args) {
            return this.number.Divide(args);
        }
        Mod(args) {
            return this.number.Mod(args);
        }
        Quo(args) {
            return this.number.Quo(args);
        }
        DivideDigit(args) {
            return this.number.DivideDigit(args);
        }
        DivideDiv(args) {
            return this.number.DivideDiv(args);
        }
        Power(args) {
            return this.number.Power(args);
        }
        Root(args) {
            return this.number.Root(args);
        }
        Log(args) {
            return this.number.Log(args);
        }
        Factorial(args) {
            return this.number.Factorial(args);
        }
        calculateExpression(args) {
            return this.number.calculateExpression(args);
        }
        Negative(args) {
            return this.number.Negative(args);
        }
        Absolute(args) {
            return this.number.Absolute(args);
        }
        NegativeAbsolute(args) {
            return this.number.NegativeAbsolute(args);
        }
        Percent(args) {
            return this.number.Percent(args);
        }
        PercentOf(args) {
            return this.number.PercentOf(args);
        }
        Square(args) {
            return this.number.Square(args);
        }
        Cube(args) {
            return this.number.Cube(args);
        }
        SquareRoot(args) {
            return this.number.SquareRoot(args);
        }
        CubeRoot(args) {
            return this.number.CubeRoot(args);
        }
        Powers(args) {
            return this.number.Powers(args);
        }
        Logs(args) {
            return this.number.Logs(args);
        }
        LimitInRange(args) {
            return this.number.LimitInRange(args);
        }
        CycleInRange(args) {
            return this.number.CycleInRange(args);
        }
        MapRange(args) {
            return this.number.MapRange(args);
        }
        LinearMap(args) {
            return this.number.LinearMap(args);
        }
        RoundDecimal(args) {
            return this.number.RoundDecimal(args);
        }
        RoundDecimalToInt(args) {
            return this.number.RoundDecimalToInt(args);
        }
        SimplifyDecimal(args) {
            return this.number.SimplifyDecimal(args);
        }
        Convert(args) {
            return this.number.Convert(args);
        }
        Hypotenuse(args) {
            return this.number.Hypotenuse(args);
        }
        CardinalMultiply(args) {
            return this.number.CardinalMultiply(args);
        }
        TriangularAdd(args) {
            return this.number.TriangularAdd(args);
        }
        KnuthArrow(args) {
            return this.number.KnuthArrow(args);
        }
        Reciprocal(args) {
            return this.number.Reciprocal(args);
        }
        PositiveNumber(args) {
            return this.number.PositiveNumber(args);
        }
        DivideByTwo(args) {
            return this.number.DivideByTwo(args);
        }
        StringToNumber(args) {
            return this.number.StringToNumber(args);
        }
        NumberToTypeString(args) {
            return this.number.NumberToTypeString(args);
        }
        TypeStringToNumber(args) {
            return this.number.TypeStringToNumber(args);
        }
        GetNumberPart(args) {
            return this.number.GetNumberPart(args);
        }
        TrigFunction(args) {
            return this.trig.TrigFunction(args);
        }
        ArctrigFunction(args) {
            return this.trig.ArctrigFunction(args);
        }
        Atan2(args) {
            return this.trig.Atan2(args);
        }
        TrigRadFunction(args) {
            return this.trig.TrigRadFunction(args);
        }
        ArctrigRadFunction(args) {
            return this.trig.ArctrigRadFunction(args);
        }
        HyperbolicFunction(args) {
            return this.trig.HyperbolicFunction(args);
        }
        AhyperbolicFunction(args) {
            return this.trig.AhyperbolicFunction(args);
        }
        RepeatingDecimal(args) {
            return this.repeatingDecimal.RepeatingDecimal(args);
        }
        ExtractCycle(args) {
            return this.repeatingDecimal.ExtractCycle(args);
        }
        RepeatingDecimalAdd(args) {
            return this.repeatingDecimal.RepeatingDecimalAdd(args);
        }
        RepeatingDecimalSubtract(args) {
            return this.repeatingDecimal.RepeatingDecimalSubtract(args);
        }
        RepeatingDecimalMultiply(args) {
            return this.repeatingDecimal.RepeatingDecimalMultiply(args);
        }
        RepeatingDecimalDivide(args) {
            return this.repeatingDecimal.RepeatingDecimalDivide(args);
        }
        RepeatingDecimalToFraction(args) {
            return this.repeatingDecimal.RepeatingDecimalToFraction(args);
        }
        FractionToRepeatingDecimal(args) {
            return this.repeatingDecimal.FractionToRepeatingDecimal(args);
        }
        RepeatingDecimalToFixed(args) {
            return this.repeatingDecimal.RepeatingDecimalToFixed(args);
        }
        SimplifyFraction(args) {
            return this.fraction.SimplifyFraction(args);
        }
        MultiplySameFraction(args) {
            return this.fraction.MultiplySameFraction(args);
        }
        ToMixedNumber(args) {
            return this.fraction.ToMixedNumber(args);
        }
        ToImproperFraction(args) {
            return this.fraction.ToImproperFraction(args);
        }
        AddFraction(args) {
            return this.fraction.AddFraction(args);
        }
        SubtractFraction(args) {
            return this.fraction.SubtractFraction(args);
        }
        MultiplyFraction(args) {
            return this.fraction.MultiplyFraction(args);
        }
        DivideFraction(args) {
            return this.fraction.DivideFraction(args);
        }
        FractionPart(args) {
            return this.fraction.FractionPart(args);
        }
        CreateFraction(args) {
            return this.fraction.CreateFraction(args);
        }
        BigAdd(args) {
            return this.bigNumber.BigAdd(args);
        }
        BigSubtract(args) {
            return this.bigNumber.BigSubtract(args);
        }
        BigMultiply(args) {
            return this.bigNumber.BigMultiply(args);
        }
        BigDivide(args) {
            return this.bigNumber.BigDivide(args);
        }
        BigMod(args) {
            return this.bigNumber.BigMod(args);
        }
        BigQuotient(args) {
            return this.bigNumber.BigQuotient(args);
        }
        BigAbsolute(args) {
            return this.bigNumber.BigAbsolute(args);
        }
        BigNegative(args) {
            return this.bigNumber.BigNegative(args);
        }
        BigPow(args) {
            return this.bigNumber.BigPow(args);
        }
        BigPowMod(args) {
            return this.bigNumber.BigPowMod(args);
        }
        BigRoot(args) {
            return this.bigNumber.BigRoot(args);
        }
        CreateImaginary(args) {
            return this.imaginary.CreateImaginary(args);
        }
        GetImaginaryPart(args) {
            return this.imaginary.GetImaginaryPart(args);
        }
        ImaginaryAdd(args) {
            return this.imaginary.ImaginaryAdd(args);
        }
        ImaginarySubtract(args) {
            return this.imaginary.ImaginarySubtract(args);
        }
        ImaginaryMultiply(args) {
            return this.imaginary.ImaginaryMultiply(args);
        }
        ImaginaryDivide(args) {
            return this.imaginary.ImaginaryDivide(args);
        }
        ImaginaryMod(args) {
            return this.imaginary.ImaginaryMod(args);
        }
        ImaginaryQuo(args) {
            return this.imaginary.ImaginaryQuo(args);
        }
        ImaginaryPower(args) {
            return this.imaginary.ImaginaryPower(args);
        }
        ImaginaryRoot(args) {
            return this.imaginary.ImaginaryRoot(args);
        }
        CreateComplex(args) {
            return this.complex.CreateComplex(args);
        }
        GetComplexPart(args) {
            return this.complex.GetComplexPart(args);
        }
        ComplexAdd(args) {
            return this.complex.ComplexAdd(args);
        }
        ComplexSubtract(args) {
            return this.complex.ComplexSubtract(args);
        }
        ComplexMultiply(args) {
            return this.complex.ComplexMultiply(args);
        }
        ComplexDivide(args) {
            return this.complex.ComplexDivide(args);
        }
        ComplexMod(args) {
            return this.complex.ComplexMod(args);
        }
        ComplexQuo(args) {
            return this.complex.ComplexQuo(args);
        }
        ComplexDivMod(args) {
            return this.complex.ComplexDivMod(args);
        }
        ComplexAbsolute(args) {
            return this.complex.ComplexAbsolute(args);
        }
        ComplexNegative(args) {
            return this.complex.ComplexNegative(args);
        }
        ComplexRound(args) {
            return this.complex.ComplexRound(args);
        }
        ComplexPower(args) {
            return this.complex.ComplexPower(args);
        }
        ComplexRoot(args) {
            return this.complex.ComplexRoot(args);
        }
        ComplexSqrt(args) {
            return this.complex.ComplexSqrt(args);
        }
        ComplexConjugate(args) {
            return this.complex.ComplexConjugate(args);
        }
        ComplexArg(args) {
            return this.complex.ComplexArg(args);
        }
        GetComplexPartFromString(args) {
            return this.complex.GetComplexPartFromString(args);
        }
        Gcd(args) {
            return this.numberTheory.Gcd(args);
        }
        Lcm(args) {
            return this.numberTheory.Lcm(args);
        }
        MaxFactor(args) {
            return this.numberTheory.MaxFactor(args);
        }
        MinMultiple(args) {
            return this.numberTheory.MinMultiple(args);
        }
        GetFactors(args) {
            return this.numberTheory.GetFactors(args);
        }
        GetNthMultiple(args) {
            return this.numberTheory.GetNthMultiple(args);
        }
        CommonFactors(args) {
            return this.numberTheory.CommonFactors(args);
        }
        GetSum(args) {
            return this.numberTheory.GetSum(args);
        }

        GetPrime(args) {
            return this.numberTheory.GetPrime(args);
        }
        GetNumberLength(args) {
            return this.numberTheory.GetNumberLength(args);
        }
        GetNumberIndex(args) {
            return this.numberTheory.GetNumberIndex(args);
        }
        Constant(args) {
            return this.numberTheory.Constant(args);
        }
        ConstantDigits(args) {
            return this.numberTheory.ConstantDigits(args);
        }
        MakeRange(args) {
            return this.numberTheory.MakeRange(args);
        }
        CountInRange(args) {
            return this.numberTheory.CountInRange(args);
        }
        NthInRange(args) {
            return this.numberTheory.NthInRange(args);
        }
        CountCongruent(args) {
            return this.numberTheory.CountCongruent(args);
        }
        NthCongruent(args) {
            return this.numberTheory.NthCongruent(args);
        }
        Combination(args) {
            return this.combinatorics.Combination(args);
        }
        Permutation(args) {
            return this.combinatorics.Permutation(args);
        }
        RepetitionPermutation(args) {
            return this.combinatorics.RepetitionPermutation(args);
        }
        CircularPermutation(args) {
            return this.combinatorics.CircularPermutation(args);
        }
        MultisetPermutation(args) {
            return this.combinatorics.MultisetPermutation(args);
        }
        ProportionToFraction(args) {
            return this.proportion.ProportionToFraction(args);
        }
        FractionToProportion(args) {
            return this.proportion.FractionToProportion(args);
        }
        ProportionPart(args) {
            return this.proportion.ProportionPart(args);
        }
        SimplifyProportion(args) {
            return this.proportion.SimplifyProportion(args);
        }
        MultiplySameProportion(args) {
            return this.proportion.MultiplySameProportion(args);
        }
        AddProportion(args) {
            return this.proportion.AddProportion(args);
        }
        SubtractProportion(args) {
            return this.proportion.SubtractProportion(args);
        }
        MultiplyProportion(args) {
            return this.proportion.MultiplyProportion(args);
        }
        DivideProportion(args) {
            return this.proportion.DivideProportion(args);
        }
        Vector2D(args) {
            return this.vector.Vector2D(args);
        }
        Vector3D(args) {
            return this.vector.Vector3D(args);
        }
        Vector2DAdd(args) {
            return this.vector.Vector2DAdd(args);
        }
        Vector3DAdd(args) {
            return this.vector.Vector3DAdd(args);
        }
        Vector2DSubtract(args) {
            return this.vector.Vector2DSubtract(args);
        }
        Vector3DSubtract(args) {
            return this.vector.Vector3DSubtract(args);
        }
        VectorMagnitude(args) {
            return this.vector.VectorMagnitude(args);
        }
        VectorScalarMultiply(args) {
            return this.vector.VectorScalarMultiply(args);
        }
        GetVectorPart(args) {
            return this.vector.GetVectorPart(args);
        }
        VectorCrossMultiply(args) {
            return this.vector.VectorCrossMultiply(args);
        }
        VectorDotProduct(args) {
            return this.vector.VectorDotProduct(args);
        }
        VectorScalarDivide(args) {
            return this.vector.VectorScalarDivide(args);
        }
        CreateMatrix2x2(args) {
            return this.matrix.CreateMatrix2x2(args);
        }
        CreateMatrix3x3(args) {
            return this.matrix.CreateMatrix3x3(args);
        }
        MatrixAdd(args) {
            return this.matrix.MatrixAdd(args);
        }
        MatrixSubtract(args) {
            return this.matrix.MatrixSubtract(args);
        }
        MatrixMultiply(args) {
            return this.matrix.MatrixMultiply(args);
        }
        MatrixScalarMultiply(args) {
            return this.matrix.MatrixScalarMultiply(args);
        }
        MatrixTranspose(args) {
            return this.matrix.MatrixTranspose(args);
        }
        MatrixDeterminant(args) {
            return this.matrix.MatrixDeterminant(args);
        }
        MatrixTrace(args) {
            return this.matrix.MatrixTrace(args);
        }
        MatrixInvertible(args) {
            return this.matrix.MatrixInvertible(args);
        }
        SimplifyExpression(args) {
            return this.equation.SimplifyExpression(args);
        }
        EquationLikeTerms(args) {
            return this.equation.EquationLikeTerms(args);
        }
        EquationSimplifyFraction(args) {
            return this.equation.EquationSimplifyFraction(args);
        }
        EquationExponent(args) {
            return this.equation.EquationExponent(args);
        }
        EquationFactor(args) {
            return this.equation.EquationFactor(args);
        }
        EquationExpand(args) {
            return this.equation.EquationExpand(args);
        }
        EquationValue(args) {
            return this.equation.EquationValue(args);
        }
        EquationSolve(args) {
            return this.equation.EquationSolve(args);
        }
        EquationRoots(args) {
            return this.equation.EquationRoots(args);
        }
        EquationNthRoot(args) {
            return this.equation.EquationNthRoot(args);
        }
    }

    extensions.register(new MathExtension());
})(Scratch);
