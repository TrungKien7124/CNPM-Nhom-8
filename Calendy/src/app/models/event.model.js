const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Event = new Schema({
  name: String,
  start: Date,  
  end: Date
});

module.exports = mongoose.model('Event', Event);