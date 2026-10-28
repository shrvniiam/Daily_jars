# Daily Jars

An online ordering website for homemade Maharashtrian ladoo and faral.

---

## ⚙️ Configuration & Customization

All store settings, contact details, and product catalogs can be edited directly in the JavaScript configuration files:

### 1. Editing Store Settings (`config.js`)
Store settings and owner WhatsApp channels are configured in `config.js`:
- **businessName**: Store name displayed across the website.
- **siteUrl**: Production custom domain (e.g. `"https://dailyjars.in"`).
- **whatsappNumber**: Owner's WhatsApp number with country code (e.g. `"918010089297"`). All customer orders are directed here for confirmation. If set to a placeholder (e.g. `"91XXXXXXXXXX"`), the order button is paused automatically.
- **pickupAddress**: Kitchen pickup address in Roha (e.g. `"Roha, Raigad, Maharashtra - 402109"`). All other files read from this single source of truth.
- **whatsappChannelUrl**: Optional WhatsApp Channel link (e.g. `"https://whatsapp.com/channel/XXXX"`). Automatically hidden if left as a placeholder.

### 2. Editing Products Catalog (`products.js`)
Products are defined in the `PRODUCTS` array inside `products.js`:
- **Name & Subtitle**: `name` and `subtitle`
- **Pricing**: `basePricePerKg` (price in INR per kg) and `priceDisplayTag`
- **Category & Badges**: `category` (`"ladoo"`, `"faral"`, etc.) and `badge`
- **Images & Ingredients**: `image` (filename in root folder) and `ingredients`

---

## 🚀 Running Locally
Open `index.html` directly in any web browser, or run a local server:
```bash
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000).
