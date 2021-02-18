const express = require('express');

const Model = require('./Users');
const app = express();
 
app.get('/users', async (req, res) => {

  const users = await Model.find({});

  try {

    res.send(users);

  } catch (err) {

    res.status(500).send(err);

  }

});
 
 
app.post('/users', async (req, res) => {

  const user = new Model(req.body);

  try {

    await user.save((err) => {

      if(err){
        res.send(err)
      }else{
      
        res.send(user);
      
      }
     
    });
   
  } catch (err) {
  
    res.status(500).send(err);
  
  }

});
 
module.exports = app
