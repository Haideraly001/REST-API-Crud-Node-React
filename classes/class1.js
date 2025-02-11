const person = {
  calculAge() {
    return new Date().getFullYear() - this.birthYear
  },

  initPerson(name, gender, birthYear) {
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear;
  }
}

const x = Object.create(person)

// x.initPerson("Haider", "male", 1999)

x.EmployeeInit = function (name, gender, birthYear, EmployeeID, EmployeeSalary) {
  x.initPerson.call(this, name, gender, birthYear)
  this.EmployeeID = EmployeeID;
  this.EmployeeSalary = EmployeeSalary;
}

const y = Object.create(x)
y.EmployeeInit("Haider", "male", 1999, 11845, 25000)
console.log(y);

