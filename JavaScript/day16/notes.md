
================================================================================
EVENT BUBBLING – COMPACT NOTE (HORIZONTAL LAYOUT)
================================================================================

DEFINITION
--------------------------------------------------------------------------------
Event Bubbling = Event starts at target element → then travels upward 
through its ancestors → until it reaches document.

(Default behavior for most DOM events)


HOW IT FLOWS
--------------------------------------------------------------------------------
Stage 1: Event Fires      → User clicks target element
Stage 2: Bubbles Up       → Parent → Grandparent → Body
Stage 3: Document Reached → Event reaches document root


FLOW STRUCTURE (Example DOM Tree)
--------------------------------------------------------------------------------
document
   ↑
body
   ↑
div
   ↑
button  ← (User Clicks Here)

Execution Order:
button → div → body → document


CODE EXAMPLE
--------------------------------------------------------------------------------
let div = document.querySelector("div");
let btn = document.querySelector("button");

div.addEventListener("click", function() {
    console.log("Div clicked");
});

btn.addEventListener("click", function() {
    console.log("Button clicked");
});

If button is clicked:
Output:
Button clicked
Div clicked


WHY BUBBLING IS USEFUL
--------------------------------------------------------------------------------
✔ Enables Event Delegation
✔ Fewer event listeners needed
✔ Better performance
✔ Cleaner logic


STOPPING BUBBLING
--------------------------------------------------------------------------------
Use: event.stopPropagation();

btn.addEventListener("click", function(e) {
    e.stopPropagation();
    console.log("Button only");
});

Now event will NOT move to parent elements.


CORE IDEA
--------------------------------------------------------------------------------
Target Element
        ↓
Parent
        ↓
Ancestor
        ↓
document

Note: bubble doesnt reaches the body element, because it doesnt have callback function.

================================================================================
================================================================================
EVENT DELEGATION – NOTES
================================================================================

DEFINITION
--------------------------------------------------------------------------------
Event Delegation is a technique where we attach 
a single event listener to a parent element 
to handle events for its child elements.

It works because of Event Bubbling.


WHY USE EVENT DELEGATION?
--------------------------------------------------------------------------------
✔ Fewer event listeners
✔ Better performance
✔ Cleaner code
✔ Works for dynamically added elements


NORMAL APPROACH (Without Delegation)
--------------------------------------------------------------------------------
let buttons = document.querySelectorAll("button");

buttons.forEach(function(btn) {
    btn.addEventListener("click", function() {
        console.log("Button clicked");
    });
});

Problem:
❌ Adds listener to every button
❌ New buttons won't have listener


================================================================================
EVENT DELEGATION APPROACH
================================================================================

let parent = document.querySelector("#container");

parent.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON") {
        console.log("Button clicked");
    }
});

✔ Only ONE listener on parent
✔ Uses e.target to detect clicked child


HOW IT WORKS
--------------------------------------------------------------------------------
1) User clicks child element (button)
2) Event fires on button
3) Event bubbles up to parent
4) Parent listener handles it
5) e.target identifies actual clicked element


IMPORTANT PROPERTY
--------------------------------------------------------------------------------
e.target         → actual clicked element
e.currentTarget  → element with listener attached


WHEN TO USE
--------------------------------------------------------------------------------
✔ List of items (UL > LI)
✔ Table rows
✔ Multiple buttons
✔ Dynamic content added later


CORE IDEA
--------------------------------------------------------------------------------
Child event
      ↓ (bubbles)
Parent listener handles it
      ↓
Use e.target to detect child

================================================================================

Note: screenshots of code has been taken , note it and put in notes.