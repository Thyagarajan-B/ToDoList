const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todomodel = require('./Models/todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/testTodo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get all tasks
app.get('/get', (req, res) => {
    Todomodel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Toggle task completion status
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { done } = req.body;

    Todomodel.findByIdAndUpdate(id, { done: done }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Add new task
app.post('/add', (req, res) => {
    const { task } = req.body;

    Todomodel.create({ task })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Delete task
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    Todomodel.findByIdAndDelete(id)
        .then(result => res.json({ message: "Task deleted", result }))
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
