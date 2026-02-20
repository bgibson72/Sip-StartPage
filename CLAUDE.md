# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Sip** is a browser extension (new tab page replacement) built with vanilla HTML, CSS, and JavaScript — no frameworks, no bundler, no package manager. It supports Firefox, Chrome, and Safari.

Current version: **1.5.2** (must be updated in `manifest.json` when releasing)

## Running Locally

```bash
python -m http.server 8080
# Then open http://localhost:8080 in your browser
```

No build step is required for development. Edit files directly and refresh the browser.

## Building for Release

```bash
# Firefox extension ZIP (updates version from manifest.json automatically)
bash create-firefox-zip.sh
```

This produces `sip-v<version>-firefox.zip` ready for Firefox Add-ons submission.

For Safari, build via Xcode: `Sip Safari/Sip Safari.xcodeproj`

## Architecture

The project is a single-page application with three primary files:

- **`index.html`** (~740 lines) — Static structure, settings modal, bookmark import wizard markup
- **`script.js`** (~3,128 lines) — All application logic
- **`style.css`** (~3,509 lines) — All styling, themes, and animations

### State Management

All state persists via `localStorage` with JSON serialization. There is no external state library. Key operations:

- `loadSettings()` / `saveSettings()` — flat settings object (see `defaultSettings` in script.js)
- `loadCategories()` / `saveCategories()` — user-defined link categories
- `loadLinks()` / `saveLinks()` — bookmarks per category

### Theme System

Themes are applied by setting `data-scheme` and `data-theme` attributes on the root `<html>` element. CSS custom properties cascade from those selectors. There are 9 color schemes × 2 modes (dark/light) = 18 combinations defined entirely in `style.css`.

Functions: `applyTheme()`, `applyColorScheme()`, `applyColorMode()`, `applyCustomColors()`, `applyBackgroundImage()`

### Settings System

`initSettings()` (~350 lines) wires up all 8 settings tabs. `populateSettingsUI()` renders controls from current state. The UI uses bidirectional binding: UI events update localStorage, and state changes update DOM.

### Key Patterns

- DOM manipulation via `createElement()` and `innerHTML` — no virtual DOM
- Event delegation for dynamically rendered elements (links grid, category list)
- Mobile detection via `isMobile()` — affects defaults and UI rendering
- Browser detection for Safari-specific adjustments

### Search Engines

Defined in `allSearchEngines` array. Each engine has `id`, `name`, `url` (with `{query}` placeholder), and `icon`. Users enable/disable via settings; keyboard shortcuts `1–9` switch the active engine.

## Version Bumping

When preparing a release, update the version in:
1. `manifest.json` → `"version"` field
2. `create-firefox-zip.sh` → used for the output filename (reads from manifest automatically)
3. `README.md` → version references and changelog
