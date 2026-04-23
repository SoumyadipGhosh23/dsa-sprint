function ParentFunction() {
  this.name = "This won't be returned";


}

const obj = new ParentFunction();
console.log( obj); // This will log the explicitly returned object: { name: "I am the returned object" }