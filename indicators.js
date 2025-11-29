import express from 'express';
const Indicator = require('../models/Indicator');
const router = express.Router();

// Get all indicators
router.get('/', async (req, res) => {
  const indicators = await Indicator.find();
  res.json(indicators);
});

// Create indicator
router.post('/', async (req, res) => {
  const indicator = new Indicator(req.body);
  await indicator.save();
  res.status(201).json(indicator);
});

// Update indicator
router.put('/:id', async (req, res) => {
  const indicator = await Indicator.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  res.json(indicator);
});

// Delete indicator
router.delete('/:id', async (req, res) => {
  await Indicator.findOneAndDelete({ id: req.params.id });
  res.json({ message: 'Deleted' });
});

export default router;
