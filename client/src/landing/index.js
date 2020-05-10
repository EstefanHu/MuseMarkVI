import React from 'react';
import { Route, Link } from 'react-router-dom';
import Cookie from 'js-cookie';

import './landing.css';

import { Index } from './views/landing';
import { Register } from './views/register';
import { Login } from './views/login';
import { Privacy } from './views/privacy';
import { Terms } from './views/terms';
import { Forgot } from './views/forgot';


export const Landing = () => (
  <>
    <nav className='topNav'>
      <span id='landing__nav'>
        <Link to='/' className='logo'>:Muse</Link>
        <span>
          {Cookie.get('museCookie') ? (
            <Link to='/app/dashboard'>
              <button id='login'>Log in</button>
            </Link>
          ) : (
              <>
                <Link to='/login'>
                  <button id='login'>Log in</button>
                </Link>
                <Link to='/register'>
                  <button id='register'>Sign up</button>
                </Link>
              </>
            )}
        </span>
      </span>
    </nav>
    <Route exact path='/' component={Index} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/privacy' component={Privacy} />
    <Route path='/terms' component={Terms} />
    <Route path='/forgot' component={Forgot} />
  </>
);