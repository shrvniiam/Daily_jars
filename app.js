/**
 * DAILY JAR'S BY GANESH FARAL - APPLICATION LOGIC
 * 100% English content. Only the 18 items from the pamphlet with cost per kg.
 */

// Application State
const state = {
  cart: [],
  selectedCategory: "all",
  deliveryMode: "delivery", // 'delivery' | 'pickup'
  selectedDeliveryAreaId: "",
  activeWeights: {} // maps productId -> currently selected weight ('250g' | '500g' | '1kg' | pieces)
};

// LocalStorage Keys
const STORAGE_KEY_CART = "daily_jars_cart_v1";

// DOM Elements Cache
const elements = {
  preorderBanner: document.getElementById("preorder-banner"),
  categoryFilterBar: document.getElementById("category-filter-bar"),
  productsGrid: document.getElementById("products-grid"),
  cartDrawer: document.getElementById("cart-drawer"),
  cartOverlay: document.getElementById("cart-overlay"),
  cartItemsList: document.getElementById("cart-items-list"),
  cartEmptyState: document.getElementById("cart-empty-state"),
  cartHeaderCount: document.getElementById("cart-header-count"),
  navCartCount: document.getElementById("nav-cart-count"),
  cartSubtotal: document.getElementById("cart-subtotal"),
  cartDeliveryFee: document.getElementById("cart-delivery-fee"),
  cartTotal: document.getElementById("cart-total"),
  deliveryAreaSelect: document.getElementById("checkout-area"),
  deliveryAreaGroup: document.getElementById("delivery-area-group"),
  deliveryAddressGroup: document.getElementById("delivery-address-group"),
  modeDeliveryBtn: document.getElementById("mode-delivery-btn"),
  modePickupBtn: document.getElementById("mode-pickup-btn"),
  customerNameInput: document.getElementById("cust-name"),
  customerPhoneInput: document.getElementById("cust-phone"),
  customerAddressInput: document.getElementById("cust-address"),
  customerDateInput: document.getElementById("cust-date"),
  customerNotesInput: document.getElementById("cust-notes"),
  btnPlaceOrder: document.getElementById("btn-place-order"),
  
  // Validation Error Elements
  nameError: document.getElementById("name-error"),
  phoneError: document.getElementById("phone-error"),
  areaError: document.getElementById("area-error"),
  addressError: document.getElementById("address-error"),
  dateError: document.getElementById("date-error"),

  // Order Summary Modal Elements
  orderSummaryModal: document.getElementById("order-summary-modal"),
  summaryOrderId: document.getElementById("summary-order-id"),
  summaryCustomerInfo: document.getElementById("summary-customer-info"),
  summaryItemsList: document.getElementById("summary-items-list"),
  summarySubtotal: document.getElementById("summary-subtotal"),
  summaryDelivery: document.getElementById("summary-delivery"),
  summaryTotal: document.getElementById("summary-total"),
  btnConfirmWhatsapp: document.getElementById("btn-confirm-whatsapp"),
  orderPendingNotice: document.getElementById("order-pending-notice"),
  waPlaceholderNotice: document.getElementById("wa-placeholder-notice"),
  orderActionsContainer: document.getElementById("order-actions-container"),
  channelContainer: document.getElementById("channel-container"),
  btnWaChannel: document.getElementById("btn-wa-channel"),

  mobileStickyBar: document.getElementById("mobile-sticky-cart-bar"),
  mobileBarQty: document.getElementById("mobile-bar-qty"),
  mobileBarTotal: document.getElementById("mobile-bar-total"),
  toastContainer: document.getElementById("toast-container"),
  phonesContainer: document.getElementById("footer-phones-list"),
  heroWaBtn: document.getElementById("hero-wa-btn"),
  floatingWaBtn: document.getElementById("floating-wa-btn"),
  pickupAddressDisplay: document.getElementById("pickup-address-display"),
  preorderDeadlineDisplay: document.getElementById("preorder-deadline-display"),
  pamphletModal: document.getElementById("pamphlet-modal")
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  populateBusinessInfo();
  populateDeliveryAreas();
  renderCategoryFilter();
  renderProducts();
  setupEventListeners();
  updateCartUI();
});

/**
 * Populate Business Information from BUSINESS_CONFIG
 */
