# What is Prototypal Inheritance?

Interview Answer:

Prototypal inheritance is JavaScript's mechanism for allowing objects to
inherit properties and methods from other objects through the prototype
chain.

Basically, when we access a property or method on an object, JavaScript
first checks the object itself. If it doesn't find it there, it looks at
the object's prototype. If it is still not found, JavaScript continues
searching up the prototype chain until it finds the property or reaches
null.

This allows objects to share and reuse common methods instead of creating
separate copies of those methods for every object.


Example:

const person = {
    greet() {
        console.log("Hello");
    }
};

const user = Object.create(person);

user.greet(); // Hello


Here, user does not directly contain the greet() method.

JavaScript checks:

user
  ↓
person
  ↓
Object.prototype
  ↓
null

It finds greet() in person and executes it.

So, user inherits greet() from person.


---------------------------------------------------------------------
What is a Prototype?
---------------------------------------------------------------------

A prototype is an object from which another object can inherit properties
and methods.

In JavaScript, objects have an internal prototype link that allows
JavaScript to search for inherited properties and methods.

For example:

const person = {
    greet() {
        console.log("Hello");
    }
};

const user = Object.create(person);

user.greet();


Here:

person → contains the shared method
user   → inherits that method through its prototype link


---------------------------------------------------------------------
prototype vs __proto__
---------------------------------------------------------------------

This is an important interview distinction.

prototype →  A prototype is an object from which another object can inherit properties
and methods.
              It is the object where we normally define shared methods.

__proto__  → the prototype link of an individual object.
              It points to that object's prototype.

Example:

function User(name) {
    this.name = name;
}

User.prototype.greet = function () {
    console.log("Hello " + this.name);
};

const user = new User("Ajay");


Here:

User.prototype
    ↓
contains the shared greet() method


user.__proto__
    ↓
points to User.prototype


So the important relationship is:

user
  ↓ __proto__
User.prototype
  ↓
constructor → User


A simple way to remember:

constructor → factory/blueprint for creating objects
prototype   → shared toolbox containing common methods
__proto__   → link from an object to that shared toolbox


Important:

A normal object does not normally have its own "prototype" property.

const obj = {};

console.log(obj.prototype);
// undefined

But the object has a prototype link:

obj.__proto__


This is because prototype is mainly associated with constructor
functions, while __proto__ represents the prototype link of an object.


---------------------------------------------------------------------
Prototype Chain
---------------------------------------------------------------------

The prototype chain is the sequence of objects JavaScript searches when
looking for a property or method.

Typical flow:

object
  ↓
object's prototype
  ↓
Object.prototype
  ↓
null


JavaScript checks in this order:

1. It checks the object itself.
2. If not found, it checks its prototype.
3. It continues through the prototype chain.
4. If it reaches null without finding the property, the result is
   usually undefined.


Example:

const arr = [1, 2, 3];

arr.push(4);


push() is not stored directly inside the arr object.

JavaScript searches:

arr
 ↓
Array.prototype
 ↓
Object.prototype
 ↓
null

It finds push() in Array.prototype.

This is a practical example of prototype inheritance.


---------------------------------------------------------------------
Prototype Sharing and Memory Optimization
---------------------------------------------------------------------

One important reason prototypes are useful is that methods can be shared
instead of being duplicated for every object.

Without sharing:

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

arr1.sayHello = function () {
    console.log("Hello");
};

arr1.sayHello(); // Hello

arr2.sayHello(); // Error


The method exists only on arr1.

If we created the same method separately for many objects, we would have
multiple copies of the same function.

With a prototype:

Array.prototype.sayHello = function () {
    console.log("Hello from prototype");
};

arr1.sayHello();
arr2.sayHello();


Both arrays can access the same method through Array.prototype.

The lookup is:

arr1 → Array.prototype → Object.prototype → null

arr2 → Array.prototype → Object.prototype → null


So prototypes provide:

- Shared methods
- Code reuse
- No unnecessary duplication of methods
- Better memory efficiency


Important: The method is not copied into arr1 or arr2. JavaScript searches
the prototype chain and finds the shared method there.


---------------------------------------------------------------------
Object.create()
---------------------------------------------------------------------

Object.create() is a direct way to create an object with a specified
prototype.

