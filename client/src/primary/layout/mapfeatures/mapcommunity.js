import React, { useContext } from 'react';
import { SubFeedContext } from '../../../context';

export const MapCommunity = () => {
  const { subFeed } = useContext(SubFeedContext);

  return subFeed && (
    <>
      
    </>
  )
}