import React, { useState, useEffect, useContext } from 'react';
import { StoryContext } from '../../context';

import './new.css';

export const New = () => {
  const { story, setStory } = useContext(StoryContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (story === null) {
      setStory({
        "title": "",
        "description": "",
      });
    } else {
      setTitle(story.title);
      setDescription(story.description);
      setGenre(story.genre);
    }
  }, [story, setStory]);

  return (
    <>
      <h1 className='header'>New Entry</h1>
      <input
        className='pitch__content'
        type='text'
        value={title || ''}
        onChange={e => setTitle(e.target.value)}
        placeholder='Title the Story'
        required
      />
      <textarea
        className='pitch__content'
        type='text'
        value={description || ''}
        onChange={e => setDescription(e.target.value)}
        placeholder='Describe the Story'
        required
      />
      <select
        className='pitch__content'
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
    </>
  )
}