// function that takes a maxValue in parameter
// for each number log from 1 to maxValue, display the corresponding string if condition is true
// else log the number
exports.fizzBuzzFunction = (range) => {
  for (let i = 1; i <= range; i++) {
    if (i % 3 === 0 && i % 5 === 0) console.log("FizzBuzz");
    else if (i % 3 === 0) console.log("Fizz");
    else if (i % 5 === 0) console.log("Buzz");
    else console.log(i);
  }
};
