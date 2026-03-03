
======================================================

==================== DOM (Document Object Model) ====================

-------------------- 1) DEFINITION --------------------

DOM (Document Object Model):
The DOM represents an HTML document as a logical tree structure.

It converts HTML elements into objects that JavaScript can access and modify.

we make dynamic changes in Html using DOM.



-------------------- 2) PURPOSE --------------------

• Access HTML elements
• Change content
• Modify styles (CSS)
• Add / remove elements
• Handle user events (click, input, etc.)

In simple words:
DOM allows JavaScript to control and update the webpage dynamically.



==================== 3) DOM TREE STRUCTURE ====================

Every webpage is structured like a tree:

document
 └── html
      └── body
           ├── div
           │    └── h1
           └── ul
                ├── li
                ├── li
                └── li

• document → top level object
• body → child of html
• div, ul → children of body
• h1 → child of div
• li → children of ul

This is called a hierarchical structure.



==================== 4) HTML EXAMPLE ====================

<body>
    <div>
        <h1>Todo</h1>
    </div>

    <ul>
        <li>Eat</li>
        <li>Code</li>
        <li>Sleep</li>
    </ul>
</body>



==================== 5) IMPORTANT DOM TERMS ====================

Parent:
An element that contains other elements.
Example: <ul> is parent of <li>.

Child:
Element inside another element.
Example: <li> is child of <ul>.

Sibling:
Elements at the same level.
Example: All <li> elements are siblings.

Node:
Every element, text, or comment in HTML is a node.



==================== 6) HOW JAVASCRIPT USES DOM ====================

JavaScript can:

• Select elements
    document.querySelector("h1")

• Change text
    element.innerText = "New Text"

• Change style
    element.style.color = "red"

• Create elements
    document.createElement("li")

• Remove elements
    element.remove()



==================== QUICK SUMMARY ====================

DOM = Tree representation of HTML
Document = Top object
Elements = Nodes in tree
JavaScript = Used to manipulate the DOM

Without DOM, JavaScript cannot modify HTML dynamically.

=====================================================
==================== DOM MANIPULATION ====================

DOM Manipulation = Selecting elements + Changing them

It is a TWO-STEP process:



=========================================================
STEP 1: SELECTION
=========================================================

First, we select the HTML element(s) we want to work with.

We must tell JavaScript exactly which element to target.


---------- 1) getElementById() ----------

Selects ONE element using its unique id.

Example:
document.getElementById("main");

• Returns a single element
• ID must be unique



---------- 2) querySelector() ----------


Selects the FIRST element that matches a CSS selector.

Example:
document.querySelector(".box");
document.querySelector("#main");
document.querySelector("p");

• Uses CSS selector syntax
• Returns only the first match



---------- 3) querySelectorAll() ----------

Selects ALL elements that match a CSS selector.

Example:
document.querySelectorAll("li");

• Returns a static NodeList
• Can loop through it



---------- 4) getElementsByClassName() ----------

Selects elements by class name.

Example:
document.getElementsByClassName("box");

• Returns HTMLCollection
• Live collection (updates automatically)



---------- 5) getElementsByTagName() ----------

Selects elements by tag name.

Example:
document.getElementsByTagName("div");

• Returns HTMLCollection
• Live collection



=========================================================
STEP 2: MANIPULATION
=========================================================

After selecting elements, we modify them.



---------- 1) Changing Content ----------

innerHTML  → gets/sets HTML content
textContent → gets/sets only text

Example:
element.innerHTML = "<b>Hello</b>";
element.textContent = "Hello";



---------- 2) Modifying Styles ----------

Access style property directly.

Example:
element.style.color = "blue";
element.style.backgroundColor = "yellow";



---------- 3) Adding / Removing Classes ----------

Use classList API.

element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active");



---------- 4) Setting Attributes ----------

Use setAttribute()

element.setAttribute("src", "image.jpg");
element.setAttribute("href", "https://example.com");



---------- 5) Adding / Removing Elements ----------

Create element:
let li = document.createElement("li");

Add element:
parent.appendChild(li);

Insert before:
parent.insertBefore(newElement, referenceElement);

Remove element:
parent.removeChild(child);

Replace element:
parent.replaceChild(newEl, oldEl);



=========================================================
IMPORTANT DIFFERENCE
=========================================================

NodeList (querySelectorAll)
• Static
• Does NOT auto-update

HTMLCollection (getElementsByClassName / TagName)
• Live
• Auto-updates when DOM changes



=========================================================
QUICK SUMMARY
=========================================================

1) Select the element
2) Modify the element

Selection → getElementById(), querySelector(), etc.
Manipulation → change content, style, classes, attributes, structure

DOM Manipulation makes webpages dynamic and interactive.
===============================================


