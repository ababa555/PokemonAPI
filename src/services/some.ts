interface IHoge {
  name: string,
  age: string,
  greeting(message: string): void
}

class Hoge implements IHoge {
  constructor(public name: string, public age: string) {
    
  }
  greeting(message: string): void {
    console.log('hello');
  }
}

type A = {
  name1: string
}

type B = {
  name2: string
}

type C = A & B
const d: C = {
  name1: "a",
  name2: "b"
}