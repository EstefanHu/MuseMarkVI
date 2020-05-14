import React, { useState } from 'react';

const button = {
  background: 'white',
  width: '48%',
  padding: '6px 8px',
  border: '1px solid lightgrey',
  borderRadius: '5px'
}

export const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return isLoggingOut ?
    <span>
      <button
        style={button}
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
}