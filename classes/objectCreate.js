const Person = {
  calcul() {
    return new Date().getFullYear() - this.birthYear
  },
  greet() {
    console.log("Hello my name is Haider");
  },

  init(name, gender, birthYear) {
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear;
  }
}
const x = Object.create(Person)
x.name = "Haider";
x.gender = "male";
x.birthYear = 1999

console.log(x);
console.log(x.calcul());
x.greet()

const y = Object.create(Person, {
  name: { value: "merry" },
  gender: { value: "female" },
  birthYear: { value: 1997 }
})

console.log(y);
console.log(y.calcul());

const z = Object.create(Person)
z.init("Ahmad", "male", 1992)
console.log(z);

// -------------------------------object inheritance----------

// const person = {
//   calculAge() {
//     return new Date().getFullYear() - this.birthYear
//   },

//   initPerson(name, gender, birthYear) {
//     this.name = name;
//     this.gender = gender;
//     this.birthYear = birthYear;
//   }
// }

// const x = Object.create(person)

// x.employeeInit = function (name, gender, birthYear, employeeId, employeeSalary) {
//   x.initPerson.call(this, name, gender, birthYear)
//   this.employeeId = employeeId;
//   this.employeeSalary = employeeSalary;

// }

// const y = Object.create(x)
// y.employeeInit("Haider", "male", 1998, 11845, 28000)
// console.log(y);




