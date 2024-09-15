const express = require('express');
const {
  uploadResume,
  getResumes,
  approveResume,
  rejectResume,
} = require('../controllers/resumeControllers');

const router = express.Router();

// Upload resume
router.post('/upload', uploadResume);

// Fetch all resumes
router.get('/resumes', getResumes);

// Approve resume
router.post('/resume/:id/approve', approveResume);

// Reject resume with feedback
router.post('/resume/:id/reject', rejectResume);

module.exports = router;
