import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Cookie from 'js-cookie';

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

const checkAuth = () => {
  const cookie = Cookie.get('museCookie');
  if (!cookie) return false;
  return true;
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
  )} />
)

export const App = () => {
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);

  useEffect(() => {
    fetch('http://ip-api.com/json')
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  })

  return (
    <Router>
      <Switch>
        <Route exact path='/(|register|login|privacy|terms|forgot)' component={Landing} />
        <AuthRoute exact path='/app/(|dashboard|create|community|settings)' component={Primary} />
        <Route component={FourOhFour} />
      </Switch>
    </Router>
  )
}