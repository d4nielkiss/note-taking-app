import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbtack,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import '../scss/note.scss';

export default function Note({
  title,
  description,
  date,
  isPinned,
  id,
  handleThumbtackClick,
}) {
  const dateTime = moment(date).format('MMMM Do YYYY, h:mm:ss a');

  return (
    <div className={`Note box ${isPinned ? `Note-isPinned` : ``}`}>
      <div className="d-flex justify-content-between">
        <h3>{title}</h3>
        <div id="pin">
          <FontAwesomeIcon
            cursor="pointer"
            onClick={handleThumbtackClick}
            data-id={id}
            data-ispinned={isPinned}
            icon={faThumbtack}
            size="2x"
            title={isPinned ? 'Unpin' : 'Pin'}
          />
        </div>
      </div>
      <hr/>
      <article>{description}</article>
      <div className="d-flex justify-content-between">
        <small>{dateTime}</small>
        <div className="action-icons d-flex">
          <div id="edit">
            <FontAwesomeIcon
              icon={faEdit}
              cursor="pointer"
              title="Edit"
            />
          </div>
          <div id="delete">
            <FontAwesomeIcon
              icon={faTrash}
              cursor="pointer"
              title="Delete"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
