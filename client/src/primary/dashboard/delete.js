import React, { useEffect } from 'react';

export const Delete = props => {
  useEffect(() => {
    const modal = document.getElementById('deleteModal');
    const modalToggle = e => {
      if (e.target === modal) {
        props.toggleIsDeleting();
      }
    }
    modal.addEventListener('click', modalToggle);

    return () => {
      modal.removeEventListener('click', modalToggle);
    }
  });

  const handleDelete = id => {
    fetch('http://localhost:4000/story/delete/' + id, {
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
      <div className='modal-content' id='deleteStory__form'>
        <span className='close' onClick={() => { props.toggleIsDeleting() }}>&times;</span>
        <h1>Are you sure?</h1>
        <p>Deleted stories cant be recovered.</p>
        <form onSubmit={() => handleDelete(props.id)}>
          <button type='submit'>Delete Story</button>
        </form>
        <button
          onClick={() => props.toggleIsDeleting()}
        >Keep Story</button>
      </div>
    </div>
  )
}