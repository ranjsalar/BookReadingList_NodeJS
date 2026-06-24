// ============================================================
// routes/booksApi.js — RESTful Web Service
//
//   GET    /api/books       → list every book
//   GET    /api/books/:id   → a single book
//   POST   /api/books       → create a new book
// ============================================================

const express = require('express');
const router  = express.Router();
const { BookRepository } = require('../data/bookRepository');

// ─────────────────────────────────────────────────────────────
// FUNCTIONALITY 1 (REST): GET /api/books
// Returns all books as JSON
// ─────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  try {
    const books = BookRepository.getAll();
    res.status(200).json({
      success : true,
      count   : books.length,
      data    : books
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/books/:id
// Returns a single book by ID
// ─────────────────────────────────────────────────────────────
router.get('/:id', (req, res) => {
  try {
    const book = BookRepository.getById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found.' });
    res.status(200).json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ─────────────────────────────────────────────────────────────
// FUNCTIONALITY 2 (REST): POST /api/books
// Creates a new book — returns 201 Created with the new resource
// ─────────────────────────────────────────────────────────────
router.post('/', (req, res) => {
  try {
    const { title, author, genre, status, rating } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'A title is required.' });
    }

    const created = BookRepository.add({ title, author, genre, status, rating });

    // Conventional REST response: 201 Created
    res.status(201).json({
      success : true,
      message : 'Book added successfully.',
      data    : created
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