function populateBusinessInfo() {
  const bookingBanner = document.getElementById("booking-open-banner");
  if (bookingBanner) {
    const bannerText = (typeof CONFIG !== "undefined" && typeof CONFIG.bookingBannerText !== "undefined")
      ? CONFIG.bookingBannerText
      : (typeof BUSINESS_CONFIG !== "undefined" ? BUSINESS_CONFIG.bookingBannerText : "Booking Open!");

    if (bannerText && bannerText.trim().length > 0) {
      bookingBanner.style.display = "inline-flex";
      const textSpan = bookingBanner.querySelector(".booking-banner-text");
      if (textSpan) textSpan.textContent = bannerText;
    } else {
      bookingBanner.style.display = "none";
    }
  }

  if (elements.preorderBanner) {
    elements.preorderBanner.innerHTML = `
      <div class="preorder-banner-content">
        <span class="preorder-badge">Festive Ordering</span>
        <span>${BUSINESS_CONFIG.preOrderBannerText}</span>
      </div>
    `;
  }

  if (elements.preorderDeadlineDisplay) {
    elements.preorderDeadlineDisplay.textContent = BUSINESS_CONFIG.preOrderDeadline;
  }

  if (elements.pickupAddressDisplay) {
    elements.pickupAddressDisplay.innerHTML = `
      <strong>${BUSINESS_CONFIG.businessName} Kitchen</strong><br>
      ${BUSINESS_CONFIG.pickupAddress}<br>
      ${BUSINESS_CONFIG.landmark ? `<span style="font-size: 0.8rem; color: #8C7567;">Landmark: ${BUSINESS_CONFIG.landmark}</span><br>` : ""}
      <a href="${BUSINESS_CONFIG.googleMapsUrl}" target="_blank" rel="noopener" style="color: #6B0F1A; font-weight: 600; text-decoration: underline; font-size: 0.85rem; margin-top: 4px; display: inline-block;">
        📍 View on Google Maps
      </a>
    `;
  }

  // Populate tap-to-call phone numbers from the pamphlet: 9403000241, 9158729083, 9028587291
  if (elements.phonesContainer) {
    elements.phonesContainer.innerHTML = BUSINESS_CONFIG.phoneNumbers.map(p => `
      <a href="tel:${p.tel}" class="phone-tap-link" title="Call ${p.number}">
        <span>📞</span>
        <div>
          <div style="font-size: 0.72rem; color: #F5B800;">${p.label}</div>
          <div style="font-size: 1.05rem; letter-spacing: 0.5px;">${p.number}</div>
        </div>
      </a>
    `).join("");
  }

  // WhatsApp quick order links
  const defaultWaUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${BUSINESS_CONFIG.businessName}! I would like to place an order from your faral menu.`
  )}`;

  if (elements.heroWaBtn) elements.heroWaBtn.href = defaultWaUrl;
  if (elements.floatingWaBtn) elements.floatingWaBtn.href = defaultWaUrl;

  // Pre-fill delivery date minimum to today
  if (elements.customerDateInput) {
    const today = new Date().toISOString().split("T")[0];
    elements.customerDateInput.min = today;
  }
}

/**
 * Helper to calculate current delivery fee
 */
function getDeliveryFee() {
  if (state.deliveryMode === "pickup") {
    return 0;
  }
  const area = (BUSINESS_CONFIG.deliveryAreas || []).find(a => a.id === state.selectedDeliveryAreaId);
  if (area && typeof area.charge === "number") {
    return area.charge;
  }
  return 30; // Default to Roha delivery charge ₹30
}

/**
 * Populate Delivery Areas Dropdown
 */
function populateDeliveryAreas() {
  if (!elements.deliveryAreaSelect) return;

  elements.deliveryAreaSelect.innerHTML = (BUSINESS_CONFIG.deliveryAreas || []).map(area => `
    <option value="${area.id}">${area.name === 'Roha' ? '📍 Roha (Home Delivery)' : '🚚 Other City (Courier Delivery)'} — ₹${area.charge}</option>
  `).join("");

  if (BUSINESS_CONFIG.deliveryAreas && BUSINESS_CONFIG.deliveryAreas.length > 0) {
    if (!state.selectedDeliveryAreaId) {
      state.selectedDeliveryAreaId = BUSINESS_CONFIG.deliveryAreas[0].id;
    }
    elements.deliveryAreaSelect.value = state.selectedDeliveryAreaId;
  }
}

