'use strict'

let isNumber =  function(testNumber) {
    return!isNaN( parseFloat(testNumber) )  &&  isFinite( testNumber);
};


let isStr =  function(testStr) {
    return!(/^[a-zа-я,\s]*$/gi.test( testStr) )  ||  ( / ^ , + / .test( testStr))  ||  (/^\s* $ / .test( testStr) );
};


////Рассчитать
let start =  document.getElementById('start'),
// Кнопки
    btnPlus =  document.getElementsByTagName('button'),
//Первый плюсик(добавляет строку с доходами)
    incomePlus = btnPlus[0],
// Второй плюсик(добавляет строку с расходами)
    expensesPlus = btnPlus[1],
// Checkbox
    buttonCheckDeposit =  document.querySelector('#deposit-check'),
// Ввод возможных доходов. inputAdditionalIncome - было
    additionalIncomeItem =  document.querySelectorAll('.additional_income-item'),
// Рассчитанный доход за месяц
    budgetMonthValue =  document.getElementsByClassName('budget_month-value') [ 0 ],
// Рассчитанный дневной бюджет
    budgetDayValue =  document.getElementsByClassName('budget_day-value') [ 0 ],
// Рассчитанный расход за месяц
    expensesMonthValue =  document.getElementsByClassName('expenses_month-value') [ 0 ],
// Рассчитанные возможные доходы
    additionalIncomeValue =  document.getElementsByClassName('additional_income-value') [ 0 ],
// Рассчитанные возможные расходы
    additionalExpensesValue =  document.getElementsByClassName('additional_expenses-value') [ 0 ],
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
    additionalExpensesItem =  document.querySelector('.additional_expenses-item'),
// Цель (user)
    targetAmount =  document.querySelector('.target-amount'),
// Период расчета (user)
    periodSelect =  document.querySelector('.period-select'),
// Все доходы
    incomeItem =  document.querySelectorAll('.income-items'),
// Значение бегунка
    range =  document.querySelector('.title.period-amount'),
// Кнока "Сбросить"
    cancel = document.getElementById('cancel');
    
    let main = document.querySelector('.main');
    
    let inputText = document.querySelectorAll("input[type='text']");

    cancel.setAttribute("disabled", "disabled");
    console.log(cancel);

    
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
        
        this.budget =  + salaryAmount.value;
        console.log('Месячный доход: ',salaryAmount.value);
        
        //проверка контекста функции start()
        //console.log(this);

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();   
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        //this.getStatusIncome();
        this.showResult();    
    },
    // привязка контекста ф-ии start() к объекту appData
    newStart: function() {
        this.start = this.start.bind(appData); 
        
    },
    
    // Ф-я проверяет поле с Месячным доходом(salaryAmount) на наличие значения.
    // Если значение != пустой строке, то атрибут "disabled" удаляется
    // Запускается при событии change на поле salaryAmount
    check: function() {
        if(salaryAmount.value!== '') {
            start.removeAttribute("disabled");
        }  else {
            start.setAttribute("disabled",  "disabled");
        }
    },
    // Завершение программы. Срабатывает при нажатии на кнопку "Рассчитать".
    completePrgm: function() {
        start.setAttribute("disabled", "disabled");
        start.style.display = 'none';

        periodSelect.setAttribute("disabled", "disabled");
        incomePlus.setAttribute("disabled", "disabled");
        expensesPlus.setAttribute("disabled", "disabled");

        inputText = document.querySelectorAll("input[type='text']");
        
        inputText.forEach(function(item) {
            item.setAttribute("disabled", "disabled");
        });

        cancel.style.display = "block";
        cancel.removeAttribute("disabled");
    }, 
    // Возвращает программу к исходному состоянию. Срабатывает при нажатии на кнопку "Сбросить"
    resetPrgm: function() {

        cancel.setAttribute("disabled", "disabled");
        cancel.style.display = 'none';

        range.textContent = '1';
        periodSelect.value = 1;
        periodSelect.removeAttribute("disabled");

        start.removeAttribute("disabled");
        start.style.display = 'block';
        
        incomePlus.removeAttribute("disabled");
        incomePlus.style.display = 'block';

        expensesPlus.removeAttribute("disabled");
        expensesPlus.style.display = 'block';

        inputText = document.querySelectorAll("input[type='text']");

        inputText.forEach(function(item) {
            item.removeAttribute("disabled");
        });
        
        for(let i = 1; i < incomeItem.length; i++) {
            if (incomeItem.length > 1) {
                incomeItem[i].remove();
            }
        }

        for(let i = 1; i < expensesItems.length; i++) {
            if (expensesItems.length > 1) {
                expensesItems[i].remove();
            }
        }

        inputText.forEach(function(item) {
            if (item.value !== '') {
                item.value = '';
            }
        });

    },

    getPeriod: function() { 
        range.textContent = +periodSelect.value;
    },
    changeIncomePeriodValue: function() {
        incomePeriodValue.value = appData.calcPeriod();
        // В консоли range, а не appData
        //console.log(this);
    },
    addExpensesBlock: function() {
        // Добавляет еще строчку с обяз.расходами
        let cloneExpensesItem =  expensesItems[ 0].cloneNode(true);
        expensesItems[ 0].parentNode.insertBefore( cloneExpensesItem,  expensesPlus);
        expensesItems =  document.querySelectorAll('.expenses-items');

        if(expensesItems.length ===  3 ) {
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
            console.log(this);
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

        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join( ', ' );
        additionalIncomeValue.value = this.addIncome.join( ', ' );
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('click',  this.changeIncomePeriodValue);
    },
    getExpensesMonth: function() {
        let sum =  0;
        console.log(this);
        for( let key in this.expenses) {
    
            sum +=  this.expenses[ key]
            this.expensesMonth = sum;
        }
        return sum,
        console.log("Расходы за месяц равны " + sum + " рублей.")
    },
    getBudget: function() {

        this.budgetMonth = +this.budget +  this.incomeMonth - this.expensesMonth;
        this.budgetDay =  Math.floor( this.budgetMonth/30 );
    },
    getTargetMonth: function() {

        return Math.ceil(targetAmount.value/ this.budgetMonth);
    },
    calcPeriod: function() {

        return this.budgetMonth * periodSelect.value; 

    },
    // Тут проверить this!!!
    getStatusIncome: function() {

        if (this.budgetDay > 1200) {
            return console.log('У вас высокий уровень дохода!');
        } else if (this.budgetDay > 600) {
            return console.log('У вас средний уровень дохода.');
        } else if (this.budgetDay >= 0) {
            return console.log('К сожалению, у вас уровень дохода ниже среднего.');
        } else {
            return console.log('Ваши расходы превышают доходы.');
        }
    }
};


appData.newStart();
start.addEventListener('click',  appData.start);
start.addEventListener('click', appData.completePrgm);
expensesPlus.addEventListener('click',  appData.addExpensesBlock);
incomePlus.addEventListener('click',  appData.addIncomeBlock);
periodSelect.addEventListener('click',  appData.getPeriod);
salaryAmount.addEventListener('change',  appData.check);
cancel.addEventListener('click', appData.resetPrgm);




