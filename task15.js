// Задача на асинхронность: напишите асинхронную функцию, 
// которая использует ключевое слово await для ожидания выполнения других асинхронных операций, 
// и возвращает результат выполнения

async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка:', error);
      throw error;
    }
  }

  fetchData('https://api.example.com/data')
    .then(data => {
      console.log('Fetched data:', data);
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });