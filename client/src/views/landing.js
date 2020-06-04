import React from 'react';
// const asset_1 = require('../img/asset_1.png');

export const Landing = () => (
  <>
    <section className='parallax__layer parallax__back'>
      <h1 id='hero__text'>
        Project<br />:Muse
    </h1>
    </section>

    <div className='parallax__layer parallax__content'>
      <h1 className='fancy__title'>Project:Muse</h1>
      <section className='landingContent'>
        <article>
          <h1>Welcome to Project:Muse</h1>
          <p>
            Project:Muse is an experimental story telling platform
            that prioritizes the context of the story over its popularity.

          </p>
          <p></p>
        </article>
        <article>
          <h2>:Muse is still under development.</h2>
          <p>
            Most projects are constantly undergoing constant change ,
            :Muse is no exception
          </p>
        </article>
        <article>
          <h2>Why localization is important</h2>
          <p>Now, more than ever, we need a sence of community.</p>
        </article>
        {/* <article>
          <h2>A final note...</h2>
          <p>
            I want to thank my parents for believing in me.
          </p>
        </article> */}
        <footer />
        <div>

        </div>
      </section>
    </div>

    <section className='parallax__layer parallax__frame'>
    </section>
  </>
);