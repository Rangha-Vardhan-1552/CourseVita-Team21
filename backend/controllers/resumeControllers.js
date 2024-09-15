const Resume = require('../models/resume');
const nodemailer = require('nodemailer');
const path = require('path');
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
}); 

const upload = multer({ storage });


// Upload resume
exports.uploadResume = [
  upload.single('file'),
  async (req, res) => {
    try {
      const { name, email } = req.body;
      const fileUrl = `/uploads/${req.file.filename}`;

      const newResume = new Resume({ name, email, fileUrl });
      await newResume.save();

      res.status(201).json({ message: 'Resume submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error uploading resume' });
    }
  },
];

// Fetch all resumes for admin
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching resumes' });
  }
};

// Approve resume
exports.approveResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    resume.status = 'Approved';
    await resume.save();

    // Send email to user
    sendNotification(resume.email, 'Resume Approved', 'Your resume has been approved.');

    res.json({ message: 'Resume approved' });
  } catch (error) {
    res.status(500).json({ error: 'Error approving resume' });
  }
};

// Reject resume with feedback
exports.rejectResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    resume.status = 'Rejected';
    resume.feedback = feedback;
    await resume.save();

    // Send email to user
    sendNotification(resume.email, 'Resume Rejected', `Your resume was rejected. Feedback: ${feedback}`);

    res.json({ message: 'Resume rejected with feedback' });
  } catch (error) {
    res.status(500).json({ error: 'Error rejecting resume' });
  }
};

// Send email notification
const sendNotification = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rangavardhangamasu@gmail.com',
      pass: 'sxrm ywib itmi evvr',
    },
  });

  const mailOptions = {
    from: 'rangavardhangamasu@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
