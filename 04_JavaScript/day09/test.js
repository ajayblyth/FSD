const calculator = {
     add:function(a,b){
         return a+b; 
        },  // normal syntax
    sub(a,b){ 
        return a-b; 
    },            // shorthand syntax
    mul: function(a,b){ 
        return a*b; 
    }   // normal syntax
};

let sum =calculator.add(5,4);
console.log(sum);

let sub =calculator.sub(5,4);
console.log(sub);

// let sum =calculator.add(5,4);
// console.log(sum);


let person = {
    name: "Ajay",
    greet: function(){
        console.log(`Hello ${person.name}`);
    }
};

person.greet();



let obj = { a:1, b:2 };

for(let key in obj){
    console.log(key, obj[key]);
}
