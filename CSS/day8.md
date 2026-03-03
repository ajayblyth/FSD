========================================================
CSS CASCADE — COMPACT & ORGANIZED
========================================================

Definition:
"Cascade" means how CSS decides which
style rule should apply when multiple
rules target the same element.

CSS = Cascading Style Sheets
Because styles "cascade" from multiple
sources and levels.


--------------------------------------------------------
CASE 1: SAME SELECTOR
--------------------------------------------------------
Rule:
• LAST written rule wins (source order)

Example:
p { color: blue; }
p { color: green; }   → green ✅


--------------------------------------------------------
CASE 2: DIFFERENT SELECTORS (Specificity)
--------------------------------------------------------
Rule:
• Higher specificity wins

Priority (High → Low):
Inline style
#id
.class
element

Example:
p { color: blue; }
.text { color: green; }
#title { color: red; }

<p id="title" class="text"> → red ✅


--------------------------------------------------------
CASE 3: SAME SPECIFICITY
--------------------------------------------------------
Rule:
• LAST rule wins

Examples:
.box { color: red; }
.box { color: black; } → black ✅

External vs Internal:
• CSS loaded later wins


--------------------------------------------------------
CASE 4: DIFFERENT SOURCES
--------------------------------------------------------
Priority Order:
Browser default
External CSS
Internal CSS
Inline CSS

Inline always wins (unless !important)


--------------------------------------------------------
CASE 5: !important
--------------------------------------------------------
Rule:
• Overrides everything
• Except another !important with higher specificity

Example:
p { color: blue !important; }
#title { color: red; } → blue ✅


--------------------------------------------------------
FINAL CASCADE FORMULA (INTERVIEW)
--------------------------------------------------------
!important → Source Priority → Specificity → Source Order


--------------------------------------------------------
ONE-LINE SUMMARY
--------------------------------------------------------
Same selector → last wins
Different selector → specificity wins
Different source → higher priority wins
!important → wins all


========================================================
CSS INHERITANCE — CLEAN NOTES
========================================================

Definition:
-----------
• Some CSS properties pass from parent → child automatically

How it works:
-------------
• If child has NO value, it may inherit from parent
• Not all properties are inheritable


Inherited Properties (Common):
------------------------------
color, font-family, font-size, font-style, font-weight
line-height, text-align, visibility, cursor


NOT Inherited Properties:
-------------------------
margin, padding, border, width, height
background, display, position


Example:
---------
body {
  color: blue;
  font-family: Arial;
}
p { }  → inherits color & font-family


Control Keywords:
-----------------
inherit → force parent value
initial → browser default
unset   → inherit (if possible) else initial
revert  → browser/user stylesheet value


Inheritance vs Cascade:
-----------------------
Inheritance → parent → child
Cascade     → which rule wins


Important Notes:
----------------
• Inline styles override inherited values
• Specific selectors override inheritance
• Inheritance flows DOWN the DOM only


========================================================
END OF NOTES
========================================================
