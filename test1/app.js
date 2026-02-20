document.addEventListener('DOMContentLoaded', () => {
  // --- Global State & Init ---
  const cartKey = 'coffee_cart';
  const userKey = 'coffee_user';
  
  // Update Cart Count in Nav
  updateCartCount();
  
  // Check Auth State
  checkAuth();
  
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
  
  // Page Specific Logic
  const path = window.location.pathname;
  if (path.includes('shop.html') || path.includes('index.html')) {
    renderShop();
  }
  
  if (path.includes('product.html')) {
    renderProductDetail();
  }
  
  if (path.includes('cart.html')) {
    renderCart();
  }
  
  if (path.includes('auth.html')) {
    initAuth();
  }
});

// --- Cart Logic ---

function getCart() {
  return JSON.parse(localStorage.getItem('coffee_cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('coffee_cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }
  
  saveCart(cart);
  alert('Item added to cart!');
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector('.cart-count');
  if (badge) badge.textContent = count;
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart(); // Re-render if on cart page
}

function updateItemQuantity(productId, newQty) {
  if (newQty < 1) return;
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart(cart);
    renderCart();
  }
}

// --- Render Logic ---

function renderShop() {
  const grid = document.querySelector('.products-grid');
  if (!grid || typeof products === 'undefined') return;
  
  // If on homepage, maybe limit to 3 items
  const isHome = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
  const itemsToShow = isHome ? products.slice(0, 3) : products;
  
  grid.innerHTML = itemsToShow.map(product => `
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
          <button onclick="addToCart(${product.id}, 1)" class="btn btn-sm">Add</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);
  
  if (!product) {
    document.querySelector('.product-detail').innerHTML = '<p>Product not found.</p>';
    return;
  }
  
  // Update page title
  document.title = `${product.name} | Brew & Bloom`;
  
  // Inject Details
  const container = document.querySelector('.product-detail');
  container.innerHTML = `
    <div class="detail-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="detail-info">
      <h1>${product.name}</h1>
      <p class="detail-price">$${product.price.toFixed(2)}</p>
      <p style="margin-bottom: 2rem;">${product.description}</p>
      
      <div class="quantity-control">
        <button class="qty-btn" onclick="adjustDetailQty(-1)">-</button>
        <input type="number" id="detail-qty" class="qty-input" value="1" min="1" readonly>
        <button class="qty-btn" onclick="adjustDetailQty(1)">+</button>
      </div>
      
      <button onclick="addToCart(${product.id}, parseInt(document.getElementById('detail-qty').value))" class="btn">Add to Cart</button>
    </div>
  `;
}

function adjustDetailQty(delta) {
  const input = document.getElementById('detail-qty');
  let val = parseInt(input.value);
  val += delta;
  if (val < 1) val = 1;
  input.value = val;
}

function renderCart() {
  const cart = getCart();
  const tbody = document.querySelector('.cart-table tbody');
  const summary = document.querySelector('.cart-summary');
  
  if (cart.length === 0) {
    document.querySelector('.container').innerHTML = '<h2>Your Cart is Empty</h2><p><a href="shop.html">Continue Shopping</a></p>';
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
            <button class="qty-btn" style="width:30px;height:30px" onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <input type="number" class="qty-input" style="width:40px;height:30px" value="${item.quantity}" readonly>
            <button class="qty-btn" style="width:30px;height:30px" onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
        </td>
        <td>$${total.toFixed(2)}</td>
        <td>
          <button onclick="removeFromCart(${item.id})" style="color:red;background:none;border:none;cursor:pointer;">&times;</button>
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
    <button class="btn" style="width:100%;margin-top:1rem;" onclick="alert('Checkout functionality coming soon!')">Proceed to Checkout</button>
  `;
}

// --- Auth Logic ---

function initAuth() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form'); // If you add tabs later
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const user = { email, name: email.split('@')[0] }; // Mock user
      localStorage.setItem('coffee_user', JSON.stringify(user));
      window.location.href = 'index.html';
    });
  }
}

function checkAuth() {
  const user = JSON.parse(localStorage.getItem('coffee_user'));
  const authLink = document.getElementById('auth-link');
  
  if (user && authLink) {
    authLink.textContent = `Hi, ${user.name}`;
    authLink.href = '#';
    authLink.addEventListener('click', (e) => {
      e.preventDefault();
      if(confirm('Log out?')) {
        localStorage.removeItem('coffee_user');
        window.location.reload();
      }
    });
  }
}
