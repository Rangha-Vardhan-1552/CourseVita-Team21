import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserUpload() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resumeId, setResumeId] = useState(null); // Track the resume ID for updates
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const autoSave = async () => {
      if (resumeId) {
        setIsSaving(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('resumeId', resumeId);

        try {
          await axios.post('http://localhost:5000/api/resume/update', formData);
          console.log('Resume auto-saved');
        } catch (error) {
          console.error('Error auto-saving resume:', error);
        } finally {
          setIsSaving(false);
        }
      }
    };

    const timer = setTimeout(autoSave, 5000); // Auto-save every 5 seconds
    return () => clearTimeout(timer);
  }, [file, name, email, resumeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('email', email);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      setResumeId(response.data._id); // Set the resume ID for future updates
      alert('Resume submitted successfully');
    } catch (error) {
      alert('Error submitting resume');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input    
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Submit Resume</button>
      {isSaving && <p>Saving...</p>}
    </form>
  );
}

export default UserUpload;
