import React, { useContext } from 'react';
import { EntryContext } from '../../../context';
import { MdLocationOn } from 'react-icons/md';
import { Marker } from 'react-map-gl';

export const MapCreate = () => {
  const { entry } = useContext(EntryContext);

  return (
    <Marker
      latitude={entry.latitude}
      longitude={entry.longitude}
      offsetLeft={-25}
      offsetTop={-47}
    >
      <MdLocationOn
        className='map__icon' />
    </Marker>
  )
}