"use client"; // Make sure this is a client component

import React from 'react';

interface NoBallModalProps {
  isOpen: boolean;
  onClose: () => void;
  addNoBallRuns: (runs: number) => void; // Specify the type for the function
  addNoBallWicket: () => void; // Specify the type for the function
}

export default function NoBallModal({ isOpen, onClose, addNoBallRuns, addNoBallWicket }: NoBallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Select Runs on No Ball</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800" onClick={() => addNoBallRuns(0)}>0 Runs</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800" onClick={() => addNoBallRuns(1)}>1 Run</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800" onClick={() => addNoBallRuns(2)}>2 Runs</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800" onClick={() => addNoBallRuns(3)}>3 Runs</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800" onClick={() => addNoBallRuns(4)}>4 Runs</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800" onClick={() => addNoBallRuns(6)}>6 Runs</button>
        </div>
        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-800" onClick={addNoBallWicket}>Wicket on No Ball</button>
        <button className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-800" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
