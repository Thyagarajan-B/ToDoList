import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { FaCheckSquare, FaRegSquare, FaTrash } from 'react-icons/fa';

const Home = () => {
    const [todos, setTodos] = useState([]);

    // Fetch tasks from backend
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/get')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    };

    // Toggle task completion status
    const handleEdit = (id, done) => {
        axios.put(`http://localhost:3001/update/${id}`, { done: !done })
            .then(() => fetchTodos()) // Refresh list after update
            .catch(error => console.error('Error updating todo:', error));
    };

    // Delete a task
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => setTodos(todos.filter(todo => todo._id !== id)))
            .catch(error => console.error('Error deleting todo:', error));
    };

    return (
        <div className='home'>
            <h1>ToDo List</h1>
            <Create />
            {todos.length === 0 ? (
                <div className='no-records'><h2>No records</h2></div>
            ) : (
                todos.map(todo => (
                    <div key={todo._id} className='task'>
                        {todo.done ? (
                            <FaCheckSquare className="checkbox" onClick={() => handleEdit(todo._id, todo.done)} />
                        ) : (
                            <FaRegSquare className="checkbox" onClick={() => handleEdit(todo._id, todo.done)} />
                        )}
                        <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.task}</span>
                        <FaTrash className="delete-btn" onClick={() => handleDelete(todo._id)} />
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
