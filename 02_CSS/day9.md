========================================================================
CSS BOX MODEL (COMPACT NOTES)
========================================================================

WHAT IS BOX MODEL?
-----------------
Every HTML element is treated as a rectangular BOX in CSS.
It controls element size, spacing, and layout on the page.

Box Model = Content + Padding + Border + Margin


--------------------------------
CSS BOX MODEL – SINGLE SHORT EXAMPLE
================================================================

HTML:
<div class="box">Hello</div>

CSS:
.box{
  width:200px;              /* CONTENT width */
  height:100px;             /* CONTENT height */
  padding:20px;             /* Space inside border */
  border:5px solid black;   /* Wraps padding + content */
  margin:30px;              /* Space outside element */
}

EXPLANATION
----------------------------------------------------------------
Content  → Actual text area (200x100)
Padding  → Space between content & border (adds to total size)
Border   → Surrounds padding (visible outline)
Margin   → Outer gap between elements (outside border)

Total width  = 200 + 40 + 10 = 250px
Total height = 100 + 40 + 10 = 150px
(margin not included in total element size)

================================================================


VISUAL ORDER
------------
[ Margin ]
  [ Border ]
    [ Padding ]
      [ Content ]


WIDTH & HEIGHT RULE (DEFAULT)
----------------------------
Total element size =
width + padding + border

Note:
Margin adds extra space OUTSIDE the element.


BOX-SIZING PROPERTY
------------------

1) content-box (DEFAULT)
-----------------------
- width = content only
- padding + border added outside
- Element grows outward

2) border-box
-------------
- width includes padding + border
- Total width remains fixed
- Content shrinks automatically
- Layout becomes predictable



Key Line:
---------
content-box → grows outward
border-box  → adjusts inward


EXAMPLE : BORDER-BOX
-------------------
div {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  box-sizing: border-box;
}

Result:
-------
Total width = 200px
(Content shrinks internally)

==================================================
WHY border-box IS PREFERRED
==================================================

✔ Easier layout control
✔ Predictable sizing
✔ No unexpected overflow
✔ Better for responsive design


SHORTHAND RULES (Padding & Margin)
---------------------------------
Same rules apply for BOTH padding & margin

1 value  : all sides
2 values : top/bottom | left/right
3 values : top | left/right | bottom
4 values : top | right | bottom | left

Memory:
-------
TRBL (Clockwise)


ACTUAL SPACE CALCULATION (content-box)
--------------------------------------
Content width  = 200px
Padding (L+R)  = 20 + 20 = 40px
Border  (L+R)  = 5 + 5   = 10px

Element width  = 200 + 40 + 10 = 250px

Margin (L+R)   = 40 + 40 = 80px

Total horizontal space used:
250 + 80 = 330px


WHY BOX MODEL MATTERS
--------------------
✔ Controls spacing & layout
✔ Prevents unexpected size issues
✔ Essential for responsive design


ONE-LINE SUMMARY
----------------
Box Model defines how CSS calculates
element size and spacing.

========================================================================
========================================================================
BLOCK vs INLINE vs INLINE-BLOCK (CSS NOTES)
========================================================================

FEATURE COMPARISON
------------------
Feature                | Block              | Inline             | Inline-block
-----------------------|--------------------|--------------------|-------------
New line               | Starts new line    | Same line          | Same line
Width                  | Full width         | Content only       | Content / settable
Height & Width         | Can be set         | Ignored            | Can be set
Margin (L / R)         | Works              | Works              | Works
Margin (Top / Bottom)  | Works              | Does NOT work      | Works
Padding (L / R)        | Works              | Works              | Works
Padding (Top / Bottom) | Works              | Applies, overlaps  | Works
Box model support      | Full               | Partial            | Full
Contain elements       | Can contain inline | Cannot contain blk | Can contain inline
Layout control         | Strong             | Limited            | Strong
Common use             | Page layout        | Text styling       | UI elements


BLOCK ELEMENTS
--------------
- Always start on a new line
- Take full available width
- width & height work
- Margin & padding work on all sides
- Used for page structure

Example:
<div style="margin:20px; padding:10px;">Box</div>
→ Proper spacing in all directions


INLINE ELEMENTS
---------------
- Stay in the same line (no line break)
- Behave like normal text
- width & height are ignored
- Take space only as per content

Spacing rules:
- margin-left / margin-right → works
- margin-top / margin-bottom → does NOT work
- padding-left / padding-right → works
- padding-top / padding-bottom → applies visually but
  does NOT push elements (may overlap)

