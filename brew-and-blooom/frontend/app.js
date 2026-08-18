import { fetchProducts, submitOrder, login, register } from './api.js';
import { getUser, logout, getCart, clearCart, saveUser } from './cart.js';
import { updateCartBadge, renderProductGrid, renderProductDetail, renderCartPage, renderCheckout, setupFooter } from './ui.js';

console.log("app.js loaded");

async function init() {
  console.log("init() starting...");
  // 1. Initial Logic
  let products = [];
  try {
    const CACHE_VERSION = 'v2'; // Increment version to force refresh
    const cachedVersion = sessionStorage.getItem('products_cache_version');
    const cachedProducts = sessionStorage.getItem('products_cache');
    
    if (cachedProducts && cachedVersion === CACHE_VERSION) {
      console.log("Using cached products...");
      products = JSON.parse(cachedProducts);
    } else {
      console.log("Calling fetchProducts()...");
      const rawProducts = await fetchProducts();
      products = rawProducts.map(p => ({ ...p, price: parseFloat(p.price) }));
      sessionStorage.setItem('products_cache', JSON.stringify(products));
      sessionStorage.setItem('products_cache_version', CACHE_VERSION);
      console.log("fetchProducts() success, count:", products.length);
    }
  } catch (err) {
    console.error("CRITICAL: fetchProducts failed:", err);
  }

  // 2. Initial Render
  try {
    console.log("Starting initial renders...");
    // Target any product grid variant (Home/Shop/Modern)
    const grid = document.querySelector('.products-grid, .modern-products-grid, .modern-grid, #shop-products-grid');
    if (grid) renderProductGrid(products);

    renderProductDetail(products);
    renderCartPage(products);
    renderCheckout(products);
    updateCartBadge();
    setupFooter();
    setupWhatsAppFloat();
    console.log("Renders complete.");
  } catch (err) {
    console.error("Error during initial render:", err);
  }
  // 3. Setup Listeners
  try {
    document.addEventListener('cartUpdated', updateCartBadge);

    // Sticky Header Logic
    window.onscroll = () => {
        const header = document.querySelector('.main-header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    };

    // Mobile Hamburger Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
      menuToggle.onclick = () => {
        navLinks.classList.toggle('open');
        menuToggle.classList.toggle('open');
      };
      navLinks.querySelectorAll('a').forEach(link => {
        link.onclick = () => {
          navLinks.classList.remove('open');
          menuToggle.classList.remove('open');
        };
      });
    }

    // Filter listener (Modern & Standard)
    const filterElements = document.querySelectorAll('.filter-pill, .filter-btn');
    filterElements.forEach(btn => {
      btn.onclick = () => {
        const category = btn.dataset.category || btn.innerText.trim();
        renderProductGrid(products, category);
        
        // Update active state
        filterElements.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
    });

    // Auth Status (Fixed)
    const user = getUser();
    const authLink = document.getElementById('auth-link');
    if (user && authLink) {
      authLink.textContent = `Hi, ${user.name}`;
      authLink.onclick = (e) => { 
        e.preventDefault(); 
        if (confirm('Logout?')) logout(); 
      };
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
          const data = await login(email, password);
          saveUser(data.user);
          localStorage.setItem('token', data.token);
          window.location.href = '/';
        } catch (err) { alert('Login Failed: ' + err.message); }
      };
    }

    // Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        try {
          await register(name, email, password);
          alert('Registration Success! Please Login.');
          window.location.reload();
        } catch (err) { 
          alert('Registration Failed: ' + err.message); 
        }
      };
    }
    console.log("Listeners setup complete.");
  } catch (err) {
    console.error("Error setting up listeners:", err);
  }

  // Checkout Form
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      window.location.href = '/shop';
      return;
    }

    checkoutForm.onsubmit = async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('place-order-btn');
      const originalBtnText = submitBtn.textContent;
      
      const orderData = {
        customer: {
          email: document.getElementById('email').value,
          firstName: document.getElementById('first-name').value,
          lastName: document.getElementById('last-name').value,
          address: document.getElementById('address').value,
          city: document.getElementById('city').value,
          zip: document.getElementById('zip').value,
        },
        items: cart,
        payment: {
          cardNumber: document.getElementById('card-number').value,
          expiry: document.getElementById('expiry').value,
          cvv: document.getElementById('cvv').value,
        }
      };

      try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        
        await submitOrder(orderData);
        
        // Success Logic
        clearCart();
        const modal = document.getElementById('success-modal');
        if (modal) modal.style.display = 'flex';
      } catch (err) {
        alert('Checkout Failed: ' + err.message);
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    };
  }
}

console.log("Registering DOMContentLoaded listener...");
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded fired!");
  init();
});

function setupWhatsAppFloat() {
  if (document.querySelector('.whatsapp-float')) return;
  const phone = '1234567890';
  const text = encodeURIComponent("Hello! I'm interested in your coffee.");
  const link = document.createElement('a');
  link.className = 'whatsapp-float';
  link.href = `https://wa.me/${phone}?text=${text}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', 'Chat on WhatsApp');
  link.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.608.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  document.body.appendChild(link);
}
