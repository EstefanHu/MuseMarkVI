import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdHome,
  MdLayers,
  MdSettings
} from 'react-icons/md';

export const Nav = () => (
  <nav className='primaryNav'>
    <Link to='/app/dashboard' >
      <MdHome className='primaryIcon' />
    </Link>
    <Link to='/app/community'>
      <MdLayers className='primaryIcon' />
    </Link>
    <Link to='/app/settings'>
      <MdSettings className='primaryIcon' />
    </Link>
  </nav>
)