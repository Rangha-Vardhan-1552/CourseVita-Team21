const express = require('express');
const cors = require('cors');
const dotenv =require('dotenv')
const cookieParser =require('cookie-parser')
const mongoose = require('mongoose');
const resumeRoutes = require('./routes/resumeRoutes');
const authRoutes =require('./routes/authRoutes')
const connectDB = require('./config/db');
const path = require('path');
const Resume=require('./models/resume')
const multer = require('multer');



const app = express();
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())
dotenv.config()

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', resumeRoutes);
app.use('/api', authRoutes);

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage });
  app.post('/resume/update', upload.single('file'), async (req, res) => {
    const { name, email, resumeId } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
    try {
      const updatedResume = await Resume.findByIdAndUpdate(
        resumeId,
        { name, email, fileUrl },
        { new: true }
      );
      res.status(200).json(updatedResume);
    } catch (error) {
      res.status(500).json({ error: 'Error updating resume' });
    }
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
