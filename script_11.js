'use strict'

let isNumber = function(testNumber) {
    return !isNaN( parseFloat(testNumber) ) && isFinite(testNumber);
};


let isStr = function(testStr) {
    return !(/^[a-zа-я,\s]*$/gi.test(testStr)) || (/^,+/.test(testStr)) || (/^\s*$/.test(testStr));
};


////Рассчитать
let start = document.getElementById('start'),
// Кнопки
    btnPlus = document.getElementsByTagName('button'),
//Первый плюсик(Складывает доходы)
    incomePlus = btnPlus[0],
// Второй плюсик(Складывает расходы)
    expensesPlus = btnPlus[1],
// Checkbox
    buttonCheckDeposit = document.querySelector('#deposit-check'),
// Ввод возможных доходов. inputAdditionalIncome - было
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
// Рассчитанный доход за месяц
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
// Рассчитанный дневной бюджет
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
// Рассчитанный расход за месяц
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
// Рассчитанные возможные доходы
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
// Рассчитанные возможные расходы
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
// Рассчитанные накопления за период
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
// Срок достижения цели в месяцах
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
// Месячный доход (user)
    salaryAmount = document.querySelector('.salary-amount'),
// Наименование доп. дохода (user)
    incomeTitle = document.querySelector('input.income-title'),
// Сумма доп. дохода (user)
    incomeAmount = document.querySelector('.income-amount'),
// Наименование обязательного расхода (user)
    inputExpensesItem = document.querySelector('input.expenses-title'),
// Сумма обязательного расхода (user)
    expensesItems = document.querySelectorAll('.expenses-items'),
// Возможные расходы через запятую (user)
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
// Цель (user)
    targetAmount = document.querySelector('.target-amount'),
// Период расчета (user)
    periodSelect = document.querySelector('.period-select'),
// Все доходы
    incomeItem = document.querySelectorAll('.income-items'),
// Значение бегунка
    range = document.querySelector('.title.period-amount');

    console.log(expensesPlus);
    console.log(additionalIncomeItem);
    console.log(periodSelect);
    console.log(start);
    start.setAttribute("disabled", "disabled");// кнопка "Рассчитать" по умолчанию отключена

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
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    start: function() {

        appData.budget = +salaryAmount.value;
        console.log('Месячный доход: ',salaryAmount.value);

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();   
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();    
    },
    // Ф-я проверяет поле с Месячным доходом(salaryAmount) на наличие значения.
    // Если значение != пустой строке, то атрибут "disabled" удаляется
    // Запускается при событии change на поле salaryAmount
    check: function() {
        if(salaryAmount.value !== '') {
            start.removeAttribute("disabled");
        } else {
            start.setAttribute("disabled", "disabled");
        }
    },
    getPeriod: function() { 
        range.textContent = +periodSelect.value;
    },
    changeIncomePeriodValue: function() {

        incomePeriodValue.value = appData.calcPeriod();
    },
    addExpensesBlock: function() {
        // Добавляет еще строчку с обяз.расходами
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        // Добавляет строчку с доп.доходами
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');

        if(incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItem.forEach(function(item) {
            let itemIncome = item.querySelector('input.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }

        });
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('click', appData.changeIncomePeriodValue);
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
        appData.budgetMonth = +appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth: function() {
        //appData.mission = targetAmount.value;
        return Math.ceil(targetAmount.value/appData.budgetMonth);
    },
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
        
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
    }
};

start.addEventListener('click', appData.start); 
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('click', appData.getPeriod);
salaryAmount.addEventListener('change', appData.check);




// appData.getStatusIncome();
// appData.getInfoDeposit();

//     console.log(addExpenses.split(/\,/).map(word => word[0].toUpperCase() + word.substring(1)).join(', '));
//     appData.addExpenses = addExpenses.toLowerCase().split(',');

// if (time <= 0) {
//     return console.log( 'Цель не будет достигнута.' ) ;
// } else {
//     return console.log( 'Цель будет достигнута за ' + time + ' месяцев.' );
// }



