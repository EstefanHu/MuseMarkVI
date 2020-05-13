import React from 'react';

import { Entry } from './entry';
import { LoadFeed } from '../layout/loadFeed';

const entryContainer = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflowY: 'scroll',
}

export const EntryContainer = ({ entries }) => {
  return (
    <section
      style={entryContainer}
      className='noBar'
    >
      {entries ? entries.map(item => (
        <Entry
          key={item._id}
          id={item._id}
          genre={item.genre}
          author={item.author}
          credibility={item.credibility}
          title={item.title}
          description={item.description}
        />
      )) : (
          <LoadFeed />
        )}
    </section>
  )
}