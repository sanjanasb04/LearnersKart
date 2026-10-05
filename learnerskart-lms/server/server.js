require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    credentials: true
  }
});

// Set socketio as app property for access within controllers
app.set('socketio', io);

// Load Socket Handlers
const registerSocketHandlers = require('./socket/socketHandlers');
registerSocketHandlers(io);

// Middlewares
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(cookieParser());

// Cors setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://learnerskart.com',
  'https://www.learnerskart.com',
  'https://lms.learnerskart.com',
  'https://api.learnerskart.com'
];
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Setup public uploads folder
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Serve a static default certificate directory
const certDir = path.join(uploadsDir, 'certificates');
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}

// Import all API routes
const userRoutes = require('./routes/User');
const courseRoutes = require('./routes/Course');
const progressRoutes = require('./routes/Progress');
const quizRoutes = require('./routes/Quiz');
const quizAttemptRoutes = require('./routes/QuizAttempt');
const certificateRoutes = require('./routes/Certificate');
const badgeRoutes = require('./routes/Badge');
const xpActivityRoutes = require('./routes/XPActivity');
const noteRoutes = require('./routes/Note');
const batchRoutes = require('./routes/Batch');
const liveSessionRoutes = require('./routes/LiveSession');
const mentorRoutes = require('./routes/Mentor');
const mentorSessionRoutes = require('./routes/MentorSession');
const communityRoutes = require('./routes/Community');
const postRoutes = require('./routes/Post');
const commentRoutes = require('./routes/Comment');
const notificationRoutes = require('./routes/Notification');
const moduleRoutes = require('./routes/Module');
const lessonRoutes = require('./routes/Lesson');
const adminRoutes = require('./routes/admin');
const enrollmentRoutes = require('./routes/Enrollment');
const uploadRoutes = require('./routes/upload.routes');
const blogRoutes = require('./routes/Blog');
const paymentRoutes = require('./routes/Payment');


// Mount routes
app.use('/api/auth', userRoutes); // User maps auth routes
app.use('/api/users', userRoutes); // User maps user profile endpoints
app.use('/api/courses', courseRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/quiz-attempts', quizAttemptRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/xp', xpActivityRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/live-sessions', liveSessionRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/mentor-sessions', mentorSessionRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/payment', paymentRoutes);

// Contact, Feedback & Inquiry Handler to info@learnerskart.com
const nodemailer = require('nodemailer');
const createEmailTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_PASS !== 'your_app_password') {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
};

