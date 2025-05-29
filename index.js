const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory book storage
let books = [];
let idCounter = 1;

// 5. GET /books - List all books
app.get('/books', (req, res) => {
  res.json(books);
});

// 6. POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: idCounter++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// 7. PUT /books/:id - Update book by ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === id);

  if (!book) return res.status(404).json({ message: 'Book not found' });

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// 8. DELETE /books/:id - Delete book by ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  const deleted = books.splice(index, 1);
  res.json(deleted[0]);
});

// 3. Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});