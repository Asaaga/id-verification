const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const student = new Schema({
  firstName: {
    type: String,
  },
  secondName: {
    type: String,
    required: true,
  },
  matric: {
    type: String,
    required: true,
  },
  level: {
    type: String,
  },
  image: {
    type: String,
  },
  Expiry: {
    type: String,
  },
  school: {
    type: String,
  },
  barcode: {
    type: String,
  },
});

module.exports = mongoose.model('Student', student);
