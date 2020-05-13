import React from 'react';
import { EntryActions } from './entryActions';

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
  color: 'light-grey',
  justifyContent: 'space-around'
}


// TODO: Add Link to author profiles.
export const Entry = ({ _id, genre, title, description, author, authorId, isOwned }) => {

  return (
    <article style={article}>
      <span style={header}>
        <p style={info}>{genre} by {author}</p>
        {/* <p style={credibility}>{credibility}</p> */}
      </span>
      <h1 style={entryTitle}>{title}</h1>
      <p style={entryDescription}>{description}</p>
      {isOwned ?
        <privateEntryActions styles={actions} id={_id} /> : <EntryActions styles={actions} />
      }
    </article>
  )
}