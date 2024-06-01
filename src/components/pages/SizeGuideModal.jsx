import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SizeGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 w-3/4 lg:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Size Guide</h3>
          <button onClick={onClose}>
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <p><strong>Small (S):</strong> Bust 32-34 inches, Waist 24-26 inches</p>
        <p><strong>Medium (M):</strong> Bust 36-38 inches, Waist 28-30 inches</p>
        <p><strong>Large (L):</strong> Bust 40-42 inches, Waist 32-34 inches</p>
        <Link to="/size-guide" className="text-blue-500 underline mt-4 inline-block">
          View Detailed Size Guide
        </Link>
      </div>
    </div>
  );
};

export default SizeGuideModal;
