const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/employeedb')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/employees', require('./routes/employee'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.json({ msg: 'Employee Management API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
