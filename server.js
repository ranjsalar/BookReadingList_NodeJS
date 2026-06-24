// ============================================================
// Book Reading List — Main Server Entry Point
// Framework : Express.js (Node.js)
// Course    : SCSJ4383 Software Construction — Assignment 2
// ============================================================

const express = require('express');
const path    = require('path');

const webRoutes = require('./routes/books');      // HTML web pages
const apiRoutes = require('./routes/booksApi');   // RESTful JSON API

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ───────────────────────────────────────────────────
// RESTful web service (Functionality 1 & 2 exposed as REST)
//   GET    /api/books          → list all books
//   GET    /api/books/:id      → get one book
//   POST   /api/books          → create a book
app.use('/api/books', apiRoutes);

// Web (HTML) routes
app.use('/', webRoutes);

// ── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅  Book Reading List is running!`);
  console.log(`🌐  Open  : http://localhost:${PORT}`);
  console.log(`📡  API   : http://localhost:${PORT}/api/books\n`);
});

module.exports = app;
