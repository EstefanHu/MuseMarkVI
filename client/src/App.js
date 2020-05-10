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
    <div>

    </div>
  )
}