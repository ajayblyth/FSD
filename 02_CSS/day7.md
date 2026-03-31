========================================================
CSS SELECTORS — QUICK NOTES (NOTEPAD)
========================================================

DEFINITION
----------
Selectors are used to SELECT or REFER HTML elements
so that CSS styles can be applied to them.


--------------------------------------------------------
1) UNIVERSAL SELECTOR
--------------------------------------------------------
Symbol: *
• Selects ALL elements

Example:
* { margin: 0; }


--------------------------------------------------------
2) ELEMENT / TYPE SELECTOR
--------------------------------------------------------
• Selects elements by tag name

Example:
p { color: black; }


--------------------------------------------------------
3) ID SELECTOR
--------------------------------------------------------
Symbol: #
• Targets ONE specific, UNIQUE element
• Used when only a particular element needs styling

Example:
#login {
  background-color: blue;
}

Rule:
• ID must be UNIQUE
• ID is CASE-SENSITIVE

Use-case:
Multiple buttons exist, but only ONE button needs change.


--------------------------------------------------------
4) CLASS SELECTOR
--------------------------------------------------------
Symbol: .
• Selects MULTIPLE elements

Example:
.card { border: 1px solid; }

Real-world example (Upvote buttons):

HTML:
<button class="upvote">Upvote</button>
<button class="upvote">Upvote</button>
<button class="upvote">Upvote</button>

CSS:
.upvote {
  background: green;
  color: white;
}

→ One class styles ALL similar elements.


--------------------------------------------------------
5) GROUP SELECTOR
--------------------------------------------------------
Symbol: ,
• Applies SAME style to multiple selectors

Example:
h1, h2, p { font-family: Arial; }


--------------------------------------------------------
6) DESCENDANT SELECTOR
--------------------------------------------------------
Symbol: (space)
• Selects elements INSIDE another element
• Can be deep (child, grandchild, etc.)

Example 1:
div p a {
  color: blue;
}

→ Selects all <a> inside <p> inside <div>

Example 2:
.post a {
  color: blue;
}

→ Selects all links inside elements with class "post"


--------------------------------------------------------
7) IMMEDIATE CHILD SELECTOR
--------------------------------------------------------
Symbol: >
• Selects ONLY direct child
• More precise than descendant selector

Example:
ul > li { list-style: none; }


--------------------------------------------------------
8) ADJACENT SIBLING SELECTOR
--------------------------------------------------------
Symbol: +
• Selects IMMEDIATE next sibling (same level)

Example:
h1 + p { color: red; }

Example:
.upvote + button { color: blue; }


--------------------------------------------------------
9) GENERAL SIBLING SELECTOR
--------------------------------------------------------
Symbol: ~
• Selects ALL siblings AFTER the element

Example:
h1 ~ p { color: blue; }


--------------------------------------------------------
10) ATTRIBUTE SELECTOR
--------------------------------------------------------
Symbol: [ ]
• Selects elements based on attributes

Examples:
input[type="text"] { border: 1px solid; }

button[disabled] {
  opacity: 0.5;
}

(Note: till here taught by tutor)


--------------------------------------------------------
11) PSEUDO-CLASS
--------------------------------------------------------
• Defines a SPECIAL STATE of an element
• Triggered by user interaction or condition

Syntax:
selector:pseudo-class { property: value; }

Examples:
button:hover { color: green; }
button:active { color: black; }

ul li:nth-of-type(3) {
  background: blue;
}

Note:
• :active → when you CLICK an element

COMMON CSS PSEUDO-CLASSES
--------------------------------------------------
Pseudo-Class        Meaning / Usage
--------------------------------------------------
:hover (haw·vuh) Mouse over element
:active             Element is being clicked
:focus              Element is focused (input active)
:visited            Visited link
:link               Unvisited link
:checked            Checkbox / radio is selected
:first-child        First child element
--------------------------------------------------
COMMON CSS PSEUDO-CLASSES – SINGLE EXAMPLE
================================================================

Example:

<a href="#">Link</a>
<input type="text" placeholder="Name">
<input type="checkbox">
<button>Click</button>

a:hover { color: red; }          → Mouse over link
a:visited { color: purple; }     → Visited link
a:link { color: blue; }          → Unvisited link
button:active { background: gray; } → While clicking button
input:focus { border: 2px solid blue; } → When input is active
input:checked { accent-color: green; }  → When checkbox selected
p:first-child { color: green; }  → Styles first child element

================================================================


COMMON USAGE EXAMPLES
--------------------------------------------------
Selector             What it does
--------------------------------------------------
a:hover              Mouse over a link
input:focus          Input field is active
input:checked        Checkbox / radio selected
li:first-child       First list item
--------------------------------------------------

--------------------------------------------------------

12) PSEUDO-ELEMENT  (::)
-----------------------
• Styles a PART of an element

Syntax:
selector::pseudo-element { property: value; }

Examples:
p::first-letter { font-size: 2em; }
h1::first-letter { color: black; }
p::first-line { color: red; }
p::selection { color: yellow; }

Common:
 ::first-letter  ::first-line  ::selection

--------------------------------------------------------
13) COMBINED SELECTOR
--------------------------------------------------------
• Combines selectors for more precision

Example:
button.primary {
  background: blue;
}


--------------------------------------------------------
SELECTOR PRIORITY (SPECIFICITY)
--------------------------------------------------------
Inline  >  ID  >  Class  >  Element

INLINE  >  ID  >  CLASS  >  ELEMENT
------------------------------------------------

<!-- HTML -->
<p id="textId" class="textClass" style="color: red;">
    Hello CSS
</p>

<!-- CSS -->
#textId {
    color: blue;
}

.textClass {
    color: green;
}

p {
    color: black;
}

Result:
Text color = red   (inline wins)


--------------------------------------------------------
ONE-LINE SUMMARY
--------------------------------------------------------
CSS selectors decide WHICH HTML elements get styled.
========================================================
