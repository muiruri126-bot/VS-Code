import mongoose from 'mongoose';

const indicatorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  outcome: String,
  title: String,
  baseline: String,
  target: String,
  dataSource: String,
  method: String,
  frequency: String,
  resp: String,
  actuals: [{
    value: String,
    date: Date,
    user: String
  }]
});

export default mongoose.model('Indicator', indicatorSchema);
