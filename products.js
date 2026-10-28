/**
 * DAILY JAR'S BY GANESH FARAL - CONFIGURATION & PRODUCTS
 * 
 * 100% English content.
 * 18 authentic items from the pamphlet with cost per kg.
 */

const BUSINESS_CONFIG = {
  businessName: (typeof CONFIG !== "undefined" && CONFIG.businessName) ? CONFIG.businessName : "Daily Jar's by Ganesh Faral",
  shortName: "Daily Jar's",
  brandSubtitle: "by Ganesh Faral • Pune",
  tagline: "Homemade Taste, Sweetness of Tradition",
  ownerName: "Mrs. Sunita Kulkarni",
  
  // WhatsApp ordering number (read exclusively from config.js)
  whatsappNumber: (typeof CONFIG !== "undefined" && CONFIG.whatsappNumber) ? CONFIG.whatsappNumber : "", 
  whatsappChannelUrl: (typeof CONFIG !== "undefined" && CONFIG.whatsappChannelUrl) ? CONFIG.whatsappChannelUrl : "",

  // Contact phone numbers from the pamphlet (tap-to-call)
  phoneNumbers: [
    { label: "Orders & Support", number: "9403000241", tel: "+919403000241" },
    { label: "Kitchen Helpline", number: "9158729083", tel: "+919158729083" },
    { label: "Dispatch Desk", number: "9028587291", tel: "+919028587291" }
  ],
  
  // Social & Pickup
  instagramHandle: "@dailyjarsbyganeshfaral",
  instagramUrl: "https://instagram.com/shreeganeshfaral",
  pickupAddress: "Flat 402, Ganesh Krupa Heights, Near Ganpati Temple, Paud Road, Kothrud, Pune - 411038",
  landmark: "Opposite Sahyadri Hospital Lane",
  googleMapsUrl: "https://maps.google.com/?q=Kothrud+Pune",
  
  // Top Banner Notice (All in English)
  preOrderDeadline: "Open for Festive Season (Diwali & Ganesh Festivals)",
  preOrderBannerText: "✨ Order from the comfort of your home! 100% Pure Ingredients • Traditional Homemade Preparation • Special Orders Accepted for All Occasions.",
  dailyOrderNotice: "Limited batches handcrafted daily to ensure maximum crunch and freshness (Max 25 orders/day).",
  pamphletImage: "pamphlet.jpg",

  // Delivery Areas & Shipping Rates in INR (₹)
  deliveryAreas: [
    { id: "kothrud", name: "Kothrud / Karve Nagar", charge: 40 },
    { id: "deccan", name: "Deccan / Shivaji Nagar / FC Road", charge: 60 },
    { id: "baner", name: "Baner / Balewadi / Aundh / Pashan", charge: 80 },
    { id: "wakad", name: "Wakad / Hinjawadi / Pimple Saudagar", charge: 100 },
    { id: "peth", name: "Sadashiv / Narayan / Shaniwar Peth", charge: 50 },
    { id: "viman", name: "Kalyani Nagar / Viman Nagar / Kharadi", charge: 120 },
    { id: "hadapsar", name: "Hadapsar / Magarpatta / Wanowrie", charge: 120 },
    { id: "pcmc", name: "PCMC / Pimpri / Chinchwad / Nigdi", charge: 130 },
    { id: "other_pune", name: "Other Pune Locations (Porter actuals)", charge: 90 },
    { id: "courier", name: "Maharashtra Express Courier (2-3 days delivery)", charge: 160 }
  ]
};

/**
 * EXACT 18 PRODUCTS FROM THE PAMPHLET WITH COST PER KG (100% ENGLISH)
 */
