// src/pages/NotFound.jsx
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-700">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-royal-blue">404</h1>
        <p className="mt-4 text-2xl font-semibold">Oops! Page Not Found</p>
        <p className="mt-2 text-lg">We can't seem to find the page you're looking for.</p>
        <img 
          src="https://images.unsplash.com/photo-1506808381983-3d62ec64b7cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3MzR8MHwxfGFsbHwxfHx8fHx8fHwxNjcwMTg5MjY1&ixlib=rb-4.0.3&q=80&w=800" 
          alt="Page Not Found" 
          className="mt-8 w-full max-w-md rounded-lg shadow-md"
        />
        <a 
          href="/" 
          className="mt-6 inline-block px-6 py-3 bg-golden-yellow text-white font-medium rounded-lg transition duration-300 hover:bg-royal-blue"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
