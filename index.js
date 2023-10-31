// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "mysql_host",
    user: "mysql_user",
    password: "mysql_password",
    database: "mysqlk_DB",
  },
  console.log(`Connected to the database.`)
);
//This function is prompts the first question when logged in the terminal.
const jobSearch = () => {
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
      }
    });
};

const add = () => {
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
};

const addDepartment = () => {
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
};

const addRole = () => {
 
  const queryDept = `SELECT * FROM department`;

  db.query(queryDept, function (err, data) {
    if (err) throw err;

    let depts = data.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    //The loop adds each department retrieved from the database to the depts array. At the end of the loop, all the depts retrieved from the database
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
        const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', ${name});`;

        db.query(sql, (err) => {
          if (err) throw err;
          console.log("Added to the database");
          jobSearch();
        });
      });
  });
};

const addEmployee = () => {
 
  const queryRole = `SELECT * FROM role`;

  db.query(queryRole, function (err, data) {
    if (err) throw err;

    let role = data.map((role) => ({
      name: role.title,
      value: role.id,
    })); //The loop adds each department retrieved from the database to the depts array. At the end of the loop, all the depts retrieved from the database
    //will be stored in the depts array.
    const queryEmployee = `SELECT * FROM employee`;

    db.query(queryEmployee, function (err, data) {
      if (err) throw err;

      let employee = data.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      }));
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
          }, 
        ])
        .then(function ({ first_name, last_name, title, manager }) {
          //sql query is called to insert new role to the database.
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ("${first_name}", "${last_name}", ${title}, ${manager})`;

          db.query(sql, (err) => {
            if (err) throw err;
            console.log("Added to the database");
            jobSearch();
          });
        });
    });
  });
};

const update = () => {
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
};

const updateEmployee = () => {
  
  const updateRole = `SELECT * FROM role`;

  db.query(updateRole, function (err, data) {
    if (err) throw err;

    let role = data.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    //The loop adds each role retrieved from the database to the role array. At the end of the loop, all the role retrieved from the database
    //will be stored in the role array.
    const updateEmployee = `SELECT * FROM employee`;

    db.query(updateEmployee, function (err, data) {
      if (err) throw err;

      let employee = data.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      }));

      inquirer
        .prompt([
          //"updateEmployee" inquirer prompt initiated .
          {
            type: "list",
            message: "Which employee's role do you want to update?",
            choices: employee,
            name: "id",
          },
          {
            type: "list",
            message: "Which role do you want to assign the selected employee?",
            choices: role,
            name: "title",
          },
        ])
        .then(function ({ id, title }) {
          //sql query is called to insert new department to the database.
          const sql = `UPDATE employee SET role_id = ${title} WHERE id = ${id}`;
          db.query(sql, (err) => {
            if (err) throw err;
            console.log("Added to the database");

            jobSearch();
          });
        });
    });
  });
};

const view = () => {
  inquirer
    .prompt(
      //"view" inquirer prompt initiated .
      {
        type: "list",
        message: "What would you like to view?",
        choices: ["Department", "Role", "Employee"],
        name: "view",
      }
    )
    .then(function ({ view }) {
      //User choice. If choose 'department' then initiate viewDepartment()
      switch (view) {
        case "Department":
          viewDepartment();
          break;
      }
      switch (
        view //User choice. If choose 'role' then initiate viewRole()
      ) {
        case "Role":
          viewRole();
          break;
      }
      switch (
        view //User choice. If choose 'Employee' then initiate viewEmployee()
      ) {
        case "Employee":
          viewEmployee();
          break;
        case "quit":
          db.end();
          return jobSearch();
      }
    });

  const viewDepartment = () => {
    //sql query is called to insert new department to the database.
    const sql = `SELECT * FROM department`;
    db.query(sql, (error, results) => {
      if (error) throw err;
      // console.log(results);
      console.table(results);
      jobSearch();
    });
  };

  const viewRole = () => {
    //sql query is called to insert new department to the database.
    const sql = `SELECT * FROM role`;
    db.query(sql, (error, results) => {
      if (error) throw err;
      // console.log(results);
      console.table(results);
      jobSearch();
    });
  };

  const viewEmployee = () => {
    //sql query is called to insert new department to the database.
    const sql = `SELECT e.id AS 'Employee ID', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee Name', r.title as 'Job Title', d.name AS 'Department', r.salary AS 'Salary',
	CONCAT(m.first_name, ' ', m.last_name) AS 'Manager Name'
FROM employee e 
LEFT JOIN role r ON e.role_id=r.id
LEFT JOIN department d ON r.department_id=d.id
LEFT JOIN employee m ON e.manager_id=m.id`;
    db.query(sql, (error, results) => {
      if (error) throw err;
      // console.log(results);
      console.table(results);
      jobSearch();
    });
  };
};
jobSearch();
