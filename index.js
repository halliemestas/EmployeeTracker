const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'root',
      database: 'employees_db'
    },
    console.log("Connection to database successful")
);

const inquirer = require('inquirer');

const options = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [ "View All Departments", "View All Roles", "Add A Department", "Add An Employee", "Update Employee Role", "Done" ]
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
            case "Add A Department":
            newDepartment();
                break;
            case "Add An Employee":
            newEmployee();
                break;
            case "Update Employee Role":
            newRole();
                break;
            case "Done":
            console.log("Thats all!");
                break;
        }
     })
}

function showDepartments()
{
    console.log("You want to show all Departments!");
    // db.query(
    //     'SELECT * FROM department;',
    //     (err, results) => {
    //         console.table(results);
    //         menu();
    //     }
    // )
}

function newDepartment()
{
    console.log("You want add a new Department!");

    // inquirer.prompt(
    //     [{
    //         type: 'input',
    //         name: 'department',
    //         message: 'What is the name of the department? (Required)',
    //         validate: departmentInput => {
    //             if (departmentInput) 
    //             {
    //                 const sql = " INSERT INTO departments(name) VALUE (";
    //                 mysql.query(sql+departmentInputfunction+");")
    //                 return true;
    //             } 
    //             else 
    //             {
    //                 console.log('Please enter a department name!');
    //                 return false;
    //             }
    //         }
    //     }
    //     ])
    
    newOption();
}

function showRoles()
{
    console.log("You want show all Roles!");

    // db.query(
    //     'SELECT * FROM roles;',
    //     (err, results) => {
    //         console.table(results);
    //         menu();
    //     }
    // )

    newOption();
}

// const employeeQuestions = [
//     {
//         type: 'input',
//         name: 'fname',
//         message: 'What is the employee first name? (Required)',
//         validate: nameInput => {
//             if (nameInput) {
//                 return true;
//             } else {
//                 console.log('Please enter a first name!');
//                 return false;
//             }
//         }
//     },
//     {
//         type: 'input',
//         name: 'lname',
//         message: 'What is the employee last name? (Required)',
//         validate: nameInput => {
//             if (nameInput) {
//                 return true;
//             } else {
//                 console.log('Please enter a last name!');
//                 return false;
//             }
//         }
//     },
    // {
    //     type: 'list',
    //     name: 'role',
    //     message: 'What is the Employees role? (Required)',
    //     choices: await showDepartments(),
    //     when(answers){
    //         return answers.department_name;
    //     }
    // },
]

function newEmployee()
{
    console.log("You want add a new Employee!");

    newOption();

}

function newRole()
{
    console.log("You want add a new Role!");

    newOption();
}

newOption();