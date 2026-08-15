==================== DOM (Document Object Model) ====================

-------------------- 1) DEFINITION --------------------
The DOM (Document Object Model) represents an HTML document as a tree of objects (nodes). Every HTML element becomes a node, allowing JavaScript to access and manipulate the page.
We make dynamic changes in HTML using DOM.

👉 Dynamic change = changing the webpage AFTER it has loaded (using JavaScript)

Example:
document.getElementById("title").innerText = "Hello Ajay";

✔ Text changed without reloading page
✔ This is called dynamic

-------------------- 2) PURPOSE --------------------
• Access HTML elements
• Change content
• Modify styles (CSS)
• Add / remove elements
• Handle user events (click, input, etc.)

In simple words: DOM allows JavaScript to control and update the webpage dynamically.

==================== 3) DOM TREE STRUCTURE ====================
Every webpage is structured like a tree:

Document
│
└── html
    ├── head
    │   └── title
    │       └── "My Page"   (Text Node)
    │
    └── body
        ├── h1
        │   └── "Hello"     (Text Node)
        │
        └── p
            └── "Welcome"   (Text Node)

• document → top level object
• html → child of document
• body → child of html
• div, ul → children of body
• h1 → child of div
• li → children of ul
This is called a hierarchical structure.

"In DOM, document is the top-level object and html is its root element (documentElement), followed by body and other elements in a hierarchical structure."

==================== 4) HTML EXAMPLE ====================
<!DOCTYPE html>   //"This document is written in HTML5." It is not an HTML tag. It is an instruction to the browser.
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello</h1>
  <p>Welcome</p>
</body>
</html>

Note: <!DOCTYPE html> is a declaration that tells the browser the document is an HTML5 document. 
It is not an HTML tag.It should be the first line of the HTML file and ensures the browser renders
the page in Standards Mode instead of Quirks Mode(where they render the page like very old browsers) 
providing consistent HTML and CSS behavior.

==================== 5) IMPORTANT DOM TERMS ====================
Parent  → An element that contains other elements (e.g., <ul> is parent of <li>)
Child   → Element inside another element (e.g., <li> is child of <ul>)
Sibling → Elements at the same level (e.g., all <li> elements are siblings)
Node    → Every element, text, or comment in HTML

==================== 6) HOW JAVASCRIPT USES DOM ====================
JavaScript can:
• Create elements        → document.createElement("li")
• Select elements        → document.querySelector("h1")
• Remove elements        → element.remove()
• Change text            → element.innerText = "New Text"
• Change style           → element.style.color = "red"

==================== QUICK SUMMARY ====================
DOM = Tree representation of HTML
Document = Top object
Elements = Nodes in tree
JavaScript = Used to manipulate the DOM
Without DOM, JavaScript cannot modify HTML dynamically.

==================================================================
==================== DOM MANIPULATION ====================
DOM Manipulation = Selecting elements + Changing them
It is a TWO-STEP process:

STEP 1: SELECTION
--------------------
1) getElementById("id")   → Returns single element (ID must be unique)
2) getElementsByClassName("className") → Returns HTMLCollection (live)
3) getElementsByTagName("tagName")     → Returns HTMLCollection (live)
4) querySelector("cssSelector")  → Returns the first element matching CSS selector
5) querySelectorAll("cssSelector") → Returns all matching elements (NodeList - static)

live:means if elements are added or removed, the collection reflects the changes without calling the method again.
Which is preferred: Live or Static? (Interview Style)

Preferred: ✅ Static (querySelectorAll())