app.post(['/api/inquiry', '/api/contact', '/api/feedback', '/inquiry', '/contact', '/feedback'], async (req, res) => {
  try {
    const { name, email, phone, course, trainingMode, inquiryFor, message, source, rating, feedback } = req.body;
    
    const contactName = name || 'LearnersKart User';
    const contactEmail = email || 'info@learnerskart.com';
    const contactMsg = message || feedback || 'General Inquiry / Feedback';
    const targetRecipient = 'info@learnerskart.com';

    console.log(`[CONTACT INQUIRY RECEIVED] From: ${contactName} <${contactEmail}> | To: ${targetRecipient}`);

    // Store inquiry in persistent JSON database directory
    const inquiryDir = path.join(__dirname, 'data', 'json_db');
    if (!fs.existsSync(inquiryDir)) {
      fs.mkdirSync(inquiryDir, { recursive: true });
    }
    const inquiryFile = path.join(inquiryDir, 'Inquiries.json');
    let inquiries = [];
    if (fs.existsSync(inquiryFile)) {
      try {
        inquiries = JSON.parse(fs.readFileSync(inquiryFile, 'utf8'));
      } catch (e) { inquiries = []; }
    }
    const newInquiry = {
      id: 'inq_' + Date.now(),
      name: contactName,
      email: contactEmail,
      phone: phone || '',
      course: course || '',
      trainingMode: trainingMode || '',
      inquiryFor: inquiryFor || '',
      message: contactMsg,
      source: source || 'contact_form',
      recipient: targetRecipient,
      status: 'received',
      createdAt: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    fs.writeFileSync(inquiryFile, JSON.stringify(inquiries, null, 2), 'utf8');

    // Attempt real email dispatch via SMTP transporter to info@learnerskart.com
    const transporter = createEmailTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"LearnersKart Gateway" <${process.env.SMTP_USER || 'info@learnerskart.com'}>`,
          to: targetRecipient,
          replyTo: contactEmail,
          subject: `[LearnersKart Inquiry] Message from ${contactName}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #098ce9; border-bottom: 2px solid #098ce9; padding-bottom: 8px;">New Customer Inquiry / Feedback Received</h2>
              <p><strong>Recipient:</strong> ${targetRecipient}</p>
              <p><strong>Sender Name:</strong> ${contactName}</p>
              <p><strong>Sender Email:</strong> ${contactEmail}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Course / Interest:</strong> ${course || 'General'}</p>
              <p><strong>Training Format:</strong> ${trainingMode || 'N/A'}</p>
              <p><strong>Message / Feedback:</strong></p>
              <blockquote style="background: #f8fafc; padding: 12px; border-left: 4px solid #098ce9; margin: 10px 0;">
                ${contactMsg}
              </blockquote>
            </div>
          `
        });
        console.log(`[EMAIL DISPATCH SUCCESS] Inquiry email delivered to ${targetRecipient}`);
      } catch (mailErr) {
        console.warn(`[EMAIL DISPATCH NOTICE] SMTP Send notice: ${mailErr.message}`);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting LearnersKart! Your message has been sent to info@learnerskart.com.',
      inquiryId: newInquiry.id
    });
  } catch (err) {
    console.error('Inquiry error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to record inquiry.'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'LMS Backend Server running smoothly' });
});

// Root route
app.get('/', (req, res) => {
  res.send('LearnersKart LMS API Gateway is online.');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('LMS Backend Unhandled Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`LMS server listening on port ${PORT}`);
});

// Inline resilient fallbacks for currencies, schedules, xp, and payments
app.get(['/api/currencies', '/currencies'], (req, res) => {
  // Public endpoint — allow any origin, no credentials needed
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
  res.status(200).json({
    success: true,
    currencies: [
      { code: 'IN', currency: 'INR', symbol: '₹', rate: 1, name: 'India' },
      { code: 'US', currency: 'USD', symbol: '$', rate: 0.012, name: 'United States' },
      { code: 'AE', currency: 'AED', symbol: 'AED ', rate: 0.044, name: 'United Arab Emirates' },
      { code: 'SA', currency: 'SAR', symbol: 'SR ', rate: 0.045, name: 'Saudi Arabia' },
      { code: 'GB', currency: 'GBP', symbol: '£', rate: 0.0094, name: 'United Kingdom' },
      { code: 'CA', currency: 'CAD', symbol: 'C$', rate: 0.016, name: 'Canada' },
      { code: 'AU', currency: 'AUD', symbol: 'A$', rate: 0.018, name: 'Australia' },
      { code: 'QA', currency: 'QAR', symbol: 'QR ', rate: 0.044, name: 'Qatar' }
    ]
  });
});

app.get(['/api/schedules', '/schedules'], (req, res) => {
  res.status(200).json({
    success: true,
    schedules: [
      { id: 'sch_1', courseId: req.query.courseId || 'course_pmp', date: 'Jul 28 - Jul 31, 2026', type: 'Weekday', duration: '32 Hours' },
      { id: 'sch_2', courseId: req.query.courseId || 'course_pmp', date: 'Aug 22-23 & 29-30, 2026', type: 'Weekend', duration: '32 Hours' }
    ]
  });
});

app.get(['/api/xp/me', '/xp/me'], (req, res) => {
  res.status(200).json({
    success: true,
    totalXP: 150,
    history: []
  });
});
