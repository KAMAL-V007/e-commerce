// --- 1. MOCK DATABASE ---
const products = [
  { id: 1, name: "House Blend", price: 9.95, desc: "Chocolate & Hazelnut notes", color: "#F4DCDC" },
  { id: 2, name: "Black Blend", price: 10.50, desc: "Dark Roast, Punchy", color: "#E3D3C3" },
  { id: 3, name: "Decaf Blend", price: 11.00, desc: "Chemical-free process", color: "#C3D3E3" },
  { id: 4, name: "Editions Tin", price: 15.00, desc: "Limited Run Container", color: "#EAEAEA" },
  { id: 5, name: "Filter Coffee", price: 8.50, desc: "Ground for V60", color: "#F9E4E6" },
  { id: 6, name: "Grind One Machine", price: 295.00, desc: "Built to last", color: "#333", text: "#fff" }
];

let cart = [];

// --- 2. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupNavigation();
});

// --- 3. NAVIGATION (ROUTER) ---
function router(viewName) {
  // Hide all views
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.add('hidden');
    view.classList.remove('active');
  });

  // Show selected view
  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

function setupNavigation() {
  // Connect "Shop All" link in Nav
  document.querySelector('nav .nav-left a:first-child').addEventListener('click', (e) => {
    e.preventDefault();
    router('shop');
  });

  // Connect Logo to Home
  document.querySelector('.logo').addEventListener('click', () => router('home'));

  // Connect Cart Icon
  document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart();
  });
}

// --- 4. RENDER PRODUCTS ---
function renderProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="addToCart(${product.id})">
            <div class="card-image" style="background-color: ${product.color}">
                <div class="coffee-bag" style="background:${product.text ? '#fff' : '#333'}"></div>
            </div>
            <div class="card-info">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="card-price">£${product.price.toFixed(2)}</div>
            </div>
            <button class="btn-black" style="width:100%; margin-top:10px;">Add to Bag</button>
        </div>
    `).join('');
}

// --- 5. CART LOGIC ---
function toggleCart() {
  const cartOverlay = document.getElementById('cart-overlay');
  cartOverlay.classList.toggle('hidden');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  toggleCart(); // Open cart to show user
  showToast();
}

function updateCartUI() {
  const container = document.getElementById('cart-items-container');
  const totalEl = document.getElementById('cart-total');
  const headerCount = document.getElementById('cart-count-header');

  // Calculate Totals
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-msg">Your bag is empty.</p>`;
  } else {
    container.innerHTML = cart.map(item => {
      total += item.price * item.qty;
      count += item.qty;
      return `
                <div class="cart-item">
                    <div class="cart-item-img" style="background:${item.color}"></div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>£${item.price.toFixed(2)} x ${item.qty}</p>
                    </div>
                </div>
            `;
    }).join('');
  }

  totalEl.innerText = `£${total.toFixed(2)}`;
  headerCount.innerText = `(${count})`;
}

// Toast Notification
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2000);
}
