import React, { useState } from 'react';

const QualificationForm = ({ onNext }) => {
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!degree) newErrors.degree = 'Required';
    if (!institution) newErrors.institution = 'Required';
    
    if (Object.keys(newErrors).length === 0) {
      onNext({ degree, institution });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Qualification Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="degree" className="block text-gray-700 text-sm font-semibold mb-2">Degree:</label>
            <input
              type="text"
              id="degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${errors.degree ? 'border-red-500' : ''}`}
              placeholder="Enter your degree"
            />
            {errors.degree && <div className="text-red-500 text-sm mt-1">{errors.degree}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="institution" className="block text-gray-700 text-sm font-semibold mb-2">Institution:</label>
            <input
              type="text"
              id="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${errors.institution ? 'border-red-500' : ''}`}
              placeholder="Enter your institution"
            />
            {errors.institution && <div className="text-red-500 text-sm mt-1">{errors.institution}</div>}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QualificationForm;
