// Kidoz Kids Fashion - Main Application Logic

let cart = JSON.parse(localStorage.getItem('kidoz_cart')) || [];
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'popular';
let activeQuickViewProduct = null;
let selectedQuickViewSize = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderCategories();
  renderProducts();
  renderLookbook();
  updateCartUI();
  setupEventListeners();
  setupFloatingWhatsApp();
  setupSearch();
  setupSort();
  setupStickyHeader();
}

// Setup Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeNavBtn = document.getElementById('closeNavBtn');
  const navBackdrop = document.getElementById('navBackdrop');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.add('open');
      if (navBackdrop) navBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeNavBtn) closeNavBtn.addEventListener('click', closeMobileNav);
  if (navBackdrop) navBackdrop.addEventListener('click', closeMobileNav);

  // Cart Drawer open/close
  const cartButtons = document.querySelectorAll('.cart-toggle-btn');
  const cartDrawer = document.getElementById('cartDrawer');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartBackdrop = document.getElementById('cartBackdrop');

  cartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

  // Quick View Modal Close
  const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
  const quickViewModal = document.getElementById('quickViewModal');
  const quickViewBackdrop = document.getElementById('quickViewBackdrop');

  if (closeQuickViewBtn) closeQuickViewBtn.addEventListener('click', closeQuickView);
  if (quickViewBackdrop) quickViewBackdrop.addEventListener('click', closeQuickView);

  // Size Guide Modal
  const sizeGuideBtn = document.getElementById('sizeGuideLink');
  const footerSizeGuideBtn = document.getElementById('footerSizeGuide');
  const sizeGuideModal = document.getElementById('sizeGuideModal');
  const closeSizeGuideBtn = document.getElementById('closeSizeGuideBtn');
  const sizeGuideBackdrop = document.getElementById('sizeGuideBackdrop');

  if (sizeGuideBtn) {
    sizeGuideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(sizeGuideModal, sizeGuideBackdrop);
    });
  }
  if (footerSizeGuideBtn) {
    footerSizeGuideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(sizeGuideModal, sizeGuideBackdrop);
    });
  }
  if (closeSizeGuideBtn) {
    closeSizeGuideBtn.addEventListener('click', () => {
      closeModal(sizeGuideModal, sizeGuideBackdrop);
    });
  }
  if (sizeGuideBackdrop) {
    sizeGuideBackdrop.addEventListener('click', () => {
      closeModal(sizeGuideModal, sizeGuideBackdrop);
    });
  }

  // Checkout modal
  const openCheckoutBtn = document.getElementById('openCheckoutModalBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  const checkoutBackdrop = document.getElementById('checkoutBackdrop');

  if (openCheckoutBtn) {
    openCheckoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty! Add products first.', 'warning');
        return;
      }
      closeCartDrawer();
      openModal(checkoutModal, checkoutBackdrop);
      populateCheckoutSummary();
    });
  }
  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', () => {
      closeModal(checkoutModal, checkoutBackdrop);
    });
  }
  if (checkoutBackdrop) {
    checkoutBackdrop.addEventListener('click', () => {
      closeModal(checkoutModal, checkoutBackdrop);
    });
  }

  // Checkout Form Submission (WhatsApp Order & Direct Demo)
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleCheckoutSubmit();
    });
  }

  // WhatsApp Cart Order Button in Drawer
  const cartWhatsappBtn = document.getElementById('cartWhatsappBtn');
  if (cartWhatsappBtn) {
    cartWhatsappBtn.addEventListener('click', () => {
      orderCartOnWhatsApp();
    });
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          closeMobileNav();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

function openModal(modal, backdrop) {
  if (modal) modal.classList.add('active');
  if (backdrop) backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal, backdrop) {
  if (modal) modal.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function setupStickyHeader() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Categories Tab Handling
function renderCategories() {
  const categoryTabs = document.querySelectorAll('.category-tab');
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      categoryTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.category;
      renderProducts();
    });
  });
}

