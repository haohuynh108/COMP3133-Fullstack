const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  address:{
    type: Object,
    required: [true, 'Please enter the restaurant address'],
    trim: true,
    lowercase: true
  },
  cuisine:{
    type: String,
    required: [true, 'Please enter the cuisine'],
    trim: true,
    lowercase: true
  },
  name:{
    type: String,
    required: [true,'Please enter the restaurant name'],
    trim: true,
  },
  city:{
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  res_id:{
    type: Number,
    default: 0,
    validate(value){
      if(value < 0 ){
        throw new Error("This is not an ID");
      }
    } 
  }
});

RestaurantSchema.methods.getName = function(){
  console.log('Name: ${this.name}' )
  return `${this.name}`
}

RestaurantSchema.post('init', (doc) => {
  console.log('%s has been initialized from the db', doc._id)
})

RestaurantSchema.post('validate', (doc) => {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

RestaurantSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

RestaurantSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

const Restaurant = mongoose.model("Restaurants", RestaurantSchema);
module.exports = Restaurant;
