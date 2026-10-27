/* ========================================
   NEXUS MARKETPLACE - APPLICATION LOGIC
   ======================================== */

// Global state
const state = {
  currentCategory: 'all',
  currentSort: 'newest',
  displayedProducts: 8,
  wishlist: new Set(JSON.parse(localStorage.getItem('nexus_wishlist') || '[]')),
  cart: JSON.parse(localStorage.getItem('nexus_cart') || '[]'),
  user: JSON.parse(localStorage.getItem('nexus_user') || 'null'),
  isLoading: false
};

// DOM Elements
const elements = {};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  initializeApp();
});

function cacheElements() {
  elements.navbar = document.getElementById('navbar');
  elements.navLinks = document.querySelectorAll('.nav-link[data-category]');
  elements.searchToggle = document.getElementById('searchToggle');
  elements.searchOverlay = document.getElementById('searchOverlay');
  elements.searchInput = document.getElementById('searchInput');
  elements.mobileSearch = document.getElementById('mobileSearch');
  elements.productsGrid = document.getElementById('productsGrid');
  elements.loadMoreBtn = document.getElementById('loadMore');
  elements.sortSelect = document.getElementById('sortSelect');
  elements.categoriesGrid = document.getElementById('categoriesGrid');
  elements.testimonialsTrack = document.getElementById('testimonialsTrack');
  elements.floatingCards = document.getElementById('floatingCards');
  elements.heroStats = document.querySelectorAll('.stat-number[data-count]');
  elements.earningsChart = document.getElementById('earningsChart');
  elements.toastContainer = document.getElementById('toastContainer');
  elements.loginBtn = document.getElementById('loginBtn');
  elements.signupBtn = document.getElementById('signupBtn');
}

function initializeApp() {
  // Setup event listeners
  setupEventListeners();

  // Render initial content
  renderCategories();
  renderProducts();
  renderTestimonials();
  renderFloatingCards();
  animateHeroStats();
  initEarningsChart();

  // Check scroll for navbar
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Intersection Observer for animations
  setupScrollAnimations();

  // Update UI for logged in user
  updateAuthUI();
}

function setupEventListeners() {
  // Navbar category links
  elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.dataset.category;
      setActiveCategory(category);
      filterProducts(category);
    });
  });

  // Search
  elements.searchToggle?.addEventListener('click', toggleSearch);
  elements.searchInput?.addEventListener('input', debounce(handleSearch, 300));
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.btn-search') && !e.target.closest('.search-overlay')) {
      closeSearch();
    }
  });

  // Sort
  elements.sortSelect?.addEventListener('change', (e) => {
    state.currentSort = e.target.value;
    renderProducts();
  });

  // Load more
  elements.loadMoreBtn?.addEventListener('click', loadMoreProducts);

  // Category cards
  document.addEventListener('click', (e) => {
    const categoryCard = e.target.closest('.category-card');
    if (categoryCard) {
      const category = categoryCard.dataset.category;
      setActiveCategory(category);
      filterProducts(category);
      document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Wishlist buttons
  document.addEventListener('click', (e) => {
    const wishlistBtn = e.target.closest('.product-wishlist');
    if (wishlistBtn) {
      e.stopPropagation();
      const productId = parseInt(wishlistBtn.closest('.product-card').dataset.id);
      toggleWishlist(productId, wishlistBtn);
    }
  });

  // Product cards click
  document.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    if (productCard && !e.target.closest('.product-wishlist')) {
      const productId = parseInt(productCard.dataset.id);
      openProductModal(productId);
    }
  });

  // Auth buttons
  elements.loginBtn?.addEventListener('click', (e) => {
    if (state.user) {
      e.preventDefault();
      showUserMenu(e.target);
    }
  });
}

// Category filtering
function setActiveCategory(category) {
  state.currentCategory = category;
  elements.navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.category === category);
  });
}

function filterProducts(category) {
  state.displayedProducts = 8;
  renderProducts();
}

