// class decaration

// class Person {
//   constructor(name, gender, birthYear) {
//     this.name = name;
//     this.gender = gender;
//     this.birthYear = birthYear;
//   }
//   ageCalculate() {
//     let age = new Date().getFullYear() - this.birthYear
//     console.log(age);
//   }
// }

// Person.prototype.settle = function () {
//   console.log("Settle manual prototype");
// }

// const firstPerson = new Person("Haider", "male", 1999)
// console.log(firstPerson);
// firstPerson.ageCalculate()
// firstPerson.settle()


let Person = class {
  constructor(name, password, age) {
    this.name = name;
    this.password = password;
    this.age = age;
  }

  get getDetail() {
    return this.age
  }

  set setDetail(value) {
    if (value.length < 4) {
      alert("Please Enter password more then 4 length")
    } else {
      this.password = value
    }
  }
}

const personOne = new Person("Haider", 145, 23)
console.log("befor", personOne);
personOne.setDetail = "123"

console.log("after", personOne);

console.log(personOne.getDetail);
