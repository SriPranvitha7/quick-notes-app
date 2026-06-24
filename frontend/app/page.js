import NotesList from './components/NotesList';

export default async function HomePage() {
  let initialNotes = [];
  try {
    const res = await fetch('http://localhost:5000/api/notes', {
      cache: 'no-store',
    });
    if (res.ok) initialNotes = await res.json();
  } catch (e) {
    initialNotes = [];
  }

  return (
    <>
      <nav className="navbar">
        <h1>📝 Quick Notes</h1>
        <span>Node.js + Next.js 13</span>
      </nav>
      <main className="main-container">
        <NotesList initialNotes={initialNotes} />
      </main>
    </>
  );
}