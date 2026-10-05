const express = require('express');
const router = express.Router();

const getXPData = (req, res) => {
  try {
    const user = req.user || {};
    const userId = user.id || user._id || 'guest';
    const isGold = user.role === 'admin';

    res.status(200).json({
      success: true,
      totalXP: isGold ? 350 : 150,
      level: isGold ? 'Gold' : 'Silver',
      streak: 5,
      history: [
        { id: 'xp_1', action: 'Daily Login Streak', xp: 50, date: new Date().toISOString() },
        { id: 'xp_2', action: 'Webinar Study Hour Completed', xp: 100, date: new Date().toISOString() }
      ]
    });
  } catch (err) {
    res.status(200).json({
      success: true,
      totalXP: 100,
      level: 'Gold',
      streak: 1,
      history: []
    });
  }
};

router.get('/me', getXPData);
router.get('/history', getXPData);
router.get('/activity', getXPData);
router.get('/', getXPData);

module.exports = router;
