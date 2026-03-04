const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const client = require('prom-client'); // Import Prometheus Client
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET not found in environment.");
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

// --- Prometheus Setup ---
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register }); // Collect CPU/RAM/EventLoop metrics

// Custom metric: Count HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

// Middleware to count requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// --- Middleware ---
app.use(cors({ origin: '*' })); // Allow all for local dev
app.use(express.json());

// --- Metrics Route ---
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// --- Auth Routes ---
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    res.json({ message: "Registration successful!", user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('User already exists or server error');
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).json({ message: 'Invalid Credentials' });
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });
    const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- Product Routes ---
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/checkout', async (req, res) => {
  try {
    console.log("Order received:", req.body);
    res.json({ message: "Order successfully processed by the server!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
