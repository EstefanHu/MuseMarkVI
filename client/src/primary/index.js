import React, { useState, useEffect, useContext } from 'react';

import { Toolbar } from './layout/toolbar.js';
import { Nav } from './layout/nav.js';

import {
  EntryContext,
  LocationContext,
  LibraryContext,
  FeedContext,
  SubFeedContext  
} from '../context';

import './primary.css';

import { Map } from './layout/map';
import { Feed } from './layout/feed';

export const Primary = () => {
  const { lng, lat, community } = useContext(LocationContext);
  const [entry, setEntry] = useState(null);
  const [library, setLibrary] = useState([]);
  const [feed, setFeed] = useState([]);
  const [subFeed, setSubFeed] = useState('All');

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

      <LibraryContext.Provider value={{ library, setLibrary }}>
        <FeedContext.Provider value={{ feed, setFeed }} >
          <SubFeedContext.Provider value={{ subFeed, setSubFeed }}>
            {lng && lat && <Map lng={lng} lat={lat} />}
            <Feed />
          </SubFeedContext.Provider>
        </FeedContext.Provider>
      </LibraryContext.Provider>

    </EntryContext.Provider>
  )
}