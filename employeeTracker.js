const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

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

function startQuestions(){  
inquirer.prompt({
    name: "employeeChoice",
    type: "list",
    message: "What would you like to do today?",
    choices: [
        "view departments",
        "view roles",
        "view employees",
        "add departments",
        "add roles",
        "add employees",
        "update employee roles",
    ]
}).then(response =>{
    let userChoice = response.employeeChoice;
    switch(userChoice){
        case "view departments":
            viewDepartments();
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
            addEmployess();
            break;

        case "update employee roles":
            updateEmployees();
            break;

    }
})}


function viewDepartments(){
    connection.query("SELECT * FROM department",
    (err, results) =>{
        if (err) throw err;
        console.table(results);
        startQuestions();
    }) 
}
function viewEmployees(){
    
    connection.query("SELECT * FROM employee",
        //if (err) throw err;
    (err, results) => {
        if (err) throw err;
        console.table(results);
        startQuestions();
    
        
    })
}

function viewRoles(){
    connection.query("SELECT * FROM role",
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
            message: "What is the roles Title?"
        },
        {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
        }
    ]).then(function(response) {
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