Why is Static preferred?
✅ More predictable (doesn't change unexpectedly).
✅ Better performance in most cases.
✅ Easier to debug.
✅ Used more commonly in modern JavaScript.
Why not Live?
A live collection changes automatically when the DOM changes, which can sometimes cause unexpected behavior.

Example:
<body>

<h1 id="main-title">Hello World</h1>
<p class="highlight">Paragraph 1</p>
<p class="highlight">Paragraph 2</p>
<div>Div 1</div>
<div>Div 2</div>

<script>
//   1) getElementById → single element
  const title = document.getElementById("main-title");
  console.log(title);        // <h1 id="main-title">Hello World</h1>

  // 2) querySelector → first matching CSS selector
  const firstHighlight = document.querySelector(".highlight");
  console.log(firstHighlight);  // <p class="highlight">Paragraph 1</p>

  // 3) querySelectorAll → all matching elements (NodeList)
  const allHighlights = document.querySelectorAll(".highlight");
  console.log(allHighlights);   // NodeList(2) [p, p]

  // 4) getElementsByClassName → HTMLCollection (live)
  const highlightsCollection = document.getElementsByClassName("highlight");
  console.log(highlightsCollection);  // HTMLCollection(2) [p, p]

  // 5) getElementsByTagName → HTMLCollection (live)
  const divs = document.getElementsByTagName("div");
  console.log(divs);  // HTMLCollection(2) [div, div]

  // Extra: show live nature of HTMLCollection
  const newP = document.createElement("p");
  newP.className = "highlight";
  newP.textContent = "Paragraph 3";
  document.body.appendChild(newP);  //adds the element as the last child of the parent element.
  console.log(highlightsCollection);  // now includes new paragraph (live)
  console.log(allHighlights);         // NodeList remains same (static)
</script>

</body>

Note:
==================================================================
querySelectorAll vs getElementsByClassName
==================================================================

Feature                      | querySelectorAll(".class")       | getElementsByClassName("class")
-----------------------------+--------------------------------+-----------------------------
Return Type                   | NodeList (static)              | HTMLCollection (live)
Selects                       | Any CSS selector               | Only class names
Access                        | Use index [0], forEach, etc.   | Use index [0], cannot use forEach directly(need Array.from() first).
Updates automatically         | NO (static snapshot)           | YES (live collection)
Example                       | document.querySelectorAll(".highlight") | document.getElementsByClassName("highlight")
Adding new element with class | NodeList remains same          | HTMLCollection updates automatically

querySelector() / querySelectorAll() → Accept any CSS selector (#id, .class, tag, tag.class, div span, input[type="text"], etc.).
getElementsByClassName() → Accepts only a class name (without the .). 
==================================================================

STEP 2: MANIPULATION
--------------------
After selecting elements, modify them:

---------- Changing Content ----------
element.innerHTML  → gets/sets HTML content, including tags
element.textContent → gets/sets only text

---------- Modifying Styles ----------
element.style.color = "blue"
element.style.backgroundColor = "yellow"

---------- Adding / Removing Classes ----------
element.classList.add("active")
element.classList.remove("active")
element.classList.toggle("active")
👉 toggle() adds the class if it is not present
👉 removes the class if it is already present

---------- Setting Attributes ----------
element.setAttribute("src", "image.jpg")
element.setAttribute("href", "https://example.com")

---------- Adding / Removing Elements ----------
parent.appendChild(newElement)
parent.removeChild(childElement)
parent.replaceChild(newElement, oldElement)
parent.insertBefore(newElement, referenceElement)

Example:
<!DOCTYPE html>
<html>
<body>

<h1 id="title">Hello <b>World</b></h1>
<img id="img" src="old.jpg">
<a id="link" href="#">Click me</a>
<div id="container"></div>

<script>
const h1 = document.getElementById("title");
const img = document.getElementById("img");
const link = document.getElementById("link");
const container = document.getElementById("container");

// ---------- Modifying HTML / Text ----------
console.log(h1.innerHTML);       // "Hello <b>World</b>"
console.log(h1.textContent);     // "Hello World"
h1.innerHTML = "Hi <i>Everyone</i>";   // changes HTML structure
h1.textContent = "Hi Everyone";       // changes only text, no formatting

// ---------- Modifying Styles ----------
h1.style.color = "blue";
h1.style.backgroundColor = "yellow";

// ---------- Adding / Removing Classes ----------
h1.classList.add("active");
h1.classList.remove("active");
h1.classList.toggle("active");

// ---------- Setting Attributes ----------
img.setAttribute("src", "image.jpg");
link.setAttribute("href", "https://example.com");

// ---------- Adding / Removing Elements ----------
const newP = document.createElement("p");
newP.textContent = "New Paragraph";
container.appendChild(newP);                      // add at end

const newP2 = document.createElement("p");
newP2.textContent = "Inserted Paragraph";
container.insertBefore(newP2, newP);             // insert before newP

container.removeChild(newP);                      // remove newP

const newP3 = document.createElement("p");
newP3.textContent = "Replacement Paragraph";
container.replaceChild(newP3, newP2);            // replace newP2 with newP3
</script>

</body>
</html>

==================================================================
NodeList vs HTMLCollection
--------------------
NodeList (querySelectorAll) → static, does NOT auto-update
HTMLCollection (getElementsByClassName / TagName) → live, auto-updates

==================================================================
Console.log() vs Console.dir()
--------------------
console.log(document) → Shows document as HTML tree
console.dir(document) → Shows document as JS object (properties & methods)

When to Use console.dir()
------------------------------------------------------------------
- Inspect object properties
- Explore DOM element properties
- Debug JavaScript objects

Example:
let h1 = document.querySelector("h1");
console.log(h1);  // shows HTML element
console.dir(h1);  // shows object properties

==================================================================
==================== SELECTING ELEMENTS IN DOM ====================

getElementById()
--------------------
Returns element with given id; if not found → null

❌ Wrong: document.getElementById(mainImg) → null (JS treats mainImg as variable. Since it is not defined, it fails.
)
✅ Correct: document.getElementById("mainImg");
result → <img src="assets/spiderman_img.png" id="mainImg">

Storing element in a variable:
let imgObj = document.getElementById("mainImg");

Inspecting properties:
imgObj.tagName → "IMG"
imgObj.id      → "mainImg"
imgObj.src           → Shows full image path (browser converts to absolute URL)

2.) Manipulation:
imgObj.src = "assets/creation_1.png"
• Changes displayed image
• Updates DOM dynamically

Important Notes:
• Always pass ID as string
• getElementById → element (if found) or null
• After selection → read properties, modify attributes, change styles, update content

Quick Summary:
1) Select element → document.getElementById("idName")
2) Store in variable → let element = document.getElementById("idName")
3) Inspect → element.tagName, element.id, element.src
4) Manipulate → element.src = "newImage.png"

