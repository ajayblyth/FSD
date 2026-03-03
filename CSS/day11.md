====================================================
MASTERING CSS : BOX-SHADOW & BACKGROUND (NOTES)
====================================================


-----------------------------
PART 1 : CSS BOX-SHADOW
-----------------------------

1. What is box-shadow?
---------------------
box-shadow adds shadow around an element box.
Used to create depth (cards, buttons, modals).

NOTE:
- Does NOT affect layout
- Can be outside or inside (inset)


2. Syntax
---------
box-shadow: offset-x offset-y blur spread color;

Minimum:
box-shadow: offset-x offset-y color;

Example:
box-shadow: 10px 15px 20px 5px rgba(0,0,0,0.3);

Meaning:
offset-x → horizontal ( + right | - left )
offset-y → vertical   ( + down  | - up )
blur     → softness of shadow
spread   → size of shadow
color    → shadow color




4. Simple Shadows
-----------------
Light shadow (cards):
box-shadow: 0 2px 8px rgba(0,0,0,0.15);

Deep shadow (popup):
box-shadow: 0 10px 40px rgba(0,0,0,0.3);


5. Negative Values
-----------------
box-shadow: -10px -10px 20px red;

Shadow moves LEFT and UP.


6. Multiple Shadows
------------------
Use comma to stack shadows:

box-shadow:
  0 2px 5px rgba(0,0,0,0.2),
  0 10px 20px rgba(0,0,0,0.15);

Used for realistic depth.


7. Inset Shadow
---------------
Draws shadow INSIDE the element:

box-shadow: inset 0 0 10px rgba(0,0,0,0.5);

Used in:
- Input fields
- Pressed buttons
- Neumorphism UI


8. Box-Shadow vs Border
----------------------

Border:
- Takes space
- Sharp edge

Box-Shadow:
- No layout effect
- Can be soft
- Gives depth illusion


9. Performance Tip
------------------
- Heavy blur causes repaint lag
- Avoid large shadows on animations


--------------------------------
PART 2 : CSS BACKGROUND
--------------------------------

1. Background Properties
-----------------------
background-color
background-image
background-repeat
background-position
background-size
background-attachment
background (shorthand)


2. background-color
-------------------
background-color: lightblue;

Fills entire element behind content.


3. background-image
-------------------
background-image: url("image.jpg");

Gradient example:
background-image: linear-gradient(red, blue);

NOTE:
Gradients are treated as IMAGES.


4. background-repeat
--------------------
repeat
no-repeat
repeat-x
repeat-y

Most used:
background-repeat: no-repeat;


5. background-position
---------------------
center
top right
left bottom
50% 50%

Controls image starting point.


6. background-size (IMPORTANT)
------------------------------
cover
contain

cover:
- Fills container
- Crops image
- Best for hero sections

contain:
- Fits whole image
- No cropping
- Best for logos
-but it repeat image until container is full instead of stretching image to fill background.

Note: if div/container is given smaller dimesnion but image is bigger then full image wont load and some part of image will be missing as image is bigger and container is smaller. 


7. background-attachment
------------------------
scroll   (default)
fixed    (parallax effect)
local

NOTE:
fixed may lag on mobile.


8. background shorthand
----------------------
background:
  url("img.jpg")
  no-repeat
  center / cover
  black;


9. Multiple Backgrounds
----------------------
background:
  url(top.png) no-repeat center,
  linear-gradient(to right, red, blue);

First image is on TOP.


10. Background vs <img>
----------------------

Background:
- Decorative
- No SEO
- Flexible sizing

<img>:
- Content
- SEO friendly
- Fixed aspect

RULE:
Content image → <img>
Decorative image → background


--------------------------------
PART 3 : COMBINED EXAMPLE
--------------------------------

.card {
  background: white;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  border-radius: 10px;
}


--------------------------------
INTERVIEW QUICK POINTS
--------------------------------
- box-shadow does not affect layout
- Multiple shadows allowed
- inset draws inside
- cover is most used background-size
- Gradients are background-images
