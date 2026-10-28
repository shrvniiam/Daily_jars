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
  btnSendWhatsapp: document.getElementById("btn-send-whatsapp"),
  upiModalOverlay: document.getElementById("upi-modal-overlay"),
  upiQrImg: document.getElementById("upi-qr-image"),
  upiIdText: document.getElementById("upi-id-text"),
  upiPayAmountText: document.getElementById("upi-pay-amount"),
  upiDirectPayLink: document.getElementById("upi-direct-pay-link"),
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
      <span style="font-size: 0.8rem; color: #8C7567;">Landmark: ${BUSINESS_CONFIG.landmark}</span><br>
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
 * Populate Delivery Areas Dropdown
 */
function populateDeliveryAreas() {
  if (!elements.deliveryAreaSelect) return;

  elements.deliveryAreaSelect.innerHTML = `
    <option value="">-- Select Your Delivery Area in Pune / Maharashtra --</option>
    ${BUSINESS_CONFIG.deliveryAreas.map(area => `
      <option value="${area.id}">${area.name} (+₹${area.charge})</option>
    `).join("")}
  `;

  if (BUSINESS_CONFIG.deliveryAreas.length > 0) {
    state.selectedDeliveryAreaId = BUSINESS_CONFIG.deliveryAreas[0].id;
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

  let deliveryFee = 0;
  if (state.deliveryMode === "delivery" && state.cart.length > 0) {
    const area = BUSINESS_CONFIG.deliveryAreas.find(a => a.id === state.selectedDeliveryAreaId);
    deliveryFee = area ? area.charge : (BUSINESS_CONFIG.deliveryAreas[0] ? BUSINESS_CONFIG.deliveryAreas[0].charge : 50);
  }

  const grandTotal = subtotal + deliveryFee;

  if (elements.navCartCount) elements.navCartCount.textContent = totalItemsCount;
  if (elements.cartHeaderCount) elements.cartHeaderCount.textContent = totalItemsCount;

  if (elements.cartSubtotal) elements.cartSubtotal.textContent = `₹${subtotal}`;
  if (elements.cartDeliveryFee) {
    elements.cartDeliveryFee.textContent = state.deliveryMode === "pickup" ? "FREE (Self Pickup)" : `+₹${deliveryFee}`;
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
      if (elements.deliveryAreaGroup) elements.deliveryAreaGroup.style.display = "flex";
      if (elements.deliveryAddressGroup) elements.deliveryAddressGroup.style.display = "flex";
      updateCartUI();
    });

    elements.modePickupBtn.addEventListener("click", () => {
      state.deliveryMode = "pickup";
      elements.modePickupBtn.classList.add("active");
      elements.modeDeliveryBtn.classList.remove("active");
      if (elements.deliveryAreaGroup) elements.deliveryAreaGroup.style.display = "none";
      if (elements.deliveryAddressGroup) elements.deliveryAddressGroup.style.display = "none";
      updateCartUI();
    });
  }

  if (elements.deliveryAreaSelect) {
    elements.deliveryAreaSelect.addEventListener("change", (e) => {
      state.selectedDeliveryAreaId = e.target.value;
      updateCartUI();
    });
  }

  if (elements.btnSendWhatsapp) {
    elements.btnSendWhatsapp.addEventListener("click", handleCheckoutWhatsApp);
  }

  document.querySelectorAll("[data-close-upi]").forEach(el => {
    el.addEventListener("click", () => {
      if (elements.upiModalOverlay) elements.upiModalOverlay.classList.remove("active");
    });
  });

  const copyUpiBtn = document.getElementById("btn-copy-upi");
  if (copyUpiBtn) {
    copyUpiBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(BUSINESS_CONFIG.upiId).then(() => {
        copyUpiBtn.textContent = "✓ Copied!";
        setTimeout(() => { copyUpiBtn.textContent = "Copy"; }, 2000);
      }).catch(() => {
        alert(`UPI ID: ${BUSINESS_CONFIG.upiId}`);
      });
    });
  }
}

/**
 * Generate WhatsApp Order Message (100% English)
 */
