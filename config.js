/**
 * DAILY JARS - MASTER CONFIGURATION
 * 
 * All business details, addresses, and WhatsApp links are read ONLY from here.
 * Never hard-code these values anywhere else.
 * Never add any API keys, secrets, or passwords to front-end code.
 */
const CONFIG = {
  // Business display name
  businessName: "Daily Jar's by Ganesh Faral",
  brandSubtitle: "by Ganesh Faral • Roha, Raigad",
  siteUrl: "https://dailyjars.in",

  // Booking / Festive announcement banner (set to "" to hide)
  bookingBannerText: "Booking Open!",

  // Owner WhatsApp number (digits only with country code)
  whatsappNumber: "918010089297",

  // Official WhatsApp Channel URL for festival updates & offers
  whatsappChannelUrl: "[CHANNEL LINK]",

  // Single Source of Truth for Kitchen Address in Roha
  pickupAddress: "Roha, Raigad, Maharashtra - 402109",
  landmark: "",
  city: "Roha",
  district: "Raigad",
  state: "Maharashtra",
  pincode: "402109",
  googleMapsUrl: "https://maps.google.com/?q=Roha+Raigad+Maharashtra+402109",

  // Delivery Areas in Roha
  deliveryAreas: [
    { id: "roha_town", name: "Roha Town", charge: 0 },
    { id: "dhatav", name: "Dhatav / MIDC Roha", charge: 0 },
    { id: "raigad_district", name: "Raigad District", charge: 0 }
  ]
};
