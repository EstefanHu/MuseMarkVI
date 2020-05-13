import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

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
  color: 'lightgrey',
  justifyContent: 'space-around'
}


// TODO: Add Link to author profiles.
export const Entry = ({ id, genre, title, description, author }) => {

  return (
    <article style={article}>
      <span style={header}>
        <p style={info}>{genre} by {author}</p>
        {/* <p style={credibility}>{credibility}</p> */}
      </span>
      <h1 style={entryTitle}>{title}</h1>
      <p style={entryDescription}>{description}</p>
      <span style={actions}>
        <Link to='/app/read'>Read More</Link>
        <Route exact path='/app/dashboard'>

        </Route>
      </span>
    </article>
  )
}