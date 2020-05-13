
import React, { useState, useEffect, useContext } from 'react';
import { FeedContext } from '../../context';

import { EntryContainer } from '../components/entryContainer';

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
      <EntryContainer entries={entries} />
    </>
  )
}