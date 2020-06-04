import React from 'react';

const landingcontent = {
  // transform: 'translateZ(0)',
  paddingLeft: '10px'
}

const content = {
  position: 'relative',
  fontFamily: '"Roboto", sans-serif',
  borderRadius: '20px',
  boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
  background: 'white',
  width: 'fit-content',
  padding: '30px 50px',
  marginTop: '500px'
}

const header = {
  fontSize: '2.3rem',
  fontWeight: '700'
}

const p = {
  fontSize: '1.4rem',
  fontWeight: '500'
}

export const LandingContent = () => (
  <div
    style={landingcontent}
    className='parallax__layer'
  >

    <section style={content}>
      <h2 style={header}>Welcome to the Muse Project</h2>
      <p style={p}>Project:Muse is an experimental story telling platform <br />
          that accentuates the world around us.</p>
    </section>

    <section style={content}>
      <h2 style={header}>Welcome to the Muse Project</h2>
      <p style={p}>Project:Muse is an experimental story telling platform <br />
          that accentuates the world around us.</p>
    </section>

    <section style={content}>
      <h2 style={header}>Welcome to the Muse Project</h2>
      <p style={p}>Project:Muse is an experimental story telling platform <br />
          that accentuates the world around us.</p>
    </section>

    <section style={content}>
      <h2 style={header}>Welcome to the Muse Project</h2>
      <p style={p}>Project:Muse is an experimental story telling platform <br />
          that accentuates the world around us.</p>
    </section>

  </div>
);