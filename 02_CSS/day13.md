===================================================
CSS FLEXBOX — COMPACT & ORGANISED NOTES
===================================================

Flexbox (Flexible Box Layout) is a ONE-DIMENSIONAL layout system
used to arrange elements in a ROW or COLUMN with precise control
over alignment, spacing, sizing, responsiveness, and easy centering.


When a container is set to display: flex;
→ all its IMMEDIATE children become flex items
→ items align automatically along one direction, default is row/horizontal.
→ explicit height/width does not break alignment

===================================================
FLEXBOX AXIS (VERY IMPORTANT)
===================================================

Main Axis  → direction items are laid out
Cross Axis → direction perpendicular to main axis


flex-direction | Main Axis    | Cross Axis
---------------|--------------|-------------
row            | horizontal   | vertical
column         | vertical     | horizontal

---------------------------------------------

===================================================
BASIC TERMINOLOGY
===================================================

Flex Container → Parent (display: flex)
Flex Items     → Direct children only

Enable flexbox:
---------------
display: flex;        → block-level container
display: inline-flex; → inline container


===================================================
FLEX DIRECTION (MAIN AXIS CONTROL)
===================================================

Syntax:
-------
flex-direction: row | row-reverse | column | column-reverse;

Meaning:
--------
row         → left to right (default)
row-reverse → right to left
column      → top to bottom
column-reverse → bottom to top


===================================================
MAIN AXIS ALIGNMENT — justify-content
===================================================

Purpose:
--------
Controls spacing & alignment along MAIN AXIS
(horizontal in row, vertical in column)

Values:
-------
Value           | Meaning
----------------|-----------------------------------------
flex-start      | Items start from main axis beginning
center          | Items centered on main axis
flex-end        | Items move to end of main axis
space-between   | Space only between items (edges fixed)
space-around    | Equal space around items (edges half)
space-evenly    | Equal space everywhere (items + edges)

baseline
--------
Aligns flex items based on the baseline of their text content,
so text inside different-sized items sits on the same line.



===================================================
CROSS AXIS ALIGNMENT — align-items
===================================================

Purpose:
--------
Aligns items along the CROSS AXIS

Syntax:
-------
align-items: stretch | flex-start | center |
             flex-end | baseline;

Notes:
------
stretch → default (fills cross axis)


===================================================
MULTI-LINE CONTROL — flex-wrap
===================================================

Definition:
-----------
Controls whether items stay in one line or wrap to next line when container space is insufficient

Syntax:
-------
flex-wrap: nowrap | wrap | wrap-reverse;

Meaning:
--------
nowrap       → single line (default)
wrap         → moves items to next line
wrap-reverse → wraps in reverse direction


===================================================
ALIGN MULTIPLE ROWS — align-content
===================================================

Purpose:
--------
Aligns ROWS when items wrap into multiple lines

Syntax:
-------
align-content: flex-start | center | flex-end |
               space-between | space-around | stretch;

Important:
----------
Works ONLY if:
- flex-wrap: wrap
- more than one row exists


===================================================
SPACING BETWEEN ITEMS
===================================================

gap:
----
gap: 10px;
row-gap: 10px;
column-gap: 20px;

Note:
-----
Preferred over margins for spacing between items


===================================================
FLEX Sizing
===================================================
sets the initial size of a flex item before space distribution.
-we can explicitly target the sizing of individual items with it.
flex-grow   → how much item grows (default: 0), if 1 , item will take remaining space.if multiple items have flex grow as "1" , then leftover space will be equally distributed among them.if one item has value 1 and other 2, the "2" one will have double space.

flex-shrink → how much item shrinks (default: 1) , used to selectively shrink some items more than other.so if "1" is default value then using "2" will shrink u twice than rest of the items.

flex-basis  → initial size before grow/shrink

Shorthand:
----------
flex: grow shrink basis;

Example:
--------
flex: 1 1 200px;


===================================================
ALIGN SINGLE ITEM — align-self
===================================================

Definition:
-----------
Controls CROSS AXIS alignment of ONE item only.Overrides container’s align-items for that item.

Syntax:
-------
align-self: auto | flex-start | center |
            flex-end | stretch | baseline;


===================================================
MOST COMMON USE CASE — CENTERING
===================================================

.container {
  display: flex;
  justify-content: center; /* main axis */
  align-items: center;     /* cross axis */
}


===================================================
FINAL SUMMARY
===================================================
Flexbox simplifies layout by using a MAIN AXIS and CROSS AXIS to control direction, alignment,
spacing, and responsiveness in a predictable way.

<!-- 
organise this, dont create unnecessary lines and waste space, also utilise horizonatl space of the page as well rather than just going vertically, keep the original data, remov e redundancy and give reponse in notepad format -->


===============================
<!-- FLEXBOX ALL-IN-ONE EXAMPLE -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Flexbox Demo</title>

<style>
/* --------------------------------------------------
   FLEX CONTAINER PROPERTIES
-------------------------------------------------- */

.container {
  display: flex;              /* enables flexbox */

  flex-direction: row;        /* row | row-reverse | column | column-reverse */

  flex-wrap: wrap;            /* nowrap | wrap | wrap-reverse */

  justify-content: space-between;
  /* flex-start | center | flex-end | space-between | space-around | space-evenly */

  align-items: center;
  /* stretch | flex-start | center | flex-end | baseline */

  align-content: space-between;
  /* works only with wrap + multiple rows */

  gap: 10px;                  /* space between items */

  height: 300px;
  border: 2px solid black;
}

/* --------------------------------------------------
   FLEX ITEM PROPERTIES
-------------------------------------------------- */

.item {
  width: 80px;
  height: 80px;
  background: lightblue;
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Individual item controls */

.item1 {
  order: 3;                   /* default = 0 */
}

.item2 {
  order: 1;
}

.item3 {
  order: 2;
}

.item4 {
  flex-grow: 1;               /* takes extra space */
}

.item5 {
  flex-grow: 2;               /* takes more space than item4 */
}

.item6 {
  flex-shrink: 0;             /* prevents shrinking */
}

.item7 {
  flex-basis: 150px;          /* initial size before grow/shrink */
}

.item8 {
  flex: 1;                    /* grow:1 shrink:1 basis:0 */
}

.item9 {
  align-self: flex-end;       /* overrides align-items */
  /* flex-start | center | flex-end | stretch */
}
</style>
</head>

<body>

<div class="container">
  <div class="item item1">1</div>
  <div class="item item2">2</div>
  <div class="item item3">3</div>
  <div class="item item4">4</div>
  <div class="item item5">5</div>
  <div class="item item6">6</div>
  <div class="item item7">7</div>
  <div class="item item8">8</div>
  <div class="item item9">9</div>
</div>

</body>
</html>
--------------------------------------------

FLEX CONTAINER:
display
flex-direction
flex-wrap
justify-content
align-items
align-content
gap

FLEX ITEMS:
order
flex-grow
flex-shrink
flex-basis
flex
align-self
