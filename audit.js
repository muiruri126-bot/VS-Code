import express from 'express';
import Audit from '../models/Audit.js';
import authenticate from '../middleware/auth.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/', authenticate(), asyncHandler(async (req, res) => {
  const log = await Audit.find().sort({ time: -1 }).limit(100);
  res.json(log);
}));

router.post('/', authenticate(), asyncHandler(async (req, res) => {
  const { indicator, value } = req.body;

  if (!indicator || value === undefined) {
    return res.status(400).json({ error: 'indicator and value are required' });
  }

  const entry = new Audit({ user: req.user.username, indicator, value });
  await entry.save();
  res.status(201).json({ message: 'Audit logged' });
}));

export default router;