console.dir(document);
🔎 Difference Between console.log() and console.dir()
🔹 console.log(document)

Shows the document as an HTML tree

Displays it like rendered HTML

🔹 console.dir(document)

Shows the document as a JavaScript object

Displays all properties and methods

🧠 When to Use console.dir()

Use it when you want to:

Inspect object properties

Explore DOM element properties

Debug JavaScript objects

✅ Example
let h1 = document.querySelector("h1");

console.log(h1);   // shows HTML element
console.dir(h1);   // shows object properties


===============================
==================== SELECTING ELEMENTS IN DOM ====================

Method: getElementById()

Definition:
Returns the element object with the given id.
If no element is found → returns null.



=========================================================
STEP 1: SELECTION
=========================================================

❌ Wrong Way (ID not passed as string)

document.getElementById(mainImg);

Result:
null

Reason:
JavaScript treats mainImg as a variable.
Since it is not defined, it fails.



✅ Correct Way

document.getElementById("mainImg");

Result:
<img src="assets/spiderman_img.png" id="mainImg">



=========================================================
STORING ELEMENT IN A VARIABLE
=========================================================

let imgObj = document.getElementById("mainImg");
document.getElementById("description");

Output:
undefined

Reason:
Assignment does not return value to console.
But the variable now stores the element.



Check the variable:

imgObj

Result:
<img src="assets/spiderman_img.png" id="mainImg">



=========================================================
INSPECTING PROPERTIES
=========================================================

imgObj.tagName
→ "IMG"

imgObj.id
→ "mainImg"

imgObj.src
→ Shows full image path (browser converts to absolute URL)



=========================================================
STEP 2: MANIPULATION
=========================================================

Changing the image source:

imgObj.src = "assets/creation_1.png";

What happens?
• The image displayed on webpage changes
• DOM is updated dynamically



=========================================================
IMPORTANT NOTES
=========================================================

• Always pass ID as a string
• getElementById returns:
      → Element object (if found)
      → null (if not found)
• After selecting, you can:
      → Read properties
      → Modify attributes
      → Change styles
      → Update content



=========================================================
QUICK SUMMARY
=========================================================

1) Select element
   document.getElementById("idName")

2) Store in variable
   let element = document.getElementById("idName")

3) Inspect properties
   element.tagName
   element.id
   element.src

4) Manipulate element
   element.src = "newImage.png"

Selection + Manipulation = DOM Control

==================== SELECTING ELEMENTS ====================
================ getElementsByClassName ====================

Definition:
Returns an HTMLCollection of all elements with the given class name.
If no elements are found → returns an empty HTMLCollection.



=========================================================
STEP 1: SELECTION
=========================================================

document.getElementsByClassName("oldImg");

Output:
HTMLCollection(3) [img.oldImg, img.oldImg, img.oldImg]

Meaning:
• 3 elements have class "oldImg"
• All are returned inside a collection



=========================================================
WHAT IS HTMLCollection?
=========================================================

• Array-like object
• Has length property
• Access elements using index (0, 1, 2...)
• NOT a real array
• Live collection (updates automatically if DOM changes)



=========================================================
STORING COLLECTION IN VARIABLE
=========================================================

let smallImages = document.getElementsByClassName("oldImg");

smallImages.length
→ 3

smallImages[0]
→ First image element



=========================================================
STEP 2: MANIPULATION (USING LOOP)
=========================================================

Since multiple elements are returned,
we must loop through them.

Example:

for (let i = 0; i < smallImages.length; i++) {
    smallImages[i].src = "assets/spiderman_img.png";
    console.log(`value of image no. ${i} is changed.`);
}

What this does:
• Access each image one by one
• Change its src attribute
• Log confirmation message



=========================================================
WHY LOOP IS NECESSARY?
=========================================================

Because:
getElementsByClassName() returns multiple elements

We cannot do:
smallImages.src = "new.png"; ❌

We must access:
smallImages[i].src = "new.png"; ✅



=========================================================
IMPORTANT NOTES
=========================================================

getElementById()
→ Returns single element

getElementsByClassName()
→ Returns HTMLCollection (multiple elements)

HTMLCollection:
→ Live collection
→ Updates automatically if elements are added/removed



=========================================================
QUICK SUMMARY
=========================================================

1) Select elements
   document.getElementsByClassName("className")

2) Store collection
   let elements = document.getElementsByClassName("className")

3) Loop through collection
   for loop

4) Modify each element
   elements[i].property = value

Selection + Loop + Manipulation = Multi-element DOM control

======================

=========== getElementsByTagName ===========

Definition:
Returns an HTMLCollection of elements with the given tag name.
If none found → returns empty collection.

---------------- Selection ----------------

