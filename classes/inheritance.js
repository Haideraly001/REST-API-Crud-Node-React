// // -------function
// const Person = function (name, gender, birthYear) {
//   this.name = name;
//   this.gender = gender;
//   this.birthYear = birthYear;

//   this.calcul = function () {
//     const a = new Date().getFullYear() - this.birthYear
//     console.log(a);
//   }
// }

// Person.prototype.bornCity = function () {
//   console.log("New York");
// }

// const Employee = function (name, gender, birthYear, EmployeeID, EmployeeSalary) {
//   Person.call(this, name, gender, birthYear)
//   this.EmployeeID = EmployeeID;
//   this.EmployeeSalary = EmployeeSalary;
// }

// Employee.prototype = Person.prototype

// Employee.prototype.SalaryCalcul = function () {
//   return console.log(this.EmployeeSalary * 12);

// }

// const Haider = new Employee("Haider", "male", 1999, 11845, 25000)
// console.log(Haider);
// Haider.SalaryCalcul()
// Haider.bornCity()
// Haider.calcul()


// const jenny = new Person("jenny", "female", 1996)
// console.log(jenny);
// jenny.calcul()
// jenny.bornCity()

// -----------class base

class Person {
  constructor(name, gender, birthYear) {
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear;
  }

  calcul() {
    const age = new Date().getFullYear() - this.birthYear
    console.log(age);
  }
}

Person.prototype.bornCity = function () {
  console.log("Lahore");
}


class Employee extends Person {
  constructor(name, gender, birthYear, EmployeeID, EmployeeSalary) {
    super(name, gender, birthYear)

    this.EmployeeID = EmployeeID;
    this.EmployeeSalary = EmployeeSalary;

  }
  salaryCal() {
    console.log(this.EmployeeSalary * 12);
  }

  EmployeeDetails() {
    console.log(this.name);
    this.calcul()

  }
}

const Haider = new Employee("Haider", "male", 1998, 11845, 25000)
console.log(Haider);
Haider.calcul()
Haider.salaryCal()
Haider.EmployeeDetails()




// const ahmad = new Person("Ahmad", "male", 1992)
// console.log(ahmad);
// ahmad.calcul()
// ahmad.bornCity()