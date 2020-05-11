import React, { useState, useEffect, useContext } from 'react';

import { Toolbar } from './layout/toolbar.js';
import { Nav } from './layout/nav.js';
import { Loading } from './layout/loading';

import { StoryContext, LocationContext } from '../context';

import './primary.css';

import { Map } from './layout/map';
import { Dashboard } from './dashboard';

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

  // useEffect(() => {
  //   fetch('http://localhost:4000/story/community')
  //     .then(res => res.json())
  //     .then(res => setCommunity(res.stories))
  //     .then(console.error);
  // });

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

      <Dashboard />

    </StoryContext.Provider>
  )
}