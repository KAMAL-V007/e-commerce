// --- 1. Global Constants & Utilities ---

const CART_KEY = 'coffee_cart';
const USER_KEY = 'coffee_user';

// Helper: Get cart from local storage
function getCart() {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Helper: Save cart to local storage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// Helper: Get URL parameter (e.g., ?id=1)
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


// --- 2. Cart Logic ---

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity: quantity });
  }

  saveCart(cart);
  alert('Item added to cart!');
}

function removeFromCart(productId) {
  const cart = getCart();
  const newCart = cart.filter(item => item.id !== productId);
  saveCart(newCart);
  renderCartPage(); // Refresh the view
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) return;
  
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity = newQuantity;
    saveCart(cart);
    renderCartPage(); // Refresh the view
  }
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const badge = document.querySelector('.cart-count');
  if (badge) {
    badge.textContent = totalItems;
  }
}


// --- 3. Page Rendering ---

// Render Product Grid (Home & Shop)
function renderProductGrid(category = 'All') {
  const grid = document.querySelector('.products-grid');
  if (!grid) return; // Stop if not on a page with a grid

  // 1. Filter Logic
  let itemsToDisplay = products;
  
  if (category !== 'All') {
    itemsToDisplay = products.filter(product => product.category === category);
  }

  // 2. Limit Logic (for Home page)
  // If data-limit exists, we ignore the category filter (usually) or apply it on top.
  // For this simple app, Home page usually doesn't have filter buttons, so this is safe.
  if (grid.dataset.limit) {
    const limit = parseInt(grid.dataset.limit);
    itemsToDisplay = itemsToDisplay.slice(0, limit);
  }

  // 3. Render
  if (itemsToDisplay.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No products found in this category.</p>';
    return;
  }

  grid.innerHTML = itemsToDisplay.map(product => `
    <article class="product-card">
      <a href="product.html?id=${product.id}" class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <div class="product-info">
        <h3 class="product-title">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="product-actions">
          <a href="product.html?id=${product.id}" class="btn btn-sm btn-outline">View</a>
          <button onclick="addToCart(${product.id})" class="btn btn-sm">Add</button>
        </div>
      </div>
    </article>
  `).join('');

  // 4. Update Button Styles (Visual Feedback)
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.innerText === category || (category === 'All' && btn.innerText === 'All')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Render Checkout Page
function renderCheckout() {
  const summaryContainer = document.getElementById('checkout-summary');
  if (!summaryContainer) return;

  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = 'cart.html'; // Redirect if empty
    return;
  }

  let subtotal = 0;
  const itemsHtml = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return '';
    const total = product.price * item.quantity;
    subtotal += total;
    return `<div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
              <span>${product.name} x ${item.quantity}</span>
              <span>$${total.toFixed(2)}</span>
            </div>`;
  }).join('');

  summaryContainer.innerHTML = `
    <h3>Order Summary</h3>
    <div style="margin-bottom: 1rem; border-bottom: 1px solid #ddd; padding-bottom: 1rem;">
      ${itemsHtml}
    </div>
    <div class="summary-row">
      <span>Subtotal</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>Free</span>
    </div>
    <div class="total-row summary-row">
      <span>Total</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
  `;
}

function handleCheckout(event) {
  event.preventDefault();
  alert('Thank you for your order! (This is a mock checkout)');
  localStorage.removeItem(CART_KEY); // Clear cart
  window.location.href = 'index.html';
}

// Render Single Product Detail
function renderProductDetail() {
  const container = document.getElementById('product-detail');
  if (!container) return; // Stop if not on detail page

  const id = parseInt(getUrlParam('id'));
  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = '<p>Product not found.</p>';
    return;
  }

  document.title = `${product.name} | Brew & Bloom`;

  container.innerHTML = `
    <div class="detail-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="detail-info">
      <h1>${product.name}</h1>
      <p class="detail-price">$${product.price.toFixed(2)}</p>
      <p>${product.description}</p>
      
      <div class="quantity-control" style="margin: 2rem 0;">
        <button class="qty-btn" onclick="adjustInput(-1)">-</button>
        <input type="number" id="qty-input" class="qty-input" value="1" readonly>
        <button class="qty-btn" onclick="adjustInput(1)">+</button>
      </div>
      
      <button onclick="addToCart(${product.id}, parseInt(document.getElementById('qty-input').value))" class="btn">Add to Cart</button>
    </div>
  `;
}

// Helper for Detail Page Quantity
function adjustInput(delta) {
  const input = document.getElementById('qty-input');
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  input.value = val;
}

// Render Cart Page
function renderCartPage() {
  const tbody = document.getElementById('cart-table')?.querySelector('tbody');
  const summary = document.getElementById('cart-summary');
  
  if (!tbody || !summary) return; // Stop if not on cart page

  const cart = getCart();
  
  if (cart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 2rem;">Your cart is empty.</td></tr>';
    summary.innerHTML = '<p>Cart is empty</p>';
    return;
  }

  let subtotal = 0;

  tbody.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return '';
    
    const total = product.price * item.quantity;
    subtotal += total;

    return `
      <tr>
        <td>
          <div class="cart-item-info">
            <img src="${product.image}" class="cart-item-img" alt="${product.name}">
            <span>${product.name}</span>
          </div>
        </td>
        <td>$${product.price.toFixed(2)}</td>
        <td>
          <div class="quantity-control" style="margin:0">
            <button class="qty-btn" style="width:30px;height:30px" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
            <button class="qty-btn" style="width:30px;height:30px" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
        </td>
        <td>$${total.toFixed(2)}</td>
        <td>
          <button onclick="removeFromCart(${item.id})" style="color:red; border:none; background:none; cursor:pointer; font-size: 1.5rem;">&times;</button>
        </td>
      </tr>
    `;
  }).join('');

  summary.innerHTML = `
    <h3>Order Summary</h3>
    <div class="summary-row">
      <span>Subtotal</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>Free</span>
    </div>
    <div class="total-row summary-row">
      <span>Total</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <a href="checkout.html" class="btn" style="width:100%; margin-top:1rem; text-align:center; display:block;">Proceed to Checkout</a>
  `;
}


// --- 4. General UI & Auth ---

function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  
  // Simple Mock Login
  const user = { name: email.split('@')[0], email: email };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  window.location.href = 'index.html';
}

function checkLoginStatus() {
  const user = JSON.parse(localStorage.getItem(USER_KEY));
  const authLink = document.getElementById('auth-link');
  
  if (user && authLink) {
    authLink.textContent = `Hi, ${user.name}`;
    authLink.href = '#';
    authLink.onclick = () => {
      if (confirm('Log out?')) {
        localStorage.removeItem(USER_KEY);
        window.location.reload();
      }
    };
  }
}


// --- 5. Initialization ---

// Execute Global Logic
updateCartBadge();
setupMobileMenu();
checkLoginStatus();

// Execute Page-Specific Logic (if elements exist)
renderProductGrid();
renderProductDetail();
renderCartPage();
renderCheckout();

// Auth Listener
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', handleLogin);
}

// Checkout Listener
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', handleCheckout);
}