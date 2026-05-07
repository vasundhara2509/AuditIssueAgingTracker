const mongoose = require('mongoose');

const auditIssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  department: {
    type: String,
    required: true
  },

  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },

  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  },

  assignedTo: {
    type: String
  },

  createdDate: {
    type: Date,
    default: Date.now
  },

  dueDate: {
    type: Date
  }
});

module.exports = mongoose.model('AuditIssue', auditIssueSchema);