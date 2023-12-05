const arrayObj = [{
    name: "Саша",
    age: 13
},
{
    name: "Паша",
    age: 21
},
{
    name: "Вова",
    age: 23
}];

arrayObj.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name));

console.log(arrayObj);