Example:

const person = {
    greet() {
        console.log("Hello");
    }
};

const user = Object.create(person);

user.greet(); // Hello


Here, user is created as an object whose direct prototype is person.

So:

user → person


Another example:

const employee = {
    greet(name) {
        this.name = name;
        console.log("Hello " + this.name);
    }
};

const user = Object.create(employee);

user.greet("Ajay");
// Hello Ajay


Object.create() is useful when we specifically want to create an object
with another object as its prototype.


---------------------------------------------------------------------
Object.getPrototypeOf()
---------------------------------------------------------------------

Object.getPrototypeOf() returns the immediate/direct prototype of an
object.

Syntax:

Object.getPrototypeOf(value)


Example:

const person = {
    greet() {
        console.log("Hello");
    }
};

const user = Object.create(person);

console.log(Object.getPrototypeOf(user) === person);
// true


Important: It returns only the direct prototype, not the entire
prototype chain.


For example:

const arr = [1, 2, 3];

console.log(Object.getPrototypeOf(arr));
// Array.prototype


For a string:

const str = "hello";

console.log(Object.getPrototypeOf(str));
// String.prototype


Ways you may see for working with prototypes:

1. __proto__
2. Object.getPrototypeOf()
3. Object.setPrototypeOf()


In modern code, Object.getPrototypeOf() is preferred for reading the
prototype because __proto__ is an older accessor and direct manipulation
of it is generally discouraged.


---------------------------------------------------------------------
Constructor and Prototype
---------------------------------------------------------------------

A constructor function can act as a blueprint for creating multiple
objects.

Example:

function User(name) {
    this.name = name;
}

User.prototype.greet = function () {
    console.log("Hello " + this.name);
};

const u1 = new User("Ajay");
const u2 = new User("Rahul");

u1.greet(); // Hello Ajay
u2.greet(); // Hello Rahul


Here:

User() → constructor function / blueprint
new     → creates a new object
this    → refers to the newly created object
User.prototype → stores the shared greet() method


The important point is that greet() is not copied into every object.

Instead:

u1.__proto__ → User.prototype
u2.__proto__ → User.prototype


So both objects can access the same shared method.


---------------------------------------------------------------------
constructor Property
---------------------------------------------------------------------

The constructor property refers back to the function that created the
object.

Example:

function User() {}

const u1 = new User();

console.log(u1.constructor === User);
// true


The relationship can be understood as:

u1
 ↓ __proto__
User.prototype
 ↓
constructor
 ↓
User


So:

__proto__   → connects the object to its prototype
prototype   → contains shared methods for objects created by the
              constructor
constructor → points back to the constructor function


---------------------------------------------------------------------
Classes and Prototypal Inheritance
---------------------------------------------------------------------

ES6 introduced class syntax, which makes inheritance look more like
traditional class-based programming.

Example:

class Person {
    greet() {
        console.log("Hello");
    }
}

class Student extends Person {
}


const student = new Student();

student.greet(); // Hello


Even though we use class and extends syntax, JavaScript's underlying
inheritance mechanism is still prototype-based.

So:

class → cleaner syntax for working with objects and inheritance
extends/super → convenient syntax for inheritance
prototype → actual mechanism behind JavaScript's object inheritance


---------------------------------------------------------------------
Complete Mental Model
---------------------------------------------------------------------

function User(name) {
    this.name = name;
}

User.prototype.greet = function () {
    console.log("Hello " + this.name);
};

const user = new User("Ajay");


Think of it like this:

User
 ↓
constructor function / blueprint

User.prototype
 ↓
shared toolbox containing greet()

user
 ↓
actual object created using new

user.__proto__
 ↓
links to User.prototype


When we call:

user.greet();


JavaScript effectively searches:

user
 ↓
User.prototype  → greet() found
 ↓
execute greet()


If greet() were not there, JavaScript would continue searching higher
in the prototype chain.


---------------------------------------------------------------------
Key Interview Points
---------------------------------------------------------------------

- JavaScript uses prototype-based inheritance.
- Objects can inherit properties and methods from other objects.
- The prototype chain is used for property and method lookup.
- JavaScript first checks the object itself, then its prototype.
- The search continues until the property is found or the chain reaches
  null.
