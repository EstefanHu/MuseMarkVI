import React, { useState } from 'react';

export const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = e => {
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

  return isUpdating ?
    <form onSubmit={handleSubmit}>
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
      onClick={() => setIsUpdating(true)}
    >Change Password</button>
}