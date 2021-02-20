 const mongoose = require ('mongoose');

 const Schema = mongoose.Schema;

 const HotelSchema = new Schema({
      hotel_name: {
        type: String,
        required: [true, 'Please enter hotel name'],
        trim: true,
        lowercase: true
      },
      street: {
        type: String,
        required: [true, 'Please enter street name'],
        trim: true,
        lowercase: true
      },
      city: {
        type: String,
        required: [true, 'Please enter city name'],
        trim: true,
        lowercase: true
      },
      postal_code: {
        type: String,
        required: [true, 'Please enter postal code'],
        trim: true,
        lowercase: true
      },
      price: {
        type: Number,
        required: [true, 'Please enter price'],
        trim: true,
        lowercase: true
      },
      email: {
        type: String,
        required: true,
        unique: [true, "Enter Valid Email"],
        trim: true,
        uppercase: true,
        validate: function(value) {
          var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        }
      },
      booking:{
        type: Schema.Types.ObjectId,
        ref:'User'
      }
 });

 module.exports = mongoose.model('Hotel', HotelSchema)