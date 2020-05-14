import React, { useState, useEffect } from 'react';

import { Logout } from './logout';
import { Profile } from './profile';

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
    <>
      <Profile user={user} />
      <Logout />
    </>
  )
}