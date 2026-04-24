// ========================================
// Sip - Modern Browser Startpage
// ========================================

// ========================================
// Browser Detection
// ========================================

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Mobile detection
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth <= 768;
};

// ========================================
// Supported Languages / Locales
// ========================================
const LOCALES = {
    sq: "Shqip",                    // Albanian
    af: "Afrikaans",                // Afrikaans
    ar: "العربية",                  // Arabic
    az: "Azərbaycan dili",          // Azerbaijani
    eu: "Euskara",                  // Basque
    be: "Беларуская",               // Belarusian
    bg: "Български",                // Bulgarian
    ca: "Català",                   // Catalan
    zh_cn: "简体中文",              // Chinese (Simplified)
    zh_tw: "繁體中文",              // Chinese (Traditional)
    hr: "Hrvatski",                 // Croatian
    cz: "Čeština",                  // Czech
    da: "Dansk",                    // Danish
    nl: "Nederlands",               // Dutch
    en: "English",                  // English
    fi: "Suomi",                    // Finnish
    fr: "Français",                 // French
    gl: "Galego",                   // Galician
    de: "Deutsch",                  // German
    el: "Ελληνικά",                 // Greek
    he: "עברית",                    // Hebrew
    hi: "हिन्दी",                      // Hindi
    hu: "Magyar",                   // Hungarian
    is: "Íslenska",                 // Icelandic
    id: "Bahasa Indonesia",         // Indonesian
    it: "Italiano",                 // Italian
    ja: "日本語",                   // Japanese
    kr: "한국어",                   // Korean
    ku: "Kurdî",                    // Kurdish (Kurmanji)
    la: "Latviešu",                 // Latvian
    lt: "Lietuvių",                 // Lithuanian
    mk: "Македонски",               // Macedonian
    no: "Norsk",                    // Norwegian
    fa: "فارسی",                    // Persian (Farsi)
    pl: "Polski",                   // Polish
    pt: "Português",                // Portuguese
    pt_br: "Português (Brasil)",    // Portuguese (Brazil)
    ro: "Română",                   // Romanian
    ru: "Русский",                  // Russian
    sr: "Српски",                   // Serbian
    sk: "Slovenčina",               // Slovak
    sl: "Slovenščina",              // Slovenian
    es: "Español",                  // Spanish
    sv: "Svenska",                  // Swedish
    th: "ไทย",                      // Thai
    tr: "Türkçe",                   // Turkish
    uk: "Українська",               // Ukrainian
    vi: "Tiếng Việt",               // Vietnamese
    zu: "isiZulu"                   // Zulu
};

// === Separators per locale ===
const GREETING_SEPARATORS = {
  en: ",", es: ",", fr: ",", de: ",", it: ",", pt: ",", pt_br: ",",
  ru: ",", ja: "、", zh_cn: "，", zh_tw: "，", kr: "、",
  hi: ",", ar: "،", he: ":"
};

// === Right-to-left language codes ===
const RTL_LANGS = ['ar', 'he', 'fa', 'ur', 'ps'];

// ========================================
// Default Data
// ========================================

const defaultLocale = (() => {
    const lang = (navigator.language || "en").toLowerCase();

    // Chinese special handling
    if (lang.startsWith("zh")) {
        return lang.includes("tw") ? "zh_tw" : "zh_cn";
    }

    // Brazilian Portuguese special handling
    if (lang.startsWith("pt")) {
        return lang.includes("br") ? "pt_br" : "pt";
    }

    // Direct match
    const base = lang.split("-")[0];
    return LOCALES[base] ? base : "en";
})();

const defaultGreetings = {
    'morning': 'Good morning',
    'afternoon': 'Good afternoon',
    'evening': 'Good evening',
    'night': 'Good night'
}

const defaultCategories = [
    { id: 'dev', name: 'Development', icon: 'fa-solid fa-code' },
    { id: 'social', name: 'Social', icon: 'fa-solid fa-users' },
    { id: 'media', name: 'Media', icon: 'fa-solid fa-play' },
    { id: 'productivity', name: 'Productivity', icon: 'fa-solid fa-briefcase' }
];

const defaultLinks = {
    'dev': [
        { name: 'GitHub', url: 'https://github.com', icon: 'fa-brands fa-github' },
        { name: 'GitLab', url: 'https://gitlab.com', icon: 'fa-brands fa-gitlab' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'fa-brands fa-stack-overflow' },
        { name: 'CodePen', url: 'https://codepen.io', icon: 'fa-brands fa-codepen' },
        { name: 'Vercel', url: 'https://vercel.com', icon: 'fa-solid fa-v' },
        { name: 'Docker', url: 'https://docker.com', icon: 'fa-brands fa-docker' }
    ],
    'social': [
        { name: 'Reddit', url: 'https://reddit.com', icon: 'fa-brands fa-reddit-alien' },
        { name: 'Twitter', url: 'https://twitter.com', icon: 'fa-brands fa-x-twitter' },
        { name: 'Discord', url: 'https://discord.com', icon: 'fa-brands fa-discord' },
        { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fa-brands fa-linkedin' },
        { name: 'Mastodon', url: 'https://mastodon.social', icon: 'fa-brands fa-mastodon' },
        { name: 'Twitch', url: 'https://twitch.tv', icon: 'fa-brands fa-twitch' }
    ],
    'media': [
        { name: 'YouTube', url: 'https://youtube.com', icon: 'fa-brands fa-youtube' },
        { name: 'Spotify', url: 'https://spotify.com', icon: 'fa-brands fa-spotify' },
        { name: 'Netflix', url: 'https://netflix.com', icon: 'fa-solid fa-film' },
        { name: 'SoundCloud', url: 'https://soundcloud.com', icon: 'fa-brands fa-soundcloud' },
        { name: 'Prime Video', url: 'https://primevideo.com', icon: 'fa-brands fa-amazon' },
        { name: 'Plex', url: 'https://plex.tv', icon: 'fa-solid fa-circle-play' }
    ],
    'productivity': [
        { name: 'Notion', url: 'https://notion.so', icon: 'fa-solid fa-book' },
        { name: 'Gmail', url: 'https://mail.google.com', icon: 'fa-solid fa-envelope' },
        { name: 'Calendar', url: 'https://calendar.google.com', icon: 'fa-solid fa-calendar-days' },
        { name: 'Drive', url: 'https://drive.google.com', icon: 'fa-brands fa-google-drive' },
        { name: 'Trello', url: 'https://trello.com', icon: 'fa-brands fa-trello' },
        { name: 'Figma', url: 'https://figma.com', icon: 'fa-brands fa-figma' }
    ]
};

const categoryColors = ['mauve', 'blue', 'red', 'green', 'peach', 'teal', 'pink', 'yellow'];

// ========================================
// Search Engine Configuration
// ========================================

const allSearchEngines = {
    google: {
        name: 'Google',
        url: 'https://www.google.com/search?q=',
        icon: '<i class="fa-brands fa-google"></i>'
    },
    duckduckgo: {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q=',
        icon: '<span class="nf-icon">󰇥</span>'
    },
    github: {
        name: 'GitHub',
        url: 'https://github.com/search?q=',
        icon: '<i class="fa-brands fa-github"></i>'
    },
    git: {
        name: 'Git',
        url: 'https://git-scm.com/search/results?search=',
        icon: '<i class="fa-brands fa-git-alt"></i>'
    },
    youtube: {
        name: 'YouTube',
        url: 'https://www.youtube.com/results?search_query=',
        icon: '<i class="fa-brands fa-youtube"></i>'
    },
    bing: {
        name: 'Bing',
        url: 'https://www.bing.com/search?q=',
        icon: '<i class="fa-brands fa-microsoft"></i>'
    },
    amazon: {
        name: 'Amazon',
        url: 'https://www.amazon.com/s?k=',
        icon: '<i class="fa-brands fa-amazon"></i>'
    },
    wikipedia: {
        name: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Special:Search?search=',
        icon: '<i class="fa-brands fa-wikipedia-w"></i>'
    },
    archive: {
        name: 'Internet Archive',
        url: 'https://archive.org/search?query=',
        icon: '<i class="fa-solid fa-box-archive"></i>'
    },
    kagi: {
        name: 'Kagi',
        url: 'https://kagi.com/search?q=',
        icon: '<i class="fa-brands fa-kaggle"></i>'
    }
};

// ========================================
// Settings Management
// ========================================

function loadSettings() {
    const mobile = isMobile();

    const defaults = {
        userName: '',
        colorScheme: 'catppuccin',
        theme: 'dark',
        colorMode: 'multi',
        font: 'jetbrains-mono',
        timeFormat: '12',
        showSeconds: 'false',
        tempUnit: 'F',
        showQuotes: 'true',
        leftSettings: 'false',
        showSearchBar: 'true',
        showCategories: 'true',
        preferredColumns: 'auto',
        enabledEngines: mobile ? ['google'] : ['google', 'duckduckgo', 'github', 'youtube'],
        preferredEngine: 'google',
        weatherLocation: 'New York,NY,US',
        openWeatherApiKey: '',
        linkBehavior: 'same',
        showKeyboardHints: mobile ? 'false' : 'true',
        keyboardHintsPosition: 'below',
        showCredits: 'true',
        density: mobile ? 'compact' : 'comfy',
        iconOnlyMode: 'false',
        headerLeft: 'greeting',
        headerRight: 'time-date',
        footerLeft: mobile ? 'blank' : 'weather',
        footerCenter: mobile ? 'weather' : 'blank',
        footerRight: mobile ? 'blank' : 'quotes',
        footerPinBottom: 'false',
        locale: defaultLocale,
        socialLinks: [],
        quotes: [
            '"The only way to do great work is to love what you do." - Steve Jobs',
            '"First, solve the problem. Then, write the code." - John Johnson',
            '"Simplicity is the soul of efficiency." - Austin Freeman',
            '"Make it work, make it right, make it fast." - Kent Beck',
            '"Talk is cheap. Show me the code." - Linus Torvalds',
            '"Creativity is intelligence having fun." - Albert Einstein',
            '"Done is better than perfect." - Sheryl Sandberg',
            '"Stay hungry, stay foolish." - Steve Jobs',
            '"Code is like humor. When you have to explain it, it\'s bad." - Cory House'
        ],
        customColors: {
            primary: '#cba6f7',
            secondary: '#89b4fa',
            accent: '#94e2d5',
            background: '#1e1e2e',
            surface: '#313244',
            text: '#cdd6f4'
        },
        tabTitle: 'startpage',
        favicon: null
    };

    return {
        userName: localStorage.getItem('userName') ??  defaults.userName,
        colorScheme: localStorage.getItem('colorScheme') ?? defaults.colorScheme,
        font: localStorage.getItem('font') ?? defaults.font,
        theme: localStorage.getItem('theme') ?? defaults.theme,
        colorMode: localStorage.getItem('colorMode') ?? defaults.colorMode,
        timeFormat: localStorage.getItem('timeFormat') ?? defaults.timeFormat,
        showSeconds: localStorage.getItem('showSeconds') ?? defaults.showSeconds,
        tempUnit: localStorage.getItem('tempUnit') ?? defaults.tempUnit,
        showQuotes: localStorage.getItem('showQuotes') ?? defaults.showQuotes,
        leftSettings: localStorage.getItem('leftSettings') ?? defaults.leftSettings,
        showSearchBar: localStorage.getItem('showSearchBar') ?? defaults.showSearchBar,
        showCategories: localStorage.getItem('showCategories') ?? defaults.showCategories,
        preferredColumns: localStorage.getItem('preferredColumns') ?? defaults.preferredColumns,
        enabledEngines: JSON.parse(localStorage.getItem('enabledEngines')) ?? defaults.enabledEngines,
        preferredEngine: localStorage.getItem('preferredEngine') ?? defaults.preferredEngine,
        weatherLocation: localStorage.getItem('weatherLocation') ?? defaults.weatherLocation,
        openWeatherApiKey: localStorage.getItem('openWeatherApiKey') ??  defaults.openWeatherApiKey,
        linkBehavior: localStorage.getItem('linkBehavior') ?? defaults.linkBehavior,
        showKeyboardHints: localStorage.getItem('showKeyboardHints') ?? defaults.showKeyboardHints,
        keyboardHintsPosition: localStorage.getItem('keyboardHintsPosition') ?? defaults.keyboardHintsPosition,
        showCredits: localStorage.getItem('showCredits') ?? defaults.showCredits,
        density: localStorage.getItem('density') ?? defaults.density,
        iconOnlyMode: localStorage.getItem('iconOnlyMode') ?? defaults.iconOnlyMode,
        headerLeft: localStorage.getItem('headerLeft') ?? defaults.headerLeft,
        headerRight: localStorage.getItem('headerRight') ?? defaults.headerRight,
        footerLeft: localStorage.getItem('footerLeft') ?? defaults.footerLeft,
        footerCenter: localStorage.getItem('footerCenter') ?? defaults.footerCenter,
        footerRight: localStorage.getItem('footerRight') ?? defaults.footerRight,
        footerPinBottom: localStorage.getItem('footerPinBottom') ?? defaults.footerPinBottom,
        socialLinks: JSON.parse(localStorage.getItem('socialLinks')) ?? defaults.socialLinks,
        locale: localStorage.getItem('locale') ?? defaults.locale,
        quotes: JSON.parse(localStorage.getItem('quotes')) ?? defaults.quotes,
        customColors: JSON.parse(localStorage.getItem('customColors') || JSON.stringify(defaults.customColors)),
        backgroundImage: localStorage.getItem('backgroundImage') || null,
        backgroundSize: localStorage.getItem('backgroundSize') || 'cover',
        backgroundBlur: localStorage.getItem('backgroundBlur') === 'true',
        tabTitle: localStorage.getItem('tabTitle') ?? defaults.tabTitle,
        favicon: localStorage.getItem('favicon') || null
    };
}

function saveSettings(key, value) {
    if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
    settings[key] = value;
}

function loadGreetings() {
    const saved = localStorage.getItem('greetings');
    if (!saved) return defaultGreetings;
    return JSON.parse(saved);
}

function loadCategories() {
    const saved = localStorage.getItem('categories');
    if (!saved) return [...defaultCategories];

    // Migrate old HTML format to simple class format
    const cats = JSON.parse(saved);
    return cats.map(cat => {
        // Check if icon is in old HTML format
        if (cat.icon && cat.icon.includes('<i class="')) {
            const match = cat.icon.match(/class="([^"]+)"/);
            if (match) {
                cat.icon = match[1];
            }
        }
        return cat;
    });
}

