import React from 'react'
import { Link } from 'react-router-dom';

import './error.css';

export const FourOhFour = () => (
    <main>
        <Link
            to='/app/dashboard'
            className='fourohfour'
        >
            <p>404</p>
        </Link>
    </main>
)