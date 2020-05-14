import React, { useContext } from 'react';
import { GenreContext } from '../../context';

export const PrePlotForm = ({ title, setTitle, description, setDescription, setGenre }) => {
  const { genre } = useContext(GenreContext);

  return (
    <>
      <h1 className='header'>New Entry</h1>

      <label>Title:</label>
      <input
        className='entry__content'
        type='text'
        value={title || ''}
        onChange={e => setTitle(e.target.value)}
        placeholder='Title the Entry'
        required
      />

      <label>Description:</label>
      <textarea
        className='entry__content'
        type='text'
        value={description || ''}
        onChange={e => setDescription(e.target.value)}
        placeholder='Describe the Entry'
        required
      />

      <label>Genre:</label>
      <select
        className='entry__content'
        type='text'
        onChange={e => setGenre(e.currentTarget.value)}
        required
      >
        {genre.map(item => (
          <option
            key={item}
            value={item}
          >{item}</option>
        ))}
      </select>
    </>
  )
}