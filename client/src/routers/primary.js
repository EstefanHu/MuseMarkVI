import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';

import { Dashboard } from '../components/dashboard';
import { Community } from '../components/community';
import { New } from '../components/new';
import { Settings } from '../components/settings';

import { Toolbar } from '../layout/toolbar.js';
import { PrimaryNav } from '../layout/primarynav.js';
import { Map } from './map';
import { Loading } from '../layout/loading.js';

import {
  StoryContext,
  LocationContext,
  LibraryContext,
  FeedContext,
  SubFeedContext,
  GenreContext
} from '../context';

import '../styles/primary.css';

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
        <PrimaryNav />

        <LibraryContext.Provider value={{ library, setLibrary }}>
          <FeedContext.Provider value={{ feed, setFeed }} >
            <SubFeedContext.Provider value={{ subFeed, setSubFeed }}>
              {lng && lat ? <Map lng={lng} lat={lat} /> : <Loading />}
              <section
                className='feed noBar'
                id='feed'
              >
                <Route exact path='/app/dashboard' component={Dashboard} />
                <Route exact path='/app/new' component={New} />
                <Route exact path='/app/community' component={Community} />
                <Route exact path='/app/settings' component={Settings} />
              </section>
            </SubFeedContext.Provider>
          </FeedContext.Provider>
        </LibraryContext.Provider>

      </GenreContext.Provider>
    </StoryContext.Provider>
  )
}