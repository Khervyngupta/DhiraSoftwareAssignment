const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Define Employee Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  department: String
})

const Employee = mongoose.model('Employee', employeeSchema);

// API Endpoints
app.post('/employees', async (req, res) => {
  try {
    const { name, salary, department } = req.body;
    const newEmployee = new Employee({ name, salary, department });
    // await newEmployee.save();
    await Employee.create(req.body);
    res.status(201).json({ message: 'Employee added successfully', newEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
