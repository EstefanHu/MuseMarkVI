import React from 'react';

export const PostPlotForm = ({ longitude, latitude, body, setBody }) => (
  <>
    <button
      className='entry__plotbutton'
      type='button'
    >Re-Plot Entry</button>

    <label>Longitude:</label>
    <input
      className='entry__content'
      type='text'
      value={longitude || 0}
      disabled
      required
    />

    <label>Latitude:</label>
    <input
      className='entry__content'
      type='text'
      value={latitude || 0}
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
);