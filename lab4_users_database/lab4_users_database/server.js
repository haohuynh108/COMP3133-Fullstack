const express = require('express');

const mongoose = require('mongoose');

const userRouter = require('./UserRoutes');
 
const app = express();

app.use(express.json());
 
mongoose.connect('mongodb+srv://hcgh:giahao@cluster0.0uzi4.mongodb.net/Lab06?retryWrites=true&w=majority', {

useNewUrlParser: true,

useUnifiedTopology: true

})

.then(() => console.log("DB connected successfully"))

.catch(() => console.log("DB cannot connect"));
 
app.use(userRouter);
 
app.listen(3000, () => { console.log('Server is running...') });
