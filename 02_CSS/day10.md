======================================================================
CSS NOTES : OPACITY  vs  ALPHA (RGBA / HSLA)
======================================================================

1) OPACITY (CSS PROPERTY)
------------------------
Definition : Controls transparency of the ENTIRE element
             (background + text + images + children)

Syntax     : opacity: value;

Range      : 0 (transparent) | 1 (visible) | 0.5 (50%)

Example    :
div {
    opacity: 0.5;
}

Effect     : ✔ Background transparent   ✔ Text transparent
             ✔ Images transparent      ✔ Children affected

Key Point  : Opacity affects EVERYTHING inside the element
Use Case   : Fade whole element together (box + content)


2) ALPHA (COLOR TRANSPARENCY – RGBA / HSLA)
------------------------------------------
Definition : Alpha is the transparency channel in color values
             It affects ONLY the color layer, not content

Syntax     : rgba(r, g, b, a) | hsla(h, s, l, a)

Alpha Range: 0 (transparent) | 1 (visible)

Example    :
div {
    background-color: rgba(0, 0, 0, 0.5);
}

Effect     : ✔ Background transparent
             ✘ Text solid   ✘ Children solid

Key Point  : Alpha affects ONLY the color, NOT the element
Use Case   : UI overlays, cards, modals, professional designs


3) CORE DIFFERENCE (ONE LOOK)
-----------------------------
Opacity → Element-level transparency  
Alpha   → Color-level transparency  


4) SIDE-BY-SIDE COMPARISON
--------------------------
Feature              | Opacity            | Alpha (RGBA / HSLA)
---------------------|--------------------|---------------------
Applies to           | Whole element      | Only color
Affects text         | YES                | NO
Affects children     | YES                | NO
Transparency control | Limited            | Precise
UI overlays          | ❌ Not suitable     | ✅ Best choice
Professional usage   | Rare               | Very common


5) REAL WORLD UI EXAMPLE
------------------------

❌ Bad (using opacity):
.card {
    opacity: 0.5;
}
→ Background + text both fade ❌

✅ Correct (using alpha):
.card {
    background-color: rgba(255, 0, 0, 0.5);
}
→ Background transparent
→ Text clear and readable ✅


6) RGBA QUICK RECAP
-------------------
RGBA = RGB + Alpha (transparency)

Format : rgba(red, green, blue, alpha)
Example: rgba(0, 0, 0, 0.5)

Used for:
✔ Overlays   ✔ Modals   ✔ Cards   ✔ UI transparency


7) INTERVIEW ONE-LINER
---------------------
"Opacity affects the entire element and its children,
while alpha transparency affects only the color."


8) MEMORY TRICK
---------------
Opacity = Whole box fade  
Alpha   = Only color fade  

======================================================================
CSS NOTES : TRANSITIONS
======================================================================

Definition :
------------
CSS transitions allow smooth animation between two states
of an element when a property value changes.

Trigger :
---------
✔ Property value changes
✔ Usually via :hover, :focus, :active

Effect :
--------
Without transition → sudden change
With transition    → smooth animated change


SYNTAX :
--------
transition: property duration timing-function delay;

Example :
---------
div {
    transition: background-color 0.3s ease;
}


TRANSITION PROPERTIES (CORE)
----------------------------

1) transition-duration
----------------------
Controls how long the transition takes.

Units : s (seconds) | ms (milliseconds)
Example:
transition-duration: 0.5s;


2) transition-timing-function
-----------------------------
Controls HOW speed changes over time
(speed curve of the transition).

Common values:
--------------
ease        → slow → fast → slow (default)
linear      → constant speed
ease-in     → slow start
ease-out    → slow end
ease-in-out → slow → fast → slow

steps(6, end):
--------------
✔ Divides transition into 6 fixed jumps
✔ No smooth motion (stair-step effect)
✔ end → change happens at END of each step
In start Jump happens at the start of each step
at the end of each step, it waits and then change to next step at the end 

Example:
transition-timing-function: ease-in-out;


3) transition-delay
-------------------
Wait time before transition starts.

Example:
transition-delay: 0.2s;


SHORTHAND USAGE
---------------
transition: property duration timing-function delay;

Example:
transition: background-color 0.4s ease-in 0s;


SIMPLE HOVER EXAMPLE
-------------------
button {
    background-color: blue;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: red;
}

Result :
--------
✔ Smooth color change on hover


======================================================================
CSS NOTES : TRANSFORM (INTRO)
======================================================================

Definition :
------------
transform visually changes an element’s shape, size,
position, or rotation WITHOUT affecting page layout.

Key Points :
-----------
✔ Layout is NOT disturbed
✔ GPU accelerated (fast & smooth)
✔ Commonly used with transitions

======================================================================
CSS NOTES : TRANSFORM FUNCTIONS
======================================================================

1) translate()
--------------
Purpose : Moves element from its original position

Syntax  : transform: translate(x, y);
Example : transform: translate(20px, 10px);

Shortcuts:
translateX(20px) | translateY(10px)


2) scale()
----------
Purpose : Changes SIZE of element

Syntax  : transform: scale(value) | scale(x, y)

Values  :
scale(1)   → original size
scale(1.2) → zoom in
scale(0.8) → zoom out

Axis-wise :
scaleX(1.5) → width increase
scaleY(0.7) → height decrease

Key Points:
✔ Does NOT push other elements
✔ Scales from center by default

Example :
transform: scale(1.5);


3) rotate()
-----------
Purpose : Rotates element

Syntax  : transform: rotate(angle)
Example : transform: rotate(45deg)

Note    :
rotate(-30deg) → left rotation


4) skew()
---------
Purpose : Tilts / slants element

Syntax  : transform: skew(x-angle, y-angle)
Example : transform: skew(20deg, 10deg)

Shortcuts:
skewX(20deg) | skewY(10deg)


MULTIPLE TRANSFORMS
------------------
Syntax : transform: scale(1.2) rotate(10deg)

Rule   :
✔ Order matters
✔ Applied left → right


TRANSFORM ORIGIN
----------------
Definition : Point from where transform is applied
Default    : center center
Example    : transform-origin: top left;


TRANSFORM + TRANSITION
---------------------
.card {
    transition: transform 0.3s ease;
}
.card:hover {
    transform: scale(1.1);
}


COMMON USE CASES
----------------
✔ Image zoom on hover   ✔ Button press effect
✔ Card hover animation ✔ UI micro-interactions


INTERVIEW LINE
--------------
"scale() resizes an element visually without affecting layout."


MEMORY TRICK
------------
Translate → Move | Scale → Size | Rotate → Turn | Skew → Tilt

======================================================================






