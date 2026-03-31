---------------------------------------------------
CSS POSITION PROPERTY - SHORT NOTES + SYNTAX
---------------------------------------------------
Definition:
-----------
The CSS position property defines HOW an element is positioned
in the document and HOW top, right, bottom, left are applied.


1. static (default)
------------------
Definition:
-----------
static is the default position value.
Element is placed according to the normal document flow.

Syntax:
-------
position: static;

Notes:
------
- Normal flow
- top / right / bottom / left NOT applied

Example:
--------
div {
  position: static;
}


---------------------------------------------------
2. relative
-----------
Definition:
-----------
relative positions the element relative to its own original
position in the normal document flow.


Syntax:
-------
position: relative;
top: 10px;
left: 20px;

Notes:
------
- Moves from its OWN original position
- Space remains occupied
- Used as parent/reference for absolute elements

Example:
--------
.box {
  position: relative;
  top: 10px;
  left: 20px;
}

---------------------------------------------------

3. absolute
-----------
Definition:
-----------
absolute removes the element from the normal document flow and
positions it relative to the nearest positioned parent
(any parent with position other than static).
If no such parent exists, it is positioned relative to the viewport.

Note:
-----
Nearest positioned parent means the closest ancestor whose
position is NOT static (i.e., relative, absolute, fixed, or sticky).


Syntax:
-------
position: absolute;
top: 0;
right: 0;

Notes:
------
- Removed from normal flow
- Positioned relative to nearest positioned parent
- If no parent → positioned relative to viewport

Example:
--------
.child {
  position: absolute;
  top: 0;
  right: 0;
}

---------------------------------------------------

4. fixed
--------
Definition:
-----------
fixed removes the element from the normal document flow, and no
space is created for it. It is positioned relative to the viewport
and stays fixed even when the page is scrolled.


Syntax:
-------
position: fixed;
bottom: 10px;
right: 10px;

Notes:
------
- Relative to viewport
- Does NOT move on scroll

Example:
--------
.chat {
  position: fixed;
  bottom: 10px;
  right: 10px;
}


Summary:
Today I learned about the CSS position property, which controls how elements are placed in a webpage and how the top, right, bottom, and left properties work. I understood the difference between static (default normal flow), relative (moves relative to its original position while keeping space), absolute (removed from normal flow and positioned relative to the nearest non-static parent or the viewport), and fixed (positioned relative to the viewport and remains fixed during scrolling). I also learned that offset properties work only with positioned elements and that relative is commonly used as a reference for absolute elements.
---------------------------------------------------

POSITION: STICKY

position: sticky is a mix of relative + fixed behavior.

• Acts like position: relative initially
• Becomes position: fixed when a scroll threshold is reached
• Sticks inside its parent container

REQUIRED FOR STICKY TO WORK

• Must define at least one offset: top, bottom, left, or right
• Parent must NOT have overflow: hidden/auto/scroll (usually)
Syntax:
-------
position: sticky;
top: 0;

Notes:
------
- Acts like relative at first
- Becomes fixed after scrolling
- Requires top or bottom

Example:
--------
.header {
  position: sticky;
  top: 0;
}

---------------------------------------------------


6. One Combined Example:
-----------------------

.parent {
  position: relative;
  height: 200px;
}

.absolute-box {
  position: absolute;
  top: 10px;
  right: 10px;
}

.fixed-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.sticky-nav {
  position: sticky;
  top: 0;
}

---------------------------------------------------

7. z-index (important)
---------------------
Syntax:
z-index: 10;

- Works only on positioned elements
- Higher value appears on top

---------------------------------------------------
