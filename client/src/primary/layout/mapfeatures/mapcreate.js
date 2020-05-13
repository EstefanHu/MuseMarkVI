import React, { useContext } from 'react';
import { EntryContext } from '../../../context';
import { MdLocationOn } from 'react-icons/md';
import { Marker } from 'react-map-gl';

const icon = {
  width: '50px',
  height: '50px',
}

export const MapCreate = () => {
  const { entry } = useContext(EntryContext);

  return entry && (
    <Marker
      latitude={entry.latitude}
      longitude={entry.longitude}
      offsetLeft={-25}
      offsetTop={-47}
    >
      <MdLocationOn
        style={icon} />
    </Marker>
  )
}