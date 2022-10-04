USE employee_db;

INSERT INTO department (department_name)
VALUES
("Management"),
("Production"),
("Electronics"),
("Field"),
("Office");

INSERT INTO roles (title, salary, department_id)
VALUES
("Manager", 75000, 1),
("Laundry", 25000, 2),
("Specialty", 25000, 2),
("Technician", 40000, 3),
("Job Coordinator", 45000, 4),
("Assesor", 50000, 4),
("Account Manager", 35000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("Hallie", "Mestas", 1),
("Nancy", "Wheeler", 2),
("Steve", "Harrington", 3),
("Robin", "Buckley", 4);