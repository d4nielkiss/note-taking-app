import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import NoteForm from './common/NoteForm';
import '../scss/note.scss';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

export default function EditNote({
  backend,
  user,
}) {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${backend}/note/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setNote(data.note);
      })
      .catch((err) => {
        setError(err.message);
      })
  }, [backend, id]);
  
  return (
    <div className="d-flex justify-content-center">
      <div className="box">
        <h2 className="mb-3">
          <FontAwesomeIcon className="me-2" icon={faPen} />
          Edit note
        </h2>
        {note && (
          <div>
            <NoteForm
              backend={backend}
              user={user}
              type="edit"
              note={note}
              id={id}
            />
          </div>
        )}
      </div>
      {error &&
        <div className={`alert alert-danger`} role="alert">
          {error}
        </div>
      }
    </div>
  );
};
