import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./components/Home";
import Signup from './components/Signup';
import Signin from "./components/Signin"; 
import PrivateRoute from './components/privateRoute';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <PrivateRoute path="/" exact component={Home}/>
          <Route path="/signin" exact component={Signin}/>
          <Route path="/signup" exact component={Signup}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
