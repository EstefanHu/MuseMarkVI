import React, { useState, useEffect, useContext } from 'react';

import { Toolbar } from './layout/toolbar.js';
import { Nav } from './layout/nav.js';

import {
  EntryContext,
  LocationContext,
  FeedContext,
  LibraryContext,
  GenreContext
} from '../context';

import './primary.css';

import { Map } from './layout/map';
import { Feed } from './layout/feed';

export const Primary = () => {
  const { lng, lat, community } = useContext(LocationContext);
  const [entry, setEntry] = useState(null);
  const [library, setLibrary] = useState([]);
  const [feed, setFeed] = useState([]);
  const [genre, setGenre] = useState('All');

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
          <GenreContext.Provider value={{ genre, setGenre }}>
            {lng && lat && <Map lng={lng} lat={lat} />}
            <Feed />
          </GenreContext.Provider>
        </FeedContext.Provider>
      </LibraryContext.Provider>

    </EntryContext.Provider>
  )
}