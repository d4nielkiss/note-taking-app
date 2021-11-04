import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Redirect } from 'react-router';
import CreateNote from './CreateNote';
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

  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const backend = `${config.protocol}://${config.host}:${config.port}/${config.route}`;


  return (
    <Router>
      <main>
        {user ?
          <Navbar user={user} /> :
          ''
        }
        <Switch>
          <Route path="/register">
            {isRegisterSuccess ?
              <Redirect to="/login" /> :
              <Register
                backend={backend}
                setIsRegisterSuccess={setIsRegisterSuccess}  
              />
            }
          </Route>
          <Route path="/login">
            {user ?
              <Redirect to="/" /> :
              <Login
                backend={backend}
                setUser={setUser}
              />
            }
          </Route>
          <Route path="/new">
            <CreateNote backend={backend} />
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
