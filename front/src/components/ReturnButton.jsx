// src/components/GoBackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-200"
    >
      Go Back
    </button>
  );
};

export default GoBackButton;
