import { useEffect, useState } from 'react';
import Note from './Note';

export default function NoteList({ backend, user }) {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  const id = user.id;

  function fetchNoteQuery() {
    fetch(`${backend}/user/${id}`)
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
  }

  useEffect(() => {
    fetch(`${backend}/user/${id}`)
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
  }, [backend, id]);

  function fetchIsPinnedChange(status, id) {
    fetch(`${backend}/note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        isPinned: status,
      }),
    })
      .then(response => {
        response.json();
        fetchNoteQuery();
      })
      .catch(err => {
        setError(err.message);
      });
  }

  function setIdToBeDeleted(e) {
    const id = e.currentTarget.dataset.id;
    setIdToDelete(id);
  }

  function handleNoteDeletion() {
    fetch(`${backend}/note/${idToDelete}`, {
      method: 'DELETE',
    })
    .then((res) => {
      res.json();
      fetchNoteQuery();
    })
    .catch((err) => {
      setError(err.message);
    })
  }

  function handleThumbtackClick(e) {
    const id = e.currentTarget.dataset.id;
    let pinnedUpdateTo = false;
    if (e.currentTarget.dataset.ispinned === 'false') {
      pinnedUpdateTo = true;
    }
    fetchIsPinnedChange(pinnedUpdateTo, id);
  }

  return (
    <div className="NoteList d-flex align-items-center flex-column">
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
              handleThumbtackClick={handleThumbtackClick}
              setIdToBeDeleted={setIdToBeDeleted}
              handleNoteDeletion={handleNoteDeletion}
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
