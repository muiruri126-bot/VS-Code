import mongoose from 'mongoose';

const ActualSchema = new mongoose.Schema({
  indicatorId: { type: String, required: true },
  value: String,
  date: Date,
  stored: String,
  user: String
}, { timestamps: true });

const Actual = mongoose.model('Actual', ActualSchema);
export default Actual;
