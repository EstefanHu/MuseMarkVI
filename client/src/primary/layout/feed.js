import React from 'react';

const feed = {
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  height: 'calc(100vh - 60px)',
  background: 'white',
  position: 'fixed',
  top: '60px',
  left: '80px',
  borderRight: '1px solid lightgrey',
}

const closed = {
  left: '-320px'
}

export const Feed = () => {
  return (
    <section style={feed}>

    </section>
  )
}