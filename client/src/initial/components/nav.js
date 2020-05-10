import React from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';

export const Nav = () => (
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
                <button
                  id='login'
                  className='landing__nav--button'
                >Log in</button>
              </Link>
              <Link to='/register'>
                <button
                  id='register'
                  className='landing__nav--button'
                >Sign up</button>
              </Link>
            </>
          )}
      </span>
    </span>
  </nav>
)