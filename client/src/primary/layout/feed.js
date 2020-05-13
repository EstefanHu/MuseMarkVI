import React from 'react';
import { Route } from 'react-router-dom';

import { Dashboard } from '../dashboard';
import { Community } from '../community';
import { New } from '../new';

export const Feed = () => {
  return (
    <section
      className='feed noBar'
      id='feed'
    >
      <Route exact path='/app/dashboard' component={Dashboard} />
      <Route exact path='/app/new' component={New} />
      <Route exact path='/app/community' component={Community} />
    </section>
  )
}