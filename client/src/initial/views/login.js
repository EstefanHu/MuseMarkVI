import React, { useState, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { LocationContext } from '../../context';

export const Login = withRouter(props => {
  const { lng, lat } = useContext(LocationContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    fetch('http://localhost:4000/user/login', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        longitude: lng,
        latitude: lat
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) return alert(res.error);
        props.history.push('/app/dashboard');
      })
      .catch(console.error);
  }

  return (
    <section className='landingForm'>
      <div id='signinSplash'>
        <h1>:Muse</h1>
      </div>
      <div className='form__holder'>
        <h2>Log in to :Muse.</h2>
        <h3>See your communities stories</h3>
        <form onSubmit={handleSubmit}>
          <input
            className='landing__form--input'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email Address'
            required
          />
          <input
            className='landing__form--input'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
          <input type='submit' value='Log in' />
        </form>
        <p><Link to='/forgot'>Forgot Password?</Link> - <Link to='/register'>Sign up for :Muse</Link></p>
      </div>
    </section>
  )
});