const PRODUCTS = [
  // --- ROW 1 ---
  {
    id: "ghee-besan-ladoo",
    name: "Pure Ghee Besan Ladoo",
    subtitle: "Gram flour slow-roasted in pure cow ghee",
    category: "ladoo",
    categoryLabel: "Ladoo",
    basePricePerKg: 700,
    priceDisplayTag: "₹700 / kg",
    weightType: "weight",
    description: "Authentic roasted gram flour prepared with 100% pure cow ghee, green cardamom, and crunchy almond slivers.",
    ingredients: "Gram Flour (Chana Besan), Pure Cow Ghee, Sugar, Cardamom, Almonds",
    badge: "Pamphlet Item #1",
    image: "besan-ladoo.png"
  },
  {
    id: "dalda-besan-ladoo",
    name: "Dalda Besan Ladoo",
    subtitle: "Classic roasted gram flour ladoo",
    category: "ladoo",
    categoryLabel: "Ladoo",
    basePricePerKg: 500,
    priceDisplayTag: "₹500 / kg",
    weightType: "weight",
    description: "Classic homemade besan ladoos prepared with vanaspati ghee, roasted to a golden crumbly texture.",
    ingredients: "Chana Dal Besan, Vanaspati Ghee, Sugar, Cardamom",
    badge: "Pamphlet Item #2",
    image: "besan-ladoo.png"
  },
  {
    id: "ghee-rava-ladoo",
    name: "Pure Ghee Rava Ladoo",
    subtitle: "Semolina roasted in aromatic cow ghee",
    category: "ladoo",
    categoryLabel: "Ladoo",
    basePricePerKg: 580,
    priceDisplayTag: "₹580 / kg",
    weightType: "weight",
    description: "Fine semolina roasted gently in pure cow ghee with grated coconut, golden raisins, and fragrant cardamom.",
    ingredients: "Fine Semolina (Rava), Pure Cow Ghee, Dry Coconut, Sugar, Raisins, Cardamom",
    badge: "Pamphlet Item #3",
    image: "rava-ladoo.png"
  },
  {
    id: "dalda-rava-ladoo",
    name: "Dalda Rava Ladoo",
    subtitle: "Traditional semolina festive sweet",
    category: "ladoo",
    categoryLabel: "Ladoo",
    basePricePerKg: 500,
    priceDisplayTag: "₹500 / kg",
    weightType: "weight",
    description: "Traditional roasted semolina sweet made with vanaspati ghee, flavored with roasted cashews and raisins.",
    ingredients: "Semolina (Rava), Vanaspati Ghee, Sugar, Raisins, Cardamom",
    badge: "Pamphlet Item #4",
    image: "rava-ladoo.png"
  },

  // --- ROW 2 ---
  {
    id: "ghee-karanji",
    name: "Pure Ghee Karanji",
    subtitle: "Flaky crescent pastry fried in cow ghee",
    category: "karanji",
    categoryLabel: "Karanji",
    basePricePerKg: 650,
    priceDisplayTag: "₹650 / kg",
    weightType: "weight",
    description: "Crisp flaky crescent pastry deep fried in pure cow ghee, generously stuffed with dry coconut, poppy seeds & dry fruits.",
    ingredients: "Wheat Flour crust, Pure Cow Ghee, Grated Dry Coconut, Sugar, Khus Khus (Poppy Seeds), Cardamom",
    badge: "Pamphlet Item #5",
    image: "karanji.png"
  },
  {
    id: "oil-karanji",
    name: "Crispy Oil Karanji",
    subtitle: "Classic crisp pastry fried in oil",
    category: "karanji",
    categoryLabel: "Karanji",
    basePricePerKg: 600,
    priceDisplayTag: "₹600 / kg",
    weightType: "weight",
    description: "Crispy and light half-moon karanji fried in refined groundnut oil with a delicious sweet coconut filling.",
    ingredients: "Refined Wheat Flour, Dry Coconut, Sugar, Khus Khus, Refined Filtered Oil",
    badge: "Pamphlet Item #6",
    image: "karanji.png"
  },
  {
    id: "ghee-gul-karanji",
    name: "Ghee Jaggery Karanji",
    subtitle: "Natural organic jaggery & coconut stuffing",
    category: "karanji",
    categoryLabel: "Karanji",
    basePricePerKg: 700,
    priceDisplayTag: "₹700 / kg",
    weightType: "weight",
    description: "Traditional recipe prepared with pure cow ghee and filled with organic sticky Kolhapuri jaggery, roasted coconut, and sesame.",
    ingredients: "Flour Crust, Pure Cow Ghee, Organic Jaggery, Roasted Coconut, White Sesame, Cardamom",
    badge: "Pamphlet Item #7",
    image: "karanji.png"
  },
  {
    id: "ghee-shankarpali",
    name: "Sweet Ghee Shankarpali",
    subtitle: "Melt-in-mouth diamond sweet biscuits",
    category: "shankarpali",
    categoryLabel: "Shankarpali",
    basePricePerKg: 500,
    priceDisplayTag: "₹500 / kg",
    weightType: "weight",
    description: "Diamond-shaped bite-sized sweet treats kneaded with milk and pure cow ghee for a flaky melt-in-mouth texture.",
    ingredients: "Wheat Flour, Pure Cow Ghee, Whole Milk, Granulated Sugar",
    badge: "Pamphlet Item #8",
    image: "shankarpali.png"
  },

  // --- ROW 3 ---
  {
    id: "khare-ghee-shankarpali",
    name: "Savory Ghee Shankarpali",
    subtitle: "Spiced salty crisps with carom seeds",
    category: "shankarpali",
    categoryLabel: "Shankarpali",
    basePricePerKg: 500,
    priceDisplayTag: "₹500 / kg",
    weightType: "weight",
    description: "Savory diamond crisps delicately flavored with roasted carom seeds (ajwain), black pepper, rock salt, and pure cow ghee.",
    ingredients: "Wheat Flour, Pure Cow Ghee, Ajwain (Carom Seeds), Black Pepper, Rock Salt",
    badge: "Pamphlet Item #9",
    image: "shankarpali.png"
  },
  {
    id: "oil-shankarpali",
    name: "Crispy Oil Shankarpali",
    subtitle: "Light sweet diamond bites fried in oil",
    category: "shankarpali",
    categoryLabel: "Shankarpali",
    basePricePerKg: 400,
    priceDisplayTag: "₹400 / kg",
    weightType: "weight",
    description: "Crispy sweet diamond treats fried to golden perfection in filtered oil. A delightful tea-time snack.",
    ingredients: "Wheat Flour, Refined Oil, Sugar, Milk, Pinch of Salt",
    badge: "Pamphlet Item #10",
    image: "shankarpali.png"
  },
  {
    id: "oats-makhana-ladoo",
    name: "Oats Makhana Ladoo",
    subtitle: "Nutritious roasted oats & fox nuts sweet",
    category: "ladoo",
    categoryLabel: "Ladoo",
    basePricePerKg: 800,
    priceDisplayTag: "₹800 / kg",
    weightType: "weight",
    description: "Healthy and guilt-free treats packed with roasted rolled oats, crunchy fox nuts (makhana), dates, jaggery & pure cow ghee.",
    ingredients: "Rolled Oats, Fox Nuts (Phool Makhana), Organic Jaggery, Cow Ghee, Mixed Dry Fruits",
    badge: "Pamphlet Item #11",
    image: "makhana-ladoo.png"
  },
  {
    id: "nachni-ladoo",
    name: "Nachni (Ragi) Ladoo",
    subtitle: "Calcium-rich finger millet sweet",
    category: "ladoo",
    categoryLabel: "Ladoo",
    basePricePerKg: 700,
    priceDisplayTag: "₹700 / kg",
    weightType: "weight",
    description: "Calcium-rich sprouted ragi (finger millet) roasted with pure cow ghee and sweetened naturally with organic jaggery.",
    ingredients: "Sprouted Nachni (Ragi) Flour, Pure Cow Ghee, Organic Jaggery, Sesame Seeds, Cardamom",
    badge: "Pamphlet Item #12",
    image: "ragi-ladoo.png"
  },

  // --- ROW 4 ---
  {
    id: "methi-ladoo",
    name: "Methi (Fenugreek) Ladoo",
    subtitle: "Traditional immunity & strength booster",
    category: "ladoo",
    categoryLabel: "Ladoo",
    basePricePerKg: 1000,
    priceDisplayTag: "₹1000 / kg",
    weightType: "weight",
    description: "Ayurvedic family recipe prepared with methi, edible gum (dink), dry ginger, dates, dry fruits, and pure desi cow ghee.",
    ingredients: "Fenugreek (Methi), Edible Gum (Dink), Sunth, Cow Ghee, Jaggery, Dry Fruits, Kharik",
    badge: "Pamphlet Item #13",
    image: "methi-ladoo.png"
  },
  {
    id: "chivda",
    name: "Special Poha Chivda",
    subtitle: "Crunchy roasted flattened rice snack",
    category: "savory",
    categoryLabel: "Savory",
    basePricePerKg: 450,
    priceDisplayTag: "₹450 / kg",
    weightType: "weight",
    description: "Crispy roasted thin poha tossed with roasted peanuts, daliya, golden cashews, curry leaves & mild green chillies.",
    ingredients: "Thin Poha (Flattened Rice), Peanuts, Roasted Chana Dal, Cashews, Curry Leaves, Mustard, Green Chillies",
    badge: "Pamphlet Item #14",
    image: "chivda.png"
  },
  {
    id: "bhajani-chakli",
    name: "Bhajani Chakli",
    subtitle: "Signature 4-grain roasted spiral crisp",
    category: "savory",
    categoryLabel: "Savory",
    basePricePerKg: 600,
    priceDisplayTag: "₹600 / kg",
    weightType: "weight",
    description: "Signature authentic crunchy spiral chakli made from 4-grain slow-roasted homemade bhajani flour. Crisp and non-greasy.",
    ingredients: "Traditional Grain Bhajani (Rice, Chana Dal, Urad Dal), Sesame, Ajwain, Hing, Red Chilli",
    badge: "Pamphlet Item #15",
    image: "chakli.jpg"
  },
  {
    id: "bhajani-chakli-peeth",
    name: "Bhajani Chakli Flour",
    subtitle: "Freshly roasted multi-grain premix",
    category: "flour",
    categoryLabel: "Flour",
    basePricePerKg: 400,
    priceDisplayTag: "₹400 / kg",
    weightType: "weight",
    description: "Freshly roasted and stone-ground multi-grain bhajani flour for preparing fail-proof crunchy chaklis at home.",
    ingredients: "Slow-roasted Rice, Chana Dal, Urad Dal, Coriander Seeds, Cumin",
    badge: "Pamphlet Item #16",
    image: "chakli-flour.png"
  },
  {
    id: "anarase-peeth",
    name: "Anarase Ready Dough (Peeth)",
    subtitle: "Aged fermented rice & jaggery dough",
    category: "flour",
    categoryLabel: "Flour",
    basePricePerKg: 320,
    priceDisplayTag: "₹320 / kg",
    weightType: "weight",
    description: "Authentically prepared fermented aged rice and jaggery dough. Ready to shape and fry for delicate, mesh-patterned anarase.",
    ingredients: "Aged Ambemohar Rice, Pure Chemical-Free Jaggery, Cow Ghee",
    badge: "Pamphlet Item #17",
    image: "chakli-flour.png"
  },
  {
    id: "anarase-1-no",
    name: "Traditional Anarase (No. 1)",
    subtitle: "Crispy poppy seed coated festive sweet",
    category: "anarase",
    categoryLabel: "Anarase",
    basePricePerPiece: 30,
    priceDisplayTag: "₹30 / piece",
    weightType: "piece",
    pieceOptions: [
      { pieces: 5, price: 150, label: "5 Pieces (₹150)" },
      { pieces: 10, price: 300, label: "10 Pieces (₹300)" },
      { pieces: 20, price: 600, label: "20 Pieces (₹600)" },
      { pieces: 30, price: 900, label: "30 Pieces (₹900)" }
    ],
    description: "Crispy and porous delicacy coated with white poppy seeds (khus khus), fried to a golden crunch in pure cow ghee.",
    ingredients: "Ambemohar Fermented Rice, Organic Jaggery, Khus Khus (Poppy Seeds), Pure Cow Ghee",
    badge: "Pamphlet Item #18",
    image: "anarase.png"
  }
];

// Price calculation helper
function getProductPrice(product, weightOption) {
  if (product.weightType === 'piece') {
    const opt = product.pieceOptions.find(o => o.pieces === parseInt(weightOption));
    return opt ? opt.price : product.basePricePerPiece;
  }
  
  const basePrice = product.basePricePerKg;
  switch (weightOption) {
    case '250g':
      return Math.round(basePrice * 0.25);
    case '500g':
      return Math.round(basePrice * 0.50);
    case '1kg':
    default:
      return basePrice;
  }
}
