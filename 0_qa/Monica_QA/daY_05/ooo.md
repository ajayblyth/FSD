TYPESCRIPT BASICS

====================================================================================================

WHAT IS TYPESCRIPT?

TypeScript lets you specify types explicitly.

Think:

TypeScript = JavaScript + Type Information

The JavaScript concepts are still there; TypeScript lets you describe what types of values you expect.

====================================================================================================

1. BASIC TYPESCRIPT OBJECT

Create app.ts:

const person: {
name: string;
age: number;
} = {
name: "Ajay",
age: 50
};

console.log(person.name);

Output:

Ajay

The important addition is:

name: string;
age: number;

This tells TypeScript what type of value each property should contain.

USUALLY, WE USE AN INTERFACE

interface Person {
name: string;
age?: number;   // age is optional
}

const person: Person = {
name: "Ajay",
age: 50
};

console.log(person.name);

Interfaces are useful when the same object structure needs to be reused.

====================================================================================================

2. HOW TO RUN .ts FILE

Unlike .js, Node doesn't traditionally execute TypeScript directly.

For simple practice, use tsx:

npm install -D tsx

Then:

npx tsx app.ts

FLOW:

app.ts
↓
npx tsx app.ts
↓
TypeScript executed
↓
Ajay

WHAT IS npx?

npx is mainly used to execute a package/CLI command.

npx tsx app.ts

npx  → execute
tsx  → tool/program
app.ts → file to execute

One clarification:

npx can also execute packages that aren't already installed locally by fetching them when needed.

Examples:

npx create-react-app ...
npx vite ...

But in modern projects, you'll commonly see:

npm install       → install dependencies
npm run ...       → run project scripts
npx ...            → execute CLI commands

====================================================================================================

3. TYPESCRIPT IN EVENTHUB

For your EventHub project, you'll see this same idea everywhere.

Interfaces/types define the shape of:

• Users
• Events
• Bookings
• API responses
• Request/response data
• Other application data

====================================================================================================

4. PRIMITIVE VALUES

let name: string = "Ajay";

let age: number = 31;

let isLoggedIn: boolean = true;

COMMON PRIMITIVE TYPES:

string
number
boolean
null
undefined
bigint
symbol

TYPE INFERENCE

Usually TypeScript can infer the type, so you don't always need to write it.

let name = "Ajay";  // inferred as string
let age = 31;       // inferred as number

====================================================================================================

5. ARRAY

ARRAY OF STRINGS

let fruits: string[] = ["Apple", "Mango", "Banana"];

ARRAY OF NUMBERS

let marks: number[] = [80, 90, 75];

ANOTHER SYNTAX

let fruits: Array<string> = ["Apple", "Mango"];

MOST COMMON:

string[]
number[]
boolean[]

====================================================================================================

6. OBJECT

You can explicitly define the shape of an object:

const person: {
name: string;
age: number;
} = {
name: "Ajay",
age: 31
};

For reusable object structures, use an interface:

interface Person {
name: string;
age: number;
}

const person: Person = {
name: "Ajay",
age: 31
};

This is very common in EventHub.

====================================================================================================

7. ARRAY OF OBJECTS

Very important for React/API work.

interface Person {
name: string;
age: number;
}

const people: Person[] = [
{
name: "Ajay",
age: 31
},
{
name: "Rahul",
age: 28
}
];

THINK:

Person  = shape of ONE person
Person[] = array containing MANY Person objects

====================================================================================================

8. FUNCTION PARAMETERS

You can specify the types of parameters:

function add(a: number, b: number) {
return a + b;
}

Here:

a → number
b → number

Calling:

add(10, 20); // 30

This would be an error:

add("10", "20");

because the function expects numbers.

====================================================================================================

9. FUNCTION RETURN TYPE

You can specify what a function returns:

function add(a: number, b: number): number {
return a + b;
}

The final:

: number

means:

"This function must return a number."

Another example:

function greet(name: string): string {
return `Hello ${name}`;
}

STRUCTURE:

function functionName(parameter: parameterType): returnType {
// ...
}

====================================================================================================

10. FUNCTION THAT RETURNS NOTHING

Use void:

function printName(name: string): void {
console.log(name);
}

void means the function doesn't return a value.

====================================================================================================

11. ARROW FUNCTIONS

Very common in React:

const add = (a: number, b: number): number => {
return a + b;
};

Shorter:

const add = (a: number, b: number): number => a + b;

====================================================================================================

12. OPTIONAL PROPERTIES

Sometimes an object property may or may not exist.

interface User {
name: string;
age: number;
phone?: string;
}

? means optional.

Both are valid:

const user: User = {
name: "Ajay",
age: 31
};

const user: User = {
name: "Ajay",
age: 31,
phone: "9999999999"
};

====================================================================================================

13. UNION TYPES

A value can have more than one possible type.

let id: string | number;

id = 101;
id = "ABC101";

Very common in real applications.

UNION WITH FIXED VALUES

let status: "pending" | "success" | "failed";

status = "success";

This means status can only be one of those three values.

status = "completed"; // Error

====================================================================================================

14. TYPE ALIAS

Instead of repeatedly writing a type, create a name for it.

type User = {
name: string;
age: number;
};

Then:

const user: User = {
name: "Ajay",
age: 31
};

INTERFACE vs TYPE

You can use either:

interface User {
name: string;
age: number;
}

OR:

type User = {
name: string;
age: number;
};

Both are extremely common.

====================================================================================================

15. TUPLE

A tuple is an array where the position and type are fixed.

