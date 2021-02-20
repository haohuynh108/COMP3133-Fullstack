const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_id:{
        type:Number,
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Please enter username'],
        trim: true,
        lowercase: true
      },
      password: {
        type: String,
        required: [true, 'Please enter password'],
        trim: true,
        lowercase: true
      },
      email: {
        type: String,
        required: true,
        unique: [true, "Duplicate Email Not allowed"],
        trim: true,
        uppercase: true,
        validate: function(value) {
          var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        }
      },
      userbooking: [
          {
              type: Schema.Types.ObjectId,
              ref:'Hotel'
          }
      ]   
})
module.exports = mongoose.model('User', UserSchema)