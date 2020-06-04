import React, { useState, useEffect, useContext } from 'react';

import { Toolbar } from '../components/toolbar.js';
import { Nav } from '../components/nav.js';

import {
  StoryContext,
  LocationContext,
  LibraryContext,
  FeedContext,
  SubFeedContext,
  GenreContext
} from '../context';

import '../styles/primary.css';

import { Map } from '../components/map';
import { Feed } from '../components/feed';

export const Primary = () => {
  const { lng, lat, community } = useContext(LocationContext);
  const [story, setStory] = useState(null);
  const [library, setLibrary] = useState([]);
  const [feed, setFeed] = useState([]);
  const [subFeed, setSubFeed] = useState([]);
  const [genre, setGenre] = useState([
    'Fiction',
    'Poetry',
    'Non-Fiction',
    'Speculative',
    'YA',
    'Religion',
    'Sci-Fi',
    'Fantasy',
    'Essay',
  ]);


  //TODO: Converge into one API call
  useEffect(() => {
    fetch('http://localhost:4000/story/community/'
      + community, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => setFeed(res.stories))
      .catch(console.error);
  }, [community]);

  useEffect(() => {
    fetch('http://localhost:4000/story/library', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => setLibrary(res.stories))
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:4000/story/populate/' + community, {
  //     credentials: 'include'
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       setLibrary(res.library);
  //       setFeed(res.feed);
  //     })
  //     .catch(console.error);
  // }, [community]);

  return (
    <StoryContext.Provider value={{ story, setStory }}>
      <GenreContext.Provider value={{ genre, setGenre }}>

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

      </GenreContext.Provider>
    </StoryContext.Provider>
  )
}