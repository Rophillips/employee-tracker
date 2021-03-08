DROP DATABASE IF EXISTS employee_Tracker_DB;

CREATE DATABASE employee_Tracker_DB;

USE employee_Tracker_DB;

--create department table 
CREATE TABLE department (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL, 
    department_id int NOT NULL, 
    PRIMARY KEY (department_id)
);