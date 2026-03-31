
let started = false; 
// The keypress event listener starts the game only once at the beginning.
// When the first key is pressed, started becomes true, so further keypresses do not restart the game again and again.

let gameSeq = [];

let userSeq = [];

level = 0;

let btns = ["yellow", "red", "purple", "green"];

// Selecting the <h2> element where level / game messages will be displayed, keeping it global
let h2 = document.querySelector("h2");

// start game: Listen for any keypress on the document
document.addEventListener("keypress", function() {

    // Game should start only if it has not started already
    if(started === false) {

        // Change flag so game doesn't restart again with another keypress
        started = true;
        levelUp();
    }
})


function levelUp() {

    // Reset user sequence for the new level
    userSeq = [];
    // Increase level
    level++;
    // Show updated level in UI
    h2.innerText = `Level ${level}`;

    // Generate random index between 0–3
    let randIdx = Math.floor(Math.random() * 4);
//     Math.random() generates a random decimal number between 0 and 1.
// Multiplying by 4 changes the range to 0 – 3.999, since we have 4 buttons.
// Math.floor() removes the decimal part and rounds down to an integer.
// So the final result is a random index: 0, 1, 2, or 3.

    // Get color from btns array using random index
    let randColor = btns[randIdx];

  
    // Select the button element of that color
    let randBtn = document.querySelector(`.${randColor}`); //randcolor = red/ green/yellow/purple

    // Add that color to game sequence
    gameSeq.push(randColor);

    // Flash the randomly selected button
    btnFlash(randBtn);
//      randBtn becomes something like:
// <div class="btn red" id="red">0</div>
// Meaning:
// randColor → "red" (string)
// randBtn → actual DOM element
}

function btnFlash(btn) {

    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 500);
}


function userFlash(btn) {

  btn.classList.add("userflash");

  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 300);
}

// Select all buttons inside .btn-container
allbtns = document.querySelectorAll('.btn-container .btn');

// Loop through each button,querySelectorAll() returns all 4 buttons as a NodeList.
// allbtns = document.querySelectorAll('.btn-container .btn');
// But JavaScript cannot attach one event listener to multiple elements at once, so we must attach it to each button individually.
// That is why we loop.
for(btn of allbtns) {
    // Add click event listener
    btn.addEventListener("click", btnPress);
//     Inside btnPress(), this automatically refers to that clicked button element.
// Example:
// User clicks red button
// this → <div class="btn red" id="red"></div>
}

function btnPress(){

    userFlash(this);
// When an event listener is attached to an element, JavaScript automatically
// sets "this" inside the handler to the element that triggered the event.
    // Get color of clicked button from its id
    userColor = this.getAttribute("id");

    // Add clicked color to user sequence
    userSeq.push(userColor);

    checAns();

}


function checAns() {

    // Get index of last element user clicked
    let idx = userSeq.length - 1;

    // Check if user's last click matches game sequence
    if(userSeq[idx] === gameSeq[idx]) {

        // Correct click
        console.log("Success");
//         Step 1 → check color correctness like  we did above
// Step 2 → check if sequence is complete like we did below
// Step 3 → go to next level

        // If user finished full sequence correctly
        if(userSeq.length === gameSeq.length) {

            // Move to next level after 1 second
            setTimeout(levelUp, 1000);
        }
    }

    // If user clicked wrong button
    else{

        // Show game over message
        h2.innerText = `Game over! score ${level} Press any other key to start.`

        // Reset the game
        resetGame();
    }
}

function resetGame() {

    started = false;

    gameSeq = [];

    userSeq = [];

    level = 0; 
}



