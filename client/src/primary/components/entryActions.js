import React from 'react';
import { Link } from 'react-router-dom';

const action = {
  color: 'grey',
}

export const EntryActions = ({ id, styles }) => (
  <span
    style={styles}
  >
    <Link
      style={action}
      to='/app/read'
    >
      Read More
    </Link>
  </span>
)