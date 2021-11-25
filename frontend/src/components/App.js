import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import CreateNote from './CreateNote';
import EditNote from './EditNote';
import NoteList from './NoteList';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Home from './Home';
import config from '../config';
import { useState } from 'react';
import Navbar from './Navbar';

function App() {
  const [user, setUser] = useState(getUser());

  function getUser() {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      return null;
    } else {
      return JSON.parse(storedUser);
    }
  }

  function handleSignOut() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      localStorage.removeItem('user');
      setUser(null);
    }
  }

  const backend = `${config.protocol}://${config.host}:${config.port}/${config.route}`;

  return (
    <Router>
      <main>
        {user ?
          <Navbar user={user} setUser={setUser} /> :
          ''
        }
        <Switch>
          <Route path="/register">
            <Register backend={backend} />
          </Route>
          <Route path="/login">
            <Login
              backend={backend}
              setUser={setUser}
            />
          </Route>
          <Route path="/note/:id">
            <EditNote
              backend={backend}
              user={user}
            />
          </Route>
          <Route path="/note">
            <CreateNote
              backend={backend}
              user={user}
            />
          </Route>
          <Route path="/dashboard">
            <NoteList backend={backend} />
          </Route>
          <Route path="/">
            {user ? 
              <NoteList backend={backend} user={user} /> :
              <Home user={user} handleSignOut={handleSignOut} />
            }
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
