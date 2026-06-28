import React, { useState } from 'react';

function AddEmployee({ token, setPage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    status: 'Active'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://employee-management-backend-77zs.onrender.com/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Employee added successfully!');
        setTimeout(() => setPage('employees'), 2000);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError('Server error, please try again');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div style={{fontSize:'60px', textAlign:'center'}}>➕</div>
        <h2>Add New Employee</h2>
        <p className="subtitle">Fill in the employee details below</p>
      </div>
      {error && <p className="error">⚠️ {error}</p>}
      {success && <p className="success">✅ {success}</p>}

      <div className="form-grid">
        <div className="form-group">
          <label>👤 Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>📧 Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>📱 Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>🏢 Department</label>
          <select name="department" onChange={handleChange}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
          </select>
        </div>
        <div className="form-group">
          <label>💼 Position</label>
          <input
            type="text"
            name="position"
            placeholder="Enter position"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>💰 Salary</label>
          <input
            type="number"
            name="salary"
            placeholder="Enter salary"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>✅ Status</label>
          <select name="status" onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div style={{display:'flex', gap:'15px', marginTop:'20px'}}>
        <button className="btn" onClick={handleSubmit}>
          💾 Add Employee
        </button>
        <button
          className="btn btn-danger"
          onClick={() => setPage('employees')}
        >
          ❌ Cancel
        </button>
      </div>
    </div>
  );
}

export default AddEmployee;
