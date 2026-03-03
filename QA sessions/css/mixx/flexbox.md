------------------------------------------------------------------
RESPONSIVE NAVBAR (DESKTOP → MOBILE)
------------------------------------------------------------------

GOAL
------------------------------------------------------------------

Desktop:

Home   About   Services                     Login


Mobile:

Home
About
Services
Login

------------------------------------------------------------------
STEP 1 — HTML STRUCTURE
------------------------------------------------------------------

<nav class="navbar">
  <div class="left">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Services</a>
  </div>

  <div class="right">
    <a href="#">Login</a>
  </div>
</nav>

Explanation:

.navbar  → Main container
.left    → Group of 3 links
.right   → Single Login link

Navbar has 2 direct children:
1) .left
2) .right

------------------------------------------------------------------
STEP 2 — DESKTOP LAYOUT (FLEX)
------------------------------------------------------------------

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}

.left {
  display: flex;
  gap: 20px;
}

Why This Works:

display: flex
→ Makes children horizontal

justify-content: space-between
→ .left goes extreme left
→ .right goes extreme right

gap: 20px
→ Space between Home, About, Services

align-items: center
→ Vertical alignment in navbar

Default direction:
flex-direction: row

------------------------------------------------------------------
STEP 3 — RESPONSIVE (MOBILE)
------------------------------------------------------------------

@media (max-width: 768px) {

  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .left {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }
}

------------------------------------------------------------------
WHAT HAPPENS ON MOBILE?
------------------------------------------------------------------

flex-direction: column
→ Items stack vertically

align-items: flex-start
→ Align everything to left side

Result:

Home
About
Services
Login

------------------------------------------------------------------
CORE RESPONSIVE RULE
------------------------------------------------------------------

Desktop  → flex-direction: row  (default)
Mobile   → flex-direction: column

Change direction → layout changes

------------------------------------------------------------------
===============================================================

------------------------------------------------------------------
FLEXBOX — 4 ITEMS (3 SAME SIZE, 1 DIFFERENT)
------------------------------------------------------------------

SITUATION
------------------------------------------------------------------

[ Item1 ][ Item2 ][ Item3 ][ Item4 ]

Goal:
• First 3 → same size
• 4th → different size

------------------------------------------------------------------
METHOD 1 — Using flex (Recommended)
------------------------------------------------------------------

HTML

<div class="container">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box special">4</div>
</div>

CSS

.container {
  display: flex;
}

.box {
  flex: 1;
}

.special {
  flex: 2;
}

Explanation:

.box → flex: 1
→ First 3 share equal space

.special → flex: 2
→ Takes double space

Width ratio:

1 : 1 : 1 : 2

------------------------------------------------------------------
METHOD 2 — Fixed Width for 4th Item
------------------------------------------------------------------

.container {
  display: flex;
}

.box {
  flex: 1;
}

.special {
  flex: 200px;
}

Explanation:

• Item4 → fixed at 200px
• First 3 → share remaining space equally

------------------------------------------------------------------
METHOD 3 — Using nth-child (No Extra Class)
------------------------------------------------------------------

.container {
  display: flex;
}

.container div {
  flex: 1;
}

.container div:nth-child(4) {
  flex: 2;
}

Explanation:

• All divs → flex: 1
• 4th div → flex: 2

------------------------------------------------------------------
IMPORTANT CONCEPT
------------------------------------------------------------------

flex: 1 means:

flex-grow: 1
flex-shrink: 1
flex-basis: 0

Meaning:

• grow equally
• shrink if needed
• start from 0 base size

------------------------------------------------------------------
CORE IDEA
------------------------------------------------------------------

To make one item different:
→ Change its flex value

Higher flex number = more space

------------------------------------------------------------------