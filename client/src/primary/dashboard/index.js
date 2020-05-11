
import React, { useState, useEffect, useContext } from 'react';
import { FeedContext } from '../../context';

import { Entry } from '../components/entry';
import { LoadFeed } from '../layout/loadFeed';

import './dashboard.css';

export const Dashboard = () => {
  const { feed } = useContext(FeedContext);
  const [stories, setStories] = useState([])

  useEffect(() => {
    setStories(feed);
  }, [feed]);

  return stories ? (
    <section className='dashboard'>
      {stories.map(item => (
        <Entry
          key={item._id}
          genre={item.genre}
          author={item.author}
          credibility={item.credibility}
          title={item.title}
          description={item.description}
        />
      ))}
    </section>
  ) : (
    <LoadFeed />
  )
}