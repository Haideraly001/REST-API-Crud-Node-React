// 1st create simple obj with function
// const Person = function (name, gender, birthYear) {
//   this.name = name;
//   this.gender = gender;
//   this.birthYear = birthYear;

//   this.calculage = function () {
//     return new Date().getFullYear() - this.birthYear
//   }
// }

// Person.prototype.hello = function () {
//   return console.log("Hello world");
// }

// const one = new Person("Haider", "male", 1998)
// console.log(one);
// console.log(one.calculage());
// one.hello()

// ---------------------------------
// 2nd create object with class

// class Person {
//   constructor(name, gender, birthYear) {
//     this.name = name;
//     this.gender = gender;
//     this.birthYear = birthYear;
//   }

//   calculAge() {
//     return new Date().getFullYear() - this.birthYear
//   }
// }

// Person.prototype.Hello = function () {
//   console.log("hello in class");

// }
// const x = new Person("Haider", "male", 1998)
// console.log(x);
// x.Hello()
// ------------------------

// 3rd static method
// 4th get and set obj data
// 5th inheritance in function obj
// const Person = function (name, gender, birthYear) {
//   this.name = name;
//   this.gender = gender;
//   this.birthYear = birthYear;

//   this.calculAge = function () {
//     return new Date().getFullYear() - this.birthYear
//   }
// }

// Person.prototype.hello = function () {
//   return console.log("hello from function contructure");
// }

// const x = new Person("Hadier", "male", 1999)

// const Employee = function (name, gender, birthYear, EmployeeID, EmployeeSalary) {
//   Person.call(this, name, gender, birthYear)
//   this.EmployeeID = EmployeeID;
//   this.EmployeeSalary = EmployeeSalary

//   this.annualSalary = function () {
//     return this.EmployeeSalary * 12
//   }
//   this.EmployeeDetails = function () {
//     console.log(this.name);
//     console.log(this.calculAge());
//   }
// }


// const HaiderEmployee = new Employee("Haider", "male", 1998, 11845, 25000)
// console.log(HaiderEmployee);
// console.log("Haider Ali annual salary ", HaiderEmployee.annualSalary());
// HaiderEmployee.EmployeeDetails()




// 6th inheritance in class obj

// class Person {
//   constructor(name, gender, birthYear) {
//     this.name = name;
//     this.gender = gender;
//     this.birthYear = birthYear;
//   }

//   calcul() {
//     return new Date().getFullYear() - this.birthYear
//   }
// }

// Person.prototype.hello = function () {
//   console.log("Hello from class");

// }

// const x = new Person("Haider", "male", 1998)
// console.log(x);


// class Employee extends Person {
//   constructor(name, gender, birthYear, EmployeeID, EmployeeSalary) {
//     super(name, gender, birthYear)
//     this.EmployeeID = EmployeeID;
//     this.EmployeeSalary = EmployeeSalary;
//   }

//   calculSalary() {
//     return this.EmployeeSalary * 12
//   }

//   EmployeeDetails() {
//     console.log(this.name);
//     console.log(this.EmployeeID);
//   }
// }


// const y = new Employee("Haider", "male", 1996, 3638, 28000)
// console.log(y);
// y.EmployeeDetails();
// console.log(y.calculSalary());

// -----------------------------------------

// 7th create an Object using Object.create method & inheritance in Object.create method

const Person = {
  calcul() {
    return new Date().getFullYear() - this.birthYear
  },

  initDetail(name, gender, birthYear) {
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear
  }
}


// const Haider = Object.create(Person)
// Haider.name = "Haider";
// Haider.gender = "male";
// Haider.birthYear = 1998;

// const Haider = Object.create(Person, {
//   name: { value: "Haider" },
//   gender: { value: "male" },
//   birthYear: { value: 1999 }
// })

// const Haider = Object.create(Person)

// Haider.initDetail("Haider", "male", 1999)
// console.log(Haider);
// console.log(Haider.calcul());

// // ------------- inheritance remianings

// Haider.EmployeeInit = function (name, gender, birthYear, EmployeeID, EmployeeSalary) {
//   Haider.initDetail.call(this, name, gender, birthYear)
//   this.EmployeeID = EmployeeID;
//   this.EmployeeSalary = EmployeeSalary;
// }



// const y = Object.create(Haider)
// y.EmployeeInit("Jon Snow", "Male", 1994, 7834, 90000)
// console.log(y);



