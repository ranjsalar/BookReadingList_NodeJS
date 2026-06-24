# 📖 Book Reading List
### SCSJ4383 Software Construction — Assignment 2

A Book Reading List web application built with **Node.js** and **Express.js** for the Software Construction course at Universiti Teknologi Malaysia.

---

## Features (5 Functionalities)

| # | Functionality | HTTP Method | Endpoint | Type |
|---|--------------|-------------|----------|------|
| 1 | View all books | `GET` | `/api/books` | ✅ REST API |
| 2 | Add a new book | `POST` | `/api/books` | ✅ REST API |
| 3 | Edit a book | `PUT` | `/books/:id` | Web |
| 4 | Delete a book | `DELETE` | `/books/:id` | Web |
| 5 | Advance reading status | `PATCH` | `/books/:id/advance` | Web |

Reading status cycles: **Want to Read → Reading → Finished → Want to Read**

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v4.18
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)
- **Data Storage:** In-memory array

---

## Setup

```bash
# 1. Clone the repo
git clone <your-github-repository-link>

# 2. Go into the folder
cd book-reading-list

# 3. Install dependencies
npm install

# 4. Start the server
npm start

# 5. Open browser at
# http://localhost:3000
```

---

## REST API Endpoints

### GET /api/books
Returns all books.
```json
{ "success": true, "count": 3, "data": [ ... ] }
```

### GET /api/books/:id
Returns one book by ID.

### POST /api/books
Creates a new book.
```json
{ "title": "...", "author": "...", "genre": "...", "status": "WantToRead", "rating": 4 }
```
Returns `201 Created`.

---

## Project Structure

```
book-reading-list/
├── server.js            # Entry point, Express setup
├── package.json         # Dependencies
├── data/
│   └── bookRepository.js  # In-memory data store (all CRUD operations)
├── routes/
│   ├── booksApi.js      # RESTful API routes (GET, GET/:id, POST)
│   └── books.js         # Web routes (PUT, DELETE, PATCH)
└── public/
    └── index.html       # Frontend single-page UI
```

---

## Author

- **Name:** Ranj Salar
- **Matric No:** QIU22-0322
- **Course:** SCSJ4383 Software Construction
- **Institution:** Universiti Teknologi Malaysia
