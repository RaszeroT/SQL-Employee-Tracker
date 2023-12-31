-- overwrite and/or create new database
DROP DATABASE IF EXISTS companyEmployee_db;
CREATE DATABASE companyEmployee_db;

-- use created database 
USE companyEmployee_db;

-- departments
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

-- roles
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

-- employees
CREATE TABLE employees (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     role_id INT,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     manager_id INT
);