'use client';

import { useState } from 'react';

export default function NoteCard({ note, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${note.title}"?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${note.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      onDelete(note.id);
    } catch (err) {
      alert('Error: ' + err.message);
      setDeleting(false);
    }
  };

  return (
    <div className="note-card">
      <span className="note-id">#{note.id}</span>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <button
        className="btn-delete"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}