function saveCategories(cats) {
    localStorage.setItem('categories', JSON.stringify(cats));
}

function loadLinks() {
    const saved = localStorage.getItem('links');
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(defaultLinks));
}

function saveLinks(lnks) {
    localStorage.setItem('links', JSON. stringify(lnks));
}

// Initialize settings
let settings = loadSettings();
let greetings = loadGreetings();
let categories = loadCategories();
let links = loadLinks();
let currentEngine = settings.preferredEngine;
let weatherApiState = settings.openWeatherApiKey ? 'pending' : 'none'; // 'none' | 'pending' | 'ok' | 'error'

// ========================================
// Theme Management
// ========================================

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    saveSettings('theme', theme);
}

function applyColorScheme(scheme) {
    // Clear custom colors when switching away from custom
    if (scheme !== 'custom') {
        clearCustomColors();
    }

    document.documentElement.setAttribute('data-scheme', scheme);
    saveSettings('colorScheme', scheme);

    // Apply custom colors if custom scheme selected
    if (scheme === 'custom') {
        applyCustomColors();
    }

    // Update color mode visibility based on scheme
    updateColorModeVisibility();
}

function saveCustomColor(property, value) {
    const customColors = settings.customColors || {};
    customColors[property] = value;
    saveSettings('customColors', customColors);

    if (settings.colorScheme === 'custom') {
        applyCustomColors();
    }
}

function applyCustomColors() {
    const customColors = settings.customColors || {};
    const root = document.documentElement;

    // Apply primary colors
    if (customColors.primary) {
        root.style.setProperty('--primary', customColors.primary);
        root.style.setProperty('--mauve', customColors.primary);
    }
    if (customColors.secondary) {
        root.style.setProperty('--secondary', customColors.secondary);
        root.style.setProperty('--blue', customColors.secondary);
    }
    if (customColors.accent) {
        root.style.setProperty('--accent', customColors.accent);
        root.style.setProperty('--teal', customColors.accent);
    }

    // Apply background colors
    if (customColors.background) {
        root.style.setProperty('--base', customColors.background);
        root.style.setProperty('--crust', customColors.background);
    }

    // Apply surface colors
    if (customColors.surface) {
        root.style.setProperty('--surface0', customColors.surface);
        root.style.setProperty('--surface1', customColors.surface);
        root.style.setProperty('--mantle', customColors.surface);
        root.style.setProperty('--surface2', customColors.surface);
    }

    // Apply text colors
    if (customColors.text) {
        root.style.setProperty('--text', customColors.text);
        root.style.setProperty('--subtext0', customColors.text);
        root.style.setProperty('--subtext1', customColors.text);
        // Set overlay colors to slightly dimmed text color for tabs and other UI elements
        const textColor = customColors.text;
        // Calculate a dimmed version (increase opacity or lighten/darken)
        root.style.setProperty('--overlay0', textColor + 'cc'); // 80% opacity
        root.style.setProperty('--overlay1', textColor + '99'); // 60% opacity
        root.style.setProperty('--overlay2', textColor + '66'); // 40% opacity
    }

    // Set other accent colors to match primary/secondary for consistency
    if (customColors.primary) {
        root.style.setProperty('--pink', customColors.primary);
        root.style.setProperty('--flamingo', customColors.primary);
        root.style.setProperty('--rosewater', customColors.primary);
    }
    if (customColors.accent) {
        root.style.setProperty('--green', customColors.accent);
        root.style.setProperty('--sky', customColors.accent);
        root.style.setProperty('--sapphire', customColors.accent);
    }
    if (customColors.secondary) {
        root.style.setProperty('--lavender', customColors.secondary);
    }

    // Set gradients using custom colors
    if (customColors.primary && customColors.secondary) {
        root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${customColors.primary} 0%, ${customColors.secondary} 100%)`);
    }
    if (customColors.accent && customColors.secondary) {
        root.style.setProperty('--gradient-accent', `linear-gradient(135deg, ${customColors.accent} 0%, ${customColors.secondary} 100%)`);
    }

    // Set glass effects with custom background
    if (customColors.background) {
        // Parse background color to create glass effect
        const bg = customColors.background;
        // Extract RGB values if hex
        if (bg.startsWith('#')) {
            const r = parseInt(bg.slice(1, 3), 16);
            const g = parseInt(bg.slice(3, 5), 16);
            const b = parseInt(bg.slice(5, 7), 16);
            root.style.setProperty('--glass-bg', `rgba(${r}, ${g}, ${b}, 0.6)`);
        }
    }
}

function clearCustomColors() {
    const root = document.documentElement;

    // Remove semantic colors
    root.style.removeProperty('--primary');
    root.style.removeProperty('--secondary');
    root.style.removeProperty('--accent');

    // Remove base colors
    root.style.removeProperty('--base');
    root.style.removeProperty('--crust');

    // Remove surface colors
    root.style.removeProperty('--surface0');
    root.style.removeProperty('--surface1');
    root.style.removeProperty('--surface2');
    root.style.removeProperty('--mantle');

    // Remove text colors
    root.style.removeProperty('--text');
    root.style.removeProperty('--subtext0');
    root.style.removeProperty('--subtext1');

    // Remove overlay colors
    root.style.removeProperty('--overlay0');
    root.style.removeProperty('--overlay1');
    root.style.removeProperty('--overlay2');

    // Remove accent color variations
    root.style.removeProperty('--mauve');
    root.style.removeProperty('--blue');
    root.style.removeProperty('--teal');
    root.style.removeProperty('--pink');
    root.style.removeProperty('--flamingo');
    root.style.removeProperty('--rosewater');
    root.style.removeProperty('--green');
    root.style.removeProperty('--sky');
    root.style.removeProperty('--sapphire');
    root.style.removeProperty('--lavender');

    // Remove gradients
    root.style.removeProperty('--gradient-primary');
    root.style.removeProperty('--gradient-accent');

    // Remove glass effects
    root.style.removeProperty('--glass-bg');
}

function updateColorModeVisibility() {
    const colorModeItem = document.querySelector('[data-setting="colorMode"]')?.closest('.setting-item');
    const themeItem = document.querySelector('[data-setting="theme"]')?.closest('.setting-item');

    if (colorModeItem) {
        // Hide color mode option for monochrome scheme or disable for custom
        if (settings.colorScheme === 'monochrome') {
            colorModeItem.style.display = 'none';
        } else if (settings.colorScheme === 'custom') {
            colorModeItem.style.display = 'flex';
            colorModeItem.style.opacity = '0.5';
            colorModeItem.style.pointerEvents = 'none';
        } else {
            colorModeItem.style.display = 'flex';
            colorModeItem.style.opacity = '1';
            colorModeItem.style.pointerEvents = 'auto';
        }
    }

    if (themeItem) {
        // Disable mode toggle for custom scheme
        if (settings.colorScheme === 'custom') {
            themeItem.style.opacity = '0.5';
            themeItem.style.pointerEvents = 'none';
        } else {
            themeItem.style.opacity = '1';
            themeItem.style.pointerEvents = 'auto';
        }
    }
}

function applyColorMode(mode) {
    document.documentElement.setAttribute('data-color-mode', mode);
    saveSettings('colorMode', mode);
    renderLinksGrid();
}

function applyDensity(density) {
    document.documentElement.setAttribute('data-density', density);
    saveSettings('density', density);
}

function applyCategoriesVisibility() {
    const categoriesSection = document.querySelector('.links-grid');
    const isVisible = settings.showCategories !== 'false';

    if (categoriesSection) {
        categoriesSection.classList.toggle('categories-hidden', !isVisible);
    }
}

function applySettingsBtnPosition() {
    const toolbar = document.querySelector('.toolbar-btns');
    const leftSettings = settings.leftSettings === 'true';

    if (toolbar) {
        toolbar.classList.toggle('left', leftSettings);
    }
}

function applySearchVisibility() {
    const searchRow = document.querySelector('.search-row');
    const isVisible = settings.showSearchBar !== 'false';

    if (searchRow) {
        searchRow.classList.toggle('search-hidden', !isVisible);
    }

    if (searchInput) {
        searchInput.disabled = !isVisible;
        if (!isVisible) {
            searchInput.value = '';
            searchInput.blur();
            searchInput.setAttribute('tabindex', '-1');
        } else {
            searchInput.removeAttribute('tabindex');
        }
    }

    updateKeyboardHints();
}

function applyIconOnlyMode(iconOnly) {
    document.documentElement.setAttribute('data-icon-only', iconOnly);
    saveSettings('iconOnlyMode', iconOnly);
}

// Apply saved theme and color scheme immediately
applyTheme(settings.theme);
applyColorScheme(settings.colorScheme);
applyDensity(settings.density);
applyIconOnlyMode(settings.iconOnlyMode);

// If custom scheme is active, apply custom colors
if (settings.colorScheme === 'custom') {
    applyCustomColors();
}

// ========================================
// Background Image Management
// ========================================

function applyBackgroundImage() {
    const body = document.body;
    if (!body) return;

    if (settings.backgroundImage) {
        body.style.backgroundImage = `url(${settings.backgroundImage})`;

        // Apply background size based on setting
        switch (settings.backgroundSize) {
            case 'contain':
                body.style.backgroundSize = 'contain';
                break;
            case 'stretch':
                body.style.backgroundSize = '100% 100%';
                break;
            case 'auto':
                body.style.backgroundSize = 'auto';
                break;
            case 'cover':
            default:
                body.style.backgroundSize = 'cover';
                break;
        }

        body.style.backgroundPosition = 'center';
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundAttachment = 'fixed';

        // Apply blur if enabled
        if (settings.backgroundBlur) {
            // Create overlay to blur only the background
            let overlay = document.getElementById('bg-blur-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'bg-blur-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    pointer-events: none;
                    background-image: url(${settings.backgroundImage});
                    background-size: ${body.style.backgroundSize};
                    background-position: center;
                    background-repeat: no-repeat;
                    background-attachment: fixed;
                    filter: blur(10px);
                `;
                document.body.appendChild(overlay);
            } else {
                overlay.style.backgroundImage = `url(${settings.backgroundImage})`;
                overlay.style.backgroundSize = body.style.backgroundSize;
                overlay.style.filter = 'blur(10px)';
            }
            body.style.backgroundImage = '';
        } else {
            const overlay = document.getElementById('bg-blur-overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    } else {
        body.style.backgroundImage = '';
        const overlay = document.getElementById('bg-blur-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

function handleBackgroundImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        settings.backgroundImage = imageData;
        saveSettings('backgroundImage', imageData);
        applyBackgroundImage();
        updateBackgroundImageUI();
    };
    reader.readAsDataURL(file);
}

function removeBackgroundImage() {
    settings.backgroundImage = null;
    localStorage.removeItem('backgroundImage');
    applyBackgroundImage();
    updateBackgroundImageUI();
}

function updateBackgroundImageUI() {
    const previewSection = document.getElementById('background-preview-section');
    const previewImg = document.getElementById('background-preview');
    const removeBtn = document.getElementById('remove-background-btn');
    const sizeSection = document.getElementById('background-size-section');
    const sizeSelect = document.getElementById('background-size-select');
    const blurSection = document.getElementById('background-blur-section');

    if (settings.backgroundImage) {
        previewImg.src = settings.backgroundImage;
        previewSection.style.display = 'flex';
        removeBtn.style.display = 'flex';
        sizeSection.style.display = 'flex';
        if (blurSection) blurSection.style.display = 'flex';

        if (sizeSelect) {
            sizeSelect.value = settings.backgroundSize || 'cover';
        }

        // Update blur toggle buttons
        if (blurSection) {
            const blurButtons = blurSection.querySelectorAll('.toggle-btn');
            blurButtons.forEach(btn => {
                if (btn.dataset.value === String(settings.backgroundBlur)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    } else {
        previewSection.style.display = 'none';
        removeBtn.style.display = 'none';
        sizeSection.style.display = 'none';
        if (blurSection) blurSection.style.display = 'none';
    }
}

// ========================================
// Tab Title & Favicon Functions
// ========================================

function applyTabTitle(title) {
    document.title = title || 'startpage';
}

function applyFavicon(dataUrl) {
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
        link = document.createElement('link');
        document.head.appendChild(link);
    }
    if (dataUrl) {
        link.type = 'image/png';
        link.href = dataUrl;
    } else {
        link.type = 'image/x-icon';
        link.href = 'icons/favicon.ico';
    }
}

function handleFaviconUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
        showNotification('Favicon image should be less than 1MB', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const dataUrl = e.target.result;
        saveSettings('favicon', dataUrl);
        applyFavicon(dataUrl);
        updateFaviconResetBtn();
    };
    reader.readAsDataURL(file);
}

function resetFavicon() {
    localStorage.removeItem('favicon');
    settings.favicon = null;
    applyFavicon(null);
    updateFaviconResetBtn();
}

function updateFaviconResetBtn() {
    const resetBtn = document.getElementById('reset-favicon-btn');
    if (resetBtn) {
        resetBtn.style.display = settings.favicon ? 'flex' : 'none';
    }
}

// ========================================
// DOM Elements
// ========================================

let searchInput, timeElement, dateElement, greetingElement, weatherElement, quoteElement, linksGrid;

// ========================================
// Time & Date Functions
// ========================================

function updateDateTime() {
    if (!timeElement || !dateElement) return;

    const now = new Date();

    const use12Hour = settings.timeFormat === '12';
    const showSeconds = settings.showSeconds === 'true';
    const locale = settings.locale;

    const timeString = now.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
        hour12: use12Hour
    });

    timeElement.textContent = timeString;

    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString(locale, options);

    updateGreeting(now.getHours());
}

function getTimeBasedGreeting(hour) {
    if (hour >= 5 && hour < 12) {
        greeting = greetings.morning;
        iconHtml = '<span class="nf-icon">󰖜</span>';
    } else if (hour >= 12 && hour < 17) {
        greeting = greetings.afternoon;
        iconHtml = '<i class="fa-solid fa-sun"></i>';
    } else if (hour >= 17 && hour < 21) {
        greeting = greetings.evening;
        iconHtml = '<span class="nf-icon">󰖛</span>';
    } else {
        greeting = greetings.night;
        iconHtml = '<i class="fa-solid fa-moon"></i>';
    }
    return { greeting, iconHtml };
}

function greet(name, hour = 12, locale = 'en') {
    // Normalize locale (lowercase, replace dash with underscore)
    locale = locale.toLowerCase().replace('-', '_');
    const lang = locale.split('_')[0];

    const sep = GREETING_SEPARATORS[locale] || GREETING_SEPARATORS[lang] || ',';
    let { greeting, iconHtml } = getTimeBasedGreeting(hour);

    greeting = name ? `${greeting}${sep} ${name}` : greeting;

    // Wrap in RTL marks if needed
    if (RTL_LANGS.includes(lang)) {
        greeting = `\u202B${greeting}\u202C`; // RLE and PDF marks
    }

    return { greeting, iconHtml };
}

function updateGreeting(hour) {
    if (!greetingElement) return;

    let greeting, iconHtml;
    const userName = settings.userName;
    const greetingData = greet(userName, hour, settings.locale);
    greeting = greetingData.greeting;
    iconHtml = greetingData.iconHtml;

    greetingElement.textContent = greeting;

    const iconElement = document.getElementById('greeting-icon');
    if (iconElement) {
        iconElement.innerHTML = iconHtml;
    }
}

// ========================================
// Search Functions
// ========================================

function performSearch(query) {
    if (!query.trim()) return;

    // Use Chrome Search API if available (respects user's default search engine)
    if (typeof chrome !== 'undefined' && chrome.search && chrome.search.query) {
        chrome.search.query({
            text: query,
            disposition: 'CURRENT_TAB'
        });
    } else {
        // Fallback for Firefox or when Chrome Search API is not available
        const engine = allSearchEngines[currentEngine];
        if (!engine) return;

        const searchUrl = engine.url + encodeURIComponent(query);
        window.location.href = searchUrl;
    }
}

function setSearchEngine(engine) {
    if (!allSearchEngines[engine]) return;
    if (!settings.enabledEngines.includes(engine)) return;

    currentEngine = engine;
    saveSettings('preferredEngine', engine);

    document.querySelectorAll('.search-engines .engine').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.engine === engine);
    });

    if (searchInput) {
        searchInput.placeholder = `Search ${allSearchEngines[engine].name}... `;
    }
}

