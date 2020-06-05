let money = 60000;
let income = 20000;
let addExpenses = "Питание, проезд, комунальные платежи, связь, интернет";
let deposit = false;
let mission = 1000000;
let period = 12;

console.log( typeof(money) );
console.log( typeof(income) );
console.log( typeof(deposit) );

console.log( addExpenses.length );

console.log( `Период равен ${period} месяцев. Цель - заработать ${mission} рублей.` );

let str = addExpenses.toLowerCase();
console.log( str.split(', ') );

let budgetDay = money/30;
console.log( budgetDay );
 