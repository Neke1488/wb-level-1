// Разработайте страницу, отображающую таблицу с данными. 
// Данные необходимо подгружать из этого источника.

// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице)

//Обращемся к документу с помощью слушателя, чтобы выполнить требование
//о загрузке данных при загрузке страницы с помощью DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    //объявляем переменные, с которыми предстоит работать
    //через queryselector вытаскиваем таблицу с классом table
    const table = document.querySelector('.table');
    //массив, в котором будут храниться данные, полученные с сервера
    let dataFetch = [];
    //далее добавим переменные для работы с пагинацией
    const itemsOnPage = 50;
    let currentPage = 1;
    const sortedValues = [false,false,false,false,false,false];

    //так как требуется, чтобы все данные загружались при загрузке страницы
    //будем создавать элементы динамически
    function makeHeaders() {
        //создаём поля для загловков
        const header = ["fname","lname","tel","address","city","state","zip"];
        //для того, чтобы ячейки могли вставать в новую строку добавим элемент tr
        const headerStroke = document.createElement('tr');
        //с помощью forEach проходимся по массиву, созданному выше и заполняем его
        header.forEach(text => {
            //создаем заголовок таблицы, где будут размещены названия позиций
            const headerTable = document.createElement('th');
            //добавляем значения содержимому
            headerTable.textContent = text;
           //Добавляем ячейку в созданную строку
            headerStroke.appendChild(headerTable);
        });
        //добавляем заголовок в таблицу
        table.appendChild(headerStroke);
        //для сортировки в порядке убывания и возрастания решил, что подойдет отслеживание элементов по номеру
        //потому что в другом случае непонятно что именно может быть выше или ниже

        const headersSearchForNumbers = document.querySelectorAll('.table tr th');
        //проходимся по массиву с помощью forEach, куда передаем параметры самого объекта и под каким номером он добавляется
    
        headersSearchForNumbers.forEach((elementStroke, numberPlace) => {
        //на каждый заголовок вешаем обработчик событий, чтобы при клики включалась функция сортировки
        elementStroke.addEventListener('click', () => {
        //в зависимости от места расположения заголовка
            switch (numberPlace) {
            case 3: 
            sortValues(checkAddress, numberPlace);//используем функцию сортировки для адреса потому что он находится на 3 позиции
            break;
            case 6:
                sortValues(checkNumberTypes(numberPlace),numberPlace);//сортировка для числовых типов
                break;
                default:
                    //в обычном случае сортируем строковые поля
                    sortValues(forStringField(numberPlace),numberPlace);
            }
        });    
    });
}

//функция отрисовки элементов на странице
function drawVars() {
    //переменная для определения начала показа данных
    const countStart = (currentPage - 1) * itemsOnPage;
    //переменная для определения конца
    const countEnd = countStart + itemsOnPage;
    //данные одной страницы
    const pageData = dataFetch.slice(countStart, countEnd);
    //очищаем таблицу
    table.innerHTML = "";
    //используем функцию создания заголовков
    makeHeaders();
    //с помощью forEach проходимся по массиву и заполняем страницу элементами указывая номер под каким он находится
    pageData.forEach(item => {
        const stroke = table.insertRow();
        const fnamePlace = stroke.insertCell(0);
        const lnamePlace = stroke.insertCell(1);
        const telPlace = stroke.insertCell(2);
        const addressPlace = stroke.insertCell(3);
        const cityPlace = stroke.insertCell(4);
        const statePlace = stroke.insertCell(5);
        const zipPlace = stroke.insertCell(6);
        //добавляем элементы в DOM-дерево
        fnamePlace.textContent = item.fname;
        lnamePlace.textContent = item.lname;
        telPlace.textContent = item.tel;
        addressPlace.textContent = item.address;
        cityPlace.textContent = item.city;
        statePlace.textContent = item.state;
        zipPlace.textContent = item.zip;
    });
};
//функция для сортировки 
function sortValues(checkFunction, numberPlace) {
    //если флаг при нажатии false то он не отсортирован
    if(!sortedValues[numberPlace]) {
    //выполняем сортировку по возрастанию
        dataFetch.sort(checkFunction);
    //иначе разоворачиваем массив 
    } else {
        dataFetch.reverse();
    }
    //меняем состояние флага
    sortedValues[numberPlace] = !sortedValues[numberPlace];
    //остальным флагам ставим значение false
    sortedValues.forEach((item, num) => {
        if(num !== numberPlace) {
            sortedValues[num] = false;
        };
    });
    //обновляем значения
    drawVars();
};
//сортировка для строк
function forStringField(numberPlace) {
    return function sorts(a,b) {
        //передаем в фукцию элементы для сравнения по полю, где возвращаем ключи в виде массива
        //а с помощью numberPlace указываем элемент массива и далее с помощью localeCompare сравниваем строки
        return a[Object.keys(a)[numberPlace]].localeCompare(b[Object.keys(b)[numberPlace]]);
    };
};

