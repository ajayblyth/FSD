1. What is box-shadow?
---------------------
box-shadow adds shadow around an element box.
Used to create depth (cards, buttons, modals).

2. Syntax
---------
box-shadow: offset-x offset-y blur spread color;


Example:
box-shadow: 10px 15px 20px 5px rgba(0,0,0,0.3);

Meaning:
offset-x → horizontal ( + right | - left )
offset-y → vertical   ( + down  | - up )
blur     → softness of shadow
spread   → size of shadow
color    → shadow color

------------------------------

2. background-image
-------------------
background-image: url("./image.jpg");

note"./" is used for same directory.


3. background-size (IMPORTANT)
------------------------------
contain
cover

contain:
- Fits whole image but it repeat image until container is full instead of stretching image to fill background.
- No cropping
- Best for logos
-

cover:
- Fills container
- Crops image
- Best for hero sections

