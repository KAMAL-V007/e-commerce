// Dynamic BASE_URL: 
// In development (local), we use http://localhost:3000
// In Docker/Production, we use a relative path /api and let Nginx handle the routing
const BASE_URL = window.location.origin.includes('localhost:8080') ? '/api' : 'http://localhost:3000/api';

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
}

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error('Invalid Credentials');
  return await response.json();
}

export async function register(name, email, password) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  if (!response.ok) throw new Error('Registration Failed');
  return await response.json();
}

export async function submitOrder(orderData) {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!response.ok) throw new Error('Failed to process order');
  return await response.json();
}
