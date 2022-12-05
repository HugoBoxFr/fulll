// function that takes an array of numbers in parameter
// for each number log, the corresponding string if condition is true
// else log the number
exports.fizzBuzzFunction = (arrayOfNumbers) => {
  for (const number of arrayOfNumbers) {
    if (number % 3 === 0 && number % 5 === 0) console.log("FizzBuzz");
    else if (number % 3 === 0) console.log("Fizz");
    else if (number % 5 === 0) console.log("Buzz");
    else console.log(number);
  }
};
