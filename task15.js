// Задача на асинхронность: напишите асинхронную функцию, 
// которая использует ключевое слово await для ожидания выполнения других асинхронных операций, 
// и возвращает результат выполнения


//с помощью ключевого слова async создадим асинхронную функцию, которая всегда возвращает промис и передадим туда какой-нибудь url
async function fetchData(url) {
    try {
    //с помощью ключевого слова await заставим интерпретатор JavaScript ждать до тех пор, пока промис справа от await не выполнится
      const response = await fetch(url);
      //представим что мы получаем по запросу какие-то данные с помощью fetch() и так как мы не передаем в него второй аргумент, то он отрабатывает как get-запрос
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка:', error);
      throw error;
    }
  }

  fetchData('https://api.example.com/data')
    .then(data => {
      console.log('Данные:', data);
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });