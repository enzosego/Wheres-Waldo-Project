import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Poppins';
    padding: 0;
    margin: 0;
    -webkit-box-sizing: 0;
        -moz-box-sizing: 0;
            box-sizing: 0;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);
