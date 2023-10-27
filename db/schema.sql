CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (id)
    ON DELETE SET NULL
);
-- Once the table is created add the seed for this table then add the altered table. 
ALTER TABLE employee
   ADD CONSTRAINT self_ref_fk 
   FOREIGN KEY (manager_id)
   REFERENCES employee(id)
;
-- Altered the table to add self refrencing foreign key. 
UPDATE employee SET manager_id = NULL WHERE ID IN (3, 7, 8); 
--Once the table is altered, update the manager to null referencing their ID. 