document.getElementsByTagName("p");

Output:
HTMLCollection(2) [p, p#description]

---------------- Access by Index ----------------

document.getElementsByTagName("p")[1];

Output:
p#description

• Index starts from 0
• [0] → first element
• [1] → second element

---------------- Important Points ----------------

• Returns HTMLCollection (not single element)
• Collection is live (auto-updates)
• Use index or loop to manipulate

Example:

let paras = document.getElementsByTagName("p");

for (let i = 0; i < paras.length; i++) {
    paras[i].style.color = "blue";
}

Selection = Step 1 of DOM manipulation

====================

==================== QUERY SELECTORS ====================

Definition:
Allows us to select elements using CSS selectors.



---------------- querySelector() ----------------

Selects the FIRST element that matches the selector.

Examples:

document.querySelector("p");         
→ First <p> element

document.querySelector("#myId");     
→ Element with id="myId"

document.querySelector(".myClass");  
→ First element with class="myClass"

document.querySelector("div a");     
→ First <a> inside a <div>



---------------- querySelectorAll() ----------------

Selects ALL elements that match the selector.

document.querySelectorAll("p");      
→ All <p> elements

• Returns a NodeList
• NodeList is static (does not auto-update)



---------------- Inspecting with console.dir() ----------------

console.dir(document.querySelector("p"));
console.dir(document.querySelector("#description"));
console.dir(document.querySelector(".oldImg"));
console.dir(document.querySelector("div a"));

• Shows element as a JavaScript object
• Helps inspect properties and methods



---------------- Important Points ----------------

• Uses CSS selector syntax
• More flexible than getElementById / ClassName / TagName
• querySelector → single element
• querySelectorAll → multiple elements (NodeList)



==================== QUICK SUMMARY ====================

querySelector()     → First match
querySelectorAll()  → All matches
Uses CSS selectors  → #id, .class, tag, nested selectors

=============
==================== DOM MANIPULATION ====================

DOM Manipulation = 2 Steps
1) Selection
2) Manipulation



=========================================================
STEP 1: SELECTION
=========================================================

Select the HTML element(s) you want to work with.

1) getElementById("id")
   → Returns single element

2) querySelector("cssSelector")
   → Returns first matching element

3) querySelectorAll("cssSelector")
   → Returns all matching elements (NodeList - static)

4) getElementsByClassName("className")
   → Returns HTMLCollection (live)

5) getElementsByTagName("tagName")
   → Returns HTMLCollection (live)



=========================================================
STEP 2: MANIPULATION
=========================================================

After selecting, modify the element.



---------- Changing Content ----------

element.innerHTML = "<b>Hello</b>";  
element.textContent = "Hello";



---------- Modifying Styles ----------

element.style.color = "blue";
element.style.backgroundColor = "yellow";



---------- Adding / Removing Classes ----------

element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active");



---------- Setting Attributes ----------

element.setAttribute("src", "image.png");
element.setAttribute("href", "https://example.com");



---------- Adding / Removing Elements ----------

parent.appendChild(newElement);
parent.insertBefore(newElement, referenceElement);
parent.removeChild(childElement);
parent.replaceChild(newElement, oldElement);



=========================================================
QUICK SUMMARY
=========================================================

Step 1 → Select element  
Step 2 → Modify element  

Selection + Manipulation = Dynamic Webpage

============================
==================== USING PROPERTIES & METHODS ====================
================ innerText vs textContent vs innerHTML ====================


=========================================================
1) innerText
=========================================================

Definition:
Returns ONLY the visible text shown on the screen/web page.

• Ignores hidden elements
• Ignores extra formatting from source

Example:
para.innerText

Output:
Clean visible text about "Spider-Man"



=========================================================
2) textContent
=========================================================

Definition:
Returns ALL text inside the element.

• Includes hidden text
• Includes spacing and line breaks (\n)
• Does NOT interpret HTML tags

Example:
para.textContent

Output:
Full text with original formatting and line breaks



=========================================================
3) innerHTML
=========================================================

Definition:
Returns full HTML markup inside the element.

• Includes HTML tags
• Browser parses tags when setting value

Example:
para.innerHTML

Output:
Text with tags like <b> and <a href="...">



=========================================================
MANIPULATING CONTENT
=========================================================

Example 1:

para.innerText = "Hi, I am <b>Peter Parker</b>!";

Result:
Browser shows:
Hi, I am <b>Peter Parker</b>!

(Tag is treated as normal text)



Example 2:

heading.innerHTML = "<u>Spider Man</u>";

Result:
Browser shows underlined text:
Spider Man

(Tag is parsed and applied)



=========================================================
KEY DIFFERENCES
=========================================================

innerText
→ Visible text only

