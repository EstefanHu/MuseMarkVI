import React, { useState } from 'react';

import { LoadFeed } from './loadFeed';

export const PlotBtn = () => {
  const [isPlotting, setIsPlotting] = useState(false);

  return isPlotting ? <LoadFeed />
    : <button
      className='entry__plotbutton'
      onClick={() => {
        setIsPlotting(isPlotting => !isPlotting);
        sessionStorage.setItem('action', 'Plot');
      }}
    >Plot Entry</button>

}