function renderSearchEngines() {
    const container = document.querySelector('.search-engines');
    if (!container) return;

    container.innerHTML = settings.enabledEngines.map((engineId, index) => {
        const engine = allSearchEngines[engineId];
        if (!engine) return '';
        return `
            <button class="engine ${engineId === currentEngine ? 'active' : ''}"
                    data-engine="${engineId}"
                    title="${engine.name} (${index + 1})">
                ${engine.icon}
            </button>
        `;
    }). join('');

    // Rebind click events
    container.querySelectorAll('.engine').forEach(btn => {
        btn.addEventListener('click', () => {
            setSearchEngine(btn.dataset.engine);
            if (searchInput) searchInput.focus();
        });
    });

    // Update keyboard hints
    updateKeyboardHints();
    applyCreditsVisibility();
    applyFooterPinBottom();
    applyKeyboardHintsPosition();
    applyFont(settings.font);
}

function updateKeyboardHints() {
    const hintsContainer = document.querySelector('.keyboard-hints');
    if (!hintsContainer) return;

    // Show or hide keyboard hints based on setting
    if (settings.showKeyboardHints === 'false') {
        hintsContainer.style.display = 'none';
        return;
    } else {
        hintsContainer.style.display = 'flex';
    }

    const engineCount = settings.enabledEngines.length;
    const maxEngines = 9; // Maximum possible engines
    const engineHint = engineCount > 1 ? `<kbd>1-${Math.min(engineCount, maxEngines)}</kbd> Engine` : '';

    hintsContainer.innerHTML = `
        <span class="hint"><kbd>/</kbd> Search</span>
        ${engineHint ?  `<span class="hint">${engineHint}</span>` : ''}
        <span class="hint"><kbd>Esc</kbd> Clear</span>
    `;
}

// ========================================
function applyCreditsVisibility() {
    const credits = document.querySelector('.developer-credits');
    if (credits) credits.style.display = settings.showCredits === 'false' ? 'none' : '';
}

function updateWeatherApiStatus() {
    const el = document.getElementById('weather-api-status');
    if (!el) return;
    if (weatherApiState === 'ok') {
        el.className = 'setting-description weather-api-status ok';
        el.innerHTML = '<i class="fa-solid fa-check"></i> Live weather enabled';
    } else if (weatherApiState === 'error') {
        el.className = 'setting-description weather-api-status warning';
        el.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Request failed — check key and location';
    } else if (weatherApiState === 'none') {
        el.className = 'setting-description weather-api-status warning';
        el.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> No API key — showing demo data';
    }
}

const fontFamilyMap = {
    'jetbrains-mono': "'JetBrains Mono'",
    'fira-code': "'Fira Code'",
    'source-code-pro': "'Source Code Pro'",
    'ibm-plex-mono': "'IBM Plex Mono'",
    'inconsolata': "'Inconsolata'",
    'space-mono': "'Space Mono'",
};

function applyFont(font) {
    const family = fontFamilyMap[font] ?? fontFamilyMap['jetbrains-mono'];
    document.documentElement.style.setProperty('--font-mono', family);
}

function applyFooterPinBottom() {
    const linksGrid = document.getElementById('links-grid');
    if (linksGrid) linksGrid.classList.toggle('footer-pinned', settings.footerPinBottom === 'true');
}

function applyKeyboardHintsPosition() {
    const hints = document.querySelector('.keyboard-hints');
    const footer = document.querySelector('footer.footer');
    if (!hints || !footer) return;
    if (settings.keyboardHintsPosition === 'above') {
        footer.before(hints);
        hints.classList.add('hints-above-footer');
    } else {
        footer.after(hints);
        hints.classList.remove('hints-above-footer');
    }
}

// Weather Function (OpenWeather API Integration)
// ========================================

async function updateWeather() {
    if (!weatherElement) return;

    // Check if API key is configured
    if (!settings.openWeatherApiKey || !settings.weatherLocation) {
        // Fall back to mock weather data if no API key or location
        showMockWeather();
        return;
    }

    let query = `q=${encodeURIComponent(settings.weatherLocation)}`;
    // Optionally, use geolocation:
    // if ('geolocation' in navigator) {
    //     navigator.geolocation. getCurrentPosition(pos => {
    //         query = `lat=${pos.coords. latitude}&lon=${pos.coords.longitude}`;
    //         fetchWeather(query);
    //     }, () => {
    //         fetchWeather(query);
    //     });
    // } else {
    //     fetchWeather(query);
    // }
    // For now, just use city name:
    fetchWeather(query);
}

async function fetchWeather(query) {
    try {
        const unit = settings.tempUnit === 'C' ? 'metric' : 'imperial';
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${settings.openWeatherApiKey}&units=${unit}&lang=${settings.locale}`
        );

        if (!response.ok) {
            console.error('Weather API error:', response.status, response.statusText);
            throw new Error('Weather API error');
        }

        const data = await response.json();

        // Get temperature, condition, and icon info
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const tempUnit = unit === 'metric' ? '°C' : '°F';

        // Get the parent widget and find the icon element
        const widgetElement = weatherElement.parentElement;
        if (widgetElement) {
            const iconElement = widgetElement.querySelector('.widget-icon');
            if (iconElement) {
                // Show OpenWeather icon
                iconElement.innerHTML = `<img src="${iconUrl}" alt="" style="width:2em;height:2em;margin:-0.25em 0;vertical-align:middle;">`;
            }
        }

        weatherElement.textContent = `${temp}${tempUnit} ${condition}`;
        weatherApiState = 'ok';
        updateWeatherApiStatus();
        weatherElement.parentElement?.querySelector('.weather-demo-badge')?.remove();
    } catch (err) {
        console.error('Weather fetch error:', err);
        weatherApiState = 'error';
        updateWeatherApiStatus();
        showMockWeather();
    }
}

function showMockWeather() {
    if (!weatherElement) return;

    const mockWeatherData = [
        { tempF: 72, condition: 'Partly Cloudy', icon: 'fa-cloud-sun' },
        { tempF: 64, condition: 'Cloudy', icon: 'fa-cloud' },
        { tempF: 77, condition: 'Sunny', icon: 'fa-sun' },
        { tempF: 59, condition: 'Rainy', icon: 'fa-cloud-rain' },
        { tempF: 68, condition: 'Clear', icon: 'fa-moon' },
        { tempF: 45, condition: 'Thunderstorms', icon: 'fa-cloud-bolt' },
        { tempF: 28, condition: 'Snow', icon: 'fa-snowflake' },
        { tempF: 55, condition: 'Windy', icon: 'fa-wind' }
    ];

    const weather = mockWeatherData[Math.floor(Math.random() * mockWeatherData. length)];

    let temp, unit;
    if (settings.tempUnit === 'C') {
        temp = Math.round((weather.tempF - 32) * 5 / 9);
        unit = '°C';
    } else {
        temp = weather.tempF;
        unit = '°F';
    }

    weatherElement.textContent = `${temp}${unit} ${weather.condition}`;

    // Get the parent widget and find the icon element
    const widgetElement = weatherElement.parentElement;
    if (widgetElement) {
        const iconElement = widgetElement.querySelector('.widget-icon');
        if (iconElement) {
            iconElement.innerHTML = `<i class="fa-solid ${weather.icon}"></i>`;
        }
        if (!widgetElement.querySelector('.weather-demo-badge')) {
            const badge = document.createElement('span');
            badge.className = 'weather-demo-badge';
            badge.title = 'Showing demo data · Add an API key in Settings → Widgets';
            badge.textContent = 'demo';
            widgetElement.appendChild(badge);
        }
    }
}

// ========================================
// Weather Forecast Function (3-Day)
// ========================================

async function updateForecast() {
    // Check if API key is configured
    if (!settings.openWeatherApiKey || !settings.weatherLocation) {
        // Fall back to mock forecast data if no API key or location
        showMockForecast();
        return;
    }

    const query = `q=${encodeURIComponent(settings.weatherLocation)}`;
    fetchForecast(query);
}

async function fetchForecast(query) {
    try {
        const unit = settings.tempUnit === 'C' ? 'metric' : 'imperial';
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${settings.openWeatherApiKey}&units=${unit}&cnt=40&lang=${settings.locale}`
        );

        if (!response.ok) {
            console.error('Forecast API error:', response.status, response.statusText);
            throw new Error('Forecast API error');
        }

        const data = await response.json();

        // Process forecast data to get one forecast per day (noon time), starting from tomorrow
        const dailyForecasts = [];
        const processedDates = new Set();
        const today = new Date().toDateString();

        for (const item of data.list) {
            const date = new Date(item.dt * 1000);
            const dateStr = date.toDateString();

            // Skip today, get forecast around noon for each day (12:00 PM)
            if (dateStr !== today && !processedDates.has(dateStr) && date.getHours() >= 12 && date.getHours() <= 15) {
                processedDates.add(dateStr);
                dailyForecasts.push({
                    date: date,
                    temp: Math.round(item.main.temp),
                    tempMax: Math.round(item.main.temp_max),
                    tempMin: Math.round(item.main.temp_min),
                    condition: item.weather[0].description,
                    icon: item.weather[0].icon
                });

                if (dailyForecasts.length === 3) break;
            }
        }

        renderForecastWidget(dailyForecasts);
    } catch (err) {
        console.error('Forecast fetch error:', err);
        showMockForecast();
    }
}

