// Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис, который разрешается с данными об изображении, когда оно загружено. 
// Когда говорится "промис разрешается с данными об изображении", 
// это означает, что промис должен быть успешно выполнен (resolved) с данными об изображении после того, как изображение будет загружено.

function promisePictureGet(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
        resolve(image);
    };
  });
}

promisePictureGet('imageUrl')
    .then((image) => {
        console.log('промис разрешается с данными об изображении', image);
    });