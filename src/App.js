
import './App.css';
import Login from './components/Login/Login';
import Teacher from './pages/Teacher/Teacher';
import Student from './pages/Student/Student';
import Faculty from './pages/Faculty/Faculty';
import Team from './pages/Team/Team';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
function App() {
  return (
    <div className="App">
      {/* <Sidebar></Sidebar> */}
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/ADMIN" component={Teacher} />
          <Route path="/students" component={Student} />
          <Route path="/faculties" component={Faculty} />
          <Route path="/TEACHER" component={Team} />
          <Route path="/group/:id" component={Team} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
