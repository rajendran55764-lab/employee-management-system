const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const authMiddleware = require('../middleware/auth');

// GET ALL EMPLOYEES
router.get('/', authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET SINGLE EMPLOYEE
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// ADD EMPLOYEE
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      name, email, phone,
      department, position,
      salary, status
    } = req.body;

    const employee = new Employee({
      name, email, phone,
      department, position,
      salary, status
    });

    await employee.save();
    res.status(201).json({ msg: 'Employee added successfully', employee });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// UPDATE EMPLOYEE
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json({ msg: 'Employee updated successfully', employee });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE EMPLOYEE
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json({ msg: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
