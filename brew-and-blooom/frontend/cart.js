const CART_KEY = 'coffee_cart';
const USER_KEY = 'coffee_user';

export function getCart() {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  document.dispatchEvent(new CustomEvent('cartUpdated'));
}

export function addToCart(productId, quantity = 1) {
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

export function removeFromCart(productId) {
  const cart = getCart();
  const newCart = cart.filter(item => item.id !== productId);
  saveCart(newCart);
}

export function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) return;
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    saveCart(cart);
  }
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(USER_KEY);
  window.location.reload();
}
