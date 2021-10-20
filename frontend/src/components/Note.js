import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import '../scss/note.scss';

export default function Note({
  title,
  description,
  date,
  isPinned,
}) {
  const dateTime = moment(date).format('MMMM Do YYYY, h:mm:ss a')

  return (
    <div className="Note">
      <div className="d-flex justify-content-between">
        <h3>{title}</h3>
        <FontAwesomeIcon icon={faThumbtack} size="2x" color="gray" />
      </div>
      <hr/>
      <article>{description}</article>
      <small>{dateTime}</small>
    </div>
  );
};
