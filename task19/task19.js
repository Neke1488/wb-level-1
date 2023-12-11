// Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много).
// Например, с помощью этой функции API VK. Виджет должен иметь фиксированные размеры и возможность прокрутки. 
// При прокрутке содержимого виджета до конца должны подгружаться новые посты. 
// Необходимо реализовать возможность кэширования уже загруженных данных: 
// если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать все загруженные ранее данные 
// (новые данные должны подгружаться из учетом уже загруженных ранее).

// При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.

//токен, взятый из ВК
const token = 'cc85e45ccc85e45ccc85e45cb0cf9362c9ccc85cc85e45ca9ebc397e690315c3ed6296c';
//пробовал брать паблики по домену, потому что тяжело найти паблик где ещё есть id
//но не работало, поэтому нашёл паблик с айди
const owner_id = '-28313198';
//количество загруженных постов за раз
const count = 8;
//смещение для следующих постов 
let offset = 0;
const urlApi = `https://api.vk.com/method/wall.get?owner_id=${owner_id}&count=${count}&access_token=${token}&v=5.199`;
//посты, которые загружаем
let postPlace = [];
//элементы из html
const widgetItem = document.querySelector('.widget');
const addNews = document.querySelector('.addNews');
const template = document.querySelector('.placeForNews').content;
//localStorage фактический и максимально возможный 
let localStorageData;
let localStorageSizeMax;


function correctLocalStorage(showPost) {
    //узнаём размер localStorage текущий
    localStorageData = JSON.stringify(localStorage).length;
    //место для количества постов
    let postSize = JSON.stringify(showPost).length;
    //с помощью if проверяем, что если размер ныншенго localStorage с новыми постами больше максимального
    if (localStorageData + postSize > localStorageSizeMax) {
        //то удаляем прошлые посты
        let trashData = localStorageData + postSize - localStorageSizeMax;
        //задаем размер постов которые удалили 
        let deletedPost = 0;
        //пока размер постов котоорые удалили меньше
        while (deletedPost < trashData && postPlace.length > 0) {
            //то удаляем первый элемент массива
            let deletedFirstPost = postPlace.shift();
            //обновляем посты
            deletedPost += JSON.stringify(deletedFirstPost).length;
        }
    }
}

//вешаем слушатель на скролл
widgetItem.addEventListener('scroll', function() {
     //видимая область для виджета и прокрутки
     const widgetHeight = widgetItem.clientHeight;
    //определяет высоту виджэета
    const scrollContainer = widgetItem.scrollHeight;
    //насколько виджет прокручен сверху
    const showScrollPosition = widgetItem.scrollTop;
   //если прокрутили до конца до добавляем ещё посты
    if (widgetHeight - showScrollPosition <= widgetHeight + 10) {
        loadPosts();
    }
});

//загрузка постов
function loadPosts() {
    //url для запросов постов
    const newUrlApi = `${urlApi}&offset=${offset}&callback=responseFromVK`;
    //создаем элемент для загрузки данных в виде скрипта
    const load = document.createElement('script');
    load.src = newUrlApi;
    //добавляем элемент для выполнения запроса
    document.head.append(load);
}

//создание поста
function createPost(item) {
    //в шаблон подключаем список и дублируем каждый со свойствами предыдущего
    const post = template.querySelector('.newsList').cloneNode(true);
    //текст для поста
    const postText = post.querySelector('.text');
    postText.textContent = item.text;
    //с помощью attachments можем работать с картинками к постам
    item.attachments.forEach(attachment => {
        if (attachment.type === 'photo') {
            //изображения поста
            const photoAddress = attachment.photo.sizes.find(size => size.type === 'x').url;
            const itemImage = document.createElement('img');
            itemImage.src = photoAddress;
            itemImage.classList.add('img-post');
            post.appendChild(itemImage);
        }
    })
    return post;
}

//функция получения поста
function getPost() {
    //проверяем есть ли что то в localStorage
    const dataPost = localStorage.getItem('postPlace');
    localStorageSizeMax = localStorage.getItem('localStorageMax');
    if(!localStorageSizeMax) {
        //максимальное значение вычисляем из задачи выше
        localStorageSizeMax = checkLocalStorage();
        localStorage.setItem('localStorageMax', localStorageSizeMax);
    }
    if (dataPost) {
    //если в localStorage находятся данные, то загружаем их на страницу 
        postPlace = JSON.parse(dataPost);
        postPlace.forEach(news => {
            //отображаем их
            const elem = createPost(news);
            addNews.append(elem);
        });
        const offsetDown = localStorage.getItem('offset');
        //обновляем значение offset, когда получили последний сдвиг
        if(offsetDown) {
            offset = parseInt(offsetDown, 8);
        }
     } else {
     }
    loadPosts();

}
getPost();


function responseFromVK(data) {
    //создаем массив куда помещаем объекты из сообщества
    const showPost = data.response.items;
//если посты есть, то обновляем сдвиг и добавляем дальше
    if(showPost.length > 0) {
        offset += showPost.length;
        correctLocalStorage(showPost);
        //с помощью spread оператора заполняем остаточными данными массив постов
        postPlace = [...postPlace, ...showPost];
        //отображаем посты 
        showPost.forEach(news => {
            const elem = createPost(news);
            addNews.append(elem);
        });
        //сохраняем данные о постах и сдвиге в localStorage 
        localStorage.setItem('postPlace', JSON.stringify(postPlace));
        localStorage.setItem('offset', offset.toString());
    }
}