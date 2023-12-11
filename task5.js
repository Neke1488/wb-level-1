// Разработайте функцию преобразования JSON в связный список. На входе функция должна получать JSON, 
// содержащий список объектов, на выходе объект, представляющий из себя односвязный список.

const makeParse = `[
    {
        "name": "Nik",
        "age": 22
    },
    {
        "name": "Vlad",
        "age": 34
    }
]`;

//Создаем функцию, которая будет принимать JSON в виде строки
//и возвращать объект как односвязный список
function linkedListWithJson(makeParse) {
    // Парсим данные с помощью JSON.parse()
    let data = JSON.parse(makeParse);
//Создаем первый узел с помощью data из JSON
    let head = { data: data[0] };
    let present = head;
//Затем функция проходится по остальным элементам 
//из нашего JSON и создает новые узлы, устанавливая их следующим
//узлом в предыдущий узел
    for(const item of data.slice(1)) {
        const newNode = { data: item };
        present.next = newNode;
        present = newNode;
    }
    return head;
}

const links = linkedListWithJson(makeParse)

console.log(links);
