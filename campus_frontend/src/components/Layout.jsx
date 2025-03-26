import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen pb-16 sm:pb-0">
      {children}
    </div>
  );
};

export default Layout; 