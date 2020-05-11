import React, { useState } from 'react';
import {
  BsChevronLeft,
  BsChevronRight
} from 'react-icons/bs';

const genres = [
  'Fiction',
  'Poem',
  'Non-Fiction',
  'Sci-Fi'
];

const genreSetter = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}

const genresContainer = {
  overflow: 'auto',
  whiteSpace: 'nowrap'
}

const genreButton = {
  display: 'inline-block',

  border: 'none',
  color: 'var(--accent-color-dark)',
  background: 'white',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  padding: '4px 10px',
}

export const GenreSetter = ({ setGenre }) => {
  return (
    <div style={genreSetter}>
      <BsChevronLeft />

      <span
        style={genresContainer}
        className='noBar'
      >
        {genres.map(item => (
          <button
            style={genreButton}
            onClick={setGenre(item)}
          >{item}</button>
        ))}
      </span>

      <BsChevronRight />
    </div>
  )
}