//сравнение по адресу 
function checkAddress(a,b) {
//сравниваем значения по целому числу с помощью parseInt
    if(parseInt(a.address) < parseInt(b.address)) {
        return -1;
//если числа равны, то сравниваем по строкам
    } else if (parseInt(a.address) === parseInt(b.address)) {
        //с помощью регулярных выражений убираем числа из элементов а и b
        const firstCheckStrokes = a.address.replace(/\d+/g, '');
        const secondCheckStrokes = b.address.replace(/\d+/g, '');
        return firstCheckStrokes.localeCompare(secondCheckStrokes);
    } else {
        return 1;
    }
};

//сравнение по числу 
function checkNumberTypes(numberPlace) {
    return function sortNums(a, b) {
        return a[Object.keys(a)[numberPlace]] - b[Object.keys(b)[numberPlace]];
    };
};

//пагинация
function pagination() {
    //определяем количество страниц c помощью math.ceil без остатка в большую сторону
    const countPage = Math.ceil(dataFetch.length / itemsOnPage);
    //подхватываем разметку для пагинации из html
    const paginationPlace = document.querySelector(".pagination");
    //с помощью цикла for проходимся по элементам и сравниваем с количеством страниц
    for (let i=1; i <= countPage; i++) {
        //добавляем кнопку
        const btnPagination = document.createElement('button');
        btnPagination.classList.add('pagination_button');
        //кнопке ставим номер страницы
        btnPagination.textContent = i;
        //вешаем класс active на первую кнопку по дефолту
        if(i === 1) {
            btnPagination.classList.add('active');
        }
        //вешаем слушатель событий на клик для других кнопок 
        //чтобы они были подсвечены если нажаты, а на других подсветки не было
        btnPagination.addEventListener('click', () => {
            btnPaginations.forEach((item) => {
                item.classList.remove('active');
            });
            currentPage = i;
            btnPagination.classList.add('active');
            drawVars();
        });
        //добавляем кнопки на страницу
        paginationPlace.appendChild(btnPagination);
    }
    //отображаем пагинацию для всех кнопок на странице
    document.body.appendChild(paginationPlace);
    const btnPaginations = document.querySelectorAll('.pagination_button');
};

//с помощью метода fetch мы можем делать сетевые запросы и получать информацию с сервера
//поэтому передаем в него наш источник 
fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true')
    .then(response => {
        //если ответ не получен, то пробрасываем ошибку
        if(!response.ok) {
            throw new Error('Нет ответа!');
        }
        return response.json();
    })
    //c помощью оператора spread получаем значения rest(data) всех элементов
    //отрисовываем их и включаем пагинацию
    .then(data => {
        dataFetch = [...data];
        drawVars();
        pagination();
    })
    //при ошибки выдаем её
    .catch(error => {
        console.error('Ошибка', error);
    })
});