let person: [string, number] = ["Ajay", 31];

Here:

position 0 → string
position 1 → number

Invalid:

let person: [string, number] = [31, "Ajay"];

You'll encounter tuples less frequently than normal arrays/objects.

====================================================================================================

16. any

let data: any = "Hello";

data = 10;
data = true;
data = {};

any basically tells TypeScript:

"Don't check this value's type."

It should generally be avoided when possible because it removes TypeScript's type safety.

====================================================================================================

17. unknown

let data: unknown;

data = "Hello";
data = 100;

Similar to any, but safer.

TypeScript won't let you blindly use an unknown value until you determine its type.

Common example when handling errors:

catch (error: unknown) {
// check what error actually is
}

KEY DIFFERENCE:

any     → TypeScript mostly stops checking
unknown → TypeScript requires you to check the type before using it

====================================================================================================

18. MOST IMPORTANT TYPES TO FOCUS ON

For React + Node + TypeScript, don't try to memorize everything at once.

Learn these really well:

1. Primitive types
   string, number, boolean

2. Arrays
   string[]
   User[]

3. Objects
   interface User { ... }

4. Functions
   (name: string): string

5. Optional properties
   phone?: string

6. Union types
   string | number

7. Type aliases
   type User = ...

8. void

9. unknown

====================================================================================================

19. COMBINING TYPES

This is where TypeScript starts becoming really useful.

Example:

interface Event {
title: string;
price: number;
tags: string[];
organizerId: string;
description?: string;
status: "DRAFT" | "PUBLISHED";
}

function createEvent(event: Event): Promise<Event> {
// ...
}

Here we're combining:

interface
↓
object shape

string
number
string[]
optional property
union type
Promise
function parameter type
function return type

The purpose is to describe the expected shape of your data so mistakes are caught before the code runs.

# ====================================================================================================

TYPE ASSERTION — as

IMPORTANT:

as string is called a Type Assertion in TypeScript.

It means:

"TypeScript, I know more about this value than you do. Treat this value as a string."

====================================================================================================

20. BASIC TYPE ASSERTION

const value = someValue as string;

Now TypeScript treats value as a string.

====================================================================================================

21. COMMON REAL EXAMPLE — DOM

Suppose:

const input = document.getElementById("name");

TypeScript doesn't know for sure that this element is an <input>.

It only knows it could be:

HTMLElement | null

You might write:

const input = document.getElementById("name") as HTMLInputElement;

You're telling TypeScript:

"I know this element is actually an input element."

Then:

console.log(input.value);

works because HTMLInputElement has a .value property.

FLOW:

document.getElementById("name")
↓
TypeScript isn't sure
↓
HTMLElement | null
↓
as HTMLInputElement
↓
TypeScript treats it as HTMLInputElement
↓
input.value

====================================================================================================

22. ANOTHER COMMON EXAMPLE — unknown

const userInput: unknown = "Ajay";

const name = userInput as string;

console.log(name.toUpperCase());

Without the assertion:

userInput.toUpperCase(); // ❌

TypeScript doesn't allow this because unknown could be anything.

After:

const name = userInput as string;

TypeScript treats name as a string.

====================================================================================================

23. VERY IMPORTANT — as DOES NOT CONVERT THE VALUE

This is the common misunderstanding.

const value = 123 as unknown as string;

This does NOT turn:

123

into:

"123"

It only tells TypeScript to treat the value as a string.

For actual conversion:

const value = String(123);

console.log(value); // "123"

TYPE ASSERTION vs TYPE CONVERSION

Type Assertion:

value as string

    ↓

"TypeScript, treat this as a string."

Type Conversion:

String(value)

    ↓

Actually converts the runtime value into a string.

====================================================================================================

24. INTERVIEW ANSWER — TYPE ASSERTION

Q: What is Type Assertion in TypeScript?

A:

as is used for type assertion in TypeScript. It tells the compiler to treat a value as a particular type when the developer knows its type more accurately than TypeScript.

It does not perform runtime type conversion.

REMEMBER:

as string

↓

"TypeScript, treat this as a string"

NOT:

as string

↓

"Convert this into a string"

====================================================================================================

QUICK TYPESCRIPT CHEAT SHEET

Primitive:
let name: string = "Ajay";
let age: number = 31;
let active: boolean = true;

Array:
let names: string[] = ["Ajay", "Rahul"];

Object:
const user: {
name: string;
age: number;
} = {
name: "Ajay",
age: 31
};

Interface:
interface User {
name: string;
age: number;
}

const user: User = {
name: "Ajay",
age: 31
};

Array of objects:
const users: User[] = [...];

Function parameters:
function add(a: number, b: number) { }

Return type:
function add(a: number, b: number): number { }

No return:
function print(): void { }

Arrow function:
const add = (a: number, b: number): number => a + b;

Optional:
phone?: string

Union:
string | number

Fixed-value union:
"pending" | "success" | "failed"

Type alias:
type User = { name: string };

Tuple:
[string, number]

any:
let data: any;

unknown:
let data: unknown;

Type assertion:
value as string

Actual conversion:
String(value)

====================================================================================================

BIG PICTURE

JavaScript:

const user = {
name: "Ajay",
age: 31
};

TypeScript:

interface User {
name: string;
age: number;
}

const user: User = {
name: "Ajay",
age: 31
};

JavaScript tells the computer WHAT TO DO.

TypeScript additionally lets you describe WHAT KIND OF DATA is being used.

That extra type information helps catch mistakes before the code runs.

====================================================================================================
END
===
