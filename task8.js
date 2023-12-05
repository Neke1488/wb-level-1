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

function closeFunc(arrayFunctions) {
    return function newCloseFunc() {
        let result = [];
        for(let i = 0; i < arrayFunctions.length; i++) {
            result.push(arrayFunctions[i]());
        }
    };
};

const res = closeFunc(arrayFunctions);
console.log(res());