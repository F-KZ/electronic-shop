import React from 'react';

const Footer = () => {
  const getCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  };

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        &copy; {getCurrentYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

