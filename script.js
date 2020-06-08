'use sctrict'

let money = prompt('Ваш месячный доход?'); // money присваивается значение, к-е вводит юзер
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?'); 

let expenses1 = prompt('Введите обязательную статью расходов.');
let expenses2 = prompt('Введите обязательную статью расходов.');

let amount1 = prompt('Во сколько это обойдется?'); // Величины обяз. статей расходов
let amount2 = prompt('Во сколько это обойдется?');

let income = 'фриланс'; // Дополнительный доход
let mission = 1000000; // цель
let period = 12; 

console.log( typeof(money) );
console.log( typeof(income) );
console.log( typeof(deposit) );

console.log( addExpenses.length );

console.log( `Период равен ${period} месяцев. Цель - заработать ${mission} рублей.` );

let str = addExpenses.toLowerCase();
console.log( str.split(',') );


let budgetMonth = +money-(+amount1 + +amount2); // Бюджет на месяц с учетом обяз. расходов
let budgetDay = Math.floor(budgetMonth/30); // Бюджет на день

console.log( `Бюджет на месяц: ${budgetMonth} рублей.` );
console.log( `Бюджет на день: ${budgetDay} рублей.` );
console.log( `Цель будет достигнута за ${Math.ceil(mission/budgetMonth)} месяцев.` ); // округляет кол-во
// месяцев в большую сторону

if (budgetDay > 1200) {
    console.log( 'У вас высокий уровень дохода!' );
} else if (budgetDay > 600) {
    console.log( 'У вас средний уровень дохода.');
} else if (budgetDay >= 0) {
    console.log('К сожалению, у вас уровень дохода ниже среднего.');
} else {
    console.log( 'Что-то пошло не так.' );
}

