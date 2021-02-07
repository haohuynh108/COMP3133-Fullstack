const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();

app.get('/restaurants', async (req, res) => {
  const restaurants = await restaurantModel.find({})
              .select("name city cuisine")
              .sort({'name' : 'desc'});  
  
  try {
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/restaurant', async (req, res) => {
  const restaurants = await restaurantModel.find({_id: req.query.id}).select("name city cuisine");

  try {
    res.send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/restaurants/name/:name', async (req, res) => {
  const name = req.params.name
  const restaurants = await restaurantModel.find({name : name});
  
  try {
    if(restaurants.length != 0){
      res.send(restaurants);
    }else{
      res.send(JSON.stringify({status:false, message: "No data found"}))
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/restaurant', async (req, res) => {
  
    const restaurant = new restaurantModel(req.body);
    
    try {
      await restaurant.save((err) => {
        if(err){
          res.send(err)
        }else{
          res.send(restaurant);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = app

