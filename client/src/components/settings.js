import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';

import { Profile } from './profile';

import '../styles/settings.css';
import { Password } from './password';
import { withRouter } from 'react-router';

export const Settings = withRouter(props => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch('http://localhost:4000/user/profile', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => setUser(res))
      .catch(console.error);
  }, []);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    fetch('http://localhost:4000/user/logout', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        if (res.msg === 'User logged out.') {
          Cookie.remove('museCookie');
          props.history.push('/login');
        }
      })
  }


  return (
    <div className='settings'>
      {user &&
        <Profile
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
        />
      }
      <Password />
      {isLoggingOut ?
        <span className='form__sprawl'>
          <button
            onClick={handleLogout}
          >Yes, Log me out</button>
          <button
            onClick={() => setIsLoggingOut(false)}
          >No, keep writing</button>
        </span>
        : <button
          className='settings__button'
          onClick={() => setIsLoggingOut(true)}
        >Logout</button>}
    </div>
  )
})