Selection + Manipulation = DOM Control

==================================================================
SELECTION:
getElementsByClassName()
--------------------
Returns HTMLCollection of elements with class; empty if none

Storing collection:
let smallImages = document.getElementsByClassName("oldImg")
smallImages.length → 3
smallImages[0] → first element

Manipulation (loop needed):Since multiple elements are returned, we must loop through them.

for (let i = 0; i < smallImages.length; i++) {
    smallImages[i].src = "assets/spiderman_img.png"
    console.log(`Image ${i} changed.`)
}
What this does:
• Access each image one by one
• Change its src attribute
• Log confirmation message

Important Notes:
• getElementById → single element
• getElementsByClassName → multiple elements (live, auto-updates)

Quick Summary:
1) Select → document.getElementsByClassName("className")
2) Store → let elements = document.getElementsByClassName("className")
3) Loop → for loop
4) Modify → elements[i].property = value

Selection + Loop + Manipulation = Multi-element DOM control

==================================================================
getElementsByTagName()
--------------------
Returns HTMLCollection by tag; empty if none

Selection: document.getElementsByTagName("p")
Output: HTMLCollection(2) [p, p#description]

Access by index: 
document.getElementsByTagName("p")[1]
Output: p#description
• Index starts from 0

Important:
• Returns live(auto-updates) HTMLCollection
• Use index or loop to manipulate

Example:
let paras = document.getElementsByTagName("p")
for (let i = 0; i < paras.length; i++) {
    paras[i].style.color = "blue"
}
Selection = Step 1 of DOM manipulation
==================== QUERY SELECTORS ====================
querySelector()
--------------------
Selects FIRST element that matches CSS selector

Examples:
document.querySelector("p")       → first <p>
document.querySelector("#myId")   → element with id="myId"
document.querySelector(".myClass")→ first element with class="myClass"
document.querySelector("div a")   → first <a> inside <div>

querySelectorAll()
--------------------
Selects ALL elements matching CSS selector
Returns NodeList (static)

Example:
document.querySelectorAll("p") → all <p> elements

Inspecting elements:
---------------------------------------
console.dir(document.querySelector("p"))
console.dir(document.querySelector("#description"))
console.dir(document.querySelector(".oldImg"))
console.dir(document.querySelector("div a"))
• Shows element as JS object
• Helps inspect properties & methods

Important Points:
----------------------------------------
• Uses CSS selector syntax (#id, .class, tag, nested)
• querySelector → first match
• querySelectorAll → multiple elements

Quick Summary:
querySelector()    → First match
querySelectorAll() → All matches
Uses CSS selectors  → #id, .class, tag, nested selectors


==================== DOM MANIPULATION (RECAP) ====================
2 Steps: 1) Selection  2) Manipulation

Selection Methods:
1) getElementById("id")          → single element
2) querySelector("cssSelector")  → first matching element
3) querySelectorAll("cssSelector") → all matching elements (NodeList)
4) getElementsByClassName("className") → HTMLCollection (live)
5) getElementsByTagName("tagName") → HTMLCollection (live)

Manipulation Methods:
After selecting, modify the element.

---------- Changing Content ----------
element.innerHTML = "<b>Hello</b>"  
element.textContent = "Hello"

---------- Modifying Styles ----------
element.style.color = "blue"  
element.style.backgroundColor = "yellow"

---------- Adding / Removing Classes ----------
element.classList.add("active")  
element.classList.remove("active")  
element.classList.toggle("active")

---------- Setting Attributes ----------
element.setAttribute("src", "image.png")  
element.setAttribute("href", "https://example.com")

---------- Adding / Removing Elements ----------
parent.appendChild(newElement)  
parent.insertBefore(newElement, referenceElement)  
parent.removeChild(childElement)  
parent.replaceChild(newElement, oldElement)