function showMockForecast() {
    const today = new Date();
    const mockDailyForecasts = [];

    // Generate 3 days starting from tomorrow
    for (let i = 1; i <= 3; i++) {
        const forecastDate = new Date(today);
        forecastDate.setDate(today.getDate() + i);

        const mockConditions = [
            { temp: 72, tempMax: 75, tempMin: 65, condition: 'Sunny', icon: 'fa-sun' },
            { temp: 68, tempMax: 70, tempMin: 62, condition: 'Cloudy', icon: 'fa-cloud' },
            { temp: 65, tempMax: 68, tempMin: 60, condition: 'Rainy', icon: 'fa-cloud-rain' },
            { temp: 70, tempMax: 73, tempMin: 64, condition: 'Partly Cloudy', icon: 'fa-cloud-sun' },
            { temp: 74, tempMax: 77, tempMin: 66, condition: 'Clear', icon: 'fa-sun' }
        ];

        const condition = mockConditions[i % mockConditions.length];

        mockDailyForecasts.push({
            date: forecastDate,
            temp: condition.temp,
            tempMax: condition.tempMax,
            tempMin: condition.tempMin,
            condition: condition.condition,
            icon: condition.icon
        });
    }

    const tempUnit = settings.tempUnit === 'C' ? 'metric' : 'imperial';

    // Convert to Celsius if needed
    const forecasts = mockDailyForecasts.map(forecast => {
        if (settings.tempUnit === 'C') {
            return {
                ...forecast,
                temp: Math.round((forecast.temp - 32) * 5 / 9),
                tempMax: Math.round((forecast.tempMax - 32) * 5 / 9),
                tempMin: Math.round((forecast.tempMin - 32) * 5 / 9)
            };
        }
        return forecast;
    });

    renderForecastWidget(forecasts, true);
}

function renderForecastWidget(forecasts, isMock = false) {
    const forecastWidget = document.querySelector('.forecast-widget');
    if (!forecastWidget) return;

    const forecastHTML = forecasts.map((forecast, index) => {
        const date = forecast.date ?? new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000);
        const dayName = new Intl.DateTimeFormat(settings.locale, { weekday: 'short' }).format(date);

        let iconHTML;
        if (isMock) {
            iconHTML = `<i class="fa-solid ${forecast.icon}"></i>`;
        } else if (forecast.icon && forecast.icon.startsWith('fa-')) {
            iconHTML = `<i class="fa-solid ${forecast.icon}"></i>`;
        } else {
            const iconUrl = `https://openweathermap.org/img/wn/${forecast.icon}@2x.png`;
            iconHTML = `<img src="${iconUrl}" alt="${forecast.condition}">`;
        }

        return `
            <div class="forecast-day">
                <div class="forecast-day-name">${dayName}</div>
                <div class="forecast-icon">${iconHTML}</div>
                <div class="forecast-temp-range">${forecast.tempMax}° / ${forecast.tempMin}°</div>
            </div>
        `;
    }).join('');

    forecastWidget.innerHTML = `<div class="forecast-days">${forecastHTML}</div>`;

    const forecastDays = forecastWidget.querySelector('.forecast-days');
    let badge = forecastDays.querySelector('.weather-demo-badge');
    if (isMock) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'weather-demo-badge';
            badge.title = 'Showing demo data · Add an API key in Settings → Widgets';
            badge.textContent = 'demo';
            forecastDays.appendChild(badge);
        }
    } else {
        badge?.remove();
    }
}

// ========================================
// Quotes Function
// ========================================

// Remove the hardcoded quotes array - now using settings.quotes

function updateQuote() {
    const quoteWidget = document.querySelector('.quote-widget');
    if (!quoteWidget || !quoteElement) return;

    if (settings.showQuotes === 'true') {
        quoteWidget.style.display = 'flex';
        const quotes = settings.quotes || [];
        if (quotes.length > 0) {
            quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];
        } else {
            quoteElement.textContent = '"Add some quotes in Settings!"';
        }
    } else {
        quoteWidget.style.display = 'none';
    }
}

// ========================================
// Social Links Functions
// ========================================

function renderSocialLinks() {
    // Get or create social links container
    let socialWidget = document.querySelector('.social-widget');

    if (!socialWidget) {
        socialWidget = document.createElement('div');
        socialWidget.className = 'widget social-widget';
        socialWidget.innerHTML = '<div class="social-icons"></div>';
    }

    const iconsContainer = socialWidget.querySelector('.social-icons');
    if (!iconsContainer) return;

    // Filter visible social links
    const visibleLinks = settings.socialLinks.filter(link => link.visible && link.url);

    if (visibleLinks.length > 0) {
        const target = settings.linkBehavior === 'new-tab' ? '_blank' : (settings.linkBehavior === 'new-window' ? '_blank' : '_self');
        iconsContainer.innerHTML = visibleLinks.map(link => {
            return `<a href="${link.url}" target="${target}" title="${link.name}" class="social-icon" data-link-behavior="${settings.linkBehavior}"><i class="${link.icon}"></i></a>`;
        }).join('');

        // Add click handlers for social links
        iconsContainer.querySelectorAll('.social-icon').forEach(link => {
            link.addEventListener('click', function(e) {
                const behavior = this.getAttribute('data-link-behavior');
                if (behavior === 'new-tab' || behavior === 'new-window') {
                    e.preventDefault();
                    window.open(this.href, '_blank', 'noopener,noreferrer');
                }
            });
        });
    } else {
        iconsContainer.innerHTML = '';
    }

    return socialWidget;
}

// ========================================
// Header Management
// ========================================

function updateHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    // Clear existing content
    header.innerHTML = '';

    // Create sections based on settings
    const leftWidget = createHeaderWidget(settings.headerLeft, 'left');
    const rightWidget = createHeaderWidget(settings.headerRight, 'right');

    // Check if both widgets are blank
    const bothBlank = settings.headerLeft === 'blank' && settings.headerRight === 'blank';

    if (bothBlank) {
        header.style.display = 'none';
        return;
    }

    header.style.display = 'flex';

    if (leftWidget) {
        header.appendChild(leftWidget);
    }

    if (rightWidget) {
        rightWidget.classList.add('header-right');
        header.appendChild(rightWidget);
    }
}

function createHeaderWidget(type, position) {
    if (type === 'blank') return null;

    if (type === 'greeting') {
        const widget = document.createElement('div');
        widget.className = 'greeting';
        widget.innerHTML = `
            <span class="icon" id="greeting-icon"><i class="fa-solid fa-sun"></i></span>
            <span class="greeting-text" id="greeting">Good evening</span>
        `;
        // Reassign greetingElement
        setTimeout(() => {
            greetingElement = document.getElementById('greeting');
            updateGreeting(new Date().getHours());
        }, 0);
        return widget;
    }

    if (type === 'time-date') {
        const widget = document.createElement('div');
        widget.className = 'datetime';
        widget.innerHTML = `
            <span class="time" id="time">00:00</span>
            <span class="date" id="date">Loading...</span>
        `;
        // Reassign timeElement and dateElement
        setTimeout(() => {
            timeElement = document.getElementById('time');
            dateElement = document.getElementById('date');

            // Add click handler to toggle time format
            if (timeElement) {
                timeElement.style.cursor = 'pointer';
                timeElement.title = 'Click to toggle time format';
                timeElement.addEventListener('click', () => {
                    const newFormat = settings.timeFormat === '12' ? '24' : '12';
                    saveSettings('timeFormat', newFormat);
                    updateDateTime();
                    updateToggleStates();
                });
            }

            updateDateTime();
        }, 0);
        return widget;
    }

    return null;
}

// ========================================
// Footer Management
// ========================================

function updateFooter() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    // Clear existing content
    footer.innerHTML = '';

    // Create sections based on settings
    const sections = [
        { position: 'left', setting: settings.footerLeft },
        { position: 'center', setting: settings.footerCenter },
        { position: 'right', setting: settings.footerRight }
    ];

    // Check if all widgets are blank
    const allBlank = sections.every(section => section.setting === 'blank');

    if (allBlank) {
        footer.style.display = 'none';
        return;
    }

    footer.style.display = 'flex';

    sections.forEach(section => {
        const widget = createFooterWidget(section.setting);
        if (widget) {
            widget.style.flex = section.position === 'center' ? '1' : 'initial';
            widget.style.justifyContent = section.position === 'center' ? 'center' : (section.position === 'right' ? 'flex-end' : 'flex-start');
            footer.appendChild(widget);
        }
    });
}

function createFooterWidget(type) {
    if (type === 'blank') return null;

    if (type === 'weather') {
        const widget = document.createElement('div');
        widget.className = 'widget weather-widget';
        widget.innerHTML = `
            <span class="widget-icon"><i class="fa-solid fa-cloud-sun"></i></span>
            <span class="widget-text" id="weather">Loading...</span>
        `;
        // Reassign weatherElement
        setTimeout(() => {
            weatherElement = document.getElementById('weather');
            updateWeather();
        }, 0);
        return widget;
    }

    if (type === 'forecast') {
        const widget = document.createElement('div');
        widget.className = 'forecast-widget';
        widget.innerHTML = '<div class="forecast-days">Loading forecast...</div>';
        // Fetch forecast data
        setTimeout(() => {
            updateForecast();
        }, 0);
        return widget;
    }

    if (type === 'quotes') {
        const widget = document.createElement('div');
        widget.className = 'widget quote-widget';
        widget.innerHTML = `
            <span class="widget-icon"><i class="fa-solid fa-quote-left"></i></span>
            <span class="widget-text" id="quote">"The only way to do great work is to love what you do."</span>
        `;
        // Reassign quoteElement
        setTimeout(() => {
            quoteElement = document.getElementById('quote');
            updateQuote();
        }, 0);
        return widget;
    }
    
    if (type === 'socials') {
        return renderSocialLinks();
    }

    return null;
}

// ========================================
// Links Grid Rendering
// ========================================

function renderLinksGrid() {
    if (!linksGrid) return;

    const colorMode = settings.colorMode;
    const linkTarget = settings.linkBehavior === 'new-tab' ? '_blank' : (settings.linkBehavior === 'new-window' ? '_blank' : '_self');

    linksGrid.innerHTML = categories.map((category, index) => {
        const categoryLinks = links[category.id] || [];
        const colorClass = colorMode === 'multi' ? categoryColors[index % categoryColors.length] : 'mauve';

        return `
            <section class="link-group" data-category="${category.id}" data-color="${colorClass}">
                <h2 class="group-title">
                    <span class="title-icon"><i class="${category.icon}"></i></span>
                    ${category.name}
                </h2>
                <div class="links">
                    ${categoryLinks.map(link => `
                        <a href="${link.url}" class="link-card" target="${linkTarget}" data-link-behavior="${settings.linkBehavior}">
                            <span class="link-icon"><i class="${link.icon || 'fa-solid fa-link'}"></i></span>
                            <span class="link-text">${link.name}</span>
                        </a>
                    `).join('')}
                </div>
            </section>
        `;
    }).join('');

    // Add click handlers for link behavior
    document.querySelectorAll('.link-card').forEach(link => {
        link.addEventListener('click', function(e) {
            const behavior = this.getAttribute('data-link-behavior');
            if (behavior === 'new-tab' || behavior === 'new-window') {
                e.preventDefault();
                window.open(this.href, '_blank', 'noopener,noreferrer');
            }
            // 'same' uses target="_self" (default browser behavior)
        });
    });

    updateGridLayout();
}

function updateGridLayout() {
    if (!linksGrid) return;

    const categoryCount = categories.length;

    linksGrid.classList.remove('grid-single', 'grid-even', 'grid-odd', 'grid-custom');
    linksGrid.style.removeProperty('--links-grid-columns');

    const preferredColumns = settings.preferredColumns || 'auto';
    const preferredValue = parseInt(preferredColumns, 10);

    if (preferredColumns !== 'auto' && Number.isFinite(preferredValue) && preferredValue > 0) {
        const safeColumns = Math.min(4, Math.max(1, preferredValue));
        linksGrid.classList.add('grid-custom');
        linksGrid.style.setProperty('--links-grid-columns', safeColumns);
        return;
    }

    if (categoryCount === 1) {
        linksGrid.classList.add('grid-single');
    } else if (categoryCount % 2 === 0) {
        linksGrid.classList.add('grid-even');
    } else {
        linksGrid.classList.add('grid-odd');
    }
}

