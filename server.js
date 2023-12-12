// require packages
const inquirer = require("inquirer");

// create connection
const con = require("./config/connection.js");

// prompt user using inquirer... start small
function start() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View Departments", "View Roles", "View Employees"],
    })
    .then((answer) => {
      switch (answer.action) {
        case "view Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
      }
    });
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// logic:
//create a function that allows you to query only department name and id

function viewDepartments() {
  const query = `SELECT * FROM departments`;
  con.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // restart application
    start();
  });
}

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
//logic:
// create a function that shows all roles
//job title -- check
//role id -- check
//department -- check
//salary -- check

function viewRoles() {
  const query = `
  SELECT r.role_id, 
  r.title, 
  r.salary, 
  d.department_name 
  FROM roles r
  JOIN departments d
  `;
  con.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // restart application
    start();
  });
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// logic
//create a function that shows all employees in a formatted table

//employee id -- check
//first name -- check
//last name -- check
// job title -- check
// department -- check
// salary -- check
// manager -- check

function viewEmployees() {
  const query = `
  SELECT e.employee_id, 
  e.first_name, 
  e.last_name, 
  r.title, 
  d.department_name, 
  r.salary,
  CONCAT(m.first_name, " ", m.last_name)
  AS manager_name
  FROM employees e
  JOIN roles r
  JOIN departments d
  JOIN employees m`;
  con.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // restart application
    start();
  });
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

// Start
start();
