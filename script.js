'use sctrict'

let money = +prompt('Ваш месячный доход?', 50000); // money присваивается значение, к-е вводит юзер
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Питание, проезд, ЖКХ');
let deposit = confirm('Есть ли у вас депозит в банке?'); // Ok - true, ОТмена - false

let expenses1 = prompt('Введите обязательную статью расходов.', 'Интернет');
let expenses2 = prompt('Введите обязательную статью расходов.', 'Связь');

let amount1 = +prompt('Во сколько это обойдется?', 1000); // Величины обяз. статей расходов
let amount2 = +prompt('Во сколько это обойдется?', 500);

let income = 'фриланс'; // Дополнительный доход
let mission = 1000000; // цель
let period = 12; 

// Ф-я выводит тип данных
let showTypeOf = function(data) {
    console.log( data, typeof (data) );
}

// Вызов ф-ии, к-ая выводит тип данных 
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// Считает сумму обязательных расходов за месяц
let getExpensesMonth = function(a, b) {
    return a + b;
}
console.log( 'Расходы за месяц: ' + getExpensesMonth(amount1, amount2) + ' рублей.' );

// Приводит строку с расходами к нижнему регистру и разбивает на массив
let str = addExpenses.toLowerCase();
console.log( str.split(',') );

// Считает накопления за месяц: доходы - обяз.расходы.
let getAccumulatedMonth = function(a, b) {
    return a - b;
};

const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2)); 
// накопления за месяц, переменной присвоено значение ф-ии, которая их считает

let budgetDay = Math.floor(accumulatedMonth/30); // Бюджет на день. Округляет значение в меньшую сторону.
console.log( `Бюджет на день: ${budgetDay} рублей.` );

//console.log( `Цель будет достигнута за ${Math.ceil(mission/budgetMonth)} месяцев.` ); // округляет кол-во
// месяцев в большую сторону

// Считает период, за который будет достигнута цель
let getTargetMonth = function(a, b) {
    return Math.ceil( a/b );
};

console.log( 'Цель будет достигнута за ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев.' );

let geetStatusIncome = function() {
    if (budgetDay > 1200) {
        return ( 'У вас высокий уровень дохода!' );
    } else if (budgetDay > 600) {
        return ( 'У вас средний уровень дохода.');
    } else if (budgetDay >= 0) {
        return ('К сожалению, у вас уровень дохода ниже среднего.');
    } else {
        return ( 'Что-то пошло не так.' );
    }
};

console.log( geetStatusIncome() );
