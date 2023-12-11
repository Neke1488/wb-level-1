// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, 
// используя замыкания:
// вычисление N-го числа в ряду Фибоначчи 
// вычисление всех чисел в ряду Фибоначчи до числа N
//                   3.   вычисление N-го просто числа
// вычисление всех простых чисел до числа N
// 	Будет плюсом, если задумаетесь и об оптимизации.


function MathX() {
//     Числа Фибоначчи — элементы числовой последовательности
// в которой первые два числа равны 0 и 1, а каждое последующее число равно сумме двух предыдущих чисел
//поэтому объявим функцию, куда передадим какое-то n
    function countFibbonaci(n) {
        //если элемент меньше 1 или равен 1, то возвращаем переданное значение
        if (n <= 1) {
            return n;
        }
        //передаем в функцию n и по опредению фиббоначи реализуем формулу из функций
        return countFibbonaci(n - 1) + countFibbonaci(n - 2);
    }


    function allFibbonaciItems(n) {
        //создадим пустой массив, куда будем сохранять числа
        const placeForNumbers = [];
        //с помощью цикла for делаем проверку на значения чисел до n и далее с помощью push добавляем элементы в массив с конца
        for(let i = 0; i <= n; i++) {
            placeForNumbers.push(countFibbonaci(i));
        }
        return placeForNumbers;
    }


    function countNum(n) {
    // с помощью if проверяем переданное число и если оно меньше либо равно 1 то возвращаем булево значение false
        if (n <= 1) {
            return false;
        }
        // далее, начиная с числа 2 по определению чисел Фиббоначи с помощью цикла for пробегаемся 
        //по числам и и проверяем имеет ли число ровно 2 различных натуральных делителя
        for(let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
            return true;
        }
    }

    function simpleNums(n) {
        //создаем массив, где будут хранится числа
        const nums = [];
         //используя проверку выше заполняем массив простыми числами до переданного числа
        for(let i = 2; i <= n; i++) {
            if(countNum(i)) {
                nums.push(i);
            }
        }
        return nums;
    }
//далее возвращаем все функции внутри функции MathX
    return {
        countFibbonaci,
        allFibbonaciItems,
        countNum,
        simpleNums
    };
}
//создаем экземпляр функции MathX для обращения к функциям внутри неё
const mathX = new MathX();

console.log(mathX.countFibbonaci(6)); 
console.log(mathX.allFibbonaciItems(6)); 
console.log(mathX.countNum(9)); 
console.log(mathX.simpleNums(10)); 

