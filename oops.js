/*
OOP IN JAVASCRIPT
=================

We will discuss the 4 pillars of OOP in JS:

1. Encapsulation
2. Abstraction
3. Inheritance
4. Polymorphism

Also:
- how prototype works
- what happens internally when we use class
- why class is mostly syntactic sugar over prototype
- what actually happens when we use new

Important:
JavaScript is prototype-based.
It does support OOP patterns, but unlike Java/C++, it does not use classical inheritance internally.
Even "class" in JS still works on top of prototypes.

Run this file section by section and read the comments.
*/


/* ============================================================================
1. ENCAPSULATION
============================================================================ */

/*
Encapsulation means:

Bundling:
- data (properties)
- behavior (methods)

into one unit, and controlling access to that data.

In simple words:
keep related state + logic together, and hide internal details when needed.
*/


/* ----------------------------------------------------------------------------
1.1 Factory function + closure
---------------------------------------------------------------------------- */

/*
Here count is private because it lives inside the function scope.
Only the returned methods can access it through closure.
*/

function createCounter() {
    let count = 0; // private variable

    return {
        increment() {
            count++;
        },
        decrement() {
            count--;
        },
        getCount() {
            return count;
        },
    };
}

const counter1 = createCounter();
counter1.increment();
counter1.increment();

console.log("Factory + closure:", counter1.getCount()); // 2
console.log("Direct access:", counter1.count); // undefined

/*
Why this is encapsulation:
- count is hidden
- outside code cannot change it directly
- only exposed methods can manipulate it

Good:
- true privacy
- works in old JS
- very clean

Less good:
- each instance gets new copies of methods
- less memory efficient than prototype sharing
*/


/* ----------------------------------------------------------------------------
1.2 Constructor function + closure inside constructor
---------------------------------------------------------------------------- */

/*
Again private, because count is inside constructor scope.
But methods are created again for every instance.
*/

function CounterWithClosure() {
    let count = 0; // private

    this.increment = function () {
        count++;
    };

    this.getCount = function () {
        return count;
    };
}

const counter2 = new CounterWithClosure();
counter2.increment();
console.log("Constructor + closure:", counter2.getCount()); // 1
console.log("Direct access:", counter2.count); // undefined


/* ----------------------------------------------------------------------------
1.3 Constructor function + prototype
---------------------------------------------------------------------------- */

/*
This is old-school JS OOP style.

Here methods are shared via prototype.
That is memory efficient.

But count is public, so this is not true privacy.
*/

function CounterWithPrototype() {
    this.count = 0; // public
}

CounterWithPrototype.prototype.increment = function () {
    this.count++;
};

CounterWithPrototype.prototype.getCount = function () {
    return this.count;
};

const counter3 = new CounterWithPrototype();
counter3.increment();

console.log("Constructor + prototype:", counter3.getCount()); // 1
console.log("Direct access:", counter3.count); // 1

/*
This gives:
- grouping of data + behavior
- shared methods
- OOP structure

But:
- count is public
- anyone can do counter3.count = 999
*/


/* ----------------------------------------------------------------------------
1.4 Naming convention with _property
---------------------------------------------------------------------------- */

/*
This is not real privacy.
Just a convention.

It means:
"please do not touch this directly"
*/

class UserWithConvention {
    constructor(name) {
        this._name = name; // pseudo-private by convention
    }

    getName() {
        return this._name;
    }
}

const user1 = new UserWithConvention("Soumya");
console.log("Convention:", user1.getName()); // Soumya
console.log("Still accessible:", user1._name); // Soumya


/* ----------------------------------------------------------------------------
1.5 WeakMap-based private data
---------------------------------------------------------------------------- */

/*
Before #private fields became standard,
WeakMap was a serious pattern for private data.
*/

const privateCounterData = new WeakMap();

class CounterWithWeakMap {
    constructor() {
        privateCounterData.set(this, { count: 0 });
    }

    increment() {
        privateCounterData.get(this).count++;
    }

    getCount() {
        return privateCounterData.get(this).count;
    }
}

const counter4 = new CounterWithWeakMap();
counter4.increment();
console.log("WeakMap private data:", counter4.getCount()); // 1
console.log("Direct access:", counter4.count); // undefined

/*
Why people used this:
- better privacy
- works with classes
- outside code cannot directly read stored private state

Downsides:
- verbose
- a bit less readable than #private
*/


/* ----------------------------------------------------------------------------
1.6 Modern private fields with #
---------------------------------------------------------------------------- */

