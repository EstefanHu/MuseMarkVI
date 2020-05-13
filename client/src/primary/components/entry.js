import React, { useState } from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

import { Delete } from './delete';

const article = {
  padding: '10px 15px',
  borderTop: '1px solid lightgrey',
  width: '100%',
}

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'top',
}

const info = {

}

const entryTitle = {
  fontSize: '1.5rem'
}

const entryDescription = {
  textIndent: '20px',
}

const actions = {
  display: 'flex',
  justifyContent: 'space-evenly',
  fontSize: '.9rem',
}

const actionButton = {
  border: 'none',
  background: 'white',
  fontSize: '0.9rem',
  textDecoration: 'none',
  cursor: 'pointer',
  color: 'grey'
}

// TODO: Add Link to author profiles.
export const Entry = ({ id, genre, title, description, author }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <article style={article}>
      <span style={header}>
        <p style={info}>{genre} by {author}</p>
        {/* <p style={credibility}>{credibility}</p> */}
      </span>
      <h1 style={entryTitle}>{title}</h1>
      <p style={entryDescription}>{description}</p>
      <span style={actions}>
        <Link
          to='/app/read'
          style={actionButton}
        >Read More</Link>
        <Route exact path='/app/dashboard'>
          <button
            style={actionButton}
            onClick={() => setIsDeleting(isDeleting => !isDeleting)}
          >Delete Story</button>
          {isDeleting &&
            <Delete
              id={id}
              toggleIsDeleting={
                () => setIsDeleting(isDeleting => !isDeleting)
              }
            />
          }
        </Route>
      </span>
    </article>
  )
}