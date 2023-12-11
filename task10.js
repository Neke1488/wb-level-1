// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

//объявляем строку вида JSON
const jsonString = '{"name":"Nik","age":30,"gender":"Male"}'
function jsonToString(jsonString) {
    //проверям значения на число, булево и null
    if(typeof jsonString === null || typeof jsonString === 'boolean' || typeof jsonString === 'number'){
        //то преобразуем с помощью String в строку
        return String(jsonString)
    }
    
    //проверяем на то, является ли значение функцией или undefined или символом
    if (typeof jsonString === 'function' || typeof jsonString === 'symbol' || typeof jsonString === undefined)
    {
        return "ошибка";
    }
    //проверяем на строковое значение 
    if (typeof jsonString === 'string') {
    //так как json формат должен содержать в себе строковые значения в двойных кавычках
    //и не иметь пробелов то добавляем их и убираем пробелы
        return `"${jsonString.trim()}"`;
    }
    //проверка на объект
    if(typeof jsonString === 'object') {
    //если объект то ключ-значение помещаем в массив
        const arrayObj = [];
    //с помощью for in находим ключи с их значениями в массиве
    //так как в JSON все ключи должны быть в двойных кавычках то оборачиваем их в них
    //чтобы подхватить значения вызовем нашу функцию внутри него, если объекты обладают глубокой вложенностью
        for (let key in value) {
            arrayObj.push(`"${key}":${jsonToString(value[key])}`)
        }
        return `{${arrayObj.join(',')}}`;
    }
    //проверка на массив 
    if (Array.isArray(jsonString)) {
    //по аналогии из прошлой задачи
        return `[${jsonString.map(item => jsonToString(item)).join(',')}]`;
    }
}
console.log(jsonToString(jsonString));