import React, { useEffect } from 'react';

const deleteForm = {
  width: '300px',
  height: 'fit-content',
  background: 'white',
  margin: '40vh auto',
  padding: '20px 30px',
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
        <form onSubmit={() => handleDelete(id)}>
          <button type='submit'>Delete Entry</button>
        </form>
        <button
          onClick={() => toggleIsDeleting()}
        >Keep Entry</button>
      </div>
    </div>
  )
}