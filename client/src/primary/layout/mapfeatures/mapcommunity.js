import React, { useContext } from 'react';
import { SubFeedContext } from '../../../context';
import { Marker } from 'react-map-gl';
import { MdLocationOn } from 'react-icons/md';

const icon = {
  width: '40px',
  height: '40px',
}

export const MapCommunity = () => {
  const { subFeed } = useContext(SubFeedContext);

  return subFeed && (
    subFeed.map((item, index) => (
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