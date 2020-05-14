import React, { useContext } from 'react';
import { Marker } from 'react-map-gl';
import { MdLocationOn } from 'react-icons/md';
import { LibraryContext } from '../../../context';

const icon = {
  width: '40px',
  height: '40px',
}

export const MapDashboard = () => {
  const { library } = useContext(LibraryContext);

  return library && (
    library.map((item, index) => (
      <Marker
        key={index}
        latitude={item.coordinates[1]}
        longitude={item.coordinates[0]}
        offsetLeft={-25}
        offsetTop={-47}
      >
        <MdLocationOn
          style={icon} />
      </Marker>
    ))
  )
}