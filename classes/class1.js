// -------function
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


const ahmad = new Person("Ahmad", "male", 1992)
console.log(ahmad);
ahmad.calcul()
ahmad.bornCity()