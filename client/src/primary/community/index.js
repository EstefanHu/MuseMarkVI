import React, { useState, useEffect, useContext } from 'react';
import {
  LocationContext,
  FeedContext,
  SubFeedContext
} from '../../context';

import { GenreSetter } from './genresetter';

import { EntryContainer } from '../components/entryContainer';

import './community.css';

export const Community = () => {
  const { community } = useContext(LocationContext);
  const { feed } = useContext(FeedContext);
  const { subFeed, setSubFeed } = useContext(SubFeedContext);
  const [genre, setGenre] = useState('All');

  useEffect(() => {
    setSubFeed(null);
    if (genre === 'All') return setSubFeed(feed);

    const toFeed = []
    feed.forEach(item => {
      if (item.genre === genre) toFeed.push(item);
    });
    setSubFeed(toFeed);
  }, [feed, genre, setSubFeed]);

  return (
    <>
      <h1 className='header'>Entries in {community}</h1>
      <GenreSetter setGenre={newGenre => setGenre(newGenre)} />
      <EntryContainer entries={subFeed} />
    </>
  )
}