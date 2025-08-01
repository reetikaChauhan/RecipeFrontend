import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from "react";
import ReactDOM from "react-dom/client";
import { useContext } from "react";
import { AppProvider } from "./Context/Context.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AppProvider>
        <App />
  </AppProvider>
  </StrictMode>,
)
