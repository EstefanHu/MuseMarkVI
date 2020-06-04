
import React, { useContext } from 'react';
import { LibraryContext } from '../context';

import { EntryContainer } from './entryContainer';

import '../styles/dashboard.css';

export const Dashboard = () => {
  const { library } = useContext(LibraryContext);

  return (
    <>
      <h1 className='header'>Your Entries</h1>
      <EntryContainer entries={library} />
    </>
  )
}