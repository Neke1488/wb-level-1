// Задача: Создать и добавить стиль для элемента: 
// Напишите функцию, которая создает новый элемент, добавляет его в DOM и устанавливает для него стиль с помощью CSS.

//создаем функцию, которая принимает в себя, тег элемента, содержимое объекта и объект стили
function createAndAddElement(tag, content, style) {
    //создаем элемент при помощи createElement
    const element = document.createElement(tag);
    //добавляем ему содержимое
    element.textContent = content;
    //через цикл проходимся по ключам объекта стилей и добавляем их ему
    for (const key in style) {
      element.style[key] = style[key];
    }
    //добавляем созданный элемент в тело документа
    document.body.appendChild(element);
  }
  
  const element = createAndAddElement('button', 'Элемент', {
    'background-color': 'violet',
    'color': 'black',
    'padding': '20px',
    'margin': '10px'
  });