import React, { useState, useEffect, useContext } from 'react';
import { StoryContext, LocationContext } from '../../context';

import './new.css';
import { PlotBtn } from './plotBtn';
import { PostPlotForm } from './postPlotForm';
import { PrePlotForm } from './prePlotForm';

export const New = props => {
  const { community } = useContext(LocationContext);
  const { story, setStory } = useContext(StoryContext);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Fiction');
  const [body, setBody] = useState('');

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
        genre,
        longitude: story.longitude,
        latitude: story.latitude,
        community,
        body
      })
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);

    setStory(null);
    props.history.push('/app/dashboard');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='entry__form'
    >
      <PrePlotForm
        title={title} setTitle={e => setTitle(e)}
        description={description} setDescription={e => setDescription(e)}
        setGenre={e => setGenre(e)}
      />
      {story !== null ? // TODO: Will not last upgrade. Needs to be made resilient
        <PostPlotForm
          longitude={story.longitude}
          latitude={story.latitude}
          body={body} setBody={e => setBody(e)}
        /> : <PlotBtn />
      }
    </form>
  )
}