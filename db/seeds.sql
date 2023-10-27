INSERT INTO department (id, name)
VALUES (1, "Parks & Rec"),
       (2, "State Auditor"),
       (3, "Public Health");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Deputy Director", 100000.00, 1),
       (2, "Secretary", 80000.00, 1),
       (3, "Director", 110000.00, 1),
       (4, "Administrator", 90000.00, 1),
       (5, "Administrator", 90000.00, 1),
       (6, "Auditor", 100000.00, 2),
       (7, "Auditor", 120000.00, 2),
       (8, "Nurse", 80000.00, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Leslie", "Knope", 1, 3),
       (2, "April", "Lutgate", 2, 3),
       (3, "Ron", "Swanson", 3, 3),
       (4, "Tom", "Haverford", 4, 1),
       (5, "Donna", "Meagle", 5, 1),
       (6, "Ben", "Wyatt", 6, 7),
       (7, "Chris", "Traegan", 7, 7),
       (8, "Ann", "Perkins", 8, 8);

INSERT INTO employee (id, first_name, last_name, role_id) 
VALUES 
(3, "Ron", "Swanson", 3),
(7, "Chris", "Traegan", 7),
(8, "Ann", "Perkins", 8);
