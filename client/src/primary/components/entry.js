import React from 'react';

const article = {
  padding: '20px 30px',
  borderBottom: '1px solid lightgrey',
  width: '100%',
}

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'top',
}

const info = {

}

const credibility = {

}

export const Entry = props => {
  return (
    <article style={article}>
      <span style={header}>
        <p style={info}>{props.genre} by {props.author}</p>
        <p style={credibility}>{props.credibility}</p>
      </span>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </article>
  )
}