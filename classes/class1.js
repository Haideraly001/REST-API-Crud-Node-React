let Person = {
  calcul() {
    return new Date().getFullYear() - this.birthYear
  },

  greet() {
    return "have a good day"
  },

  init(name, gender, birthYear) {
    this.name = name,
      this.gender = gender,
      this.birthYear = birthYear
  }

}

const personOne = Object.create(Person)
personOne.name = "Haider Aly";
personOne.birthYear = 1999;

console.log(personOne);
console.log(personOne.calcul());

const personSecond = Object.create(Person, {
  name: { value: "secondPerson" },
  birthYear: { value: 1996 }
})

console.log(personSecond);
console.log(personSecond.calcul());

const mark = Object.create(Person)
mark.init("mark", "male", 1998)

console.log(mark);
console.log(mark.calcul());



