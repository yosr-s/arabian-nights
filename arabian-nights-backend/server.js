const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const wishRoutes = require('./routes/wishRoutes');

const app = express();

// Middleware
app.use(cors(
  {     origin: ["https://deploy-mern-1whq.vercel.app"],
        methods: ["GET", "POST", "PATCH", "DELETE"], 
        credentials: true,   }
));
app.use(express.json());
//app.use('/uploads', express.static('uploads'));
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/wishes', wishRoutes);

const galleryRoutes = require('./routes/galleryRoutes');
app.use('/api/gallery', galleryRoutes);


  

// DB connection
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
    /*
    app.listen(process.env.PORT, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
      });
      */
      
      
      
      
  })
  .catch((err) => console.error('DB connection error:', err));
