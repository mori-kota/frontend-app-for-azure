import React from 'react';
import { AlertProvider } from './_contexts/alert.context';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import { App } from './app/Index';

import './styles.less';

render(
  <AlertProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AlertProvider>,
  document.getElementById('app')
);