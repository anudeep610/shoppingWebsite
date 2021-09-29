import './App.css';
import NavBar from './components/NavBar';
// import Sidebar from './components/Sidebar';
import {Route, Switch } from 'react-router-dom'
import Main from "./components/home";
import Signup from './components/Signup';
import Signin from "./components/Signin"; 
import PrivateRoute from './components/privateRoute';
import {useDispatch, useSelector} from "react-redux";
import { isUserLogedIn } from './actions';
import { useEffect } from 'react';
import products from './components/products';
import orders from './components/orders';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate)
        dispatch(isUserLogedIn());
  }, []);

  return (
    <>
        <NavBar />
        <Switch>
          <PrivateRoute path="/" exact component={Main}/>
          <PrivateRoute path="/products" component={products}/>
          <PrivateRoute path="/orders" component={orders}/>
          <Route path="/signin" exact component={Signin}/>
          <Route path="/signup" exact component={Signup}/>
        </Switch>
    </>
  );
}

export default App;
