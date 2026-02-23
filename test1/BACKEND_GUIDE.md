# Backend & Database Guide for Brew & Bloom

You have successfully implemented the frontend logic for filtering products and a checkout UI. Now, let's take the next big step: **Building a Backend API and connecting a Database.**

This guide assumes you want to stay within the JavaScript ecosystem (Node.js).

## Phase 1: Set Up the Environment

1.  **Initialize Node.js**:
    Open your terminal in the `test1` folder and run:
    ```bash
    npm init -y
    ```
    This creates a `package.json` file to manage your dependencies.

2.  **Install Dependencies**:
    You will need a web server framework (Express) and a database driver (we'll start with SQLite for simplicity, or Mongoose for MongoDB).
    ```bash
    npm install express cors body-parser sqlite3
    ```

3.  **Create Server File**:
    Create a file named `server.js`. This will be the entry point for your backend.

## Phase 2: Create the API Server

In `server.js`, set up a basic Express server:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON bodies

// Mock Database (Replace this with real DB later)
const products = [
    { id: 1, name: "Ethiopian Yirgacheffe", price: 18.00, category: "Light Roast" },
    // ... copy data from data.js
];

// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/checkout', (req, res) => {
    const order = req.body;
    console.log("Order received:", order);
    // Here you would save to database
    res.json({ message: "Order processed successfully!" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

## Phase 3: Connect Frontend to Backend

Now, modify your `app.js` to fetch data from the server instead of using the local `data.js` file.

1.  **Remove `data.js` script tag** from your HTML files.
2.  **Update `app.js`**:

```javascript
// Replace the hardcoded 'products' array with a fetch call
let products = [];

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        products = await response.json();
        renderProductGrid(); // Re-render after fetching
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Call this on page load
fetchProducts();
```

3.  **Update Checkout Logic**:
    Instead of just alerting, send the order to the server:

```javascript
async function handleCheckout(event) {
    event.preventDefault();
    const orderData = {
        cart: getCart(),
        user: { name: document.getElementById('name').value, /* ... */ }
    };

    const response = await fetch('http://localhost:3000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });

    if (response.ok) {
        alert('Order placed!');
        localStorage.removeItem(CART_KEY);
        window.location.href = 'index.html';
    }
}
```

## Phase 4: Add a Real Database (SQLite)

1.  **Initialize Database**:
    Create a `database.js` file to set up the table.
    ```javascript
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./shop.db');

    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL, category TEXT)");
        // Insert initial data...
    });
    
    module.exports = db;
    ```

2.  **Use DB in `server.js`**:
    Import `db` and use `db.all("SELECT * FROM products", ...)` in your API routes instead of the mock array.

## Phase 5: Authentication (Advanced)
Once you have the basics, look into:
-   **JWT (JSON Web Tokens)** for secure login.
-   **Bcrypt** for hashing passwords.
-   **User Tables** in your database to store accounts.

Good luck! You are building a full-stack application!
