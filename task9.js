// Реализовать функцию конвертации JSON в строку


//создадим какой-нибудь объект формата JSON
const jsonValue = [{
    nameStudent: "Никита",
    university: "NPI",
    group: 23
},
{
  nameStudent: "Лариса",
  university: "ЮФУ",
  group: 32
},
{
  nameStudent: "Вова",
  university: "МГУ",
  group: 12
},];

function jsonStringify(jsonValue) {
  //первая проверка будет заключаться в том, объект ли перед нами или нет
  //проверяем при помощи строго равенства и получаем значение либо true либо false
  if(typeof jsonValue === 'object') {
  //важно помнить, что при работе с объектами JSON.stringify для всех строк использует двойные кавычки
  //и имена свойств также заключены в них
  //создаем переменную, где используем Object.keys для того, чтобы вернуть массив имен свойств объекта
    const keysFor = Object.keys(jsonValue);
    //далее перебираем этот массив с помощью map куда передаем как функцию отображение наших элементов с условием выше
    //с помощью join объединяем все элементы в массиве запятой
    const varOf = keysFor.map(key => `"${key}":${jsonStringify(jsonValue[key])}`).join(',');
    return `{${varOf}}`
  }

//проверка на строку
  if(typeof jsonValue === 'string') {
//возвращаем значения в двойных кавычках
    return `"${jsonValue}"`;
  }
//проверка на null, булевы и числовые типы
  if(typeof jsonValue === null || typeof jsonValue === 'boolean' || typeof jsonValue === 'number' ) {
//просто переводим эти элементы в строку
    return String(jsonValue);
  }
//проверка на массив
//используем метод Array.isArray для определение массива
  if(Array.isArray(jsonValue)){
//с помощью map перебираем массив применяя функцию и объединяем элементы запятой
    const array = jsonValue.map(item => jsonStringify(item)).join(',');
    return `[${array}]`;
  } 

}

console.log(jsonStringify(jsonValue))