USE employee_Tracker_DB;

-- Department seeds
INSERT INTO department (name)
VALUE ("Sales");

INSERT INTO department (name)
VALUE ("Engineering");

INSERT INTO department (name)
VALUE ("Finance");

INSERT INTO department (name)
VALUE ("Human Resources");


-- Employee role seeds
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 95000, 1);

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Executive", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 120000, 3);

INSERT INTO role (title, salary, department_id)
VALUE ("Human Resources Manager", 125000, 4);

INSERT INTO role (title, salary, department_id)
VALUE ("Human Resources Associate", 95000, 1);

-- Employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Samantha", "Castricone", 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Daniel", "Castricone", 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Castricone", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Tina", "King", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Morgan", "Halloran", 4, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Maritza", "Cruz", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Tricia", "McMahon", 2, null);