// Filter and Sort Products
function filterProducts() {
  return PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          product.fabric.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          product.category.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (currentSort === 'price-low') return a.price - b.price;
    if (currentSort === 'price-high') return b.price - a.price;
    if (currentSort === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews; // popular default
  });
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const countElem = document.getElementById('productCount');
  if (!grid) return;

  const filtered = filterProducts();
  if (countElem) countElem.innerText = `Showing ${filtered.length} styles`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🧸</div>
        <h3>No matching outfits found!</h3>
        <p>Try searching for different terms or reset your filters.</p>
        <button class="btn btn-secondary" onclick="resetFilters()">View All Collections</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-media">
        <span class="product-badge">${product.tag}</span>
        <button class="wishlist-btn" onclick="toggleWishlist(this, ${product.id})" title="Add to Wishlist" aria-label="Wishlist">
          <i class="far fa-heart"></i>
        </button>
        <img src="${product.images[0]}" alt="${product.name}" class="product-img main-img" loading="lazy" />
        ${product.images[1] ? `<img src="${product.images[1]}" alt="${product.name}" class="product-img hover-img" loading="lazy" />` : ''}
        
        <div class="product-overlay-actions">
          <button class="quick-view-btn" onclick="openQuickView(${product.id})">
            <i class="fas fa-eye"></i> Quick View
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-rating">
          <div class="stars">
            ${getStarRatingHtml(product.rating)}
          </div>
          <span class="rating-number">${product.rating}</span>
          <span class="review-count">(${product.reviews})</span>
        </div>

        <h3 class="product-title" onclick="openQuickView(${product.id})" title="${product.name}">${product.name}</h3>

        <div class="product-size-preview">
          <span class="size-label">Sizes:</span>
          <div class="size-chips">
            ${product.sizes.slice(0, 4).map(s => `<span class="size-chip">${s}</span>`).join('')}
            ${product.sizes.length > 4 ? `<span class="size-chip more">+${product.sizes.length - 4}</span>` : ''}
          </div>
        </div>

        <div class="product-pricing">
          <span class="current-price">${STORE_CONFIG.currency}${product.price}</span>
          <span class="original-price">${STORE_CONFIG.currency}${product.originalPrice}</span>
          <span class="discount-pill">${product.discount}</span>
        </div>

        <div class="card-action-buttons">
          <button class="btn btn-primary btn-add-cart" onclick="quickAddToCart(${product.id})">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
          <button class="btn btn-whatsapp-direct" onclick="orderSingleProductWhatsApp(${product.id})" title="Order instantly on WhatsApp">
            <i class="fab fa-whatsapp"></i> Order
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function getStarRatingHtml(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  const remaining = 5 - Math.ceil(rating);
  for (let i = 0; i < remaining; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  return stars;
}

function resetFilters() {
  currentCategory = 'all';
  currentSearch = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.category-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.category === 'all');
  });
  renderProducts();
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  let timeout = null;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      currentSearch = e.target.value.trim();
      renderProducts();
    }, 250);
  });
}

function setupSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });
}

// Quick View Modal Logic
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  activeQuickViewProduct = product;
  selectedQuickViewSize = product.sizes[0];

  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('quickViewBackdrop');

  // Fill content
  document.getElementById('qvTitle').innerText = product.name;
  document.getElementById('qvTag').innerText = product.tag;
  document.getElementById('qvRating').innerHTML = `${getStarRatingHtml(product.rating)} <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>`;
  document.getElementById('qvPrice').innerText = `${STORE_CONFIG.currency}${product.price}`;
  document.getElementById('qvOriginalPrice').innerText = `${STORE_CONFIG.currency}${product.originalPrice}`;
  document.getElementById('qvDiscount').innerText = product.discount;
  document.getElementById('qvDescription').innerText = product.description;
  document.getElementById('qvFabric').innerText = product.fabric;

  // Main Image & Thumbnails
  const mainImg = document.getElementById('qvMainImg');
  mainImg.src = product.images[0];

  const thumbsContainer = document.getElementById('qvThumbnails');
  thumbsContainer.innerHTML = product.images.map((img, idx) => `
    <button class="qv-thumb ${idx === 0 ? 'active' : ''}" onclick="switchQvImage('${img}', this)">
      <img src="${img}" alt="${product.name} thumb ${idx+1}">
    </button>
  `).join('');

  // Sizes selector
  const sizesContainer = document.getElementById('qvSizes');
  sizesContainer.innerHTML = product.sizes.map((size, idx) => `
    <button class="size-btn ${idx === 0 ? 'active' : ''}" onclick="selectQvSize('${size}', this)">
      ${size}
    </button>
  `).join('');

  // Colors available
  const colorsContainer = document.getElementById('qvColors');
  colorsContainer.innerHTML = product.colors.map(color => `
    <span class="color-badge"><i class="fas fa-palette"></i> ${color}</span>
  `).join('');

  openModal(modal, backdrop);
}

