// eslint-disable-next-line no-unused-vars
import { Modal } from 'bootstrap';

export default function DeleteModal({ id, deleteOnClick, title }) {
  return (
    <div className="py-2">
      <div className="modal fade" tabIndex="-1" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Are you sure you want to delete this note?</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p>
                {title}
              </p>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button className="btn btn-secondary" type="button" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                data-id={id}
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={deleteOnClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
