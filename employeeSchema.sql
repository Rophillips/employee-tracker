DROP DATABASE IF EXISTS employee_Tracker_DB;

CREATE DATABASE employee_Tracker_DB;

USE employee_Tracker_DB;

--create department table 
CREATE TABLE department (
    -- unique number to be generated
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL, 
    department_id int NOT NULL, 
    PRIMARY KEY (id),

    -- connecting tables with FOREIGN KEY clause and referencing with REFERENCE clause
    FOREIGN KEY (department_id) REFERENCES department(id),

);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(30),
    last_name varchar(30),
    role_id INT,
    manager_id INT,
    -- PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;