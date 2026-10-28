# Daily Jars

An online ordering website for homemade Maharashtrian ladoo and faral.

---

## ⚙️ Configuration & Customization

All store settings, contact details, and product catalogs can be edited directly in the JavaScript configuration files:

### 1. Editing Store Settings (`config.js` / `products.js`)
Store details are configured in the `BUSINESS_CONFIG` object inside `products.js`:
- **Store Name & Tagline**: `businessName`, `tagline`, and `brandSubtitle`
- **WhatsApp & Phone Numbers**: Update `whatsappNumber` (e.g., `"919403000241"`) and the `phoneNumbers` array for order calls
- **Payment & UPI Details**: Set `upiId` (e.g., `"shreeganeshfaral@okaxis"`) and `merchantName`
- **Pickup & Delivery Areas**: Update `pickupAddress` and the `deliveryAreas` list with custom shipping rates

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
