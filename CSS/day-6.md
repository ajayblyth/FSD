
EMMET – BASIC INTRODUCTION
Emmet is a VS Code built-in shortcut system that uses operators like > + ^ * () to quickly generate HTML structure.
We type a short abbreviation and press Tab/Enter, and Emmet automatically expands it into full HTML code.

NESTING OPERATORS IN EMMET – control structure & hierarchy of HTML elements.

> (Child operator)
Meaning: Element inside another element.
Example: div>p
Output (Press Tab): <div><p></p></div>
Explanation: p is a child of div.

+ (Sibling operator)
Meaning: Elements at the same level, next to each other.
Example: h1+p
Output: <h1></h1><p></p>
Explanation: h1 and p are siblings, not inside each other.

^ (Climb-up operator)
Meaning: Go one level up from current element.
Example: div>p^span
Output: <div><p></p><span></span></div>
Explanation:
p is inside div | ^ moves back to div | span becomes sibling of p

* (Multiplication / Repeat operator)
Meaning: Create multiple same elements.
Example: ul>li*3
Output: <ul><li></li><li></li><li></li></ul>
Explanation: Creates 3 list items inside ul.

() (Grouping operator)
Meaning: Group elements to control order and structure.
Example: div>(header>h1)+p
Output: <div><header><h1></h1></header><p></p></div>
Explanation:
(header>h1) treated as one unit | Then p is added as sibling
------------------------------------------------------

ATTRIBUTE OPERATORS
Attribute operators are used to modify attributes of outputted elements.
In HTML and XML you can quickly add class attribute to generated element.

ID and CLASS
In CSS, elem#id and elem.class notation is used.
In Emmet, same syntax is used to add attributes.

Example:
div#header+div.page+div#footer.class1.class2.class3

Output:
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>

Custom attributes
Use [attr] notation to add custom attributes.
Example:
td[title="Hello world!" colspan=3]
Output:
<td title="Hello world!" colspan="3"></td>

Notes:
• Multiple attributes allowed inside [ ]
• Values optional → td[colspan title]
• Single or double quotes allowed
• No quotes needed if no spaces → td[title=hello colspan=3]

ITEM NUMBERING: $
Used with * operator to number repeated elements.

Example:
ul>li.item$*5
Output:
<li class="item1"></li> … <li class="item5"></li>

Zero padding:
ul>li.item$$$*5
Output:
<li class="item001"></li> … <li class="item005"></li>

CHANGING NUMBERING BASE & DIRECTION (@)

Descending order:
ul>li.item$@-*5
Output: item5 → item1

Change start value:
ul>li.item$@3*5
Output: item3 → item7

Combined:
ul>li.item$@-3*5
Output: item7 → item3

------------------------------------------------------
ATTRIBUTE QUOTE RULES (HTML / EMMET)

+--------------+-------------------------+---------------------------+---------------------------+
| Quote Type   | When to Use             | Example                   | Output                    |
+--------------+-------------------------+---------------------------+---------------------------+
| Double " "   | Standard / has spaces   | a[title="hello world"]    | <a title="hello world">  |
| Single ' '   | Same as double quotes   | a[title='hello world']    | <a title="hello world">  |
| No quotes    | No spaces in value      | a[title=hello]            | <a title="hello">        |
+--------------+-------------------------+---------------------------+---------------------------+

RULE TO REMEMBER
Spaces → quotes required
No spaces → quotes optional
---------------------------------
TEXT: { }
Curly braces are used to add text to an element.

Example:
a{Click me}
Output:
<a href="">Click me</a>

Note:
{text} is parsed like an element but has special meaning when written right after an element.

a{click} and a>{click} → same output
BUT difference appears with siblings.

Example 1:
a{click}+b{here}
Output:
<a href="">click</a><b>here</b>

Example 2:
a>{click}+b{here}
Output:
<a href="">click<b>here</b></a>

Difference:
In second example, <b> is inside <a>.

Important Example:
p>{Click }+a{here}+{ to continue}
Output:
<p>Click <a href="">here</a> to continue</p>

Explanation:
• > moves inside <p>
• {here} only affects <a>
• Parent context is not changed unnecessarily

Without > operator:
p{Click }+a{here}+{ to continue}
Output:
<p>Click </p>
<a href="">here</a> to continue

---------------------------------
COMBINED EMMET EXAMPLE

Abbreviation:
div#profile.card>h1{Ajay Sharma}+p{B.Tech ECE}

Output:
<div id="profile" class="card">
  <h1>Ajay Sharma</h1>
  <p>B.Tech ECE</p>
</div>

---------------------------------
REAL-WORLD PROFILE STRUCTURE

