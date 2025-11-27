const MathUtils = {
    // Basic arithmetic operations
    add: (a, b) => {
        validateNumbers(a, b);
        return a + b;
    },
    
    subtract: (a, b) => {
        validateNumbers(a, b);
        return a - b;
    },
    
    multiply: (a, b) => {
        validateNumbers(a, b);
        return a * b;
    },
    
    divide: (a, b) => {
        validateNumbers(a, b);
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        return a / b;
    },
    
    // Advanced mathematical operations
    power: (base, exponent) => {
        validateNumbers(base, exponent);
        return Math.pow(base, exponent);
    },
    
    squareRoot: (number) => {
        validateNumber(number);
        if (number < 0) {
            throw new Error('Square root of negative numbers is not supported');
        }
        return Math.sqrt(number);
    },
    
    factorial: (number) => {
        validateInteger(number);
        if (number < 0) {
            throw new Error('Factorial of negative numbers is not defined');
        }
        if (number === 0 || number === 1) return 1;
        
        let result = 1;
        for (let i = 2; i <= number; i++) {
            result *= i;
        }
        return result;
    },
    
    // Utility functions
    isPrime: (number) => {
        validateInteger(number);
        if (number < 2) return false;
        if (number === 2) return true;
        if (number % 2 === 0) return false;
        
        for (let i = 3; i <= Math.sqrt(number); i += 2) {
            if (number % i === 0) return false;
        }
        return true;
    },
    
    fibonacci: (n) => {
        validateInteger(n);
        if (n < 0) throw new Error('Fibonacci sequence index cannot be negative');
        if (n === 0) return 0;
        if (n === 1) return 1;
        
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            const temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    },
    
    // Statistical functions
    average: (numbers) => {
        if (!Array.isArray(numbers) || numbers.length === 0) {
            throw new Error('Input must be a non-empty array');
        }
        numbers.forEach(validateNumber);
        
        const sum = numbers.reduce((acc, curr) => acc + curr, 0);
        return sum / numbers.length;
    },
    
    median: (numbers) => {
        if (!Array.isArray(numbers) || numbers.length === 0) {
            throw new Error('Input must be a non-empty array');
        }
        numbers.forEach(validateNumber);
        
        const sorted = [...numbers].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        
        if (sorted.length % 2 === 0) {
            return (sorted[mid - 1] + sorted[mid]) / 2;
        } else {
            return sorted[mid];
        }
    }
};

// Validation functions
function validateNumber(value) {
    if (typeof value !== 'number' || isNaN(value)) {
        throw new Error(`Invalid number: ${value}`);
    }
}

function validateNumbers(...values) {
    values.forEach(validateNumber);
}

function validateInteger(value) {
    validateNumber(value);
    if (!Number.isInteger(value)) {
        throw new Error(`Expected integer, got: ${value}`);
    }
}

// Built-in test suite
function runTests() {
    const assert = require('assert');
    console.log('🧪 Running built-in tests...');
    
    let testsPassed = 0;
    let totalTests = 0;
    
    function runTest(name, testFn) {
        totalTests++;
        try {
            testFn();
            console.log(`  ✅ ${name}`);
            testsPassed++;
        } catch (error) {
            console.log(`  ❌ ${name}: ${error.message}`);
        }
    }
    
    // Test basic operations
    runTest('Addition', () => {
        assert.strictEqual(MathUtils.add(2, 3), 5);
        assert.strictEqual(MathUtils.add(-1, 1), 0);
    });
    
    runTest('Subtraction', () => {
        assert.strictEqual(MathUtils.subtract(5, 3), 2);
        assert.strictEqual(MathUtils.subtract(10, 10), 0);
    });
    
    runTest('Multiplication', () => {
        assert.strictEqual(MathUtils.multiply(2, 3), 6);
        assert.strictEqual(MathUtils.multiply(-2, 3), -6);
    });
    
    runTest('Division', () => {
        assert.strictEqual(MathUtils.divide(6, 3), 2);
        assert.strictEqual(MathUtils.divide(10, 2), 5);
    });
    
    runTest('Division by zero', () => {
        assert.throws(() => MathUtils.divide(5, 0), Error);
    });
    
    runTest('Factorial', () => {
        assert.strictEqual(MathUtils.factorial(5), 120);
        assert.strictEqual(MathUtils.factorial(0), 1);
    });
    
    runTest('Power', () => {
        assert.strictEqual(MathUtils.power(2, 3), 8);
        assert.strictEqual(MathUtils.power(5, 2), 25);
    });
    
    runTest('Prime numbers', () => {
        assert.strictEqual(MathUtils.isPrime(7), true);
        assert.strictEqual(MathUtils.isPrime(4), false);
        assert.strictEqual(MathUtils.isPrime(2), true);
    });
    
    runTest('Fibonacci', () => {
        assert.strictEqual(MathUtils.fibonacci(6), 8);
        assert.strictEqual(MathUtils.fibonacci(0), 0);
        assert.strictEqual(MathUtils.fibonacci(1), 1);
    });
    
    runTest('Statistical functions', () => {
        assert.strictEqual(MathUtils.average([1, 2, 3, 4, 5]), 3);
        assert.strictEqual(MathUtils.median([1, 3, 2]), 2);
        assert.strictEqual(MathUtils.median([1, 2, 3, 4]), 2.5);
    });
    
    console.log(`\n📊 Test Results: ${testsPassed}/${totalTests} tests passed`);
    
    if (testsPassed === totalTests) {
        console.log('🎉 All tests passed!');
        return true;
    } else {
        console.log('❌ Some tests failed');
        return false;
    }
}

// Demo function
function demonstrate() {
    console.log('🎯 MathUtils Demo');
    console.log('2 + 3 =', MathUtils.add(2, 3));
    console.log('5 * 4 =', MathUtils.multiply(5, 4));
    console.log('Factorial of 5 =', MathUtils.factorial(5));
    console.log('Is 17 prime?', MathUtils.isPrime(17));
    console.log('Fibonacci(7) =', MathUtils.fibonacci(7));
    console.log('Average of [1,2,3,4,5] =', MathUtils.average([1, 2, 3, 4, 5]));
}

// Export for Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathUtils;
    
    // Run tests if file is executed directly with "test" argument
    if (require.main === module) {
        const args = process.argv.slice(2);
        if (args.includes('test')) {
            const success = runTests();
            process.exit(success ? 0 : 1);
        } else if (args.includes('demo')) {
            demonstrate();
        } else {
            console.log('📚 MathUtils Library');
            console.log('Available commands:');
            console.log('  node mathUtils.js test  - Run tests');
            console.log('  node mathUtils.js demo  - Run demo');
            console.log('  const math = require("./mathUtils.js") - Use in code');
        }
    }
}