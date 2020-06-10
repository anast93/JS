'use strict'

// Ф-я выполняет проверку на число. isNan проверяет явл-ся ли параметр нечисловым значением(NaN) или нет.
// Функция isFinite преобразует параметр к числу и возвращает true, если это НЕ Infinity, 
//-Infinity или NaN.
// Ф-я возвращает true, когда параметр - число.
let isNumber = function(testNumber) {
    return !isNaN( parseFloat(testNumber) ) && isFinite(testNumber);
};

let money; // доход
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Питание,проезд,ЖКХ');
let deposit = confirm('Есть ли у вас депозит в банке?'); // Ok - true, Отмена - false

let expenses = []; // массив с обяз.доходами

// Ф-я выводит окно с вопросом до тех пор, пока введенное значение - не число
let start = function() {

    do {
        money = prompt('Ваш месячный доход?');
    }
    while( !isNumber(money) );

};

start();

// Ф-я сохраняет обязательные расходы в массив и считает сумму расходов
let getExpensesMonth = function() {
    let sum = 0;
    let amount;
    let arrAmount = [];

    for (let i = 0; i < 2; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов.', 'Интернет');  
            amount = prompt('Во сколько это обойдется?');

        while(!isNumber(amount)) {
            amount = prompt('Во сколько это обойдется?');
        }
        arrAmount.push(+amount); // метод push добавляет элемент в конец массива
        sum = arrAmount.reduce((prev, cur) => prev + cur); // складывает эл-ты массива
       
    }
    return sum;
};

let expensesAmount = getExpensesMonth();

let income = 'фриланс'; // Дополнительный доход
let mission = 1000000; // цель
let period = 12; 

// Ф-я выводит тип данных
let showTypeOf = function(data) {
    console.log( data, typeof (data) );
};

// Вызов ф-ии, к-ая выводит тип данных 
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log( 'Расходы за месяц: ' + expensesAmount + ' рублей.' );

// Приводит строку с расходами к нижнему регистру и разбивает на массив
let str = addExpenses.toLowerCase();
console.log( str.split(',') );

// Считает накопления за месяц: доходы - обяз.расходы.
let getAccumulatedMonth = function(capital, sumAmmounts) {
    return capital - sumAmmounts;
};

const accumulatedMonth = getAccumulatedMonth(money, expensesAmount); 
// накопления за месяц; переменной присвоено значение ф-ии, которая их считает

let budgetDay = Math.floor(accumulatedMonth/30); // Бюджет на день. Округляет значение в меньшую сторону.
console.log( `Бюджет на день: ${budgetDay} рублей.` );


// Считает период, за который будет достигнута цель
let getTargetMonth = function(target, sumAmmounts) {
    let time = Math.ceil(target/sumAmmounts);
    
    if (time <= 0) {
        return console.log( 'Цель не будет достигнута.' ) ;
    } else {
        return console.log( 'Цель будет достигнута за ' + time + ' месяцев.' );
    }
};

getTargetMonth(mission, accumulatedMonth);

let getStatusIncome = function(dailyBudget) {
    if (dailyBudget > 1200) {
        return ( 'У вас высокий уровень дохода!' );
    } else if (dailyBudget > 600) {
        return ( 'У вас средний уровень дохода.');
    } else if (dailyBudget >= 0) {
        return ('К сожалению, у вас уровень дохода ниже среднего.');
    } else {
        return ( 'Ваши расходы превышают доходы.' );
    }
};

console.log( getStatusIncome(budgetDay) );
