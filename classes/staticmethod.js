class Person {
  constructor(name, gender, birthYear) {
    this.name = name;
    this.gender = gender;
    this.birthYear = birthYear
  }

  ageCal() {
    console.log(new Date().getFullYear() - this.birthYear);
  }

  static greet() {
    console.log("Hello & what's App, My name is Haider,");
  }

}

const x = new Person("Haider", "male", 1999)
console.log(x);
x.ageCal()
Person.greet()