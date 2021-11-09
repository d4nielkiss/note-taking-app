import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({ user, setUser }) {
    return (
        <nav className="navbar navbar-dark">
            <div className="container-fluid Navbar-row">
                <Link className="navbar-brand" to="/">
                    <h1>Note taking app</h1>
                </Link>
                <ul className="navbar-nav flex-row">
                  <li className="nav-item me-5">
                    <Link to="/note">
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        size="3x"
                        color="white"
                        title="Add"
                      />
                    </Link>
                  </li>
                  {user && (
                    <li className="nav-item">
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        size="3x"
                        color="white"
                        title="Exit"
                        cursor="pointer"
                        onClick={() => {
                          localStorage.removeItem('user');
                          setUser(null);
                        }}
                      />
                    </li>
                  )}
                </ul>
            </div>
        </nav>
    )
}