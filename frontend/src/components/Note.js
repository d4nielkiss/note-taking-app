import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbtack,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import '../scss/note.scss';
import { Link } from 'react-router-dom';

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
          <Link to={`/note/${id}`}>
            <div id="edit">
              <FontAwesomeIcon
                icon={faEdit}
                cursor="pointer"
                title="Edit"
              />
            </div>
          </Link>
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
