import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
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
          <FontAwesomeIcon className="me-2" icon={faPen} />
          Edit note
        </h2>
        <div>
          <NoteForm
            backend={backend}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};
