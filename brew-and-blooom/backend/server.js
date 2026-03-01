const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
// Route: Get all products 
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// Route: Checkout (Mock) 
app.post('/api/checkout', async (req, res) => {
  try {
    console.log("Order received:",
      req.body); res.json({ message: "Order successfully processed by the server!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.listen(port, () => {
  console.log('Server is running on http://localhost:${port}');
});
