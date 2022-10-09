const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'root',
      database: 'employee_db'
    }
);

const inquirer = require('inquirer');

const options = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [ "View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update Employee Role", "Done" ]
    }
]

function newOption()
{
    inquirer.prompt(options)
    .then(answers  => { 
        answers.option
        switch(answers.option)
        {
            case "View All Departments":
            showDepartments();
                break;
            case "View All Roles":
            showRoles();
                break;
            case "View All Employees":
            showEmployees();
                break;
            case "Add A Department":
            newDepartment();
                break;
            case "Add A Role":
            newRole();
                break;
            case "Add An Employee":
            newEmployee();
                break;
            case "Update Employee Role":
            updateRole();
                break;
            case "Done":
            db.end();
                break;
        }
     })
}

function showDepartments()
{   
    db.query(
        'SELECT * FROM department;',
        (err, results) => {
            console.table(results);
        }
    )
    
    newOption();
}

function newDepartment()
{
    inquirer.prompt(
        [{
            type: 'input',
            name: 'department',
            message: 'What is the name of the department? (Required)'
        }])
        .then(answer  => {
            db.query(`INSERT INTO department(department_name) VALUES ("${answer.department}")`, function (err, result) {
                if (err) throw err;
            },
            console.log(`${answer.department} Added!`),
            newOption()
            )
})
}

function showRoles()
{
    db.query(
        'SELECT * FROM roles;',
        (err, results) => {
            console.table(results);
        }
    )

    newOption();
}

function showEmployees()
{
    db.query(
        'SELECT * FROM employee;',
        (err, results) => {
            console.table(results);
        }
    )

    newOption();
}

function newEmployee()
{   
    db.query(`SELECT * FROM roles;`, (err, res) =>
    {
        if(err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'fname',
                message: 'What is the employee first name? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter a first name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'lname',
                message: 'What is the employee last name? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter a last name!');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the Employees role? (Required)',
                choices: res.map((role) => role.title)
            },
            
        ]).then((answer) => {
            const convertRole = res.find((role) => role.title === answer.role);
            const firstName = answer.fname;
            const lastName = answer.lname;
            db.query(`SELECT * FROM employee;`, (err, res) =>
            {
                if(err) throw err;
                inquirer.prompt([{
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the employees manager? (Required)',
                    choices: res.map((employee) => employee.first_name)
                }]).then((answer) => {
                    const managerID = res.find((employee) => employee.first_name === answer.manager);
                    console.log(answer);
                    db.query(`INSERT INTO employee SET ?`, {
                        first_name: firstName,
                        last_name: lastName,
                        role_id: convertRole.id,
                        manager_id: managerID.id
                    }); newOption();
                })   
            }) 
    })
})}

function newRole()
{
    inquirer.prompt(
        [
            {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role? (Required)'
            },
            {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role? (Required)'
            }
        ])
        .then(answer  => {
            db.query(`INSERT INTO roles SET ?`, {
                title: answer.title,
                salary: answer.salary
            }); 
            newOption();
        })
}

function updateRole()
{
    db.query(`SELECT * FROM employee;`, (err, res) =>
    {
        if(err) throw err;
        inquirer.prompt(
            [{
                type: 'list',
                name: 'employee',
                message: 'What Employee needs updated?? (Required)',
                choices: res.map((employee) => employee.first_name)
            }]).then(answer => {
                const convertEmployee = res.find((employee) => employee.first_name === answer.employee);
                console.log(convertEmployee.first_name);
                db.query(`SELECT * FROM roles;`, (err, res) =>
                {
                    if(err) throw err;
                    inquirer.prompt(
                        [{
                            type: 'list',
                            name: 'roles',
                            message: 'What role should they be? (Required)',
                            choices: res.map((roles) => roles.title)
                        }])
                        .then(answer => {
                            const convertRoleID = res.find((roles) => roles.title === answer.roles);
                            console.log(convertRoleID.id);
                            db.query(`UPDATE employee SET role_id = ${convertRoleID.id} WHERE first_name="${convertEmployee.first_name}";`, function(err, res)
                            {
                                if(err) throw err;
                                console.log("Employee role updated!"),
                                newOption()
                            },
                        )
                        
                    })
                    })
                })
    })
}



newOption();