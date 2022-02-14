interface sayHiInterface {
  (name: string): string;
}

type sayHiType = (name: string) => string;

const sayHiToIsma: sayHiInterface = (name: string) => {
  return `Hello Isma, my name is ${name}`;
}

const sayHiToDani: sayHiType = function (name) {
  return `Hello Dani, my name is ${name}`;
}