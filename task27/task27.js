// Задача: Добавить анимацию для элемента: Напишите функцию, которая добавляет
// анимацию для элемента на веб-странице, например, плавное изменение его положения или размера.


function addAnimation() {
//создаем элемент включающий в себя div из нашего html документа
    const element = document.querySelector('.myDiv');
    let position = 0; //устанавилваем положение элемента
    let anim = setInterval(frame, 10);// с помощью метода setInterval задаем период с которым будет перемещаться наш элемент
    function frame() {
        //если элемент находится в положении 750px мы очищаем период перемещения объекта
        if (position == 780) {
            clearInterval(anim);
        //иначе добавляем элементу положение в виде стилей
        } else {
            position++;
            element.style.top = position + "px";
            element.style.left = position + "px";
        }
    }
}