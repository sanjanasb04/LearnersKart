const express = require('express');
const router = express.Router();

const currenciesData = [
  { code: 'IN', currency: 'INR', symbol: '₹', rate: 1, name: 'India' },
  { code: 'US', currency: 'USD', symbol: '$', rate: 0.012, name: 'United States' },
  { code: 'AE', currency: 'AED', symbol: 'AED ', rate: 0.044, name: 'United Arab Emirates' },
  { code: 'SA', currency: 'SAR', symbol: 'SR ', rate: 0.045, name: 'Saudi Arabia' },
  { code: 'GB', currency: 'GBP', symbol: '£', rate: 0.0094, name: 'United Kingdom' },
  { code: 'CA', currency: 'CAD', symbol: 'C$', rate: 0.016, name: 'Canada' },
  { code: 'AU', currency: 'AUD', symbol: 'A$', rate: 0.018, name: 'Australia' },
  { code: 'QA', currency: 'QAR', symbol: 'QR ', rate: 0.044, name: 'Qatar' }
];

router.get(['/', '/currencies'], (req, res) => {
  // Public endpoint — allow any origin, no credentials needed
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
  res.status(200).json({
    success: true,
    currencies: currenciesData
  });
});

module.exports = router;
