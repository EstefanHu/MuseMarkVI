import React from 'react';
import { Marker } from 'react-map-gl';
import { MdLocationOn } from 'react-icons/md';

export const MapDashboard = () => {
  return (
    <>
      <Marker
        latitude={47.66}
        longitude={-122.23}
        offsetLeft={-25}
        offsetTop={-47}
      >
        <MdLocationOn />
      </Marker>
    </>
  )
}