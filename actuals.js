import express from 'express';
import Actual from '../models/Actual.js';
import authenticate from '../middleware/auth.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/', authenticate(), asyncHandler(async (req, res) => {
  const actuals = await Actual.find();
  res.json(actuals);
}));

router.post('/', authenticate(), asyncHandler(async (req, res) => {
  const { indicatorId, value, date, stored, user } = req.body;

  if (!indicatorId || value === undefined) {
    return res.status(400).json({ error: 'indicatorId and value are required' });
  }

  const actual = new Actual({ indicatorId, value, date, stored, user: user || req.user?.username });
  await actual.save();
  res.status(201).json(actual);
}));

router.put('/:id', authenticate(), asyncHandler(async (req, res) => {
  const actual = await Actual.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!actual) {
    return res.status(404).json({ error: 'Actual not found' });
  }

  res.json(actual);
}));

router.delete('/:id', authenticate(['admin']), asyncHandler(async (req, res) => {
  const actual = await Actual.findByIdAndDelete(req.params.id);

  if (!actual) {
    return res.status(404).json({ error: 'Actual not found' });
  }

  res.json({ message: 'Deleted' });
}));

export default router;
