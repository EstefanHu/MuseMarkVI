import React, { useState, useEffect, useContext } from 'react';

import { Toolbar } from './layout/toolbar.js';
import { Nav } from './layout/nav.js';

import { StoryContext, LocationContext } from '../context';

import './primary.css';

import { Map } from './layout/map';
import { Dashboard } from './dashboard';

export const Primary = () => {
  const { lng, lat } = useContext(LocationContext);
  const [story, setStory] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/story/community', {
      credentials: 'include'
    })
      .then(res => res.json())
      // .then(res => setCommunityStories(res.stories))
      .then(console.log)
      .then(console.error);
  }, []);

  return (
    <StoryContext.Provider value={{ story, setStory }}>

      <Toolbar />
      <Nav />
      {lng && lat && <Map lng={lng} lat={lat} />}
      <Dashboard />

    </StoryContext.Provider>
  )
}