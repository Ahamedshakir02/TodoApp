import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Signup from './signup';

type Todo = {
  id: number;
  text: string;
  completionDate: string;
  completed: boolean;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [inputDate, setInputDate] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() === '') {
      setError('Please enter a task.');
      return;
    }
    if (inputDate === '') {
      setError('Please enter a completion date.');
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completionDate: inputDate,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputText('');
    setInputDate('');
    setError('');
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const resetTodos = () => {
    setTodos([]);
  };

  const handleLogin = () => {
    // Placeholder logic for handling login
    // For demonstration purposes, always set loggedIn to true
    setLoggedIn(true);
  };

  const handleSignup = () => {
    // Placeholder logic for handling signup
    // For demonstration purposes, always set loggedIn to true
    setLoggedIn(true);
  };

  return (
    <div>
      <h1>Todo App</h1>
      {!loggedIn && (
        <div>
          <Login onLogin={handleLogin} />
          <Signup onSignup={handleSignup} />
        </div>
      )}
      {loggedIn && (
        <div>
          <div>
            <input
              type="text"
              placeholder="Enter todo..."
              value={inputText}
              onChange={handleInputChange}
            />
            <input
              type="date"
              value={inputDate}
              onChange={handleDateChange}
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <button onClick={resetTodos}>Reset</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul>
            {todos.map((todo) => {
              const currentDate = new Date();
              const completionDate = new Date(todo.completionDate);
              const daysLeft = Math.ceil((completionDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
              return (
                <li
                  key={todo.id}
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                >
                  <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                  <span>{` - ${daysLeft} day(s) left`}</span>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
