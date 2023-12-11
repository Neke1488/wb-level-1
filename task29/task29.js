// Задача: Взаимодействие с формами: Напишите функцию, которая получает данные из формы на веб-странице 
// и выполняет определенные действия с этими данными, например, 
// отправляет их на сервер или отображает всплывающее окно с результатами.


//создаем переменные формы и модального окна и их "внутренностей"
const form = document.querySelector('.myForm');
const modal = document.querySelector('.modal');
const myName = form.querySelector('.name');
const data = modal.querySelector('.data');
const email = form.querySelector('.mail');
const password = form.querySelector('.password');
const closeModal = document.querySelector('.close');

//обращаемся к нашей форме для заполнения
form.addEventListener('submit', (e) => {
    //отменяем действие браузера по умолчнию, чтобы страница не обновлялась после отправки формы
    e.preventDefault();
//добавляем модальному окну класс open, чтобы оно открывалось после отправки данных
    modal.classList.add('open');
    //проверяем введенные значения на пустоту
    if (myName.value !== '' && email.value !== '' && password !== '') {
        //если все верно, то подключаем класс success куда передаем текст 
        modal.querySelector('.success').textContent = "Вы успешно вошли";
        //обращаемся к полю куда выведем отправленные данные внутри формы
        data.textContent = myName.value + " " + email.value + " " + password.value;
    } else {
        //иначе выдаем текстовое сообщение о том что данные не заполнены
        data.textContent = "Заполните данные";
    }
});

//вешаем слушатель на кнопку закрытия для модального окна
closeModal.addEventListener('click', function () {
//очищаем заполненные поля в форме
    form.reset();
//убираем класс open, чтобы окно закрылось
    modal.classList.remove('open');
    //очищаем текстовое поле об успехе
    modal.querySelector('.success').textContent = "";
//очищаем текстовое поле о данных
    data.textContent = "";
});