- prototype is associated with constructor functions and is commonly used
  to store shared methods.
- __proto__ is the prototype link from an object to its prototype.
- constructor refers to the function that created the object.
- Object.create() creates an object with a specified prototype.
- Object.getPrototypeOf() returns an object's direct prototype.
- Prototype methods are shared rather than copied into every object.
- This provides code reuse and helps avoid unnecessary method duplication.
- Array.prototype is why arrays can access methods such as push(), map(),
  filter(), etc.
- Object.prototype is near the top of the normal object prototype chain.
- The chain eventually ends at null.
- ES6 classes provide cleaner syntax, but internally JavaScript still
  uses prototypes for inheritance.


---------------------------------------------------------------------
Interview-Ready Answer
---------------------------------------------------------------------

"Prototypal inheritance is JavaScript's mechanism for allowing objects to
inherit properties and methods from other objects through the prototype
chain. When I access a property or method, JavaScript first checks the
object itself, and if it isn't there, it searches its prototype and
continues up the chain until it finds it or reaches null.

For example, if I create multiple objects using a constructor function,
I can put their common methods on the constructor's prototype. The
objects don't get separate copies of those methods; instead, their
prototype link points to the shared prototype object. This gives us
code reuse and better memory efficiency.

Also, prototype and __proto__ are different: prototype is the shared
object associated with a constructor function, while __proto__ is the
link from an object to its prototype."

# What is localStorage?


localStorage is a browser storage mechanism used to store data as key-value pairs on the user's device.

The important point is that the data stays even after the browser is closed, and it remains there until we explicitly remove it or the user clears the browser data.

Example:

localStorage.setItem("username", "Ajay");

const username = localStorage.getItem("username");

console.log(username); // Ajay

To remove data:

localStorage.removeItem("username");

To remove everything:

localStorage.clear();

Important Points:

- Stores data as key-value pairs.
- Values are stored as strings.
- Data persists across browser sessions.
- Data remains even after closing and reopening the browser.
- Commonly used for non-sensitive client-side data such as theme preferences or simple application state.
- Sensitive information such as passwords or authentication secrets should generally not be stored here because JavaScript can access localStorage.


# What is sessionStorage?

Interview Answer:

sessionStorage is a browser-based storage mechanism that stores data as key-value pairs, but the data is associated with a particular browser tab or window session.

The main difference from localStorage is that sessionStorage data is removed when that tab or window is closed.

Example:

sessionStorage.setItem("username", "Ajay");

const username = sessionStorage.getItem("username");

console.log(username); // Ajay

To remove data:

sessionStorage.removeItem("username");

To clear all session storage:

sessionStorage.clear();

Important Points:

- Stores data as key-value pairs.
- Values are stored as strings.
- Data survives page refreshes within the same tab.
- Data is normally removed when the tab/window session ends.
- Different tabs have separate sessionStorage areas.
- Like localStorage, it should not be treated as secure storage for sensitive data.


# What are cookies?

Interview Answer:

Cookies are small pieces of data stored by the browser and associated with a website.

The important difference is that cookies can be automatically sent with HTTP requests to the server when their domain and path rules match.

For example, a server can send:

Set-Cookie: sessionId=abc123

The browser stores it and can send it back with later requests:

Cookie: sessionId=abc123

JavaScript can also create a cookie:

document.cookie = "username=Ajay";

Common Cookie Attributes:

Expires / Max-Age → controls lifetime
Path              → controls where it applies
Domain            → controls which domain can receive it
Secure            → sends it only over HTTPS
HttpOnly          → prevents JavaScript from accessing it
SameSite          → controls cross-site cookie sending

HttpOnly is important for security because JavaScript cannot read an HttpOnly cookie through document.cookie.

Cookies are commonly used for sessions, authentication state, and server-side user tracking/preferences, depending on the application's design.


# What is the difference between localStorage, sessionStorage, and cookies?


Interview Answer:

"The main difference is in how long the data lives, where it is scoped, and whether it is automatically sent to the server.

localStorage persists until it is explicitly removed, while sessionStorage lasts for the browser tab session and is normally cleared when that tab is closed.

Cookies are different because they can be automatically included in HTTP requests to the server, and they support attributes such as HttpOnly, Secure, and SameSite."


