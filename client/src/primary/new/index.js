import React, { useState, useContext } from 'react';
import { EntryContext, LocationContext } from '../../context';

import './new.css';

export const New = props => {
  const { community } = useContext(LocationContext);
  const { setEntry } = useContext(EntryContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Fiction');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [body, setBody] = useState('');
  const [hasPlotted, setHasPlotted] = useState(false);

  const toggleFeed = () => {
    document.getElementById('feed').classList.toggle('closedFeed');
  }

  const handleSubmit = e => {
    e.preventDefault();

    fetch('http://localhost:4000/entry/create', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        genre,
        longitude,
        latitude,
        community,
        body
      })
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);

    setEntry(null);
    props.history.push('/app/dashboard');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='entry__form'
    >
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

      {hasPlotted ? (
        <>
          <button
            className='entry__plotbutton'
            onClick={toggleFeed}
            type='button'
          >Re-Plot Entry</button>

          <label>Longitude:</label>
          <input
            className='entry__content'
            type='text'
            value={longitude || 0}
            onChange={e => setLongitude(e.target.value)}
            disabled
            required
          />

          <label>Latitude:</label>
          <input
            className='entry__content'
            type='text'
            value={latitude || 0}
            onChange={e => setLatitude(e.target.value)}
            disabled
            required
          />

          <label>Body:</label>
          <textarea
            className='entry__content'
            type='text'
            value={body || ''}
            onChange={e => setBody(e.target.value)}
            placeholder='Entries body'
            required
          />

          <input
            className='entry__submit'
            type='submit'
            value='Publish'
          />
        </>
      ) : (
          <button
            className='entry__plotbutton'
            onClick={() => {
              toggleFeed();
              setHasPlotted(hasPlotted => !hasPlotted);
            }}
          >Plot Entry</button>
        )}

    </form>
  )
}