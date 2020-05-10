
import React, { useState } from 'react';

import './dashboard.css';

import { Delete } from './delete';

export const Dashboard = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [id, setId] = useState();

    return (
        <section className='container'>
            {isDeleting &&
                <Delete
                    toggleIsDeleting={
                        () => setIsDeleting(isDeleting => !isDeleting)
                    }
                    id={id}
                />
            }
        </section>
    )
}