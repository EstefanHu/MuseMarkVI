import React, { useContext } from 'react';
import { StoryContext } from '../../../context';
import { MdLocationOn } from 'react-icons/md';
import { Marker } from 'react-map-gl';

const icon = {
  width: '50px',
  height: '50px',
}

export const MapCreate = () => {
  const { story } = useContext(StoryContext);

  return story && (
    <Marker
      latitude={story.latitude}
      longitude={story.longitude}
      offsetLeft={-25}
      offsetTop={-47}
    >
      <MdLocationOn
        style={icon} />
    </Marker>
  )
}