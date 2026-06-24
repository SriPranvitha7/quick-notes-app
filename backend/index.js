const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

let notes = [
  { id: 1, title: 'Welcome!', content: 'This is your first note. Start creating!' },
  { id: 2, title: 'Shopping List', content: 'Milk, Eggs, Bread, Butter' },
];
let nextId = 3;

// GET all notes
app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
});

// POST create note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  const newNote = { id: nextId++, title: title.trim(), content: content.trim() };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// DELETE note by id
app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) return res.status(404).json({ error: 'Note not found.' });
  notes.splice(index, 1);
  res.status(200).json({ message: `Note ${id} deleted.` });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});