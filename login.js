/* ========================================
   NEXUS MARKETPLACE - LOGIN PAGE LOGIC
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initializeLoginPage();
});

function initializeLoginPage() {
    setupTabSwitching();
    setupFormValidation();
    setupPasswordToggles();
    setupDemoAccounts();
    setupSocialLogin();
    checkRedirect();
}

function setupTabSwitching() {
    const tabs = document.querySelectorAll('.login-tab');
    const forms = {
        signin: document.getElementById('signinForm'),
        signup: document.getElementById('signupForm')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            tabs.forEach(t => {
                t.classList.toggle('active', t.dataset.tab === targetTab);
                t.setAttribute('aria-selected', t.dataset.tab === targetTab);
            });

            Object.keys(forms).forEach(key => {
                forms[key].style.display = key === targetTab ? 'block' : 'none';
            });

            clearErrors();
        });
    });

    // Switch links
    document.getElementById('switchToSignup')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.login-tab[data-tab="signup"]').click();
    });
}

function setupFormValidation() {
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');

    [signinForm, signupForm].forEach(form => {
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (validateForm(form)) {
                await handleAuth(form);
            }
        });

        // Real-time validation
        form.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('.form-input[required]');

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    // Check password match for signup
    if (form.id === 'signupForm') {
        const password = form.querySelector('#signupPassword');
        const confirm = form.querySelector('#signupConfirm');
        if (password.value !== confirm.value) {
            showFieldError(confirm, 'Passwords do not match');
            isValid = false;
        }
    }

    // Check terms for signup
    if (form.id === 'signupForm') {
        const terms = form.querySelector('#terms');
        if (!terms.checked) {
            showFieldError(terms, 'You must agree to the terms');
            isValid = false;
        }
    }

    return isValid;
}

function validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (input.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (input.type === 'password' && value && input.id !== 'signupConfirm' && value.length < 8) {
        isValid = false;
        errorMessage = 'Password must be at least 8 characters';
    } else if (input.id === 'signupConfirm' && value && value !== document.getElementById('signupPassword')?.value) {
        isValid = false;
        errorMessage = 'Passwords do not match';
    }

    if (!isValid) {
        showFieldError(input, errorMessage);
    } else {
        clearFieldError(input);
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(input, message) {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
        errorEl.textContent = message;
    }
}

function clearFieldError(input) {
    input.classList.remove('error');
}

function clearErrors() {
    document.querySelectorAll('.form-input.error').forEach(input => clearFieldError(input));
}

async function handleAuth(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Processing...';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const formData = new FormData(form);
    const email = formData.get('email') || formData.get('signupEmail');
    const name = formData.get('signupName') || email.split('@')[0];
    const role = determineRole(email);

    // Create user object
    const user = {
        id: Date.now(),
        name,
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        joined: new Date().toISOString().split('T')[0],
        purchases: 0,
        spent: 0,
        sales: role === 'seller' ? 0 : undefined,
        products: role === 'seller' ? 0 : undefined,
        status: 'active'
    };

    // Store in localStorage
    localStorage.setItem('nexus_user', JSON.stringify(user));

    // Show success
    showToast(form.id === 'signinForm' ? 'Welcome back!' : 'Account created successfully!', 'success');

    // Redirect after short delay
    setTimeout(() => {
        if (role === 'admin' || role === 'seller') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }
    }, 1000);
}

function determineRole(email) {
    if (email.includes('admin')) return 'admin';
    if (email.includes('seller')) return 'seller';
    return 'buyer';
}

function setupPasswordToggles() {
    document.querySelectorAll('.form-toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('.form-input');
            const icon = btn.querySelector('svg');
            const isPassword = input.type === 'password';

            input.type = isPassword ? 'text' : 'password';
            icon.innerHTML = isPassword
                ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
                : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        });
    });
}

function setupDemoAccounts() {
    document.querySelectorAll('.demo-account-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.dataset.email;
            const password = btn.dataset.password;
            const name = btn.dataset.name;
            const role = btn.dataset.role;

            // Fill form based on current tab
            const activeTab = document.querySelector('.login-tab.active')?.dataset.tab;

            if (activeTab === 'signin') {
                document.getElementById('email').value = email;
                document.getElementById('password').value = password;
                validateField(document.getElementById('email'));
                validateField(document.getElementById('password'));
            } else {
                document.getElementById('signupName').value = name;
                document.getElementById('signupEmail').value = email;
                document.getElementById('signupPassword').value = password;
                document.getElementById('signupConfirm').value = password;
                document.getElementById('terms').checked = true;
                validateField(document.getElementById('signupName'));
                validateField(document.getElementById('signupEmail'));
                validateField(document.getElementById('signupPassword'));
                validateField(document.getElementById('signupConfirm'));
            }

            showToast(`Demo ${role} account loaded. Click "${activeTab === 'signin' ? 'Sign In' : 'Create Account'}" to continue.`, 'info');
        });
    });
}

function setupSocialLogin() {
    document.querySelectorAll('.btn-social').forEach(btn => {
        btn.addEventListener('click', () => {
            const provider = btn.dataset.provider;
            showToast(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login would redirect to OAuth provider`, 'info');
        });
    });
}

function checkRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');

    if (redirect) {
        localStorage.setItem('nexus_redirect', redirect);
    }
}

// Toast (reuse from app.js or define here)
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
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Spinner CSS (inject if not in styles.css)
const style = document.createElement('style');
style.textContent = `
    .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-right: 0.5rem;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);