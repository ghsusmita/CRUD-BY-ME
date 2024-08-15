const express = require('express');
const studentModel = require('../models/student');
const router = express.Router();

// Create Student
router.post('/createStudent', async (req, res) => {
    console.log("createStudent Called:");
    const { name, email, age } = req.body;
    console.log(name, email, age);
    try {
        const student = new studentModel({
            name: name,
            email: email,
            age: age
        });
        await student.save();
        console.log("Data Saved");
        return res.status(201).json({ student });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Get All Students
router.get('/', (req, res) => {
    studentModel.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: 'Server error' }));
});

// Get Student by ID
router.get('/updateStudent/:id', async (req, res) => {
    const id = req.params.id;
    await studentModel.findById({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: 'Server error' }));
});

// Delete Student by ID
router.delete('/deleteStudent/:id', (req, res) => {
    const id = req.params.id;
    studentModel.findByIdAndDelete({ _id: id })
        .then(result => res.json({ message: 'Student deleted successfully', result }))
        .catch(err => res.status(500).json({ error: 'Server error' }));
});

// Edit Student by ID
router.put('/editStudent/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, age } = req.body;
    
    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(
            id, 
            { name, email, age }, 
            { new: true }  // Option to return the updated document
        );
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        console.log("Student Updated:", updatedStudent);
        return res.json({ message: 'Student updated successfully', updatedStudent });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
