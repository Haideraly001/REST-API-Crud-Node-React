const Person = function (name, gender, birthYear) {
  this.name = name
  this.gender = gender
  this.birthYear = birthYear

  // samePart1
  // this.calcul = function () {
  //   const age = new Date().getFullYear() - this.birthYear
  //   console.log("age", age);
  // }

}
// samePart1
Person.prototype.calcul = function () {
  const age = new Date().getFullYear() - this.birthYear
  console.log("age", age);
}

Person.prototype.steller = function () {
  console.log("User Names");
}

const firstPerson = new Person("Haider", "Male", 1999)

console.log(firstPerson);
firstPerson.calcul()
firstPerson.steller()

const secondPerson = new Person("Alvin", "male", 2001)
console.log(secondPerson);
secondPerson.calcul()

const obj = {
  name: "abc",
  age: 23,
  user: "pew pew"
}

const x = obj.hasOwnProperty("name")
console.log(x);
