import React from 'react';

export const PrePlotForm = ({title, setTitle, description, setDescription, setGenre}) => (
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
      <option value='Fiction'>Fiction</option>
      <option value='Poem'>Poem</option>
      <option value='Non-Fiction'>Non-Fiction</option>
      <option value='Sci-Fi'>Sci-fi</option>
    </select>
  </>
)
