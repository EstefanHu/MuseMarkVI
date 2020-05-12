import React, { useState, useEffect, useContext } from 'react';
import ReactMapGl from 'react-map-gl';

import { EntryContext } from '../../context';
import { Loading } from './loading';

export const Map = ({ lng, lat }) => {
  const { setEntry } = useContext(EntryContext);
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    width: '100vw',
    height: '100vh',
    zoom: 14
  });
  const [api, setApi] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api')
      .then(res => res.json())
      .then(res => setApi(res))
      .catch(console.error)
  }, []);

  const engage = e => {
    // setEntry({
    //   "coordinates": e.lngLat
    // })
    console.log(e.lngLat);
  }

  return api ? (
    <div id='mapboxView'>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={api}
        mapStyle='mapbox://styles/estefan074/ck002rku546481cnq4hc1buof'
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
        onClick={engage}
      >
      </ReactMapGl>
    </div>
  ) : (
      <Loading />
    )
}