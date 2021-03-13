const inquirer = require("inquirer");
const mysql = require("mysql");
//const cTable = require('console.table');

const express = require("express");

const app = express();

//const PORT = process.env.PORT || 8080;



const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Eddieluna25!",
    port: 3306,
    database: "employee_Tracker_DB"
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connection Id " + connection.threadID)
    startQuestions();
})

//app.listen(PORT, () => console.log("listening on port: " + PORT));


//start prompt for questions
function startQuestions() {
    inquirer.prompt({
        name: "employeeChoice",
        type: "list",
        message: "What would you like to do today?",
        choices: [
            "view employees by department",
            "view employees by roles",
            "view employees",
            "add departments",
            "add roles",
            "add employees",
            "update employees",
            //"EXIT",
        ]
    }).then(response => {
        let userChoice = response.employeeChoice;
        switch (userChoice) {
            case "view employees by department":
                viewDepartmentByRole();
                break;
            default:
                console.log("choose option");

            //break;

            case "view employees by roles":
                viewRoles();
                break;
            // default:
            //     console.log("choose option");
            //break;

            case "view employees":
                viewEmployees();
                break;
            // default:
            //     console.log("choose option");
            //break;

            case "add departments":
                addDepartments();
                break;

            case "add roles":
                addRoles();
                break;

            case "add employees":
                selectRoleAndAddEmployees();
                break;

            case "update employees":
                //updateEmployees();
                selectRoleAndUpdateEmployees();
                break;

        }
    })
}

//view employees by departments
function viewDepartmentByRole() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        (err, results) => {
            if (err) throw err;
            console.table(results);
            startQuestions();
        })
}

//view employees
function viewEmployees() {

    connection.query("SELECT * FROM employee",
        //if (err) throw err;
        (err, results) => {
            if (err) throw err;
            console.table(results);
            startQuestions();


        })
}


//view roles
function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
        (err, results) => {
            if (err) throw err;
            console.table(results);
            startQuestions();
        })
}

//Add departments
function addDepartments() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What department would you like to add?"
        }
    ]).then(response => {
        let query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: response.name
            },
            function (err) {
                if (err) throw err
                console.table(response);
                startQuestions();
            }
        )
    })
}


//Add roles and prompt user choices
function addRoles() {
    inquirer.prompt([
        {
            name: "Title",
            type: "input",
            message: "What is the Title of the role to add?"
        },
        {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
        }
    ]).then(function (response) {
        //connecting query to add title, salary
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: response.Title,
                salary: response.Salary,
            },

            function (err) {
                if (err) throw err
                console.table(response);
                startQuestions();
            }
        )
    })
}

//select role function queries role title for adding employee questions
 
function createEmployee(first_name, last_name, role_id){
    connection.query("INSERT employee SET ?", [
        {
            first_name, last_name, role_id
        },

    ], (err, results) => {
        if (err) console.log(err);
        startQuestions();
    })
}
function selectRoleAndAddEmployees() {
    connection.query("SELECT * FROM role", function (err, response) {
        let roleArr = [];
        if (err) throw err
        for (var i = 0; i < response.length; i++) {
            roleArr.push({ name: response[i].title, value: response[i] });
        }
        addEmployees(roleArr)
        //return(roleArr)
    })
    
}
//add employees function
function addEmployees(roleArr) {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Please enter first name"
        },

        {
            name: "lastname",
            type: "input",
            message: "Please enter last name"
        },

        {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: roleArr
        },


    ]).then(function (value) {
        console.log(value);
        createEmployee(value.firstname, value.lastname, value.role.id);
        
    })
}


function selectRoleAndUpdateEmployees() {
    connection.query("SELECT * FROM role", function (err, response) {
        let roleArr = [];
        if (err) throw err
        for (var i = 0; i < response.length; i++) {
            roleArr.push({ name: response[i].title, value: response[i] });
        }
        updateEmployees(roleArr)
        //return(roleArr)
    })
    
}
//update employee 
function updateEmployees(roleArray) {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function (err, response) {
        //console.log(response)
        if (err) throw err
        console.log(response)

        inquirer.prompt([
            {

                name: "employee",
                type: "rawlist",
                choices: function () {
                    var lastName = [];
                    for (var i = 0; i < response.length; i++) {
                        lastName.push({name: response[i].first_name  +" "+ response[i].last_name, value: response[i]});
                    }
                    return lastName;
                },
                message: "Please select an employee",
            },
            {
                name: "role",
                type: "rawlist",
                message: "What is the employee's new title?",
                choices: roleArray
            },

        ]).then((value) => {
            console.log(value);
            updateEmployeeDB(value.role.id, value.employee.id);
            //var roleId = selectRole().indexOf(value.role) + 1
          
        });
    });
}
function updateEmployeeDB(role_id, id){
    connection.query("UPDATE employee SET ? WHERE ? ", [
        {
             role_id, 
        },
        {
            id
        }
    ], (err, results) => {
        if (err) console.log(err);
        startQuestions();
    })
}