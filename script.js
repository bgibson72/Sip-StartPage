// ========================================
// Sip - Modern Browser Startpage
// ========================================

// ========================================
// Browser Detection
// ========================================

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// ========================================
// Global Timer References (for cleanup)
// ========================================

let timeUpdateAnimationFrame = null;
let weatherUpdateInterval = null;

// ========================================
// Default Data
// ========================================

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
    }
};

// ========================================
// Settings Management
// ========================================

function loadSettings() {
    const defaults = {
        userName: '',
        colorScheme: 'catppuccin',
        theme: 'dark',
        colorMode: 'multi',
        timeFormat: '12',
        showSeconds: 'false',
        tempUnit: 'F',
        showQuotes: 'true',
        enabledEngines: ['google', 'duckduckgo', 'github', 'youtube'],
        preferredEngine: 'google',
        weatherLocation: 'New York,NY,US',
        openWeatherApiKey: '',
        linkBehavior: 'same',
        showKeyboardHints: 'true',
        footerLeft: 'weather',
        footerCenter: 'blank',
        footerRight: 'quotes',
        socialLinks: []
    };
    
    return {
        userName: localStorage.getItem('userName') ??  defaults.userName,
        colorScheme: localStorage.getItem('colorScheme') ?? defaults.colorScheme,
        theme: localStorage.getItem('theme') ?? defaults.theme,
        colorMode: localStorage.getItem('colorMode') ?? defaults.colorMode,
        timeFormat: localStorage.getItem('timeFormat') ?? defaults.timeFormat,
        showSeconds: localStorage.getItem('showSeconds') ?? defaults.showSeconds,
        tempUnit: localStorage.getItem('tempUnit') ?? defaults.tempUnit,
        showQuotes: localStorage.getItem('showQuotes') ?? defaults.showQuotes,
        enabledEngines: JSON.parse(localStorage.getItem('enabledEngines')) ?? defaults.enabledEngines,
        preferredEngine: localStorage.getItem('preferredEngine') ?? defaults.preferredEngine,
        weatherLocation: localStorage.getItem('weatherLocation') ?? defaults.weatherLocation,
        openWeatherApiKey: localStorage.getItem('openWeatherApiKey') ??  defaults.openWeatherApiKey,
        linkBehavior: localStorage.getItem('linkBehavior') ?? defaults.linkBehavior,
        showKeyboardHints: localStorage.getItem('showKeyboardHints') ?? defaults.showKeyboardHints,
        footerLeft: localStorage.getItem('footerLeft') ?? defaults.footerLeft,
        footerCenter: localStorage.getItem('footerCenter') ?? defaults.footerCenter,
        footerRight: localStorage.getItem('footerRight') ?? defaults.footerRight,
        socialLinks: JSON.parse(localStorage.getItem('socialLinks')) ?? defaults.socialLinks
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
let categories = loadCategories();
let links = loadLinks();
let currentEngine = settings.preferredEngine;

// ========================================
// Theme Management
// ========================================

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    saveSettings('theme', theme);
}

function applyColorScheme(scheme) {
    document.documentElement.setAttribute('data-scheme', scheme);
    saveSettings('colorScheme', scheme);
    // Update color mode visibility based on scheme
    updateColorModeVisibility();
}

function updateColorModeVisibility() {
    const colorModeItem = document.querySelector('[data-setting="colorMode"]')?.closest('.setting-item');
    if (colorModeItem) {
        // Hide color mode option for monochrome scheme
        if (settings.colorScheme === 'monochrome') {
            colorModeItem.style.display = 'none';
        } else {
            colorModeItem.style.display = 'flex';
        }
    }
}

function applyColorMode(mode) {
    document.documentElement.setAttribute('data-color-mode', mode);
    saveSettings('colorMode', mode);
    renderLinksGrid();
}

// Apply saved theme and color scheme immediately
applyTheme(settings.theme);
applyColorScheme(settings.colorScheme);

// ========================================
// DOM Elements
// ========================================

let searchInput, timeElement, dateElement, greetingElement, weatherElement, quoteElement, linksGrid;

// ========================================
// Time & Date Functions
// ========================================

function updateDateTime() {
    // Safety check: ensure document and elements are still valid
    if (!document.body || !timeElement || !dateElement) {
        if (timeUpdateInterval) {
            clearInterval(timeUpdateInterval);
            timeUpdateInterval = null;
        }
        return;
    }
    
    try {
        const now = new Date();
        
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        let timeString;
        
        if (settings.timeFormat === '12') {
            const period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            if (settings.showSeconds === 'true') {
                timeString = `${hours}:${minutes}:${seconds} ${period}`;
            } else {
                timeString = `${hours}:${minutes} ${period}`;
            }
        } else {
            if (settings.showSeconds === 'true') {
                timeString = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
            } else {
                timeString = `${hours.toString().padStart(2, '0')}:${minutes}`;
            }
        }
        
        timeElement.textContent = timeString;
        
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
        
        updateGreeting(now.getHours());
    } catch (error) {
        console.error('Error in updateDateTime:', error);
        if (timeUpdateInterval) {
            clearInterval(timeUpdateInterval);
            timeUpdateInterval = null;
        }
    }
}

function updateGreeting(hour) {
    if (!greetingElement) return;
    
    let greeting, iconHtml;
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
        iconHtml = '<span class="nf-icon">󰖜</span>';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon';
        iconHtml = '<i class="fa-solid fa-sun"></i>';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good evening';
        iconHtml = '<span class="nf-icon">󰖛</span>';
    } else {
        greeting = 'Good night';
        iconHtml = '<i class="fa-solid fa-moon"></i>';
    }
    
    const userName = settings.userName;
    greetingElement.textContent = userName ? `${greeting}, ${userName}` : greeting;
    
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
}

