import React from 'react';
import { FiDelete } from 'react-icons/fi';

export const ToggleFeed = () => {
  const toggle = () => {
    document.getElementById('feed').classList.toggle('closedFeed');
  }

  return (
    <div
      id='stopPlotting'
      onClick={() => toggle()}
    >
      <FiDelete />
    </div>
  )
}