import React, { useState, useEffect, useContext } from 'react';
import { EntryContext, LocationContext } from '../../context';

import './new.css';
import { PlotBtn } from './plotBtn';
import { PostPlotForm } from './postPlotForm';
import { PrePlotForm } from './prePlotForm';

export const New = props => {
  const { community } = useContext(LocationContext);
  const { entry, setEntry } = useContext(EntryContext);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Fiction');
  const [body, setBody] = useState('');

    useEffect(() => {
      return () => {
        setEntry(null);
        sessionStorage.removeItem('action');
      }
    });

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
        longitude: entry.longitude,
        latitude: entry.latitude,
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
      <PrePlotForm
        title={title} setTitle={e => setTitle(e)}
        description={description} setDescription={e => setDescription(e)}
        setGenre={e => setGenre(e)}
      />
      {entry !== null ? // TODO: Will not last upgrade. Needs to be made resilient
        <PostPlotForm
          longitude={entry.longitude}
          latitude={entry.latitude}
          body={body} setBody={e => setBody(e)}
        /> : <PlotBtn />
      }
    </form>
  )
}