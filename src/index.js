import React from 'react'; 
import { render } from 'react-dom';
import './styles/globals';

import App from './containers/App/App';

import ua from 'universal-analytics';
const visitor = ua('UA-80488337-3');

render(
  <App/>, 
  document.getElementById('root')
);
