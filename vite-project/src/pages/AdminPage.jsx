import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [resumes, setResumes] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch resumes when the component mounts
    const fetchResumes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resumes');
        setResumes(response.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };
    
    fetchResumes();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/resume/${id}/approve`);
      setResumes(resumes.map(resume => 
        resume._id === id ? { ...resume, status: 'Approved' } : resume
      ));
      alert('approve mail sent to user succesfully')
    } catch (error) {
      console.error('Error approving resume:', error);
    }
  };

  const handleReject = async () => {
    if (!selectedResumeId || !feedback) return;
    
    try {
      await axios.post(`http://localhost:5000/api/resume/${selectedResumeId}/reject`, { feedback });
      setResumes(resumes.map(resume => 
        resume._id === selectedResumeId ? { ...resume, status: 'Rejected', feedback } : resume
      ));
      setFeedback('');
      setSelectedResumeId(null);
      alert('reject mail sent to user succesfully')
    } catch (error) {
      console.error('Error rejecting resume:', error);
    }
  };

  const handlePreview = (fileUrl) => {
    setPreviewUrl(`http://localhost:5000${fileUrl}`);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Preview</th> {/* Added Preview Column */}
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map(resume => (
            <tr key={resume._id}>
              <td className="p-2 border-b">{resume.name}</td>
              <td className="p-2 border-b">{resume.email}</td>
              <td className="p-2 border-b">{resume.status}</td>
              <td className="p-2 border-b">
                {resume.fileUrl ? (
                  <button 
                    onClick={() => handlePreview(resume.fileUrl)} 
                    className="text-blue-500 hover:underline"
                  >
                    Preview
                  </button>
                ) : (
                  <p>No Preview Available</p>
                )}
              </td>
              <td className="p-2 border-b">
                {resume.status === 'Pending' && (
                  <>
                    <button 
                      onClick={() => handleApprove(resume._id)} 
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => setSelectedResumeId(resume._id)} 
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-4xl w-full">
            <button 
              onClick={handleCloseModal} 
              className="absolute top-2 right-32 text-4xl text-white "
            >
              &times;
            </button>
            <iframe
              src={previewUrl}
              style={{ width: '100%', height: '600px' }}
              frameBorder="0"
              title="Resume Preview"
            ></iframe>
          </div>
        </div>
      )}
      {selectedResumeId && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Reject Resume</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            className="border border-gray-300 p-2 w-full"
            placeholder="Enter feedback here..."
          />
          <button 
            onClick={handleReject} 
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          >
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
