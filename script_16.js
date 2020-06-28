'use strict'

//Рассчитать
const start =  document.getElementById('start'),
// Кнопки
    btnPlus =  document.getElementsByTagName('button'),
//Первый плюсик(добавляет строку с доходами)
    incomePlus = btnPlus[0],
// Второй плюсик(добавляет строку с расходами)
    expensesPlus = btnPlus[1],
// Checkbox
    depositCheck =  document.querySelector('#deposit-check'),
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
// Возможные расходы через запятую (user)
    additionalExpensesItem =  document.querySelector('.additional_expenses-item'),
// Цель (user)
    targetAmount =  document.querySelector('.target-amount'),
// Период расчета (user)
    periodSelect =  document.querySelector('.period-select'),
// Значение бегунка
    range =  document.querySelector('.title.period-amount'),
// Кнока "Сбросить"
    cancel = document.getElementById('cancel'),
// Выбор банка
    depositBank = document.querySelector('.deposit-bank'),
// Сумма депозита
    depositAmount = document.querySelector('.deposit-amount'),
// Величина процента 
    depositPercent = document.querySelector('.deposit-percent');

// Сумма обязательного расхода (user)
let expensesItems = document.querySelectorAll('.expenses-items'),
// Все доходы
    incomeItem =  document.querySelectorAll('.income-items'),

// все поля input  с типом text, кроме тех, чьи классы начинаются с result.
// Значение этой переменной меняется, поэтому let
    inputText = document.querySelectorAll("input[type='text']:not([class^='result-t'])");

// кнопки "Рассчитать" и "Сбросить" по умолчанию отключены
    start.setAttribute("disabled", "disabled");
    cancel.setAttribute("disabled", "disabled");

