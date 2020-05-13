import React, { useContext } from 'react';
import { EntryContext } from '../../context';
import {
  withRouter,
  Route
} from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';

export const Toolbar = withRouter(props => {
  const { entry, setEntry } = useContext(EntryContext)

  const createEntry = () => {
    setEntry({});
    props.history.push('/app/new');
  }

  const cancelEntry = () => {
    setEntry(null);
    props.history.push('/app/dashboard');
  }

  return (
    <nav id='toolbar' className='topNav'>
      <h1 className='logo'>:M</h1>
      <span>
        <Route
          exact
          path='/app/(dashboard|community|settings)'
          component={
            <FiPlusSquare
              className='toolbar__icons'
              onClick={createEntry}
            />
          }
        />
        <Route
          exact
          path='/app/create'
          component={
            <button
              className='toolbar__button'
              onClick={cancelEntry}
            >Cancel</button>
          }
        />
      </span>
    </nav >
  )
});