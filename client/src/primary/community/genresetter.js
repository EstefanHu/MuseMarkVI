import React from 'react';
import {
  BsChevronLeft,
  BsChevronRight
} from 'react-icons/bs';

const genres = [
  'All',
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
  margin: '5px 0',
  padding: '2px 5px',
}

const genresContainer = {
  overflow: 'auto',
  whiteSpace: 'nowrap',
  margin: '0 10px',
}

const genreButton = {
  display: 'inline-block',
  border: 'none',
  color: 'var(--accent-color-dark)',
  background: 'white',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  padding: '4px 10px',
  cursor: 'pointer',
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
            key={item}
            style={genreButton}
            onClick={() => setGenre(item)}
          >{item}</button>
        ))}
      </span>

      <BsChevronRight />
    </div>
  )
}