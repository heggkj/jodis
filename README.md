# Airgas Gas Converter Web App

This is a lightweight, installable, offline-first Progressive Web App (PWA) designed for Airgas delivery drivers and gas handlers. It allows users to:

- Select from a curated list of gases
- Input a volume and convert it to pounds
- View gas-specific properties (boiling point, enthalpy, etc.)
- Receive rotating safety tips
- Use the app without internet access (even in airplane mode)

## Features

- ✅ Touch-friendly UI for mobile
- ✅ Installable on iOS and Android home screens
- ✅ Periodic-style SVG icons for each gas
- ✅ Safety icon (no external dependencies like Font Awesome)
- ✅ Fully offline-capable (caches assets with a service worker)
- ✅ Lightweight, client-side only (no backend or server required)

## Setup

1. **Clone this repo** or upload to your private GitHub repository.
2. **Deploy via GitHub Pages**:
   - Go to Settings > Pages
   - Set source to `main` branch and `/ (root)`
   - Access at: `https://heggkj.github.io/jodis/`
3. **Install the app** on any smartphone:
   - Open in Safari (iOS) or Chrome (Android)
   - Tap “Share” → “Add to Home Screen”

## Assets Folder

All images and icons live in the `assets/` folder:
- `*.svg` for gas icons
- `airgas-logo.png`
- `safety-icon.svg`
- `favicon.ico`

## Future Improvements

- Add swipe support for carousel
- Track user interactions anonymously for analytics
- Offer seasonal/elevation presets for temperature adjustments

## License

This project is shared privately and is not licensed for commercial reuse. All assets are custom-generated or public domain.

---

🚚 _Created to support Airgas field operations by reducing calculation friction and improving safety awareness._
