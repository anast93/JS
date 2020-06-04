alert('Привет, мир!'); // выводит модальное окно

let money;
let income = 50000; // доход
let addExpenses = 18000 ; // расход
let deposit = 25000; // депозит в банке
let mission = 1000000; // цель
let period = 5; // период

console.log( `Цель достигнута на ${((income-addExpenses)*period+deposit)/mission*100}%` );