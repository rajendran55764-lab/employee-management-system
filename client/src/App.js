import React, { useState } from 'react';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [editEmployee, setEditEmployee] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setPage('login');
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setPage('employees');
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setPage('edit');
  };

  return (
    <div className="App">
      <nav>
        <h1>👨‍💼 Employee Management System</h1>
        <div>
          {!token ? (
            <button onClick={() => setPage('login')}>
              🔑 Login
            </button>
          ) : (
            <>
              <button onClick={() => setPage('employees')}>
                👥 Employees
              </button>
              <button onClick={() => setPage('add')}>
                ➕ Add Employee
              </button>
              <button onClick={logout}>
                🚪 Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="container">
        {page === 'login' && (
          <Login handleLogin={handleLogin} />
        )}
        {page === 'employees' && (
          <EmployeeList
            token={token}
            handleEdit={handleEdit}
            setPage={setPage}
          />
        )}
        {page === 'add' && (
          <AddEmployee
            token={token}
            setPage={setPage}
          />
        )}
        {page === 'edit' && (
          <EditEmployee
            token={token}
            employee={editEmployee}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
