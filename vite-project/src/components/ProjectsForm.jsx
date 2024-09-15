import React, { useState } from 'react';

const ProjectsForm = ({ onNext, onPrevious }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!projectName) newErrors.projectName = 'Required';
    if (!description) newErrors.description = 'Required';
    
    if (Object.keys(newErrors).length === 0) {
      onNext({ projectName, description });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Projects Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="projectName" className="block text-gray-700 text-sm font-semibold mb-2">Project Name:</label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${errors.projectName ? 'border-red-500' : ''}`}
              placeholder="Enter project name"
            />
            {errors.projectName && <div className="text-red-500 text-sm mt-1">{errors.projectName}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter description"
            />
            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onPrevious}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
            >
              Previous
            </button>
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

export default ProjectsForm;
