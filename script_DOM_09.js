'use sctict'

//Рассчитать
const buttonCalc = document.getElementById('start');
//console.log(buttonCalc);

//второй плюсик
const buttonSumIncome = document.getElementsByTagName('button')[0];
//console.log(buttonSumIncome);

//Второй плюсик
const buttonSumExpenses = document.getElementsByTagName('button')[1];
//console.log(buttonSumExpenses);

//Checkbox
const buttonCheckDeposit = document.querySelector('#deposit-check');
//console.log(buttonCheckDeposit);

// Ввод возможных доходов
const inputAdditionalIncome = document.querySelectorAll('.additional_income-item');
//console.log(inputAdditionalIncome);

//Рассчитанный доход за месяц
const outputBudgetMonth = document.getElementsByClassName('budget_month-value')[0];
//console.log(outputBudgetMonth);


//Рассчитанный дневной бюджет
const outputBudgetDay = document.getElementsByClassName('budget_day-value')[0];
//console.log(outputBudgetDay);

//Рассчитанный расход за месяц
const outputExpensesMonth = document.getElementsByClassName('expenses_month-value')[0];
//console.log(outputExpensesMonth);

//Рассчитанные возможные доходы
const outputResultAddIncome = document.getElementsByClassName('additional_income-value')[0];
//console.log(outputResultAddIncome);

//Рассчитанные возможные расходы
const outputResAddExpenses = document.getElementsByClassName('additional_expenses-value')[0];
//console.log(outputResAddExpenses);

// Рассчитанные накопления за период
const outputResIncomePeriod = document.getElementsByClassName('income_period-value')[0];
//console.log(outputResIncomePeriod);

// Срок достижения цели в месяцах
const outputResTargetMonth = document.getElementsByClassName('target_month-value')[0];
//console.log(outputResTargetMonth);

// Месячный доход (user)
const inputSalaryAmount = document.querySelector('.salary-amount');
//console.log(inputSalaryAmount);

// Наименование доп. дохода (user)
const inputIncomeItem = document.querySelector('.income-title-item');
//console.log(inputIncomeItem);

// Сумма доп. дохода (user)
const inputIncomeAmount = document.querySelector('.income-amount');
//console.log(inputIncomeAmount);

//Наименование обязательного расхода (user)
const inputExpensesItem = document.querySelector('.expenses-title-item');
//console.log(inputExpensesTitle);

//Сумма обязательного расхода (user)
const inputExpensesAmount = document.querySelector('.expenses-amount');
//console.log(inputExpensesAmount);

// Возможные расходы через запятую (user)
const inputAddExpenses = document.querySelector('.additional_expenses-item');
//console.log(inputAddExpenses);

// Цель (user)
const inputTarget = document.querySelector('.target-amount');
//console.log(inputTarget);

// Период расчета (user)
const selectPeriod = document.querySelector('.period-select');
//console.log(selectPeriod);

console.log(inputSalaryAmount, inputIncomeItem, inputIncomeAmount, buttonSumIncome,   inputAdditionalIncome, inputExpensesItem, inputExpensesAmount, buttonSumExpenses,inputAddExpenses, buttonCheckDeposit, inputTarget, selectPeriod, outputBudgetMonth, outputBudgetDay, outputExpensesMonth, outputResultAddIncome, outputResAddExpenses, outputResIncomePeriod, outputResTargetMonth, buttonCalc);

