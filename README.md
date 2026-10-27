# Kidoz Kids Fashion - Client Demo eCommerce Website

A modern, high-converting kids clothing shopping demo designed for **Kidoz Kids Fashion** ([@kidozkidsfashion](https://www.instagram.com/kidozkidsfashion?utm_source=qr&exln=YjMzd2YyMmszd2Iz)). Built with pure **HTML5, CSS3, and JavaScript**.

---

## 🌟 Key Features Built for the Client Demo

### 1. High-Converting WhatsApp CTAs (Omnipresent Integration)
* **Direct Product Card WhatsApp Order**: Every product has a 1-click WhatsApp order button that pre-formats the exact item name, size, and price into a ready-to-send WhatsApp message.
* **Cart Drawer WhatsApp Checkout**: Customers can add multiple items to their cart, change sizes, and click **"Checkout via WhatsApp"** to generate a clean, itemized order receipt with subtotal, free delivery calculation, and totals.
* **Instant Dispatch Form**: A standard checkout modal that gathers parent name, phone number, delivery address, and payment method (UPI / COD), then automatically opens WhatsApp with the complete order package.
* **Floating Interactive WhatsApp Widget**: A persistent WhatsApp bubble with a pulsating ring and greeting prompt for instant sizing advice.
* **Header & Sticky Mobile Nav**: Quick WhatsApp hotline buttons accessible on desktop and mobile.

### 2. Modern Kidswear eCommerce Design
* **Brand Vibe**: Playful, gentle pastel tones (blush coral, warm sunshine yellow, mint green, clean whites) with rounded cards and smooth micro-interactions.
* **Responsive Layout**: Pixel-perfect on desktops, tablets, and smartphones (includes a sticky mobile bottom app bar).
* **Interactive Catalog**:
  * Live category filter tabs (*Girls, Boys, Co-ord Sets, Festive & Party, Newborn & Toddlers*).
  * Instant search bar and sorting (*Popularity, Price Low-High, Price High-Low, Rating*).
  * Dynamic product cards with hover image cross-fade.
  * Size chips and stock badges (*Bestseller, 40% OFF, New Arrival*).
* **Quick View Modal**: Multi-angle image switcher, size selector, fabric specs (100% bio-wash cotton), and instant buy buttons.
* **Interactive Size Guide**: Sizing table (Chest, Waist, Height by age from 0-6M to 8-9Y) for Indian kidswear.
* **Free Delivery Progress Bar**: Live progress meter in the cart drawer showing how much more to add to unlock free shipping.
* **Instagram Lookbook Feed**: Showcase mimicking the `@kidozkidsfashion` social wall with like counts and direct profile links.

---

## 🚀 How to Run & Present to the Client

No build tools or installation needed! Simply double click:
```
index.html
```
or open [index.html](file:///c:/Users/asif1/Desktop/kidoz/index.html) in Google Chrome, Microsoft Edge, Safari, or Firefox.

### How to Customize Phone Number or Products:
* **Change WhatsApp Number or Instagram Handle**: Edit `STORE_CONFIG` in `js/products.js`:
  ```javascript
  const STORE_CONFIG = {
    whatsappNumber: "919891138821",
    whatsappDisplayNumber: "+91 98911 38821",
    instagramHandle: "@kidozkidsfashion"
  };
  ```
* **Add or Edit Products**: Modify the `PRODUCTS` array in `js/products.js` to change prices, photos, sizes, or descriptions.