function getFilteredProducts() {
  let products = [...marketplaceData.products];

  // Category filter
  if (state.currentCategory !== 'all') {
    products = products.filter(p => p.category === state.currentCategory);
  }

  // Sort
  switch (state.currentSort) {
    case 'popular':
      products.sort((a, b) => b.sales - a.sales);
      break;
    case 'price-low':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
    default:
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }

  return products;
}

// Render functions
function renderCategories() {
  if (!elements.categoriesGrid) return;

  elements.categoriesGrid.innerHTML = marketplaceData.categories.map(cat => `
    <article class="category-card" data-category="${cat.id}" style="--cat-gradient: ${cat.gradient};">
      <div class="category-icon" style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));">
        ${cat.icon}
      </div>
      <h3>${cat.name}</h3>
      <p>${cat.count}+ items</p>
    </article>
  `).join('');
}

function renderProducts() {
  if (!elements.productsGrid) return;

  const products = getFilteredProducts();
  const displayProducts = products.slice(0, state.displayedProducts);

  if (displayProducts.length === 0) {
    elements.productsGrid.innerHTML = `
      <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 4rem;">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; color: var(--text-muted);">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <h3>No products found</h3>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">Try adjusting your filters or search terms</p>
      </div>
    `;
    elements.loadMoreBtn.style.display = 'none';
    return;
  }

  elements.productsGrid.innerHTML = displayProducts.map(product => createProductCard(product)).join('');

  // Show/hide load more
  elements.loadMoreBtn.style.display = state.displayedProducts < products.length ? 'block' : 'none';
}

