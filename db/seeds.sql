-- DEPARTMENTS
INSERT INTO departments (department)
VALUE ('Engineering'),
('Finance'),
('Legal');


-- ROLES
INSERT INTO roles (department_id, title, salary)
VALUE (1, 'Lead Engineer', 150000),
(1, 'Software Engineer', 120000),
(2, 'Account Manager', 160000),
(2, 'Accountant', 125000),
(3, 'Legal Team Lead', 250000),
(3, 'Lawyer', 190000);


-- EMPLOYEES
INSERT INTO employees (role_id, first_name, last_name, manager_id)
VALUE (1, 'Melissa', 'Ortiz', null), -- manager 1
(2, 'Kevin', 'Reese', 1),
(2, 'Linda', 'Boyer', 1),
(2, 'Warren', 'Tapia', 1),
(3, 'Karen', 'Hale', null), -- manager 5
(4, 'Ira', 'McCollough', 5),
(4, 'Allie', 'Hoover', 5),
(4, 'Westly', 'Stafford', 5),
(5, 'Whitney', 'Waller', null), -- manager 9
(6, 'Koda', 'House', 9),
(6, 'Ella', 'Drake', 9),
(6, 'Alijah', 'Zhang', 9);