function updateKeyboardHints() {
    const hintsContainer = document. querySelector('.keyboard-hints');
    if (!hintsContainer) return;
    
    // Show or hide keyboard hints based on setting
    if (settings.showKeyboardHints === 'false') {
        hintsContainer.style.display = 'none';
        return;
    } else {
        hintsContainer.style.display = 'flex';
    }
    
    const engineCount = settings.enabledEngines.length;
    const engineHint = engineCount > 1 ? `<kbd>1-${engineCount}</kbd> Engine` : '';
    
    hintsContainer.innerHTML = `
        <span class="hint"><kbd>/</kbd> Search</span>
        ${engineHint ?  `<span class="hint">${engineHint}</span>` : ''}
        <span class="hint"><kbd>Esc</kbd> Clear</span>
    `;
}

// ========================================
// Weather Function (OpenWeather API Integration)
// ========================================

async function updateWeather() {
    // Safety check: ensure document and elements are still valid
    if (!document.body || !weatherElement) {
        if (weatherUpdateInterval) {
            clearInterval(weatherUpdateInterval);
            weatherUpdateInterval = null;
        }
        return;
    }

    try {
        // Check if API key is configured
        if (!settings.openWeatherApiKey || !settings.weatherLocation) {
            // Fall back to mock weather data if no API key or location
            showMockWeather();
            return;
        }

        let query = `q=${encodeURIComponent(settings.weatherLocation)}`;
        // Optionally, use geolocation:
        // if ('geolocation' in navigator) {
        //     navigator.geolocation.getCurrentPosition(pos => {
        //         query = `lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;
        //         fetchWeather(query);
        //     }, () => {
        //         fetchWeather(query);
        //     });
        // } else {
        //     fetchWeather(query);
        // }
        // For now, just use city name:
        fetchWeather(query);
    } catch (error) {
        console.error('Error in updateWeather:', error);
        if (weatherUpdateInterval) {
            clearInterval(weatherUpdateInterval);
            weatherUpdateInterval = null;
        }
    }
}

