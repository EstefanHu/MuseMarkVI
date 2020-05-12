
import React, { useState, useEffect, useContext } from 'react';
import { FeedContext } from '../../context';

import { Entry } from '../components/entry';
import { LoadFeed } from '../layout/loadFeed';

import './dashboard.css';

export const Dashboard = () => {
  const { feed } = useContext(FeedContext);
  const [entries, setEntries] = useState([])

  useEffect(() => {
    setEntries(feed);
  }, [feed]);

  return (
    <>
      <h1 className='header'>Your Entries</h1>
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