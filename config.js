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

  // Founders Information
  founders: ["Reeta", "Shushila", "Nisha"],
  foundersLabel: "Founded by three friends:",

  // FSSAI Food Safety Details
  fssaiNumber: "21526071006538",
  fssaiValidUntil: "07-10-2031",

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

  // Delivery Areas & Charges (Roha ₹30, Other City ₹80)
  deliveryAreas: [
    { id: "roha", name: "Roha", charge: 30 },
    { id: "other_city", name: "Other City", charge: 80 }
  ]
};
