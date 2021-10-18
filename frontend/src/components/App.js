import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CreateNote from './CreateNote';
import Navbar from './Navbar';
import NoteList from './NoteList';

function App() {
  return (
    <Router>
      <main>
        <header>
          <Navbar />
        </header>
        <Switch>
          <Route path="/new">
            <CreateNote />
          </Route>
          <Route path="/">
            <NoteList />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
