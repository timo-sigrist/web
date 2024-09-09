function factorial(n) {
    if (n < 0) {
        throw new Error('Fakultät ist für negative Zahlen nicht definiert.');
      }
    
      if (n === 0n || n === 1n) {
        return BigInt(1);  // Fakultät von 0 und 1 ist 1
      }

      if (n === 0 || n === 1) {
        return 1;  // Fakultät von 0 und 1 ist 1
      }
    

      let result = BigInt(1);

      if (typeof n === 'number') {
        n = BigInt(n);
      }
    
      if (n === 0n || n === 1n) {
        return BigInt(1);  // Fakultät von 0 und 1 ist 1
      }
    
      for (let i = BigInt(2); i <= n; i++) {
        result *= i;
      }
    
      if (result <= Number.MAX_SAFE_INTEGER) {
        // Convert to regular number if within safe number range
        return Number(result);
      } else {
        return result;
      }
}

console.log(factorial(50n))

module.exports = { factorial }