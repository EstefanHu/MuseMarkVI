import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Cookie from 'js-cookie';

import { Initial } from './initial';
import { Primary } from './primary';
import { FourOhFour } from './ERROR/FourOhFour';
import { LocationContext, UserContext } from './context';

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

const geoLocate = (setLng, setLat, count) => {
  navigator.geolocation.getCurrentPosition(position => {
    setLng(position.coords.longitude);
    setLat(position.coords.latitude);
    console.log('Geolocation Successful');
  }, error => {
    switch (error.code) {
      case 1:
        return alert('Looks Like we dont have permission to place your location. Please update our permissions so we can accuratly sign you in');
      case 2:
        return alert('Unable to connect to server');
      case 3:
        return geoLocate(setLng, setLat, count + 1);
      default:
        if (count > 10) return alert('Unable to locate User');
    }
  }, { timeout: 1000 });
}

export const App = () => {
  const [user, setUser] = useState(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    geoLocate(setLng, setLat, 0);

    fetch('http://ip-api.com/json')
      .then(res => res.json())
      .then(res => {
        setCommunity(res.city);
      })
      .catch(console.error);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LocationContext.Provider value={{ lng, setLng, lat, setLat, community, setCommunity }}>
        <Router>
          <Switch>
            <Route exact path='/(|register|login|privacy|terms|forgot)' component={Initial} />
            <AuthRoute exact path='/app/(dashboard|new|community|settings)' component={Primary} />
            <Route component={FourOhFour} />
          </Switch>
        </Router>
      </LocationContext.Provider>
    </UserContext.Provider>
  )
}