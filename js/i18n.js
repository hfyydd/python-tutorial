// 国际化配置
const i18nConfig = {
    'zh-CN': {
        name: '简体中文',
        flag: '🇨🇳',
        path: ''
    },
    'en': {
        name: 'English',
        flag: '🇺🇸',
        path: '/en'
    },
    'zh-TW': {
        name: '繁體中文',
        flag: '🇹🇼',
        path: '/zh-TW'
    },
    'ja': {
        name: '日本語',
        flag: '🇯🇵',
        path: '/ja'
    }
};

// 检测用户语言
function detectLanguage() {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && i18nConfig[savedLang]) {
        return savedLang;
    }

    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) {
        if (browserLang.includes('TW') || browserLang.includes('HK')) {
            return 'zh-TW';
        }
        return 'zh-CN';
    } else if (browserLang.startsWith('en')) {
        return 'en';
    } else if (browserLang.startsWith('ja')) {
        return 'ja';
    }
    return 'zh-CN';
}

// 获取当前语言
function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/zh-TW')) return 'zh-TW';
    if (path.startsWith('/ja')) return 'ja';
    return 'zh-CN';
}

// 切换语言
function switchLanguage(lang) {
    const currentLang = getCurrentLanguage();
    const currentPath = window.location.pathname;

    let newPath = currentPath;
    if (currentLang === 'zh-CN') {
        newPath = i18nConfig[lang].path + currentPath;
    } else if (lang === 'zh-CN') {
        newPath = currentPath.replace(/^\/(en|zh-TW|ja)/, '');
    } else {
        newPath = currentPath.replace(/^\/(en|zh-TW|ja)/, i18nConfig[lang].path);
    }

    if (newPath === '') newPath = '/';
    window.location.href = newPath;
}

// 保存语言偏好
function saveLanguagePreference(lang) {
    localStorage.setItem('preferredLang', lang);
}

// 渲染语言切换器
function renderLanguageSwitcher() {
    const currentLang = getCurrentLanguage();
    let html = '<div class="language-switcher">';

    for (const [code, config] of Object.entries(i18nConfig)) {
        const isActive = code === currentLang ? ' active' : '';
        html += `
            <button class="lang-btn${isActive}" onclick="switchLanguage('${code}')" data-lang="${code}">
                <span class="lang-flag">${config.flag}</span>
                <span class="lang-name">${config.name}</span>
            </button>
        `;
    }

    html += '</div>';
    return html;
}

// 页面加载时检查并跳转
function checkLanguageOnLoad() {
    const currentLang = getCurrentLanguage();
    const detectedLang = detectLanguage();

    // 只在首页时自动跳转
    if (window.location.pathname === '/' && currentLang !== detectedLang) {
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang && savedLang !== 'zh-CN') {
            window.location.href = i18nConfig[savedLang].path + '/';
        } else if (!savedLang && detectedLang !== 'zh-CN') {
            window.location.href = i18nConfig[detectedLang].path + '/';
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 插入语言切换器
    const navContent = document.querySelector('.navbar-content');
    if (navContent) {
        const switcherDiv = document.createElement('div');
        switcherDiv.innerHTML = renderLanguageSwitcher();
        navContent.appendChild(switcherDiv.firstElementChild);
    }

    checkLanguageOnLoad();
});
