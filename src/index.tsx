import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { library } from "@fortawesome/fontawesome-svg-core";
import SnackBarContext from './SnackBar/SnackBarContext';

import { 
  faS,
  faR,
  faQuoteLeft,
  faEnvelope,
  faLock,
  faAngleLeft,
  faEye,
  faEyeSlash,
  faTimes,
  faExclamationCircle,
  faCheckCircle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

library.add(faS, faQuoteLeft);
library.add(faS, faEnvelope);
library.add(faS, faLock);
library.add(faS, faAngleLeft);
library.add(faS, faEye);
library.add(faS, faEyeSlash);
library.add(faS, faTimes);
library.add(faS, faExclamationCircle);
library.add(faS, faCheckCircle);
library.add(faS, faInfoCircle);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <SnackBarContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SnackBarContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
