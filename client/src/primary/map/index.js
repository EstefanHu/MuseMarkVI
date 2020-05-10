import React, { useState, useContext } from 'react';
import ReactMapGl from 'react-map-gl';
import { Route } from 'react-router-dom';

import { StoryContext } from '../../context';

export const Map = ({ lng, lat, apikey }) => {
  const { setStory } = useContext(StoryContext);
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    width: '100vw',
    height: '100vh',
    zoom: 14
  });

  const engage = e => {
    setStory({
      "coordinates": e.lngLat
    })
  }

  return (
    <div id='mapboxView'>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={apikey}
        mapStyle='mapbox://styles/estefan074/ck002rku546481cnq4hc1buof'
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
        onClick={engage}
      >
        {/* <Route path='/app/create' component={Create} /> */}
      </ReactMapGl>
    </div>
  )
}