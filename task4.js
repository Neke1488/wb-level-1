function endOfSum(num, text) {
    if (num % 10 === 1 && num % 100 !== 11) {
        return text[0];
    } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
        return text[1];
    } else { 
        return text[2];
    }
};

export {endOfSum};