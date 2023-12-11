
//Создаем переменную в которой хранится массив функций
const functionArrays = [
    function zero() {
        console.log(0)
    },
    function one(){
        console.log(1)
    },
    function two() {
        console.log(2)
    },
    function three() {
        console.log(3)
    }
];
//объявляем функцию, куда передаем массив функций
function callFunctions(functionArrays) {
//результат будем записывать в пустой массив
let result = [];
//с помощью цикла for перебираем массив
for (let i = 0; i < functionArrays.length; i++) {
//заполняем выше объявленный пустой массив результатами с конца
        result.push(functionArrays[i]())
};
//возвращаем заполненный массив  
    return result;
}

console.log(callFunctions(functionArrays));