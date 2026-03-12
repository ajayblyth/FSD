let started= false; //initially false
level=0;
let btns=["yellow", "red", "purple", "green"]


document.addEventListener("keypress", function(event){
if(started === false){
    console.log("game started");
    started = true;
    levelUp();
}})
function levelUp(){
    console.log("level up");
    level++;
    h2.innerText= `Level ${level}`;
    

}
