import React, { useState } from 'react';
import api from './services/api';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
      // Basic validation
      if (!email || !password) {
        setMessage('Email and password are required');
        return;
      }
      
      if (password.length < 6) {
        setMessage('Password must be at least 6 characters long');
        return;
      }
  
      try {
        const response = await api.register({ email, password });
        setMessage('Registration successful!');
        console.log('Registration payload:', { email, password }); // Log what we're sending
        console.log('Registration response:', response);
      } catch (error) {
        console.error('Full error object:', error);
        console.error('Response data:', error.response?.data);
        setMessage(error.response?.data?.message || 'Registration failed: ' + error.message);
      }
    };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login({ email, password });
      setMessage('Login successful!');
      console.log(response);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Auth Testing</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleRegister} style={{ marginRight: '10px' }}>
          Register
        </button>
        <button onClick={handleLogin}>
          Login
        </button>
      </div>

      {message && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: message.includes('successful') ? '#dff0d8' : '#f2dede',
          marginTop: '10px'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default App;