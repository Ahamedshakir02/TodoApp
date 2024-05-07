import React, { useState } from 'react';

type User = {
  username: string;
  password: string;
};

const Signup = ({ onSignup }: { onSignup: (user: User) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setError('User already exists. Please log in.');
      return;
    }
    if (!username.trim() || !password.trim()) {
      setError('Please enter a username and password.');
      return;
    }
    const newUser: User = { username, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    onSignup(newUser);
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Signup;