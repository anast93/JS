'use strict'

// Сразу удяляю рекламу, потому что мешает выполнению других заданий
const adv = document.querySelectorAll('.adv');
adv[0].remove();


const books = document.querySelectorAll(".book");
const parent = document.querySelector(".books");

const bookHead = parent.getElementsByTagName('h2');

// Меняем 1-ю и 2-ю книги местами, затем 3-ю и 4-ую, потом 5-ю и 6-ю
books[1].after(books[0]);
books[4].after(books[3]);
books[5].after(books[2]);

// меняем фон на другую картинку
document.getElementsByTagName('body')[0].style.backgroundImage="url(./image/you-dont-know-js.jpg)";

// Меняем заголовок Книги 3.
books[4].getElementsByTagName('a')[0].textContent = 'Книга 3. this и Прототипы Объектов';

// Получаем эл-ты li для 2-й и 5-й книг
const li2 = books[0].getElementsByTagName('li');
const li5 = books[5].getElementsByTagName('li');

// Ф-я сортирует содержимое эл-в li
function sortForHTML(li) {
    let arr = [];

    for(let i = 2; i < li.length; i++) {
    arr[i] = li[i].textContent;
    }
    arr = arr.sort();
    
    for(let j = 0; j < li.length-2; j++) {
    li[j+2].textContent = arr[j];
    }
}

sortForHTML(li2);
sortForHTML(li5);


// Добавляем главу 8 в 6-ю книгу.
const li6 = books[2].getElementsByTagName('li');
const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
li6[9].insertAdjacentElement("beforebegin", newElem);







 



