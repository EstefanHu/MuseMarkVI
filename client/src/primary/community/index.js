import React, { useState, useEffect, useContext } from 'react';
import {
  LocationContext,
  FeedContext
} from '../../context';

import { Entry } from '../components/entry';
import { LoadFeed } from '../layout/loadFeed';

import './community.css';

export const Community = () => {
  const { community } = useContext(LocationContext);
  const { feed } = useContext(FeedContext);
  const [stories, setStories] = useState(null);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    setStories(null);

    const toFeed = []

    feed.forEach(item => {
      if (item.genre === genre) toFeed.push(item);
    });

    setStories(feed);
  }, [feed, genre]);

  return (
    <>
      <h1 style={header}>Entries in {community}</h1>
      <div className='genreSetter'>
        <button
          onClick={() => setGenre('Fiction')}
        >Fiction</button>
      </div>
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

const header = {
  textAlign: 'center',
}