function handleCheckoutWhatsApp() {
  if (state.cart.length === 0) {
    alert("Your cart is empty! Please choose your favorite faral delicacies.");
    return;
  }

  const name = elements.customerNameInput ? elements.customerNameInput.value.trim() : "";
  const phone = elements.customerPhoneInput ? elements.customerPhoneInput.value.trim() : "";
  const address = elements.customerAddressInput ? elements.customerAddressInput.value.trim() : "";
  const date = elements.customerDateInput ? elements.customerDateInput.value.trim() : "";
  const notes = elements.customerNotesInput ? elements.customerNotesInput.value.trim() : "";

  if (!name) {
    alert("Please enter your Full Name.");
    if (elements.customerNameInput) elements.customerNameInput.focus();
    return;
  }
  if (!phone || phone.length < 10) {
    alert("Please enter a valid 10-digit Phone Number.");
    if (elements.customerPhoneInput) elements.customerPhoneInput.focus();
    return;
  }
  if (state.deliveryMode === "delivery") {
    if (!state.selectedDeliveryAreaId) {
      alert("Please select your Delivery Area.");
      if (elements.deliveryAreaSelect) elements.deliveryAreaSelect.focus();
      return;
    }
    if (!address) {
      alert("Please enter your Delivery Address & Landmark.");
      if (elements.customerAddressInput) elements.customerAddressInput.focus();
      return;
    }
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  let deliveryCharge = 0;
  let deliveryAreaName = "Self Pickup";

  if (state.deliveryMode === "delivery") {
    const area = BUSINESS_CONFIG.deliveryAreas.find(a => a.id === state.selectedDeliveryAreaId);
    deliveryCharge = area ? area.charge : 50;
    deliveryAreaName = area ? area.name : "Pune";
  }

  const grandTotal = subtotal + deliveryCharge;

  // Build WhatsApp Order in 100% English
  let message = `*✨ NEW FARAL ORDER - DAILY JAR'S BY GANESH FARAL ✨*\n\n`;
  message += `*Customer Details:*\n`;
  message += `• Name: ${name}\n`;
  message += `• Phone: ${phone}\n`;
  message += `• Order Type: ${state.deliveryMode === "delivery" ? "Home Delivery" : "Self-Pickup"}\n`;

  if (state.deliveryMode === "delivery") {
    message += `• Delivery Area: ${deliveryAreaName}\n`;
    message += `• Delivery Address: ${address}\n`;
  } else {
    message += `• Pickup Location: ${BUSINESS_CONFIG.pickupAddress}\n`;
  }

  if (date) message += `• Preferred Delivery Date: ${date}\n`;
  if (notes) message += `• Special Instructions: ${notes}\n`;

  message += `\n*Itemized Order Summary:*\n`;
  message += `--------------------------------\n`;

  state.cart.forEach((item, index) => {
    const itemTotal = item.unitPrice * item.quantity;
    message += `${index + 1}. *${item.name}* (${item.weight})\n`;
    message += `   Qty: ${item.quantity} x ₹${item.unitPrice} = *₹${itemTotal}*\n`;
  });

  message += `--------------------------------\n`;
  message += `*Subtotal:* ₹${subtotal}\n`;
  message += `*Delivery Fee (${deliveryAreaName}):* ₹${deliveryCharge}\n`;
  message += `*Grand Total Payable:* *₹${grandTotal}*\n\n`;
  message += `*Payment Details:*\n`;
  message += `• UPI ID: ${BUSINESS_CONFIG.upiId}\n`;
  message += `• Note: I will share the UPI payment screenshot on this chat to confirm.\n\n`;
  message += `Please confirm my order booking and fresh dispatch slot. Thank you!`;

  const waUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  showUpiPaymentModal(grandTotal, waUrl);
}

/**
 * UPI Modal & QR Display
 */
function showUpiPaymentModal(amount, whatsappUrl) {
  if (elements.upiPayAmountText) elements.upiPayAmountText.textContent = `₹${amount}`;
  if (elements.upiIdText) elements.upiIdText.textContent = BUSINESS_CONFIG.upiId;

  const upiUri = `upi://pay?pa=${encodeURIComponent(BUSINESS_CONFIG.upiId)}&pn=${encodeURIComponent(BUSINESS_CONFIG.merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent("Daily Jars Faral Order")}`;

  if (elements.upiQrImg) {
    elements.upiQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(upiUri)}`;
    elements.upiQrImg.alt = `UPI QR Code for ₹${amount}`;
  }

  if (elements.upiDirectPayLink) elements.upiDirectPayLink.href = upiUri;

  const modalWaBtn = document.getElementById("btn-modal-open-wa");
  if (modalWaBtn) {
    modalWaBtn.onclick = () => { window.open(whatsappUrl, "_blank"); };
  }

  if (elements.upiModalOverlay) elements.upiModalOverlay.classList.add("active");
}