/*
This is real language-level private state.
Outside code cannot access it.
*/

class CounterWithPrivateField {
    #count = 0;

    increment() {
        this.#count++;
    }

    getCount() {
        return this.#count;
    }
}

const counter5 = new CounterWithPrivateField();
counter5.increment();

console.log("Private field #:", counter5.getCount()); // 1
// console.log(counter5.#count); // SyntaxError
console.log("Direct public-style access:", counter5.count); // undefined


/* ----------------------------------------------------------------------------
1.7 Private methods with #
---------------------------------------------------------------------------- */

/*
Not only data, even methods can be private.
This is stronger encapsulation.
*/

class BankAccount {
    #balance = 0;

    deposit(amount) {
        this.#validateAmount(amount);
        this.#balance += amount;
    }

    withdraw(amount) {
        this.#validateAmount(amount);

        if (amount > this.#balance) {
            throw new Error("Insufficient balance");
        }

        this.#balance -= amount;
    }

    getBalance() {
        return this.#balance;
    }

    #validateAmount(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            throw new Error("Invalid amount");
        }
    }
}

const account1 = new BankAccount();
account1.deposit(500);
account1.withdraw(200);
console.log("Private method + private field:", account1.getBalance()); // 300

/*
Summary of encapsulation forms in JS:

1. Closure-based privacy
2. Constructor closure-based privacy
3. Prototype-based structure, but public state
4. _property convention, not real privacy
5. WeakMap-based privacy
6. #private fields, modern real privacy
7. #private methods, modern private behavior
*/


/* ============================================================================
2. ABSTRACTION
============================================================================ */

/*
Abstraction means:

Expose only the essential things.
Hide internal complexity.

In simple words:
user of the object should know WHAT to use,
not HOW it works internally.

Example:
When you call car.start(), you do not care about
fuel injection, spark timing, engine cycle, etc.
*/


/* ----------------------------------------------------------------------------
2.1 Simple abstraction with public methods hiding internal steps
---------------------------------------------------------------------------- */

class CoffeeMachine {
    start() {
        this.#boilWater();
        this.#brewCoffee();
        this.#pourIntoCup();
        console.log("Coffee is ready");
    }

    #boilWater() {
        console.log("Boiling water...");
    }

    #brewCoffee() {
        console.log("Brewing coffee...");
    }

    #pourIntoCup() {
        console.log("Pouring into cup...");
    }
}

const machine = new CoffeeMachine();
machine.start();

/*
Abstraction here:
- user only calls start()
- internal steps are hidden
- complexity is reduced
*/


/* ----------------------------------------------------------------------------
2.2 Real-world style abstraction example
---------------------------------------------------------------------------- */

class PaymentProcessor {
    pay(amount) {
        this.#validateAmount(amount);
        this.#authenticate();
        this.#debit(amount);
        this.#logTransaction(amount);

        console.log(`Payment of ${amount} successful`);
    }

    #validateAmount(amount) {
        if (amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }
    }

    #authenticate() {
        console.log("Authenticating user...");
    }

    #debit(amount) {
        console.log(`Debiting ${amount} from account...`);
    }

    #logTransaction(amount) {
        console.log(`Logging payment of ${amount}...`);
    }
}

const payment = new PaymentProcessor();
payment.pay(1000);

/*
User only knows:
- call pay(1000)

User does not care about:
- validation flow
- auth
- logging
- internal debit mechanics

That is abstraction.
*/


/* ----------------------------------------------------------------------------
2.3 Abstraction using factory function
---------------------------------------------------------------------------- */

function createVideoPlayer() {
    let isPlaying = false;

    function loadCodec() {
        console.log("Loading codec...");
    }

    function prepareBuffer() {
        console.log("Preparing video buffer...");
    }

    return {
        play() {
            if (!isPlaying) {
                loadCodec();
                prepareBuffer();
                isPlaying = true;
                console.log("Video started");
            }
        },
        pause() {
            if (isPlaying) {
                isPlaying = false;
                console.log("Video paused");
            }
        },
    };
}

const player = createVideoPlayer();
player.play();
player.pause();

/*
Again abstraction:
- outside user only sees play() and pause()
- hidden internal work stays hidden
*/


/* ============================================================================
3. INHERITANCE
============================================================================ */

/*
Inheritance means:

One object/class can reuse properties and methods
from another object/class.

In JS, inheritance is prototype-based.

That means:
an object can delegate lookup to another object through [[Prototype]].
*/


