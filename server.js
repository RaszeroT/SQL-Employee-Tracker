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
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Create New Department",
        "Create New Role",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Create New Department":
          createDepartment();
          break;
        case "Create New Role":
          createRole();
          break;
      }
    });
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

// logic:
//create a function that allows you to query only department name and id

// name -- check
// id -- check

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
  const query = `SELECT r.role_id, r.title, r.salary, d.department_name
  FROM roles r
  JOIN departments d ON r.department_id = d.department_id`;
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
  SELECT 
  e.id, 
  e.first_name, 
  e.last_name, 
  r.title, 
  d.department_name,
  r.salary,
  CONCAT(m.first_name, " ", m.last_name) AS manager_name
  FROM employees e
  LEFT JOIN roles r ON e.role_id = r.id
  LEFT JOIN departments d ON r.department_id = d.id
  LEFT JOIN employees m on e.manager_id = m.id`;
  con.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // restart application
    start();
  });
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

//logic
// create a function that will allow user to add a department to the database

//Add to start() inquirer -- check

function createDepartment() {
  // set inquirer to prompt for name --check
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the name of the new department?",
    })
    //insert into seeds.sql --check
    .then((answer) => {
      console.log(answer.department);
      const query = `
      INSERT INTO departments (department_name)
      VALUE ('${answer.department}')`;
      con.query(query, (err, res) => {
        if (err) {
          throw err;
        } else {
          console.log(
            `Department: ${answer.department} has been created successfully!`
          );
        }
        start();
      });
    });
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// logic
// create a function that allows user to create a new role
// name
// salary
// and the department role is in.

//add to start() inquirer -- check
// set inquirer to prompt for roll name
// insert into seeds
function createRole() {
  const query = `SELECT * FROM departments`;
  con.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
    inquirer
      .prompt([
        // TODO: Why did this prompt have to be passed as a array?
        {
          type: "input",
          name: "title",
          message: "What is the name of the new Role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of this role?",
        },
        {
          type: "list",
          name: "department",
          message: "Select the appropriate department",
          choices: res.map((department) => department.department_name),
        },
      ])
      .then((answer) => {
        const department = res.find(
          (department) => department.name === answer.department
        );
        const query = `INSERT INTO roles SET ?`;
        con.query(
          query,
          {
            title: answer.title,
            salary: answer.salary,
            department_id: department,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`
            Added role "${answer.title}" with a salary of ${answer.salary} to the department ${answer.department}`);
          }
        );
      });
  });
  start();
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database



// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

// Start
start();