Abbreviation:
div#profile>(header>h1{My Profile})+(section>p{Education: B.Tech ECE})+(footer>a[href="mailto:aj@gmail.com"]{Contact Me})

Output:
<div id="profile">
  <header><h1>My Profile</h1></header>
  <section><p>Education: B.Tech ECE</p></section>
  <footer><a href="mailto:aj@gmail.com">Contact Me</a></footer>
</div>

---------------------------------
FINAL QUICK SUMMARY (EMMET)

#   → id
.   → class
[ ] → attributes
{ } → text content
$   → numbering repeated elements
>   → controls hierarchy (parent–child)

=====================================================================================

CASCADING STYLE SHEETS (CSS)
CSS is a styling language used to design and control the appearance of HTML elements
on a web page.Controls colors, fonts, spacing, layout, and responsiveness.

Example:
h1{
  color:red;
}

h1      → selector
color   → property
red     → value

-------------------------------------
3 WAYS OF STYLING IN CSS

1) Inline CSS
• Written inside HTML element
• Affects only one element

<h1 style="color:red; background-colour:orange">Hello</h1>

syntax style =" ;  ;  ;"

-used "" with ; for multiple styling

2) Internal CSS
• Written inside <style> in <head>
• Affects single HTML page

<style>
  h1{ color:blue; background-colour:black; }
  p{ color:white; }
</style>

3) External CSS
• Written in separate .css file
• Best for large websites

<link rel="stylesheet" href="style.css">

p{ color:green; }

Note:
rel = relationship
stylesheet = tells browser file is CSS

📌 Best Practice: Use External CSS for real projects.

priority:Inline CSS
↓
Internal CSS
↓
External CSS
↓
Browser default CSS


-------------------------------------
CSS COLOR SYSTEMS

Methods used to define colors.

1) Named Colors
color:red;
color:blue;
✔ Easy
❌ Limited choices

2) RGB (Red, Green, Blue)
color: rgb(255, 0, 0);
The three numbers represent Red, Green, and Blue color intensity.

✔ More control
✔ Widely used

3) HEX Codes
color:#ff0000;
✔ Compact
✔ Most commonly used


Note:
HTML color codes / RGB can be searched on Google.

---------------------------------------------------------------
CSS TEXT PROPERTIES (COMPLETE + COMPACT NOTES)
---------------------------------------------------------------
| PROPERTY        | PURPOSE                     | DETAILS / VALUES                                    | EXAMPLE                          |
---------------------------------------------------------------
| text-align      | Aligns text horizontally    | left | center | right | justify                      | text-align: justify;             |
|                 |                             | justify = aligns both sides evenly                  |                                  |
---------------------------------------------------------------
| font-weight     | Controls text thickness     | normal | bold | 100–900                          | font-weight: 700;                |
---------------------------------------------------------------
| text-decoration | Adds decorative lines       | line: underline | overline | line-through | none | text-decoration: underline; |
|                 |                             | style: solid | dotted | dashed | wavy           | text-decoration-style: wavy;     |
|                 |                             | color: sets decoration color                        | text-decoration-color: red;      |
|                 |                             | shorthand = line + style + color                    | text-decoration: underline wavy red; |
---------------------------------------------------------------
| text-transform  | Controls text capitalization| uppercase | lowercase | capitalize | none       | text-transform: uppercase;       |
---------------------------------------------------------------
| line-height     | Space between text lines    | number (recommended) | px                          | line-height: 1.5;                |
---------------------------------------------------------------
| letter-spacing  | Space between letters       | px                                                | letter-spacing: 2px;             |
---------------------------------------------------------------
| font-size       | Sets text size              | px | em | rem | %                              | font-size: 16px;                 |
---------------------------------------------------------------


Example using all 6 CSS Text Properties

HTML:
<p class="text-style">
  This is a sample paragraph to demonstrate CSS text properties.
</p>

CSS:
.text-style{
  text-align: right;
  width: 50%;
  font-weight: bold;
  text-decoration: underline;
  line-height: 1.5;
  letter-spacing: 2px;
  font-size: 16px;
}

--------------------------------------------------
CSS FONT PROPERTIES (TABLE)

--------------------------------------------------
| PROPERTY       | PURPOSE                    | VALUES / EXAMPLE              |
--------------------------------------------------
| font-family    | Sets font type             | Arial, sans-serif             |
| font-size      | Sets text size             | 16px                           |
| font-weight    | Controls text thickness    | normal | bold | 100–900 (700) |
| font-style     | Sets text style             | normal | italic | oblique     |
| font-variant   | Displays small caps         | small-caps                     |
--------------------------------------------------

