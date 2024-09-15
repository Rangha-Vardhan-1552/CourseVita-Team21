import React, { useState } from 'react';
import axios from 'axios';

function FeedbackModal({ resumeId }) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    await axios.post(`http://localhost:5000/api/resume/${resumeId}/reject`, { feedback });
    alert('Feedback submitted');
  };

  return (
    <div>
      <h3>Provide Feedback</h3>
      <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
}

export default FeedbackModal;
