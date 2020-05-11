import React, { useState, useEffect, useContext } from 'react';

import { Toolbar } from './layout/toolbar.js';
import { Nav } from './layout/nav.js';

import {
  StoryContext,
  LocationContext,
  FeedContext
} from '../context';

import './primary.css';

import { Map } from './layout/map';
import { Feed } from './layout/feed';

export const Primary = () => {
  const { lng, lat, community } = useContext(LocationContext);
  const [story, setStory] = useState(null);
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/story/community/'
      + community, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => setFeed(res.stories))
      .catch(console.error);
  }, [community]);

  return (
    <StoryContext.Provider value={{ story, setStory }}>

      <Toolbar />
      <Nav />

      <FeedContext.Provider value={{ feed, setFeed }} >
        {lng && lat && <Map lng={lng} lat={lat} />}
        <Feed />
      </FeedContext.Provider>

    </StoryContext.Provider>
  )
}