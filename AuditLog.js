const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  user: String,
  indicator: String,
  value: String,
  time: String
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
