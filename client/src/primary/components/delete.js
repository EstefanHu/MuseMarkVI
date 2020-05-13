import React, { useEffect } from 'react';

const deleteForm = {
  width: '300px',
  height: 'fit-content',
  background: 'white',
  margin: '40vh auto',
  padding: '20px 30px',
}

const horizontal = {
  display: 'flex',
  justifyContent: 'space-between',
}

const deleteButton = {
  width: '100%',
  fontWeight: 'bold',
  fontSize: '1rem',
  background: 'var(--color-accent)',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
}

const cancelButton = {
  width: '48%',
  fontWeight: 'bold',
  fontSize: '1rem',
  border: '1px solid lightgrey',
  borderRadius: '5px',
}

export const Delete = ({ id, toggleIsDeleting }) => {
  useEffect(() => {
    const modal = document.getElementById('deleteModal');
    const modalToggle = e => {
      if (e.target === modal) {
        toggleIsDeleting();
      }
    }
    modal.addEventListener('click', modalToggle);

    return () => {
      modal.removeEventListener('click', modalToggle);
    }
  });

  const handleDelete = id => {
    fetch('http://localhost:4000/entry/delete/' + id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(console.error);
  }

  return (
    <div className='modal' id='deleteModal'>
      <div className='modal-content' style={deleteForm}>
        <span className='close' onClick={() => { toggleIsDeleting() }}>&times;</span>
        <h1>Are you sure?</h1>
        <p>Deleted stories cant be recovered.</p>
        <span style={horizontal}>
          <form onSubmit={() => handleDelete(id)}>
            <button
              style={deleteButton}
              type='submit'
            >Delete Entry</button>
          </form>
          <button
            style={cancelButton}
            onClick={() => toggleIsDeleting()}
          >Keep Entry</button>
        </span>
      </div>
    </div>
  )
}