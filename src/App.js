import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (todoText !== '') {
      setTodos([...todos, { text: todoText, completed: false }]);
      setTodoText('');
    }
  };

  const deleteTodo = (index) => {
    const delTodos = todos.filter((_, i) => i !== index);
    setTodos(delTodos);
  };

  const toggleTodo = (index) => {
    const togglTodo = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(togglTodo);
  };

  return (
    <div className="App">
      <h1>React Todo</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={addTodo}>Create Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              onClick={() => toggleTodo(index)}
              className={todo.completed ? 'completed' : ''}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
