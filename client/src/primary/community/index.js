import React, { useState, useEffect, useContext } from 'react';
import {
  LocationContext,
  FeedContext,
  GenreContext
} from '../../context';

import { GenreSetter } from './genresetter';

import { EntryContainer } from '../components/entryContainer';

import './community.css';

export const Community = () => {
  const { community } = useContext(LocationContext);
  const { genre } = useContext(GenreContext);
  const { feed } = useContext(FeedContext);
  const [entries, setEntries] = useState(null);

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
      <h1 className='header'>Entries in {community}</h1>
      <GenreSetter />
      <EntryContainer entries={entries} />
    </>
  )
}