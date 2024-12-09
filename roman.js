// function changeToInteger(roman) {
//     let obj = { I: 1, V: 5, X: 10 }; // Roman numeral values
//     let res = 0; // Initialize the result
//     for (let i = 0; i < roman.length; i++) {
//         let currentValue = obj[roman[i]];
//         // If the current value is greater than the previous value, subtract twice the previous value
//         if (i > roman.length-1 && currentValue > obj[roman[i +1]]) {
//             res += currentValue 

//         } else {
//             res -= currentValue; // Otherwise, just add the current value
//         }
//     }
//     return res;
// }

// let a = changeToInteger("XI");
// console.log("aa", a); // Expected output: 6

function longestSubaaray(nums){
    let dp=[]
    for(let i=0;i<nums.length;i++){
        let temp=0
        for (let j=0;j<i;j++){
            if(nums[j]<nums[i]){
                temp=Math.max(temp,dp[j])
            }
        }
        dp[i]=temp+1
    }
    res=0
    for(let i=0;i<nums.length;i++){
        res=Math.max(res,dp[i])
    }
    return res
}

let s= longestSubaaray([1,6,3,7,8,9])
console.log("ssss",s)