import React, { useState } from 'react';

function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister
        ? 'https://employee-management-system-xxxx.onrender.com/api/auth/register'
        : 'https://employee-management-system-xxxx.onrender.com/api/auth/login';

      const body = isRegister
        ? { username, ...formData }
        : formData;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        handleLogin(data.token);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError('Server error, please try again');
    }
  };

  return (
    <div className="card" style={{maxWidth:'450px', margin:'0 auto'}}>
      <div className="card-header">
        <div style={{fontSize:'60px', textAlign:'center'}}>👨‍💼</div>
        <h2>{isRegister ? 'Create Account' : 'Admin Login'}</h2>
        <p className="subtitle">
          {isRegister ? 'Register to manage employees' : 'Login to manage employees'}
        </p>
      </div>
      {error && <p className="error">⚠️ {error}</p>}
      {isRegister && (
        <div className="form-group">
          <label>👤 Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      )}
      <div className="form-group">
        <label>📧 Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>🔒 Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-full" onClick={handleSubmit}>
        {isRegister ? '🎉 Register' : '🚀 Login'}
      </button>
      <div className="link-text">
        {isRegister ? 'Already have account? ' : "Don't have account? "}
        <span onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login Here' : 'Register Here'}
        </span>
      </div>
      <div className="security-badge">
        🔒 Secured with JWT Authentication
      </div>
    </div>
  );
}

export default Login;
