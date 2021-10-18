import { Link } from 'react-router-dom';
import AddSign from './AddSign';

export default function Navbar() {
    return (
        <nav className="navbar navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <h1>Note taking app</h1>
                </Link>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/new">
                      <AddSign/>
                    </Link>
                  </li>
                </ul>
            </div>
        </nav>
    )
}