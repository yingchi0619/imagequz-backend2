import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import '@/assets/css/base.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicRoute from './routers/';

ReactDOM.render(
  <BasicRoute />,
  document.getElementById('root')
);
