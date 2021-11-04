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

  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const backend = `${config.protocol}://${config.host}:${config.port}/${config.route}`;


  return (
    <Router>
      <main>
        <Switch>
          <Route path="/register">
            { isRegisterSuccess ?
              <Redirect to="/login" /> :
              <Register
                backend={backend}
                setIsRegisterSuccess={setIsRegisterSuccess}  
              />
            }
          </Route>
          <Route path="/login">
            { user ?
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
            <Home user={user} /> 
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
