// Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию, 
// которая вызывает каждую функцию в этом массиве и возвращает массив результатов, 
// полученных после вызова каждой функции.


const arrayFunctions = [
function func1() {
    console.log(1)
},
function func2() {
    console.log(2)

},
function func3() {
    console.log(3)

}
];

//объявляем фунекцию, которая возвразает другую функцию
function closeFunc(arrayFunctions) {
    return function newCloseFunc() {
    // в теле этой функции объявляем пустой массив 
        let result = [];
        //перебираем массив функций
        for(let i = 0; i < arrayFunctions.length; i++) {
        // записываем результаты в массив с конца 
            result.push(arrayFunctions[i]());
        }
    };
};


//создаем экземпляр функции с замыканием
const res = closeFunc(arrayFunctions);
console.log(res());