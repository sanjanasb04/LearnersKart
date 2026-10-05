const express = require('express');
const router = express.Router();

let testimonialsDb = [
  { 
    id: 't-1', 
    name: 'John Doe', 
    role: 'Senior Project Manager', 
    rating: 5, 
    quote: 'Absolutely phenomenal course! The live sessions were interactive and mock exam prep was spot-on.', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'approved'
  },
  { 
    id: 't-2', 
    name: 'Sanjna Sharma', 
    role: 'Lead Business Analyst', 
    rating: 5, 
    quote: 'Very comprehensive curriculum. The instructor was engaging and explained complex hybrid agile frameworks extremely well.', 
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    status: 'approved'
  },
  { 
    id: 't-3', 
    name: 'Rajesh Verma', 
    role: 'Quality Assurance Lead', 
    rating: 5, 
    quote: 'Cleared my certification on the 1st attempt! The study guide, situational practice tests, and 24/7 mentor support made all the difference.', 
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'approved'
  },
  { 
    id: 't-4', 
    name: 'Ananya Deshmukh', 
    role: 'Scrum Master & Agile Coach', 
    rating: 5, 
    quote: 'The training materials and practice simulators were top-notch. Loved the practical case studies and real-world domain breakdown.', 
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    status: 'approved'
  },
  { 
    id: 't-5', 
    name: 'Tomas M. Melendez', 
    role: 'Operations Manager', 
    rating: 5, 
    quote: 'Exceptional training quality and seamless LMS portal access. Highly recommended for working professionals looking to upskill.', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    status: 'approved'
  }
];

// GET /api/testimonials
router.get('/', (req, res) => {
  const approved = testimonialsDb.filter(t => t.status === 'approved');
  res.json({
    success: true,
    testimonials: approved
  });
});

// POST /api/testimonials (Submit Feedback)
router.post('/', (req, res) => {
  const { name, role, rating, quote, comment } = req.body;
  const newFeedback = {
    id: 't-' + Date.now(),
    name: name || 'Learner',
    role: role || 'Verified Student',
    rating: rating || 5,
    quote: quote || comment || 'Great training experience!',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    status: 'approved',
    createdAt: new Date().toISOString()
  };
  testimonialsDb.unshift(newFeedback);
  res.json({
    success: true,
    message: 'Thank you for your feedback! It has been received.',
    testimonial: newFeedback
  });
});

module.exports = router;
