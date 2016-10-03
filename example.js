//var connOptions = { userName: 'apatite', password: 'apatite', connectionInfo: 'localhost/apatite' }
//var apatite = require('apatite').forOracle(connOptions);

//var connOptions = { userName: 'apatite', password: 'apatite', connectionInfo: 'localhost/apatite' }
//var apatite = require('apatite').forPostgres(connOptions)

//var connOptions = { userName: 'apatite', password: 'apatite', connectionInfo: 'localhost/apatite' }
//var apatite = require('apatite').forMysql(connOptions)

//var connOptions = { userName: 'apatite', password: 'apatite', connectionInfo: 'localhost/apatite' }
//var apatite = require('apatite').forMssql(connOptions)


var Department = require('./department.js')
var Employee = require('./employee.js')

apatite.registerModel(Department)
apatite.registerModel(Employee)

var session

apatite.newSession(function(sessionErr, newSession) {
    if (sessionErr)
        return console.error(sessionErr)
    session = newSession

    // Create all tables
    /*createAllTables(function() {
        endSession()
    })*/

    // Create new records
    /*createDepartmentAndEmployees(function() {
        endSession()
    })*/

    // Fetch records
    /*fetchDepartmentAndEmployees(function() {
        endSession()
    })*/

    // Change records
    /*changeDepartment(function() {
        endSession()
    })*/

    // Delete records
    /*deleteDepartment(function() {
        endSession()
    })*/
})

function createAllTables(onTablesCreated) {
    session.createDBTablesForAllModels(function(creationErr, result) {
        if (creationErr)
            return console.error(creationErr)
        
        console.log('Created all tables.');
        onTablesCreated()
    })
}

function createDepartmentAndEmployees(onCreated) {
    var department = new Department()
    department.name = 'Sales'
    var employee = new Employee()
    employee.name = 'Emp - 1'
    employee.salary = 5000.25
    employee.joinedOn = new Date()
    employee.department = department
    department.employees.push(employee)

    employee = new Employee()
    employee.name = 'Emp - 2'
    employee.salary = 3000
    employee.joinedOn = new Date()
    employee.department = department
    department.employees.push(employee)

    var changesToDo = function(changesDone) {
        session.registerNew(department)
        changesDone() // must be called
    }

    session.doChangesAndSave(changesToDo, function(saveErr) {
        if (saveErr)
            return console.error(saveErr)
        
        console.log('Records saved successfully.');
        onCreated()
    })
}

function fetchDepartmentAndEmployees(onFetched) {
    session.newQuery(Department).execute(function(fetchErr, departments) {
        if (fetchErr)
            return console.error(fetchErr)

        departments[0].employees.getValue(function(empErr, employees) {
            console.log(JSON.stringify(departments))
            console.log(JSON.stringify(employees))
            onFetched()
        })
    })
}

function changeDepartment(onChanged) {
    session.newQuery(Department).execute(function(fetchErr, departments) {
        if (fetchErr)
            return console.error(fetchErr)

        var changesToDo = function(changesDone) {
            departments[0].name = 'Foo and Bar'
            changesDone() // must be called
        }

        session.doChangesAndSave(changesToDo, function(saveErr) {
            if (saveErr)
                return console.error(saveErr)
            
            console.log('Records changed successfully.');
            onChanged()
        })
    })
}

function deleteDepartment(onDeleted) {
    session.newQuery(Department).execute(function(fetchErr, departments) {
        if (fetchErr)
            return console.error(fetchErr)

        var changesToDo = function(changesDone) {
            session.registerDelete(departments[0])
            changesDone() // must be called
        }

        session.doChangesAndSave(changesToDo, function(saveErr) {
            if (saveErr)
                return console.error(saveErr)
            
            console.log('Records deleted successfully.');
            onDeleted()
        })
    })
}

function endSession() {
    session.end(function(sessionErr) {
        if (sessionErr)
            return console.error(sessionErr)
        
        console.log('Session ended successfully.');
        process.exit(0)
    })
}