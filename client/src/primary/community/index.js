import React, { useState, useEffect, useContext } from 'react';
import {
  LocationContext,
  FeedContext
} from '../../context';

import { GenreSetter } from './genresetter';
import { Entry } from '../components/entry';
import { LoadFeed } from '../layout/loadFeed';

import './community.css';

export const Community = () => {
  const { community } = useContext(LocationContext);
  const { feed } = useContext(FeedContext);
  const [stories, setStories] = useState(null);
  const [genre, setGenre] = useState('All');

  useEffect(() => {
    setStories(null);
    if (genre === 'All') return setStories(feed);

    const toFeed = []
    feed.forEach(item => {
      if (item.genre === genre) toFeed.push(item);
    });
    setStories(toFeed);
  }, [feed, genre]);

  return (
    <>
      <h1
        className='header'
      >Entries in {community}</h1>

      <GenreSetter setGenre={newGenre => setGenre(newGenre)} />

      {stories ? stories.map(item => (
        <Entry
          key={item._id}
          genre={item.genre}
          author={item.author}
          credibility={item.credibility}
          title={item.title}
          description={item.description}
        />
      )) : (
          <LoadFeed />
        )}
    </>
  )
}