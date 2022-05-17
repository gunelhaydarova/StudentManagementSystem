
import './App.css';
import Login from './components/Login/Login';
import Teacher from './pages/Teacher/Teacher';
import Student from './pages/Student/Student';
import Faculty from './pages/Faculty/Faculty';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/ADMIN" component={Teacher} />
          <Route path="/students" component={Student} />
          <Route path="/faculties" component={Faculty} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
