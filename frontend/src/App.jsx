import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import './styles/App.css'; 
import './styles/Login.css'; 
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import NotFound from './pages/NotFound'; 
import Home from './pages/Home'; 
import Hotels from './pages/Hotels';   
import SingleProduct from "./pages/SingleProductPage"; 
import LoggedUseHome from './pages/LoggedUseHome';

function App() {
  return (
    <div>
      <Routes>
        {/* Define route paths and their corresponding components */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel/:id" element={<SingleProduct />} />
        
        {/* Handle 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
