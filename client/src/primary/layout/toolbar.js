import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';

export const Toolbar = () => (
  <nav id='toolbar' className='topNav'>
    <h1 className='logo'>:M</h1>
    <span>
      <Route exact path='/app/(dashboard|community|settings)'>
        <Link to='/app/new'>
          <FiPlusSquare className='toolbar__icons' />
        </Link>
      </Route>
      <Route exact path='/app/new'>
        <Link to='/app/dashboard'>
          <button
            className='toolbar__button'
          >Cancel</button>
        </Link>
      </Route>
    </span>
  </nav >
);