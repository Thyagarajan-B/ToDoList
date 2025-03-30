import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ onTaskAdded }) => {
    const [task, setTask] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!task.trim()) return; 

        axios.post('http://localhost:3001/add', { task })
            .then(response => {
                onTaskAdded(response.data); 
                setTask('');
            })
            .catch(error => console.error('Error adding task:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task..."
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default Create;