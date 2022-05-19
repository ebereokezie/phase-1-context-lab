/* Your Code Here */
function createEmployeeRecord(employee){
    const employeeRecord = {}
    Object.assign(employeeRecord, {
        firstName: `${employee[0]}`,
        familyName: `${employee[1]}`,
        title: `${employee[2]}`,
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
     })
    
    return employeeRecord
}

function createEmployeeRecords(employees){
    const employeeRecords = employees.map(employee => createEmployeeRecord(employee))
    return employeeRecords
}

function createTimeInEvent(dateStamp){
    const splitDateStamp = dateStamp.split(" ")
    const timeIn = {}
    Object.assign(timeIn, {
        type: "TimeIn",
        hour: parseInt(splitDateStamp[1]),
        date: splitDateStamp[0]
    })
    this.timeInEvents.push(timeIn)
    return this 
}

function createTimeOutEvent(dateStamp){
    const splitDateStamp = dateStamp.split(" ")
    const timeOut = {}
    Object.assign(timeOut, {
        type: "TimeOut",
        hour: parseInt(splitDateStamp[1]),
        date: splitDateStamp[0]
    })
    this.timeOutEvents.push(timeOut)
    return this 
}

function hoursWorkedOnDate(date){
    let startTime = this.timeInEvents.find(timeInEvent=> timeInEvent.date === date)
    let endTime = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date)

    return (endTime.hour - startTime.hour)/100
}

function wagesEarnedOnDate(date){
    let wages = this.payPerHour
    return (hoursWorkedOnDate.call(this, date))*wages
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(collection, firstNameString){
    const foundEmployee = collection.find(emplRec => emplRec.firstName === firstNameString)
    return foundEmployee
}

function calculatePayroll(employees){
    return  employees.reduce((total, sum) => {return total+ allWagesFor.call(sum)}, 0)
}
