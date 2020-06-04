import React from 'react';
import { Route } from 'react-router-dom';

import '../styles/landing.css';

import { Landing } from '../views/landing';
import { Register } from '../views/register';
import { Login } from '../views/login';
import { Privacy } from '../views/privacy';
import { Terms } from '../views/terms';
import { Forgot } from '../views/forgot';

import { Nav } from '../components/nav';

export const Initial = () => (
  <>
    <Nav />
    <main id='landingContainer'>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/privacy' component={Privacy} />
      <Route exact path='/terms' component={Terms} />
      <Route exact path='/forgot' component={Forgot} />
    </main>
  </>
);