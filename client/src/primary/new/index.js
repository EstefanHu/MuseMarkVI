import React, { useState, useEffect, useContext } from 'react';
import { EntryContext } from '../../context';

import './new.css';

export const New = () => {
  const { entry, setEntry } = useContext(EntryContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [body, setBody] = useState('');
  const [hasPlotted, setHasPlotted] = useState(false);

  useEffect(() => {
    if (entry === null) {
      setEntry({
        "title": "",
        "description": "",
      });
    } else {
      setTitle(entry.title);
      setDescription(entry.description);
      setGenre(entry.genre);
    }
  }, [entry, setEntry]);

  const startPlotting = () => {
    toggleFeed();
    setHasPlotted(hasPlotted => !hasPlotted);
  }

  const toggleFeed = () => {
    document.getElementById('feed').classList.toggle('closedFeed');
  }

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
        value={genre || ''}
        onChange={e => setGenre(e.target.value)}
        required
      >
        <option value='Fiction'>Fiction</option>
        <option value='Poem'>Poem</option>
        <option value='Non-Fiction'>Non-Fiction</option>
        <option value='Sci-Fi'>Sci-fi</option>
      </select>

      {hasPlotted ? (
        <>
          <label>Longitude:</label>
          <input
            className='entry__content'
            type='text'
            value={longitude || 0}
            onChange={e => setLongitude(e.target.value)}
            required
          />
          <label>Latitude:</label>
          <input
            className='entry__content'
            type='text'
            value={latitude || 0}
            onChange={e => setLatitude(e.target.value)}
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
          <button
            className='entry__plotbutton'
            onClick={toggleFeed}
          >Re-Plot Entry</button>
        </>
      ) : (
          <button
            className='entry__plotbutton'
            onClick={startPlotting}
          >Plot Entry</button>
        )}
    </>
  )
}