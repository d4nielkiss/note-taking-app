import Form from './Form';

export default function CreateNote({ backend }) {
  return (
    <div className="CreateNote">
      <h2>
        New Note
      </h2>
      <div>
        <Form backend={backend} />
      </div>
    </div>
  );
};
