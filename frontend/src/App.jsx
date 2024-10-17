import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import './styles/App.css'; // Ensure this file exists
import './styles/Login.css'; // Ensure this file exists
import Login from './pages/Login'; // Make sure this path is correct
import Register from './pages/Register'; // Make sure this path is correct
import NotFound from './pages/NotFound'; // Make sure this path is correct
import Home from './pages/Home'; // Make sure this path is correct
import Hotels from './pages/Hotels'; // Make sure this path is correct  

function App() {
  return (
    <div>
      <Routes>
        {/* Define route paths and their corresponding components */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<Hotels />} />
        
        {/* Handle 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
