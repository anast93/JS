'use strict';

let readers = [
    {
        libCard: 1,
        secName: 'Тараканова',
        firstName: 'Валентина',
        middleName: 'Альбертовна'
    },

    {
        libCard: 2,
        secName: 'Тарелкин',
        firstName: 'Семен',
        middleName: 'Валентинович'
    },

    {
        libCard: 3,
        secName: 'Чайников',
        firstName: 'Олег',
        middleName: 'Григорьевич'
    },

    {
        libCard: 4,
        secName: 'Мартынчук',
        firstName: 'Роза',
        middleName: 'Васильевна'
    }
];
    
let borrowings = [
    {
        idBor: 1,
        idCopy: 1,
        libCard: 1,
        dateOut: '2020-01-08',
        dateIn: '2020-01-30'
    },

    {
        idBor: 2,
        idCopy: 2,
        libCard: 1,
        dateOut: '2020-01-08',
        dateIn: '2020-01-15'
    },

    {
        idBor: 3,
        idCopy: 3,
        libCard: 1,
        dateOut: '2020-01-08',
        dateIn: '2020-01-12'
    },

    {
        idBor: 4,
        idCopy: 4,
        libCard: 2,
        dateOut: '2020-02-08',
        dateIn: '2020-02-26'
    },

    {
        idBor: 5,
        idCopy: 4,
        libCard: 3,
        dateOut: '2020-01-08',
        dateIn: '2020-01-28'
    },

    {
        idBor: 6,
        idCopy: 5,
        libCard: 3,
        dateOut: '2020-04-05',
        dateIn: '2020-05-05'
    },

    {
        idBor: 7,
        idCopy: 6,
        libCard: 3,
        dateOut: '2020-01-08',
        dateIn: '2020-01-29'
    },

    {
        idBor: 8,
        idCopy: 6,
        libCard: 4,
        dateOut: '2020-01-08',
        dateIn: '2020-01-27'
    },

    {
        idBor: 9,
        idCopy: 7,
        libCard: 3,
        dateOut: '2020-01-27',
        dateIn: '2020-01-30'
    },

    {
        idBor: 10,
        idCopy: 7,
        libCard: 2,
        dateOut: '2020-01-08',
        dateIn: '2020-01-30'
    },
];

function getDebtor(arrReaders, arrBor) {

    function calcDelta(dateReturn, dateOff) {

        const delta = (Date.parse(dateReturn) - Date.parse(dateOff)) / 1000 / 3600 / 24;

        return delta;
    }

    let array = [],
        tempArr = [],
        index = 1,
        idReader;

        array = arrBor.map(elem => {

        if(calcDelta(elem.dateIn, elem.dateOut) > 14) {
            elem = elem.libCard;
            return elem;
        }})
        .filter(elem => elem !== undefined)
        .sort()
        .forEach((elem, i, arr) => {

            if(arr.includes(elem, i+1)) {
                index++;
            } else {
                tempArr.push([elem, index]);
                index = 1;
            }
        })

        tempArr.sort((cur, next) => next[1] - cur[1]);

        idReader = tempArr[0][0];

        arrReaders.forEach(elem => {
            if(elem.libCard === idReader) {
                name = `${elem.secName} ${elem.firstName} ${elem.middleName}`;
            }
        });
    return name;
}

console.log(`Задолжник - ${getDebtor(readers, borrowings)}`);