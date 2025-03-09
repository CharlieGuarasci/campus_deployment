import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade in immediately
    setFadeIn(true);

    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeIn(false);
      setFadeOut(true);
      // Trigger auth change event
      window.dispatchEvent(new Event('authChange'));
    }, 1500);

    // Navigate to profile after fade out (3 seconds total)
    const navigationTimer = setTimeout(() => {
      navigate('/profile');
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen min-w-screen bg-white flex items-center justify-center">
      {/* Background fade */}
      <div className={`absolute inset-0 bg-white transition-opacity duration-1000 ${fadeOut ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Welcome text */}
      <h1 
        className={`text-4xl font-bold text-gray-900 transition-all duration-1000 relative
          ${fadeIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}
          ${fadeOut ? 'opacity-0 transform translate-y-4' : ''}`}
      >
        Welcome to Campus
      </h1>
    </div>
  );
};

export default Welcome; 