Box model note:
- Inline elements do NOT fully respect box model

Example:
<span style="margin:20px; padding:10px;">Text</span>
→ Left/right spacing works
→ Top/bottom spacing overlaps


DISPLAY VALUES (QUICK)
---------------------

display: block
---------------
- New line
- Full width
- width, height, margin, padding all work

display: inline
----------------
- Same line
- Size depends on content only
- Weak box model behavior


INLINE-BLOCK
------------
Why?
-----
Inline elements lack full box model control,
inline-block gives inline flow + full spacing.

Behavior:
---------
- Stays in same line
- No line break
- Elements sit side by side

Box Model Support:
------------------
- width & height → works
- margin → works (all sides)
- padding → works (all sides)
- border → works properly

Quick Comparison:
-----------------
inline        → same line, no width/height
block         → new line, full width
inline-block  → same line + full box control

Example:
--------
span {
  display: inline-block;
  width: 150px;
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
}

Use Cases:
----------
- Buttons
- Navigation items
- Cards in a row
- Inline layouts needing spacing control


ONE-LINE SUMMARIES
-----------------
Block        → full layout control
Inline       → text-level spacing only
Inline-block → inline layout + block-level box control

========================================================================

====================================================
CSS RELATIVE UNITS — QUICK NOTES (NOTEPAD STYLE)
====================================================

WHAT ARE RELATIVE UNITS?
-----------------------
• Size depends on another value (parent / root / viewport / font-size)
• Naturally RESPONSIVE


====================================================
MAIN RELATIVE UNITS
====================================================

1) em  (Parent-based)
--------------------
• Relative to PARENT font-size
• Cascades & multiplies with nesting

Example:
Parent font-size = 20px
2em = 40px

Cons (IMPORTANT):
• Compounding / snowball effect
• Hard to predict in deep nesting
• Small parent change affects many children
• Difficult to maintain in large layouts

Use when:
• Element should scale WITH parent text


----------------------------------------------------

2) rem  (Root-based)
-------------------
• Relative to ROOT (html) font-size
• Does NOT cascade

Default:
html font-size = 16px
1rem = 16px

Use when:
• Consistent sizing across whole site
• Preferred for typography


----------------------------------------------------

3) %  (Context-based)
--------------------
• Relative to PARENT element
• Meaning depends on property

Property behavior:
• width   → % of parent width
• height  → % of parent height (if defined)
• padding/margin → % of parent WIDTH
• font-size → % of parent font-size

Example:
Parent width = 500px
50% = 250px


----------------------------------------------------

4) vw  (Viewport Width)
----------------------
• Relative to browser WIDTH
• 1vw = 1% of viewport width

Example:
Viewport = 1200px
10vw = 120px


----------------------------------------------------

5) vh  (Viewport Height)
-----------------------
• Relative to browser HEIGHT
• 1vh = 1% of viewport height

Example:
Viewport = 800px
10vh = 80px


----------------------------------------------------

6) vmin
-------
• Relative to SMALLER viewport side
• Good for proportional scaling

Example:
Viewport = 1200 x 800
1vmin = 8px


----------------------------------------------------

7) vmax
-------
• Relative to LARGER viewport side

Example:
Viewport = 1200 x 800
1vmax = 12px


====================================================
QUICK COMPARISON (HORIZONTAL VIEW)
====================================================

Unit   → Relative To
--------------------
em     → Parent font-size
rem    → Root font-size
%      → Parent element
vw     → Viewport width
vh     → Viewport height
vmin   → Smaller viewport side
vmax   → Larger viewport side


====================================================
WHICH UNIT TO USE?
====================================================

• Typography        → rem / em
• Layout width      → % / vw
• Full screen UI    → vh
• Responsive scale  → vmin / vmax


====================================================
ONE-LINER
====================================================

Relative units make layouts flexible,
responsive, and screen-friendly.
====================================================
--------------------------------------------------
WHEN SCREEN SIZE REDUCES,
HOW TO MAKE LAYOUT ADJUST?
--------------------------------------------------

Short Answer:
Use RESPONSIVE DESIGN techniques,
not just flex-shrink or overflow.


==================================================
WHAT TO USE IN COMMON?
==================================================

1) % , rem , vw , vh  (Flexible Units)
--------------------------------------------------
Avoid fixed px for layout.

Example:
width: 90%;
max-width: 1200px;

Helps elements resize automatically.


2) FLEXBOX (Very Common)
--------------------------------------------------
Best modern solution.

