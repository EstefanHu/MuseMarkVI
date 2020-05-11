import React, {
  useContext
} from 'react';

import { StoryContext } from '../../context';
import { withRouter } from 'react-router-dom';

import { FiPlusSquare } from 'react-icons/fi';

export const Toolbar = withRouter(props => {
  const { story, setStory } = useContext(StoryContext)

  const createStory = () => {
    setStory({});
    props.history.push('/app/create');
  }

  const cancelStory = () => {
    setStory(null);
    props.history.push('/app/dashboard');
  }

  const saveStory = () => {
    if (story === null ||
      story.title === '' ||
      story.description === '')
      return alert('You seem to be missing a pitch');
    if (story.route.length === 0)
      return alert('There seems to be no story nodes');

    fetch('http://localhost:4000/story/create', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id": story.id,
        "title": story.title,
        "description": story.description,
        "genre": story.genre,
        "coordinates": story.coordinates,
      })
    })
      .then(res => res.json())
      .catch(console.error);

    setStory(null);
    props.history.push('/app/dashboard');
  }

  return (
    <nav id='toolbar' className='topNav'>
      <h1 className='logo'>:M</h1>
      <span>
        {story === null ? (
          <FiPlusSquare
            className='toolbar__icons'
            onClick={createStory}
          />
        ) : (
            <>
              <button
                className='toolbar__button'
                onClick={cancelStory}
              >cancel</button>
              <button
                className='toolbar__button'
                onClick={saveStory}
              >Save</button>
            </>
          )
        }
      </span>
    </nav >
  )
});