let nums = [1, -9, 3, 7, 5];

let result = nums.forEach((num, i)=>{
   // nums[i] = num * 2;
   console.log(num)
});


result = nums.map((num)=>{
    num = num+1;
    num = num /2;
    return num;
});

console.log(result);


result = nums.filter((num)=>{
    num = num+1;

    return num %2 === 0;
})

console.log(result);


let output = nums.some((num)=>{
    return num%2===0;
})


console.log(output);

output = nums.every((num)=>{
    return num>=0;
})

console.log(output);
console.log(nums);
output = nums.reduce((acc, num)=>{
    return acc*num;
}, 0);

console.log(output);


output = nums.reduce((acc, num)=>{

    let val;
    if(acc > num)
        return acc;
    else
        return num;
}, nums[0]);

console.log(output);

nums.every((num)=>{
    return num%10 === 0;
})

function myfunc(a, b=7){
    return a+b;
}

console.log(myfunc(1));