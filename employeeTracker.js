const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');



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