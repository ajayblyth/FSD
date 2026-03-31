CSS grid multipass property

1-fully positioned item first-items with explicir eow and column values get placed first having highest priority .
2-Row defined items second.
3-Column defined items third.
4- Auto positioned items last.

=====================================
==============================
CSS Grid – grid-area (Notes)
==============================

What is grid-area?
------------------
grid-area is a CSS property used to place a grid item
inside a grid by specifying its row and column position.

It combines:
- grid-row-start
- grid-column-start
- grid-row-end
- grid-column-end

Syntax (numbers)
----------------
grid-area: row-start / col-start / row-end / col-end;

Example:
---------
grid-area: 1 / 2 / 3 / 4;

Means:
- start at row 1
- start at column 2
- end before row 3
- end before column 4

--------------------------------

Syntax (named areas)
--------------------
grid-area: header;

Used with grid-template-areas.

--------------------------------

Using grid-template-areas
-------------------------
Parent:
grid-template-areas:
"header header"
"sidebar main"
"footer footer";

Child:
.header  { grid-area: header;  }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main;    }
.footer  { grid-area: footer;  }

--------------------------------

Key Points
----------
- grid-area is OPTIONAL (shortcut only)
- Works ONLY in grid container
- Numbers = manual placement
- Names = layout-based placement
- Easier to READ than row/column properties

--------------------------------

When to use
-----------
- Use numbers → fine control
- Use names   → page layouts (header, sidebar, footer)

--------------------------------

Common Mistake
--------------
❌ Using grid-area without display:grid
❌ Wrong order of values

Correct order:
row-start / column-start / row-end / column-end

=================================================



=================================
CSS Animation (Notepad Notes)
=================================

CSS Animations:
we can control the transition between two states  by providing greater control than tranistions.

What is CSS Animation?
---------------------
Used to animate elements .
Runs using keyframes.

---------------------------------

@keyframes
----------
Defines animation steps.

Syntax:
@keyframes animName {
  from { }
  to   { }
}

OR

@keyframes animName {
  0%   {font-size:20px; }
  50%  {font-size:30px; }
  100% { font-size:40px;}
}

---------------------------------

animation (shorthand)
---------------------
animation: name duration timing-function delay iteration-count direction fill-mode play-state;

Example:
animation: move 2s ease 0s infinite normal forwards running;

---------------------------------

Animation Properties
--------------------

1. animation-name
   Name of @keyframes
   Example: animation-name: move;

2. animation-duration
   Total time of animation
   Example: 2s | 500ms

3. animation-timing-function
controls the curver like ease, linear, ease in out
   Speed curve
   Values:
   - linear
   - ease (default)
   - ease-in
   - ease-out
   - ease-in-out
   - cubic-bezier()

4. animation-delay
   Wait time before start
   Example: 1s | -1s (starts midway)

5. animation-iteration-count
   Number of runs of animation
   Example:
   - 1
   - infinite

6. animation-direction
   Direction of each run
   Values:
   - normal
   - reverse
   - alternate
   - alternate-reverse

7. animation-fill-mode
   Style BEFORE / AFTER animation
   Values:
   - none (default)
   - forwards
   - backwards
   - both

8. animation-play-state
   Play or pause animation
   Values:
   - running
   - paused

---------------------------------

Example
-------
.box {
  animation: slide 1.5s ease-in-out 0s infinite alternate;
}

---------------------------------

Key Differences
---------------
- transition → event based (hover, click)
- animation  → continuous / auto run

---------------------------------

Important Notes
---------------
- animation-name required
- duration must be > 0
- runs even without user action
- multiple animations allowed

Example:
animation: move 2s linear, fade 1s ease;

---------------------------------

Common Mistakes
---------------
❌ duration missing
❌ keyframes name mismatch
❌ using transition properties in animation

=====================================================

=================================
CSS Media Queries (Notes)
=================================

What is Media Query?
-------------------

A media query is a CSS technique used to apply
styles based on device characteristics such as
screen size, resolution, orientation, or media type.

It is mainly used to create responsive designs.

---------------------------------

Basic Syntax
------------
@media media-type and (condition) {
  CSS rules;
}


---------------------------------

Media Types
-----------
- all (default)
- screen
- print
- speech (rare)

---------------------------------

Common Conditions
-----------------
- max-width
- min-width
- width
- orientation
- resolution
- hover

---------------------------------

Example 1: Mobile First
-----------------------
/* default = mobile */

@media (min-width: 768px) {
  body { background: blue; }
}

@media (min-width: 1024px) {
  body { background: green; }
}

---------------------------------

Example 2: Desktop First
------------------------
@media (max-width: 1024px) {
  body { background: orange; }
}

@media (max-width: 768px) {
  body { background: red; }
}

---------------------------------

Example 3: Orientation
----------------------
@media (orientation: portrait) {
  .box { width: 100%; }
}

@media (orientation: landscape) {
  .box { width: 50%; }
}

---------------------------------

Example 4: Print Media
----------------------
@media print {
  body { color: black; }
  nav  { display: none; }
}

---------------------------------

Example 5: Multiple Conditions
-------------------------------
@media (min-width: 600px) and (max-width: 900px) {
  .container { padding: 20px; }
}

---------------------------------

Example 6: Hover Support
------------------------
@media (hover: hover) {
  button:hover { background: green; }
}

---------------------------------

Breakpoints (Common)
--------------------
- Mobile    : < 600px
- Tablet    : 600px – 900px
- Laptop    : 900px – 1200px
- Desktop   : > 1200px

---------------------------------

Key Points
----------
- Used for responsive design
- Mobile-first preferred
- Use min-width for scalability
- Order matters (CSS cascade)

---------------------------------

Common Mistakes
---------------
❌ Overlapping breakpoints
❌ Using only max-width
❌ Forgetting mobile-first base CSS




-------------------------------------


