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
  const [entries, setEntries] = useState(null);
  const [genre, setGenre] = useState('All');

  useEffect(() => {
    setEntries(null);
    if (genre === 'All') return setEntries(feed);

    const toFeed = []
    feed.forEach(item => {
      if (item.genre === genre) toFeed.push(item);
    });
    setEntries(toFeed);
  }, [feed, genre]);

  return (
    <>
      <h1
        className='header'
      >Entries in {community}</h1>

      <GenreSetter setGenre={newGenre => setGenre(newGenre)} />

      {entries ? entries.map(item => (
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