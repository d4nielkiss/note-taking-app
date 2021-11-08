import NoteForm from './common/NoteForm';
import '../scss/note.scss';

export default function CreateNote({
  backend,
  setIsNoteCreated,
  user,
}) {
  return (
    <div className="d-flex justify-content-center">
      <div className="box">
        <h2 className="mb-3">
          Add a new note
        </h2>
        <div>
          <NoteForm
            backend={backend}
            setIsNoteCreated={setIsNoteCreated}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};
