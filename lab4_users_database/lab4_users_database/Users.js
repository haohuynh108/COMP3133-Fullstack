const mongoose = require('mongoose');
 
const UserSchema = new mongoose.Schema({

  name: {
   type: String,
   required: true,
   trim: true,
   lowercase: true
 },

 username: {
   type: String,
   required: true,
   trim: true,
   lowercase: true,
   minlength:4
 },

 email: {
   type: String,
   required: true,
   unique: [true, "Enter the valid email"],
   trim: true,
   uppercase: true,
   validate(value) {
     var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
     return emailRegex.test(value);
   }
 },

 address: {
   street: {
     type: String,
     required: true,
     trim: true,
     lowercase: true,
     match: [/^[a-zA-Z0-9 ]+$/, 'Please fill a valid street name']
   },
   suite: {
     type: String,
     required: true,
     trim: true,
     lowercase: true,
   },
   city: {
     type: String,
     required: true,
     trim: true,
     lowercase: true,
     match: [/^[a-zA-Z ]+$/, 'Please fill a valid city name']
   },
   zipcode: {
     type: String,
     validate: {
       validator: function(v) {
         return /\d{5}-\d{4}/.test(v);
       },
       message: props => `${props.value} is not a valid zipcode!`
     },
     required: [true, 'Zipcode required']
   },
 },

 phone: {
   type: String,
   validate: {
     validator: function(v) {
       return /\d{1}-\d{3}-\d{3}-\d{4}/.test(v);
     },
     message: props => `${props.value} is not a valid phone number!`
   },
   required: [true, 'User phone number required']
 },

 website: {
   type: String,
   required: [true, 'Please enter website'],
   trim: true,
   lowercase: true,
   validate: {
     validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
     message: 'Must be a Valid URL'
   }
 }
}, { collection : 'Users' });
 
UserSchema.post('init', (doc) => {

  console.log('%s has been initialized from the db', doc._id);

});
 
UserSchema.post('validate', (doc) => {

  console.log('%s has been validated (but not saved yet)', doc._id);

});
 
UserSchema.post('save', (doc) => {

  console.log('%s has been saved', doc._id);

});
 
UserSchema.post('remove', (doc) => {

  console.log('%s has been removed', doc._id);

});
 
const User = mongoose.model("Users", UserSchema);

module.exports = User;
