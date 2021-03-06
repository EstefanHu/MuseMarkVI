import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';

import { Profile } from './profile';

import '../styles/settings.css';
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

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdatePassword = e => {
    e.preventDefault();

    if (newPassword.length < 8) return alert('Password must be at least 8 characters long');
    if (newPassword !== checkPassword)
      return alert('The new passwords do not match');

    fetch('http://localhost:4000/user/resecure', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          setIsUpdating(false);
          setNewPassword('');
          setCheckPassword('');
        }
        setCurrentPassword('');
      })
      .catch(console.error);
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
      {isUpdating ?
        <form onSubmit={handleUpdatePassword}>
          <input
            type='password'
            className='form__input'
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder='Current Password'
            required
          />
          <input
            type='password'
            className='form__input'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder='New Password'
            required
          />
          <input
            type='password'
            className='form__input'
            value={checkPassword}
            onChange={e => setCheckPassword(e.target.value)}
            placeholder='Check Password'
            required
          />
          <span className='form__sprawl'>
            <input type='submit' value='Update Password' />
            <button
              type='button'
              onClick={() => setIsUpdating(false)}
            >Cancel Changes</button>
          </span>
        </form>
        : <button
          className='settings__button'
          onClick={() => setIsUpdating(true)}
        >Change Password</button>}
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