textContent
→ All text (including hidden & spacing)

innerHTML
→ Full HTML structure (tags included)



=========================================================
QUICK SUMMARY
=========================================================

Use innerText → When working with visible text only  
Use textContent → When you need complete raw text  
Use innerHTML → When inserting or modifying HTML tags

===================
==================== MANIPULATING ATTRIBUTES ====================

Attributes:
Extra information inside HTML tags.
Example: id, class, src, href, alt, etc.



=========================================================
METHODS
=========================================================

1) obj.getAttribute(attr)
   → Returns current value of attribute

2) obj.setAttribute(attr, value)
   → Sets or updates attribute value



=========================================================
STEP 1: SELECTION
=========================================================

let img = document.querySelector("img");

Result:
<img src="assets/spiderman_img.png" id="mainImg">



=========================================================
STEP 2: GETTING ATTRIBUTE
=========================================================

img.getAttribute("id");

Output:
"mainImg"

• Reads the current value
• Does NOT change anything



=========================================================
STEP 3: SETTING ATTRIBUTE
=========================================================

img.setAttribute("id", "spidermanImg");

Result:
ID changes from:
mainImg → spidermanImg

Updated element:
<img src="assets/spiderman_img.png" id="spidermanImg">



=========================================================
IMPORTANT NOTES
=========================================================

• getAttribute() → Read attribute value
• setAttribute() → Add or update attribute
• Works for any HTML attribute (id, class, src, href, etc.)
• Changes are reflected immediately in DOM



=========================================================
QUICK SUMMARY
=========================================================

Select element  
→ Read attribute (getAttribute)  
→ Modify attribute (setAttribute)

Selection + Attribute change = Dynamic DOM update
========================================
==================== MANIPULATING STYLE ====================

STYLE PROPERTY:
• Use obj.style to access or modify inline styles of an element.
• Directly changes CSS properties of the selected element.

Example Properties:
• color, backgroundColor, fontSize, display, margin, padding, etc.



=========================================================
STEP 1: SELECTION
=========================================================

let img = document.querySelector("img");
console.dir(img);
// Inspect element styles

let heading = document.querySelector("h1");



=========================================================
STEP 2: MODIFYING SINGLE ELEMENT STYLE
=========================================================

heading.style.color = "purple";       // sets text color
heading.style.color = "green";        // updates text color
heading.style.backgroundColor = "green"; // sets background



=========================================================
STEP 3: MODIFYING MULTIPLE ELEMENTS
=========================================================

let links = document.querySelectorAll(".box a");

for (let link of links) {
    link.style.color = "purple";      // changes color of each link
}

// Alternate using index loop:
// for (let i = 0; i < links.length; i++) {
//     links[i].style.color = "green";
// }



=========================================================
IMPORTANT NOTES
=========================================================

• style property only changes inline styles
• Does NOT affect external CSS
• Access via obj.style.propertyName
• Useful for dynamic, JS-driven style changes
• Works on single or multiple elements using loopsQ
==============
==================== MANAGING CLASSES WITH classList ====================

obj.classList → Access the list of classes on an element

METHODS:

1) classList.add("className")
   • Adds a new class to the element
   • Example: heading.classList.add("highlight")

2) classList.remove("className")
   • Removes a class if it exists
   • Example: heading.classList.remove("highlight")

3) classList.contains("className")
   • Checks if a class exists on the element
   • Returns true/false
   • Example: heading.classList.contains("highlight") → true/false

4) classList.toggle("className")
   • Adds the class if absent, removes if present
   • Example: heading.classList.toggle("highlight")

=========================================================
KEY POINTS:
• classList allows dynamic control over element classes
• More convenient than manipulating className string manually
• Works on single or multiple elements (use loops for multiple)
======================
// ================= CLASSLIST METHODS =================

// Selecting the element
let heading = document.querySelector('h1');

// ===== Adding a class =====
heading.classList.add("green"); 
// Adds "green" class to the element
// Output in console → undefined (operation successful)

// ===== Checking classes =====
heading.classList 
// DOMTokenList ['green'] → shows current classes

heading.classList.contains("underline"); 
// false → "underline" not present

heading.classList.contains("green"); 
// true → "green" is present

// ===== Toggling classes =====
heading.classList.toggle("green"); 
// Removes "green" because it already exists
// Returns false → class removed

heading.classList 
// DOMTokenList [] → no classes now

heading.classList.toggle("underline"); 
// Adds "underline" class → returns true

heading.classList.toggle("underline"); 
// Removes "underline" class → returns false

// ================= NOTES =================
// 1) add() → adds a class
// 2) remove() → removes a class
// 3) contains() → checks if class exists
// 4) toggle() → adds if missing, removes if present