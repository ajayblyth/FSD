let started = false;
let gameSeq = [];
let userSeq = [];
level = 0;
let btns = ["yellow", "red", "purple", "green"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(event) {
    if(started === false) {
        console.log("Game started");
        started = true;
        levelUp();
    }
})

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 300);
}
function levelUp() {
    userSeq = [];
    console.log("Level up");
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    console.log(randColor);
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 300);
}
function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0; 
}
function checAns() {
    let idx = userSeq.length - 1;
    if(userSeq[idx] === gameSeq[idx]) {
        console.log("Success");
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else{
        h2.innerText = `Game over! score ${level} Press any other key to start.`
        resetGame();
    }
}
function btnPress(){
    userFlash(this);
    userColor = this.getAttribute("id");
    userSeq.push(userColor);

    checAns();

}
allbtns = document.querySelectorAll('.btn-container .btn');

for(btn of allbtns) {
    btn.addEventListener("click", btnPress);
}