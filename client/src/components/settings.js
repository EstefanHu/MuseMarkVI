import React, { useState, useEffect } from 'react';

import { Logout } from './logout';
import { Profile } from './profile';

import '../styles/settings.css';
import { Password } from './password';

export const Settings = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch('http://localhost:4000/user/profile', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => setUser(res))
      .catch(console.error);
  }, []);

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
      <Logout />
    </div>
  )
}