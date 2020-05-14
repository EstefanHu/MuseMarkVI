import React, { useState, useEffect } from 'react';

import { Logout } from './logout';
import { Profile } from './profile';

import './settings.css';

export const Settings = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch('http://localhost:4000/user/profile', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => { setUser(res); console.log(res.firstName) })
      .catch(console.error);
  }, []);

  return (
    <>
      {user &&
        <Profile
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
        />
      }
      <Logout />
    </>
  )
}