function switchQvImage(src, element) {
  document.getElementById('qvMainImg').src = src;
  document.querySelectorAll('.qv-thumb').forEach(el => el.classList.remove('active'));
  element.classList.add('active');
}

function selectQvSize(size, element) {
  selectedQuickViewSize = size;
  document.querySelectorAll('.size-btn').forEach(el => el.classList.remove('active'));
  element.classList.add('active');
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('quickViewBackdrop');
  closeModal(modal, backdrop);
  activeQuickViewProduct = null;
  selectedQuickViewSize = null;
}

// Add to Cart from Quick View
function addQuickViewToCart() {
  if (!activeQuickViewProduct) return;
  addToCart(activeQuickViewProduct.id, selectedQuickViewSize || activeQuickViewProduct.sizes[0]);
  closeQuickView();
  openCartDrawer();
}

// Quick Add to Cart from Card (Defaults to first size)
function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  addToCart(productId, product.sizes[0]);
  showToast(`Added "${product.name}" (${product.sizes[0]}) to cart! 🛍️`, 'success');
}

// Wishlist Toggle
function toggleWishlist(btn, productId) {
  const icon = btn.querySelector('i');
  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    btn.classList.add('active');
    showToast('Saved to your wishlist! ❤️', 'info');
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    btn.classList.remove('active');
    showToast('Removed from wishlist', 'default');
  }
}

// Cart Core Operations
function addToCart(productId, size = '1-2Y', quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      size: size,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
}

function updateCartItemQuantity(index, delta) {
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
      showToast('Item removed from cart', 'default');
    }
    saveCart();
    updateCartUI();
  }
}

function removeCartItem(index) {
  if (cart[index]) {
    const name = cart[index].name;
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showToast(`Removed "${name}" from cart`, 'default');
  }
}

function saveCart() {
  localStorage.setItem('kidoz_cart', JSON.stringify(cart));
}

function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalOriginal = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const savings = totalOriginal - subtotal;
  const isFreeDelivery = subtotal >= STORE_CONFIG.freeShippingThreshold || subtotal === 0;
  const deliveryFee = isFreeDelivery ? 0 : 70;
  const grandTotal = subtotal + deliveryFee;

  return { subtotal, savings, isFreeDelivery, deliveryFee, grandTotal };
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Update badge in header and mobile bar
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.innerText = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  });

  const cartList = document.getElementById('cartItemsList');
  const emptyCartState = document.getElementById('emptyCartState');
  const cartFooter = document.getElementById('cartFooter');
  const cartSubtotalElem = document.getElementById('cartSubtotal');
  const cartSavingsElem = document.getElementById('cartSavings');
  const cartGrandTotalElem = document.getElementById('cartGrandTotal');
  const freeShippingBar = document.getElementById('freeShippingBar');
  const freeShippingText = document.getElementById('freeShippingText');

  if (!cartList) return;

  if (cart.length === 0) {
    cartList.innerHTML = '';
    if (emptyCartState) emptyCartState.style.display = 'block';
    if (cartFooter) cartFooter.style.display = 'none';
    if (freeShippingText) freeShippingText.innerText = `Add items worth ₹${STORE_CONFIG.freeShippingThreshold} for FREE Shipping!`;
    if (freeShippingBar) freeShippingBar.style.width = '0%';
    return;
  }

  if (emptyCartState) emptyCartState.style.display = 'none';
  if (cartFooter) cartFooter.style.display = 'block';

  const { subtotal, savings, isFreeDelivery, deliveryFee, grandTotal } = calculateTotals();

  // Free shipping progress
  const progressPercent = Math.min(100, Math.round((subtotal / STORE_CONFIG.freeShippingThreshold) * 100));
  if (freeShippingBar) freeShippingBar.style.width = `${progressPercent}%`;
  
  if (freeShippingText) {
    if (isFreeDelivery) {
      freeShippingText.innerHTML = `🎉 <strong>Hooray!</strong> You unlocked <strong>FREE Pan-India Delivery!</strong>`;
    } else {
      const remaining = STORE_CONFIG.freeShippingThreshold - subtotal;
      freeShippingText.innerHTML = `Add <strong>₹${remaining}</strong> more for <strong>FREE Delivery!</strong>`;
    }
  }

  // Render items
  cartList.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-meta">
          <span class="cart-item-size">Size: <strong>${item.size}</strong></span>
          <span class="cart-item-price">${STORE_CONFIG.currency}${item.price}</span>
        </div>
        <div class="cart-item-controls">
          <div class="quantity-picker">
            <button class="qty-btn" onclick="updateCartItemQuantity(${index}, -1)" aria-label="Decrease quantity">-</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartItemQuantity(${index}, 1)" aria-label="Increase quantity">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeCartItem(${index})" title="Remove item">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (cartSubtotalElem) cartSubtotalElem.innerText = `${STORE_CONFIG.currency}${subtotal}`;
  if (cartSavingsElem) cartSavingsElem.innerText = `${STORE_CONFIG.currency}${savings}`;
  if (cartGrandTotalElem) cartGrandTotalElem.innerText = `${STORE_CONFIG.currency}${grandTotal}`;
}

