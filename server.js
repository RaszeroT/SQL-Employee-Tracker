// require packages
const inquirer = require("inquirer");

// create connection
const con = require("./config/connection.js");

// prompt user using inquirer
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
        "Add a New Employee",
        "Update an Existing Employee",
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
        case "Add a New Employee":
          addEmployee();
          break;
        case "Update an Existing Employee":
          updateEmployee();
          break;
      }
    });
}

// This function will all the user to view all departments
function viewDepartments() {
  const query = `SELECT * FROM departments`;
  con.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // restart application
    start();
  });
}

// this function will allow the user to view all roles
function viewRoles() {
  const query = `SELECT r.id, r.title, r.salary, d.department_name
  FROM roles r
  JOIN departments d ON r.department_id = d.id`;
  con.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // restart application
    start();
  });
}

// this function will allow the user to view all employees
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

// this function will allow the user to view all departments
function createDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the name of the new department?",
    })
    .then((answer) => {
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

// this function will allow the user to create a new role
function createRole() {
  const query = `SELECT * FROM departments`;
  con.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
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
        start();
      });
  });
}

//  this function allows the user to add a new employee
function addEmployee() {
  //pull all roles from database
  const query = `SELECT id, title FROM roles`;
  con.query(query, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    const roles = res.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    const query = `
  SELECT id,
  CONCAT(first_name, ' ', last_name) AS name
  FROM employees`;
    con.query(query, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      const managers = res.map(({ id, name }) => ({
        name,
        value: id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "Enter employee first name:",
          },
          {
            type: "input",
            name: "lastName",
            message: "Enter employee last name:",
          },
          {
            type: "list",
            name: "roleId",
            message: "Select new employee role:",
            choices: roles,
          },
          {
            type: "list",
            name: "managerId",
            message: "Select new employees manager",
            choices: [{ name: "none", value: null }, ...managers],
          },
        ])
        .then((answer) => {
          const insertEmployee = `
        INSERT INTO employees (first_name, last_name, role_id, manager_id) 
        VALUES (?, ?, ?, ?)`;
          const values = [
            answer.firstName,
            answer.lastName,
            answer.roleId,
            answer.managerId,
          ];
          con.query(insertEmployee, values, (err, res) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(`Employee added Successfully`);
            start();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
}

// this function allows the user to update 
function updateEmployee() {
  const queryEmployees =
    "SELECT e.id, e.first_name, e.last_name, r.title FROM employees e LEFT JOIN roles r ON e.role_id = r.id";
  const queryRoles = "SELECT * FROM roles";
  con.query(queryEmployees, (err, resEmployees) => {
    if (err) throw err;
    con.query(queryRoles, (err, resRoles) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Select the employee to update:",
            choices: resEmployees.map(
              (employee) => `${employee.first_name} ${employee.last_name}`
            ),
          },
          {
            type: "list",
            name: "role",
            message: "Select the new role:",
            choices: resRoles.map((role) => role.title),
          },
        ])
        .then((answers) => {
          const employee = resEmployees.find(
            (employee) =>
              `${employee.first_name} ${employee.last_name}` ===
              answers.employee
          );
          const role = resRoles.find((role) => role.title === answers.role);
          const query = "UPDATE employees SET role_id = ? WHERE id = ?";
          con.query(query, [role.id, employee.id], (err, res) => {
            if (err) throw err;
            console.log(
              `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
            );
            // restart the application
            start();
          });
        });
    });
  });
}


// Start
start();
