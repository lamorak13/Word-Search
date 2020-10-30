import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './css/main.css';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