class AppData {
    constructor() {
    this.income = {}; 
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];    
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.deposit = false;
    this.mission = 50000;
    this.period = 12;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    }

    isNumber(testNumber) {
        return !isNaN( parseFloat(testNumber) )  &&  isFinite(testNumber);
    }

    start() {

        salaryAmount.value = salaryAmount.value.trim();

        if (salaryAmount.value === '' || !this.isNumber(salaryAmount.value)) {
            alert('Используйте только цифры для ввода месячного дохода.');
            start.setAttribute("disabled", true);
            return;
        }

        if (this.deposit === true) {
            if ( (!this.isNumber(depositPercent.value)) || (parseFloat(depositPercent.value) < 0) || (parseFloat(depositPercent.value) > 100)) {
                start.setAttribute('disabled', true);
                alert('Процент должен быть числом от 1 до 100.');
                return;
            }
        }
         

        this.budget =  + salaryAmount.value;
        console.log('Месячный доход: ',salaryAmount.value);
        
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();   
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        //this.getStatusIncome();
        this.showResult();    
    }

    completePrgm() {

        salaryAmount.value = salaryAmount.value.trim();

        if (salaryAmount.value === '' || !this.isNumber(salaryAmount.value)) {
            start.setAttribute("disabled", true);
            return;
        }

        if (this.deposit === true) {
            if ( (!this.isNumber(depositPercent.value)) || (parseFloat(depositPercent.value) < 0) || (parseFloat(depositPercent.value) > 100)) {
                start.setAttribute('disabled', true);
                return;
            }
        }


        start.setAttribute("disabled", "disabled");
        start.style.display = 'none';
    
        incomePlus.setAttribute("disabled", "disabled");
        expensesPlus.setAttribute("disabled", "disabled");
    
        inputText = document.querySelectorAll("input[type='text']:not([class^='result-t'])");
        
        inputText.forEach(function(item) {
            item.setAttribute("disabled", "disabled");
        });
    
        depositCheck.setAttribute("disabled", "disabled");
        depositBank.setAttribute("disabled", "disabled");

        cancel.style.display = "block";
        cancel.removeAttribute("disabled");
    }

    reset() {

        this.addExpenses.length = 0;
        this.addIncome.length = 0;
    
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.mission = 0;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;

        depositCheck.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
    
        for (let key in this.expenses) delete this.expenses[key];
        for (let key in this.income) delete this.income[key];
    
        cancel.setAttribute("disabled", "disabled");
        cancel.style.display = 'none';
    
        range.textContent = '1';
        periodSelect.value = 1;
        periodSelect.removeAttribute("disabled");
    
        start.removeAttribute("disabled");
        start.style.display = 'block';

        depositCheck.removeAttribute("disabled");
        depositBank.removeAttribute("disabled");
        
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
    
        start.setAttribute("disabled", "disabled");
    
    }

    getPeriod() { 
        range.textContent = +periodSelect.value;
    }

    addExpensesBlock() {
        // Добавляет еще строчку с обяз.расходами
        const cloneExpensesItem =  expensesItems[0].cloneNode(true);
        expensesItems[ 0].parentNode.insertBefore( cloneExpensesItem,  expensesPlus);
        expensesItems =  document.querySelectorAll('.expenses-items');
    
        if(expensesItems.length ===  3 ) {
            expensesPlus.style.display = 'none';
        }
    }

    addIncomeBlock() {
        // Добавляет строчку с доп.доходами
        const cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
    
        if(incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    }

    getExpenses() {
        const _this = this;
        expensesItems.forEach(item => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
    
            if(itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    }

    getIncome() {
        const _this = this;
        incomeItem.forEach(item => {
            const itemIncome = item.querySelector('input.income-title').value,
                  cashIncome = item.querySelector('.income-amount').value;
            
            if(itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = +cashIncome;
            }
        });
        for (let key in _this.income) {
            _this.incomeMonth += +appData.income[key];
        }
    }

    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(','),
              _this = this;
    
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        const _this = this;
    
        additionalIncomeItem.forEach(item => {
            const itemValue = item.value.trim();
            if(itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
    
        });
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join( ', ' );
        additionalIncomeValue.value = this.addIncome.join( ', ' );
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change',  this.calcPeriod);
    }

    getExpensesMonth() {
        let sum =  0;
        
        for( let key in this.expenses) {
    
            sum +=  this.expenses[key];
            this.expensesMonth = sum;
        }
        return sum;
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = +this.budget +  this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay =  Math.floor( this.budgetMonth/30 );
    }

    getTargetMonth() {

        return Math.ceil(targetAmount.value/ this.budgetMonth);
    }

    calcPeriod() {

        incomePeriodValue.value = +periodSelect.value * this.budgetMonth;
        return +incomePeriodValue.value;
    
    }

    getStatusIncome() {

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

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }


    changePercent() {
        const valueSelect = this.value;

        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = 1;
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;

            console.log(valueSelect);
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);

        }
    }

    eventsListeners() {
        const _this = this;

        start.addEventListener('click',  this.start.bind(this));
        start.addEventListener('click', this.completePrgm.bind(this));
        expensesPlus.addEventListener('click',  this.addExpensesBlock);
        incomePlus.addEventListener('click',  this.addIncomeBlock);
        periodSelect.addEventListener('change',  this.getPeriod);
        periodSelect.addEventListener('click', this.calcPeriod.bind(this));
        salaryAmount.addEventListener('input',  function() {
            
                salaryAmount.value = salaryAmount.value.trim();
                if(salaryAmount.value !== '' && _this.isNumber(salaryAmount.value)) {
                    start.removeAttribute("disabled");
                } else {
                    alert('Используйте только цифры для ввода месячного дохода.');
                    start.setAttribute("disabled", true);
                }
            
        });
        cancel.addEventListener('click', this.reset.bind(this));
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositPercent.addEventListener('input', function() {
            if ( (!_this.isNumber(depositPercent.value)) || (parseFloat(depositPercent.value) <0) || (parseFloat(depositPercent.value) > 100)) {
                start.setAttribute('disabled', true);
                alert('Процент должен быть числом от 1 до 100.');
        } else {
            start.removeAttribute('disabled');
        }
        });
      
    }
}
 
const appData = new AppData();
appData.eventsListeners();







