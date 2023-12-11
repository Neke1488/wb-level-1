// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

//выбираем из html элемент, где будет выводится размер
let spanCheck = document.getElementById('size');
//с помощью innerHTML будем добавлять нашему элементу значение объема
spanCheck.innerHTML = localStorage.getItem('size');

//перед работой очистим localStorage
localStorage.clear();


function checkLocalStorage() {
//проверяем, поддерживается ли localStorage и отсутствует ли в нем элемент size
    if (localStorage && !localStorage.getItem('size')) {
    let i = 0;
    try {
    //устанавливаеем элемент 'elem' в localStorage и увеличиваем размеры с нуля на 250 до 10000 к примеру
        for (i = 0; i <= 10000; i += 250) {
            localStorage.setItem('elem', new Array((i * 1024) + 1).join('a'));
        }
    //если успешно то размер увеличивается
    //если появляется ошибка то удаляет elem и устанавилвает size с последним успешным значением размера
    } catch (e) {
        localStorage.removeItem('elem');
        localStorage.setItem('size', i - 250);            
    }
}
}
checkLocalStorage()

