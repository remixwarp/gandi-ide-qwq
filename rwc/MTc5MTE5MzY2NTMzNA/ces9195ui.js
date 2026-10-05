// Gandi Format (from RemixWarp, id=ces9195ui)
(function (_Scratch) {
    const {ArgumentType, BlockType, Cast, translate, extensions, runtime} = _Scratch;

    translate.setup({
        zh: {
            'extensionName': 'CES9195的弹窗工具',
            // ===== Toast 通知 =====
            'toastWithType': '[TYPE] 顶部通知 [TEXT] 图标 [ICON] 持续 [DURATION] 秒',
            'toast.TEXT_default': '操作成功',
            'clearToasts': '清除所有通知',
            // ===== 模态弹窗 =====
            'modalAlert': '弹窗 [TITLE] 内容 [CONTENT] 图标 [ICON]',
            'modal.TITLE_default': '提示',
            'modal.CONTENT_default': '这是一条消息',
            'modalConfirm': '询问弹窗 标题 [TITLE] 内容 [CONTENT] 确认按钮 [OK_TEXT] 取消按钮 [CANCEL_TEXT]',
            'modal.OK_default': '确认',
            'modal.CANCEL_default': '取消',
            'modalConfirm.MESSAGE_default': '你确定要执行此操作吗？',
            'modalPrompt': '输入弹窗 标题 [TITLE] 占位符 [PLACEHOLDER] 默认值 [DEFAULT]',
            'modalPrompt.TITLE_default': '请输入内容',
            'modalPrompt.PLACEHOLDER_default': '在此输入...',
            'modalPrompt.DEFAULT_default': '',
            // ===== 角落通知 =====
            'cornerNotify': '在 [POSITION] 显示通知 标题 [TITLE] 内容 [CONTENT] 持续 [DURATION] 秒',
            'cornerNotify.TITLE_default': '通知',
            'cornerNotify.CONTENT_default': '这是一条角落通知',
            'clearCornerNotifys': '清除所有角落通知',
            // ===== 选择器 =====
            'selectionModal': '选择弹窗 标题 [TITLE] 选项 [OPTIONS] 布局 [LAYOUT] 用 [SEPARATOR] 分割',
            'selectionModal.TITLE_default': '请选择一项',
            'selectionModal.OPTIONS_default': '苹果,香蕉,橘子,葡萄,西瓜,草莓',
            // ===== 进度条弹窗 =====
            'progressModal': '进度弹窗 标题 [TITLE] 内容 [CONTENT]',
            'progressModal.TITLE_default': '加载中',
            'progressModal.CONTENT_default': '请稍候...',
            'updateProgress': '更新进度 [PERCENT]%',
            'closeProgressModal': '关闭进度弹窗',
            // ===== 底部抽屉 =====
            'bottomSheet': '底部抽屉 标题 [TITLE] 内容 [CONTENT] 高度 [HEIGHT]%',
            'bottomSheet.TITLE_default': '详情面板',
            'bottomSheet.CONTENT_default': '这是底部抽屉面板的内容区域。',
            'closeBottomSheet': '关闭底部抽屉',
            // ===== 主题 =====
            'setTheme': '设置主题 [THEME] 主题色 [COLOR]',
            'themeLight': '浅色',
            'themeDark': '深色',
            'themeAuto': '跟随系统',
            'themeGlass': '液态玻璃',
            'themeCyberpunk': '赛博朋克',
            'themeSunset': '日落暖阳',
            'themeForest': '森林清新',
            'themeOcean': '深海幽蓝',
            'getTheme': '当前主题名称',
            // ===== 图标 =====
            'iconInfo': 'ℹ️ 信息',
            'iconSuccess': '✅ 成功',
            'iconWarning': '⚠️ 警告',
            'iconError': '❌ 错误',
            'iconNone': '🚫 无图标',
            // ===== Toast类型 =====
            'typeSuccess': '成功',
            'typeWarning': '警告',
            'typeError': '错误',
            'typeInfo': '信息',
            // ===== 位置 =====
            'posTopLeft': '左上角',
            'posTopRight': '右上角',
            'posBottomLeft': '左下角',
            'posBottomRight': '右下角',
            // ===== 布局 =====
            'layoutList': '列表',
            'layoutGrid': '网格',
            // ===== 分割 =====
            'sepComma': '逗号',
            'sepSpace': '空格',
            'sepSlash': '顿号',
            'sepNewline': '换行'
        },
        en: {
            'extensionName': 'Glass UI',
            'toastWithType': '[TYPE] toast [TEXT] icon [ICON] for [DURATION]s',
            'toast.TEXT_default': 'Operation successful',
            'clearToasts': 'Clear all toasts',
            'modalAlert': 'Popup [TITLE] content [CONTENT] icon [ICON]',
            'modal.TITLE_default': 'Notice',
            'modal.CONTENT_default': 'This is a message',
            'modalConfirm': 'Confirm popup title [TITLE] content [CONTENT] OK button [OK_TEXT] cancel button [CANCEL_TEXT]',
            'modal.OK_default': 'OK',
            'modal.CANCEL_default': 'Cancel',
            'modalConfirm.MESSAGE_default': 'Are you sure?',
            'modalPrompt': 'Input popup title [TITLE] placeholder [PLACEHOLDER] default [DEFAULT]',
            'modalPrompt.TITLE_default': 'Enter text',
            'modalPrompt.PLACEHOLDER_default': 'Type here...',
            'modalPrompt.DEFAULT_default': '',
            'cornerNotify': 'Show notification at [POSITION] title [TITLE] content [CONTENT] for [DURATION]s',
            'cornerNotify.TITLE_default': 'Notification',
            'cornerNotify.CONTENT_default': 'This is a corner notification',
            'clearCornerNotifys': 'Clear all corner notifications',
            'selectionModal': 'Selection popup title [TITLE] options [OPTIONS] layout [LAYOUT] split by [SEPARATOR]',
            'selectionModal.TITLE_default': 'Please select',
            'selectionModal.OPTIONS_default': 'Apple,Banana,Orange,Grape,Watermelon,Strawberry',
            'progressModal': 'Progress popup title [TITLE] content [CONTENT]',
            'progressModal.TITLE_default': 'Loading',
            'progressModal.CONTENT_default': 'Please wait...',
            'updateProgress': 'Update progress [PERCENT]%',
            'closeProgressModal': 'Close progress popup',
            'bottomSheet': 'Bottom sheet title [TITLE] content [CONTENT] height [HEIGHT]%',
            'bottomSheet.TITLE_default': 'Details Panel',
            'bottomSheet.CONTENT_default': 'This is the content area of the bottom sheet.',
            'closeBottomSheet': 'Close bottom sheet',
            'setTheme': 'Set theme [THEME] accent color [COLOR]',
            'themeLight': 'Light',
            'themeDark': 'Dark',
            'themeAuto': 'Auto',
            'themeGlass': 'Liquid Glass',
            'themeCyberpunk': 'Cyberpunk',
            'themeSunset': 'Sunset',
            'themeForest': 'Forest',
            'themeOcean': 'Ocean',
            'getTheme': 'Current theme name',
            'iconInfo': 'ℹ️ Info',
            'iconSuccess': '✅ Success',
            'iconWarning': '⚠️ Warning',
            'iconError': '❌ Error',
            'iconNone': '🚫 None',
            'typeSuccess': 'Success',
            'typeWarning': 'Warning',
            'typeError': 'Error',
            'typeInfo': 'Info',
            'posTopLeft': 'Top Left',
            'posTopRight': 'Top Right',
            'posBottomLeft': 'Bottom Left',
            'posBottomRight': 'Bottom Right',
            'layoutList': 'List',
            'layoutGrid': 'Grid',
            'sepComma': 'Comma',
            'sepSpace': 'Space',
            'sepSlash': 'Slash',
            'sepNewline': 'Newline'
        }
    });

    // ============================
    // SVG 图标库
    // ============================
    const ICONS = {
        info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
        success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
        warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
    };

    // ============================
    // 主题预设
    // ============================
    const THEME_PRESETS = {
        light: {
            '--glass-bg': 'rgba(255,255,255,0.78)',
            '--glass-bg-solid': '#f0f1f5',
            '--glass-border': 'rgba(255,255,255,0.6)',
            '--glass-shadow': 'rgba(0,0,0,0.08)',
            '--glass-text': '#1a1a2e',
            '--glass-text-secondary': '#5a5a7a',
            '--overlay-bg': 'rgba(200,200,220,0.45)'
        },
        dark: {
            '--glass-bg': 'rgba(22,22,40,0.82)',
            '--glass-bg-solid': '#16162a',
            '--glass-border': 'rgba(255,255,255,0.08)',
            '--glass-shadow': 'rgba(0,0,0,0.4)',
            '--glass-text': '#e8e8f0',
            '--glass-text-secondary': '#9090aa',
            '--overlay-bg': 'rgba(0,0,0,0.55)'
        },
        glass: {
            '--glass-bg': 'rgba(255,255,255,0.25)',
            '--glass-bg-solid': 'rgba(255,255,255,0.35)',
            '--glass-border': 'rgba(255,255,255,0.35)',
            '--glass-shadow': 'rgba(0,0,0,0.12)',
            '--glass-text': '#ffffff',
            '--glass-text-secondary': 'rgba(255,255,255,0.7)',
            '--overlay-bg': 'rgba(0,0,0,0.35)'
        },
        cyberpunk: {
            '--glass-bg': 'rgba(10,10,30,0.88)',
            '--glass-bg-solid': '#0a0a1e',
            '--glass-border': 'rgba(0,255,255,0.2)',
            '--glass-shadow': 'rgba(0,255,255,0.1)',
            '--glass-text': '#00ffff',
            '--glass-text-secondary': '#ff00ff',
            '--overlay-bg': 'rgba(0,0,0,0.7)'
        },
        sunset: {
            '--glass-bg': 'rgba(255,245,235,0.75)',
            '--glass-bg-solid': '#fff5eb',
            '--glass-border': 'rgba(255,180,120,0.4)',
            '--glass-shadow': 'rgba(255,120,60,0.1)',
            '--glass-text': '#3d2010',
            '--glass-text-secondary': '#8a5a30',
            '--overlay-bg': 'rgba(255,200,150,0.35)'
        },
        forest: {
            '--glass-bg': 'rgba(240,255,245,0.75)',
            '--glass-bg-solid': '#f0fff5',
            '--glass-border': 'rgba(100,200,140,0.35)',
            '--glass-shadow': 'rgba(60,140,80,0.1)',
            '--glass-text': '#1a3d28',
            '--glass-text-secondary': '#4a7a5a',
            '--overlay-bg': 'rgba(150,220,170,0.3)'
        },
        ocean: {
            '--glass-bg': 'rgba(230,240,255,0.75)',
            '--glass-bg-solid': '#e6f0ff',
            '--glass-border': 'rgba(100,160,255,0.35)',
            '--glass-shadow': 'rgba(40,80,180,0.1)',
            '--glass-text': '#0a1a3d',
            '--glass-text-secondary': '#3a5a8a',
            '--overlay-bg': 'rgba(130,180,255,0.3)'
        }
    };

    const ACCENT_PRESETS = {
        light: '#6366f1',
        dark: '#818cf8',
        glass: '#a78bfa',
        cyberpunk: '#00ffff',
        sunset: '#f97316',
        forest: '#22c55e',
        ocean: '#3b82f6'
    };

    // ============================
    // 工具函数
    // ============================
    function getSeparatorValue(sep) {
        switch (sep) {
            case 'comma': return ',';
            case 'space': return ' ';
            case 'slash': return '、';
            case 'newline': return '\n';
            default: return ',';
        }
    }

    let _styleInjected = false;
    function injectStyles() {
        if (_styleInjected) return;
        if (document.getElementById('glassui-styles')) return;
        _styleInjected = true;
        const style = document.createElement('style');
        style.id = 'glassui-styles';
        style.textContent = `
/* ========================================
   幻璃 UI — GlassUI 样式系统
   ======================================== */

:root {
    --glassui-primary: #6366f1;
    --glassui-primary-hover: #4f46e5;
    --glassui-primary-glow: rgba(99,102,241,0.35);
    --glassui-success: #22c55e;
    --glassui-warning: #f59e0b;
    --glassui-error: #ef4444;
    --glassui-info: #6366f1;
    --glassui-success-bg: rgba(34,197,94,0.12);
    --glassui-warning-bg: rgba(245,158,11,0.12);
    --glassui-error-bg: rgba(239,68,68,0.12);
    --glassui-info-bg: rgba(99,102,241,0.12);
    --glass-bg: rgba(255,255,255,0.78);
    --glass-bg-solid: #f0f1f5;
    --glass-border: rgba(255,255,255,0.6);
    --glass-shadow: rgba(0,0,0,0.08);
    --glass-text: #1a1a2e;
    --glass-text-secondary: #5a5a7a;
    --overlay-bg: rgba(200,200,220,0.45);
    --glass-blur: 24px;
    --glass-radius: 20px;
    --glass-radius-sm: 12px;
    --spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
    --spring-smooth: cubic-bezier(0.22, 1, 0.36, 1);
    --spring-decel: cubic-bezier(0, 0, 0.2, 1);
}

/* ---------- 遮罩层 ---------- */
.glassui-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: var(--overlay-bg);
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    z-index: 99999;
    animation: glassui-overlay-in 0.35s var(--spring-smooth) forwards;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.glassui-overlay.closing {
    animation: glassui-overlay-out 0.25s ease-in forwards;
    pointer-events: none;
}
@keyframes glassui-overlay-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes glassui-overlay-out { from { opacity: 1; } to { opacity: 0; } }

/* ---------- 玻璃卡片 ---------- */
.glassui-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur)) saturate(180%);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
    border: 1px solid var(--glass-border);
    border-radius: var(--glass-radius);
    box-shadow:
        0 8px 32px var(--glass-shadow),
        0 2px 8px var(--glass-shadow),
        inset 0 1px 0 rgba(255,255,255,0.15);
    width: 90%; max-width: 420px;
    padding: 0;
    position: relative;
    overflow: hidden;
    animation: glassui-card-in 0.45s var(--spring-bounce) forwards;
}
.closing .glassui-card {
    animation: glassui-card-out 0.25s ease-in forwards;
}
@keyframes glassui-card-in {
    from { opacity: 0; transform: translateY(30px) scale(0.92); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes glassui-card-out {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to { opacity: 0; transform: translateY(20px) scale(0.95); }
}

/* 卡片顶部彩色渐变线 */
.glassui-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--glassui-primary), var(--glassui-primary-hover), var(--glassui-primary));
    background-size: 200% 100%;
    animation: glassui-gradient-shift 3s ease infinite;
}
@keyframes glassui-gradient-shift {
    0%,100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}
.glassui-card.accent-success::before { background: linear-gradient(90deg, #22c55e, #4ade80, #22c55e); background-size: 200% 100%; }
.glassui-card.accent-warning::before { background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b); background-size: 200% 100%; }
.glassui-card.accent-error::before { background: linear-gradient(90deg, #ef4444, #f87171, #ef4444); background-size: 200% 100%; }
.glassui-card.accent-info::before { background: linear-gradient(90deg, var(--glassui-primary), #818cf8, var(--glassui-primary)); background-size: 200% 100%; }

.glassui-card-body { padding: 28px 28px 24px; }

/* ---------- 图标区域 ---------- */
.glassui-icon-wrap {
    width: 56px; height: 56px;
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
    animation: glassui-icon-pop 0.5s var(--spring-bounce) 0.15s both;
}
.glassui-icon-wrap svg { width: 28px; height: 28px; }
.glassui-icon-wrap.icon-success { background: var(--glassui-success-bg); color: var(--glassui-success); }
.glassui-icon-wrap.icon-warning { background: var(--glassui-warning-bg); color: var(--glassui-warning); }
.glassui-icon-wrap.icon-error { background: var(--glassui-error-bg); color: var(--glassui-error); }
.glassui-icon-wrap.icon-info { background: var(--glassui-info-bg); color: var(--glassui-info); }
@keyframes glassui-icon-pop {
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

/* ---------- 文字 ---------- */
.glassui-title {
    font-size: 18px; font-weight: 700;
    color: var(--glass-text);
    margin: 0 0 8px; text-align: center;
    letter-spacing: -0.3px;
}
.glassui-title.left-align { text-align: left; }
.glassui-content {
    font-size: 14px; line-height: 1.65;
    color: var(--glass-text-secondary);
    margin: 0; word-wrap: break-word;
    text-align: center;
}
.glassui-content.left-align { text-align: left; }

/* ---------- 按钮 ---------- */
.glassui-buttons {
    display: flex; gap: 12px; margin-top: 24px;
    justify-content: center;
}
.glassui-btn {
    flex: 1; padding: 12px 20px;
    border: none; border-radius: var(--glass-radius-sm);
    font-size: 14px; font-weight: 600;
    cursor: pointer;
    transition: all 0.2s var(--spring-smooth);
    position: relative; overflow: hidden;
    letter-spacing: 0.2px;
    max-width: 180px;
}
.glassui-btn::after {
    content: '';
    position: absolute; top: 50%; left: 50%;
    width: 0; height: 0;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
}
.glassui-btn:active::after { width: 300px; height: 300px; }
.glassui-btn:active { transform: scale(0.96); }

.glassui-btn-primary {
    background: var(--glassui-primary);
    color: white;
    box-shadow: 0 4px 14px var(--glassui-primary-glow);
}
.glassui-btn-primary:hover {
    background: var(--glassui-primary-hover);
    box-shadow: 0 6px 20px var(--glassui-primary-glow);
    transform: translateY(-1px);
}
.glassui-btn-secondary {
    background: rgba(128,128,160,0.1);
    color: var(--glass-text-secondary);
    border: 1px solid rgba(128,128,160,0.15);
}
.glassui-btn-secondary:hover {
    background: rgba(128,128,160,0.18);
}
.glassui-btn-danger {
    background: var(--glassui-error);
    color: white;
    box-shadow: 0 4px 14px rgba(239,68,68,0.3);
}
.glassui-btn-danger:hover {
    background: #dc2626;
    transform: translateY(-1px);
}

/* ---------- 输入框 ---------- */
.glassui-input-wrap { margin-top: 16px; }
.glassui-input {
    width: 100%; padding: 12px 16px;
    background: rgba(128,128,160,0.06);
    border: 1.5px solid rgba(128,128,160,0.18);
    border-radius: var(--glass-radius-sm);
    font-size: 14px; color: var(--glass-text);
    box-sizing: border-box;
    transition: all 0.25s ease;
    outline: none;
    font-family: inherit;
}
.glassui-input:focus {
    border-color: var(--glassui-primary);
    box-shadow: 0 0 0 3px var(--glassui-primary-glow);
    background: rgba(128,128,160,0.03);
}
.glassui-input::placeholder { color: rgba(128,128,160,0.5); }

/* ---------- Toast 通知 ---------- */
.glassui-toast-container {
    position: fixed; top: 16px; left: 50%;
    transform: translateX(-50%);
    z-index: 100000;
    display: flex; flex-direction: column; align-items: center;
    gap: 10px;
    pointer-events: none;
}
.glassui-toast {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur)) saturate(180%);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: 0 8px 30px var(--glass-shadow), inset 0 1px 0 rgba(255,255,255,0.12);
    padding: 14px 20px;
    display: flex; align-items: center; gap: 12px;
    min-width: 260px; max-width: 400px;
    pointer-events: auto;
    position: relative; overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    animation: glassui-toast-in 0.5s var(--spring-bounce) forwards;
}
.glassui-toast.removing {
    animation: glassui-toast-out 0.35s var(--spring-smooth) forwards;
}
@keyframes glassui-toast-in {
    from { opacity: 0; transform: translateY(-30px) scale(0.88); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes glassui-toast-out {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to { opacity: 0; transform: translateY(-20px) scale(0.9); }
}

.glassui-toast-icon {
    width: 32px; height: 32px; min-width: 32px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
}
.glassui-toast-icon svg { width: 18px; height: 18px; }
.glassui-toast-icon.icon-success { background: var(--glassui-success-bg); color: var(--glassui-success); }
.glassui-toast-icon.icon-warning { background: var(--glassui-warning-bg); color: var(--glassui-warning); }
.glassui-toast-icon.icon-error { background: var(--glassui-error-bg); color: var(--glassui-error); }
.glassui-toast-icon.icon-info { background: var(--glassui-info-bg); color: var(--glassui-info); }

.glassui-toast-text {
    font-size: 14px; font-weight: 500;
    color: var(--glass-text);
    line-height: 1.4;
    flex: 1;
}

/* Toast 底部进度条 */
.glassui-toast-progress {
    position: absolute; bottom: 0; left: 0;
    height: 3px;
    border-radius: 0 0 16px 16px;
    animation: glassui-toast-countdown linear forwards;
}
.glassui-toast-progress.type-success { background: var(--glassui-success); }
.glassui-toast-progress.type-warning { background: var(--glassui-warning); }
.glassui-toast-progress.type-error { background: var(--glassui-error); }
.glassui-toast-progress.type-info { background: var(--glassui-info); }
@keyframes glassui-toast-countdown {
    from { width: 100%; } to { width: 0%; }
}

/* ---------- 角落通知 ---------- */
.glassui-corner-container {
    position: fixed; z-index: 100001;
    display: flex; flex-direction: column; gap: 10px;
    pointer-events: none;
    max-height: 80vh; overflow: hidden;
}
.glassui-corner-container.pos-top-left { top: 16px; left: 16px; }
.glassui-corner-container.pos-top-right { top: 16px; right: 16px; }
.glassui-corner-container.pos-bottom-left { bottom: 16px; left: 16px; flex-direction: column-reverse; }
.glassui-corner-container.pos-bottom-right { bottom: 16px; right: 16px; flex-direction: column-reverse; }

.glassui-corner-item {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur)) saturate(180%);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: 0 8px 30px var(--glass-shadow), inset 0 1px 0 rgba(255,255,255,0.12);
    padding: 16px 20px;
    width: 300px;
    pointer-events: auto;
    position: relative; overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.glassui-corner-item::before {
    content: '';
    position: absolute; top: 0; left: 0; bottom: 0; width: 4px;
    background: var(--glassui-primary);
    border-radius: 16px 0 0 16px;
}
.pos-top-right .glassui-corner-item,
.pos-bottom-right .glassui-corner-item {
    animation: glassui-slide-in-right 0.5s var(--spring-bounce) forwards;
}
.pos-top-left .glassui-corner-item,
.pos-bottom-left .glassui-corner-item {
    animation: glassui-slide-in-left 0.5s var(--spring-bounce) forwards;
}
.glassui-corner-item.removing {
    animation: glassui-corner-out 0.3s ease-in forwards !important;
}
@keyframes glassui-slide-in-right {
    from { opacity: 0; transform: translateX(60px); }
    to { opacity: 1; transform: translateX(0); }
}
@keyframes glassui-slide-in-left {
    from { opacity: 0; transform: translateX(-60px); }
    to { opacity: 1; transform: translateX(0); }
}
@keyframes glassui-corner-out {
    to { opacity: 0; transform: scale(0.92); }
}

.glassui-corner-title {
    font-size: 14px; font-weight: 700;
    color: var(--glass-text);
    margin: 0 0 4px; padding-left: 8px;
}
.glassui-corner-content {
    font-size: 13px; line-height: 1.5;
    color: var(--glass-text-secondary);
    margin: 0; padding-left: 8px;
    word-wrap: break-word;
}
.glassui-corner-progress {
    position: absolute; bottom: 0; left: 0;
    height: 2px; background: var(--glassui-primary);
    border-radius: 0 0 16px 16px;
    animation: glassui-toast-countdown linear forwards;
}

/* ---------- 选择弹窗 ---------- */
.glassui-select-list {
    margin-top: 16px; max-height: 300px;
    overflow-y: auto; overflow-x: hidden;
    padding: 4px;
    scrollbar-width: thin;
    scrollbar-color: rgba(128,128,160,0.3) transparent;
}
.glassui-select-list::-webkit-scrollbar { width: 6px; }
.glassui-select-list::-webkit-scrollbar-track { background: transparent; }
.glassui-select-list::-webkit-scrollbar-thumb {
    background: rgba(128,128,160,0.3); border-radius: 3px;
}

.glassui-select-item {
    padding: 12px 16px;
    border-radius: var(--glass-radius-sm);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px; color: var(--glass-text);
    border: 1.5px solid transparent;
    margin-bottom: 4px;
    user-select: none;
}
.glassui-select-item:hover {
    background: rgba(128,128,160,0.08);
}
.glassui-select-item.selected {
    background: rgba(99,102,241,0.1);
    border-color: var(--glassui-primary);
    color: var(--glassui-primary);
    font-weight: 600;
}

/* 网格布局 */
.glassui-select-grid {
    margin-top: 16px; max-height: 320px;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px; padding: 4px;
}
.glassui-select-grid-item {
    padding: 16px 8px;
    border-radius: var(--glass-radius-sm);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 13px; color: var(--glass-text);
    border: 1.5px solid rgba(128,128,160,0.12);
    text-align: center;
    user-select: none;
    background: rgba(128,128,160,0.04);
}
.glassui-select-grid-item:hover {
    background: rgba(128,128,160,0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--glass-shadow);
}
.glassui-select-grid-item.selected {
    background: rgba(99,102,241,0.12);
    border-color: var(--glassui-primary);
    color: var(--glassui-primary);
    font-weight: 700;
    box-shadow: 0 4px 16px var(--glassui-primary-glow);
}

/* ---------- 进度条 ---------- */
.glassui-progress-wrap {
    margin-top: 20px;
}
.glassui-progress-bar-bg {
    width: 100%; height: 8px;
    background: rgba(128,128,160,0.12);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
}
.glassui-progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--glassui-primary), #818cf8);
    border-radius: 4px;
    transition: width 0.4s var(--spring-smooth);
    position: relative;
    min-width: 0%;
}
.glassui-progress-bar-fill::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: glassui-shimmer 1.5s ease-in-out infinite;
}
@keyframes glassui-shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}
.glassui-progress-text {
    text-align: center; margin-top: 8px;
    font-size: 13px; font-weight: 600;
    color: var(--glassui-primary);
}

/* ---------- 底部抽屉 ---------- */
.glassui-sheet-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: var(--overlay-bg);
    backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
    z-index: 99998;
    animation: glassui-overlay-in 0.3s ease forwards;
}
.glassui-sheet-overlay.closing {
    animation: glassui-overlay-out 0.3s ease forwards;
    pointer-events: none;
}
.glassui-sheet {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur)) saturate(180%);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
    border-top: 1px solid var(--glass-border);
    border-radius: 24px 24px 0 0;
    box-shadow: 0 -8px 40px var(--glass-shadow);
    z-index: 99999;
    padding: 0 28px 28px;
    overflow-y: auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    animation: glassui-sheet-in 0.5s var(--spring-bounce) forwards;
}
.glassui-sheet.closing {
    animation: glassui-sheet-out 0.3s ease-in forwards;
}
@keyframes glassui-sheet-in {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
}
@keyframes glassui-sheet-out {
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
}
.glassui-sheet-handle {
    width: 40px; height: 4px;
    background: rgba(128,128,160,0.3);
    border-radius: 2px;
    margin: 12px auto 20px;
}
.glassui-sheet-title {
    font-size: 18px; font-weight: 700;
    color: var(--glass-text);
    margin: 0 0 12px;
}
.glassui-sheet-content {
    font-size: 14px; line-height: 1.7;
    color: var(--glass-text-secondary);
    margin: 0; word-wrap: break-word;
}
.glassui-sheet-close {
    position: absolute; top: 16px; right: 20px;
    width: 32px; height: 32px;
    border-radius: 50%;
    background: rgba(128,128,160,0.1);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s ease;
    color: var(--glass-text-secondary);
    font-size: 18px;
}
.glassui-sheet-close:hover {
    background: rgba(128,128,160,0.2);
    transform: rotate(90deg);
}
        `;
        document.head.appendChild(style);
    }

    // ============================
    // 主扩展类
    // ============================
    class GlassUI {
        constructor(_runtime) {
            this._runtime = _runtime;
            this._currentTheme = 'light';
            this._toasts = [];
            this._toastContainer = null;
            this._cornerContainers = {};
            this._progressOverlay = null;
            this._progressFill = null;
            this._progressText = null;
            this._sheetOverlay = null;
            this._sheetEl = null;
            this._timers = [];

            injectStyles();
            this._applyTheme('light', '#6366f1');
        }

        // ---------- 清理 (防止内存泄漏) ----------
        dispose() {
            this._timers.forEach(id => clearTimeout(id));
            this._timers = [];
            document.querySelectorAll('.glassui-overlay, .glassui-toast-container, .glassui-corner-container, .glassui-sheet-overlay, .glassui-sheet')
                .forEach(el => el.remove());
            this._toasts = [];
            this._cornerContainers = {};
            this._progressOverlay = null;
            this._sheetOverlay = null;
            this._sheetEl = null;
        }

        // ---------- 主题系统 ----------
        _applyTheme(themeName, accentColor) {
            const preset = THEME_PRESETS[themeName] || THEME_PRESETS.light;
            const root = document.documentElement;
            Object.entries(preset).forEach(([k, v]) => root.style.setProperty(k, v));

            const accent = accentColor || ACCENT_PRESETS[themeName] || '#6366f1';
            root.style.setProperty('--glassui-primary', accent);
            // 计算 hover 色 (稍微暗一点)
            root.style.setProperty('--glassui-primary-hover', this._darkenColor(accent, 15));
            root.style.setProperty('--glassui-primary-glow', this._hexToRgba(accent, 0.35));
            root.style.setProperty('--glassui-info', accent);
            root.style.setProperty('--glassui-info-bg', this._hexToRgba(accent, 0.12));

            this._currentTheme = themeName;
        }

        _darkenColor(hex, percent) {
            hex = hex.replace('#', '');
            if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            const num = parseInt(hex, 16);
            const r = Math.max(0, (num >> 16) - Math.round(255 * percent / 100));
            const g = Math.max(0, ((num >> 8) & 0x00FF) - Math.round(255 * percent / 100));
            const b = Math.max(0, (num & 0x0000FF) - Math.round(255 * percent / 100));
            return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
        }

        _hexToRgba(hex, alpha) {
            hex = hex.replace('#', '');
            if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return `rgba(${r},${g},${b},${alpha})`;
        }

        // ---------- Toast 容器管理 ----------
        _ensureToastContainer() {
            if (this._toastContainer && this._toastContainer.parentNode) return;
            this._toastContainer = document.createElement('div');
            this._toastContainer.className = 'glassui-toast-container';
            document.body.appendChild(this._toastContainer);
        }

        // ---------- Toast ----------
        _showToast(type, text, icon, duration) {
            this._ensureToastContainer();
            const toast = document.createElement('div');
            toast.className = 'glassui-toast';

            // 图标
            if (icon && icon !== 'none' && ICONS[icon]) {
                const iconWrap = document.createElement('div');
                iconWrap.className = `glassui-toast-icon icon-${icon}`;
                iconWrap.innerHTML = ICONS[icon];
                toast.appendChild(iconWrap);
            }

            // 文字
            const textEl = document.createElement('div');
            textEl.className = 'glassui-toast-text';
            textEl.textContent = text;
            toast.appendChild(textEl);

            // 底部进度条
            const progressBar = document.createElement('div');
            progressBar.className = `glassui-toast-progress type-${type}`;
            progressBar.style.animationDuration = duration + 's';
            toast.appendChild(progressBar);

            this._toastContainer.appendChild(toast);
            this._toasts.push(toast);

            const timerId = setTimeout(() => this._removeToast(toast), duration * 1000);
            this._timers.push(timerId);
        }

        _removeToast(toast) {
            if (!toast || !toast.parentNode) return;
            toast.classList.add('removing');
            const handler = () => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
                const idx = this._toasts.indexOf(toast);
                if (idx !== -1) this._toasts.splice(idx, 1);
            };
            toast.addEventListener('animationend', handler, {once: true});
            // 兜底：确保 500ms 后移除
            const fallback = setTimeout(handler, 500);
            this._timers.push(fallback);
        }

        // ---------- 遮罩弹窗通用 ----------
        _createOverlay(closable = true) {
            // 移除现有同类型弹窗
            const existing = document.querySelector('.glassui-overlay:not(.closing)');
            if (existing) existing.remove();

            const overlay = document.createElement('div');
            overlay.className = 'glassui-overlay';

            if (closable) {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) this._closeOverlay(overlay);
                });
            }
            document.body.appendChild(overlay);
            return overlay;
        }

        _closeOverlay(overlay) {
            if (!overlay || overlay.classList.contains('closing')) return;
            overlay.classList.add('closing');
            const handler = () => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); };
            overlay.addEventListener('animationend', handler, {once: true});
            const fallback = setTimeout(handler, 400);
            this._timers.push(fallback);
        }

        _createCard(type) {
            const card = document.createElement('div');
            card.className = 'glassui-card';
            if (type && type !== 'none') card.classList.add('accent-' + type);
            return card;
        }

        _createIconElement(iconType) {
            if (!iconType || iconType === 'none' || !ICONS[iconType]) return null;
            const wrap = document.createElement('div');
            wrap.className = `glassui-icon-wrap icon-${iconType}`;
            wrap.innerHTML = ICONS[iconType];
            return wrap;
        }

        _createButton(text, className, onClick) {
            const btn = document.createElement('button');
            btn.className = `glassui-btn ${className}`;
            btn.textContent = text;
            btn.addEventListener('click', onClick);
            return btn;
        }

        // ---------- 角落通知 ----------
        _ensureCornerContainer(position) {
            if (this._cornerContainers[position] && this._cornerContainers[position].parentNode) return;
            const container = document.createElement('div');
            container.className = `glassui-corner-container pos-${position}`;
            document.body.appendChild(container);
            this._cornerContainers[position] = container;
        }

        _showCornerNotify(position, title, content, duration) {
            this._ensureCornerContainer(position);
            const container = this._cornerContainers[position];

            const item = document.createElement('div');
            item.className = 'glassui-corner-item';

            const titleEl = document.createElement('div');
            titleEl.className = 'glassui-corner-title';
            titleEl.textContent = title;

            const contentEl = document.createElement('div');
            contentEl.className = 'glassui-corner-content';
            contentEl.textContent = content;

            const progressBar = document.createElement('div');
            progressBar.className = 'glassui-corner-progress';
            progressBar.style.animationDuration = duration + 's';

            item.appendChild(titleEl);
            item.appendChild(contentEl);
            item.appendChild(progressBar);
            container.appendChild(item);

            const timerId = setTimeout(() => this._removeCornerItem(item), duration * 1000);
            this._timers.push(timerId);
        }

        _removeCornerItem(item) {
            if (!item || !item.parentNode) return;
            item.classList.add('removing');
            const handler = () => { if (item.parentNode) item.parentNode.removeChild(item); };
            item.addEventListener('animationend', handler, {once: true});
            const fallback = setTimeout(handler, 400);
            this._timers.push(fallback);
        }

        // ---------- 进度弹窗 ----------
        _showProgressModal(title, content) {
            this._closeProgressModal();
            const overlay = this._createOverlay(false);
            this._progressOverlay = overlay;

            const card = this._createCard('info');
            const body = document.createElement('div');
            body.className = 'glassui-card-body';

            const titleEl = document.createElement('div');
            titleEl.className = 'glassui-title';
            titleEl.textContent = title;

            const contentEl = document.createElement('div');
            contentEl.className = 'glassui-content';
            contentEl.textContent = content;

            const progressWrap = document.createElement('div');
            progressWrap.className = 'glassui-progress-wrap';

            const barBg = document.createElement('div');
            barBg.className = 'glassui-progress-bar-bg';

            this._progressFill = document.createElement('div');
            this._progressFill.className = 'glassui-progress-bar-fill';
            this._progressFill.style.width = '0%';

            this._progressText = document.createElement('div');
            this._progressText.className = 'glassui-progress-text';
            this._progressText.textContent = '0%';

            barBg.appendChild(this._progressFill);
            progressWrap.appendChild(barBg);
            progressWrap.appendChild(this._progressText);

            body.appendChild(titleEl);
            body.appendChild(contentEl);
            body.appendChild(progressWrap);
            card.appendChild(body);
            overlay.appendChild(card);
        }

        _updateProgress(percent) {
            percent = Math.max(0, Math.min(100, percent));
            if (this._progressFill) {
                this._progressFill.style.width = percent + '%';
            }
            if (this._progressText) {
                this._progressText.textContent = Math.round(percent) + '%';
            }
        }

        _closeProgressModal() {
            if (this._progressOverlay) {
                this._closeOverlay(this._progressOverlay);
                this._progressOverlay = null;
                this._progressFill = null;
                this._progressText = null;
            }
        }

        // ---------- 底部抽屉 ----------
        _showBottomSheet(title, content, heightPercent) {
            this._closeBottomSheet();

            const overlay = document.createElement('div');
            overlay.className = 'glassui-sheet-overlay';
            overlay.addEventListener('click', () => this._closeBottomSheet());
            document.body.appendChild(overlay);
            this._sheetOverlay = overlay;

            const sheet = document.createElement('div');
            sheet.className = 'glassui-sheet';
            sheet.style.height = heightPercent + '%';
            sheet.style.maxHeight = '85%';

            const handle = document.createElement('div');
            handle.className = 'glassui-sheet-handle';

            const closeBtn = document.createElement('button');
            closeBtn.className = 'glassui-sheet-close';
            closeBtn.innerHTML = '✕';
            closeBtn.addEventListener('click', () => this._closeBottomSheet());

            const titleEl = document.createElement('div');
            titleEl.className = 'glassui-sheet-title';
            titleEl.textContent = title;

            const contentEl = document.createElement('div');
            contentEl.className = 'glassui-sheet-content';
            contentEl.textContent = content;

            sheet.appendChild(handle);
            sheet.appendChild(closeBtn);
            sheet.appendChild(titleEl);
            sheet.appendChild(contentEl);
            document.body.appendChild(sheet);
            this._sheetEl = sheet;
        }

        _closeBottomSheet() {
            if (this._sheetOverlay) {
                this._sheetOverlay.classList.add('closing');
                const o = this._sheetOverlay;
                const removeO = () => { if (o.parentNode) o.parentNode.removeChild(o); };
                o.addEventListener('animationend', removeO, {once: true});
                const t1 = setTimeout(removeO, 400);
                this._timers.push(t1);
                this._sheetOverlay = null;
            }
            if (this._sheetEl) {
                this._sheetEl.classList.add('closing');
                const s = this._sheetEl;
                const removeS = () => { if (s.parentNode) s.parentNode.removeChild(s); };
                s.addEventListener('animationend', removeS, {once: true});
                const t2 = setTimeout(removeS, 400);
                this._timers.push(t2);
                this._sheetEl = null;
            }
        }

        // ============================
        // getInfo — 积木定义
        // ============================
        getInfo() {
            return {
                id: 'ces9195ui',
                name: translate({id: 'ces9195ui'}),
                color1: '#6366f1',
                color2: '#4f46e5',
                color3: '#818cf8',
                blocks: [
                    // ===== Toast 通知 =====
                    {
                        opcode: 'toastWithType',
                        blockType: BlockType.COMMAND,
                        text: translate({id: 'ces9195ui'}),
                        arguments: {
                            TYPE: { type: ArgumentType.STRING, menu: 'toastTypeMenu', defaultValue: 'success' },
                            TEXT: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            ICON: { type: ArgumentType.STRING, menu: 'iconMenu', defaultValue: 'success' },
                            DURATION: { type: ArgumentType.NUMBER, defaultValue: 3 }
                        }
                    },
                    {
                        opcode: 'clearToasts',
                        blockType: BlockType.COMMAND,
                        text: translate({id: 'ces9195ui'})
                    },
                    '---',
                    // ===== 模态弹窗 =====
                    {
                        opcode: 'modalAlert',
                        blockType: BlockType.COMMAND,
                        text: translate({id: 'ces9195ui'}),
                        arguments: {
                            TITLE: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            CONTENT: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            ICON: { type: ArgumentType.STRING, menu: 'iconMenu', defaultValue: 'info' }
                        }
                    },
                    {
                        opcode: 'modalConfirm',
                        blockType: BlockType.REPORTER,
                        text: translate({id: 'ces9195ui'}),
                        arguments: {
                            TITLE: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            CONTENT: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            OK_TEXT: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            CANCEL_TEXT: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) }
                        }
                    },
                    {
                        opcode: 'modalPrompt',
                        blockType: BlockType.REPORTER,
                        text: translate({id: 'ces9195ui'}),
                        arguments: {
                            TITLE: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            PLACEHOLDER: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            DEFAULT: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) }
                        }
                    },
                    '---',
                    // ===== 角落通知 =====
                    {
                        opcode: 'cornerNotify',
                        blockType: BlockType.COMMAND,
                        text: translate({id: 'ces9195ui'}),
                        arguments: {
                            POSITION: { type: ArgumentType.STRING, menu: 'positionMenu', defaultValue: 'top-right' },
                            TITLE: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            CONTENT: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            DURATION: { type: ArgumentType.NUMBER, defaultValue: 4 }
                        }
                    },
                    {
                        opcode: 'clearCornerNotifys',
                        blockType: BlockType.COMMAND,
                        text: translate({id: 'ces9195ui'})
                    },
                    '---',
                    // ===== 选择器 =====
                    {
                        opcode: 'selectionModal',
                        blockType: BlockType.REPORTER,
                        text: translate({id: 'ces9195ui'}),
                        arguments: {
                            TITLE: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            OPTIONS: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            LAYOUT: { type: ArgumentType.STRING, menu: 'layoutMenu', defaultValue: 'list' },
                            SEPARATOR: { type: ArgumentType.STRING, menu: 'separatorMenu', defaultValue: 'comma' }
                        }
                    },
                    '---',
                    // ===== 进度条 =====
                    {
                        opcode: 'progressModal',
                        blockType: BlockType.COMMAND,
                        text: translate({id: 'ces9195ui'}),
                        arguments: {
                            TITLE: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            CONTENT: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) }
                        }
                    },
                    {
                        opcode: 'updateProgress',
                        blockType: BlockType.COMMAND,
                        text: translate({id: 'ces9195ui'}),
                        arguments: {
                            PERCENT: { type: ArgumentType.NUMBER, defaultValue: 50 }
                        }
                    },
                    {
                        opcode: 'closeProgressModal',
                        blockType: BlockType.COMMAND,
                        text: translate({id: 'ces9195ui'})
                    },
                    '---',
                    // ===== 底部抽屉 =====
                    {
                        opcode: 'bottomSheet',
                        blockType: BlockType.COMMAND,
                        text: translate({id: 'ces9195ui'}),
                        arguments: {
                            TITLE: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            CONTENT: { type: ArgumentType.STRING, defaultValue: translate({id: 'ces9195ui'}) },
                            HEIGHT: { type: ArgumentType.NUMBER, defaultValue: 50 }
                        }
                    },
                    {
                        opcode: 'closeBottomSheet',
                        blockType: BlockType.COMMAND,
                        text: translate({id: 'ces9195ui'})
                    },
                    '---',
                    // ===== 主题 =====
                    {
                        opcode: 'setTheme',
                        blockType: BlockType.COMMAND,
                        text: translate({id: 'ces9195ui'}),
                        arguments: {
                            THEME: { type: ArgumentType.STRING, menu: 'themeMenu', defaultValue: 'light' },
                            COLOR: { type: ArgumentType.COLOR, defaultValue: '#6366f1' }
                        }
                    },
                    {
                        opcode: 'getTheme',
                        blockType: BlockType.REPORTER,
                        text: translate({id: 'ces9195ui'})
                    }
                ],
                menus: {
                    toastTypeMenu: {
                        acceptReporters: false,
                        items: [
                            { text: translate({id: 'ces9195ui'}), value: 'success' },
                            { text: translate({id: 'ces9195ui'}), value: 'warning' },
                            { text: translate({id: 'ces9195ui'}), value: 'error' },
                            { text: translate({id: 'ces9195ui'}), value: 'info' }
                        ]
                    },
                    iconMenu: {
                        acceptReporters: true,
                        items: [
                            { text: translate({id: 'ces9195ui'}), value: 'info' },
                            { text: translate({id: 'ces9195ui'}), value: 'success' },
                            { text: translate({id: 'ces9195ui'}), value: 'warning' },
                            { text: translate({id: 'ces9195ui'}), value: 'error' },
                            { text: translate({id: 'ces9195ui'}), value: 'none' }
                        ]
                    },
                    positionMenu: {
                        acceptReporters: false,
                        items: [
                            { text: translate({id: 'ces9195ui'}), value: 'top-left' },
                            { text: translate({id: 'ces9195ui'}), value: 'top-right' },
                            { text: translate({id: 'ces9195ui'}), value: 'bottom-left' },
                            { text: translate({id: 'ces9195ui'}), value: 'bottom-right' }
                        ]
                    },
                    layoutMenu: {
                        acceptReporters: false,
                        items: [
                            { text: translate({id: 'ces9195ui'}), value: 'list' },
                            { text: translate({id: 'ces9195ui'}), value: 'grid' }
                        ]
                    },
                    separatorMenu: {
                        acceptReporters: false,
                        items: [
                            { text: translate({id: 'ces9195ui'}), value: 'comma' },
                            { text: translate({id: 'ces9195ui'}), value: 'space' },
                            { text: translate({id: 'ces9195ui'}), value: 'slash' },
                            { text: translate({id: 'ces9195ui'}), value: 'newline' }
                        ]
                    },
                    themeMenu: {
                        acceptReporters: false,
                        items: [
                            { text: translate({id: 'ces9195ui'}), value: 'light' },
                            { text: translate({id: 'ces9195ui'}), value: 'dark' },
                            { text: translate({id: 'ces9195ui'}), value: 'glass' },
                            { text: translate({id: 'ces9195ui'}), value: 'cyberpunk' },
                            { text: translate({id: 'ces9195ui'}), value: 'sunset' },
                            { text: translate({id: 'ces9195ui'}), value: 'forest' },
                            { text: translate({id: 'ces9195ui'}), value: 'ocean' }
                        ]
                    }
                }
            };
        }

        // ============================
        // 积木实现
        // ============================

        // --- Toast ---
        toastWithType(args) {
            const type = Cast.toString(args.TYPE || 'info');
            const text = Cast.toString(args.TEXT || '');
            const icon = Cast.toString(args.ICON || 'none');
            const duration = Math.max(1, Math.min(30, Cast.toNumber(args.DURATION || 3)));
            if (!text) return;
            this._showToast(type, text, icon, duration);
        }

        clearToasts() {
            const toastsCopy = [...this._toasts];
            toastsCopy.forEach(t => this._removeToast(t));
        }

        // --- 模态弹窗 ---
        modalAlert(args) {
            const title = Cast.toString(args.TITLE || translate({id: 'ces9195ui'}));
            const content = Cast.toString(args.CONTENT || '');
            const icon = Cast.toString(args.ICON || 'info');

            const overlay = this._createOverlay(true);
            const card = this._createCard(icon !== 'none' ? icon : 'info');
            const body = document.createElement('div');
            body.className = 'glassui-card-body';

            const iconEl = this._createIconElement(icon);
            if (iconEl) body.appendChild(iconEl);

            const titleEl = document.createElement('div');
            titleEl.className = 'glassui-title';
            titleEl.textContent = title;

            const contentEl = document.createElement('div');
            contentEl.className = 'glassui-content';
            contentEl.textContent = content;

            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'glassui-buttons';
            buttonsDiv.appendChild(this._createButton(
                (navigator.language || '').startsWith('zh') ? '确定' : 'OK',
                'glassui-btn-primary',
                () => this._closeOverlay(overlay)
            ));

            body.appendChild(titleEl);
            body.appendChild(contentEl);
            body.appendChild(buttonsDiv);
            card.appendChild(body);
            overlay.appendChild(card);
        }

        modalConfirm(args) {
            const title = Cast.toString(args.TITLE || translate({id: 'ces9195ui'}));
            const content = Cast.toString(args.CONTENT || '');
            const okText = Cast.toString(args.OK_TEXT || translate({id: 'ces9195ui'}));
            const cancelText = Cast.toString(args.CANCEL_TEXT || translate({id: 'ces9195ui'}));

            return new Promise((resolve) => {
                let resolved = false;
                const safeResolve = (val) => {
                    if (resolved) return;
                    resolved = true;
                    resolve(val);
                };

                const overlay = this._createOverlay(true);
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        this._closeOverlay(overlay);
                        safeResolve(false);
                    }
                });

                const card = this._createCard('info');
                const body = document.createElement('div');
                body.className = 'glassui-card-body';

                const iconEl = this._createIconElement('info');
                if (iconEl) body.appendChild(iconEl);

                const titleEl = document.createElement('div');
                titleEl.className = 'glassui-title';
                titleEl.textContent = title;

                const contentEl = document.createElement('div');
                contentEl.className = 'glassui-content';
                contentEl.textContent = content;

                const buttonsDiv = document.createElement('div');
                buttonsDiv.className = 'glassui-buttons';

                buttonsDiv.appendChild(this._createButton(cancelText, 'glassui-btn-secondary', () => {
                    this._closeOverlay(overlay);
                    safeResolve(false);
                }));
                buttonsDiv.appendChild(this._createButton(okText, 'glassui-btn-primary', () => {
                    this._closeOverlay(overlay);
                    safeResolve(true);
                }));

                body.appendChild(titleEl);
                body.appendChild(contentEl);
                body.appendChild(buttonsDiv);
                card.appendChild(body);
                overlay.appendChild(card);

                // 键盘支持
                const keyHandler = (e) => {
                    if (e.key === 'Enter') {
                        document.removeEventListener('keydown', keyHandler);
                        this._closeOverlay(overlay);
                        safeResolve(true);
                    } else if (e.key === 'Escape') {
                        document.removeEventListener('keydown', keyHandler);
                        this._closeOverlay(overlay);
                        safeResolve(false);
                    }
                };
                document.addEventListener('keydown', keyHandler);
            });
        }

        modalPrompt(args) {
            const title = Cast.toString(args.TITLE || translate({id: 'ces9195ui'}));
            const placeholder = Cast.toString(args.PLACEHOLDER || '');
            const defaultVal = Cast.toString(args.DEFAULT || '');

            return new Promise((resolve) => {
                let resolved = false;
                const safeResolve = (val) => {
                    if (resolved) return;
                    resolved = true;
                    resolve(val);
                };

                const overlay = this._createOverlay(true);
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        this._closeOverlay(overlay);
                        safeResolve('');
                    }
                });

                const card = this._createCard('info');
                const body = document.createElement('div');
                body.className = 'glassui-card-body';

                const iconEl = this._createIconElement('info');
                if (iconEl) body.appendChild(iconEl);

                const titleEl = document.createElement('div');
                titleEl.className = 'glassui-title';
                titleEl.textContent = title;

                const inputWrap = document.createElement('div');
                inputWrap.className = 'glassui-input-wrap';
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'glassui-input';
                input.placeholder = placeholder;
                input.value = defaultVal;
                inputWrap.appendChild(input);

                const buttonsDiv = document.createElement('div');
                buttonsDiv.className = 'glassui-buttons';

                const cancelBtn = this._createButton(
                    (navigator.language || '').startsWith('zh') ? '取消' : 'Cancel',
                    'glassui-btn-secondary',
                    () => { this._closeOverlay(overlay); safeResolve(''); }
                );
                const okBtn = this._createButton(
                    (navigator.language || '').startsWith('zh') ? '确定' : 'OK',
                    'glassui-btn-primary',
                    () => { this._closeOverlay(overlay); safeResolve(input.value); }
                );

                buttonsDiv.appendChild(cancelBtn);
                buttonsDiv.appendChild(okBtn);

                body.appendChild(titleEl);
                body.appendChild(inputWrap);
                body.appendChild(buttonsDiv);
                card.appendChild(body);
                overlay.appendChild(card);

                // 自动聚焦
                setTimeout(() => { input.focus(); input.select(); }, 100);

                // 键盘支持
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this._closeOverlay(overlay);
                        safeResolve(input.value);
                    } else if (e.key === 'Escape') {
                        e.preventDefault();
                        this._closeOverlay(overlay);
                        safeResolve('');
                    }
                });
            });
        }

        // --- 角落通知 ---
        cornerNotify(args) {
            const position = Cast.toString(args.POSITION || 'top-right');
            const title = Cast.toString(args.TITLE || translate({id: 'ces9195ui'}));
            const content = Cast.toString(args.CONTENT || '');
            const duration = Math.max(1, Math.min(60, Cast.toNumber(args.DURATION || 4)));
            this._showCornerNotify(position, title, content, duration);
        }

        clearCornerNotifys() {
            Object.values(this._cornerContainers).forEach(container => {
                if (container && container.parentNode) {
                    const items = [...container.children];
                    items.forEach(item => {
                        item.classList.add('removing');
                        const handler = () => { if (item.parentNode) item.parentNode.removeChild(item); };
                        item.addEventListener('animationend', handler, {once: true});
                        const fallback = setTimeout(handler, 400);
                        this._timers.push(fallback);
                    });
                }
            });
        }

        // --- 选择弹窗 ---
        selectionModal(args) {
            const title = Cast.toString(args.TITLE || translate({id: 'ces9195ui'}));
            const optionsStr = Cast.toString(args.OPTIONS || '');
            const layout = Cast.toString(args.LAYOUT || 'list');
            const sepKey = Cast.toString(args.SEPARATOR || 'comma');
            const separator = getSeparatorValue(sepKey);

            const options = optionsStr.split(separator).map(s => s.trim()).filter(s => s !== '');

            return new Promise((resolve) => {
                let resolved = false;
                const safeResolve = (val) => {
                    if (resolved) return;
                    resolved = true;
                    resolve(val);
                };

                if (options.length === 0) {
                    safeResolve('');
                    return;
                }

                let selectedValue = '';

                const overlay = this._createOverlay(true);
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        this._closeOverlay(overlay);
                        safeResolve('');
                    }
                });

                const card = this._createCard('info');
                card.style.maxWidth = layout === 'grid' ? '480px' : '420px';
                const body = document.createElement('div');
                body.className = 'glassui-card-body';

                const titleEl = document.createElement('div');
                titleEl.className = 'glassui-title left-align';
                titleEl.textContent = title;
                body.appendChild(titleEl);

                if (layout === 'grid') {
                    // 网格布局
                    const grid = document.createElement('div');
                    grid.className = 'glassui-select-grid';
                    options.forEach(opt => {
                        const item = document.createElement('div');
                        item.className = 'glassui-select-grid-item';
                        item.textContent = opt;
                        item.addEventListener('click', () => {
                            grid.querySelectorAll('.glassui-select-grid-item').forEach(el => el.classList.remove('selected'));
                            item.classList.add('selected');
                            selectedValue = opt;
                        });
                        item.addEventListener('dblclick', () => {
                            selectedValue = opt;
                            this._closeOverlay(overlay);
                            safeResolve(opt);
                        });
                        grid.appendChild(item);
                    });
                    body.appendChild(grid);
                } else {
                    // 列表布局
                    const list = document.createElement('div');
                    list.className = 'glassui-select-list';
                    options.forEach(opt => {
                        const item = document.createElement('div');
                        item.className = 'glassui-select-item';
                        item.textContent = opt;
                        item.addEventListener('click', () => {
                            list.querySelectorAll('.glassui-select-item').forEach(el => el.classList.remove('selected'));
                            item.classList.add('selected');
                            selectedValue = opt;
                        });
                        item.addEventListener('dblclick', () => {
                            selectedValue = opt;
                            this._closeOverlay(overlay);
                            safeResolve(opt);
                        });
                        list.appendChild(item);
                    });
                    body.appendChild(list);
                }

                const buttonsDiv = document.createElement('div');
                buttonsDiv.className = 'glassui-buttons';
                buttonsDiv.appendChild(this._createButton(
                    (navigator.language || '').startsWith('zh') ? '取消' : 'Cancel',
                    'glassui-btn-secondary',
                    () => { this._closeOverlay(overlay); safeResolve(''); }
                ));
                buttonsDiv.appendChild(this._createButton(
                    (navigator.language || '').startsWith('zh') ? '确认选择' : 'Confirm',
                    'glassui-btn-primary',
                    () => { this._closeOverlay(overlay); safeResolve(selectedValue); }
                ));

                body.appendChild(buttonsDiv);
                card.appendChild(body);
                overlay.appendChild(card);
            });
        }

        // --- 进度弹窗 ---
        progressModal(args) {
            const title = Cast.toString(args.TITLE || translate({id: 'ces9195ui'}));
            const content = Cast.toString(args.CONTENT || translate({id: 'ces9195ui'}));
            this._showProgressModal(title, content);
        }

        updateProgress(args) {
            const percent = Cast.toNumber(args.PERCENT || 0);
            this._updateProgress(percent);
        }

        closeProgressModal() {
            this._closeProgressModal();
        }

        // --- 底部抽屉 ---
        bottomSheet(args) {
            const title = Cast.toString(args.TITLE || translate({id: 'ces9195ui'}));
            const content = Cast.toString(args.CONTENT || '');
            const height = Math.max(20, Math.min(90, Cast.toNumber(args.HEIGHT || 50)));
            this._showBottomSheet(title, content, height);
        }

        closeBottomSheet() {
            this._closeBottomSheet();
        }

        // --- 主题 ---
        setTheme(args) {
            const theme = Cast.toString(args.THEME || 'light');
            const color = Cast.toString(args.COLOR || '');
            this._applyTheme(theme, color || undefined);
        }

        getTheme() {
            return this._currentTheme;
        }
    }

    extensions.register(new GlassUI(runtime));
}(Scratch));