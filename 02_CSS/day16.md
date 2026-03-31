========================================================
CSS Z-INDEX (STACKING ORDER) – NOTEPAD
========================================================

Definition
----------
z-index controls the VERTICAL stacking order (front/back)
of overlapping elements on the Z-axis.

Higher value → closer to user (on top)

--------------------------------------------------------
WORKS ONLY WHEN
--------------------------------------------------------
• position ≠ static
  (relative | absolute | fixed | sticky)
• OR element is a flex/grid item

--------------------------------------------------------
SYNTAX
--------------------------------------------------------
z-index: auto;   (default)
z-index: 1;
z-index: 10;
z-index: -1;

--------------------------------------------------------
STACKING RULES
--------------------------------------------------------
• Higher z-index covers lower
• Same z-index → later element in HTML wins
• Parent stacking context limits children

--------------------------------------------------------
STACKING CONTEXT (IMPORTANT)
--------------------------------------------------------
Created when element has:
• position + z-index
• transform, filter, opacity < 1
• flex/grid item with z-index

Child z-index works ONLY inside its context

--------------------------------------------------------
NEGATIVE VALUES
--------------------------------------------------------
z-index: -1;
→ sends element behind siblings
→ still above parent background

--------------------------------------------------------
COMMON ISSUE
--------------------------------------------------------
z-index not working?
→ check:
  ✓ position applied?
  ✓ stacking context conflict?
  ✓ parent z-index lower?

--------------------------------------------------------
EXAMPLE
--------------------------------------------------------
.box1 { position: relative; z-index: 1; }
.box2 { position: relative; z-index: 5; }

→ box2 appears on top

--------------------------------------------------------
KEY TAKEAWAYS
--------------------------------------------------------
• z-index = depth control
• Needs positioning or flex/grid
• Context matters more than value
-by deafualt z index is 0.

==============================================================