/**
 * Render Category Filter Bar (100% English)
 */
function renderCategoryFilter() {
  const categories = [
    { id: "all", label: "🌟 All 18 Items" },
    { id: "ladoo", label: "🍯 Ladoos" },
    { id: "karanji", label: "🥟 Karanji" },
    { id: "shankarpali", label: "💎 Shankarpali" },
    { id: "savory", label: "🥨 Chakli & Chivda" },
    { id: "flour", label: "🌾 Ready Flour Premix" },
    { id: "anarase", label: "✨ Anarase" }
  ];

  if (!elements.categoryFilterBar) return;

  elements.categoryFilterBar.innerHTML = categories.map(cat => `
    <button class="filter-btn ${state.selectedCategory === cat.id ? "active" : ""}" data-category="${cat.id}">
      ${cat.label}
    </button>
  `).join("");

  elements.categoryFilterBar.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selectedCategory = btn.getAttribute("data-category");
      elements.categoryFilterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts();
    });
  });
}

/**
 * Render Products Grid (100% English)
 */
function renderProducts() {
  if (!elements.productsGrid) return;

  const filtered = state.selectedCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === state.selectedCategory);

  elements.productsGrid.innerHTML = filtered.map(product => {
    if (!state.activeWeights[product.id]) {
      state.activeWeights[product.id] = product.weightType === "piece" ? "10" : "1kg";
    }
    const currentWeight = state.activeWeights[product.id];
    const currentPrice = getProductPrice(product, currentWeight);

    let weightSelectorHtml = "";
    if (product.weightType === "piece") {
      weightSelectorHtml = `
        <div class="weight-selector-label">
          <span>Select Quantity</span>
          <span style="color: var(--color-tomato); font-weight: 700;">Rate: ${product.priceDisplayTag}</span>
        </div>
        <div class="weight-selector-chips">
          ${product.pieceOptions.map(opt => `
            <button type="button" 
                    class="weight-chip ${currentWeight === opt.pieces.toString() ? "active" : ""}" 
                    data-product-id="${product.id}" 
                    data-weight="${opt.pieces}">
              ${opt.pieces} pcs
            </button>
          `).join("")}
        </div>
      `;
    } else {
      weightSelectorHtml = `
        <div class="weight-selector-label">
          <span>Select Weight</span>
          <span style="color: var(--color-tomato); font-weight: 700;">Cost: ${product.priceDisplayTag}</span>
        </div>
        <div class="weight-selector-chips">
          <button type="button" class="weight-chip ${currentWeight === "250g" ? "active" : ""}" data-product-id="${product.id}" data-weight="250g">250g</button>
          <button type="button" class="weight-chip ${currentWeight === "500g" ? "active" : ""}" data-product-id="${product.id}" data-weight="500g">500g</button>
          <button type="button" class="weight-chip ${currentWeight === "1kg" ? "active" : ""}" data-product-id="${product.id}" data-weight="1kg">1 kg</button>
        </div>
      `;
    }

    return `
      <article class="product-card" id="card-${product.id}">
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          <span class="product-badge">${product.priceDisplayTag}</span>
          <span class="product-category-tag">${product.categoryLabel}</span>
        </div>
        <div class="product-body">
          <div class="product-title-group">
            <h3 class="product-title">${product.name}</h3>
            <span class="product-subtitle-en" style="font-size: 0.78rem; color: #8C7567; font-weight: 500;">${product.subtitle}</span>
          </div>
          <p class="product-desc">${product.description}</p>
          <div class="product-ingredients">
            <strong>Key Ingredients:</strong> ${product.ingredients}
          </div>

          ${weightSelectorHtml}

          <div class="product-card-footer">
            <div class="price-wrap">
              <span class="price-amount" id="price-display-${product.id}">₹${currentPrice}</span>
              <span class="price-unit" id="unit-display-${product.id}">for ${product.weightType === 'piece' ? currentWeight + ' pieces' : currentWeight}</span>
            </div>
            <button type="button" class="btn-add-cart" data-add-id="${product.id}">
              <span>+ Add to Cart</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Weight chip click events
  elements.productsGrid.querySelectorAll(".weight-chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      e.stopPropagation();
      const productId = chip.getAttribute("data-product-id");
      const weight = chip.getAttribute("data-weight");
      state.activeWeights[productId] = weight;

      const parentCard = document.getElementById(`card-${productId}`);
      if (parentCard) {
        parentCard.querySelectorAll(".weight-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");

        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
          const newPrice = getProductPrice(product, weight);
          const priceDisplay = parentCard.querySelector(`#price-display-${productId}`);
          const unitDisplay = parentCard.querySelector(`#unit-display-${productId}`);
          if (priceDisplay) priceDisplay.textContent = `₹${newPrice}`;
          if (unitDisplay) {
            unitDisplay.textContent = `for ${product.weightType === "piece" ? weight + " pieces" : weight}`;
          }
        }
      }
    });
  });

  // Add to cart click events
  elements.productsGrid.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-add-id");
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) return;

      const weight = state.activeWeights[productId] || (product.weightType === "piece" ? "10" : "1kg");
      const price = getProductPrice(product, weight);
      const label = product.weightType === "piece" ? `${weight} pcs` : weight;

      addToCart({
        id: `${product.id}_${weight}`,
        productId: product.id,
        name: product.name,
        weight: label,
        unitPrice: price,
        image: product.image
      });

      btn.style.transform = "scale(0.92)";
      btn.style.backgroundColor = "#1E7E34";
      btn.innerHTML = "<span>✓ Added</span>";
      setTimeout(() => {
        btn.style.transform = "";
        btn.style.backgroundColor = "";
        btn.innerHTML = "<span>+ Add to Cart</span>";
      }, 900);
    });
  });
}

