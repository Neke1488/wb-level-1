// Задача о замыканиях и области видимости: напишите функцию, которая возвращает другую функцию. 
// Внутренняя функция должна иметь доступ к переменной, определенной во внешней функции, даже после того, как внешняя функция завершила свое выполнение


function closeAndVisible() {
    let result = 'im func';
    function other() {
        console.log(result);
    }
    return other();
}

const check = closeAndVisible();
console.log(check);