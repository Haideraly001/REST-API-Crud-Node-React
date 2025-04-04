// class obj {
//   constructor(name, gender, birthYear) {
//     this.name = name;
//     this.gender = gender;
//     this.birthYear = birthYear;
//   }
//   age() {
//     return new Date().getFullYear() - this.birthYear
//   }
// }

const obj = function (name, gender, birthYear) {
  this.name = name
  this.gender = gender
  this.birthYear = birthYear

  this.getAge = function () {
    return new Date().getFullYear() - this.birthYear
  }
}

obj.prototype.hello = function () {
  console.log("Hello from oop");
}



const personOne = new obj("Haider", "male", 1999)
console.log(personOne);
console.log(personOne.getAge());
personOne.hello();
