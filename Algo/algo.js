const { fizzBuzzFunction } = require("./utils/fizzbuzz.js");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// prompt user for a number
rl.question("Choose a max number for you FizzBuzz test :", function (maxValue) {
  if (parseInt(maxValue)) {
    fizzBuzzFunction(maxValue);
  } else {
    console.log("The expected value is an integer");
  }
  rl.close();
});
