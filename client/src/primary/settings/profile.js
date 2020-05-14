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

  useEffect(() => {
    console.log(props);
  }, [props]);

  return isUpdating ? (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder='First Name'
        required
      />
      <input
        type='text'
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder='Last Name'
        required
      />
      <input
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Email Address'
        required
      />
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