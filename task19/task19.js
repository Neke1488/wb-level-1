// Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много).
// Например, с помощью этой функции API VK. Виджет должен иметь фиксированные размеры и возможность прокрутки. 
// При прокрутке содержимого виджета до конца должны подгружаться новые посты. 
// Необходимо реализовать возможность кэширования уже загруженных данных: 
// если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать все загруженные ранее данные 
// (новые данные должны подгружаться из учетом уже загруженных ранее).

// При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.


const token = 'cc85e45ccc85e45ccc85e45cb0cf9362c9ccc85cc85e45ca9ebc397e690315c3ed6296c';
const owner_id = '-1';
const domain = 'hypebeastruss';
const count = 8;
const offset = 0;
const urlApi = `https://api.vk.com/method/wall.get?owner_id=${owner_id}&domain=${domain}&count=${count}&access_token=${token}&v=5.199`;
const postPlace = [];
const widgetItem = document.querySelector('.widget');
const addNews = document.querySelector('.addNews');
const template = document.querySelector('.placeForNews');
let localStorageData;
let localStorageSizeMax;

function correctLocalStorage(showPost) {
    localStorageData = JSON.stringify(localStorage).length;
    let postSize = JSON.stringify(showPost).length;
    if (localStorageData + postSize > localStorageSizeMax) {
        let trashData = localStorageData + postSize - localStorageSizeMax;
        let deletedPost = 0;
        while (deletedPost < trashData && postPlace.length > 0){
            let deletedFirstPost = postPlace.shift();
            deletedPost += JSON.stringify(deletedFirstPost).length;
        }
    }
}

widgetItem.addEventListener('scroll', function() {
    const scrollContainer = widgetItem.scrollHeight;
    const showScrollPosition = widgetItem.scrollTop;
    const widgetHeight = widgetItem.clientHeight;
    if (widgetHeight - showScrollPosition <= widgetHeight + 10) {
        loadPosts();
    }
});


function loadPosts() {
    const newUrlApi = `${urlApi}&offset=${offset}&callback=responseFromVK`;
    const load = document.querySelector('script');
    load.src = newUrlApi;
    document.body.appendChild(load);
}

function createPost(item){
    const post = template.querySelector('.newsList').cloneNode(true);
    const postText = post.querySelector('.text');

    postText.textContent = item.text;
    item.attachments.forEach(attachment => {
        if (attachment.type === 'photo') {
            const photoAddress = attachment.photo.size.find(size => size.type === 'x').url;
            const itemImage = document.createElement('img');
            itemImage.src = photoAddress;
            itemImage.classList.add('img-post');
            post.appendChild(itemImage);
        }
    })
    return post;
}


function getPost() {
    const dataPost = localStorage.getItem('postPlace');
    localStorageSizeMax = localStorage.getItem('localStorageMax');
    if(!localStorageSizeMax) {
        // localStorageSizeMax = checkLocalStorage();
        localStorage.setItem('localStorageMax', localStorageSizeMax);
    }
    if (dataPost) {
        postPlace = JSON.parse(dataPost);
        postPlace.forEach(news => {
            const elem = createPost(news);
            addNews.append(elem);
        });
        const offsetDown = localStorage.getItem('offset');
        if(offsetDown) {
            offset = parseInt(offsetDown, 8);
        }
    } else {
        loadPosts();
    }
}
getPost();


function responseFromVK(data) {
    const showPost = data.response.element;
    if(showPost.length > 0) {
        offset += showPost.length;
        correctLocalStorage(showPost);
        postPlace = [...postPlace, ...showPost];
        showPost.forEach(news => {
            const elem = createElement(news);
            addNews.append(elem);
        });
        localStorage.setItem('postPlace', JSON.stringify(postPlace));
        localStorage.setItem('offset', offset.toString());
    }
}