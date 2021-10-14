import './App.css';
import NavBar from './components/NavBar';
import {Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from "./components/Signin"; 
import PrivateRoute from './components/privateRoute';
import {useDispatch, useSelector} from "react-redux";
import { isUserLogedIn } from './actions';
import { useEffect } from 'react';
import products from './components/products';
import orders from './components/orders';
import Home from "./components/Home";
import category from './components/category';

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
          <PrivateRoute path="/" exact component={Home}/>
          <PrivateRoute path="/home" exact component={Home}/>
          <PrivateRoute path="/products" component={products}/>
          <PrivateRoute path="/orders" component={orders}/>
          <PrivateRoute path="/category" component={category}/>
          <Route path="/signin" exact component={Signin}/>
          <Route path="/signup" exact component={Signup}/>
        </Switch>
    </>
  );
}

export default App;
