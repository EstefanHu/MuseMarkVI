import React from 'react';
import { Route } from 'react-router-dom';

import { Dashboard } from '../dashboard';
import { Community } from '../community';
import { New } from '../new';

const feed = {
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  height: 'calc(100vh - 60px)',
  background: 'white',
  position: 'fixed',
  top: '60px',
  left: '80px',
  borderRight: '1px solid lightgrey',
}

const closed = {
  left: '-320px'
}

export const Feed = () => {
  return (
    <section style={feed}>
      <Route exact path='/app/dashboard' component={Dashboard} />
      <Route exact path='/app/new' component={New} />
      <Route exact path='/app/community' component={Community} />
    </section>
  )
}