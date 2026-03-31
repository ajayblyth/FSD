TAGS, ELEMENTS & ATTRIBUTES
------------------------------------------------------------
12. What is the difference between an HTML tag and an HTML element?
13. What are attributes in HTML and why are they used?
14. What is the difference between global and specific attributes?
15. What is the difference between id and class?
16. Can two elements have the same id? Why?
17. Can one element have multiple classes? Why is this useful?
18. What happens if we use the same id multiple times?
19. Why are attributes written inside the opening tag?
20. Are attributes case-sensitive? Why?
21. What is the purpose of data-* attributes?
22. What happens if an attribute value is missing or incorrect?


BLOCK vs INLINE ELEMENTS
------------------------------------------------------------
23. What is the difference between block-level and inline elements?
24. How does block-level elements affect document flow?
25. How does inline elements behave with width and height?
26. Give examples of common block-level elements.
27. Give examples of common inline elements.
28. Can we put a block-level element inside an inline element? Why?
29. Can we put an inline element inside a block-level element?
30. Why does <span> not start on a new line but <div> does?
31. What happens if we change display: inline/block using CSS?
32. What is display: inline-block and why is it used?
33. How do block and inline elements affect margin and padding?


SEMANTIC HTML
------------------------------------------------------------
34. What is semantic HTML?
35. Why should we use semantic tags instead of only <div>?
36. How does semantic HTML help accessibility?
37. How does semantic HTML help SEO?
38. What is the difference between <div> and <section>?
39. What is the difference between <section> and <article>?
40. When should we use <header> and <footer>?
41. Can a page have multiple <header> or <footer> tags?
42. What is the purpose of <article>?
43. What is the purpose of <aside>?
44. When should <nav> be used?
45. What problems occur when semantic tags are not used?


LINKS, IMAGES & MEDIA
------------------------------------------------------------
46. What is the difference between absolute and relative URLs?
47. What happens if a relative path is wrong?
48. Why is the alt attribute important in <img>?
49. What happens if an image path is broken?
50. What is the difference between src and href?
51. Why do we use <br> and <hr>?
52. What is the difference between <strong> and <b>?
53. What is the difference between <em> and <i>?
54. How does target="_blank" work?
55. Why should we be careful using target="_blank"?
56. What is the role of title attribute in links and images?
57. What happens if media files are very large?


FORMS & INPUTS (HIGHLY ASKED)
------------------------------------------------------------
58. What is the purpose of an HTML form?
59. What is the role of action and method attributes?
60. Why do input elements need the name attribute?
61. What happens if name attribute is missing?
62. What is the difference between placeholder and value?
63. Why do radio buttons use the same name?
64. Why do checkboxes usually have different names?
65. What is the role of <label> in forms?
66. How does label improve accessibility?
67. What is the difference between GET and POST?
68. Where does form data go after submission?
69. What happens if required attribute is used?
70. What is the purpose of type="submit" vs button?


LISTS & TABLES
------------------------------------------------------------
71. What is the difference between ordered and unordered lists?
72. When should we use lists instead of paragraphs?
73. What is the purpose of <li>?
74. What happens if <li> is used outside <ul>/<ol>?
75. When should we use tables?
76. Why should tables not be used for layout?
77. What is the role of <thead>, <tbody>, and <tfoot>?
78. Why is table structure important for screen readers?
79. What is the purpose of <th>?


HTML + CSS RELATIONSHIP
------------------------------------------------------------
80. What is the role of HTML vs CSS?
81. Why should HTML not be used for styling?
82. What happens if CSS is removed from a page?
83. How does CSS select HTML elements?
84. What happens when multiple CSS rules apply to one element?
85. How does HTML structure affect CSS styling?
86. Why does poor HTML structure break layouts?


COMMON CONFUSIONS / EDGE CASES
------------------------------------------------------------
87. Why does HTML ignore extra spaces and new lines?
88. Why does text appear on the same line even if written on a new line?
89. What happens if we forget to close a tag?
90. Why do some tags not need closing tags?
91. Is HTML case-sensitive? Why?
92. Why is proper nesting important?
93. What happens if elements are improperly nested?
94. Why does browser auto-correct HTML mistakes?


FINAL CONCEPTUAL / BROWSER LEVEL
------------------------------------------------------------
95. How does the browser read an HTML file?
96. What is parsing and rendering?
97. What is DOM and how is it created?
98. How does HTML become a visual web page?
99. How does HTML connect with CSS and JavaScript internally?
100. Why is clean HTML important for long-term projects?

==========================================================================
12) Difference between an HTML tag and an HTML element
------------------------------------------------------
- HTML Tag: The actual code used to mark up content.  
  Example: <p> or </p>
- HTML Element: The complete structure, including the opening tag, content, and closing tag.  
  Example: <p>Hello World</p> → the element consists of <p>, the text "Hello World", and </p>
- Concept: Tag is just a marker; element is the full structure that browsers render.

13) Attributes in HTML and why they are used
--------------------------------------------
- Definition: Extra information added to an HTML tag to control behavior or provide details.  
- Syntax: <tag attribute="value">  
- Purpose: To modify how the element behaves or appears.  
  Example: <a href="https://example.com">Link</a> → href is an attribute that defines the URL.
- Explanation: Attributes let you customize elements without extra code.

14) Difference between global and specific attributes
------------------------------------------------------
- Global attributes: Can be applied to **any HTML element**.  
  Examples: id, class, style, title, data-*  
  <p class="text">Hello</p> → class is global
- Specific attributes: Only work with certain elements.  
  Example: src for <img>, href for <a>  
  <img src="image.jpg" alt="desc"> → src is specific to <img>
- Concept: Global → universal, Specific → element-specific functionality.