/* ----------------------------------------------------------------------------
3.1 Old style inheritance with constructor functions
---------------------------------------------------------------------------- */

function Animal(name) {
    this.name = name;
}

Animal.prototype.eat = function () {
    console.log(`${this.name} is eating`);
};

function Dog(name, breed) {
    Animal.call(this, name); // borrow parent constructor logic
    this.breed = breed;
}

/*
Make Dog inherit from Animal.prototype

Dog.prototype should be an object whose prototype is Animal.prototype
*/
Dog.prototype = Object.create(Animal.prototype);

/*
Fix constructor reference.
Otherwise constructor would point to Animal.
*/
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
    console.log(`${this.name} is barking`);
};

const dog1 = new Dog("Tommy", "Labrador");
dog1.eat(); // inherited
dog1.bark(); // own
console.log("dog1 instanceof Dog:", dog1 instanceof Dog); // true
console.log("dog1 instanceof Animal:", dog1 instanceof Animal); // true

/*
Important note:

Animal.call(this, name)
only copies the constructor logic, like assigning own properties.

It does NOT copy Animal.prototype methods.

That is why we also do:
Dog.prototype = Object.create(Animal.prototype)

Without that line, dog1.eat() would not exist through prototype inheritance.
*/


/* ----------------------------------------------------------------------------
3.2 Modern class inheritance
---------------------------------------------------------------------------- */

class AnimalClass {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(`${this.name} is eating`);
    }
}

class Cat extends AnimalClass {
    constructor(name, color) {
        super(name); // calls parent constructor
        this.color = color;
    }

    meow() {
        console.log(`${this.name} says meow`);
    }
}

const cat1 = new Cat("Milo", "white");
cat1.eat(); // inherited from AnimalClass
cat1.meow(); // own method

/*
Important:
class + extends looks like classical inheritance,
but under the hood it still uses prototype chains.
*/


/* ----------------------------------------------------------------------------
3.3 Direct prototype inheritance with plain objects
---------------------------------------------------------------------------- */

/*
This is very raw JS style.
No class, no constructor, just object delegation.
*/

const animalBase = {
    eat() {
        console.log(`${this.name} is eating`);
    },
};

const rabbit = Object.create(animalBase);
rabbit.name = "Bunny";

rabbit.eat(); // Bunny is eating

/*
Here rabbit directly delegates to animalBase via prototype chain.
This is the most JS-native inheritance style.
*/


/* ============================================================================
4. POLYMORPHISM
============================================================================ */

/*
Polymorphism means:

same method name,
different behavior depending on the object.

In simple words:
same interface, different implementation.
*/


/* ----------------------------------------------------------------------------
4.1 Method overriding
---------------------------------------------------------------------------- */

class Shape {
    draw() {
        console.log("Drawing a generic shape");
    }
}

class Circle extends Shape {
    draw() {
        console.log("Drawing a circle");
    }
}

class Rectangle extends Shape {
    draw() {
        console.log("Drawing a rectangle");
    }
}

const shapes = [new Shape(), new Circle(), new Rectangle()];

for (const shape of shapes) {
    shape.draw();
}

/*
Same method call:
- shape.draw()

Different output depending on actual object.
That is polymorphism.
*/


/* ----------------------------------------------------------------------------
4.2 Polymorphism in practical code
---------------------------------------------------------------------------- */

class PaymentMethod {
    pay(amount) {
        console.log(`Paying ${amount} using generic payment method`);
    }
}

class CreditCardPayment extends PaymentMethod {
    pay(amount) {
        console.log(`Paying ${amount} using credit card`);
    }
}

class UpiPayment extends PaymentMethod {
    pay(amount) {
        console.log(`Paying ${amount} using UPI`);
    }
}

class WalletPayment extends PaymentMethod {
    pay(amount) {
        console.log(`Paying ${amount} using wallet`);
    }
}

const paymentMethods = [
    new CreditCardPayment(),
    new UpiPayment(),
    new WalletPayment(),
];

for (const method of paymentMethods) {
    method.pay(500);
}

/*
Caller can just do:
method.pay(500)

and each object behaves differently.
That is polymorphism.
*/


/* ----------------------------------------------------------------------------
4.3 Polymorphism with shared interface idea, not strict interface keyword
---------------------------------------------------------------------------- */

/*
Java/C# has interface keyword.
JS does not enforce interfaces like that natively.

But JS often uses duck typing:
"If it has the required method, use it."
*/

class DogSound {
    speak() {
        console.log("Woof");
    }
}

