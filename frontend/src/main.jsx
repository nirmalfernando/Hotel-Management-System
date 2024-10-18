import React from 'react'; // Import React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from React DOM
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import App from './App.jsx'; // Import the main App component
import './styles/index.css'; // Import global styles

// Create a root for the React application and render the App component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
