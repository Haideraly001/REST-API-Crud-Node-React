// function construnctor

const Person = function (name, gender, bornYear) {
  this.name = name;
  this.gender = gender;
  this.bornYear = bornYear;
}

Person.prototype.calcul = function () {
  let age = new Date().getFullYear() - this.bornYear
  console.log(age);
}

const firstPerson = new Person("Haider", "Male", 1999)
console.log(firstPerson);
firstPerson.calcul()

const secondPerson = new Person("Steve", "male", 2001)
console.log(secondPerson);
secondPerson.calcul()


const obj = {
  name: "alvin",
  age: 23,
  gender: "male"
}

console.log(obj.hasOwnProperty("name"));

