import React, { useState, useEffect } from 'react';

function EmployeeList({ token, handleEdit, setPage }) {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('https://employee-management-system-xxxx.onrender.com/api/employees', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setEmployees(data);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const res = await fetch(`https://employee-management-system-xxxx.onrender.com/api/employees/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setSuccess('Employee deleted successfully!');
          fetchEmployees();
        }
      } catch (err) {
        setError('Server error');
      }
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase()) ||
    emp.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <h2>👥 Employee List</h2>
        <button className="btn btn-success" onClick={() => setPage('add')}>
          ➕ Add Employee
        </button>
      </div>

      {error && <p className="error">⚠️ {error}</p>}
      {success && <p className="success">✅ {success}</p>}

      {/* Search */}
      <div className="form-group">
        <input
          type="text"
          placeholder="🔍 Search by name, department, position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Stats */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'1fr 1fr 1fr',
        gap:'15px',
        marginBottom:'20px'
      }}>
        <div style={{
          background:'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
          padding:'15px',
          borderRadius:'10px',
          color:'white',
          textAlign:'center'
        }}>
          <p style={{fontSize:'24px', fontWeight:'700'}}>{employees.length}</p>
          <p style={{fontSize:'13px'}}>Total Employees</p>
        </div>
        <div style={{
          background:'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
          padding:'15px',
          borderRadius:'10px',
          color:'white',
          textAlign:'center'
        }}>
          <p style={{fontSize:'24px', fontWeight:'700'}}>
            {employees.filter(e => e.status === 'Active').length}
          </p>
          <p style={{fontSize:'13px'}}>Active</p>
        </div>
        <div style={{
          background:'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
          padding:'15px',
          borderRadius:'10px',
          color:'white',
          textAlign:'center'
        }}>
          <p style={{fontSize:'24px', fontWeight:'700'}}>
            {employees.filter(e => e.status === 'Inactive').length}
          </p>
          <p style={{fontSize:'13px'}}>Inactive</p>
        </div>
      </div>

      {/* Table */}
      <div style={{overflowX:'auto'}}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="9" style={{textAlign:'center', padding:'30px'}}>
                  No employees found!
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td><strong>{emp.name}</strong></td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.department}</td>
                  <td>{emp.position}</td>
                  <td>₹{emp.salary.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${emp.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{padding:'6px 12px', fontSize:'12px', marginRight:'5px'}}
                      onClick={() => handleEdit(emp)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{padding:'6px 12px', fontSize:'12px'}}
                      onClick={() => deleteEmployee(emp._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
