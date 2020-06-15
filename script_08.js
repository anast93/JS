'use strict'

let money; 

let isNumber = function(testNumber) {
    return !isNaN( parseFloat(testNumber) ) && isFinite(testNumber);
};


let isStr = function(testStr) {
    return !(/^[a-zа-я,\s]*$/gi.test(testStr)) || (/^,+/.test(testStr)) || (/^\s*$/.test(testStr));
};

let start = function() {

    do {
        money = prompt('Ваш месячный доход?', 10000);
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
    percentDeposit: 0,
    moneyDeposit: 0,
    deposit: false,
    mission: 50000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        let itemIncome;
        let cashIncome;

        if(confirm('Есть ли у вас дополнительный заработок?')) {

            itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'фриланс');
            while(isStr(itemIncome)) {
                 itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'фриланс');
            }
            while(!isNumber(cashIncome)) {
                 cashIncome = prompt('Сколько вы зарабатываете на этом?', 10000);
            }
            

            appData.income[itemIncome] = cashIncome;

        }

        let amount;
        let exp;
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую без пробелов.', 'Питание,проезд');

        while(isStr(addExpenses)) {
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую без пробелов.', 'Питание,проезд');
        }

        console.log(addExpenses.split(/\,/).map(word => word[0].toUpperCase() + word.substring(1)).join(', '));

        appData.addExpenses = addExpenses.toLowerCase().split(',');

        appData.deposit = confirm('Есть ли у вас депозит в банке?'); 

        for (let i = 0; i < 2; i++ ) {
            exp = prompt('Введите обязательную статью расходов.', 'Интернет');  
            
            while(isStr(exp)) {
                exp = prompt('Введите обязательную статью расходов.', 'Интернет'); 
            }

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
    getBudget: function() {
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
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', 10);

            while(!isNumber(appData.percentDeposit)) {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }

            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);

            while(!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();


for (let key in appData) {
    console.log('Наша программа включает в себя данные: свойство ' + key + ' и значение ' + appData[key]);
};




