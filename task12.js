// Задача на работу с объектами: создайте объект, представляющий собой книгу. 
// Объект должен иметь свойства, такие как: название книги, автор и год издания. 
// Напишите методы для получения и изменения значений свойств книги.

const book = {
    name: "Вий",
    author: "Гоголь",
    dateOfPublic: 1833,
    getProperty(property) {
        return this[property];
    },
    setProperty(property, value) {
        this[property] = value;
    }
};

console.log(book.getProperty('author'));
book.setProperty('dateOfPublic', 1547);
console.log(book.dateOfPublic);