// ========================================
// Settings Modal Functions
// ========================================

function initSettings() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsFab = document.getElementById('settings-fab');
    const settingsOverlay = document.getElementById('settings-overlay');
    const settingsClose = document.getElementById('settings-close');

    if (!settingsOverlay || !settingsClose) return;

    // Open settings from both button and FAB
    const openSettings = () => {
        settingsOverlay.classList.add('active');
        populateSettingsUI();
    };

    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettings);
    }

    if (settingsFab) {
        settingsFab.addEventListener('click', openSettings);
    }

    // Close settings
    settingsClose.addEventListener('click', () => {
        settingsOverlay.classList.remove('active');
    });

    // Close on overlay click
    settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) {
            settingsOverlay.classList. remove('active');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (settingsOverlay.classList.contains('active')) {
                settingsOverlay.classList.remove('active');
            }
        }
    });

    // Tab switching
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;

            document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.querySelector(`[data-panel="${tabId}"]`).classList.add('active');

            if (tabId === 'categories') {
                renderCategoriesSettings();
            } else if (tabId === 'links') {
                renderLinksSettings();
            } else if (tabId === 'layout') {
                renderHeaderSettings();
                renderFooterSettings();
            } else if (tabId === 'widgets') {
                renderGreetingSettings();
                renderSocialLinksSettings();
                renderQuotesSettings();
            } else if (tabId === 'help') {
                // Help tab - content is static in HTML
            }
        });
    });

    // Toggle button handlers
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const setting = btn.dataset.setting;
            const value = btn.dataset.value;

            saveSettings(setting, value);
            updateToggleStates();

            if (setting === 'colorScheme') {
                applyColorScheme(value);
            } else if (setting === 'theme') {
                applyTheme(value);
            } else if (setting === 'colorMode') {
                applyColorMode(value);
            } else if (setting === 'density') {
                applyDensity(value);
            } else if (setting === 'timeFormat') {
                updateDateTime();
            } else if (setting === 'iconOnlyMode') {
                applyIconOnlyMode(value);
            } else if (setting === 'showSeconds') {
                updateDateTime();
            } else if (setting === 'tempUnit') {
                updateWeather();
            } else if (setting === 'showQuotes') {
                updateQuote();
            } else if (setting === 'linkBehavior') {
                renderLinksGrid();
            } else if (setting === 'showKeyboardHints') {
                updateKeyboardHints();
            } else if (setting === 'keyboardHintsPosition') {
                applyKeyboardHintsPosition();
            } else if (setting === 'showCredits') {
                applyCreditsVisibility();
            } else if (setting === 'footerPinBottom') {
                applyFooterPinBottom();
            } else if (setting === 'leftSettings') {
                applySettingsBtnPosition();
            } else if (setting === 'showSearchBar') {
                applySearchVisibility();
            } else if (setting === 'showCategories') {
                applyCategoriesVisibility();
            } else if (setting === 'headerLeft' || setting === 'headerRight') {
                updateHeader();
            } else if (setting === 'footerLeft' || setting === 'footerCenter' || setting === 'footerRight') {
                updateFooter();
            } else if (setting === 'backgroundBlur') {
                settings.backgroundBlur = (value === 'true');
                applyBackgroundImage();
            }
        });
    });

    // Name input handler
    const nameInput = document.getElementById('setting-name');
    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            saveSettings('userName', e.target.value);
            updateGreeting(new Date().getHours());
        });
    }

    // Color scheme dropdown handler
    const colorSchemeSelect = document.getElementById('color-scheme-select');
    if (colorSchemeSelect) {
        colorSchemeSelect.addEventListener('change', (e) => {
            const scheme = e.target.value;
            applyColorScheme(scheme);

            // Show/hide custom colors section and handle restrictions
            const customColorsSection = document.getElementById('custom-colors-section');
            const colorModeToggle = document.getElementById('color-mode-toggle');
            const themeToggle = document.querySelector('[data-setting="theme"]')?.closest('.setting-item');

            if (scheme === 'custom') {
                if (customColorsSection) customColorsSection.style.display = 'block';
                // Force single color mode for custom theme
                if (settings.colorMode !== 'single') {
                    saveSettings('colorMode', 'single');
                    updateToggleStates();
                    renderLinksGrid();
                }
                // Disable color mode toggle
                if (colorModeToggle) {
                    colorModeToggle.querySelectorAll('.toggle-btn').forEach(btn => {
                        btn.disabled = true;
                        btn.style.opacity = '0.5';
                        btn.style.cursor = 'not-allowed';
                    });
                }
                // Disable theme (light/dark) toggle
                if (themeToggle) {
                    const toggleBtns = themeToggle.querySelectorAll('.toggle-btn');
                    toggleBtns.forEach(btn => {
                        btn.disabled = true;
                        btn.style.opacity = '0.5';
                        btn.style.cursor = 'not-allowed';
                    });
                }
            } else {
                if (customColorsSection) customColorsSection.style.display = 'none';
                // Re-enable color mode toggle
                if (colorModeToggle) {
                    colorModeToggle.querySelectorAll('.toggle-btn').forEach(btn => {
                        btn.disabled = false;
                        btn.style.opacity = '';
                        btn.style.cursor = '';
                    });
                }
                // Re-enable theme toggle
                if (themeToggle) {
                    const toggleBtns = themeToggle.querySelectorAll('.toggle-btn');
                    toggleBtns.forEach(btn => {
                        btn.disabled = false;
                        btn.style.opacity = '';
                        btn.style.cursor = '';
                    });
                }
            }
        });
    }

    // Preferred columns dropdown handler
    const preferredColumnsSelect = document.getElementById('setting-preferred-columns');
    if (preferredColumnsSelect) {
        preferredColumnsSelect.addEventListener('change', (e) => {
            saveSettings('preferredColumns', e.target.value);
            updateGridLayout();
        });
    }

    const fontSelect = document.getElementById('setting-font');
    if (fontSelect) {
        fontSelect.addEventListener('change', (e) => {
            saveSettings('font', e.target.value);
            applyFont(e.target.value);
        });
    }

    // Custom color pickers - sync between color input and hex input
    const customColorInputs = [
        { color: 'custom-primary', hex: 'custom-primary-hex', prop: 'primary' },
        { color: 'custom-secondary', hex: 'custom-secondary-hex', prop: 'secondary' },
        { color: 'custom-accent', hex: 'custom-accent-hex', prop: 'accent' },
        { color: 'custom-background', hex: 'custom-background-hex', prop: 'background' },
        { color: 'custom-surface', hex: 'custom-surface-hex', prop: 'surface' },
        { color: 'custom-text', hex: 'custom-text-hex', prop: 'text' }
    ];

    customColorInputs.forEach(({ color, hex, prop }) => {
        const colorInput = document.getElementById(color);
        const hexInput = document.getElementById(hex);

        if (colorInput && hexInput) {
            // Color picker changes hex input
            colorInput.addEventListener('input', (e) => {
                hexInput.value = e.target.value;
                saveCustomColor(prop, e.target.value);
            });

            // Hex input changes color picker
            hexInput.addEventListener('input', (e) => {
                const value = e.target.value;
                if (/^#[0-9A-F]{6}$/i.test(value)) {
                    colorInput.value = value;
                    saveCustomColor(prop, value);
                }
            });
        }
    });

    // Weather location input handler
    const locationInput = document.getElementById('setting-weather-location');
    if (locationInput) {
        locationInput.addEventListener('input', (e) => {
            saveSettings('weatherLocation', e.target.value);
        });

        // Update weather when user finishes typing (on blur)
        locationInput.addEventListener('blur', () => {
            updateWeather();
        });
    }

    // OpenWeather API key input handler
    const apiKeyInput = document.getElementById('setting-weather-api-key');
    if (apiKeyInput) {
        apiKeyInput.addEventListener('input', (e) => {
            saveSettings('openWeatherApiKey', e.target.value.trim());
            weatherApiState = settings.openWeatherApiKey ? 'pending' : 'none';
            updateWeatherApiStatus();
        });

        // Update weather when user finishes typing (on blur)
        apiKeyInput.addEventListener('blur', () => {
            updateWeather();
        });
    }

    // Greetings handlers
    const greetingInputs = document.querySelectorAll('.setting-input[id^="greeting-"]');
    greetingInputs.forEach(input => {
        const id = input.id.replace('greeting-', '');
        if (greetings[id]) {
            input.value = greetings[id];
        }

        // save on input
        input.addEventListener('input', (e) => {
            greetings[id] = e.target.value;
            saveSettings('greetings', greetings);
        });
    });

    // Background image upload handlers
    const backgroundImageBtn = document.getElementById('background-image-btn');
    const backgroundImageInput = document.getElementById('background-image-input');
    const removeBackgroundBtn = document.getElementById('remove-background-btn');
    const backgroundSizeSelect = document.getElementById('background-size-select');

    if (backgroundImageBtn && backgroundImageInput) {
        backgroundImageBtn.addEventListener('click', () => {
            backgroundImageInput.click();
        });

        backgroundImageInput.addEventListener('change', handleBackgroundImageUpload);
    }

    if (removeBackgroundBtn) {
        removeBackgroundBtn.addEventListener('click', removeBackgroundImage);
    }

    if (backgroundSizeSelect) {
        backgroundSizeSelect.addEventListener('change', (e) => {
            settings.backgroundSize = e.target.value;
            saveSettings('backgroundSize', e.target.value);
            applyBackgroundImage();
        });
    }

    // Tab title handler
    const tabTitleInput = document.getElementById('setting-tab-title');
    if (tabTitleInput) {
        tabTitleInput.addEventListener('input', (e) => {
            const title = e.target.value || 'startpage';
            saveSettings('tabTitle', title);
            applyTabTitle(title);
        });
    }

    // Favicon handlers
    const faviconBtn = document.getElementById('favicon-btn');
    const faviconInput = document.getElementById('favicon-input');
    const resetFaviconBtn = document.getElementById('reset-favicon-btn');

    if (faviconBtn && faviconInput) {
        faviconBtn.addEventListener('click', () => faviconInput.click());
        faviconInput.addEventListener('change', handleFaviconUpload);
    }

    if (resetFaviconBtn) {
        resetFaviconBtn.addEventListener('click', resetFavicon);
    }

    // Search engine checkboxes
    document.querySelectorAll('#search-engine-options input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const enabledEngines = [];
            document.querySelectorAll('#search-engine-options input:checked').forEach(cb => {
                enabledEngines.push(cb.dataset.engine);
            });

            if (enabledEngines.length === 0) {
                checkbox.checked = true;
                return;
            }

            saveSettings('enabledEngines', enabledEngines);

            if (!enabledEngines.includes(currentEngine)) {
                setSearchEngine(enabledEngines[0]);
            }

            renderSearchEngines();
        });
    });

    // Add category button
    const addCategoryBtn = document.getElementById('add-category-btn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', addCategory);
    }

    // Add link button
    const addLinkBtn = document.getElementById('add-link-btn');
    if (addLinkBtn) {
        addLinkBtn.addEventListener('click', addLink);
    }

    // Add quote button
    const addQuoteBtn = document.getElementById('add-quote-btn');
    if (addQuoteBtn) {
        addQuoteBtn.addEventListener('click', () => {
            if (settings.quotes.length < 20) {
                settings.quotes.push('"Your new quote here" - Author');
                saveSettings('quotes', settings.quotes);
                renderQuotesSettings();
                const list = document.getElementById('quotes-list');
                if (list) list.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // Category selector for links
    const linkCategorySelect = document.getElementById('link-category-select');
    if (linkCategorySelect) {
        linkCategorySelect.addEventListener('change', (e) => {
            const addLinkBtn = document.getElementById('add-link-btn');
            if (addLinkBtn) {
                addLinkBtn.disabled = !e.target.value;
            }
            renderLinksForCategory(e.target.value);
        });
    }

    // Locale events
    const localeSelect = document.getElementById('language-select');
    if (localeSelect) {
        localeSelect.addEventListener('change', (e) => {
            saveSettings('locale', e.target.value);
            // Re-fetch weather
            updateWeather();
            updateForecast();
        });
    }

    updateToggleStates();
}

function populateSettingsUI() {
    // Populate name input
    const nameInput = document.getElementById('setting-name');
    if (nameInput) {
        nameInput.value = settings.userName;
    }

    // Populate color scheme dropdown
    const colorSchemeSelect = document.getElementById('color-scheme-select');
    if (colorSchemeSelect) {
        colorSchemeSelect.value = settings.colorScheme;

        // Show/hide custom colors section
        const customColorsSection = document.getElementById('custom-colors-section');
        if (customColorsSection) {
            customColorsSection.style.display = settings.colorScheme === 'custom' ? 'block' : 'none';
        }
    }

    // Populate custom color inputs
    if (settings.customColors) {
        const colorMap = {
            'custom-primary': settings.customColors.primary,
            'custom-secondary': settings.customColors.secondary,
            'custom-accent': settings.customColors.accent,
            'custom-background': settings.customColors.background,
            'custom-surface': settings.customColors.surface,
            'custom-text': settings.customColors.text
        };

        Object.entries(colorMap).forEach(([id, value]) => {
            const colorInput = document.getElementById(id);
            const hexInput = document.getElementById(id + '-hex');
            if (colorInput) colorInput.value = value;
            if (hexInput) hexInput.value = value;
        });
    }

    // Populate weather location input
    const locationInput = document.getElementById('setting-weather-location');
    if (locationInput) {
        locationInput.value = settings.weatherLocation;
    }

    // Populate OpenWeather API key input
    const apiKeyInput = document.getElementById('setting-weather-api-key');
    if (apiKeyInput) {
        apiKeyInput.value = settings.openWeatherApiKey;
    }

    updateWeatherApiStatus();

    // Populate preferred columns dropdown
    const preferredColumnsSelect = document.getElementById('setting-preferred-columns');
    if (preferredColumnsSelect) {
        preferredColumnsSelect.value = settings.preferredColumns || 'auto';
    }

    const fontSelect = document.getElementById('setting-font');
    if (fontSelect) {
        fontSelect.innerHTML = Object.entries(fontFamilyMap)
            .map(([id, family]) => {
                const name = family.replace(/'/g, '');
                return `<option value="${id}">${name}</option>`;
            })
            .join('');
        fontSelect.value = settings.font;
    }

    // Locale selector
    const localeSelect = document.getElementById('language-select');
    if (localeSelect) {
        localeSelect.innerHTML = Object.entries(LOCALES)
            .map(([code, label]) => `<option value="${code}">${label}</option>`)
            .join('');
        localeSelect.value = settings.locale || defaultLocale || 'en';
    }

    // Populate search engine checkboxes
    document.querySelectorAll('#search-engine-options input').forEach(checkbox => {
        checkbox.checked = settings.enabledEngines.includes(checkbox.dataset.engine);
    });

    // Populate tab title input
    const tabTitleInput = document.getElementById('setting-tab-title');
    if (tabTitleInput) {
        tabTitleInput.value = settings.tabTitle || '';
    }

    // Update favicon reset button visibility
    updateFaviconResetBtn();

    updateToggleStates();
}

function updateToggleStates() {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        const setting = btn.dataset.setting;
        const value = btn.dataset.value;

        // Handle boolean settings
        if (setting === 'backgroundBlur') {
            const isActive = settings[setting] === (value === 'true');
            btn.classList.toggle('active', isActive);
        } else {
            btn.classList.toggle('active', settings[setting] === value);
        }
    });
}

// ========================================
// Category Management
// ========================================

// Helper function to parse Font Awesome HTML and extract icon classes
function parseIconInput(input) {
    // If it looks like HTML (contains < or >), parse it
    if (input.includes('<') || input.includes('>')) {
        // Match class attribute content: class="fa-solid fa-play"
        const classMatch = input.match(/class=["']([^"']+)["']/);
        if (classMatch && classMatch[1]) {
            return classMatch[1];
        }
    }
    // Return as-is if not HTML
    return input;
}

function renderCategoriesSettings() {
    const container = document.getElementById('categories-list');
    const addBtn = document.getElementById('add-category-btn');

    if (!container) return;

    container.innerHTML = categories.map((category, index) => `
        <div class="category-item" data-id="${category.id}">
            <span class="drag-handle" draggable="true" title="Drag to reorder"><i class="fa-solid fa-grip-vertical"></i></span>
            <span class="icon-preview"><i class="${category.icon}"></i></span>
            <input type="text" class="icon-input" value="${category.icon}" placeholder="fa-solid fa-folder" data-field="icon">
            <input type="text" value="${category.name}" placeholder="Category Name" maxlength="20" data-field="name">
            <button class="delete-btn" title="Delete Category" ${categories.length <= 1 ? 'disabled' : ''}>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    if (addBtn) {
        addBtn.disabled = categories.length >= 8;
    }

    // Bind events
    container.querySelectorAll('.category-item').forEach(item => {
        const categoryId = item.dataset.id;
        const iconPreview = item.querySelector('.icon-preview i');
        const dragHandle = item.querySelector('.drag-handle');

        // Drag and drop events on handle only
        if (dragHandle) {
            dragHandle.addEventListener('dragstart', handleCategoryDragStart);
            dragHandle.addEventListener('dragend', handleCategoryDragEnd);
        }

        item.addEventListener('dragover', handleCategoryDragOver);
        item.addEventListener('drop', handleCategoryDrop);
        item.addEventListener('dragleave', handleCategoryDragLeave);

        item.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                const field = input.dataset.field;
                const category = categories.find(c => c.id === categoryId);
                if (category) {
                    // Parse icon input to handle Font Awesome HTML
                    let value = input.value;
                    if (field === 'icon') {
                        value = parseIconInput(value);
                        // Update the input field with parsed value
                        if (value !== input.value) {
                            input.value = value;
                        }
                    }

                    category[field] = value;
                    saveCategories(categories);
                    renderLinksGrid();
                    updateLinkCategorySelect();

                    // Update icon preview
                    if (field === 'icon' && iconPreview) {
                        iconPreview.className = value || 'fa-solid fa-folder';
                    }
                }
            });
        });

        item.querySelector('.delete-btn').addEventListener('click', () => {
            if (categories.length > 1) {
                deleteCategory(categoryId);
            }
        });
    });
}

function addCategory() {
    if (categories.length >= 8) return;

    const newId = 'cat_' + Date.now();
    categories.push({
        id: newId,
        name: 'New Category',
        icon: 'fa-solid fa-folder'
    });
    links[newId] = [];

    saveCategories(categories);
    saveLinks(links);
    renderCategoriesSettings();
    renderLinksGrid();
    updateLinkCategorySelect();
}

function deleteCategory(categoryId) {
    categories = categories.filter(c => c.id !== categoryId);
    delete links[categoryId];

    saveCategories(categories);
    saveLinks(links);
    renderCategoriesSettings();
    renderLinksGrid();
    updateLinkCategorySelect();
}

// Category drag and drop handlers
let draggedCategoryElement = null;

function handleCategoryDragStart(e) {
    draggedCategoryElement = e.target.closest('.category-item');
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function handleCategoryDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';

    const target = e.target.closest('.category-item');
    if (target && target !== draggedCategoryElement) {
        target.classList.add('drag-over');
    }

    return false;
}

function handleCategoryDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    const target = e.target.closest('.category-item');
    if (!target || !draggedCategoryElement || target === draggedCategoryElement) {
        return false;
    }

    const draggedId = draggedCategoryElement.dataset.id;
    const targetId = target.dataset.id;

    const draggedIndex = categories.findIndex(c => c.id === draggedId);
    const targetIndex = categories.findIndex(c => c.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
        // Reorder categories array
        const [draggedCategory] = categories.splice(draggedIndex, 1);
        categories.splice(targetIndex, 0, draggedCategory);

        saveCategories(categories);
        renderCategoriesSettings();
        renderLinksGrid();
    }

    return false;
}

function handleCategoryDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('drag-over');
    });
}

function handleCategoryDragLeave(e) {
    const target = e.target.closest('.category-item');
    if (target) {
        target.classList.remove('drag-over');
    }
}

// ========================================
// Link Management
// ========================================

function renderLinksSettings() {
    updateLinkCategorySelect();
    const select = document.getElementById('link-category-select');
    if (select && select.value) {
        renderLinksForCategory(select.value);
    } else {
        const container = document.getElementById('links-list');
        if (container) container.innerHTML = '';
    }
}

function updateLinkCategorySelect() {
    const select = document.getElementById('link-category-select');
    if (!select) return;

    const currentValue = select.value;

    select.innerHTML = '<option value="">-- Select a category --</option>' +
        categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    if (categories.find(c => c.id === currentValue)) {
        select.value = currentValue;
    }
}

function renderLinksForCategory(categoryId) {
    const container = document.getElementById('links-list');
    const addBtn = document.getElementById('add-link-btn');

    if (!container) return;

    if (!categoryId) {
        container.innerHTML = '';
        if (addBtn) addBtn.disabled = true;
        return;
    }

    const categoryLinks = links[categoryId] || [];

    container.innerHTML = categoryLinks.map((link, index) => `
        <div class="link-item" data-index="${index}">
            <span class="drag-handle" draggable="true" title="Drag to reorder"><i class="fa-solid fa-grip-vertical"></i></span>
            <span class="icon-preview"><i class="${link.icon || 'fa-solid fa-link'}"></i></span>
            <input type="text" class="icon-input" value="${link.icon || 'fa-solid fa-link'}" placeholder="fa-solid fa-link" data-field="icon">
            <input type="text" value="${link.name}" placeholder="Link Name" maxlength="20" data-field="name">
            <input type="url" class="url-input" value="${link.url}" placeholder="https://..." data-field="url">
            <button class="delete-btn" title="Delete Link">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    if (addBtn) {
        addBtn.disabled = categoryLinks.length >= 10;
    }

    // Bind events
    container.querySelectorAll('.link-item').forEach(item => {
        const index = parseInt(item.dataset.index);
        const iconPreview = item.querySelector('.icon-preview i');
        const dragHandle = item.querySelector('.drag-handle');

        // Drag and drop events on handle only
        if (dragHandle) {
            dragHandle.addEventListener('dragstart', (e) => handleLinkDragStart(e, categoryId));
            dragHandle.addEventListener('dragend', handleLinkDragEnd);
        }

        item.addEventListener('dragover', handleLinkDragOver);
        item.addEventListener('drop', (e) => handleLinkDrop(e, categoryId));
        item.addEventListener('dragleave', handleLinkDragLeave);

        item.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                const field = input.dataset.field;
                if (links[categoryId] && links[categoryId][index]) {
                    // Parse icon input to handle Font Awesome HTML
                    let value = input.value;
                    if (field === 'icon') {
                        value = parseIconInput(value);
                        // Update the input field with parsed value
                        if (value !== input.value) {
                            input.value = value;
                        }
                    }

                    links[categoryId][index][field] = value;
                    saveLinks(links);
                    renderLinksGrid();

                    // Update icon preview
                    if (field === 'icon' && iconPreview) {
                        iconPreview.className = value || 'fa-solid fa-link';
                    }
                }
            });
        });

        item.querySelector('.delete-btn').addEventListener('click', () => {
            deleteLink(categoryId, index);
        });
    });
}

