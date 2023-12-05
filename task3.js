function MathX() {
    function countFibbonaci(n) {
        if (n <= 1) {
            return n;
        }
        return countFibbonaci(n - 1) + countFibbonaci(n - 2);
    }

    function allFibbonaciItems(n) {
        const placeForNumbers = [];
        for(let i = 0; i <= n; i++) {
            placeForNumbers.push(countFibbonaci(i));
        }
        return placeForNumbers;
    }

    function countNum(n) {
        if (n <= 1) {
            return false;
        }
        for(let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
            return true;
        }
    }

    function simpleNums(n) {
        const nums = [];
        for(let i = 2; i <= n; i++) {
            if(countNum(i)) {
                nums.push(i);
            }
        }
        return nums;
    }

    return {
        countFibbonaci,
        allFibbonaciItems,
        countNum,
        simpleNums
    };
}

console.log(MathX.countFibbonaci(6)); // 8
console.log(MathX.allFibbonaciItems(6)); // [0, 1, 1, 2, 3, 5, 8]
console.log(MathX.countNum(7)); // true
console.log(MathX.simpleNums(10)); // [2, 3, 5, 7]

