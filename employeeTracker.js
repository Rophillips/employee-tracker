const inquirer = require("inquirer");
const mysql = require("mysql");
//const cTable = require('console.table');

const express = require("express");

const app = express();

//const PORT = process.env.PORT || 8080;



const connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "Eddieluna25!",
    port: 3306,
    database: "employee_Tracker_DB"
});

connection.connect(err =>{
    if (err) throw err;
    console.log("Connection Id " + connection.threadID)
    startQuestions();
})

//app.listen(PORT, () => console.log("listening on port: " + PORT));


//start prompt for questions
function startQuestions(){  
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
}).then(response =>{
    let userChoice = response.employeeChoice;
    switch(userChoice){
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
            addEmployees();
            break;

        case "update employees":
            updateEmployees();
            break;

    }
})}

//view departments
function viewDepartmentByRole(){
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    (err, results) =>{
        if (err) throw err;
        console.table(results);
        startQuestions();
    }) 
}

//view employees
function viewEmployees(){
    
    connection.query("SELECT * FROM employee",
        //if (err) throw err;
    (err, results) => {
        if (err) throw err;
        console.table(results);
        startQuestions();
    
        
    })
}


//view roles
function viewRoles(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    (err, results) =>{
        if (err) throw err;
        console.table(results);
        startQuestions();
    }) 
}

//Add departments
function addDepartments(){
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
            function(err) {
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
            message: "What is the Title of the role?"
        },
        {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
        }
    ]).then(function(response) {
        //connecting query to add title, salary
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: response.Title,
                salary: response.Salary,
            },
            
            function(err) {
                if (err) throw err
                console.table(response);
                startQuestions();
            }
        )
    })
}

//select role function queries role title for adding employee questions
let roleArr = [];
function selectRole() {
    connection.query("SELECT * FROM role", function(err, response){
        if (err) throw err
        for (var i = 0; i < response.length; i++) {
            roleArr.push(response[i].title);
        }
    })
        return roleArr;
}
//add employees function
function addEmployees() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Please enter first name"
        },

        {   name: "lastname",
            type: "input",
            message: "Please enter last name"
        },

        {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: selectRole()
        },

        
    ]).then(function (value){
        var roleID = selectRole().indexOf(value.role) + 1
        //var manager ID????????
        connection.query("INSERT INTO employee SET ?",
        
        {
            first_name: value.firstName,
            last_name: value.lastName,
            //mgr id?????
            role_id: roleID
        
        }, function(err) {
            if (err) throw err
            console.table(value)
            startQuestions()
        })
    })
}

//update employee 
function updateEmployees(){
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, response){
        //console.log(response)
        if (err) throw err
        console.log(response)
        inquirer.prompt([
            {

                name: "lastName",
                type: "rawlist",
                choices: function(){
                    var lastName = [];
                    for (var i = 0; i < response.length; i++) {
                        lastName.push(response[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the employee's last name?",
            },
            {
                name: "role",
                type: "rawlist",
                message: "What is the employee's new title?",
                choices: selectRole()
            },

        ]).then(function(value) {
            var roleId = selectRole().indexOf(value.role) + 1
            connection.query("UPDATE employee SET WHERE ?", 
               {
                   last_name: value.lastName
               },

               {
                   role_id: roleId
               },

               function(err) {
                   if (err) throw err
                   console.table(value)
                   startQuestions()
               
            })
        });
     });
 }