function addLink() {
    const select = document.getElementById('link-category-select');
    const categoryId = select ?  select.value : null;
    if (!categoryId) return;

    if (!links[categoryId]) {
        links[categoryId] = [];
    }

    if (links[categoryId].length >= 10) return;

    links[categoryId].push({
        name: 'New Link',
        url: 'https://',
        icon: 'fa-solid fa-link'
    });

    saveLinks(links);
    renderLinksForCategory(categoryId);
    renderLinksGrid();
}

function deleteLink(categoryId, index) {
    if (links[categoryId]) {
        links[categoryId].splice(index, 1);
        saveLinks(links);
        renderLinksForCategory(categoryId);
        renderLinksGrid();
    }
}

// Link drag and drop handlers
let draggedLinkElement = null;

function handleLinkDragStart(e, categoryId) {
    draggedLinkElement = e.target.closest('.link-item');
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function handleLinkDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';

    const target = e.target.closest('.link-item');
    if (target && target !== draggedLinkElement) {
        target.classList.add('drag-over');
    }

    return false;
}

function handleLinkDrop(e, categoryId) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    const target = e.target.closest('.link-item');
    if (!target || !draggedLinkElement || target === draggedLinkElement) {
        return false;
    }

    const draggedIndex = parseInt(draggedLinkElement.dataset.index);
    const targetIndex = parseInt(target.dataset.index);

    if (!isNaN(draggedIndex) && !isNaN(targetIndex) && links[categoryId]) {
        // Reorder links array
        const [draggedLink] = links[categoryId].splice(draggedIndex, 1);
        links[categoryId].splice(targetIndex, 0, draggedLink);

        saveLinks(links);
        renderLinksForCategory(categoryId);
        renderLinksGrid();
    }

    return false;
}

function handleLinkDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.link-item').forEach(item => {
        item.classList.remove('drag-over');
    });
}

function handleLinkDragLeave(e) {
    const target = e.target.closest('.link-item');
    if (target) {
        target.classList.remove('drag-over');
    }
}

// ========================================
// Social Links Management
// ========================================

