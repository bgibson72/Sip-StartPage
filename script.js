// ========================================
// Sip - Modern Browser Startpage
// ========================================

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
        url: 'https://www.amazon.in/s?k=',
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
        theme: 'dark',
        colorMode: 'multi',
        timeFormat: '12',
        tempUnit: 'C',
        showQuotes: 'false',
        enabledEngines: ['google', 'youtube'],
        preferredEngine: 'google',
        weatherLocation: 'Mumbai,IN',
        openWeatherApiKey: '',
        waqiApiKey: ''
    };
    
    return {
        userName: localStorage.getItem('userName') ??  defaults.userName,
        theme: localStorage.getItem('theme') ?? defaults.theme,
        colorMode: localStorage.getItem('colorMode') ?? defaults.colorMode,
        timeFormat: localStorage.getItem('timeFormat') ?? defaults.timeFormat,
        tempUnit: localStorage.getItem('tempUnit') ?? defaults.tempUnit,
        showQuotes: localStorage.getItem('showQuotes') ?? defaults.showQuotes,
        enabledEngines: JSON.parse(localStorage.getItem('enabledEngines')) ?? defaults.enabledEngines,
        preferredEngine: localStorage.getItem('preferredEngine') ?? defaults.preferredEngine,
        weatherLocation: localStorage.getItem('weatherLocation') ?? defaults.weatherLocation,
        openWeatherApiKey: localStorage.getItem('openWeatherApiKey') ??  defaults.openWeatherApiKey,
        waqiApiKey: localStorage.getItem('waqiApiKey') ?? defaults.waqiApiKey
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

function applyColorMode(mode) {
    document.documentElement.setAttribute('data-color-mode', mode);
    saveSettings('colorMode', mode);
    renderLinksGrid();
}

// Apply saved theme immediately
applyTheme(settings.theme);

// ========================================
// DOM Elements
// ========================================

let searchInput, timeElement, dateElement, greetingElement, weatherElement, linksGrid;

// ========================================
// Time & Date Functions
// ========================================

function updateDateTime() {
    if (!timeElement || !dateElement) return;
    
    const now = new Date();
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    let timeString;
    
    if (settings.timeFormat === '12') {
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        timeString = `${hours}:${minutes} ${period}`;
    } else {
        timeString = `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
    
    timeElement.textContent = timeString;
    
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
    
    updateGreeting(now.getHours());
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
    // Greeting icon is controlled by weather; do not overwrite here.
}

// ========================================
// Search Functions
// ========================================

function performSearch(query) {
    if (!query.trim()) return;
    // Always open search results in a new tab
    const engine = allSearchEngines[currentEngine];
    if (!engine) return;
    const searchUrl = engine.url + encodeURIComponent(query);
    window.open(searchUrl, '_blank');
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
        
        // Set greeting icon to weather image
        const greetingIcon = document.getElementById('greeting-icon');
        if (greetingIcon) {
            greetingIcon.innerHTML = `<img src="${iconUrl}" alt="" style="width:2em;height:2em;margin:-0.25em 0;vertical-align:middle;">`;
        }
        
        // Show city name before the weather text
        const cityName = data.name || settings.weatherLocation.split(',')[0];
        // Try to fetch AQI (WAQI preferred, then OpenWeather air pollution as fallback)
        const lat = data.coord && data.coord.lat;
        const lon = data.coord && data.coord.lon;
        const aqiSuffix = await fetchAQI({ lat, lon });
        weatherElement.textContent = `${cityName}, ${temp}${tempUnit} ${condition}${aqiSuffix}`;
    } catch (err) {
        console.error('Weather fetch error:', err);
        // Fall back to mock weather on error
        showMockWeather();
    }
}

async function showMockWeather() {
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
    
    const mockLocation = (settings.weatherLocation || '').split(',')[0] || 'Unknown';
    // Try to fetch AQI by city name when showing mock data
    let aqiSuffix = '';
    if (settings.waqiApiKey) {
        aqiSuffix = await fetchAQI({ city: mockLocation });
    }
    weatherElement.textContent = `${mockLocation}, ${temp}${unit} ${weather.condition}${aqiSuffix}`;
    
    // Set greeting icon to the mock weather icon
    const greetingIcon = document.getElementById('greeting-icon');
    if (greetingIcon) {
        greetingIcon.innerHTML = `<i class="fa-solid ${weather.icon}"></i>`;
    }
}

// ========================================
// AQI Fetching (WAQI preferred, OpenWeather fallback)
// ========================================
async function fetchAQI({ lat, lon, city } = {}) {
    try {
        // Try WAQI first if token present
        if (settings.waqiApiKey) {
            let waqiUrl = '';
            if (typeof lat !== 'undefined' && typeof lon !== 'undefined') {
                waqiUrl = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${settings.waqiApiKey}`;
            } else if (city) {
                waqiUrl = `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${settings.waqiApiKey}`;
            }

            if (waqiUrl) {
                const resp = await fetch(waqiUrl);
                if (resp.ok) {
                    const body = await resp.json();
                    if (body && body.status === 'ok' && body.data && typeof body.data.aqi !== 'undefined') {
                        const aqi = body.data.aqi;
                        return ` | ${aqi} AQI`;
                    }
                }
            }
        }

        // Fallback: use OpenWeather Air Pollution API if we have coordinates and OpenWeather key
        if (settings.openWeatherApiKey && typeof lat !== 'undefined' && typeof lon !== 'undefined') {
            const resp = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${settings.openWeatherApiKey}`);
            if (resp.ok) {
                const body = await resp.json();
                if (body && body.list && body.list[0] && body.list[0].main && typeof body.list[0].main.aqi !== 'undefined') {
                    const aqiIndex = body.list[0].main.aqi; // 1-5
                    const labels = {
                        1: 'Good',
                        2: 'Fair',
                        3: 'Moderate',
                        4: 'Poor',
                        5: 'Very Poor'
                    };
                    const label = labels[aqiIndex] || 'Unknown';
                    return ` | ${label} (${aqiIndex}) AQI`;
                }
            }
        }

    } catch (err) {
        console.error('AQI fetch error:', err);
    }

    // Nothing available
    return '';
}

// ========================================
// ========================================
// Links Grid Rendering
// ========================================

function renderLinksGrid() {
    if (!linksGrid) return;
    
    const colorMode = settings.colorMode;
    
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
                        <a href="${link.url}" class="link-card" target="_blank" rel="noopener noreferrer">
                            <span class="link-icon"><i class="${link.icon || 'fa-solid fa-link'}"></i></span>
                            <span class="link-text">${link.name}</span>
                        </a>
                    `).join('')}
                </div>
            </section>
        `;
    }).join('');
    
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
    
    // Help modal elements
    const helpBtn = document.getElementById('help-btn');
    const helpOverlay = document.getElementById('help-overlay');
    const helpClose = document.getElementById('help-close');
    
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
    
    // Help modal
    if (helpBtn && helpOverlay && helpClose) {
        helpBtn.addEventListener('click', () => {
            helpOverlay.classList.add('active');
        });
        
        helpClose.addEventListener('click', () => {
            helpOverlay.classList.remove('active');
        });
        
        helpOverlay.addEventListener('click', (e) => {
            if (e.target === helpOverlay) {
                helpOverlay.classList.remove('active');
            }
        });
    }
    
    // Close on Escape key
    document. addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (settingsOverlay.classList. contains('active')) {
                settingsOverlay.classList.remove('active');
            }
            if (helpOverlay && helpOverlay.classList.contains('active')) {
                helpOverlay.classList.remove('active');
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

            if (setting === 'theme') {
                applyTheme(value);
            } else if (setting === 'colorMode') {
                applyColorMode(value);
            } else if (setting === 'timeFormat') {
                updateDateTime();
            } else if (setting === 'tempUnit') {
                updateWeather();
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

    // WAQI API key input handler
    const waqiInput = document.getElementById('setting-waqi-api-key');
    if (waqiInput) {
        waqiInput.addEventListener('input', (e) => {
            saveSettings('waqiApiKey', e.target.value.trim());
        });

        waqiInput.addEventListener('blur', () => {
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

    // Backup export/import handlers
    const exportBtn = document.getElementById('export-backup-btn');
    const importInput = document.getElementById('import-backup-input');
    const importBtn = document.getElementById('import-backup-btn');

    if (exportBtn) {
        exportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Open export options modal
            const em = document.getElementById('export-options-modal');
            if (em) {
                em.classList.add('active');
                em.setAttribute('aria-hidden', 'false');
            }
        });
    }

    if (importBtn && importInput) {
        importBtn.addEventListener('click', (e) => {
            e.preventDefault();
            importInput.value = '';
            importInput.click();
        });

        importInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) handleImportFile(file);
        });
    }
    
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

    // Populate WAQI API key input
    const waqiInput = document.getElementById('setting-waqi-api-key');
    if (waqiInput) {
        waqiInput.value = settings.waqiApiKey || '';
    }
    
    // Populate search engine checkboxes
    document.querySelectorAll('#search-engine-options input').forEach(checkbox => {
        checkbox.checked = settings.enabledEngines.includes(checkbox.dataset.engine);
    });
    
    updateToggleStates();
}

// ========================================
// Backup / Restore
// ========================================

function buildBackupObject() {
    return {
        meta: {
            version: 1,
            timestamp: new Date().toISOString(),
            generatedBy: 'startpage'
        },
        settings: {
            userName: settings.userName || '',
            theme: settings.theme || 'dark',
            colorMode: settings.colorMode || 'multi',
            timeFormat: settings.timeFormat || '12',
            tempUnit: settings.tempUnit || 'C',
            enabledEngines: settings.enabledEngines || [],
            preferredEngine: settings.preferredEngine || 'google',
            weatherLocation: settings.weatherLocation || ''
        },
        categories: categories,
        links: links
    };
}

function exportBackup() {
    try {
        const backup = buildBackupObject();
        const json = JSON.stringify(backup, null, 2);
        const now = new Date();
        const pad = n => String(n).padStart(2, '0');
        const filename = `startpage-backup-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.json`;

        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Export failed', err);
        showResultModal('Export Failed', 'Failed to export backup. See console for details.');
    }
}

// Export selected sections (used by export options modal)
function exportSelectedSections({ settings: exSettings, categories: exCats, links: exLinks, includeKeys }) {
    try {
        const now = new Date();
        const pad = n => String(n).padStart(2, '0');
        const filename = `startpage-backup-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.json`;

        const out = { meta: { version: 1, timestamp: new Date().toISOString(), generatedBy: 'startpage' } };

        if (exSettings) {
            out.settings = {
                userName: settings.userName || '',
                theme: settings.theme || 'dark',
                colorMode: settings.colorMode || 'multi',
                timeFormat: settings.timeFormat || '12',
                tempUnit: settings.tempUnit || 'C',
                enabledEngines: settings.enabledEngines || [],
                preferredEngine: settings.preferredEngine || 'google',
                weatherLocation: settings.weatherLocation || ''
            };
            if (includeKeys) {
                out.settings.openWeatherApiKey = settings.openWeatherApiKey || '';
                out.settings.waqiApiKey = settings.waqiApiKey || '';
            }
        }

        if (exCats) {
            out.categories = categories;
        }

        if (exLinks) {
            out.links = links;
        }

        const json = JSON.stringify(out, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        // Close export modal silently (no alert)
        const em = document.getElementById('export-options-modal');
        if (em) { em.classList.remove('active'); em.setAttribute('aria-hidden', 'true'); }
    } catch (err) {
        console.error('Export selected failed', err);
        showResultModal('Export Failed', 'Failed to export selected sections. See console for details.');
    }
}

// Show a small result modal inside settings
function showResultModal(title, message) {
    const modal = document.getElementById('import-result-modal');
    const titleEl = document.getElementById('import-result-title');
    const msgEl = document.getElementById('import-result-message');
    if (!modal) {
        // Fallback to alert if modal missing
        alert(message);
        return;
    }
    titleEl.textContent = title || 'Result';
    msgEl.textContent = message || '';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
}

// Close handler for modal
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('import-modal-close');
    const modal = document.getElementById('import-result-modal');
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        });
    }
    
    // Import confirm modal buttons
    const importMergeBtn = document.getElementById('import-merge-btn');
    const importReplaceBtn = document.getElementById('import-replace-btn');
    const importCancelBtn = document.getElementById('import-cancel-btn');
    const importConfirmModal = document.getElementById('import-confirm-modal');

    if (importMergeBtn) {
        importMergeBtn.addEventListener('click', () => {
            if (window.__importCandidate) {
                applyBackupMerge(window.__importCandidate);
            }
            if (importConfirmModal) { importConfirmModal.classList.remove('active'); importConfirmModal.setAttribute('aria-hidden', 'true'); }
        });
    }

    if (importReplaceBtn) {
        importReplaceBtn.addEventListener('click', () => {
            if (window.__importCandidate) {
                applyBackupReplace(window.__importCandidate);
            }
            if (importConfirmModal) { importConfirmModal.classList.remove('active'); importConfirmModal.setAttribute('aria-hidden', 'true'); }
        });
    }

    if (importCancelBtn) {
        importCancelBtn.addEventListener('click', () => {
            if (importConfirmModal) { importConfirmModal.classList.remove('active'); importConfirmModal.setAttribute('aria-hidden', 'true'); }
            window.__importCandidate = null;
        });
    }

    // Export options modal buttons
    const exportModal = document.getElementById('export-options-modal');
    const exportCancelBtn = document.getElementById('export-cancel-btn');
    const exportConfirmBtn = document.getElementById('export-confirm-btn');
    if (exportCancelBtn) {
        exportCancelBtn.addEventListener('click', () => {
            if (exportModal) { exportModal.classList.remove('active'); exportModal.setAttribute('aria-hidden', 'true'); }
        });
    }

    if (exportConfirmBtn) {
        exportConfirmBtn.addEventListener('click', () => {
            const exSettings = document.getElementById('exp-settings')?.checked;
            const exCats = document.getElementById('exp-categories')?.checked;
            const exLinks = document.getElementById('exp-links')?.checked;
            const includeKeys = document.getElementById('exp-include-keys')?.checked;

            if (!exSettings && !exCats && !exLinks) {
                showResultModal('Export Error', 'Please select at least one section to export.');
                return;
            }

            exportSelectedSections({ settings: !!exSettings, categories: !!exCats, links: !!exLinks, includeKeys: !!includeKeys });
        });
    }
});

function applyBackupReplace(backup) {
    try {
        // Replace settings (but DO NOT overwrite API keys)
        const s = backup.settings || {};
        saveSettings('userName', s.userName || '');
        saveSettings('theme', s.theme || 'dark');
        saveSettings('colorMode', s.colorMode || 'multi');
        saveSettings('timeFormat', s.timeFormat || '12');
        saveSettings('tempUnit', s.tempUnit || 'C');
        saveSettings('enabledEngines', s.enabledEngines || []);
        saveSettings('preferredEngine', s.preferredEngine || (s.enabledEngines && s.enabledEngines[0]) || 'google');
        saveSettings('weatherLocation', s.weatherLocation || '');

        // Replace categories and links
        categories = Array.isArray(backup.categories) ? backup.categories : [];
        links = backup.links || {};

        saveCategories(categories);
        saveLinks(links);

        // Re-render UI
        renderCategoriesSettings();
        renderLinksGrid();
        renderSearchEngines();
        populateSettingsUI();

        showResultModal('Import Complete', 'Backup imported (replace).');
    } catch (err) {
        console.error('Apply replace failed', err);
        showResultModal('Import Failed', 'Failed to apply backup. See console for details.');
    }
}

function applyBackupMerge(backup) {
    try {
        const s = backup.settings || {};
        // Merge simple settings (overwrite current with backup where present)
        if (s.userName) saveSettings('userName', s.userName);
        if (s.theme) saveSettings('theme', s.theme);
        if (s.colorMode) saveSettings('colorMode', s.colorMode);
        if (s.timeFormat) saveSettings('timeFormat', s.timeFormat);
        if (s.tempUnit) saveSettings('tempUnit', s.tempUnit);
        if (Array.isArray(s.enabledEngines)) saveSettings('enabledEngines', Array.from(new Set([...(settings.enabledEngines||[]), ...s.enabledEngines])));
        if (s.preferredEngine) saveSettings('preferredEngine', s.preferredEngine);
        if (s.weatherLocation) saveSettings('weatherLocation', s.weatherLocation);

        // Merge categories: avoid duplicate ids. If id exists, skip; otherwise add.
        const existingIds = new Set(categories.map(c => c.id));
        (backup.categories || []).forEach(cat => {
            if (!cat.id || existingIds.has(cat.id)) {
                // generate new id to avoid collision
                const newId = 'imp_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
                categories.push({ ...cat, id: newId });
            } else {
                categories.push(cat);
            }
        });

        // Merge links: for each category in backup, append links to existing category (match by id), otherwise create new category and assign links
        Object.keys(backup.links || {}).forEach(catId => {
            const catLinks = backup.links[catId] || [];
            let targetId = catId;
            if (!categories.find(c => c.id === catId)) {
                // try to find category by name
                const byName = (backup.categories || []).find(c => c.id === catId);
                if (byName) {
                    // add category
                    categories.push(byName);
                } else {
                    // create a new category id
                    targetId = 'imp_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
                    categories.push({ id: targetId, name: catId, icon: 'fa-solid fa-folder' });
                }
            }

            if (!links[targetId]) links[targetId] = [];

            // Append links while avoiding duplicates by URL
            const existingUrls = new Set((links[targetId] || []).map(l => l.url));
            catLinks.forEach(link => {
                if (!existingUrls.has(link.url)) {
                    links[targetId].push(link);
                }
            });
        });

        // Persist
        saveCategories(categories);
        saveLinks(links);

        // Re-render UI
        renderCategoriesSettings();
        renderLinksGrid();
        renderSearchEngines();
        populateSettingsUI();

        showResultModal('Import Complete', 'Backup imported (merge).');
    } catch (err) {
        console.error('Apply merge failed', err);
        showResultModal('Import Failed', 'Failed to merge backup. See console for details.');
    }
}

function handleImportFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target.result;
            const data = JSON.parse(text);
            // Validate and show confirm modal
            const validation = validateBackup(data);
            if (!validation.valid) {
                showResultModal('Import Error', 'Backup validation failed:\n' + validation.errors.join('\n'));
                return;
            }

            // Hold parsed backup globally until user chooses Merge/Replace
            window.__importCandidate = data;

            // Open confirm modal
            const icm = document.getElementById('import-confirm-modal');
            if (icm) {
                // Build a friendly summary
                const catCount = Array.isArray(data.categories) ? data.categories.length : 0;
                const linksCount = data.links ? Object.values(data.links).reduce((s, arr) => s + (Array.isArray(arr) ? arr.length : 0), 0) : 0;
                const ts = (data.meta && data.meta.timestamp) ? new Date(data.meta.timestamp).toLocaleString() : 'unknown';
                const msg = `Backup from ${ts} — ${catCount} categories, ${linksCount} links. Use the checkbox below to include API keys if desired.`;
                const msgEl = document.getElementById('import-confirm-message');
                if (msgEl) msgEl.textContent = msg;
                icm.classList.add('active');
                icm.setAttribute('aria-hidden', 'false');
            } else {
                // fallback: replace immediately
                applyBackupReplace(data);
            }
        } catch (err) {
            console.error('Import parse error', err);
            showResultModal('Import Failed', 'Failed to parse backup file. Make sure it is valid JSON.');
        }
    };
    reader.readAsText(file);
}

// Simple JSON schema validation with friendly messages
function validateBackup(obj) {
    const errors = [];
    if (!obj || typeof obj !== 'object') {
        errors.push('File is not a valid JSON object.');
        return { valid: false, errors };
    }

    if (!obj.meta || typeof obj.meta.version === 'undefined') {
        errors.push('Missing meta.version in backup.');
    }

    if (obj.settings) {
        if (typeof obj.settings !== 'object') errors.push('settings must be an object.');
        else {
            if (obj.settings.userName && typeof obj.settings.userName !== 'string') errors.push('settings.userName must be a string.');
            if (obj.settings.enabledEngines && !Array.isArray(obj.settings.enabledEngines)) errors.push('settings.enabledEngines must be an array.');
        }
    }

    if (obj.categories) {
        if (!Array.isArray(obj.categories)) errors.push('categories must be an array.');
        else {
            obj.categories.forEach((c, i) => {
                if (!c || typeof c !== 'object') errors.push(`categories[${i}] must be an object.`);
                else {
                    if (!c.id || typeof c.id !== 'string') errors.push(`categories[${i}].id is required and must be a string.`);
                    if (!c.name || typeof c.name !== 'string') errors.push(`categories[${i}].name is required and must be a string.`);
                }
            });
        }
    }

    if (obj.links) {
        if (typeof obj.links !== 'object' || Array.isArray(obj.links)) errors.push('links must be an object mapping categoryId -> array of links.');
        else {
            Object.keys(obj.links).forEach(catId => {
                const arr = obj.links[catId];
                if (!Array.isArray(arr)) errors.push(`links['${catId}'] must be an array.`);
                else {
                    arr.forEach((l, j) => {
                        if (!l || typeof l !== 'object') errors.push(`links['${catId}'][${j}] must be an object.`);
                        else {
                            if (!l.name || typeof l.name !== 'string') errors.push(`links['${catId}'][${j}].name is required and must be a string.`);
                            if (!l.url || typeof l.url !== 'string') errors.push(`links['${catId}'][${j}].url is required and must be a string.`);
                        }
                    });
                }
            });
        }
    }

    return { valid: errors.length === 0, errors };
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
}

// ========================================
// Command palette
// ========================================

const commands = {
    'theme dark': () => applyTheme('dark'),
    'theme light': () => applyTheme('light'),
    'new tab': () => window.open('about:blank', '_blank'),
    'github': () => window.open('https://github.com', '_blank'),
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
    linksGrid = document. getElementById('links-grid');
    // Ensure weather location set to Mumbai as requested
    saveSettings('weatherLocation', 'Mumbai,IN');
    
    // Render dynamic content
    renderLinksGrid();
    renderSearchEngines();
    
    // Update time immediately and every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Toggle time format when clicking on the time element
    if (timeElement) {
        timeElement.style.cursor = 'pointer';
        timeElement.addEventListener('click', () => {
            const newFormat = settings.timeFormat === '12' ? '24' : '12';
            saveSettings('timeFormat', newFormat);
            updateDateTime();
        });
    }
    
    // Update weather
    updateWeather();
    setInterval(updateWeather, 600000);
    
    // Quotes removed
    
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
}

// ========================================
// Start the application
// ========================================

document.addEventListener('DOMContentLoaded', init);
