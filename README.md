# 🧁 Mom's Artisan Bakery - Google Review Booster Web App

A lightweight, mobile-first, high-converting review funnel built to boost local Google Business page rankings for a home bakery business.

---

## ✨ Features

- **Ready-Made Review Templates:** Eliminates "writer's block" with one-tap curated reviews (The Gourmet Foodie, Celebration Hero, Short & Sweet, Eggless & Fresh, Chocoholic's Dream).
- **Interactive Treat & Experience Chips:** Customers can tap what they ordered (*Custom Cake, Brownies, Sourdough, Cupcakes*) and what made it special (*Melt-in-mouth, Balanced sweetness, Punctual delivery*).
- **Smart SEO Keyword Injector:** Injects high-volume local search keywords like *"artisanal bakery"*, *"custom celebration cake"*, and *"eggless"* so Google's algorithm ranks the bakery #1 on Google Maps.
- **Live Editable Google Preview Card:** Customers can easily tweak or add personal notes before posting.
- **1-Tap Clipboard + Google Maps Redirect:** Copies the review to the clipboard and directly opens the Google Review dialog with the 5-star rating box.
- **Printable Cake Box QR Stand:** Built-in QR generator so you can print stickers or small cards to drop inside cake boxes and packaging bags.
- **Ultra-Lightweight & Zero-Server:** Pure vanilla HTML, CSS, and JavaScript. 100% free to host forever.

---

## 🚀 How to Run Locally

1. Open your terminal in this folder (`c:\gpage_auto`).
2. Run:
   ```bash
   node server.js
   ```
3. Open `http://127.0.0.1:5050` in your web browser.

---

## 🌐 How to Host for Free (Zero Cost Forever)

You have 3 effortless options to publish this online with a free public URL:

### Option 1: Netlify Drop (Easiest - 30 Seconds, No Code/Git Required)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `c:\gpage_auto` folder onto the page.
3. Netlify will instantly give you a free, live, secure URL (e.g. `moms-sweet-reviews.netlify.app`).

### Option 2: GitHub Pages (100% Free Forever)
1. Create a free repository on [github.com](https://github.com) named `bakery-reviews`.
2. Push or upload these files (`index.html`, `style.css`, `app.js`, `assets/`).
3. In GitHub, go to **Settings** → **Pages** → under *Source*, select `main` (or `master`) branch and click **Save**.
4. Your site is live at: `https://<your-username>.github.io/bakery-reviews/`

### Option 3: Vercel (Instant Global CDN)
1. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository or deploy via Vercel CLI (`npx vercel`).
3. Enjoy blazing-fast global loading speeds.

---

## ⚙️ How to Customize

In `app.js`, update the top configuration block:

```javascript
const CONFIG = {
  businessName: "Mom's Artisan Home Bakery", // Change to your mom's bakery name
  tagline: "Handcrafted with Butter, Sugar & Love",
  googleReviewUrl: "https://share.google/agxZ8Q61Up1gNjKh7", // Your Google Maps review link
};
```
