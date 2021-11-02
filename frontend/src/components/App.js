import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CreateNote from './CreateNote';
import NoteList from './NoteList';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Home from './Home';
import config from '../config';

function App() {
  const backend = `${config.protocol}://${config.host}:${config.port}/${config.route}`;

  return (
    <Router>
      <main>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/new">
            <CreateNote backend={backend} />
          </Route>
          <Route path="/dashboard">
            <NoteList backend={backend} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