--------------------------------------------------
FONT-SIZE UNITS IN CSS (TABLE)

--------------------------------------------------
| UNIT | RELATIVE TO                | EXAMPLE         | NOTES               |
--------------------------------------------------
| px   | Fixed pixel size           | 16px            | Does not scale      |
| em   | Parent font size           | 1.5em           | Inherits scaling    |
| rem  | Root (html) font size      | 1.2rem          | Consistent sizing  |
| %    | Parent element size        | 120%            | Flexible            |
| vw   | Viewport width             | 3vw             | Responsive          |
--------------------------------------------------

A pixel (Picture Element) is the smallest
addressable unit of a digital image or display.

It is a tiny square that stores color information.

Millions of pixels together form images,
text, and graphics on a screen.

2- em

Relative to parent element’s font-size in times (*1.2 times or *2.5 times ad so on).

Example:
Parent font-size = 20px
Child font-size = 1.5em

Calculation:
1.5 × 20px = 30px

Important:
If nested deeply, it keeps multiplying (can become confusing).

3- rem

Relative to root element (<html> , 16px by default).
Root element = The top-most parent element
of the entire HTML document.

Example:
html { font-size: 16px; }
p { font-size: 2rem; }

Calculation:
2 × 16px = 32px

Best for consistent responsive design.
Very commonly used in modern CSS.

4- %

Relative to parent element’s size.

Example:
width: 50%;

Means:
50% of parent container width.

Used heavily in responsive layouts.

--------------------------------------------------
SCENARIOS WHERE WE USE % IN CSS
--------------------------------------------------

1) RESPONSIVE LAYOUTS
--------------------------------------------------
When you want elements to adjust according
to screen size.

Example:
.container {
    width: 90%;
}

Container will take 90% of screen width.
On mobile → smaller
On laptop → bigger


2) TWO COLUMN LAYOUT
--------------------------------------------------

.left {
    width: 70%;
}

.right {
    width: 30%;
}

Both columns adjust automatically
based on parent width.


3) CENTERING WITH MARGIN
--------------------------------------------------

.box {
    width: 50%;
    margin: auto;
}

Box takes half of parent width
and stays centered.


4) IMAGE SCALING
--------------------------------------------------

img {
    width: 100%;
}

Image will fill entire parent container
without overflowing.


5) BUTTON OR CARD INSIDE CONTAINER
--------------------------------------------------

.parent {
    width: 400px;
}

.child {
    width: 80%;
}

Child width = 80% of 400px
Automatically resizes if parent changes.


--------------------------------------------------
WHEN % IS VERY USEFUL
--------------------------------------------------
- Responsive design
- Flexible layouts
- Fluid grids
- Making UI adapt to screen size

==================================================

%  → Layout scaling
      Commonly used for:
      width, height, margin, padding,
      responsive containers, images

em → Text-based scaling
      Commonly used for:
      font-size, padding, margin,
      button spacing, component sizing

rem → Root-based scaling (safer than em)
      Commonly used for:
      font-size, spacing, consistent
      typography, global scaling

==================================================

--------------------------------------------------
INTERVIEW SUMMARY
--------------------------------------------------
% = Relative to parent size
Best for responsive & flexible layouts
--------------------------------------------------
Definition:
Viewport is the visible area of a web page
on a user’s screen.

5(a)-vw (Viewport Width)

1vw = 1% of total screen width.

If screen width = 1000px
1vw = 10px

Example:
width: 50vw;

Means:
50% of screen width.

5-b-vh (Viewport Height)

1vh = 1% of total screen height.

If screen height = 800px
1vh = 8px

Example:
height: 100vh;

Means:
Full screen height.

================================================================================================================================
WHAT IS VIEWPORT?

Viewport = The visible area of the webpage inside the browser window.

It changes when:

You resize browser window

You switch from laptop to mobile

You rotate phone

Example:
On laptop → viewport is large.
On mobile → viewport is small.

vw and vh adjust automatically based on viewport size.

================================================================================================================================
INTERVIEW READY DEFINITION

Viewport is the visible area of a webpage inside the browser window, and units like
vw and vh are calculated based on its width and height.



Summary:
Font properties control how text looks.
Font-size units define how text scales.

--------------------------------------------------
CSS UNITS: ABSOLUTE vs RELATIVE

