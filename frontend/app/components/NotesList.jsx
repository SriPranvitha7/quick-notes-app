'use client';

import { useState } from 'react';
import CreateNoteForm from './CreateNoteForm';
import NoteCard from './NoteCard';

export default function NotesList({ initialNotes }) {
  const [notes, setNotes] = useState(initialNotes);

  const handleNoteCreated = (newNote) => {
    setNotes(prev => [newNote, ...prev]);
  };

  const handleNoteDeleted = (deletedId) => {
    setNotes(prev => prev.filter(note => note.id !== deletedId));
  };

  return (
    <>
      <CreateNoteForm onNoteCreated={handleNoteCreated} />

      <div className="notes-header">
        <h2>Your Notes</h2>
        <span className="notes-count">
          {notes.length} note{notes.length !== 1 ? 's' : ''}
        </span>
      </div>

      {notes.length === 0 ? (
        <div className="empty-state">
          <p>📭</p>
          <p>No notes yet. Create one above!</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleNoteDeleted}
            />
          ))}
        </div>
      )}
    </>
  );
}