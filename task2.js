
//создаем функцию, в которую передаем число
function strangeNumber(num) {
//далее создаем переменную, в которую будем записывать результат цикла для проверки на странное число
    let numberSum = 0;
//далее создаем цикл, который проходит по всем числам и суммирует их, если они делитили 
    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            numberSum += i;
        }
    }
    //Затем сравниваем полученную сумму с исходным числом и возвращаем true, если они равны, и false в противном случае
    return (num === numberSum);
}

console.log(strangeNumber(6));
