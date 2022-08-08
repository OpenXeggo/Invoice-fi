import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';
import { Provider } from "react-redux";

import configureStore from './store';
import { MoralisProvider } from "react-moralis";

const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MoralisProvider 
        appId="gtpOH4xJMcjZtlOLmQCbrzMz0PEK8xsFuYaBFHJv" 
        serverUrl="https://cb2qc0wxp6wd.usemoralis.com:2053/server"
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MoralisProvider>
    </Provider>
  </React.StrictMode>
);
