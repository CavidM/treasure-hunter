import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {useSelector} from 'react-redux';
import './App.css';
import GameContainer from './components/game/GameContainer';
import LoginContainer from './components/login/LoginContainer';

function App() {

  let auth = useSelector(((state:any) => state.Auth));

  console.log(auth);
  //@ts-ignore
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      Boolean(auth.user.access_token)
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
  
  return (
      <div className="App">
        <Router>
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/login">
            <LoginContainer />
          </Route>
          <PrivateRoute path="/game" component={GameContainer}/>
        </Switch>
        </Router>
     </div>
    ) 
}

export default App;
