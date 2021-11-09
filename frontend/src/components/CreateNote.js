import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NoteForm from './common/NoteForm';
import '../scss/note.scss';

export default function CreateNote({
  backend,
  user,
}) {
  return (
    <div className="d-flex justify-content-center">
      <div className="box">
        <h2 className="mb-3">
          <FontAwesomeIcon className="me-2" icon={faPlus} />
          Add a new note
        </h2>
        <div>
          <NoteForm
            backend={backend}
            user={user}
            type="new"
          />
        </div>
      </div>
    </div>
  );
};
