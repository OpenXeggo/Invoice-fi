import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MoralisProvider
        serverUrl="https://ggorfgpqkaxw.usemoralis.com:2053/server"
        appId="Dyas1VFcb3V2V3MSSEeHHABHAq4dXNTX0Tk1NVS8"
      >
        <App />
      </MoralisProvider>
    </BrowserRouter>
  </React.StrictMode>
);
