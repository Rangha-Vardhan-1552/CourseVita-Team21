import React, { useState } from 'react';
import QualificationForm from './QualificationForm';
import ContactForm from './ContactForm';
import ProjectsForm from './ProjectsForm';
import ExperienceForm from './ExperienceForm';
import Preview from './Preview';

const App1 = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState(false);

  const handleNext = (data) => {
    console.log('Next Data:', data);
    setFormData(prevData => {
      const updatedData = { ...prevData, ...data };
      console.log('Updated Form Data:', updatedData);
      return updatedData;
    });
    setStep(prevStep => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = () => {
    // Capture any final data before setting preview
    handleNext({});
    setPreview(true);
  };

  const handleEdit = () => {
    setPreview(false);
  };

  const handleUpload = () => {
    // Implement your upload logic here
    console.log('Uploading...', formData);
  };

  const renderStep = () => {
    if (preview) {
      return <Preview data={formData} onEdit={handleEdit} onUpload={handleUpload} />;
    }

    switch (step) {
      case 0:
        return <QualificationForm onNext={handleNext} />;
      case 1:
        return <ContactForm onNext={handleNext} onPrevious={handlePrevious} />;
      case 2:
        return <ProjectsForm onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <ExperienceForm onNext={handleSubmit} onPrevious={handlePrevious} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default App1;
