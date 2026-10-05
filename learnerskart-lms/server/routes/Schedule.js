const express = require('express');
const router = express.Router();

router.get(['/', '/schedules'], (req, res) => {
  const courseId = req.query.courseId || 'course_pmp';
  res.status(200).json({
    success: true,
    schedules: [
      { id: 'sch_1', courseId, date: 'Jul 28 - Jul 31, 2026', type: 'Weekday', duration: '32 Hours' },
      { id: 'sch_2', courseId, date: 'Aug 22-23 & 29-30, 2026', type: 'Weekend', duration: '32 Hours' },
      { id: 'sch_3', courseId, date: 'Sep 19-20 & 26-27, 2026', type: 'Weekend', duration: '32 Hours' }
    ]
  });
});

module.exports = router;
