#  Employee Management System

##  Prodigy Infotech Internship - Task 02

##  Project Overview
A web application that allows administrators to perform CRUD operations on employee records with proper validation and authentication.

##  Technologies Used
### Frontend
- React.js
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- bcryptjs
- JSON Web Tokens (JWT)
- dotenv
- cors

##  Features
-  Admin Login & Register
-  Add New Employee
-  View All Employees
-  Edit Employee Details
-  Delete Employee
-  Search Employees
-  Employee Statistics
-  JWT Authentication
-  Protected Routes
-  Role Based Access

##  API Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register admin | Public |
| POST | /api/auth/login | Login admin | Public |
| GET | /api/employees | Get all employees | Protected |
| POST | /api/employees | Add employee | Protected |
| PUT | /api/employees/:id | Update employee | Protected |
| DELETE | /api/employees/:id | Delete employee | Protected |

##  Live Demo
### Frontend (Website)
[Click Here to Open Website](https://employee-management-system-tau-six.vercel.app)

### Backend (API)
[Click Here to Open API](https://employee-management-backend-77zs.onrender.com)

##  Project Structure
employee-management-system/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── EmployeeList.js
│   │   │   ├── AddEmployee.js
│   │   │   └── EditEmployee.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── server/
    ├── models/
    │   ├── Employee.js
    │   └── User.js
    ├── middleware/
    │   └── auth.js
    ├── routes/
    │   ├── auth.js
    │   └── employee.js
    ├── server.js
    └── package.json

##  Author
rajendran55764-lab - Prodigy Infotech Internship Task 02