// WhatsApp Integration Engine
function orderSingleProductWhatsApp(productId, customSize = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const size = customSize || (selectedQuickViewSize || product.sizes[0]);
  const pageUrl = window.location.href.split('#')[0];

  const message = `*Hello Kidoz Kids Fashion!* 👋%0A%0A` +
    `I would like to order this outfit for my child:%0A` +
    `👗 *Outfit:* ${encodeURIComponent(product.name)}%0A` +
    `🏷️ *Price:* ${STORE_CONFIG.currency}${product.price}%0A` +
    `📏 *Selected Size:* ${encodeURIComponent(size)}%0A` +
    `✨ *Category:* ${encodeURIComponent(product.category.toUpperCase())}%0A%0A` +
    `Please confirm if this size is available and how I can pay (UPI / COD / Net Banking). Thank you! 🙏`;

  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
  showToast('Connecting directly with Kidoz on WhatsApp...', 'success');
}

function orderQuickViewOnWhatsApp() {
  if (!activeQuickViewProduct) return;
  orderSingleProductWhatsApp(activeQuickViewProduct.id, selectedQuickViewSize);
}

function orderCartOnWhatsApp() {
  if (cart.length === 0) {
    showToast('Your cart is empty! Add products first.', 'warning');
    return;
  }

  const { subtotal, isFreeDelivery, deliveryFee, grandTotal } = calculateTotals();

  let itemsList = '';
  cart.forEach((item, index) => {
    itemsList += `${index + 1}. *${encodeURIComponent(item.name)}*%0A` +
      `   Size: ${encodeURIComponent(item.size)} | Qty: ${item.quantity} | Price: ${STORE_CONFIG.currency}${item.price * item.quantity}%0A`;
  });

  const deliveryString = isFreeDelivery ? 'FREE 🚚' : `${STORE_CONFIG.currency}${deliveryFee}`;

  const message = `🛍️ *NEW WEBSITE ORDER REQUEST - KIDOZ KIDS FASHION*%0A` +
    `========================================%0A` +
    `*Order Items:*%0A${itemsList}%0A` +
    `========================================%0A` +
    `*Subtotal:* ${STORE_CONFIG.currency}${subtotal}%0A` +
    `*Shipping:* ${deliveryString}%0A` +
    `*Grand Total:* ${STORE_CONFIG.currency}${grandTotal}%0A` +
    `========================================%0A%0A` +
    `Hi Team! Please verify available stock and send payment QR / UPI ID. Thank you!`;

  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
  showToast('Opening WhatsApp with your complete cart order! 📲', 'success');
}

// Checkout Form Submission (Demo + WhatsApp integration)
function populateCheckoutSummary() {
  const summaryContainer = document.getElementById('checkoutItemsPreview');
  const checkoutSubtotal = document.getElementById('modalSubtotal');
  const checkoutDelivery = document.getElementById('modalDelivery');
  const checkoutTotal = document.getElementById('modalTotal');

  if (!summaryContainer) return;

  const { subtotal, isFreeDelivery, deliveryFee, grandTotal } = calculateTotals();

  summaryContainer.innerHTML = cart.map(item => `
    <div class="checkout-summary-row">
      <span>${item.name} (${item.size}) x ${item.quantity}</span>
      <strong>${STORE_CONFIG.currency}${item.price * item.quantity}</strong>
    </div>
  `).join('');

  if (checkoutSubtotal) checkoutSubtotal.innerText = `${STORE_CONFIG.currency}${subtotal}`;
  if (checkoutDelivery) checkoutDelivery.innerText = isFreeDelivery ? 'FREE' : `${STORE_CONFIG.currency}${deliveryFee}`;
  if (checkoutTotal) checkoutTotal.innerText = `${STORE_CONFIG.currency}${grandTotal}`;
}