Comparison:

                     localStorage       sessionStorage       Cookies
---------------------------------------------------------------------------
Storage type         Key-value          Key-value             Key-value
                     strings            strings               strings

Lifetime             Persists until     Until the tab/        Controlled by
                     removed/cleared    window session ends    expiry/Max-Age

Page refresh         Data remains       Data remains           Data remains

Tab close            Data remains       Data removed          Depends on expiry

Across tabs          Shared for same    Separate per tab      Depends on
                     origin             session               cookie scope

Sent to server       No                 No                    Yes, automatically
                                                               when applicable

JavaScript access    Yes                Yes                   Usually yes,
                                                               unless HttpOnly

Common use           Preferences,       Temporary tab         Sessions,
                     simple client      data, form/state       authentication
                     data               during a session      cookies, etc.


Important Interview Point:

localStorage and sessionStorage are mainly client-side storage mechanisms,
whereas cookies are primarily designed to be sent between the browser and
server along with HTTP requests.

Also, none of these should be treated as a general-purpose secure storage
mechanism for sensitive secrets. Data accessible to JavaScript can
potentially be exposed if the application has an XSS vulnerability.

# What is debouncing?

Interview Answer:

Debouncing is a technique used to limit how often a function is executed when an event happens repeatedly.

Basically, instead of executing the function every time the event occurs, we wait for a certain amount of time after the last event. If the event happens again during that time, the timer is reset.

So, the function executes only when the user stops triggering the event for the specified delay.

Example:

function debounce(callback, delay) {
    let timer;

    return function () {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback();
        }, delay);
    };
}

const search = debounce(() => {
    console.log("API call");
}, 500);

search();


Real-world example:

Suppose we have a search box and the user types:

A → Aj → Aja → Ajay

Without debouncing, we might make an API call for every keystroke.

With debouncing, we wait until the user stops typing for 500ms, and then make one API call.

Common use cases:

- Search input / live search
- Auto-save
- Form validation
- Resize events when we only need the final result


Easy way to remember:

Debounce = "Wait until the activity stops."


# What is throttling?

Interview Answer:

Throttling is a technique used to ensure that a function executes at most once within a specified time interval, even if the event keeps happening continuously.

For example, if an event fires hundreds of times within a second and our throttle interval is 500ms, the function will execute at most once every 500ms.

Example:

function throttle(callback, delay) {
    let lastCall = 0;

    return function () {
        const now = Date.now();

        if (now - lastCall >= delay) {
            lastCall = now;
            callback();
        }
    };
}

const handleScroll = throttle(() => {
    console.log("Scroll event handled");
}, 500);

handleScroll();


Real-world example:

Suppose the user continuously scrolls a webpage.

The scroll event can fire many times while the user is scrolling. We don't want to run expensive logic for every single event.

With throttling, we can allow the function to run only once every 500ms while scrolling continues.

Common use cases:

- Scroll events
- Mouse movement
- Window resize
- Tracking user activity
- Continuous events where we need regular updates


Easy way to remember:

Throttle = "Run at a controlled rate."


# What is the difference between debouncing and throttling?

Interview Answer:

"The main difference is when the function is executed.

Debouncing waits until the event stops occurring and then executes the function.

Throttling allows the function to execute at a controlled interval while the event is continuously occurring."


Comparison:

                     Debouncing                    Throttling
---------------------------------------------------------------------------
Execution            After the activity stops      At regular intervals
                     for the specified delay       while activity continues

Main idea             Wait for the last event      Limit execution frequency

Example               Search input                 Scroll event

User typing           A → Aj → Aja → Ajay          Not usually the best use

API calls              Usually one call after       Calls can happen
                       user stops typing             periodically

Best for               Search, auto-save,           Scroll, mouse movement,
                       final validation             resize, continuous events


Simple example:

Debouncing:

User types continuously
A → Aj → Aja → Ajay
                    ↓
              stops for 500ms
                    ↓
               Function runs


Throttling:

Event keeps happening
|---|---|---|---|---|---|---|---|
    ↓       ↓       ↓       ↓
  Run     Run     Run     Run
   every 500ms


Easy way to remember:

Debounce → "Wait until it stops."

Throttle → "Keep running, but control the rate."