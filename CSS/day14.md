==================================================
CSS GRID – COMPLETE NOTES (NOTEPAD STYLE)
==================================================

What is CSS Grid?
-----------------
CSS Grid is a TWO-DIMENSIONAL layout system
(rows + columns) used to build layouts.

==================================================
GRID MODEL (VERY IMPORTANT)
==================================================

1. Grid Container
-----------------
The parent element where grid is applied.

display: grid;

2. Grid Item
------------
Direct children of grid container.

3. Grid Cell
------------
Single unit formed by one row × one column.
(Similar to one table cell)

4. Grid Track
-------------
Space between two adjacent grid lines.
• Column track → vertical track
• Row track    → horizontal track

5. Grid Lines
-------------
Invisible lines that divide rows & columns.
Used for placing items.

Example:
--------
grid-column: 1 / 3;
(From line 1 to line 3)

6. Grid Area
------------
Rectangular area made of multiple cells.
Can be named or unnamed.


Note: if we dont mention rows/column, then it creates multiple rows and one column.
-every cell accomodates 1 item
============================
========================================================
CSS GRID TEMPLATE – SHORT & PRECISE (NOTEPAD)
========================================================

Purpose
-------
grid-template → defines grid structure (rows, columns, areas)

--------------------------------------------------------
1) grid-template-columns
--------------------------------------------------------
Defines number & width of COLUMNS

Syntax:
-------
grid-template-columns: 100px 1fr 2fr;
grid-template-columns: repeat(3, 1fr);
grid-template-columns: minmax(150px, 1fr);
grid-template-columns: auto auto auto;

--------------------------------------------------------
2) grid-template-rows
--------------------------------------------------------
Defines number & height of ROWS

Syntax:
-------
grid-template-rows: 100px auto;
grid-template-rows: repeat(2, 1fr);
grid-template-rows: minmax(80px, auto);

--------------------------------------------------------
3) grid-template-areas
--------------------------------------------------------
Defines named layout structure

Syntax:
-------
grid-template-areas:
"header header"
"sidebar main"
"footer footer";

Usage:
------
grid-area: header;

--------------------------------------------------------
4) grid-template (SHORTHAND)
--------------------------------------------------------
Combines rows + columns + areas

Syntax:
-------
grid-template:
"header header" 80px
"sidebar main"  1fr
"footer footer" 60px
/ 200px 1fr;

--------------------------------------------------------
UNITS USED
--------------------------------------------------------
px | % | fr | auto | minmax()

--------------------------------------------------------
IMPORTANT NOTES
--------------------------------------------------------
• grid-template creates EXPLICIT grid
• Extra items → go to IMPLICIT grid
• Works only on grid container
• Areas must form rectangles

--------------------------------------------------------
COMMON RESPONSIVE PATTERN
--------------------------------------------------------
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

========================================================

==================================================
CREATING GRID STRUCTURE
==================================================

Columns:
--------
grid-template-columns: 100px 1fr 2fr;

Rows:
-----
grid-template-rows: 100px auto;

Repeat:
-------
grid-template-columns: repeat(3, 1fr);

Gap (Between tracks):
---------------------
gap: 10px;
row-gap: 10px;
column-gap: 10px;

==================================================
GRID UNITS
==================================================
px      → fixed
%       → relative
fr      → fraction of free space
auto    → content-based
minmax  → min & max size

Example:
--------
grid-template-columns: minmax(150px, 1fr);
========================================================
CSS GRID – ROW POSITIONING (NOTEPAD)
========================================================

Purpose
-------
Controls WHERE a grid item starts & ends vertically (rows)

--------------------------------------------------------
grid-row-start
--------------------------------------------------------
Defines the START grid line for the row

Syntax:
-------
grid-row-start: 1;
grid-row-start: 2;
grid-row-start: span 2;

--------------------------------------------------------
grid-row-end
--------------------------------------------------------
Defines the END grid line for the row

Syntax:
-------
grid-row-end: 3;
grid-row-end: span 2;

--------------------------------------------------------
WORKING EXAMPLE
--------------------------------------------------------
grid-row-start: 1;
grid-row-end: 3;
→ item occupies rows 1 to 2

--------------------------------------------------------
SPAN KEYWORD
--------------------------------------------------------
grid-row: span 2;
→ item spans 2 rows from its start

--------------------------------------------------------
SHORTHAND
--------------------------------------------------------
grid-row: 1 / 3;
grid-row: 2 / span 2;

--------------------------------------------------------
IMPORTANT NOTES
--------------------------------------------------------
• Uses GRID LINES, not row numbers
• End line is NOT included
• Works only on grid items
• Negative values count from end (-1)

--------------------------------------------------------
VISUAL UNDERSTANDING
--------------------------------------------------------
Lines:  1 | 2 | 3 | 4
Rows :    R1   R2   R3

grid-row: 2 / 4 → occupies R2 & R3

========================================================


==================================================
NAMED GRID AREAS
==================================================

Define layout:
--------------
grid-template-areas:
"header header"
"sidebar main"
"footer footer";

Assign to item:
---------------
grid-area: header;

==================================================
IMPLICIT vs EXPLICIT GRID
==================================================

Explicit Grid:
--------------
Defined using grid-template-rows/columns

Implicit Grid:
--------------
Auto-created when items exceed defined grid

Control implicit tracks:
------------------------
grid-auto-rows: 100px;
grid-auto-columns: 1fr;

==================================================
AUTO PLACEMENT
==================================================
grid-auto-flow:
---------------
row | column | dense

dense → fills gaps automatically

==================================================
ALIGNMENT (INSIDE GRID CELLS)
==================================================
justify-items → horizontal
align-items   → vertical

Values:
-------
start | center | end | stretch

==================================================
ALIGNMENT (ENTIRE GRID)
==================================================
justify-content → horizontal grid alignment
align-content   → vertical grid alignment

Values:
-------
start | center | space-between | space-around

==================================================
RESPONSIVE GRID PATTERN
==================================================
repeat(auto-fit, minmax(200px, 1fr))

==================================================
GRID vs FLEXBOX
==================================================
Grid     → 2D (rows + columns)
Flexbox  → 1D (row OR column)

==================================================
WHEN TO USE GRID
==================================================
• Full page layout
• Dashboards
• Cards & galleries
• Header / Sidebar / Footer

==================================================
ABSOLUTE MUST-KNOW TERMS (INTERVIEW)
==================================================
Grid Container
Grid Item
Grid Cell
Grid Track
Grid Line
Grid Area
Explicit Grid
Implicit Grid
==================================================
