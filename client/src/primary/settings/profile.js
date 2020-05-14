import React, { useState, useEffect } from 'react';

export const Profile = props => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);

  const handleSubmit = e => {
    e.preventDefault();

    setIsUpdating(false);
  }

  return isUpdating ? (
    <form onSubmit={handleSubmit} className='settings__form'>
      <input
        type='text'
        className='form__input'
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder='First Name'
        required
      />
      <input
        type='text'
        className='form__input'
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder='Last Name'
        required
      />
      <input
        type='email'
        className='form__input'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Email Address'
        required
      />
      <span className='form__sprawl'>
        <input type='submit' value='Save' />
        <button
        type='button'
        onClick={() => setIsUpdating(false)}
        >Cancel Changes</button>
      </span>
    </form>
  ) : (
      <>
        <h1>{firstName} {lastName}</h1>
        <h2>{email}</h2>
        <button
          onClick={() => setIsUpdating(true)}
        >Update</button>
      </>
    )
}