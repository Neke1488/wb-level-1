// Задача: Рекурсивный обход дерева DOM:: Напишите функцию, которая рекурсивно обходит дерево DOM, 
// начиная с указанного элемента, и выполняет определенное действие 
// с каждым узлом (например, выводить информацию о теге в консоль).

//создаем функцию куда передаем узел и действие 
function nodeWay(node, action) {
//c помощью свойства nodeType мы узнаем тип DOM-узла в цифровом значении
//а с помощью Node.ELEMENT_NODE проверяем есть ли значение такого узла в спецификации
//и если есть то вешаем на него какое то действие
    if (node.nodeType === Node.ELEMENT_NODE) {
      action(node);
    }
//далее если элемент является дочерним от какого-то
    if (node.childNodes) {
      //то с помощью цикла for перебираем наследуемые элементы
      for (let i = 0; i < node.childNodes.length; i++) {
      //вызываем внутри цикла нашу функцию куда передаем номер наследуемого элемента и какое-то действие 
      nodeWay(node.childNodes[i], action);
      }
    }
  }
  
//создадим функцию куда передадим узел
  function logElement(node) {
    //выведем в консоль каждый элемент узла 
    console.log('Элемент:', node.nodeName);
  }
  
  //создадим какую то переменную, где получим тело документа
  const element = document.querySelector('body');
//поулчаем все элементы принадлежащии body
  nodeWay(element, logElement);