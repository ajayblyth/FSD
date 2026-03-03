PRACTICE QUESTIONS – CSS OPACITY, TRANSITION & TRANSFORM
🔹 Set 1: Opacity vs Alpha (Concept + Scenario)

Q1.
You apply opacity: 0.5 on a .card div containing text and a button.

What exactly becomes transparent?

Why is this usually a bad choice for UI cards?

Q2.
Rewrite the following code so that only the background is transparent, not the text:

.card {
  opacity: 0.6;
}


Q3. (Tricky)
If a parent element has opacity: 0.5, can a child element be made fully opaque using opacity: 1?
👉 Explain why / why not.

🔹 Set 2: CSS Transitions (Understanding + Application)

Q4.
What are the four parts of the transition shorthand property?
Write the full shorthand for:

property: transform

duration: 0.3s

timing-function: ease-in-out

delay: 0.1s

Q5.
Explain the difference between:

linear
ease-in
ease-out
steps(6, end)


Which one produces a stair-step effect and why?

Q6. (Output-based)
What will happen visually when a user hovers over this button?

button {
  background-color: blue;
  transition: background-color 0.5s linear;
}
button:hover {
  background-color: red;
}

🔹 Set 3: CSS Transform (Practical + Reasoning)

Q7.
What is the difference between:

width: 120%;


and

transform: scale(1.2);


in terms of layout impact?

Q8.
Given this code:

.box:hover {
  transform: scale(1.2) rotate(10deg);
}


Answer:

Will surrounding elements move?

Why does the order of scale() and rotate() matter?

Q9. (Real-world)
Which transform function would you use for:

Image zoom on hover

Button press animation

Tilting a card slightly on hover

Explain why.

🔹 Bonus Interview Rapid-Fire (1-liners)

Q10.

Why is transform preferred over changing top/left for animations?

Why are transitions often paired with transforms?