function createProductCard(product) {
  const isWishlisted = state.wishlist.has(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image">
        ${product.badge ? `<span class="product-badge badge-${product.badge}">${product.badge === 'new' ? 'New' : product.badge === 'hot' ? 'Hot' : product.badge === 'sale' ? `-${discount}%` : 'Featured'}</span>` : ''}
        <button class="product-wishlist ${isWishlisted ? 'active' : ''}" aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <div class="product-image-placeholder" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--bg-tertiary),var(--bg-secondary));">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        </div>
      </div>
      <div class="product-content">
        <span class="product-category">${product.subcategory}</span>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-meta">
          <div class="product-author">
            <div class="author-avatar">${product.author.avatar}</div>
            <span class="author-name">${product.author.name}${product.author.verified ? ' ✓' : ''}</span>
          </div>
          <div class="product-price">
            <span class="price-current">$${product.price}</span>
            ${product.originalPrice ? `<span class="price-original">$${product.originalPrice}</span>` : ''}
          </div>
        </div>
      </div>
    </article>
  `;
}

function loadMoreProducts() {
  state.displayedProducts += 8;
  renderProducts();

  // Smooth scroll to new products
  setTimeout(() => {
    const newProducts = elements.productsGrid.children;
    if (newProducts.length > state.displayedProducts - 8) {
      newProducts[state.displayedProducts - 8].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

function renderTestimonials() {
  if (!elements.testimonialsTrack) return;

  elements.testimonialsTrack.innerHTML = marketplaceData.testimonials.map(t => `
    <article class="testimonial-card">
      <div class="testimonial-stars">
        ${Array(5).fill(0).map((_, i) => `
          <svg viewBox="0 0 24 24" fill="${i < t.rating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        `).join('')}
      </div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <img class="author-img" src="${t.avatar}" alt="${t.author}" loading="lazy">
        <div class="author-info">
          <span class="author-name">${t.author}</span>
          <span class="author-role">${t.role}</span>
        </div>
      </div>
    </article>
  `).join('');
}

function renderFloatingCards() {
  if (!elements.floatingCards) return;

  const cards = [
    { icon: '🚀', title: 'Lightning Fast', desc: 'Optimized for performance', gradient: 'from-emerald-500 to-teal-600' },
    { icon: '🔒', title: 'Secure by Default', desc: 'Enterprise-grade security', gradient: 'from-indigo-500 to-purple-600' },
    { icon: '🎨', title: 'Beautiful Design', desc: 'Crafted with attention to detail', gradient: 'from-rose-500 to-pink-600' },
    { icon: '⚡', title: 'Developer First', desc: 'Built for great DX', gradient: 'from-amber-500 to-orange-600' }
  ];

  elements.floatingCards.innerHTML = cards.map((card, i) => `
    <div class="float-card" style="animation-delay: ${-i * 1.5}s;">
      <div class="float-card-icon" style="background: linear-gradient(135deg, ${card.gradient});">
        <span style="font-size: 24px;">${card.icon}</span>
      </div>
      <h4>${card.title}</h4>
      <p>${card.desc}</p>
    </div>
  `).join('');
}

function animateHeroStats() {
  elements.heroStats.forEach(stat => {
    const target = parseInt(stat.dataset.count);
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);

      stat.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

function initEarningsChart() {
  if (!elements.earningsChart) return;

  const ctx = elements.earningsChart.getContext('2d');
  const data = [12450, 11800, 13200, 12900, 14100, 13800, 14500, 14200, 15100, 14800, 15600, 15200, 15800, 16200, 15900, 16500, 17200, 16800, 17500, 18100, 17800, 18400, 19200, 18800, 19500, 20100, 19800, 20500, 21200, 20800];

  // Simple canvas chart
  const canvas = document.createElement('canvas');
  canvas.width = elements.earningsChart.offsetWidth || 400;
  canvas.height = 150;
  elements.earningsChart.appendChild(canvas);

  const c = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);

  // Gradient
  const gradient = c.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(0, 212, 170, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 212, 170, 0)');

  // Draw area
  c.beginPath();
  c.moveTo(padding, height - padding);

  data.forEach((value, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = height - padding - ((value - minValue) / (maxValue - minValue)) * chartHeight;
    if (i === 0) c.lineTo(x, y);
    else c.lineTo(x, y);
  });

  c.lineTo(padding + chartWidth, height - padding);
  c.closePath();
  c.fillStyle = gradient;
  c.fill();

  // Draw line
  c.beginPath();
  c.strokeStyle = '#00d4aa';
  c.lineWidth = 2;
  c.lineCap = 'round';
  c.lineJoin = 'round';

  data.forEach((value, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = height - padding - ((value - minValue) / (maxValue - minValue)) * chartHeight;
    if (i === 0) c.moveTo(x, y);
    else c.lineTo(x, y);
  });
  c.stroke();

  // Animate dots
  let animationFrame = 0;
  function animateDots() {
    c.clearRect(0, 0, width, height);

    // Redraw area and line
    c.beginPath();
    c.moveTo(padding, height - padding);
    data.forEach((value, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = height - padding - ((value - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) c.lineTo(x, y);
      else c.lineTo(x, y);
    });
    c.lineTo(padding + chartWidth, height - padding);
    c.closePath();
    c.fillStyle = gradient;
    c.fill();

    c.beginPath();
    c.strokeStyle = '#00d4aa';
    c.lineWidth = 2;
    data.forEach((value, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = height - padding - ((value - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    });
    c.stroke();

    // Animated dot
    const progress = (animationFrame % 300) / 300;
    const idx = progress * (data.length - 1);
    const i = Math.floor(idx);
    const t = idx - i;
    const nextI = Math.min(i + 1, data.length - 1);

    const x1 = padding + (i / (data.length - 1)) * chartWidth;
    const y1 = height - padding - ((data[i] - minValue) / (maxValue - minValue)) * chartHeight;
    const x2 = padding + (nextI / (data.length - 1)) * chartWidth;
    const y2 = height - padding - ((data[nextI] - minValue) / (maxValue - minValue)) * chartHeight;

    const dotX = x1 + (x2 - x1) * t;
    const dotY = y1 + (y2 - y1) * t;

    c.beginPath();
    c.arc(dotX, dotY, 6, 0, Math.PI * 2);
    c.fillStyle = '#00d4aa';
    c.fill();
    c.beginPath();
    c.arc(dotX, dotY, 10, 0, Math.PI * 2);
    c.strokeStyle = 'rgba(0, 212, 170, 0.3)';
    c.lineWidth = 2;
    c.stroke();

    animationFrame++;
    requestAnimationFrame(animateDots);
  }
  animateDots();
}

// Wishlist
function toggleWishlist(productId, button) {
  const isWishlisted = state.wishlist.has(productId);

  if (isWishlisted) {
    state.wishlist.delete(productId);
    button.classList.remove('active');
    button.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    showToast('Removed from wishlist', 'info');
  } else {
    state.wishlist.add(productId);
    button.classList.add('active');
    button.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    showToast('Added to wishlist!', 'success');
  }

  localStorage.setItem('nexus_wishlist', JSON.stringify([...state.wishlist]));
}

// Search
function toggleSearch() {
  elements.searchOverlay.classList.toggle('active');
  if (elements.searchOverlay.classList.contains('active')) {
    setTimeout(() => elements.searchInput?.focus(), 100);
  }
}

function closeSearch() {
  elements.searchOverlay?.classList.remove('active');
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  if (!query) {
    renderProducts();
    return;
  }

  const products = marketplaceData.products.filter(p =>
    p.title.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.tags.some(tag => tag.toLowerCase().includes(query))
  );

  elements.productsGrid.innerHTML = products.slice(0, state.displayedProducts).map(createProductCard).join('');
  elements.loadMoreBtn.style.display = products.length > state.displayedProducts ? 'block' : 'none';
}

// Scroll handling
function handleScroll() {
  const scrollY = window.scrollY;
  elements.navbar?.classList.toggle('scrolled', scrollY > 50);
}

// Scroll animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.product-card, .category-card, .testimonial-card, .section-header, .cta-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Auth UI
function updateAuthUI() {
  if (state.user) {
    elements.loginBtn.textContent = state.user.name.split(' ')[0];
    elements.loginBtn.href = '#';
    elements.signupBtn.textContent = 'Dashboard';
    elements.signupBtn.href = 'admin.html';
    elements.signupBtn.classList.remove('btn-primary');
    elements.signupBtn.classList.add('btn-secondary');
  }
}

function showUserMenu(button) {
  // Simple dropdown - could be expanded
  const menu = document.createElement('div');
  menu.className = 'user-menu';
  menu.style.cssText = `
    position: absolute; top: 100%; right: 0; margin-top: 0.5rem;
    background: var(--bg-card); backdrop-filter: blur(20px);
    border: 1px solid var(--border-primary); border-radius: var(--radius-md);
    padding: 0.5rem; min-width: 200px; box-shadow: var(--shadow-xl);
    z-index: var(--z-overlay);
  `;
  menu.innerHTML = `
    <div style="padding: 0.75rem; border-bottom: 1px solid var(--border-primary);">
      <div style="font-weight: 600;">${state.user.name}</div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">${state.user.email}</div>
    </div>
    <a href="admin.html" class="btn btn-secondary" style="width: 100%; justify-content: center; margin: 0.5rem 0;">Dashboard</a>
    <button id="logoutBtn" class="btn btn-ghost" style="width: 100%; justify-content: center;">Logout</button>
  `;

  document.body.appendChild(menu);

  const rect = button.getBoundingClientRect();
  menu.style.top = rect.bottom + window.scrollY + 8 + 'px';
  menu.style.left = rect.left - menu.offsetWidth + rect.width + 'px';

  document.getElementById('logoutBtn')?.addEventListener('click', logout);

  function closeMenu(e) {
    if (!menu.contains(e.target) && e.target !== button) {
      menu.remove();
      document.removeEventListener('click', closeMenu);
    }
  }
  setTimeout(() => document.addEventListener('click', closeMenu), 0);
}

function logout() {
  state.user = null;
  localStorage.removeItem('nexus_user');
  updateAuthUI();
  showToast('Logged out successfully', 'success');
  setTimeout(() => window.location.reload(), 1000);
}

// Toast notifications
function showToast(message, type = 'info') {
  if (!elements.toastContainer) return;

  const icons = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type]}</div>
    <span class="toast-message">${message}</span>
  `;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Product modal (placeholder)
function openProductModal(productId) {
  const product = marketplaceData.products.find(p => p.id === productId);
  if (!product) return;

  showToast(`Opening ${product.title}...`, 'info');
  // In a real app, this would open a modal or navigate to product page
}

// Utility functions
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Expose for inline handlers
window.marketplaceApp = {
  state,
  showToast,
  toggleWishlist,
  logout
};