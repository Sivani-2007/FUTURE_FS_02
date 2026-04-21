const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/minicrm')
  .then(() => console.log('✅ LOCAL MongoDB Connected!'))
  .catch(err => console.log('❌ MongoDB Error:', err.message));
app.use('/api/leads', require('./routes/leads'));

app.listen(5000, () => {
  console.log('🚀 Backend ready: http://localhost:5000');
});