import React, { useContext } from 'react';
import { UserContext } from '../../context';

import { Entry } from './entry';
import { LoadFeed } from '../layout/loadFeed';

const entryContainer = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflowY: 'scroll',
  borderBottom: '10px solid lightgrey',
}

export const EntryContainer = ({ entries }) => {
  const { user } = useContext(UserContext);

  return (
    <section
      style={entryContainer}
    >
      {entries ? entries.map(item => (
        <Entry
          key={item._id}
          genre={item.genre}
          author={item.author}
          credibility={item.credibility}
          title={item.title}
          description={item.description}
          isOwned={item.authorId === user.userId}
        />
      )) : (
          <LoadFeed />
        )}
    </section>
  )
}