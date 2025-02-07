// class Person {
//   constructor(name, gender, birthYear) {
//     this.name = name;
//     this.gender = gender;
//     this.birthYear = birthYear
//   }
//   calcul() {
//     const age = new Date().getFullYear() - this.birthYear
//     console.log(age);
//   }
// }

// Person.prototype.newInfo = function (value) {
//   console.log("new information will be here soon");
// }

// const firstPerson = new Person("Haider", "male", 1999)
// console.log(firstPerson);
// firstPerson.calcul()
// firstPerson.newInfo()

// const secondPerson = new Person("Ruhaan", "male", 2001)
// console.log(secondPerson);
// secondPerson.calcul()

// ------------------
// let obj = {
//   name: "Haider",
//   age: 25,
//   gender: "male",

//   get getName() {
//     return this.name;
//   },

// };

// console.log(obj.getName);

// -------------------------------

class Person {
  constructor(name, gender, birthYear) {
    this.name = name,
      this.gender = gender,
      this.birthYear = birthYear
  }
  calculAge() {
    const age = new Date().getFullYear() - this.birthYear
    console.log(age);
  }

  get getName() {
    return this.birthYear
  }

  set setName(value) {
    if (value.length < 3) {
      alert("please obj more then 3")
    } else {
      this.name = value
    }
  }
}

const x = new Person("Haider", "male", 1999)
console.log(x);

const get = x.getName
console.log("get", get);
x.calculAge()

x.setName = "Haider Aly"
console.log("set", x);

