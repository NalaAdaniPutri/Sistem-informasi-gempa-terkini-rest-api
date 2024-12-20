const express = require('express');
const { query, validationResult } = require('express-validator');
const router = express.Router();
const { getLatestQuake } = require('../controllers/quake');

router.get(
  '/quake',
  query('param').optional().isString().withMessage('Param harus berupa string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  getLatestQuake
);

const authenticateToken = require('../middleware/auth');
router.get('/quake', authenticateToken, getLatestQuake);

module.exports = router;