async function fetchWeather(query) {
    try {
        const unit = settings.tempUnit === 'C' ? 'metric' : 'imperial';
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${settings.openWeatherApiKey}&units=${unit}`
        );
        
        if (!response.ok) {
            console.error('Weather API error:', response.status, response.statusText);
            throw new Error('Weather API error');
        }
        
        const data = await response.json();

        // Get temperature, condition, and icon info
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main; // e.g., "Clouds"
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
    } catch (err) {
        console.error('Weather fetch error:', err);
        // Fall back to mock weather on error
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
    }
}

// ========================================
// Quotes Function
// ========================================

const quotes = [
    '"The only way to do great work is to love what you do." - Steve Jobs',
    '"First, solve the problem.  Then, write the code." - John Johnson',
    '"Simplicity is the soul of efficiency." - Austin Freeman',
    '"Make it work, make it right, make it fast." - Kent Beck',
    '"Talk is cheap. Show me the code." - Linus Torvalds',
    '"Creativity is intelligence having fun." - Albert Einstein',
    '"Done is better than perfect." - Sheryl Sandberg',
    '"Stay hungry, stay foolish." - Steve Jobs',
    '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
];

function updateQuote() {
    const quoteWidget = document.querySelector('.quote-widget');
    if (!quoteWidget || !quoteElement) return;
    
    if (settings.showQuotes === 'true') {
        quoteWidget.style.display = 'flex';
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = randomQuote;
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
    
    linksGrid.classList.remove('grid-single', 'grid-even', 'grid-odd');
    
    if (categoryCount === 1) {
        linksGrid. classList.add('grid-single');
    } else if (categoryCount % 2 === 0) {
        linksGrid.classList.add('grid-even');
    } else {
        linksGrid.classList. add('grid-odd');
    }
}

// ========================================
// Settings Modal Functions
// ========================================

function initSettings() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsOverlay = document.getElementById('settings-overlay');
    const settingsClose = document.getElementById('settings-close');
    
    if (!settingsBtn || !settingsOverlay || !settingsClose) return;
    
    // Open settings
    settingsBtn.addEventListener('click', () => {
        settingsOverlay.classList.add('active');
        populateSettingsUI();
    });
    
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
    document. addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (settingsOverlay.classList. contains('active')) {
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
            } else if (tabId === 'social') {
                renderSocialLinksSettings();
            } else if (tabId === 'footer') {
                renderFooterSettings();
            } else if (tabId === 'help') {
                // Help tab - content is static in HTML
            }
        });
    });
    
    // Toggle button handlers
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const setting = btn.dataset. setting;
            const value = btn.dataset.value;
            
            saveSettings(setting, value);
            updateToggleStates();
            
            if (setting === 'colorScheme') {
                applyColorScheme(value);
            } else if (setting === 'theme') {
                applyTheme(value);
            } else if (setting === 'colorMode') {
                applyColorMode(value);
            } else if (setting === 'timeFormat') {
                updateDateTime();
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
            } else if (setting === 'footerLeft' || setting === 'footerCenter' || setting === 'footerRight') {
                updateFooter();
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
            applyColorScheme(e.target.value);
        });
    }
    
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
        });
        
        // Update weather when user finishes typing (on blur)
        apiKeyInput.addEventListener('blur', () => {
            updateWeather();
        });
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
    
    // Category selector for links
    const linkCategorySelect = document.getElementById('link-category-select');
    if (linkCategorySelect) {
        linkCategorySelect.addEventListener('change', (e) => {
            const addLinkBtn = document. getElementById('add-link-btn');
            if (addLinkBtn) {
                addLinkBtn.disabled = !e.target.value;
            }
            renderLinksForCategory(e.target.value);
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
    
    // Populate search engine checkboxes
    document.querySelectorAll('#search-engine-options input').forEach(checkbox => {
        checkbox.checked = settings.enabledEngines.includes(checkbox.dataset.engine);
    });
    
    updateToggleStates();
}

function updateToggleStates() {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        const setting = btn.dataset.setting;
        const value = btn.dataset.value;
        btn.classList.toggle('active', settings[setting] === value);
    });
}

// ========================================
// Category Management
// ========================================

function renderCategoriesSettings() {
    const container = document.getElementById('categories-list');
    const addBtn = document.getElementById('add-category-btn');
    
    if (!container) return;
    
    container.innerHTML = categories.map((category, index) => `
        <div class="category-item" data-id="${category.id}">
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
        
        item.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                const field = input.dataset. field;
                const category = categories.find(c => c.id === categoryId);
                if (category) {
                    category[field] = input.value;
                    saveCategories(categories);
                    renderLinksGrid();
                    updateLinkCategorySelect();
                    
                    // Update icon preview
                    if (field === 'icon' && iconPreview) {
                        iconPreview.className = input.value || 'fa-solid fa-folder';
                    }
                }
            });
        });
        
        item.querySelector('.delete-btn'). addEventListener('click', () => {
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
    categories = categories. filter(c => c.id !== categoryId);
    delete links[categoryId];
    
    saveCategories(categories);
    saveLinks(links);
    renderCategoriesSettings();
    renderLinksGrid();
    updateLinkCategorySelect();
}

// ========================================
// Link Management
// ========================================

function renderLinksSettings() {
    updateLinkCategorySelect();
    const select = document.getElementById('link-category-select');
    if (select && select.value) {
        renderLinksForCategory(select. value);
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
    
    if (categories.find(c => c. id === currentValue)) {
        select. value = currentValue;
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
        
        item.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                const field = input.dataset. field;
                if (links[categoryId] && links[categoryId][index]) {
                    links[categoryId][index][field] = input.value;
                    saveLinks(links);
                    renderLinksGrid();
                    
                    // Update icon preview
                    if (field === 'icon' && iconPreview) {
                        iconPreview. className = input.value || 'fa-solid fa-link';
                    }
                }
            });
        });
        
        item.querySelector('.delete-btn'). addEventListener('click', () => {
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
        links[categoryId]. splice(index, 1);
        saveLinks(links);
        renderLinksForCategory(categoryId);
        renderLinksGrid();
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
    const isSettingsOpen = settingsOverlay && settingsOverlay. classList.contains('active');
    
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
    try {
        // Get DOM elements
        searchInput = document.getElementById('search');
        timeElement = document.getElementById('time');
        dateElement = document.getElementById('date');
        greetingElement = document.getElementById('greeting');
        weatherElement = document.getElementById('weather');
        quoteElement = document.getElementById('quote');
        linksGrid = document. getElementById('links-grid');
    
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
    
    // Update time immediately (no auto-refresh for Safari stability)
    updateDateTime();
    
    // Safari-specific: Only enable time updates on non-Safari browsers
    if (!isSafari) {
        // Cancel any existing animation frame
        if (timeUpdateAnimationFrame) {
            cancelAnimationFrame(timeUpdateAnimationFrame);
        }
        // Use requestAnimationFrame for time updates (automatically pauses when page hidden)
        let lastTimeUpdate = Date.now();
        function timeUpdateLoop() {
            try {
                // Stop if page is hidden or document is invalid
                if (document.hidden || !document.body || !timeElement) {
                    return; // Don't schedule next frame
                }
                
                const now = Date.now();
                // Update every second
                if (now - lastTimeUpdate >= 1000) {
                    updateDateTime();
                    lastTimeUpdate = now;
                }
                
                // Schedule next frame only if page is still visible
                if (!document.hidden) {
                    timeUpdateAnimationFrame = requestAnimationFrame(timeUpdateLoop);
                }
            } catch (error) {
                console.error('Error in time update loop:', error);
                // Don't schedule next frame on error
            }
        }
        timeUpdateLoop();
    }
    
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
    
    // Update weather immediately (no auto-refresh for Safari stability)
    updateWeather();
    
    // Safari-specific: Only enable weather updates on non-Safari browsers
    if (!isSafari) {
        // Clear any existing interval before creating new one
        if (weatherUpdateInterval) {
            clearInterval(weatherUpdateInterval);
        }
        weatherUpdateInterval = setInterval(() => {
            try {
                // Stop interval if page is hidden or document is invalid
                if (document.hidden || !document.body || !weatherElement) {
                    if (weatherUpdateInterval) {
                        clearInterval(weatherUpdateInterval);
                        weatherUpdateInterval = null;
                    }
                    return;
                }
                updateWeather();
            } catch (error) {
                console.error('Error in weather update:', error);
                if (weatherUpdateInterval) {
                    clearInterval(weatherUpdateInterval);
                    weatherUpdateInterval = null;
                }
            }
        }, 600000);
    }
    
    // Set random quote
    updateQuote();
    
    // Update footer layout
    updateFooter();
    
    // Restore preferred search engine
    if (settings.enabledEngines.includes(settings.preferredEngine)) {
        setSearchEngine(settings.preferredEngine);
    } else if (settings.enabledEngines.length > 0) {
        setSearchEngine(settings.enabledEngines[0]);
    }
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize settings
    initSettings();
    
    // Focus search input after a brief delay
    setTimeout(() => {
        if (searchInput) searchInput.focus();
    }, 700);
    
    } catch (error) {
        // Log error but don't crash
        console.error('Sip initialization error:', error);
        // Attempt cleanup even if init fails
        cleanup();
    }
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
            enabledEngines: localStorage.getItem('enabledEngines'),
            preferredEngine: localStorage.getItem('preferredEngine'),
            weatherLocation: localStorage.getItem('weatherLocation'),
            openWeatherApiKey: localStorage.getItem('openWeatherApiKey'),
            linkBehavior: localStorage.getItem('linkBehavior'),
            showKeyboardHints: localStorage.getItem('showKeyboardHints'),
            footerLeft: localStorage.getItem('footerLeft'),
            footerCenter: localStorage.getItem('footerCenter'),
            footerRight: localStorage.getItem('footerRight'),
            socialLinks: localStorage.getItem('socialLinks')
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
// Cleanup Function
// ========================================

function cleanup() {
    try {
        // Cancel animation frame for time updates
        if (timeUpdateAnimationFrame) {
            cancelAnimationFrame(timeUpdateAnimationFrame);
            timeUpdateAnimationFrame = null;
        }
        // Clear weather update interval
        if (weatherUpdateInterval) {
            clearInterval(weatherUpdateInterval);
            weatherUpdateInterval = null;
        }
        console.log('Cleanup completed successfully');
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
}

// ========================================
// Start the application
// ========================================

document.addEventListener('DOMContentLoaded', init);

// Clean up when page is unloaded (extension disabled, tab closed, etc.)
window.addEventListener('beforeunload', cleanup);
window.addEventListener('pagehide', cleanup);
window.addEventListener('unload', cleanup);

// Safari-specific: Also cleanup on visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cleanup();
    }
});
