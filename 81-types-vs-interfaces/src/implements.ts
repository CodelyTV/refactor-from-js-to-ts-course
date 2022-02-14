interface Vehicle {
  wheels: number;
  cv: number;
  brand: string;
}

class Ford implements Vehicle {
  wheels: 4;
  cv: 60;
  brand: "Ford";
}


type Animal = {
  breed: string;
}

class Dog implements Animal {
  breed: "husky";
}