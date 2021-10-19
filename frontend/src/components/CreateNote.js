import Form from './Form';
import '../scss/note.scss';

export default function CreateNote({ backend }) {
  return (
    <div className="Note">
      <h2>
        Add a new note
      </h2>
      <div>
        <Form backend={backend} />
      </div>
    </div>
  );
};
