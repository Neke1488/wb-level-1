// Задача на работу с объектами: создайте объект, представляющий собой книгу. 
// Объект должен иметь свойства, такие как: название книги, автор и год издания. 
// Напишите методы для получения и изменения значений свойств книги.

const book = {
    name: "Вий",
    author: "Гоголь",
    dateOfPublic: 1833,
    //метод getProperty для получения какого-либо свойства из объекта
    getProperty(property) {
        return this[property];
    },
    //метод setProperty для добавления какого-либо свойства из объекта
    setProperty(property, value) {
        this[property] = value;
    }
};

console.log(book.getProperty('name'));
book.setProperty('dateOfPublic', 1547);
console.log(book.dateOfPublic);

