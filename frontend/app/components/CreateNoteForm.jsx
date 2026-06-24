'use client';

import { useState } from 'react';

export default function CreateNoteForm({ onNoteCreated }) {
  const [title,   setTitle]   = useState('');
  const [content, setContent] = useState('');
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });
      if (!res.ok) throw new Error('Failed to create note');
      const newNote = await res.json();
      onNoteCreated(newNote);
      setTitle('');
      setContent('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-form">
      <h2>+ New Note</h2>
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Note content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p className="form-error">{error}</p>}
      <button
        className="btn-create"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Add Note'}
      </button>
    </div>
  );
}