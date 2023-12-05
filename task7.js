
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

//Даллее создаем функцию, в которую передаем нашу переменную
function callFunctions(functionArrays) {
//Далее используем промисы для того, чтобы функции вызывались в порядке очереди по мере завершения предыдущих
    let queue = Promise.resolve();
    functionArrays.forEach(item => {queue = queue.then(item);});

};

console.log(callFunctions(functionArrays));

//ещё один вариант реализации через цикл for
function callFunctions(functionArrays) {
let result = [];
for (let i = 0; i < functionArrays.length; i++) {
        result.push(functionArrays[i]())
};
    
    return result;
}