function fizzbuzz(n) {
    let result = '';
  
    if (n % 3 === 0 && n % 5 === 0) {
      result = 'FizzBuzz';
    } else if (n % 3 === 0) {
      result = 'Fizz';
    } else if (n % 5 === 0) {
      result = 'Buzz';
    }
  
    console.log(result);
    return result;
  }  

fizzbuzz(50); // Call the function with input 15