class CatSound {
    speak() {
        console.log("Meow");
    }
}

class HumanSound {
    speak() {
        console.log("Hello");
    }
}

function makeItSpeak(entity) {
    entity.speak();
}

makeItSpeak(new DogSound());
makeItSpeak(new CatSound());
makeItSpeak(new HumanSound());

/*
This is also polymorphism in JS style.
No strict interface,
just common behavior contract.
*/


/* ============================================================================
5. PROTOTYPE IN JAVASCRIPT
============================================================================ */

/*
This part is very important.

JS is prototype-based.

That means objects inherit from other objects through a prototype chain.

When you try to access:

obj.someProp

JS looks in this order:

1. Does obj itself have someProp?
2. If not, check obj.[[Prototype]]
3. If not found there, check next prototype up the chain
4. Continue until null
*/


/* ----------------------------------------------------------------------------
5.1 Simple prototype lookup
---------------------------------------------------------------------------- */

const animalProto = {
    eat() {
        console.log("Eating...");
    },
};

const dogProtoObj = Object.create(animalProto);
dogProtoObj.bark = function () {
    console.log("Barking...");
};

const pet = Object.create(dogProtoObj);

pet.eat(); // found via prototype chain
pet.bark(); // found via prototype chain

console.log("Own property eat?", pet.hasOwnProperty("eat")); // false
console.log("Own property bark?", pet.hasOwnProperty("bark")); // false

/*
pet --> dogProtoObj --> animalProto --> null
*/


/* ----------------------------------------------------------------------------
5.2 Constructor function and what new does internally
---------------------------------------------------------------------------- */

/*
Every normal function intended as constructor has a .prototype object.

When we do:
new Person("Soumya")

internally roughly this happens:
*/

function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function () {
    console.log(`Hi, I am ${this.name}`);
};

const person1 = new Person("Soumya");
person1.sayHi();

/*
When you use the new keyword, JavaScript follows a specific internal ritual.

const person1 = new Person("Soumya")

Step 1: Object birth
A brand new empty object is created.

Roughly:
const obj = {}

Step 2: Prototype linking
Before constructor code runs, JS links that object's internal [[Prototype]]
to Person.prototype.

Roughly:
Object.setPrototypeOf(obj, Person.prototype)

So now obj can access shared methods like sayHi through prototype chain.

Step 3: Constructor call with this binding
JS executes the Person function and forces this to point to that new object.

Roughly:
Person.call(obj, "Soumya")

Inside constructor:
this.name = name

So now obj becomes:
{
  name: "Soumya"
}

Step 4: Implicit return
If constructor does not explicitly return another object,
JS automatically returns that newly created obj.

So:

const person1 = new Person("Soumya")

is conceptually close to:

function simulateNew(Constructor, ...args) {
    const obj = {};
    Object.setPrototypeOf(obj, Constructor.prototype);
    const result = Constructor.call(obj, ...args);

    if (result !== null && (typeof result === "object" || typeof result === "function")) {
        return result;
    }

    return obj;
}

Again, this is not the exact engine code,
but this is the correct mental model.
*/


/* ----------------------------------------------------------------------------
5.3 Why shared methods should go on prototype
---------------------------------------------------------------------------- */

/*
If you define methods inside constructor using this.sayHi = function () {},
then every instance gets its own copy.

If you define methods on prototype,
all instances share the same method in memory.
*/

function User(name) {
    this.name = name;

    this.sayHelloOwn = function () {
        console.log(`Hello from own method, ${this.name}`);
    };
}

User.prototype.sayHelloShared = function () {
    console.log(`Hello from shared prototype method, ${this.name}`);
};

const u1 = new User("Soumya");
const u2 = new User("Aman");

console.log("Own methods same?", u1.sayHelloOwn === u2.sayHelloOwn); // false
console.log("Prototype methods same?", u1.sayHelloShared === u2.sayHelloShared); // true

u1.sayHelloOwn();
u1.sayHelloShared();


/* ----------------------------------------------------------------------------
5.4 prototype vs [[Prototype]] vs __proto__
---------------------------------------------------------------------------- */

/*
These three are related, but not the same.

1. prototype
- exists on constructor functions
- used while creating instances with new
- becomes the [[Prototype]] of created objects

2. [[Prototype]]
- internal hidden link present on objects
- JS engine uses this for prototype lookup
- not directly accessible with this exact syntax in normal code

3. __proto__
- historical getter/setter to access object's [[Prototype]]
- mostly avoid in real code
- use Object.getPrototypeOf / Object.setPrototypeOf instead
*/

