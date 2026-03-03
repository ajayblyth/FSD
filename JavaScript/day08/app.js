//q1
function rollDice() {
    let a = Math.ceil(Math.random() * 6);
    console.log(a);
}

rollDice();
// How it Works
// Math.random(): Generates a random decimal between 0 and 1.

// * 6: Scales that number so it ranges between 0 and 6.

// Math.ceil(): Rounds the number up to the nearest whole integer, ensuring the result is a number from 1 to 6.

//q2
function avg(a,b,c){
    let average=(a+b+c)/3;
    
    console.log(average);
}
avg(10,12,30);


//Q3
function multiplactionTable(number){
    for(let i =1; i<=10; i++){
        console.log(i*number);
    }
}
multiplactionTable(4);

//Q- sum from 1-n

function sum(n){
    let total=0

    for(let i=1; i<=n;i++){
        total= total+i;

    }
            return total;

}
let result = sum(5);
console.log(result);


//Q concate array of strings
let str = ["hi", "how", "are", "you"];

function concatStrings(arr) {
    let result = ""; 

    // for (let element of arr) {
    //     result = result + element + " "; 
    // }

    for(let i=0;i<arr.length;i++){
      result=   result+arr[i]+ "";
    }

    return result; 
}

let finalOutput = concatStrings(str);
console.log(finalOutput);