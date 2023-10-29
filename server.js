const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "dfkpczjgmpvkugnb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "mz9h72slj85nwv9r",
    password: "rjyv972yeyaa9k7p",
    database: "u2cixlmw0hhhly11",
  },
  console.log(`Connected to the database.`)
);
//This function is prompts the first question when logged in the terminal.
function jobSearch() {
  inquirer
    .prompt(
      //inquirer prompt initiated.
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["Add", "View", "Update"],
        name: "choices",
      }
    )
    .then(function ({ choices }) {
      //User choice. If choose 'add' then initiate add()
      switch (choices) {
        case "Add":
          add();
          break;
      }
      switch (
        choices //User choice. If choose 'view' then initiate view()
      ) {
        case "View":
          view();
          break;
      }
      switch (
        choices //User choice. If choose 'update' then initiate update()
      ) {
        case "Update":
          update();
          break;
        case "quit":
          db.end();
          return;
      }
    });
}

function add() {
  inquirer
    .prompt(
      //"add" inquirer prompt initiated .
      {
        type: "list",
        message: "What would you like to add?",
        choices: ["Department", "Role", "Employee"],
        name: "add",
      }
    )
    .then(function ({ add }) {
      //User choice. If choose 'department' then initiate addDepartment()
      switch (add) {
        case "Department":
          addDepartment();
          break;
      }
      switch (
        add //User choice. If choose 'role' then initiate addRole()
      ) {
        case "Role":
          addRole();
          break;
      }
      switch (
        add //User choice. If choose 'Employee' then initiate addEmployee()
      ) {
        case "Employee":
          addEmployee();
          break;
        case "quit":
          db.end();
          return jobSearch();
      }
    });
}

function addDepartment() {
  inquirer
    .prompt(
      //"addDepartment" inquirer prompt initiated .
      {
        type: "input",
        message: "What is the name of the department?",
        name: "name",
      }
    )
    .then(function ({ name }) {
      //sql query is called to insert new department to the database.
      const sql = `INSERT into department (name) VALUES ('${name}')`;
      db.query(sql, (err) => {
        if (err) throw err;
        console.log("Added to the database");
        jobSearch();
      });
    });
}

function addRole() {
  let depts = []; //empty array to store the names of the departments retrieved from the departments table in the database.

  const queryDept = `SELECT * FROM department`;

  db.query(queryDept, function (err, data) {
    if (err) throw err;

    for (let i = 0; i < data.length; i++) {
      depts.push(data[i].name);
    } //The loop adds each department retrieved from the database to the depts array. At the end of the loop, all the depts retrieved from the database
    //will be stored in the depts array.

    inquirer
      .prompt([
        //"addRole" inquirer prompt initiated .
        {
          type: "input",
          message: "What is the title of the role?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "salary",
        },
        {
          type: "list",
          message: "Which department does the role belong to?",
          choices: depts,
          name: "name",
        },
      ])
      .then(function ({ title, salary, name }) {
        //sql query is called to insert new role to the database.
        const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', (SELECT id FROM department WHERE NAME = '${name}'));`;

        db.query(sql, (err) => {
          if (err) throw err;
          console.log("Added to the database");
          jobSearch();
        });
      });
  });
}

function addEmployee() {
  let role = []; //empty array to store the names of the departments retrieved from the departments table in the database.
  let employee = [];

  
  const queryRole = `SELECT * FROM role`;

  db.query(queryRole, function (err, data) {
    if (err) throw err;

    for (let i = 0; i < data.length; i++) {
      role.push(data[i].title);
    } //The loop adds each department retrieved from the database to the depts array. At the end of the loop, all the depts retrieved from the database
    //will be stored in the depts array.
    const queryEmployee = `SELECT * FROM employee`;
    db.query(queryEmployee, function (err, data) {
      if (err) throw err;

      for (let i = 0; i < data.length; i++) {
        employee.push(data[i].first_name);
      }
      inquirer
        .prompt([
          //"addRole" inquirer prompt initiated .
          {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name",
          },
          {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name",
          },
          {
            type: "list",
            message: "What is the employee's role?",
            choices: role,
            name: "title",
          },
          {
            type: "list",
            message: "Who is the employee's manager?",
            choices: employee,
            name: "manager",
          }, //Why is this questions skipping?
        ])
        .then(function ({ first_name, last_name, title, manager }) {
          //sql query is called to insert new role to the database.
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ('${first_name}', '${last_name}',(
            SELECT id FROM role 
        WHERE title = '${title}'),
            (SELECT id FROM (SELECT * FROM employee) emp
        WHERE first_name = SUBSTRING_INDEX('${manager}',' ',1) AND last_name = SUBSTRING_INDEX('${manager}',' ',-1)))`;

          db.query(sql, (err) => {
            if (err) throw err;
            console.log("Added '${first_name}''${last_name}'to the database");
            jobSearch();
          });
        });
    });
  });
}
//Role id does not update nor does the manager id.
function update () {
    inquirer
      .prompt(
        //"add" inquirer prompt initiated .
        {
          type: "list",
          message: "What would you like to do?",
          choices: ["Employee Role"],
          name: "update",
        }
      )
      .then(function ({ update }) {
        //User choice. If choose 'department' then initiate addDepartment()
        switch (update) {
          case "Employee Role":
            updateEmployee();
            break;
            db.end();
            return jobSearch();
        }
      });
  }

  function  updateEmployee() {
  let role = []; //empty array to store the names of the departments retrieved from the departments table in the database.
  let employee = [];

  
  const updateRole = `SELECT * FROM role`;

  db.query(updateRole, function (err, data) {
    if (err) throw err;

    for (let i = 0; i < data.length; i++) {
      role.push(data[i].title);
    } //The loop adds each department retrieved from the database to the depts array. At the end of the loop, all the depts retrieved from the database
    //will be stored in the depts array.
    const updateEmployee = `SELECT * FROM employee`;
    db.query(updateEmployee, function (err, data) {
      if (err) throw err;

      for (let i = 0; i < data.length; i++) {
        employee.push(data[i].first_name);
      }
    inquirer
    .prompt([      //"updateEmployee" inquirer prompt initiated .
      {
        type: "list",
        message: "Which employee's role do you want to update?",
        choices: employee,
        name: "first_name",  
      },
      {
        type: "list",
        message: "Which role do you want to assign the selected employee?",
        choices: role,
        name: "title",  
      },
    ])
    .then(function ({ first_name, title }) {
      //sql query is called to insert new department to the database.
      const sql = `UPDATE employee SET role_id = (SELECT ID FROM role WHERE title = '${title}')
      WHERE first_name = SUBSTRING_INDEX('${first_name}',' ',1) AND last_name = SUBSTRING_INDEX('${first_name}',' ',-1)`;
      db.query(sql, (err) => {
        if (err) throw err;
        console.log("Added to the database");
        jobSearch();
      });
    });
  });
});
}
  
jobSearch();
//
//
//
