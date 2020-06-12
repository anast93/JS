'use strict'

let money; 

let isNumber = function(testNumber) {
    return !isNaN( parseFloat(testNumber) ) && isFinite(testNumber);
};

let start = function() {

    do {
        money = prompt('Ваш месячный доход?');
    }
    while( !isNumber(money) );

};

start();

// Объект содержит все переменные, к-ы созданы. Переменные теперь - св-ва объекта.
// income - доп. доход, mission - цель, addExpenses - возможные расходы,

let appData = {
    income: {}, 
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        let amount;
        let exp;
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Питание, проезд');
            appData.addExpenses = addExpenses.toLowerCase().split(',');   
            appData.deposit = confirm('Есть ли у вас депозит в банке?'); 

            for(let i = 0; i < 2; i++ ) {
                exp = prompt('Введите обязательную статью расходов.', 'Интернет');  
                amount = prompt('Во сколько это обойдется?');

                while(!isNumber(amount)) {
                    amount = prompt('Во сколько это обойдется?');
            }
            appData.expenses[exp] = +amount; // Сохраняет св-во объекта (статья расхода) : значение св-ва (величина расхода)   
    }           
    },
    getExpensesMonth: function() {
        let sum = 0;
    
        for(let key in appData.expenses) {
    
            sum += appData.expenses[key]
            appData.expensesMonth = sum;
        }
        return sum,
        console.log("Расходы за месяц равны " + sum + " рублей.")
        
    },
    getBudget: function(capital) {

        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor((appData.budget - appData.expensesMonth)/30);
    },
    getTargetMonth: function() {

        let time = Math.ceil(appData.mission/appData.budgetMonth);
        
        if (time <= 0) {
            return console.log( 'Цель не будет достигнута.' ) ;
        } else {
            return console.log( 'Цель будет достигнута за ' + time + ' месяцев.' );
        }
    },
    getStatusIncome: function() {

        if (appData.budgetDay > 1200) {
            return console.log('У вас высокий уровень дохода!');
        } else if (appData.budgetDay > 600) {
            return console.log('У вас средний уровень дохода.');
        } else if (appData.budgetDay >= 0) {
            return console.log('К сожалению, у вас уровень дохода ниже среднего.');
        } else {
            return console.log('Ваши расходы превышают доходы.');
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();


for (let key in appData) {
    console.log('Наша программа включает в себя данные: свойство ' + key + ' и значение ' + appData[key]);
};




