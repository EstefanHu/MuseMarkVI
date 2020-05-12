import React, {
  useContext
} from 'react';

import { EntryContext, LocationContext } from '../../context';
import { withRouter } from 'react-router-dom';

import { FiPlusSquare } from 'react-icons/fi';

export const Toolbar = withRouter(props => {
  const { community } = useContext(LocationContext);
  const { entry, setEntry } = useContext(EntryContext)

  const createEntry = () => {
    setEntry(null);
    props.history.push('/app/new');
  }

  const cancelEntry = () => {
    setEntry(null);
    props.history.push('/app/dashboard');
  }

  const saveEntry = () => {
    if (entry === null ||
      entry.title === '' ||
      entry.description === '')
      return alert('You seem to be missing a pitch');
    if (entry.route.length === 0)
      return alert('There seems to be no entry nodes');

    fetch('http://localhost:4000/entry/create', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id": entry.id,
        "genre": entry.genre,
        "title": entry.title,
        "description": entry.description,
        "coordinates": entry.coordinates,
        "community": community,
        "body": entry.body,
      })
    })
      .then(res => res.json())
      .catch(console.error);

    setEntry(null);
    props.history.push('/app/dashboard');
  }

  return (
    <nav id='toolbar' className='topNav'>
      <h1 className='logo'>:M</h1>
      <span>
        {entry === null ? (
          <FiPlusSquare
            className='toolbar__icons'
            onClick={createEntry}
          />
        ) : (
            <>
              <button
                className='toolbar__button'
                onClick={cancelEntry}
              >cancel</button>
              <button
                className='toolbar__button'
                onClick={saveEntry}
              >Save</button>
            </>
          )
        }
      </span>
    </nav >
  )
});