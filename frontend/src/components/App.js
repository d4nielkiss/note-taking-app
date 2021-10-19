import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CreateNote from './CreateNote';
import Navbar from './Navbar';
import NoteList from './NoteList';
import config from '../config';

function App() {
  const backend = `${config.protocol}://${config.host}:${config.port}/${config.route}`;

  return (
    <Router>
      <main>
        <header>
          <Navbar />
        </header>
        <Switch>
          <Route path="/new">
            <CreateNote backend={backend} />
          </Route>
          <Route path="/">
            <NoteList backend={backend} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
