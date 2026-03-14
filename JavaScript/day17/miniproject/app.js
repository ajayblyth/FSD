
let started = false; 
let gameSeq = [];
let userSeq = [];
let level = 0;
let btns = ["yellow", "red", "purple", "green"];
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started === false) {
        started = true;
     levelUp();
    }
})
function levelUp() {

    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
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
allbtns = document.querySelectorAll('.btn-container .btn');
for(btn of allbtns) {
    btn.addEventListener("click", btnPress);

}

function btnPress(){
    userFlash(this);
    userColor = this.getAttribute("id");
    userSeq.push(userColor);
    checAns();

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