const defaultSocialPlatforms = [
    { name: 'Facebook', icon: 'fa-brands fa-facebook', visible: false, url: '' },
    { name: 'Instagram', icon: 'fa-brands fa-instagram', visible: false, url: '' },
    { name: 'Twitter/X', icon: 'fa-brands fa-x-twitter', visible: false, url: '' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', visible: false, url: '' },
    { name: 'GitHub', icon: 'fa-brands fa-github', visible: false, url: '' },
    { name: 'YouTube', icon: 'fa-brands fa-youtube', visible: false, url: '' },
    { name: 'TikTok', icon: 'fa-brands fa-tiktok', visible: false, url: '' },
    { name: 'Discord', icon: 'fa-brands fa-discord', visible: false, url: '' },
    { name: 'Reddit', icon: 'fa-brands fa-reddit-alien', visible: false, url: '' },
    { name: 'Mastodon', icon: 'fa-brands fa-mastodon', visible: false, url: '' }
];

function initializeSocialLinks() {
    if (!settings.socialLinks || settings.socialLinks.length === 0) {
        settings.socialLinks = JSON.parse(JSON.stringify(defaultSocialPlatforms));
        saveSettings('socialLinks', settings.socialLinks);
    }
}

function renderSocialLinksSettings() {
    const container = document.getElementById('social-links-list');
    if (!container) return;

    if (!settings.socialLinks || settings.socialLinks.length === 0) {
        initializeSocialLinks();
    }

    container.innerHTML = settings.socialLinks.map((social, index) => `
        <div class="social-link-item" data-index="${index}">
            <label class="social-checkbox">
                <input type="checkbox" ${social.visible ? 'checked' : ''} data-index="${index}">
            </label>
            <span class="icon-preview"><i class="${social.icon}"></i></span>
            <span class="social-name">${social.name}</span>
            <input type="url" class="social-url-input" value="${social.url || ''}" placeholder="https://..." data-index="${index}">
        </div>
    `).join('');

    // Bind events
    container.querySelectorAll('.social-checkbox input').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            settings.socialLinks[index].visible = e.target.checked;
            saveSettings('socialLinks', settings.socialLinks);
            updateFooter();
        });
    });

    container.querySelectorAll('.social-url-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            settings.socialLinks[index].url = e.target.value;
            saveSettings('socialLinks', settings.socialLinks);
            updateFooter();
        });
    });
}

// ========================================
// Greeting Management
// ========================================

function renderGreetingSettings() {
    const greetings = loadGreetings();
    const timesOfDay = ['morning', 'afternoon', 'evening', 'night'];

    timesOfDay.forEach(time => {
        const input = document.getElementById(`greeting-${time}`);
        if (input && greetings[time] !== undefined) {
            input.value = greetings[time];
        }
    });
}

// ========================================
// Quotes Management
// ========================================

