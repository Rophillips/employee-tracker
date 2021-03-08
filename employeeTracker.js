const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');



const connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_Tracker_DB"
});