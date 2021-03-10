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

//Connection
connection.connect(function(err){
    if (err) throw err;
    console.log("Connection Id " + connection.threadID)
    //startQuestions();
    
})