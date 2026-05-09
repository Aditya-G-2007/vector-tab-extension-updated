# Vector Tab Extension

A high-performance, minimalist New Tab browser extension designed for developers and power users. Vector Tab replaces the default start page with a streamlined dashboard featuring real-time market data, localized weather, and productivity tools—all while maintaining a near-zero performance footprint.

## 🚀 Key Features

* **Real-time Market Data:** Live Bitcoin tracking (Current, High, Low) powered by the CoinGecko API.
  
* **Localized Weather:** Dynamic weather updates and icons based on your precise geolocation via OpenWeatherMap.

* **Curated News Feed:** A clean, card-based top-headlines interface to stay informed without the clutter.
* **Persistent To-Do List:** A modular, popup-based task manager using the modern HTML5 `<dialog>` element.
* **Centralized Search:** Integrated Google Programmable Search Engine for seamless web navigation.
* **Optimized Performance:** Built with Vanilla JavaScript (no heavy frameworks) and smart `setInterval` management to minimize API calls and CPU usage.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+)
* **APIs:** 
  * OpenWeatherMap (Weather & Geolocation)
  * CoinGecko (Crypto Market Data)
  * NewsAPI (Top Headlines)
  * Google Custom Search (Search Engine)
  * Unsplash (Dynamic Backgrounds)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone github.com
   ```

2. **Handle API Keys:**
   * Create a `secret.js` file in the root directory.
   * Add your credentials (see `secret.example.js` for the template).

3. **Load in Browser:**
   * Open Chrome/Edge and navigate to `chrome://extensions`.
   * Enable **Developer Mode**.
   * Click **Load unpacked** and select the project folder.

## 🔒 Security Note

This project uses a `.gitignore` file to ensure `secret.js` is never pushed to public repositories. Always keep your API keys private.

## 🎨 UI/UX Design

The dashboard follows a "Dark Mode" aesthetic, utilizing a side-panel widget layout to maximize screen real estate for the central search and time display. The To-Do list is implemented as an overlay to reduce visual noise when not in use.
