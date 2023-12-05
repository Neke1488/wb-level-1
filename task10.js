const jsonString = '{"name":"Nik","age":30,"gender":"Male"}'
function jsonToString(jsonString) {
    try {
        const jsonObject = JSON.parse(jsonString);
        return jsonObject;
    } catch (error) {
        console.error("ошибка");
        return null;
    }
}

const jsonObject = jsonToString(jsonString);

console.log(jsonObject);

