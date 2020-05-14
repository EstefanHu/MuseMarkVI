import React, { useState } from 'react';
import Cookie from 'js-cookie';
import { withRouter } from 'react-router-dom';

const button = {
  background: 'white',
  width: '48%',
  padding: '6px 8px',
  border: '1px solid lightgrey',
  borderRadius: '5px'
}

export const Logout = withRouter(props => {
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
      .catch(console.error);
  }

  return isLoggingOut ?
    <span className='form__sprawl'>
      <button
        style={button}
        onClick={handleLogout}
      >Yes, Log me out</button>
      <button
        style={button}
        onClick={() => setIsLoggingOut(false)}
      >No, keep writing</button>
    </span>
    : <button
      style={button}
      onClick={() => setIsLoggingOut(true)}
    >Logout</button>
});