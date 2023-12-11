// Задача: Создать и добавить элемент с использованием шаблонов: 
// Напишите функцию, которая создает новый элемент с использованием шаблонов 
// (например, с помощью тега <template>) и добавляет его в DOM.

//создаем фунекцию куда передадим тег элемента, что будет находится и стиль
function createElementTemplate(tag, content, style) {
//создадим элемент template, который является шаблоном HTML
    const template = document.createElement('template');
//с помощью innerHTML для добавления элемента на страницу динамические с указанием тега и контента внутри
    template.innerHTML = `<${tag}>${content}</${tag}>`;
//С помощью importNode создаем новый узел на основе существующего это контент внутри template, значение по умолчанию false меняем на true
    const same = document.importNode(template.content, true);
//создаем элемент
    const element = same.firstElementChild;
//c помощью цикла for находим значения ключей в стилях и устанавливаем значения элементу
    for (const key in style) {
        element.style[key] = style[key];
    }
//добавляем элемент
    document.body.appendChild(element);
}

createElementTemplate('div', 'Новый элемент', {
    'background-color': 'violet',
    'color': 'black',
    'padding': '20px',
    'margin': '10px'
});