function handleCheckoutSubmit() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const city = document.getElementById('custCity').value.trim();
  const pincode = document.getElementById('custPincode').value.trim();
  const notes = document.getElementById('custNotes').value.trim();
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'WhatsApp / UPI';

  const { subtotal, isFreeDelivery, deliveryFee, grandTotal } = calculateTotals();

  let itemsList = '';
  cart.forEach((item, index) => {
    itemsList += `${index + 1}. *${encodeURIComponent(item.name)}* (Size: ${encodeURIComponent(item.size)}) x ${item.quantity} = ${STORE_CONFIG.currency}${item.price * item.quantity}%0A`;
  });

  const deliveryString = isFreeDelivery ? 'FREE' : `${STORE_CONFIG.currency}${deliveryFee}`;

  const message = `🎉 *CONFIRMED ORDER DISPATCH REQUEST*%0A` +
    `*Store:* Kidoz Kids Fashion%0A` +
    `----------------------------------------%0A` +
    `👤 *Customer Name:* ${encodeURIComponent(name)}%0A` +
    `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
    `🏠 *Address:* ${encodeURIComponent(address)}, ${encodeURIComponent(city)} - ${encodeURIComponent(pincode)}%0A` +
    `💳 *Payment Choice:* ${encodeURIComponent(paymentMethod)}%0A` +
    (notes ? `📝 *Special Request:* ${encodeURIComponent(notes)}%0A` : '') +
    `----------------------------------------%0A` +
    `*Order Items:*%0A${itemsList}%0A` +
    `----------------------------------------%0A` +
    `*Total Amount:* ${STORE_CONFIG.currency}${grandTotal} (Incl. ${deliveryString} Delivery)%0A` +
    `----------------------------------------%0A` +
    `Please accept this order and send payment acknowledgement!`;

  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`;
  
  // Close modal
  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutBackdrop = document.getElementById('checkoutBackdrop');
  closeModal(checkoutModal, checkoutBackdrop);

  // Clear cart and update
  cart = [];
  saveCart();
  updateCartUI();

  // Open WhatsApp
  window.open(whatsappUrl, '_blank');

  // Trigger celebration modal or toast
  showToast('Order created! WhatsApp opened to notify Kidoz Team 🚀', 'success');
}

// Render Instagram Lookbook Section
function renderLookbook() {
  const container = document.getElementById('lookbookGrid');
  if (!container) return;

  container.innerHTML = LOOKBOOK_ITEMS.map(item => `
    <div class="lookbook-card" onclick="window.open('${STORE_CONFIG.instagramUrl}', '_blank')">
      <img src="${item.image}" alt="Kidoz Instagram Post" loading="lazy" />
      <div class="lookbook-overlay">
        <i class="fab fa-instagram instagram-icon"></i>
        <p class="lookbook-caption">${item.caption}</p>
        <span class="lookbook-likes"><i class="fas fa-heart"></i> ${item.likes} likes</span>
      </div>
    </div>
  `).join('');
}

// Floating WhatsApp Widget Interactive Behaviors
function setupFloatingWhatsApp() {
  const toggleBtn = document.getElementById('floatingWhatsappBtn');
  const chatBubble = document.getElementById('whatsappChatBubble');
  const closeBubbleBtn = document.getElementById('closeBubbleBtn');

  if (closeBubbleBtn && chatBubble) {
    closeBubbleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      chatBubble.classList.add('hidden');
    });
  }

  // Auto pop the bubble after 3 seconds to catch visitor attention
  setTimeout(() => {
    if (chatBubble && !chatBubble.classList.contains('hidden')) {
      chatBubble.classList.add('visible');
    }
  }, 3000);
}

function sendWhatsAppGreeting(customPrompt = '') {
  const prompt = customPrompt || "Hi Kidoz Kids Fashion! 👋 I am browsing your online catalog and would love some help choosing the best outfits!";
  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(prompt)}`;
  window.open(url, '_blank');
}

// Toast Notification System
function showToast(message, type = 'default') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  
  let icon = '<i class="fas fa-info-circle"></i>';
  if (type === 'success') icon = '<i class="fas fa-check-circle"></i>';
  if (type === 'warning') icon = '<i class="fas fa-exclamation-triangle"></i>';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
