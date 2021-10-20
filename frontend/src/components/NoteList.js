import { useEffect, useState } from 'react';
import Note from './Note';

export default function NoteList({ backend }) {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${backend}/note`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(data => {
        setNotes(data.notes)
      })
      .catch(err => {
        setError(err.message);
      });
  }, [backend]);

  return (
    <div className="NoteList">
      {notes && 
        notes.map(note => {
          return (
            <Note
              key={note._id}
              id={note._id}
              title={note.title}
              description={note.description}
              date={note.date}
              isPinned={note.isPinned}
            />
          )
        })
      }
      {error &&
        <div className={`alert alert-danger`} role="alert">
          {error}
        </div>
      }
    </div>
  );
};
