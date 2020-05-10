import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';

import { Toolbar } from './layout/toolbar.js';
import { Nav } from './layout/nav.js';
import { Loading } from './layout/loading';

import { StoryContext, LocationContext, NodeContext } from '../context';

import './primary.css';

import { Map } from './map';
import { Dashboard } from './dashboard/index';

export const Primary = () => {
  const { lng, lat } = useContext(LocationContext);
  const [api, setApi] = useState('');
  const [story, setStory] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api')
      .then(res => res.json())
      .then(res => setApi(res))
      .catch(console.error)
  }, []);

  return (
    <StoryContext.Provider value={{ story, setStory }}>
      <Toolbar />
      <Nav />
      {api && lng & lat ? (
        <Map
          lng={lng}
          lat={lat}
          apikey={api}
        />
      ) : (
          <Loading />
        )}
      <Route path='/app/dashboard' component={Dashboard} />

    </StoryContext.Provider>
  )
}