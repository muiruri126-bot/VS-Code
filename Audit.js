import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema({
  user: String,
  indicator: String,
  value: String,
  time: { type: Date, default: Date.now }
});

export default mongoose.model('Audit', auditSchema);
