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
        appId="7XodwJWRSXCxJitIGEgpzq4iroJZLcTAdX5SUCq9" 
        serverUrl="https://kiq5gqgopt9i.usemoralis.com:2053/server"
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MoralisProvider>
    </Provider>
  </React.StrictMode>
);
