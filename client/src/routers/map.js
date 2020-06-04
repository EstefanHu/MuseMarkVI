import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';
import ReactMapGl from 'react-map-gl';
import { StoryContext } from '../context';

import { MapCreate } from '../components/mapcreate';
import { MapDashboard } from '../components/mapdashboard';
import { MapCommunity } from '../components/mapcommunity';

export const Map = ({ lng, lat }) => {
  const { story, setStory } = useContext(StoryContext);
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    width: '100vw',
    height: '100vh',
    zoom: 13.5
  });
  const [api, setApi] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api')
      .then(res => res.json())
      .then(res => setApi(res))
      .catch(console.error)
  }, []);

  const engage = e => {
    const action = sessionStorage.getItem('action');
    switch (action) {
      case 'Plot':
        setStory({
          ...story,
          'longitude': e.lngLat[0],
          'latitude': e.lngLat[1]
        });
        let pointer = document.getElementById('point');
        pointer.style.display = 'none';
        break;
      default:
        console.log(e.lngLat);
    }

    sessionStorage.removeItem('action');
  }

  return (
    <>
      {api && lng && lat ? (
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

            <Route exact path='/app/new' component={MapCreate} />
            <Route exact path='/app/dashboard' component={MapDashboard} />
            <Route exact path='/app/community' component={MapCommunity} />
            
          </ReactMapGl>
        </div>
      ) : null}
      <div id='point'></div>
    </>
  )
}