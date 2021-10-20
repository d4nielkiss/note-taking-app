import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
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
    <div className={isPinned ? `Note-isPinned Note` : `Note`}>
      <div className="d-flex justify-content-between">
        <h3>{title}</h3>
        <FontAwesomeIcon
          onClick={handleThumbtackClick}
          data-id={id}
          data-isPinned={isPinned}
          icon={faThumbtack}
          size="2x"
          color={isPinned ? `rgba(48,127,218,1)` : `rgb(180, 180, 180`}
        />
      </div>
      <hr/>
      <article>{description}</article>
      <small>{dateTime}</small>
    </div>
  );
};
