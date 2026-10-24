// Gandi Format (from RemixWarp, id=gamemenu)
// Name: Game Menu
// ID: mGameMenu
// Description: Add an in-game settings menu with text, number, color, file, checkbox, slider and button controls, then read their values back.
// By: mk145mc<https://space.bilibili.com/3546744692411279?spm_id_from=333.1007.0.0>
// License: MIT

class GameMenu {
    constructor() {
        this.menus = [];
        this.window = null;
        this.activeMenu = '';
        this.renderPending = false;
        this.buttonHatState = new Map();
    }

    getInfo() {
        return {
            id: 'gamemenu',
            name: '游戏菜单',
            color1: '#245b73',
            color2: '#173b4a',
            blocks: [
                {
                    opcode: 'addMenu',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '添加菜单 [MENU]',
                    arguments: {
                        MENU: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '设置'
                        }
                    }
                },
                {
                    opcode: 'addString',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '在菜单 [MENU] 添加文本框 [ID] 名称 [LABEL] 默认值 [VALUE]',
                    arguments: this.controlArguments('设置', '玩家名称', '玩家', 'Steve')
                },
                {
                    opcode: 'addNumber',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '在菜单 [MENU] 添加数字框 [ID] 名称 [LABEL] 默认值 [VALUE]',
                    arguments: this.controlArguments('设置', '音量', '音量', '100')
                },
                {
                    opcode: 'addColor',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '在菜单 [MENU] 添加颜色选择器 [ID] 名称 [LABEL] 默认值 [VALUE]',
                    arguments: this.controlArguments('设置', '主题颜色', '主题颜色', '#55aaff')
                },
                {
                    opcode: 'addFile',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '在菜单 [MENU] 添加文件选择器 [ID] 名称 [LABEL]',
                    arguments: this.controlArguments('设置', '存档文件', '选择存档', '')
                },
                {
                    opcode: 'addButton',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '在菜单 [MENU] 添加按钮 [ID] 名称 [LABEL]',
                    arguments: this.controlArguments('设置', '保存', '保存游戏', '')
                },
                {
                    opcode: 'addBoolean',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '在菜单 [MENU] 添加复选框 [ID] 名称 [LABEL] 默认值 [VALUE]',
                    arguments: this.controlArguments('设置', '显示提示', '显示提示', 'true')
                },
                {
                    opcode: 'addSlider',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '在菜单 [MENU] 添加滑条 [ID] 名称 [LABEL] 最小值 [MIN] 最大值 [MAX] 步长 [STEP] 默认值 [VALUE]',
                    arguments: {
                        MENU: { type: Scratch.ArgumentType.STRING, defaultValue: '设置' },
                        ID: { type: Scratch.ArgumentType.STRING, defaultValue: '音量' },
                        LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: '音量' },
                        MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
                        STEP: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
                    }
                },
                {
                    opcode: 'openMenu',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '打开游戏菜单'
                },
                {
                    opcode: 'closeMenu',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '关闭游戏菜单'
                },
                {
                    opcode: 'getValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取菜单 [MENU] 控件 [ID] 的值',
                    arguments: {
                        MENU: { type: Scratch.ArgumentType.STRING, defaultValue: '设置' },
                        ID: { type: Scratch.ArgumentType.STRING, defaultValue: '玩家名称' }
                    }
                },
                {
                    opcode: 'getButtonPressed',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '获取按钮 [ID] 的值',
                    arguments: {
                        ID: { type: Scratch.ArgumentType.STRING, defaultValue: '保存' }
                    }
                },
                {
                    opcode: 'whenButtonPressed',
                    blockType: Scratch.BlockType.HAT,
                    text: '当按钮 [ID] 被按下',
                    isEdgeActivated: true,
                    arguments: {
                        ID: { type: Scratch.ArgumentType.STRING, defaultValue: '保存' }
                    }
                },
                {
                    opcode: 'getActiveMenu',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前菜单'
                },
                {
                    opcode: 'clearMenus',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '清空所有游戏菜单'
                }
            ]
        };
    }

    controlArguments(menu, id, label, value) {
        return {
            MENU: { type: Scratch.ArgumentType.STRING, defaultValue: menu },
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: id },
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: label },
            VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: value }
        };
    }

    addMenu(args) {
        const name = String(args.MENU || '菜单');
        if (!this.findMenu(name)) this.menus.push({ name, controls: [] });
        if (!this.activeMenu) this.activeMenu = name;
        this.scheduleRender();
    }

    addString(args) {
        this.addControl(args, 'string', String(args.VALUE || ''));
    }

    addNumber(args) {
        const number = Number(args.VALUE);
        this.addControl(args, 'number', Number.isFinite(number) ? number : 0);
    }

    addColor(args) {
        const value = String(args.VALUE || '#55aaff');
        this.addControl(args, 'color', /^#[0-9a-f]{6}$/i.test(value) ? value : '#55aaff');
    }

    addFile(args) {
        this.addControl(args, 'file', '');
    }

    addButton(args) {
        this.addControl(args, 'button', 0);
    }

    addBoolean(args) {
        const value = String(args.VALUE).toLowerCase() === 'true';
        this.addControl(args, 'boolean', value);
    }

    addSlider(args) {
        const min = Number(args.MIN) || 0;
        const max = Number(args.MAX) || 100;
        const step = Number(args.STEP) > 0 ? Number(args.STEP) : 1;
        const value = Math.min(max, Math.max(min, Number(args.VALUE) || min));
        this.addControl(args, 'slider', value, { min, max: Math.max(min, max), step });
    }

    addControl(args, type, value, options = {}) {
        const menuName = String(args.MENU || '菜单');
        const id = String(args.ID || '控件');
        let menu = this.findMenu(menuName);
        if (!menu) {
            menu = { name: menuName, controls: [] };
            this.menus.push(menu);
        }
        const control = {
            id,
            type,
            label: String(args.LABEL || id),
            value,
            ...options
        };
        if (type === 'button') {
            control.value = 0;
            control.pressed = false;
        }
        const oldIndex = menu.controls.findIndex(item => item.id === id);
        if (oldIndex === -1) menu.controls.push(control);
        else menu.controls[oldIndex] = control;
        if (!this.activeMenu) this.activeMenu = menuName;
        this.scheduleRender();
    }

    openMenu() {
        if (!this.window) this.createWindow();
        this.window.hidden = false;
        this.scheduleRender();
    }

    closeMenu() {
        if (this.window) this.window.hidden = true;
    }

    getValue(args) {
        const menu = this.findMenu(String(args.MENU || ''));
        const control = menu && menu.controls.find(item => item.id === String(args.ID || ''));
        if (!control) return '';
        if (control.type === 'button') return this.consumePressed(control);
        return control.value;
    }

    getButtonPressed(args) {
        const control = this.findButton(String(args.ID || ''));
        if (!control) return false;
        return this.consumePressed(control);
    }
    whenButtonPressed(args, util) {
        const control = this.findButton(String(args.ID || ''));
        if (!control) return false;
        const key = (util && util.thread && util.thread.topBlock) || `id:${control.id}`;
        const last = this.buttonHatState.get(key) || 0;
        const count = Number(control.value) || 0;
        this.buttonHatState.set(key, count);
        return count > last;
    }

    getActiveMenu() {
        return this.activeMenu;
    }

    clearMenus() {
        this.menus = [];
        this.activeMenu = '';
        this.buttonHatState.clear();
        this.scheduleRender();
    }

    consumePressed(control) {
        const pressed = control.pressed === true;
        control.pressed = false;
        return pressed;
    }

    findMenu(name) {
        return this.menus.find(menu => menu.name === name);
    }
    findControlById(id, type) {
        for (const menu of this.menus) {
            const control = menu.controls.find(item => item.id === id && (!type || item.type === type));
            if (control) return control;
        }
        return null;
    }

    findButton(id) {
        return this.findControlById(id, 'button');
    }

    scheduleRender() {
        if (this.renderPending) return;
        this.renderPending = true;
        const refresh = () => {
            this.renderPending = false;
            this.render();
        };
        if (typeof requestAnimationFrame === 'function') requestAnimationFrame(refresh);
        else setTimeout(refresh, 0);
    }

    createWindow() {
        const style = document.createElement('style');
        style.textContent = `
            #lotcon-game-menu { position: fixed; z-index: 999998; left: 50%; top: 50%;
                transform: translate(-50%, -50%); width: min(760px, 90vw); height: min(520px, 80vh);
                display: flex; overflow: hidden; color: #edf7fa; background: #17252b;
                border: 3px solid #4f8797; box-shadow: 0 16px 40px #0009; font: 16px sans-serif; }
            #lotcon-game-menu[hidden] { display: none; }
            #lotcon-game-menu .menu-list { width: 190px; flex: 0 0 190px; padding: 14px 8px;
                background: #102027; border-right: 2px solid #315563; }
            #lotcon-game-menu .menu-title { padding: 4px 10px 14px; color: #8fd1df; font-size: 20px; font-weight: bold; }
            #lotcon-game-menu .menu-item { display: block; width: 100%; margin: 3px 0; padding: 10px;
                border: 0; color: #d9edf1; background: transparent; text-align: left; cursor: pointer; font: inherit; }
            #lotcon-game-menu .menu-item:hover, #lotcon-game-menu .menu-item.active { color: #fff; background: #286078; }
            #lotcon-game-menu .content { flex: 1; min-width: 0; overflow: auto; padding: 26px; }
            #lotcon-game-menu .content h2 { margin: 0 0 22px; color: #a9e3ed; }
            #lotcon-game-menu .control { display: grid; grid-template-columns: 170px minmax(0, 1fr); gap: 14px;
                align-items: center; margin: 0 0 16px; }
            #lotcon-game-menu label { color: #c7dfe3; }
            #lotcon-game-menu input[type="text"], #lotcon-game-menu input[type="number"],
            #lotcon-game-menu input[type="file"] { box-sizing: border-box; width: 100%; padding: 8px;
                border: 1px solid #527581; color: #fff; background: #22363d; font: inherit; }
            #lotcon-game-menu input[type="color"] { width: 54px; height: 35px; padding: 2px; border: 1px solid #527581; background: #22363d; }
            #lotcon-game-menu input[type="checkbox"] { width: 20px; height: 20px; accent-color: #4db2c9; }
            #lotcon-game-menu .game-button { justify-self: start; padding: 9px 20px; border: 1px solid #83d3e2;
                color: #fff; background: #286078; cursor: pointer; font: inherit; }
            #lotcon-game-menu .game-button:active { background: #3f8fa8; }
            #lotcon-game-menu .empty { color: #8aaab1; }
        `;
        document.head.appendChild(style);
        const panel = document.createElement('section');
        panel.id = 'lotcon-game-menu';
        panel.hidden = true;
        panel.innerHTML = '<aside class="menu-list"><div class="menu-title">游戏菜单</div><div class="menu-items"></div></aside><main class="content"></main>';
        document.body.appendChild(panel);
        this.window = panel;
    }

    render() {
        if (!this.window) return;
        const menuItems = this.window.querySelector('.menu-items');
        const content = this.window.querySelector('.content');
        menuItems.innerHTML = '';
        this.menus.forEach(menu => {
            const button = document.createElement('button');
            button.className = `menu-item${menu.name === this.activeMenu ? ' active' : ''}`;
            button.textContent = menu.name;
            button.addEventListener('click', () => {
                this.activeMenu = menu.name;
                this.scheduleRender();
            });
            menuItems.appendChild(button);
        });
        const menu = this.findMenu(this.activeMenu);
        content.innerHTML = '';
        if (!menu) {
            content.innerHTML = '<p class="empty">还没有菜单选项</p>';
            return;
        }
        const title = document.createElement('h2');
        title.textContent = menu.name;
        content.appendChild(title);
        menu.controls.forEach(control => content.appendChild(this.createControl(control, menu)));
    }

    createControl(control, menu) {
        const row = document.createElement('div');
        row.className = 'control';
        const label = document.createElement('label');
        label.textContent = control.label;
        row.appendChild(label);
        let input;
        if (control.type === 'button') {
            input = document.createElement('button');
            input.className = 'game-button';
            input.textContent = control.label;
            input.addEventListener('click', () => {
                // 点击次数只用于帽子积木的边沿检测，不再作为对外返回值
                control.value = (Number(control.value) || 0) + 1;
                control.pressed = true;
            });
        } else {
            input = document.createElement('input');
            if (control.type === 'boolean') {
                input.type = 'checkbox';
                input.checked = Boolean(control.value);
            } else if (control.type === 'slider') {
                input.type = 'range';
                input.min = control.min;
                input.max = control.max;
                input.step = control.step;
                input.value = control.value;
            } else {
                input.type = this.inputTypeOf(control.type);
                if (control.type !== 'file') input.value = control.value;
            }
            input.addEventListener('input', () => this.updateControlValue(control, input));
            input.addEventListener('change', () => this.updateControlValue(control, input));
        }
        row.appendChild(input);
        return row;
    }

    inputTypeOf(type) {
        if (type === 'string') return 'text';
        if (type === 'number') return 'number';
        if (type === 'color') return 'color';
        if (type === 'file') return 'file';
        return 'text';
    }

    updateControlValue(control, input) {
        if (control.type === 'boolean') control.value = input.checked;
        else if (control.type === 'file') control.value = input.files[0] ? input.files[0].name : '';
        else if (control.type === 'number' || control.type === 'slider') control.value = Number(input.value) || 0;
        else control.value = input.value;
    }
}

Scratch.extensions.register(new GameMenu());
