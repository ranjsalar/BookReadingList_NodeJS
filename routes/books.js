// ============================================================
// routes/books.js — Web (HTML) Routes
// Provides the web routes used by the frontend for update, delete and advance-status actions
// ============================================================

const express = require('express');
const path    = require('path');
const router  = express.Router();
const { BookRepository } = require('../data/bookRepository');

// Serve the main SPA page for all web routes
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ── FUNCTIONALITY 3: Update a book (PUT) ─────────────────────
router.put('/books/:id', (req, res) => {
  try {
    const updated = BookRepository.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Book not found.' });
    res.status(200).json({ success: true, message: `"${updated.title}" was updated.`, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ── FUNCTIONALITY 4: Delete a book (DELETE) ──────────────────
router.delete('/books/:id', (req, res) => {
  try {
    const deleted = BookRepository.delete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Book not found.' });
    res.status(200).json({ success: true, message: 'Book removed from your library.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ── FUNCTIONALITY 5: Advance reading status (PATCH) ──────────
router.patch('/books/:id/advance', (req, res) => {
  try {
    const book = BookRepository.advanceStatus(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found.' });
    res.status(200).json({ success: true, message: `Status updated to "${book.status}".`, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
