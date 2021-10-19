import { useEffect, useState } from 'react';


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
      <h2>Note list</h2>
      {notes && 
        notes.map(note => {
          return (
            <div>
              <h3>{note.title}</h3>
              <article>{note.description}</article>
            </div>
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
