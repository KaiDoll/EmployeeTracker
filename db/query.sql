SELECT * FROM department; --View all the departments with a formatted table showing department names and department ids

SELECT * FROM role; --View all the roles with the job title, role id, the department that role belongs to, and the salary for that role

SELECT * FROM employee; --View all the employees

-- This query view all employees with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
SELECT e.id AS 'Employee ID', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee Name', r.title as 'Job Title', d.name AS 'Department', r.salary AS 'Salary',
	CONCAT(m.first_name, ' ', m.last_name) AS 'Manager Name'
FROM employee e 
LEFT JOIN role r ON e.role_id=r.id
LEFT JOIN department d ON r.department_id=d.id
LEFT JOIN employee m ON e.manager_id=m.id; 

--This query adds a department to the database
INSERT into department (name) VALUES ('${name}');

INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', ${name}); --Insert new role in the role table.


INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ("${first_name}", "${last_name}", ${title}, ${manager}) --Insert new employee in the employee table
UPDATE employee SET role_id = ${title} WHERE id = ${id}

-- Once the table is created add the seed for this table then add the altered table. 
ALTER TABLE employee
   ADD CONSTRAINT self_ref_fk 
   FOREIGN KEY (manager_id)
   REFERENCES employee(id)
;
-- Altered the table to add self refrencing foreign key. 
UPDATE employee SET manager_id = NULL WHERE ID IN (3, 7, 8); 
--Once the table is altered, update the manager to null referencing their ID.