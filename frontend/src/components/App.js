import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import CreateNote from './CreateNote';
import EditNote from './EditNote';
import NoteList from './NoteList';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Home from './Home';
import Navbar from './Navbar';

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <main>
        {user && <Navbar />}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/note/:id">
            <EditNote />
          </Route>
          <Route path="/note">
            <CreateNote />
          </Route>
          <Route path="/dashboard">
            <NoteList />
          </Route>
          <Route path="/">
            {user ? 
              <NoteList /> :
              <Home />
            }
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
