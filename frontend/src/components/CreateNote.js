import Form from './common/NoteForm';
import '../scss/note.scss';

export default function CreateNote({ backend }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="box">
        <h2 className="mb-3">
          Add a new note
        </h2>
        <div>
          <Form backend={backend} />
        </div>
      </div>
    </div>
  );
};
