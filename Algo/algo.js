const { fizzBuzzFunction } = require("./utils/fizzbuzz.js");

// generate an array with 10 items of random numbers from 1 to 50
// change length if need more
const randomNumbers = Array.from({ length: 10 }, () =>
  Math.round(Math.random() * 50)
);

console.log("Array of numbers:", randomNumbers);

// call the function from utils
fizzBuzzFunction(randomNumbers);
