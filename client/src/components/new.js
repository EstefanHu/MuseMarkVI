import React, { useState, useEffect, useContext } from 'react';
import { StoryContext, LocationContext, GenreContext, LibraryContext } from '../context';

import '../styles/new.css';
import { LoadFeed } from '../layout/loadFeed';

export const New = props => {
  const { community } = useContext(LocationContext);
  const { genre } = useContext(GenreContext);
  const { story, setStory } = useContext(StoryContext);
  const { library, setLibrary } = useContext(LibraryContext);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [toBeGenre, setToBeGenre] = useState('Fiction');
  const [body, setBody] = useState('');
  const [isPlotting, setIsPlotting] = useState(false);

  useEffect(() => {
    return () => {
      setStory(null);
      sessionStorage.removeItem('action');
    }
  }, [setStory]);

  const handleSubmit = e => {
    e.preventDefault();

    fetch('http://localhost:4000/story/create', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        genre: toBeGenre,
        longitude: story.longitude,
        latitude: story.latitude,
        community,
        body
      })
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);

    setLibrary([{
      _id: title,
      title,
      description,
      genre: toBeGenre,
      coordinates: [story.longitude, story.latitude],
      community,
      body
    }, ...library]);
    setStory(null);
    props.history.push('/app/dashboard');
  }

  return (
    <form onSubmit={handleSubmit} className='entry__form'>
      <h1 className='header'>New Story</h1>

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
        onChange={e => setToBeGenre(e.currentTarget.value)}
        required
      >
        {genre.map(item => (
          <option
            key={item}
            value={item}
          >{item}</option>
        ))}
      </select>
      {story !== null ? // TODO: Will not last upgrade. Needs to be made resilient
        <>
          <button
            className='entry__plotbutton'
            type='button'
            onClick={() => sessionStorage.setItem('action', 'Plot')}
          >Re-Plot Entry</button>

          <label>Longitude:</label>
          <input
            className='entry__content'
            type='text'
            value={story.longitude || 0}
            disabled
            required
          />

          <label>Latitude:</label>
          <input
            className='entry__content'
            type='text'
            value={story.latitude || 0}
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
        </> : isPlotting ? <LoadFeed />
          : <button
            className='entry__plotbutton'
            onClick={() => {
              setIsPlotting(isPlotting => !isPlotting);
              sessionStorage.setItem('action', 'Plot');
            }}
          >Plot Entry</button>
      }
    </form>
  )
}