==================== USING PROPERTIES & METHODS ====================
innerText vs textContent vs innerHTML
----------------------------------------------------
innerText
• Visible text only
• Ignores hidden elements & extra formatting
Example:
para.innerText → "Visible text"
Output: Clean visible text about "Spider-Man"

textContent
• All text including hidden & line breaks
• Does NOT parse HTML tags
Example:
para.textContent → "All text with formatting"

innerHTML
• Full HTML markup inside element
• Parses HTML tags
Example:
para.innerHTML → "<b>Bold text</b>"

Manipulating content:
Example 1:
para.innerText = "Hi, I am <b>Peter Parker</b>!"
Browser shows → Hi, I am <b>Peter Parker</b>! (tags as text)

Example 2:
heading.innerHTML = "<u>Spider Man</u>"
Browser shows → Spider Man (underlined)

Key Differences:
innerText   → visible text only
textContent → all text
innerHTML   → full HTML structure

Quick Summary:
Use innerText     → When working with visible text only  
Use textContent   → When you need complete raw text  
Use innerHTML     → When inserting or modifying HTML tags

==================================================================
==================== MANIPULATING ATTRIBUTES ====================
Attributes → extra info in HTML tags (id, class, src, href, alt)

Methods:
1) obj.getAttribute(attr) → Returns current value of attribute  
2) obj.setAttribute(attr, value) → set/update value

Example:
let img = document.querySelector("img")
Result: <img src="assets/spiderman_img.png" id="mainImg">

img.getAttribute("id") → "mainImg"
img.setAttribute("id", "spidermanImg") → updates DOM

Important Notes:
• Works on any attribute
• Changes reflected immediately

Quick Summary:
Select element → read attribute → modify attribute

==================================================================
==================== MANIPULATING STYLE ====================
Style Property:
• Use obj.style to access/modify inline styles
• Changes CSS directly

Example Properties:
color, backgroundColor, fontSize, display, margin, padding, etc.

Modify single element:
STEPS: SELECTION   MODIFYING

let heading = document.querySelector("h1")
heading.style.color = "purple"
heading.style.backgroundColor = "green"

Modify multiple elements within a class:
let links = document.querySelectorAll(".box a") //Select all <a> elements that are inside an element with class box.
for (let link of links) {
    link.style.color = "purple"
}

Important Notes:
• Only inline styles affected
• External CSS unaffected
• Works on single or multiple elements (loops)
• Access via obj.style.propertyName  

==================================================================
==================== MANAGING CLASSES WITH classList ====================
obj.classList → access element’s classes

Methods:
1) classList.add("className")     → adds class
2) classList.remove("className")  → removes class
3) classList.contains("className")→ checks presence (true/false)
4) classList.toggle("className")  → add if absent, remove if present

Example:
let heading = document.querySelector("h1")

// Add class
heading.classList.add("green")  → adds class

// Check classes
heading.classList  
// DOMTokenList ['green'] → shows current classes

heading.classList.contains("green") → true
heading.classList.contains("underline") → false

// Toggle classes
heading.classList.toggle("green")     → removes class (if exists)
heading.classList.toggle("underline") → adds class

Note: if u remove all classes then
heading.classList  
// DOMTokenList [] → no classes now

Key Points:
• classList allows dynamic control of classes
• Easier than modifying className manually
• Works on single or multiple elements (use loops for multiple)

==================== QUICK DOM MANIPULATION SUMMARY ====================
Step 1 → Select element(s)
Step 2 → Modify content, style, classes, attributes, or structure
Selection + Manipulation = dynamic, interactive webpage
=========================================
Doubts
=========================================
==================================================================
Control Where to Add Element
==================================================================

Method                     | Description                                           | Example
----------------------------+-------------------------------------------------------+-------------------------------
appendChild(newNode)        | Adds inside last child of parent                     | parent.appendChild(newP)
prepend(newNode)            | Adds inside first child of parent                    | parent.prepend(newP)
before(newNode)             | Inserts before the element itself                    | element.before(newP)
after(newNode)              | Inserts after the element itself                     | element.after(newP)
insertAdjacentHTML(position, html) | Inserts HTML string relative to element:          | element.insertAdjacentHTML('afterend', '<p>Hi</p>')
                               'beforebegin', 'afterbegin', 'beforeend', 'afterend' |
==================================================================

==================================================================
DOM Selection: document. Requirement
==================================================================

1) Querying from the whole page (root of DOM) → document is mandatory
   Example:
     document.getElementById("main-title")
     document.querySelector(".highlight")
     document.querySelectorAll("p")

2) Querying inside a specific element → document is NOT required
   Example:
     const container = document.querySelector("div"); // parent element
     const pInsideDiv = container.querySelector("p");  // search only inside container

3) Quick rule:
   - Use 'document.' to start from the page root
   - Use 'element.' to search within a specific parent element

==================================================================