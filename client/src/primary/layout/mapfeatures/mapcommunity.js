import React, { useContext } from 'react';
import { FeedContext } from '../../../context';

export const MapCommunity = () => {
  const { feed } = useContext(FeedContext);
  
  return feed && (
    <>
      
    </>
  )
}