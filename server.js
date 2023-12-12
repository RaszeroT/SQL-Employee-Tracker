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
      choices: ["View Departments", "View roles"],
    })
    .then((answer) => {
      console.log('************************* ANSWER:', answer.action, '**********************************')
      viewDepartments();
      viewRoles();
    });
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// logic:
//create a function that allows you to query only department name and id

function viewDepartments() {
  const query = `SELECT * FROM departments`;
  con.query(query, (err, res) => {
    console.table(res);
    console.log(err);
  });
}

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
//logic:
// create a function that shows all roles
//job title
//role id
//department
//salary

function viewRoles() {
  const query = `SELECT * FROM roles`;
  con.query(query, (err, res) => {
    console.table(res)
    console.log(err)
  })
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// logic


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
