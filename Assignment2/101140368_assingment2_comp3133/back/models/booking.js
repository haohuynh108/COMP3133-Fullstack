const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookSchema = new Schema({
    hotel_id: {
        type: Number,
        trim: true,
        lowercase: true
    },
    booking_date: {
    type: String,
    required: [true, 'Please enter booking date'],
    trim: true,
    lowercase: true
  },
  booking_start: {
    type: String,
    required: [true, 'Please enter booking start'],
    trim: true,
    lowercase: true
  },
  booking_end: {
    type: String,
    required: [true, 'Please enter booking end'],
    trim: true,
    lowercase: true
  },
  user_id: {
    type: Number,
    trim: true,
    lowercase: true
  }
})
module.exports = mongoose.model('Booking', BookSchema)