console.log(
    "Person.prototype === Object.getPrototypeOf(person1):",
    Person.prototype === Object.getPrototypeOf(person1)
); // true

console.log(
    "person1.__proto__ === Person.prototype:",
    person1.__proto__ === Person.prototype
); // true

/*
So:

Person.prototype
    is the object used as prototype for instances created by new Person()

person1.[[Prototype]]
    is the hidden internal link pointing to Person.prototype

person1.__proto__
    is the old exposed way to access that hidden link

Best practice:
- read prototype with Object.getPrototypeOf(obj)
- set prototype with Object.setPrototypeOf(obj)
*/


/* ----------------------------------------------------------------------------
5.5 What Object.setPrototypeOf does
---------------------------------------------------------------------------- */

/*
Object.setPrototypeOf(obj, proto)
changes the internal [[Prototype]] of obj to proto.

Example:
*/

const baseUser = {
    greet() {
        console.log(`Hello, I am ${this.name}`);
    },
};

const member = {
    name: "Soumya",
};

Object.setPrototypeOf(member, baseUser);

member.greet(); // Hello, I am Soumya

/*
Now lookup works like:

member -> baseUser -> Object.prototype -> null

Important:
- it changes the prototype of an existing object
- it works, but usually Object.create(proto) is preferred while creating objects
- changing prototype later can be slower and less clean
*/


/* ----------------------------------------------------------------------------
5.6 Prototype chain with built-in objects
---------------------------------------------------------------------------- */

const arr = [1, 2, 3];

console.log("arr has push?", typeof arr.push); // function

/*
Why can arr.push() work?

Because:
arr itself does not store push as own property.

JS looks up:
arr -> Array.prototype -> Object.prototype -> null

push exists on Array.prototype
*/

console.log("Own push?", arr.hasOwnProperty("push")); // false
console.log(
    "Prototype is Array.prototype:",
    Object.getPrototypeOf(arr) === Array.prototype
); // true


/* ----------------------------------------------------------------------------
5.7 The Constructor Approach vs Pure Prototypal Approach
---------------------------------------------------------------------------- */

/*
new Parent()

This is constructor-based object creation.

It does 4 things:

creates a new empty object
links its [[Prototype]] to:
Parent.prototype
executes the constructor:
Parent.call(newObj)

with this = newObj

So constructor logic runs:

this.name = "Soumya"
this.age = 25

etc.

returns the object
(unless constructor explicitly returns another object)
*/

function Dev(name) {
    this.name = name;
}

Dev.prototype.greet = function() {
    console.log(`Hi, I'm ${this.name}`);
};

const meNew = new Dev('Soumya'); 
// Result: { name: 'Soumya' } with proto link to Dev.prototype

/*
Object.create(parent)

This is pure prototype delegation.

It does basically:

creates a new empty object
links its [[Prototype]] directly to:
parent
returns it

That's it.

No constructor runs.

No this

No initialization logic.
*/

const devProto = {
    greet: function() {
        console.log(`Hi, I'm ${this.name}`);
    }
};

const meCreate = Object.create(devProto);
meCreate.name = 'Soumya'; 
// Result: {} (empty object) with proto link to devProto


/* ============================================================================
6. CLASS IN JAVASCRIPT IS MOSTLY SYNTACTIC SUGAR
============================================================================ */

/*
When we write modern class syntax, JS still uses prototypes underneath.

Example:
*/

class UserClass {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log(`Hi, I am ${this.name}`);
    }
}

const user2 = new UserClass("Soumya");
user2.sayHi();

/*
What happens conceptually?

class UserClass {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi, I am ${this.name}`);
  }
}

is roughly similar to:
*/

function UserFunction(name) {
    this.name = name;
}

UserFunction.prototype.sayHi = function () {
    console.log(`Hi, I am ${this.name}`);
};

const user3 = new UserFunction("Soumya");
user3.sayHi();

/*
Not exactly identical in every internal rule,
but very close conceptually.

That is why people say:
"class is syntactic sugar over prototype"
*/


/* ----------------------------------------------------------------------------
6.1 Proof that class methods live on prototype
---------------------------------------------------------------------------- */

class Demo {
    constructor(value) {
        this.value = value;
    }

    show() {
        console.log(this.value);
    }
}

const demo1 = new Demo(10);
const demo2 = new Demo(20);

