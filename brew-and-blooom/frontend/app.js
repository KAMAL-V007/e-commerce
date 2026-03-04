import { fetchProducts, submitOrder, login, register } from './api.js';
import { getUser, logout, getCart, clearCart, saveUser } from './cart.js';
import { updateCartBadge, renderProductGrid, renderProductDetail, renderCartPage, renderCheckout } from './ui.js';

async function init() {
  let products = [];
  try {
    const rawProducts = await fetchProducts();
    products = rawProducts.map(p => ({ ...p, price: parseFloat(p.price) }));
  } catch (err) {
    console.error("API error, using local data", err);
    products = window.products || [];
  }

  renderProductGrid(products);
  renderProductDetail(products);
  renderCartPage(products);
  renderCheckout(products);
  updateCartBadge();

  document.addEventListener('cartUpdated', updateCartBadge);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => renderProductGrid(products, btn.innerText);
  });

  const user = getUser();
  const authLink = document.getElementById('auth-link');
  if (user && authLink) {
    authLink.textContent = `Hi, ${user.name}`;
    authLink.onclick = (e) => {
      e.preventDefault();
      if (confirm('Logout?')) logout();
    };
  }

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
        window.location.href = 'index.html';
      } catch (err) { alert('Login Failed: ' + err.message); }
    };
  }

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
      } catch (err) { alert('Registration Failed'); }
    };
  }

  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.onsubmit = async (e) => {
      e.preventDefault();
      if (!user) { alert('Please login to checkout'); return; }
      const orderData = { user, items: getCart() };
      try {
        await submitOrder(orderData);
        alert('Order Success!');
        clearCart();
        window.location.href = 'index.html';
      } catch (err) { alert('Order Failed'); }
    };
  }
}

document.addEventListener('DOMContentLoaded', init);