function renderQuotesSettings() {
    const container = document.getElementById('quotes-list');
    const addBtn = document.getElementById('add-quote-btn');

    if (!container) return;

    container.innerHTML = settings.quotes.map((quote, index) => `
        <div class="quote-item" data-index="${index}">
            <textarea
                class="quote-input"
                placeholder='"Your quote here" - Author'
                data-index="${index}"
                rows="2"
            >${quote}</textarea>
            <button class="delete-btn" data-index="${index}" title="Delete Quote" ${settings.quotes.length <= 1 ? 'disabled' : ''}>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    if (addBtn) {
        addBtn.disabled = settings.quotes.length >= 20;
    }

    // Bind events
    container.querySelectorAll('.quote-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            settings.quotes[index] = e.target.value;
            saveSettings('quotes', settings.quotes);
            updateQuote();
        });
    });

    container.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (settings.quotes.length > 1) {
                settings.quotes.splice(index, 1);
                saveSettings('quotes', settings.quotes);
                renderQuotesSettings();
                updateQuote();
            }
        });
    });
}

// ========================================
// Header Settings Management
// ========================================

function renderHeaderSettings() {
    const headerLeftSelect = document.getElementById('header-left-select');
    const headerRightSelect = document.getElementById('header-right-select');

    // Set initial values
    if (headerLeftSelect) {
        headerLeftSelect.value = settings.headerLeft;
    }

    if (headerRightSelect) {
        headerRightSelect.value = settings.headerRight;
    }

    // Add change listeners with anti-duplicate logic
    if (headerLeftSelect) {
        headerLeftSelect.addEventListener('change', (e) => {
            const newValue = e.target.value;

            // If selecting greeting or time-date, update the other selector
            if (newValue === 'greeting' && settings.headerRight === 'greeting') {
                settings.headerRight = 'time-date';
                if (headerRightSelect) headerRightSelect.value = 'time-date';
                saveSettings('headerRight', 'time-date');
            } else if (newValue === 'time-date' && settings.headerRight === 'time-date') {
                settings.headerRight = 'greeting';
                if (headerRightSelect) headerRightSelect.value = 'greeting';
                saveSettings('headerRight', 'greeting');
            }

            settings.headerLeft = newValue;
            saveSettings('headerLeft', newValue);
            updateHeader();
        });
    }

    if (headerRightSelect) {
        headerRightSelect.addEventListener('change', (e) => {
            const newValue = e.target.value;

            // If selecting greeting or time-date, update the other selector
            if (newValue === 'greeting' && settings.headerLeft === 'greeting') {
                settings.headerLeft = 'time-date';
                if (headerLeftSelect) headerLeftSelect.value = 'time-date';
                saveSettings('headerLeft', 'time-date');
            } else if (newValue === 'time-date' && settings.headerLeft === 'time-date') {
                settings.headerLeft = 'greeting';
                if (headerLeftSelect) headerLeftSelect.value = 'greeting';
                saveSettings('headerLeft', 'greeting');
            }

            settings.headerRight = newValue;
            saveSettings('headerRight', newValue);
            updateHeader();
        });
    }
}

// ========================================
// Footer Settings Management
// ========================================

function renderFooterSettings() {
    // Update dropdowns
    const footerLeftSelect = document.getElementById('footer-left-select');
    const footerCenterSelect = document.getElementById('footer-center-select');
    const footerRightSelect = document.getElementById('footer-right-select');

    if (footerLeftSelect) {
        footerLeftSelect.value = settings.footerLeft;
        footerLeftSelect.addEventListener('change', (e) => {
            saveSettings('footerLeft', e.target.value);
            updateFooter();
        });
    }

    if (footerCenterSelect) {
        footerCenterSelect.value = settings.footerCenter;
        footerCenterSelect.addEventListener('change', (e) => {
            saveSettings('footerCenter', e.target.value);
            updateFooter();
        });
    }

    if (footerRightSelect) {
        footerRightSelect.value = settings.footerRight;
        footerRightSelect.addEventListener('change', (e) => {
            saveSettings('footerRight', e.target.value);
            updateFooter();
        });
    }

}

// ========================================
// Keyboard Shortcuts
// ========================================

function handleKeyboard(event) {
    const settingsOverlay = document.getElementById('settings-overlay');
    const isSettingsOpen = settingsOverlay && settingsOverlay.classList.contains('active');

    if (event.key === '/' && document.activeElement !== searchInput && !isSettingsOpen) {
        event.preventDefault();
        if (searchInput) searchInput.focus();
    }

    if (event.key === 'Escape' && searchInput) {
        searchInput.value = '';
        searchInput.blur();
    }

    // Dynamic engine switching based on enabled engines
    if (document.activeElement !== searchInput && !isSettingsOpen) {
        const num = parseInt(event.key);
        if (num >= 1 && num <= settings.enabledEngines.length) {
            setSearchEngine(settings.enabledEngines[num - 1]);
        }
    }
}

// ========================================
// Event Listeners
// ========================================

function initEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const value = searchInput.value;
                if (!executeCommand(value)) {
                    performSearch(value);
                } else {
                    searchInput.value = '';
                }
            }
        });
    }

    document.addEventListener('keydown', handleKeyboard);

    // Backup & Restore buttons
    const backupBtn = document.getElementById('backup-button');
    const restoreBtn = document.getElementById('restore-button');
    const restoreFileInput = document.getElementById('restore-file-input');

    if (backupBtn) {
        backupBtn.addEventListener('click', exportSettings);
    }

    if (restoreBtn && restoreFileInput) {
        restoreBtn.addEventListener('click', () => {
            restoreFileInput.click();
        });

        restoreFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                importSettings(file);
                // Reset input so same file can be selected again
                e.target.value = '';
            }
        });
    }
}

// ========================================
// Command palette
// ========================================

const commands = {
    'theme dark': () => applyTheme('dark'),
    'theme light': () => applyTheme('light'),
    'new tab': () => window.open('about:blank', '_blank'),
    'github': () => window. location.href = 'https://github.com',
    'settings': () => document.getElementById('settings-overlay').classList.add('active'),
};

function executeCommand(input) {
    const cmd = input.toLowerCase(). trim();
    if (cmd.startsWith(':')) {
        const command = cmd.slice(1);
        if (commands[command]) {
            commands[command]();
            return true;
        }
    }
    return false;
}

// ========================================
// Initialization
// ========================================

function init() {
    // Get DOM elements
    searchInput = document.getElementById('search');
    timeElement = document.getElementById('time');
    dateElement = document.getElementById('date');
    greetingElement = document.getElementById('greeting');
    weatherElement = document.getElementById('weather');
    quoteElement = document.getElementById('quote');
    linksGrid = document.getElementById('links-grid');

    // Hide "New Window" option on Safari (it behaves the same as "New Tab")
    if (isSafari) {
        const newWindowBtn = document.getElementById('new-window-btn');
        if (newWindowBtn) {
            newWindowBtn.style.display = 'none';
            // If current setting is 'new-window', change it to 'new-tab'
            if (settings.linkBehavior === 'new-window') {
                saveSettings('linkBehavior', 'new-tab');
            }
        }
    }

    // Render dynamic content
    renderLinksGrid();
    renderSearchEngines();

    // Update time immediately and every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Add click handler to time element to toggle format
    if (timeElement) {
        timeElement.style.cursor = 'pointer';
        timeElement.title = 'Click to toggle time format';
        timeElement.addEventListener('click', () => {
            const newFormat = settings.timeFormat === '12' ? '24' : '12';
            saveSettings('timeFormat', newFormat);
            updateDateTime();
            updateToggleStates();
        });
    }

    // Update weather
    updateWeather();
    setInterval(updateWeather, 600000);
    
    // Set random quote
    updateQuote();
    
    // Update header and footer layout
    updateHeader();
    updateFooter();

    // Load haiku data — updateHaiku() is called after footer is built so haikuElement exists
    fetch('./haiku.json')
        .then(r => r.json())
        .then(data => {
            haikuData = data['haiku'] || [];
            updateHaiku();
        })
        .catch(() => {});

    // Quotes (from settings, no fetch needed)
    updateQuote();

    // Apply background image
    applyBackgroundImage();

    // Apply tab title and favicon
    applyTabTitle(settings.tabTitle);
    applyFavicon(settings.favicon);

    // Restore preferred search engine
    if (settings.enabledEngines.includes(settings.preferredEngine)) {
        setSearchEngine(settings.preferredEngine);
    } else if (settings.enabledEngines.length > 0) {
        setSearchEngine(settings.enabledEngines[0]);
    }

    // Set settings location
    applySettingsBtnPosition();

    // Set search visibility
    applySearchVisibility();

    // Set categories visibility
    applyCategoriesVisibility();

    // Initialize event listeners
    initEventListeners();

    // Initialize settings
    initSettings();

    // Update background image UI
    updateBackgroundImageUI();

    // Focus search input after a brief delay
    setTimeout(() => {
        if (searchInput) searchInput.focus();
    }, 700);
}

// ========================================
// Backup & Restore Functions
// ========================================

function exportSettings() {
    // Gather all data
    const exportData = {
        version: '1.1.0',
        exportDate: new Date().toISOString(),
        settings: {
            userName: localStorage.getItem('userName'),
            colorScheme: localStorage.getItem('colorScheme'),
            theme: localStorage.getItem('theme'),
            colorMode: localStorage.getItem('colorMode'),
            timeFormat: localStorage.getItem('timeFormat'),
            showSeconds: localStorage.getItem('showSeconds'),
            tempUnit: localStorage.getItem('tempUnit'),
            showQuotes: localStorage.getItem('showQuotes'),
            showSearchBar: localStorage.getItem('showSearchBar'),
            preferredColumns: localStorage.getItem('preferredColumns'),
            enabledEngines: localStorage.getItem('enabledEngines'),
            preferredEngine: localStorage.getItem('preferredEngine'),
            weatherLocation: localStorage.getItem('weatherLocation'),
            openWeatherApiKey: localStorage.getItem('openWeatherApiKey'),
            linkBehavior: localStorage.getItem('linkBehavior'),
            showKeyboardHints: localStorage.getItem('showKeyboardHints'),
            density: localStorage.getItem('density'),
            iconOnlyMode: localStorage.getItem('iconOnlyMode'),
            headerLeft: localStorage.getItem('headerLeft'),
            headerRight: localStorage.getItem('headerRight'),
            footerLeft: localStorage.getItem('footerLeft'),
            footerCenter: localStorage.getItem('footerCenter'),
            footerRight: localStorage.getItem('footerRight'),
            socialLinks: localStorage.getItem('socialLinks'),
            quotes: localStorage.getItem('quotes'),
            customColors: localStorage.getItem('customColors'),
            backgroundImage: localStorage.getItem('backgroundImage'),
            backgroundSize: localStorage.getItem('backgroundSize'),
            backgroundBlur: localStorage.getItem('backgroundBlur'),
            tabTitle: localStorage.getItem('tabTitle'),
            favicon: localStorage.getItem('favicon')
        },
        categories: localStorage.getItem('categories'),
        links: localStorage.getItem('links')
    };

    // Create and download file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sip-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show confirmation
    showNotification('Settings exported successfully!', 'success');
}

function importSettings(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const importData = JSON.parse(e.target.result);

            // Validate data structure
            if (!importData.version || !importData.settings) {
                throw new Error('Invalid backup file format');
            }

            // Confirm before overwriting
            if (!confirm('This will replace all your current settings, categories, and links. Continue?')) {
                return;
            }

            // Import settings
            Object.entries(importData.settings).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    localStorage.setItem(key, value);
                }
            });

            // Import categories and links
            if (importData.categories) {
                localStorage.setItem('categories', importData.categories);
            }
            if (importData.links) {
                localStorage.setItem('links', importData.links);
            }

            // Show success message and reload
            showNotification('Settings imported successfully! Reloading...', 'success');
            setTimeout(() => {
                location.reload();
            }, 1500);

        } catch (error) {
            showNotification('Error importing settings: ' + error.message, 'error');
        }
    };

    reader.readAsText(file);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--surface0);
        border: 1px solid var(--${type === 'success' ? 'green' : type === 'error' ? 'red' : 'primary'});
        border-radius: var(--radius-md);
        color: var(--text);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================================
// Bookmark Import Wizard
// ========================================

let parsedBookmarks = { categories: [], links: {} };

// Open import wizard
document.getElementById('import-bookmarks-button')?.addEventListener('click', () => {
    document.getElementById('import-wizard-overlay').classList.add('active');
    // Reset to upload step
    document.getElementById('import-step-upload').style.display = 'block';
    document.getElementById('import-step-preview').style.display = 'none';
});

// Close import wizard
document.getElementById('import-wizard-close')?.addEventListener('click', () => {
    document.getElementById('import-wizard-overlay').classList.remove('active');
});

// Close on overlay click
document.getElementById('import-wizard-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'import-wizard-overlay') {
        document.getElementById('import-wizard-overlay').classList.remove('active');
    }
});

// File selection
document.getElementById('select-bookmark-file')?.addEventListener('click', () => {
    document.getElementById('bookmark-file-input').click();
});

// File upload handling
document.getElementById('bookmark-file-input')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        parseBookmarkFile(file);
    }
});

// Drag and drop support
const uploadArea = document.getElementById('upload-area');
uploadArea?.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea?.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea?.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.html') || file.name.endsWith('.htm'))) {
        parseBookmarkFile(file);
    } else {
        showNotification('Please drop an HTML bookmark file', 'error');
    }
});

// Parse bookmark HTML file
function parseBookmarkFile(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const html = e.target.result;
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Parse bookmarks into categories
            parsedBookmarks = extractBookmarks(doc);

            if (parsedBookmarks.categories.length === 0) {
                showNotification('No bookmarks found in file', 'error');
                return;
            }

            // Show preview step
            renderBookmarkPreview();
            document.getElementById('import-step-upload').style.display = 'none';
            document.getElementById('import-step-preview').style.display = 'block';

        } catch (error) {
            showNotification('Error parsing bookmark file: ' + error.message, 'error');
        }
    };

    reader.readAsText(file);
}

// Extract bookmarks from HTML document
function extractBookmarks(doc) {
    const categories = [];
    const links = {};
    let categoryIdCounter = 1;

    // Function to process a folder/category
    function processFolder(folderElement, parentName = '') {
        // Get folder name from the H3 that's a direct child of this DT
        const h3 = folderElement.querySelector(':scope > h3');
        const folderName = h3 ? h3.textContent.trim() : 'Bookmarks';

        // Find the DL that contains the links/subfolders for this folder
        const dl = folderElement.querySelector(':scope > dl');
        if (!dl) return null;

        const bookmarkLinks = [];

        // Process all DT elements in this folder
        const dtElements = dl.querySelectorAll(':scope > dt');
        dtElements.forEach(dtElem => {
            // Check if it's a link or another folder
            const subH3 = dtElem.querySelector(':scope > h3');
            const anchor = dtElem.querySelector(':scope > a');

            if (subH3) {
                // It's a subfolder - process recursively
                const subFolderData = processFolder(dtElem, folderName);
                if (subFolderData) {
                    categories.push(subFolderData.category);
                    links[subFolderData.category.id] = subFolderData.links;
                }
            } else if (anchor) {
                // It's a bookmark link
                const url = anchor.getAttribute('href');
                const name = anchor.textContent.trim();

                if (url && name && url.startsWith('http')) {
                    bookmarkLinks.push({
                        name: name,
                        url: url,
                        icon: ''  // Leave icon blank for user to set
                    });
                }
            }
        });

        // Only create category if it has links
        if (bookmarkLinks.length > 0) {
            const categoryId = 'imported-' + categoryIdCounter++;
            const category = {
                id: categoryId,
                name: folderName,
                icon: '',  // Leave icon blank for user to set
                color: categoryColors[(categoryIdCounter - 2) % categoryColors.length]
            };

            return { category, links: bookmarkLinks };
        }

        return null;
    }

    // Start parsing from the root
    // Try to find the main bookmark structure
    const rootDL = doc.querySelector('dl');
    if (!rootDL) {
        return { categories, links };
    }

    // Process all top-level DT elements
    const topLevelDTs = rootDL.querySelectorAll(':scope > dt');
    topLevelDTs.forEach(dtElem => {
        const h3 = dtElem.querySelector(':scope > h3');
        const anchor = dtElem.querySelector(':scope > a');

        if (h3) {
            // It's a folder
            const folderData = processFolder(dtElem);
            if (folderData) {
                categories.push(folderData.category);
                links[folderData.category.id] = folderData.links;
            }
        } else if (anchor) {
            // It's a top-level bookmark (no folder)
            const url = anchor.getAttribute('href');
            const name = anchor.textContent.trim();

            if (url && name && url.startsWith('http')) {
                // Create "Other Bookmarks" category if not exists
                let otherCategory = categories.find(c => c.name === 'Other Bookmarks');
                if (!otherCategory) {
                    otherCategory = {
                        id: 'imported-other',
                        name: 'Other Bookmarks',
                        icon: '',  // Leave icon blank for user to set
                        color: 'blue'
                    };
                    categories.push(otherCategory);
                    links[otherCategory.id] = [];
                }

                links[otherCategory.id].push({
                    name: name,
                    url: url,
                    icon: ''  // Leave icon blank for user to set
                });
            }
        }
    });

    return { categories, links };
}

// Render bookmark preview
function renderBookmarkPreview() {
    const previewContainer = document.getElementById('import-preview');
    previewContainer.innerHTML = '';

    // Calculate totals
    let totalBookmarks = 0;
    parsedBookmarks.categories.forEach(cat => {
        totalBookmarks += parsedBookmarks.links[cat.id]?.length || 0;
    });

    document.getElementById('bookmark-count').textContent = totalBookmarks;
    document.getElementById('category-count').textContent = parsedBookmarks.categories.length;

    // Render each category
    parsedBookmarks.categories.forEach(category => {
        const categoryLinks = parsedBookmarks.links[category.id] || [];

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'import-category';
        categoryDiv.dataset.categoryId = category.id;

        const headerDiv = document.createElement('div');
        headerDiv.className = 'import-category-header';

        const checkboxLabel = document.createElement('label');
        checkboxLabel.className = 'import-category-checkbox';

        const categoryCheckbox = document.createElement('input');
        categoryCheckbox.type = 'checkbox';
        categoryCheckbox.checked = true;
        categoryCheckbox.dataset.categoryId = category.id;
        categoryCheckbox.addEventListener('change', (e) => {
            // Toggle all links in this category
            const linkCheckboxes = categoryDiv.querySelectorAll('.import-link-checkbox input');
            linkCheckboxes.forEach(cb => cb.checked = e.target.checked);
        });

        checkboxLabel.appendChild(categoryCheckbox);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'import-category-info';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'import-category-name';
        nameSpan.textContent = category.name;

        const countSpan = document.createElement('span');
        countSpan.className = 'import-category-count';
        countSpan.textContent = `(${categoryLinks.length} ${categoryLinks.length === 1 ? 'link' : 'links'})`;

        infoDiv.appendChild(nameSpan);
        infoDiv.appendChild(countSpan);

        headerDiv.appendChild(checkboxLabel);
        headerDiv.appendChild(infoDiv);

        const linksDiv = document.createElement('div');
        linksDiv.className = 'import-links';

        categoryLinks.forEach((link, index) => {
            const linkDiv = document.createElement('div');
            linkDiv.className = 'import-link';

            const linkCheckboxLabel = document.createElement('label');
            linkCheckboxLabel.className = 'import-link-checkbox';

            const linkCheckbox = document.createElement('input');
            linkCheckbox.type = 'checkbox';
            linkCheckbox.checked = true;
            linkCheckbox.dataset.categoryId = category.id;
            linkCheckbox.dataset.linkIndex = index;
            linkCheckbox.addEventListener('change', () => {
                // Update category checkbox state
                const allChecked = Array.from(linksDiv.querySelectorAll('input[type="checkbox"]'))
                    .every(cb => cb.checked);
                categoryCheckbox.checked = allChecked;
            });

            linkCheckboxLabel.appendChild(linkCheckbox);

            const linkInfo = document.createElement('div');
            linkInfo.className = 'import-link-info';

            const linkName = document.createElement('div');
            linkName.className = 'import-link-name';
            linkName.textContent = link.name;

            const linkUrl = document.createElement('div');
            linkUrl.className = 'import-link-url';
            linkUrl.textContent = link.url;

            linkInfo.appendChild(linkName);
            linkInfo.appendChild(linkUrl);

            linkDiv.appendChild(linkCheckboxLabel);
            linkDiv.appendChild(linkInfo);

            linksDiv.appendChild(linkDiv);
        });

        categoryDiv.appendChild(headerDiv);
        categoryDiv.appendChild(linksDiv);
        previewContainer.appendChild(categoryDiv);
    });
}

// Select/Deselect all
document.getElementById('select-all-btn')?.addEventListener('click', () => {
    document.querySelectorAll('#import-preview input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
    });
});

document.getElementById('deselect-all-btn')?.addEventListener('click', () => {
    document.querySelectorAll('#import-preview input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
});

// Back to upload
document.getElementById('back-to-upload')?.addEventListener('click', () => {
    document.getElementById('import-step-upload').style.display = 'block';
    document.getElementById('import-step-preview').style.display = 'none';
    document.getElementById('bookmark-file-input').value = '';
});

// Import selected bookmarks
document.getElementById('import-selected-btn')?.addEventListener('click', () => {
    importSelectedBookmarks();
});

function importSelectedBookmarks() {
    const selectedCategories = [];
    const selectedLinks = {};

    // Collect selected bookmarks
    parsedBookmarks.categories.forEach(category => {
        const categoryDiv = document.querySelector(`[data-category-id="${category.id}"]`);
        const linkCheckboxes = categoryDiv.querySelectorAll('.import-link-checkbox input:checked');

        if (linkCheckboxes.length > 0) {
            const categoryLinks = [];
            linkCheckboxes.forEach(checkbox => {
                const linkIndex = parseInt(checkbox.dataset.linkIndex);
                const link = parsedBookmarks.links[category.id][linkIndex];
                categoryLinks.push(link);
            });

            selectedCategories.push(category);
            selectedLinks[category.id] = categoryLinks;
        }
    });

    if (selectedCategories.length === 0) {
        showNotification('No bookmarks selected', 'error');
        return;
    }

    // Merge with existing categories and links
    const existingCategories = loadCategories();
    const existingLinks = loadLinks();

    // Add new categories (avoid duplicates)
    selectedCategories.forEach(newCat => {
        // Check if category with same name exists
        const existingCat = existingCategories.find(c => c.name === newCat.name);

        if (existingCat) {
            // Merge links into existing category
            const existingCatLinks = existingLinks[existingCat.id] || [];
            const newLinks = selectedLinks[newCat.id] || [];

            // Add links that don't already exist (based on URL)
            newLinks.forEach(newLink => {
                const isDuplicate = existingCatLinks.some(l => l.url === newLink.url);
                if (!isDuplicate) {
                    existingCatLinks.push(newLink);
                }
            });

            existingLinks[existingCat.id] = existingCatLinks;
        } else {
            // Add as new category
            existingCategories.push(newCat);
            existingLinks[newCat.id] = selectedLinks[newCat.id];
        }
    });

    // Save to localStorage
    saveCategories(existingCategories);
    saveLinks(existingLinks);

    // Update global variables
    categories = existingCategories;
    links = existingLinks;

    // Re-render UI
    renderLinksGrid();
    renderCategoriesSettings();
    renderLinksSettings();

    // Close wizard and show success
    document.getElementById('import-wizard-overlay').classList.remove('active');
    showNotification(`Successfully imported ${selectedCategories.length} ${selectedCategories.length === 1 ? 'category' : 'categories'}!`, 'success');
}

// ========================================
// Start the application
// ========================================

document.addEventListener('DOMContentLoaded', init);