.parent {
    display: flex;
    flex-wrap: wrap;
}

Allows items to:
- Shrink
- Move to next line
- Adjust automatically


3) flex-shrink
--------------------------------------------------
Used INSIDE flexbox only.

Controls how items shrink when space reduces.

Example:
.item {
    flex-shrink: 1;
}

But alone it does NOT make full layout responsive.
It just controls shrinking behavior.


4) MEDIA QUERIES (Most Important)
--------------------------------------------------
Used to change layout at specific screen sizes.

Example:

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}

This is the MAIN tool for responsiveness.


5) overflow
--------------------------------------------------
Used when content is too large.

--------------------------------------------------
overflow: hidden;
--------------------------------------------------
Hides any content that exceeds the element’s size.

--------------------------------------------------
overflow: auto;
--------------------------------------------------
Adds scrollbars ONLY if content exceeds the element’s size.
--------------------------------------------------
It does NOT make layout responsive.
It only controls extra content.


==================================================
BEST PRACTICE (REAL WORLD)
==================================================

✔ Use Flexbox or Grid
✔ Use % and rem instead of fixed px
✔ Use media queries
✔ Use max-width instead of fixed width

Example:

.container {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: auto;
}

--------------------------------------------------
INTERVIEW SUMMARY
--------------------------------------------------

Responsive layout is achieved using:
- Flexible units (% , rem)
- Flexbox or Grid
- Media queries

flex-shrink → minor adjustment tool
overflow    → handles extra content only
--------------------------------------------------

FLEXBOX – SHORT NOTES (INTERVIEW READY)
DEFINITION

Flexbox (Flexible Box Layout) is a one-dimensional layout system in CSS used to arrange
items in a row or column with proper alignment, spacing, and distribution.

WHY FLEXBOX?

Before Flexbox:

Layout was difficult (float, inline-block hacks)

Vertical centering was hard

Equal spacing was complex

Flexbox solves:
✔ Alignment
✔ Spacing
✔ Centering
✔ Responsive distribution
✔ Dynamic resizing

================================================================================================================================
CORE CONCEPT

When you apply:

display: flex;

The element becomes a FLEX CONTAINER.
Its children become FLEX ITEMS.

Example:
.container {
display: flex;
}
================================================================================================================================
MAIN AXIS vs CROSS AXIS

Flexbox works in one direction at a time.

Main Axis → Direction of flex items (row or column)
Cross Axis → Perpendicular to main axis

Default:
flex-direction: row;

Main Axis → Horizontal
Cross Axis → Vertical

================================================================================================================================
IMPORTANT CONTAINER PROPERTIES

flex-direction

row → left to right (default)
row-reverse → right to left
column → top to bottom
column-reverse → bottom to top

justify-content (Controls MAIN AXIS alignment)

flex-start → items at start
flex-end → items at end
center → center horizontally
space-between → equal space between
space-around → equal space around
space-evenly → equal spacing everywhere

align-items (Controls CROSS AXIS alignment)

stretch → default
flex-start → top
flex-end → bottom
center → vertical center

flex-wrap

nowrap → default (single line)
wrap → moves items to next line

================================================================================================================================
IMPORTANT ITEM PROPERTIES

flex-grow

Defines how much item should grow.

Example:
.item {
flex-grow: 1;
}

Higher value → takes more space

flex-shrink

Defines how much item should shrink when space is less.

flex-basis

Initial size before growing/shrinking.

Example:
flex-basis: 200px;

flex (shorthand)

flex: grow shrink basis;

Example:
flex: 1 1 200px;

================================================================================================================================
MOST COMMON INTERVIEW EXAMPLE

How to center a div horizontally and vertically?

.container {
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
}

This perfectly centers content.

================================================================================================================================
REAL PROJECT USAGE

Used for:
✔ Navigation bars
✔ Cards layout
✔ Centering content
✔ Responsive rows
✔ Equal height columns
✔ Button groups

================================================================================================================================
ADVANTAGES

✔ Easy alignment
✔ Cleaner code
✔ No float hacks
✔ Better responsive behavior

================================================================================================================================
LIMITATION

Flexbox is one-dimensional (row OR column).
For two-dimensional layouts → use CSS Grid.

================================================================================================================================
INTERVIEW ONE-LINE ANSWER

Flexbox is a one-dimensional CSS layout system used to align, distribute, and space
elements efficiently along a main axis and cross axis.

If you want next:
I can give a small real-world layout example (navbar + cards) in proper interview-ready format.