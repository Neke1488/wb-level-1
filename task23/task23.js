// Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля.
// Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах. 
// Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.

//с помощью querySelector получим элементы нашего html документа по классу 
const password = document.querySelector('.password');
const text = document.querySelector('.text');
const btn = document.querySelector('.btn');

function analizator(password) {
    //применим регулярные выражения для проверки введенных значений 
    let checkNumbers = /\d/.test(password);
    let checkUpperCase = /[A-Z]/.test(password);
    let checkLowerCase = /[a-z]/.test(password); 
    let otherSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // первое условие это неполный пароль
    if (password.length < 6) {
        return "Пароль слишком короткий";
    }
    //второе условие, если в пароли присутсвтуют все введенные символы, которые мы указали, то пароль надежный
    if (checkNumbers && checkUpperCase && checkLowerCase && otherSymbols) {
        return "Пароль достаточно надежный";
    }
    return "Слабый пароль."

}

//вешаем слушатель на нажатие мышью на кнопку
btn.addEventListener('click', (e) => {
//используем preventDefault для отмены дествия браузера по умолчанию, если это не сделаеть, то наше действие сразу завершится
e.preventDefault();
let result = analizator(password.value);
text.textContent = result;
})