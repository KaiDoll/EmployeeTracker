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
UPDATE employee SET role_id = 3 WHERE id = 1;

--DELETE FROM department WHERE id=4;
INSERT INTO role (title, salary, department_id)
		VALUES ('${title}', '${salary}', (SELECT id FROM department WHERE NAME = '${name}'));

INSERT INTO employee (first_name, last_name, role_id, manager_id)
		VALUES ('${first_name}', '${last_name}',(
        SELECT id FROM role 
		WHERE title = '${title}'),
        (SELECT id FROM (SELECT * FROM employee) emp
		WHERE first_name = SUBSTRING_INDEX('${manager_name}',' ',1) AND last_name = SUBSTRING_INDEX('${manager_name}',' ',-1)));


UPDATE employee SET role_id = (SELECT ID FROM role2 WHERE title = '${title}')
WHERE first_name = SUBSTRING_INDEX('${manager_name}',' ',1) AND last_name = SUBSTRING_INDEX('${manager_name}',' ',-1);