--------------------------------------------------------------------
| UNIT | TYPE      | RELATIVE TO / MEANING        | EXAMPLE |
--------------------------------------------------------------------
| px   | Absolute  | Screen pixel                | 16px    |
| pt   | Absolute  | Point (1/72 inch)           | 12pt    |
| pc   | Absolute  | Pica (12 points)            | 1pc     |
| cm   | Absolute  | Centimeter                  | 2cm     |
| mm   | Absolute  | Millimeter                  | 10mm    |
| in   | Absolute  | Inch (96px)                 | 1in     |
--------------------------------------------------------------------
| %    | Relative  | Parent element size         | 120%    |
| em   | Relative  | Parent font size            | 1.5em   |
| rem  | Relative  | Root (html) font size       | 1.2rem  |
| vw   | Relative  | Viewport width              | 3vw     |
| vh   | Relative  | Viewport height             | 5vh     |
--------------------------------------------------------------------

Summary:
Absolute units = fixed size
Relative units = responsive size

Final Note:
These properties improve text readability and styling.
We can go to MDN website to understand CSS better.


Inline style        (style="")
ID selector         (#id)
Class selector      (.class)
Element selector    (p, div)
Universal selector  (*)

========================
DISPLAY PROPERTY (BLOCK ↔ INLINE CONVERSION)
================================================================

1) BLOCK → INLINE
----------------------------------------------------------------

Default Block Elements:
div, p, h1-h6, section, article

Block Behavior:
- Starts on new line
- Takes full width (100%)
- width & height work

Convert to Inline:

HTML:
<div class="box">Hello</div>

CSS:
.box {
  display: inline;
}

After Conversion:
- Does NOT start on new line
- width & height do NOT apply properly


2) INLINE → BLOCK
----------------------------------------------------------------

Default Inline Elements:
span, a, strong, em

Inline Behavior:
- Does NOT start on new line
- Takes only required width
- width & height do NOT work

Convert to Block:

HTML:
<span class="text">Hello</span>

CSS:
.text {
  display: block;
}

After Conversion:
- Starts on new line
- Takes full width
- width & height work


3) INLINE-BLOCK (MOST PRACTICAL)
----------------------------------------------------------------

CSS:
.box {
  display: inline-block;
  width: 150px;
  height: 50px;
}

Behavior:
- Does NOT start on new line (like inline)
- Takes only required width (not full width)
- width & height work
- padding & margin work properly

Common Uses:
- Buttons
- Navigation menus
- Cards
- Image layouts


QUICK COMPARISON
----------------------------------------------------------------

Feature           | Block      | Inline     | Inline-Block
------------------------------------------------------------
New Line          | Yes        | No         | No
Full Width        | Yes        | No         | No
Width/Height Work | Yes        | No         | Yes
Padding/Margin    | Yes        | Limited    | Yes

================================================================
KEY IDEA:
Block = New line + Full width
Inline = Same line + Content width
Inline-block = Same line + Custom size (Best of both)
================================================================

================================================================================================================================
IMPORTANT CONCEPT
Why does display: inline remove width & height behavior?
================================================================

LAYOUT LOGIC
----------------------------------------------------------------

1) BLOCK ELEMENT

- Creates a rectangular layout box
- Occupies full horizontal width by default
- Browser allows explicit width & height

Because it is a layout box, the browser respects:
  width
  height
  margin- Space OUTSIDE the element, between this element and other elements.
  padding - Space INSIDE the element, between content and border.


2) INLINE ELEMENT

- Flows like text inside a sentence
- Exists inside a "line box"
- Width depends only on content
- Height controlled by line-height
- Does NOT create a full rectangular layout box
- Designed for text-level elements

Inline elements behave like words in a paragraph.


EXAMPLE
----------------------------------------------------------------

Sentence:
Hello world

Each word behaves like an inline element.

You cannot apply:
  width: 200px;

to the word "Hello".

It automatically adjusts to its content size.

Inline = content-sized, text-flow behavior.


WHAT HAPPENS WHEN YOU WRITE
----------------------------------------------------------------

.box {
  display: inline;
  width: 200px;
  height: 100px;
}

Result:

- Browser ignores width
- Browser ignores height

Reason:

Inline elements behave like text, not layout boxes.
They live inside a line formatting context.
So sizing properties are not applied.


HOW TO FIX THIS PROPERLY
----------------------------------------------------------------

Use:

display: inline-block;

This:

- Keeps the element inline (no new line)
- Forces browser to create a rectangular box
- Allows width & height
- Allows vertical margin
- Keeps content side-by-side

Best practical solution in real projects.


WHY INLINE-BLOCK WORKS
----------------------------------------------------------------

It combines:

Inline behavior  → stays in same line
Block behavior   → creates measurable box

So now width, height, margin, padding all work.


================================================================
INTERVIEW READY ANSWER
================================================================

Inline elements behave like text inside a line box,
so width and height do not apply.

To allow sizing while keeping inline behavior,
we use display: inline-block.
================================================================