/* ========================================
   NEXUS MARKETPLACE - ADMIN PANEL LOGIC
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initializeAdmin();
});

function initializeAdmin() {
    checkAuth();
    setupSidebar();
    setupMobileMenu();
    renderAllSections();
    setupEventListeners();
}

function checkAuth() {
    const user = JSON.parse(localStorage.getItem('nexus_user') || 'null');
    if (!user || (user.role !== 'admin' && user.role !== 'seller')) {
        window.location.href = 'login.html?redirect=admin.html';
        return;
    }
    document.getElementById('adminName').textContent = user.name;
    document.getElementById('adminRole').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    document.getElementById('adminAvatar').src = user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`;
}

function setupSidebar() {
    const navItems = document.querySelectorAll('.admin-nav-item');
    const sections = document.querySelectorAll('.admin-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(section + 'Section').classList.add('active');
            document.getElementById('pageTitle').textContent = section.charAt(0).toUpperCase() + section.slice(1);
            closeMobileMenu();
        });
    });
}

function setupMobileMenu() {
    const overlay = document.getElementById('sidebarOverlay');
    const sidebar = document.getElementById('adminSidebar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');

    if (!mobileBtn) {
        const btn = document.createElement('button');
        btn.className = 'mobile-menu-btn btn btn-primary';
        btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        btn.onclick = toggleMobileMenu;
        document.body.appendChild(btn);
    }

    overlay?.addEventListener('click', closeMobileMenu);
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('open');
}

function closeMobileMenu() {
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar?.classList.remove('open');
    overlay?.classList.remove('open');
}

function setupEventListeners() {
    // Search
    document.getElementById('userSearch')?.addEventListener('input', debounce(renderUsers, 300));
    document.getElementById('orderStatusFilter')?.addEventListener('change', renderOrders);
    document.getElementById('revenuePeriod')?.addEventListener('change', renderRevenueChart);

    // Product form
    document.getElementById('productForm')?.addEventListener('submit', handleProductSubmit);
}

function renderAllSections() {
    renderOverview();
    renderUsers();
    renderProducts();
    renderOrders();
    renderAnalytics();
}

function renderOverview() {
    const data = window.marketplaceData;
    const orders = data.orders;
    const products = data.products;
    const users = data.users;

    // Stats
    const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0);
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalProducts = products.length;

    document.getElementById('totalRevenue').textContent = '$' + totalRevenue.toLocaleString();
    document.getElementById('totalUsers').textContent = totalUsers.toLocaleString();
    document.getElementById('totalOrders').textContent = totalOrders.toLocaleString();
    document.getElementById('totalProducts').textContent = totalProducts.toLocaleString();

    // Trends (mock)
    document.getElementById('revenueTrend').textContent = '+23% vs last month';
    document.getElementById('usersTrend').textContent = '+12% vs last month';
    document.getElementById('ordersTrend').textContent = '+18% vs last month';
    document.getElementById('productsTrend').textContent = '+5% vs last month';

    renderRevenueChart();
    renderTopProducts();
    renderRecentOrders();
}

function renderRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = window.marketplaceData.analytics.revenue;
    const period = parseInt(document.getElementById('revenuePeriod')?.value) || 12;

    const labels = data.labels.slice(-period);
    const values = data.data.slice(-period);

    drawLineChart(ctx, canvas, labels, values, '#00d4aa');
}

function drawLineChart(ctx, canvas, labels, values, color) {
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 250;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color.replace(')', ', 0.3)').replace('(', '(').replace('rgb', 'rgba'));
    gradient.addColorStop(1, color.replace(')', ', 0)').replace('(', '(').replace('rgb', 'rgba'));

    // Area
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    values.forEach((value, i) => {
        const x = padding + (i / (values.length - 1)) * chartWidth;
        const y = height - padding - ((value - minValue) / range) * chartHeight;
        if (i === 0) ctx.lineTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding + chartWidth, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    values.forEach((value, i) => {
        const x = padding + (i / (values.length - 1)) * chartWidth;
        const y = height - padding - ((value - minValue) / range) * chartHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Dots
    values.forEach((value, i) => {
        const x = padding + (i / (values.length - 1)) * chartWidth;
        const y = height - padding - ((value - minValue) / range) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = color + '33';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function renderTopProducts() {
    const container = document.getElementById('topProductsList');
    const topProducts = window.marketplaceData.analytics.topProducts;

    container.innerHTML = topProducts.map((product, i) => `
        <div class="top-product">
            <span class="top-product-rank">#${i + 1}</span>
            <div class="top-product-info">
                <div class="top-product-name">${product.name}</div>
                <div class="top-product-meta">${product.sales.toLocaleString()} sales</div>
            </div>
            <div class="top-product-stats">
                <div class="top-product-sales">$${product.revenue.toLocaleString()}</div>
                <div class="top-product-revenue">Revenue</div>
            </div>
        </div>
    `).join('');
}

function renderRecentOrders() {
    const tbody = document.getElementById('recentOrdersBody');
    const orders = window.marketplaceData.orders.slice(0, 10);

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.user}</td>
            <td>${order.product}</td>
            <td>$${order.amount}</td>
            <td><span class="badge badge-${order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : 'danger'}">${order.status}</span></td>
            <td>${order.date}</td>
        </tr>
    `).join('');
}

function renderUsers() {
    const tbody = document.getElementById('usersBody');
    const users = window.marketplaceData.users;
    const search = document.getElementById('userSearch')?.value.toLowerCase() || '';

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search)
    );

    tbody.innerHTML = filtered.map(user => `
        <tr>
            <td>
                <div style="display:flex;align-items:center;gap:0.75rem;">
                    <img src="${user.avatar}" alt="" style="width:36px;height:36px;border-radius:50%;object-fit:cover;">
                    <span>${user.name}</span>
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="badge badge-${user.role === 'admin' ? 'danger' : user.role === 'seller' ? 'info' : 'success'}">${user.role}</span></td>
            <td>${user.joined}</td>
            <td>${user.purchases || 0}</td>
            <td>$${(user.spent || 0).toLocaleString()}</td>
            <td><span class="badge badge-${user.status === 'active' ? 'success' : 'danger'}">${user.status}</span></td>
            <td>
                <button class="action-btn edit" onclick="editUser(${user.id})">Edit</button>
                <button class="action-btn view" onclick="viewUser(${user.id})">View</button>
            </td>
        </tr>
    `).join('');
}

function renderProducts() {
    const tbody = document.getElementById('productsBody');
    const products = window.marketplaceData.products;

    tbody.innerHTML = products.map(product => `
        <tr>
            <td>
                <div style="display:flex;align-items:center;gap:0.75rem;">
                    <div style="width:40px;height:40px;border-radius:var(--radius-sm);background:linear-gradient(135deg,var(--accent-primary),var(--accent-secondary));display:flex;align-items:center;justify-content:center;color:var(--text-inverse);font-weight:600;font-size:0.8rem;">${product.title.charAt(0)}</div>
                    <span>${product.title}</span>
                </div>
            </td>
            <td>${product.category}</td>
            <td>$${product.price}${product.originalPrice ? ' <span style="color:var(--text-muted);text-decoration:line-through;font-size:0.75rem;">$' + product.originalPrice + '</span>' : ''}</td>
            <td>${product.sales.toLocaleString()}</td>
            <td>$${(product.sales * product.price).toLocaleString()}</td>
            <td>${product.rating} <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" style="color:var(--accent-gold);vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></td>
            <td>${product.author.name}</td>
            <td>
                <button class="action-btn edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="action-btn delete" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function renderOrders() {
    const tbody = document.getElementById('ordersBody');
    const orders = window.marketplaceData.orders;
    const filter = document.getElementById('orderStatusFilter')?.value || 'all';

    const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

    tbody.innerHTML = filtered.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.user}</td>
            <td>${order.product}</td>
            <td>$${order.amount}</td>
            <td><span class="badge badge-${order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : 'danger'}">${order.status}</span></td>
            <td>${order.method}</td>
            <td>${order.date}</td>
            <td>
                <button class="action-btn view" onclick="viewOrder('${order.id}')">View</button>
                ${order.status === 'pending' ? `<button class="action-btn edit" onclick="updateOrderStatus('${order.id}', 'completed')">Complete</button>` : ''}
                ${order.status === 'completed' ? `<button class="action-btn delete" onclick="updateOrderStatus('${order.id}', 'refunded')">Refund</button>` : ''}
            </td>
        </tr>
    `).join('');
}

function renderAnalytics() {
    renderUsersChart();
    renderCategoryChart();
    renderCategoryRevenueChart();
}

function renderUsersChart() {
    const canvas = document.getElementById('usersChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = window.marketplaceData.analytics.users;
    drawLineChart(ctx, canvas, data.labels, data.data, '#6366f1');
}

function renderCategoryChart() {
    const canvas = document.getElementById('categoryChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = window.marketplaceData.analytics.categories;

    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 250;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    const colors = ['#00d4aa', '#6366f1', '#f43f5e', '#fbbf24', '#06b6d4', '#a855f7'];
    const total = data.data.reduce((a, b) => a + b, 0);

    let startAngle = -Math.PI / 2;
    data.data.forEach((value, i) => {
        const sliceAngle = (value / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        startAngle += sliceAngle;
    });

    // Legend
    const legendY = height - 60;
    data.labels.forEach((label, i) => {
        const x = 20 + (i % 3) * 140;
        const y = legendY + Math.floor(i / 3) * 25;
        ctx.fillStyle = colors[i];
        ctx.fillRect(x, y, 12, 12);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px Inter';
        ctx.fillText(label, x + 18, y + 10);
    });
}

function renderCategoryRevenueChart() {
    const canvas = document.getElementById('categoryRevenueChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = window.marketplaceData.analytics.topProducts;

    // Aggregate by category
    const categories = {};
    window.marketplaceData.products.forEach(p => {
        categories[p.category] = (categories[p.category] || 0) + p.sales * p.price;
    });

    const labels = Object.keys(categories);
    const values = Object.values(categories);
    const colors = ['#00d4aa', '#6366f1', '#f43f5e', '#fbbf24', '#06b6d4', '#a855f7'];

    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 250;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...values);
    const barWidth = chartWidth / labels.length * 0.6;
    const gap = chartWidth / labels.length * 0.4;

    ctx.clearRect(0, 0, width, height);

    labels.forEach((label, i) => {
        const value = values[i];
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + i * (barWidth + gap) + gap / 2;
        const y = height - padding - barHeight;

        // Gradient
        const gradient = ctx.createLinearGradient(0, height - padding, 0, height - padding - barHeight);
        gradient.addColorStop(0, colors[i % colors.length] + '33');
        gradient.addColorStop(1, colors[i % colors.length]);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Label
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + barWidth / 2, height - padding + 15);

        // Value
        ctx.fillStyle = '#f8fafc';
        ctx.font = '11px Space Grotesk';
        ctx.fillText('$' + (value / 1000).toFixed(0) + 'k', x + barWidth / 2, y - 5);
    });
}

// Product Modal
function openProductModal(productId = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');

    form.reset();
    form.dataset.editId = '';

    if (productId) {
        const product = window.marketplaceData.products.find(p => p.id === productId);
        if (product) {
            title.textContent = 'Edit Product';
            form.dataset.editId = productId;
            form.title.value = product.title;
            form.category.value = product.category;
            form.description.value = product.description;
            form.price.value = product.price;
            form.originalPrice.value = product.originalPrice || '';
            form.badge.value = product.badge || '';
            form.author.value = product.author.name;
            form.subcategory.value = product.subcategory;
        }
    } else {
        title.textContent = 'Add Product';
    }

    modal.style.display = 'flex';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

function handleProductSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const editId = form.dataset.editId;

    const newProduct = {
        id: editId ? parseInt(editId) : Date.now(),
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        subcategory: formData.get('subcategory'),
        price: parseFloat(formData.get('price')),
        originalPrice: formData.get('originalPrice') ? parseFloat(formData.get('originalPrice')) : null,
        badge: formData.get('badge') || null,
        author: { name: formData.get('author'), avatar: formData.get('author').charAt(0), verified: true },
        rating: 0,
        reviews: 0,
        sales: 0,
        tags: [],
        images: [],
        features: [],
        updatedAt: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0]
    };

    if (editId) {
        const idx = window.marketplaceData.products.findIndex(p => p.id === parseInt(editId));
        if (idx !== -1) window.marketplaceData.products[idx] = newProduct;
        showToast('Product updated successfully!', 'success');
    } else {
        window.marketplaceData.products.unshift(newProduct);
        showToast('Product added successfully!', 'success');
    }

    closeProductModal();
    renderProducts();
    renderOverview();
}

function editProduct(id) { openProductModal(id); }
function deleteProduct(id) {
    if (confirm('Delete this product?')) {
        window.marketplaceData.products = window.marketplaceData.products.filter(p => p.id !== id);
        renderProducts();
        renderOverview();
        showToast('Product deleted', 'success');
    }
}

function editUser(id) { showToast('Edit user: ' + id, 'info'); }
function viewUser(id) { showToast('View user: ' + id, 'info'); }
function viewOrder(id) { showToast('View order: ' + id, 'info'); }
function updateOrderStatus(id, status) {
    const order = window.marketplaceData.orders.find(o => o.id === id);
    if (order) {
        order.status = status;
        renderOrders();
        renderOverview();
        showToast(`Order ${status}`, 'success');
    }
}

function exportData() {
    const data = {
        users: window.marketplaceData.users,
        products: window.marketplaceData.products,
        orders: window.marketplaceData.orders,
        analytics: window.marketplaceData.analytics,
        exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported!', 'success');
}

function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = {
        success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
        error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
        info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<div class="toast-icon">${icons[type]}</div><span class="toast-message">${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}