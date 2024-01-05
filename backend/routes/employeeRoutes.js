const express = require('express');
const Employee = require('../models/employee.Model');
const authMiddleware = require('../middleware/authMiddleware');
const employeeRouter = express.Router();


employeeRouter.post('/employees', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;
    const employee = new Employee({
      firstName,
      lastName,
      email,
      department,
      salary,
    });
    await employee.save();
    res.status(201).json({ message: 'Employee added successfully', employee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


employeeRouter.get('/employees', authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


employeeRouter.put('/employees/:id', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, department, salary },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


employeeRouter.delete('/employees/:id', authMiddleware, async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = employeeRouter;
