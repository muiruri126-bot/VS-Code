import express from 'express';
import Indicator from '../models/Indicator.js';
import asyncHandler from '../middleware/asyncHandler.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate(), asyncHandler(async (req, res) => {
  const indicators = await Indicator.find();
  res.json(indicators);
}));

router.post('/', authenticate(['admin']), asyncHandler(async (req, res) => {
  const { id, ...rest } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Indicator id is required' });
  }

  let indicator = await Indicator.findOne({ id });

  if (indicator) {
    Object.assign(indicator, rest);
    await indicator.save();
    return res.json({ message: 'Updated', indicator });
  }

  indicator = new Indicator({ id, ...rest });
  await indicator.save();
  res.status(201).json({ message: 'Created', indicator });
}));

router.post('/:id/actual', authenticate(), asyncHandler(async (req, res) => {
  const { value } = req.body;

  if (value === undefined) {
    return res.status(400).json({ error: 'Actual value is required' });
  }

  const indicator = await Indicator.findOne({ id: req.params.id });
  if (!indicator) {
    return res.status(404).json({ error: 'Indicator not found' });
  }

  indicator.actuals.push({ value, date: new Date(), user: req.user.username });
  await indicator.save();

  res.json({ message: 'Actual added', indicator });
}));

export default router;
