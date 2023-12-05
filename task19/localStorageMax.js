localStorage.removeItem('test');

function checkLocalStorage() {
if (localStorage && !localStorage.getItem('size')) {
    let i = 0;
    try {
        for (i = 0; i <= 10000; i += 250) {
            localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
        }
    } catch (e) {
        localStorage.removeItem('test');
        localStorage.setItem('size', i - 250);            
    }
}
}
