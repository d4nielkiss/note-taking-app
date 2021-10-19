import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import '../scss/note.scss';

export default function Note({ title, description }) {
  return (
    <div className="Note">
      <div className="d-flex justify-content-between">
        <h3>{title}</h3>
        <FontAwesomeIcon icon={faThumbtack} size="2x" color="gray" />
      </div>
      <hr/>
      <article>{description}</article>
    </div>
  );
};