15) Difference between id and class
------------------------------------
- id:
  • Unique identifier for a single element.
  • Syntax: <div id="header"></div>  
  • Used in CSS: #header { color: red; }
- class:
  • Can be shared by multiple elements.
  • Syntax: <div class="menu"></div>
  • Used in CSS: .menu { font-size: 16px; }
- Concept: id = unique reference, class = reusable style.

16) Can two elements have the same id? Why?
--------------------------------------------
- No, two elements **should not** have the same id.  
- Reason: id must be **unique** in the DOM to allow correct selection via CSS or JS.  
- If duplicate ids exist, JS/CSS may target the first one only, causing unexpected behavior.

17) Can one element have multiple classes? Why is this useful?
--------------------------------------------------------------
- Yes, multiple classes can be added, separated by spaces.  
  Example: <div class="card shadow p-3"></div>
- Why useful: Allows combining multiple reusable styles or utilities without writing new CSS.  
  Concept: Modular styling → mix and match predefined classes for faster design.

18) What happens if we use the same id multiple times?
-------------------------------------------------------
- Browser still renders the page, but CSS & JS targeting may **fail or behave unexpectedly**.  
- JS methods like getElementById() will only return **the first element** with that id.  
- Best practice: Always use unique ids.

19) Why are attributes written inside the opening tag?
------------------------------------------------------
- Attributes modify the element **at the time of creation**.  
- Placing them inside the opening tag tells the browser how to **render or behave** immediately.  
- Example: <img src="img.jpg" alt="description"> → browser knows the image source and alt text when parsing the tag.

20) Are attributes case-sensitive? Why?
----------------------------------------
- HTML attributes are **not case-sensitive**.  
  Example: <a HREF="link.html"> → same as <a href="link.html">
- Reason: HTML is designed to be **lenient and easy to use**.  
- Note: XHTML and XML are case-sensitive, so be careful in strict environments.

21) Purpose of data-* attributes
--------------------------------
- Custom attributes to store extra information not defined by HTML.  
- Syntax: <div data-user-id="123"></div>
- Access in JS: element.dataset.userId → "123"  
- Use: Storing private info, configuration, or extra metadata without affecting standard attributes.

22) What happens if an attribute value is missing or incorrect?
---------------------------------------------------------------
- If missing: Browser may **use default behavior** or ignore it.  
  Example: <input type="text" placeholder> → placeholder ignored because value missing
- If incorrect: Browser may **ignore the attribute** or behave unexpectedly.  
  Example: <img src="wrong.jpg"> → broken image displayed  
- Concept: Always provide correct attribute names and valid values to ensure predictable behavior.

23) Difference between block-level and inline elements
------------------------------------------------------
- Block-level elements:
  • Occupy full width available by default.
  • Always start on a **new line**.
  • Can contain both block and inline elements.
  • Example: <div>, <p>, <h1>, <section>, <article>

- Inline elements:
  • Occupy only as much width as their content.
  • Do **not start on a new line**.
  • Can contain only other inline elements or text.
  • Example: <span>, <a>, <strong>, <em>, <img>

24) How block-level elements affect document flow
-------------------------------------------------
- Each block-level element creates a **new line** in the document flow.
- Stacks **vertically** one after another.
- Other elements below it are pushed down.
- Example:
  <div>First</div>
  <div>Second</div>
  → "Second" appears below "First".

25) How inline elements behave with width and height
----------------------------------------------------
- Width and height **cannot be directly applied** (ignored) for pure inline elements.
- Their size is determined by content.
- Example:
  <span style="width:100px; height:50px;">Text</span>
  → Width/height ignored, text wraps normally.

26) Examples of common block-level elements
------------------------------------------
<div>, <p>, <h1>, <h2>, <ul>, <ol>, <li>, <section>, <article>, <header>, <footer>, <table>, <form>

27) Examples of common inline elements
--------------------------------------
<span>, <a>, <strong>, <em>, <b>, <i>, <img>, <abbr>, <cite>, <code>

28) Can we put a block-level element inside an inline element? Why?
------------------------------------------------------------------
- No, it's **invalid HTML**.
- Reason: Inline elements are meant for **text-level content**, cannot contain block-level elements.
- Example (invalid):
  <span><div>Block inside inline</div></span> → may break layout in browsers.

29) Can we put an inline element inside a block-level element?
-------------------------------------------------------------
- Yes, **allowed** and very common.
- Block-level elements can contain **text, inline elements, or other block elements**.
- Example:
  <div>This is a <span>highlighted</span> word.</div> → valid

30) Why does <span> not start on a new line but <div> does?
------------------------------------------------------------
- <div> → block-level → occupies full width → starts on a **new line**.
- <span> → inline → occupies only content width → stays **inline with text**.

31) What happens if we change display: inline/block using CSS?
--------------------------------------------------------------
- CSS can override default behavior:
  • display: block → makes element behave like block (new line, full width)
  • display: inline → makes element behave like inline (no new line)
- Example:
  <span style="display:block;">Block span</span> → span behaves like div
  <div style="display:inline;">Inline div</div> → div behaves like span

32) What is display: inline-block and why is it used?
-----------------------------------------------------
- Combines **inline and block behavior**:
  • Stays inline with other elements (doesn’t start a new line)
  • Can apply **width, height, margin, padding** like a block
- Example:
  <span style="display:inline-block; width:100px; height:50px;">Box</span>
- Use: Useful for horizontal layouts where inline elements need box properties.

33) How do block and inline elements affect margin and padding?
----------------------------------------------------------------
- Block elements:
  • All margin and padding (top, bottom, left, right) are applied as expected.
- Inline elements:
  • Horizontal (left/right) padding and margin applied.
  • Vertical (top/bottom) padding and margin **may not affect layout**.
  • Example:
    <span style="margin-top:20px;">Text</span> → vertical margin often ignored