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
// 3rd static method
// 4th get and set obj data
// 5th inheritance in function obj
// 6th inheritance in class obj
// 7th create an Object using Object.create method & inheritance in Object.create method


class Person {
  constructor(name, gender, birthYear) {
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear;
  }

  calculAge() {
    return new Date().getFullYear() - this.birthYear
  }
}

Person.prototype.Hello = function () {
  console.log("hello in class");

}
const x = new Person("Haider", "male", 1998)
console.log(x);
x.Hello()
