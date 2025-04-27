const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

// configure dotenv
dotenv.config();

// express app
const app = express();

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI) 
  .then(() => { 
    console.log('Connected to MongoDB');

    // listen for requests only after DB connection is successful
    app.listen(process.env.PORT, () => { 
      console.log('Listening on port', process.env.PORT); 
    }); 
  }) 
  .catch((error) => { 
    console.log(error);
  });

// routes
app.get('/', (req, res) => { 
  res.json({ mssg: "Welcome to the app" }); 
});
