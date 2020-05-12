import React, { useState, useEffect, useContext } from 'react';

import { Toolbar } from './layout/toolbar.js';
import { Nav } from './layout/nav.js';

import {
  EntryContext,
  LocationContext,
  FeedContext
} from '../context';

import './primary.css';

import { Map } from './layout/map';
import { Feed } from './layout/feed';
import { ToggleFeed } from './layout/toggleFeed.js';

export const Primary = () => {
  const { lng, lat, community } = useContext(LocationContext);
  const [entry, setEntry] = useState(null);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/entry/community/'
      + community, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => setFeed(res.entries))
      .catch(console.error);
  }, [community]);

  return (
    <EntryContext.Provider value={{ entry, setEntry }}>

      <Toolbar />
      <Nav />

      <FeedContext.Provider value={{ feed, setFeed }} >
        {lng && lat && <Map lng={lng} lat={lat} />}
        <Feed />
        <ToggleFeed />
      </FeedContext.Provider>

    </EntryContext.Provider>
  )
}