/**
 * Cart State Management
 */
function addToCart(itemData) {
  const existingIndex = state.cart.findIndex(item => item.id === itemData.id);

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += 1;
  } else {
    state.cart.push({
      ...itemData,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`Added "${itemData.name} (${itemData.weight})"`);
}

function updateItemQuantity(cartItemId, delta) {
  const itemIndex = state.cart.findIndex(item => item.id === cartItemId);
  if (itemIndex === -1) return;

  state.cart[itemIndex].quantity += delta;

  if (state.cart[itemIndex].quantity <= 0) {
    state.cart.splice(itemIndex, 1);
  }

  saveCartToStorage();
  updateCartUI();
}

function removeItemFromCart(cartItemId) {
  state.cart = state.cart.filter(item => item.id !== cartItemId);
  saveCartToStorage();
  updateCartUI();
  showToast("Item removed from cart");
}

function saveCartToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(state.cart));
  } catch (e) {
    console.warn("Storage error", e);
  }
}

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CART);
    if (raw) state.cart = JSON.parse(raw);
  } catch (e) {
    state.cart = [];
  }
}

/**
 * Update Cart UI
 */
function updateCartUI() {
  const totalItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  const deliveryFee = totalItemsCount > 0 ? getDeliveryFee() : 0;
  const grandTotal = totalItemsCount > 0 ? (subtotal + deliveryFee) : 0;

  if (elements.navCartCount) elements.navCartCount.textContent = totalItemsCount;
  if (elements.cartHeaderCount) elements.cartHeaderCount.textContent = totalItemsCount;

  if (elements.cartSubtotal) elements.cartSubtotal.textContent = `₹${subtotal}`;
  if (elements.cartDeliveryFee) {
    if (state.deliveryMode === "pickup") {
      elements.cartDeliveryFee.textContent = "FREE (Self Pickup)";
    } else {
      const area = (BUSINESS_CONFIG.deliveryAreas || []).find(a => a.id === state.selectedDeliveryAreaId);
      const areaLabel = area ? area.name : (state.selectedDeliveryAreaId === "other_city" ? "Other City" : "Roha");
      elements.cartDeliveryFee.textContent = `₹${deliveryFee} (${areaLabel} Delivery)`;
    }
  }
  if (elements.cartTotal) elements.cartTotal.textContent = `₹${grandTotal}`;

  if (elements.mobileStickyBar) {
    if (totalItemsCount > 0) {
      elements.mobileStickyBar.classList.add("visible");
      if (elements.mobileBarQty) elements.mobileBarQty.textContent = `${totalItemsCount} item${totalItemsCount > 1 ? "s" : ""}`;
      if (elements.mobileBarTotal) elements.mobileBarTotal.textContent = `Total: ₹${grandTotal}`;
    } else {
      elements.mobileStickyBar.classList.remove("visible");
    }
  }

  if (state.cart.length === 0) {
    if (elements.cartEmptyState) elements.cartEmptyState.style.display = "block";
    if (elements.cartItemsList) elements.cartItemsList.style.display = "none";
  } else {
    if (elements.cartEmptyState) elements.cartEmptyState.style.display = "none";
    if (elements.cartItemsList) {
      elements.cartItemsList.style.display = "flex";
      elements.cartItemsList.innerHTML = state.cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-name" title="${item.name}">${item.name}</div>
            <div class="cart-item-meta">${item.weight} • ₹${item.unitPrice} each</div>
            <div class="cart-item-price">₹${item.unitPrice * item.quantity}</div>
          </div>
          <div class="cart-qty-controls">
            <button type="button" class="qty-btn" onclick="updateItemQuantity('${item.id}', -1)">-</button>
            <span class="qty-value">${item.quantity}</span>
            <button type="button" class="qty-btn" onclick="updateItemQuantity('${item.id}', 1)">+</button>
          </div>
          <button type="button" class="cart-remove-btn" title="Remove" onclick="removeItemFromCart('${item.id}')">✕</button>
        </div>
      `).join("");
    }
  }
}

/**
 * Toast Notification (English)
 */
function showToast(message) {
  if (!elements.toastContainer) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

/**
 * Drawer & Modal Controls
 */
function openCart() {
  if (elements.cartDrawer) elements.cartDrawer.classList.add("active");
  if (elements.cartOverlay) elements.cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  if (elements.cartDrawer) elements.cartDrawer.classList.remove("active");
  if (elements.cartOverlay) elements.cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

function openPamphletModal() {
  if (elements.pamphletModal) elements.pamphletModal.classList.add("active");
}

function closePamphletModal() {
  if (elements.pamphletModal) elements.pamphletModal.classList.remove("active");
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
  document.querySelectorAll("[data-open-cart]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openCart();
    });
  });

  document.querySelectorAll("[data-close-cart]").forEach(el => {
    el.addEventListener("click", closeCart);
  });

  if (elements.cartOverlay) {
    elements.cartOverlay.addEventListener("click", closeCart);
  }

  // Pamphlet Modal triggers
  document.querySelectorAll("[data-open-pamphlet]").forEach(el => {
    el.addEventListener("click", openPamphletModal);
  });
  document.querySelectorAll("[data-close-pamphlet]").forEach(el => {
    el.addEventListener("click", closePamphletModal);
  });

  // Delivery vs Pickup
  if (elements.modeDeliveryBtn && elements.modePickupBtn) {
    elements.modeDeliveryBtn.addEventListener("click", () => {
      state.deliveryMode = "delivery";
      elements.modeDeliveryBtn.classList.add("active");
      elements.modePickupBtn.classList.remove("active");
      if (elements.deliveryAddressGroup) elements.deliveryAddressGroup.style.display = "block";
      if (elements.deliveryAreaGroup) elements.deliveryAreaGroup.style.display = "block";
      updateCartUI();
    });

    elements.modePickupBtn.addEventListener("click", () => {
      state.deliveryMode = "pickup";
      elements.modePickupBtn.classList.add("active");
      elements.modeDeliveryBtn.classList.remove("active");
      if (elements.deliveryAddressGroup) elements.deliveryAddressGroup.style.display = "none";
      if (elements.deliveryAreaGroup) elements.deliveryAreaGroup.style.display = "none";
      updateCartUI();
    });
  }

  // Delivery Area Selection change
  if (elements.deliveryAreaSelect) {
    elements.deliveryAreaSelect.addEventListener("change", (e) => {
      state.selectedDeliveryAreaId = e.target.value;
      updateCartUI();
    });
  }

  // Clear inline errors as user types
  if (elements.customerNameInput) {
    elements.customerNameInput.addEventListener("input", () => {
      if (elements.nameError) elements.nameError.classList.remove("visible");
      elements.customerNameInput.classList.remove("input-error");
    });
  }
  if (elements.customerPhoneInput) {
    elements.customerPhoneInput.addEventListener("input", () => {
      if (elements.phoneError) elements.phoneError.classList.remove("visible");
      elements.customerPhoneInput.classList.remove("input-error");
    });
  }
  if (elements.customerAddressInput) {
    elements.customerAddressInput.addEventListener("input", () => {
      if (elements.addressError) elements.addressError.classList.remove("visible");
      elements.customerAddressInput.classList.remove("input-error");
    });
  }

  // Set min date on date input to today
  if (elements.customerDateInput) {
    const todayStr = new Date().toISOString().split("T")[0];
    elements.customerDateInput.min = todayStr;
  }

  // Place Order button in cart drawer
  if (elements.btnPlaceOrder) {
    elements.btnPlaceOrder.addEventListener("click", handlePlaceOrder);
  }

  // Close Order Summary modal
  document.querySelectorAll("[data-close-order-modal]").forEach(el => {
    el.addEventListener("click", closeOrderSummaryModal);
  });

  // Confirm on WhatsApp button in Order Summary modal
  if (elements.btnConfirmWhatsapp) {
    elements.btnConfirmWhatsapp.addEventListener("click", handleConfirmWhatsApp);
  }

  // Setup Floating and Hero WhatsApp links from CONFIG
  setupWhatsAppLinks();
}

/**
 * Configure floating WhatsApp button and links from master CONFIG
 */
function setupWhatsAppLinks() {
  const waNumber = getWhatsAppNumber();
  const waDirectUrl = isPlaceholder(waNumber) ? "#" : `https://wa.me/${waNumber}`;

  if (elements.floatingWaBtn) {
    elements.floatingWaBtn.href = waDirectUrl;
    if (isPlaceholder(waNumber)) {
      elements.floatingWaBtn.title = "WhatsApp number not configured";
    }
  }

  if (elements.heroWaBtn) {
    elements.heroWaBtn.href = waDirectUrl;
  }
}

/**
 * Helper: Read WhatsApp number strictly from CONFIG (digits only)
 */
function getWhatsAppNumber() {
  const raw = (typeof CONFIG !== "undefined" && CONFIG.whatsappNumber) 
    ? String(CONFIG.whatsappNumber).trim() 
    : (BUSINESS_CONFIG.whatsappNumber ? String(BUSINESS_CONFIG.whatsappNumber).trim() : "");
  return raw.replace(/[^\d]/g, "");
}

/**
 * Helper: Detect placeholder values
 */
function isPlaceholder(value) {
  if (!value || typeof value !== "string") return true;
  const v = value.trim();
  if (v === "" || v.includes("[") || v.includes("]")) return true;
  if (/x{3,}/i.test(v)) return true; // contains XXX or xxx
  if (v === "91XXXXXXXXXX") return true;
  return false;
}

/**
 * Helper: Escape HTML to prevent injection
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Helper: Generate Order ID like DJ-YYMMDD-XXXX
 */
function generateOrderId() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let rand = "";
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DJ-${yy}${mm}${dd}-${rand}`;
}

// Active pending order state
let activeOrder = null;

/**
 * Checkout Step 1 & 2: Validate Fields and Show Order Summary Screen
 */
function handlePlaceOrder() {
  if (state.cart.length === 0) {
    showToast("Your cart is empty! Please choose items to order.");
    return;
  }

  // Clear previous errors
  let hasErrors = false;
  let firstErrorEl = null;

  const clearErr = (input, err) => {
    if (input) input.classList.remove("input-error");
    if (err) err.classList.remove("visible");
  };
  const setErr = (input, err, msg) => {
    if (input) input.classList.add("input-error");
    if (err) {
      if (msg) err.textContent = msg;
      err.classList.add("visible");
    }
    hasErrors = true;
    if (!firstErrorEl && input) firstErrorEl = input;
  };

  clearErr(elements.customerNameInput, elements.nameError);
  clearErr(elements.customerPhoneInput, elements.phoneError);
  clearErr(elements.customerAddressInput, elements.addressError);
  clearErr(elements.customerDateInput, elements.dateError);

  const name = elements.customerNameInput ? elements.customerNameInput.value.trim() : "";
  const rawPhone = elements.customerPhoneInput ? elements.customerPhoneInput.value.trim() : "";
  const address = elements.customerAddressInput ? elements.customerAddressInput.value.trim() : "";
  const date = elements.customerDateInput ? elements.customerDateInput.value.trim() : "";
  const notes = elements.customerNotesInput ? elements.customerNotesInput.value.trim() : "";

  // 1. Validate Full Name
  if (!name || name.length < 2) {
    setErr(elements.customerNameInput, elements.nameError, "Please enter your full name.");
  }

  // 2. Validate 10-digit Indian Mobile Number
  const digitsOnly = rawPhone.replace(/\D/g, "");
  let cleanPhone = digitsOnly;
  if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
    cleanPhone = digitsOnly.slice(2);
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
    cleanPhone = digitsOnly.slice(1);
  }

  const indianPhoneRegex = /^[6-9]\d{9}$/;
  if (!cleanPhone || !indianPhoneRegex.test(cleanPhone)) {
    setErr(elements.customerPhoneInput, elements.phoneError, "Please enter a valid 10-digit Indian mobile number (e.g. 9822001122).");
  }

  // 3. Validate Delivery Mode & Address
  const deliveryCharge = getDeliveryFee();

  if (state.deliveryMode === "delivery") {
    if (!address || address.length < 5) {
      setErr(elements.customerAddressInput, elements.addressError, "Please enter your full delivery address with landmark.");
    }
  }

  if (hasErrors) {
    if (firstErrorEl) firstErrorEl.focus();
    return;
  }

  // Calculate totals
  const subtotal = state.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const grandTotal = subtotal + deliveryCharge;

  // Generate unique Order ID
  const orderId = generateOrderId();

  const area = (BUSINESS_CONFIG.deliveryAreas || []).find(a => a.id === state.selectedDeliveryAreaId);
  const areaLabel = area ? area.name : (state.selectedDeliveryAreaId === "other_city" ? "Other City" : "Roha");

  // Build English WhatsApp Order Message exactly per template
  let waMessage = `New Order ${orderId}\n`;
  waMessage += `Name: ${name}\n`;
  waMessage += `Phone: ${cleanPhone}\n`;
  waMessage += `Items:\n`;
  state.cart.forEach(item => {
    const itemTotal = item.unitPrice * item.quantity;
    waMessage += `- ${item.name}, ${item.weight}, Qty: ${item.quantity}, Price: ₹${itemTotal}\n`;
  });
  waMessage += `Subtotal: ₹${subtotal}\n`;
  waMessage += `Delivery: ${state.deliveryMode === "delivery" ? `₹${deliveryCharge} (${areaLabel})` : "₹0 (Self-Pickup)"}\n`;
  waMessage += `Total: ₹${grandTotal}\n`;

  if (state.deliveryMode === "delivery") {
    waMessage += `Delivery or Pickup: Delivery (${areaLabel}) - ${address}\n`;
  } else {
    waMessage += `Delivery or Pickup: Pickup - ${BUSINESS_CONFIG.pickupAddress}\n`;
  }

  waMessage += `Preferred date: ${date ? date : "Standard festive dispatch"}\n`;
  if (notes) {
    waMessage += `Special instructions: ${notes}\n`;
  }
  waMessage += `\nPlease confirm my order and share the payment details.`;

  // Store active order state
  activeOrder = {
    orderId,
    name,
    phone: cleanPhone,
    deliveryMode: state.deliveryMode,
    address,
    date,
    notes,
    items: [...state.cart],
    subtotal,
    deliveryCharge,
    grandTotal,
    waMessage
  };

  // Populate Order Summary Modal with escaped HTML
  if (elements.summaryOrderId) elements.summaryOrderId.textContent = orderId;
  if (elements.summarySubtotal) elements.summarySubtotal.textContent = `₹${subtotal}`;
  if (elements.summaryDelivery) {
    elements.summaryDelivery.textContent = state.deliveryMode === "delivery" ? `₹${deliveryCharge} (${areaLabel})` : "₹0 (Self-Pickup)";
  }
  if (elements.summaryTotal) elements.summaryTotal.textContent = `₹${grandTotal}`;

  if (elements.summaryCustomerInfo) {
    elements.summaryCustomerInfo.innerHTML = `
      <div><strong>Customer:</strong> ${escapeHtml(name)} • ${escapeHtml(cleanPhone)}</div>
      <div><strong>Fulfillment:</strong> ${state.deliveryMode === "delivery" ? "Home Delivery" : `Self-Pickup (${(typeof CONFIG !== "undefined" && CONFIG.city) ? CONFIG.city : "Roha"} Kitchen)`}</div>
      ${state.deliveryMode === "delivery" 
        ? `<div><strong>Address:</strong> ${escapeHtml(address)}</div>` 
        : `<div><strong>Pickup Kitchen:</strong> ${escapeHtml(BUSINESS_CONFIG.pickupAddress)}</div>`}
      ${date ? `<div><strong>Preferred Date:</strong> ${escapeHtml(date)}</div>` : ""}
      ${notes ? `<div><strong>Notes:</strong> ${escapeHtml(notes)}</div>` : ""}
    `;
  }

  if (elements.summaryItemsList) {
    elements.summaryItemsList.innerHTML = state.cart.map(item => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:0.4rem 0; border-bottom:1px solid #F0E7CB;">
        <div>
          <div style="font-weight:600; color:#2D1B14;">${escapeHtml(item.name)}</div>
          <div style="font-size:0.75rem; color:#887268;">${escapeHtml(item.weight)} • Qty: ${item.quantity} × ₹${item.unitPrice}</div>
        </div>
        <div style="font-weight:700; color:#C54F2D;">₹${item.unitPrice * item.quantity}</div>
      </div>
    `).join("");
  }

  // Check if owner's WhatsApp number is still a placeholder
  const waNumber = getWhatsAppNumber();
  const rawWaConfig = (typeof CONFIG !== "undefined" && CONFIG.whatsappNumber) ? CONFIG.whatsappNumber : "";

  if (isPlaceholder(rawWaConfig) || waNumber.length < 10) {
    if (elements.orderActionsContainer) elements.orderActionsContainer.style.display = "none";
    if (elements.waPlaceholderNotice) elements.waPlaceholderNotice.style.display = "block";
  } else {
    if (elements.orderActionsContainer) elements.orderActionsContainer.style.display = "block";
    if (elements.waPlaceholderNotice) elements.waPlaceholderNotice.style.display = "none";
  }

  // Reset confirmation notice and button state
  if (elements.orderPendingNotice) elements.orderPendingNotice.style.display = "none";
  if (elements.btnConfirmWhatsapp) {
    elements.btnConfirmWhatsapp.innerHTML = `<span>💬</span> Send Order on WhatsApp for Confirmation`;
  }

  // WhatsApp Channel secondary button
  const channelUrl = (typeof CONFIG !== "undefined" && CONFIG.whatsappChannelUrl) ? CONFIG.whatsappChannelUrl : "";
  if (!isPlaceholder(channelUrl)) {
    if (elements.channelContainer) elements.channelContainer.style.display = "block";
    if (elements.btnWaChannel) elements.btnWaChannel.href = channelUrl;
  } else {
    if (elements.channelContainer) elements.channelContainer.style.display = "none";
  }

  // Close cart drawer and display Order Summary modal
  closeCart();
  if (elements.orderSummaryModal) elements.orderSummaryModal.classList.add("active");
}

/**
 * Checkout Step 4 & 5: Customer sends order on WhatsApp
 */
function handleConfirmWhatsApp() {
  if (!activeOrder) return;

  const waNumber = getWhatsAppNumber();
  if (isPlaceholder(waNumber) || waNumber.length < 10) {
    alert("Owner WhatsApp number is not configured in config.js yet.");
    return;
  }

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(activeOrder.waMessage)}`;
  window.open(waUrl, "_blank");

  // Show pending confirmation notice
  if (elements.orderPendingNotice) {
    elements.orderPendingNotice.style.display = "flex";
  }

  // Update button so they can re-open WhatsApp if needed
  if (elements.btnConfirmWhatsapp) {
    elements.btnConfirmWhatsapp.innerHTML = `<span>💬</span> Reopen WhatsApp Message`;
  }

  // Clear cart ONLY after clicking the WhatsApp button
  state.cart = [];
  saveCartToStorage();
  updateCartUI();

  // Keep the summary modal open!
}

/**
 * Close Order Summary Modal
 */
function closeOrderSummaryModal() {
  if (elements.orderSummaryModal) {
    elements.orderSummaryModal.classList.remove("active");
  }
}

