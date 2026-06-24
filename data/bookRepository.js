// ============================================================
// data/bookRepository.js
// In-memory data store used by the Express route files
// Shared as a singleton across all route files
// ============================================================

// Reading status values
const ReadingStatus = {
  WantToRead : 'WantToRead',
  Reading    : 'Reading',
  Finished   : 'Finished'
};

// Seed data
let books = [
  { id: 1, title: 'The Hobbit',    author: 'J.R.R. Tolkien',   genre: 'Fantasy',    status: ReadingStatus.Finished,   rating: 5,    dateAdded: new Date().toISOString() },
  { id: 2, title: 'Clean Code',    author: 'Robert C. Martin', genre: 'Technology', status: ReadingStatus.Reading,    rating: null, dateAdded: new Date().toISOString() },
  { id: 3, title: 'Atomic Habits', author: 'James Clear',      genre: 'Self-Help',  status: ReadingStatus.WantToRead, rating: null, dateAdded: new Date().toISOString() }
];

let nextId = 4;

// Status sort order for display (Want to Read → Reading → Finished)
const statusOrder = { WantToRead: 0, Reading: 1, Finished: 2 };

const BookRepository = {

  // Returns books sorted by status then alphabetically by title
  getAll(filterStatus = null) {
    let result = [...books];
    if (filterStatus) result = result.filter(b => b.status === filterStatus);
    return result
      .sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || a.title.localeCompare(b.title));
  },

  getById(id) {
    return books.find(b => b.id === parseInt(id)) || null;
  },

  add(data) {
    const book = {
      id        : nextId++,
      title     : (data.title     || '').trim(),
      author    : (data.author    || '').trim(),
      genre     : (data.genre     || '').trim(),
      status    : data.status || ReadingStatus.WantToRead,
      rating    : data.rating ? parseInt(data.rating) : null,
      dateAdded : new Date().toISOString()
    };
    books.push(book);
    return book;
  },

  update(id, data) {
    const book = BookRepository.getById(id);
    if (!book) return null;
    book.title  = (data.title  || book.title).trim();
    book.author = (data.author || book.author).trim();
    book.genre  = (data.genre  || book.genre).trim();
    book.status = data.status || book.status;
    book.rating = data.rating !== undefined ? (data.rating ? parseInt(data.rating) : null) : book.rating;
    return book;
  },

  delete(id) {
    const index = books.findIndex(b => b.id === parseInt(id));
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
  },

  // Advances status: WantToRead → Reading → Finished → WantToRead
  advanceStatus(id) {
    const book = BookRepository.getById(id);
    if (!book) return null;
    const cycle = {
      [ReadingStatus.WantToRead] : ReadingStatus.Reading,
      [ReadingStatus.Reading]    : ReadingStatus.Finished,
      [ReadingStatus.Finished]   : ReadingStatus.WantToRead
    };
    book.status = cycle[book.status];
    return book;
  }
};

module.exports = { BookRepository, ReadingStatus };