console.log("Own method on instance?", demo1.hasOwnProperty("show")); // false
console.log(
    "Method on prototype?",
    Object.getPrototypeOf(demo1).hasOwnProperty("show")
); // true
console.log("Shared same method?", demo1.show === demo2.show); // true

/*
So class methods are shared through prototype,
not recreated per instance.

That is why class/prototype methods are memory efficient.
*/


/* ----------------------------------------------------------------------------
6.2 Important differences between class and constructor function
---------------------------------------------------------------------------- */

/*
Even though class is mostly prototype sugar, there are some real differences in behavior:

1. class constructors cannot be called without new
2. class methods are non-enumerable
3. class body runs in strict mode
4. extends / super give cleaner inheritance syntax
5. #private fields are class-only modern feature
*/


/* ============================================================================
7. HOW TO CONNECT THE 4 PILLARS TO JS PROPERLY
============================================================================ */

/*
Encapsulation
- hide and control data access
- closures, WeakMap, #private fields

Abstraction
- expose simple API, hide internal complexity
- public methods hiding internal details

Inheritance
- reuse behavior through prototype chain
- extends, Object.create, constructor prototype chaining

Polymorphism
- same method name, different behavior
- method overriding, duck typing
*/


/* ============================================================================
8. PRACTICAL MINI EXAMPLE WITH ALL 4 PILLARS TOGETHER
============================================================================ */

class Employee {
    #salary;

    constructor(name, salary) {
        this.name = name;
        this.#salary = salary; // encapsulation
    }

    /*
    abstraction:
    outside code should call work()
    internal implementation differs by subclass
    */
    work() {
        console.log(`${this.name} is doing generic work`);
    }

    getSalary() {
        return this.#salary;
    }
}

class Developer extends Employee {
    constructor(name, salary, language) {
        super(name, salary);
        this.language = language;
    }

    /*
    polymorphism through overriding
    */
    work() {
        console.log(`${this.name} is writing ${this.language} code`);
    }
}

class Designer extends Employee {
    work() {
        console.log(`${this.name} is designing interfaces`);
    }
}

const employees = [
    new Developer("Soumya", 100000, "JavaScript"),
    new Designer("Aman", 80000),
];

for (const emp of employees) {
    emp.work(); // polymorphism
    console.log(`${emp.name}'s salary:`, emp.getSalary()); // abstraction + encapsulation
}

/*
What happened here?

Encapsulation:
- #salary is private

Abstraction:
- users just call work() and getSalary()

Inheritance:
- Developer and Designer inherit from Employee

Polymorphism:
- same work() method behaves differently
*/


/* ============================================================================
9. FINAL TAKEAWAYS
============================================================================ */

/*
1. JavaScript is prototype-based, not class-based internally.

2. OOP in JS is real, but implemented in JS style.

3. Encapsulation in JS can be done in many ways:
   - closure
   - constructor closure
   - WeakMap
   - #private fields
   - convention-based pseudo privacy

4. Abstraction means:
   show simple API, hide complex internal implementation

5. Inheritance in JS means:
   object delegation through prototype chain

6. Polymorphism means:
   same method name, different behavior

7. class in JS is cleaner syntax, but under the hood prototypes still matter.

8. new does 4 main things:
   - creates object
   - links prototype
   - calls constructor with this
   - returns the object unless another object is explicitly returned
*/


/* ============================================================================
10. QUICK INTERVIEW NOTES
============================================================================ */

/*
Q: Is class in JS a real class like Java?
A:
Not exactly.
It gives class-like syntax, but underneath JS still uses prototypes.

Q: Is prototype same as __proto__?
A:
No.
- prototype belongs to constructor functions
- __proto__ / [[Prototype]] belongs to object instances

Q: Which is the best modern way for private data?
A:
#private fields

Q: Which is the most JS-native inheritance model?
A:
Prototype delegation

Q: Can JS do polymorphism without interfaces?
A:
Yes, through method overriding and duck typing.

Q: What does new do internally?
A:
- creates a fresh object
- links its [[Prototype]] to Constructor.prototype
- calls constructor with this bound to that object
- returns that object unless constructor returns another object
*/


/* ============================================================================
11. VERY SHORT MENTAL MODEL
============================================================================ */

/*
Object data hiding         -> Encapsulation
Hide complexity            -> Abstraction
Reuse behavior             -> Inheritance
Same method, diff behavior -> Polymorphism

class syntax  -> cleaner OOP syntax
prototype     -> real underlying delegation mechanism
new keyword   -> object creation + this binding + prototype wiring
*/