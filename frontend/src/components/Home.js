import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faListUl, faStickyNote, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../scss/home.scss';

export default function Home({ user, handleSignOut }) {
  return (
    <div className="Home">
      
      <header className="box">
      {user && (
        <div className="action-line-auth">
          <Link to="/dashboard">My notes</Link>
          <button
            onClick={handleSignOut}
            className="sign-out"
          >
            Sign out
          </button>
        </div>
      )}
      {!user && (
        <div className="action-line">
          Want to take notes? <Link to="/register">Sign up here.</Link> Already have an account? <Link to="/login">Click here to log in</Link>
        </div>
      )}
        <div className="d-flex justify-content-between">
          <h1>Note taking app</h1>
          <FontAwesomeIcon icon={faStickyNote} size="4x" />
        </div>
        <hr />
        <p>
          Why use our app to take your notes with...? 
        </p>
      </header>
      <section className="box d-flex justify-content-between">
        <FontAwesomeIcon icon={faListUl} size="2x" />
        <h2>Fun and easy-to-read layout</h2>
      </section>
      <section className="box d-flex justify-content-between">
        <FontAwesomeIcon icon={faCheck} size="2x" />
        <h2>No restriction: you can write anything</h2>
      </section>
      <section className="box d-flex justify-content-between">
        <FontAwesomeIcon icon={faThumbtack} size="2x" />
        <h2>Pin your important notes to the top!</h2>
      </section>
    </div>
  );
};
