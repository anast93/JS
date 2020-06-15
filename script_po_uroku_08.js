'use strict'

let regexp1 = /^[a-zа-я,\s]*$/gi;// любой символ, кроме буквы
//let regexp2 = /^\p{L},/gui;
let str = '!asd';

let reg3 = /^,+/;

console.log((/^\s*$/.test(' d   ')));

console.log(!regexp1.test(str)); // false - если строка содержит любой символ, кроме буквы
console.log(str);
console.log(str.match(regexp1));

//console.log(/[^a-zа-я]/gi.test(str));

let string = 'яблоко,лимон,апельсин';

console.log(
    string.split(/\,/).map(word => word[0].toUpperCase() + word.substring(1)).join(', ')
    );