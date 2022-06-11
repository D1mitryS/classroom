const getGradesTotal = grades => {
    return grades.length || 'No grades';
}

const getSumOfGrades = grades => {
    if (grades.length) {
        let sum = 0;
        grades.forEach(grade => {
            sum += grade;
        });
        return sum;
    }
    return 'No grades'
}

const getAverageGrade = grades => {
    if (grades.length) {
        const averageGrade = getSumOfGrades(grades) / getGradesTotal(grades);
        return (averageGrade % 1 === 0) ? averageGrade : averageGrade.toFixed(2);
    }
    return 'No grades';
}

const getPassingGrades = (grades, lowLimit) => {
    if (grades.length) {
        const filteredGrades = grades.filter(grade => {
            return grade >= lowLimit;
        });
        return (filteredGrades.length) ? filteredGrades.join(', ') : 'No Passing grades';
    }
    return 'No grades';
}

const getFailingGrades = (grades, lowLimit) => {
    if (grades.length) {
        const filteredGrades = grades.filter(grade => {
            return grade < lowLimit;
        });
        return (filteredGrades.length) ? filteredGrades.join(', ') : 'No failing grades';
    }
    return 'No grades';
}

const getPassingGradesTotal = (grades, lowLimit) => {
    if (grades.length) {
        const passingGrades = grades.filter(grade => {
            return grade >= lowLimit;
        });
        return (passingGrades.length) ? getGradesTotal(passingGrades) : 'No passing grades';
    }
    return 'No grades';
}

const getFailingGradesTotal = (grades, lowLimit) => {
    if (grades.length !== 0) {
        const failingGrades = grades.filter(grade => {
            return grade < lowLimit;
        })
        return (failingGrades.length) ? getGradesTotal(failingGrades) : 'No failing grades';
    }
    return 'No grades';
}

/* Turns every number from grades array into word string e.g. 0 to 'Zero'  */
const getTranscriptedGrades = grades => {
    const transcriptedGrades = grades.map(grade => {
        if (grade <= 19) {
            return getTranscriptedBelowTwenty(grade);
        } 
        else if (grade > 19 && grade <= 99) {
            const gradeToStr = String(grade); 
            const firstDigit = Number.parseInt(gradeToStr[0], 10);
            const secondDigit = Number.parseInt(gradeToStr[1], 10);

            switch (grade % 10 === 0) {
                case true:
                    return getTranscriptedAboveTwenty(firstDigit);
                default:
                    return `${getTranscriptedAboveTwenty(firstDigit)}-${getTranscriptedBelowTwenty(secondDigit).toLowerCase()}`;
            }
        }
        else if (grade === 100) {
            return 'Hundred';
        }
    })
    return transcriptedGrades.join(', ') || 'No grades';
}

const getTranscriptedBelowTwenty = grade => {
    switch (grade) {
        case 0:
            return 'Zero';
        case 1:
            return 'One';
        case 2:
            return 'Two';
        case 3:
            return 'Three';
        case 4:
            return 'Four';
        case 5:
            return 'Five';
        case 6:
            return 'Six';
        case 7:
            return 'Seven';
        case 8:
            return 'Eight';
        case 9:
            return 'Nine';
        case 10:
            return 'Ten';
        case 11:
            return 'Eleven';
        case 12:
            return 'Twelve';
        case 13:
            return 'Thirteen';
        case 14:
            return 'Fourteen';
        case 15:
            return 'Fifteen';
        case 16:
            return 'Sixteen';
        case 17:
            return 'Seventeen';
        case 18:
            return 'Eighteen';
        case 19:
            return 'Nineteen';
    }
}

const getTranscriptedAboveTwenty = grade => {
    switch (grade) {
        case 2:
            return 'Twenty';
        case 3:
            return 'Thirty';
        case 4:
            return 'Forty';
        case 5:
            return 'Fifty';
        case 6:
            return 'Sixty';
        case 7:
            return 'Seventy';
        case 8:
            return 'Eighty';
        case 9:
            return 'Ninety';
    }
}

/* Renders table row with new grades array value for every call */
const render1TableContent = grades => {
    const tbody = (document.querySelector('#first-table tbody'));

    tbody.innerHTML =
        `<tr>
            <td>${getGradesTotal(grades)}</td>
            <td>${getSumOfGrades(grades)}</td>
            <td>${getAverageGrade(grades)}</td>
        </tr>`;
}

const render2TableContent = (grades, lowLimit) => {
    const tbody = document.querySelector('#second-table tbody');

    tbody.innerHTML =
        `<tr>
            <td>${getPassingGrades(grades, lowLimit)}</td>
            <td>${getFailingGrades(grades, lowLimit)}</td>
        </tr>`;
}

const render3TableContent = (grades, lowLimit) => {
    const tbody = document.querySelector('#third-table tbody');
    tbody.innerHTML =
        `<tr>
            <td>${getPassingGradesTotal(grades, lowLimit)}</td>
            <td>${getFailingGradesTotal(grades, lowLimit)}</td>
        </tr>`;
}

render4TableContent = grades => {
    const tbody = document.querySelector('#fourth-table tbody');
    tbody.innerHTML =
        `<tr>
        <td>${getTranscriptedGrades(grades)}</td>
    </tr>`;
}

/* Call on functions to render table rows with new arguments */
render = (grades, lowLimit) => {
    render1TableContent(grades);
    render2TableContent(grades, lowLimit);
    render3TableContent(grades, lowLimit);
    render4TableContent(grades);
}


/* Global bc of call on render function on page load */
const grades = [];
let lowLimit = 0;

/* On page load calls function to render table rows */
render(grades, lowLimit);



/* Sets highes avaliable grade */
const highLimitInput = document.querySelector('#high-num');

/* Sets lowest avaliable grade */
const lowLimitInput = document.querySelector('#low-num');

const form = document.querySelector('#form');
const gradeInput = document.querySelector('#input');
const tooltip = document.querySelector('#tooltip');
const tooltipText = document.querySelector('#tooltip-text');
const tooltipClose = document.querySelector('#tooltip-close');

/* Doesn't show reset notification if high limit changed before first push  */
let highLimitNotification = false;

/* Pushes new grade into grades array based on conditions, also shows tooltip */
form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    tooltip.style.display = 'none';
    tooltipText.textContent = "";

    const highLimit = Number.parseInt(highLimitInput.value, 10);

    /* Passed to render function as second argument, filter callbacks depends on it */
    lowLimit = Number.parseInt(lowLimitInput.value, 10);

    /* Creates new const with grade value if true or shows tooltip warning if false */
    if (highLimit > lowLimit) {
        const newGrade = Number.parseInt(gradeInput.value, 10);

        /* Pushes new grade into grades if true or shows warning if false */
        const isValidGrade = (newGrade <= highLimit) ? true : false

        switch (isValidGrade) {
            case true:
                grades.push(newGrade);
                render(grades, lowLimit);

                /* Show reset notification if high limit changed after first push  */
                highLimitNotification = true;

                gradeInput.value = "";
                break;
            default:
            tooltip.style.display = 'flex';
            tooltipText.innerHTML = 'New grade <b>can\'t exceed</b> highest passing grade';
            gradeInput.value = "";
        }
    } else {
        tooltip.style.display = 'flex';
        tooltipText.innerHTML = 'Highest passing grade <b>can\'t be lower or equal</b> to lowest passing grade';
        gradeInput.value = "";
        highLimitInput.value = "";
        lowLimitInput.value = "";
    }
})

/* Closes tooltip */
tooltipClose.addEventListener('click', () => {
    tooltip.style.display = 'none';
    tooltipText.textContent = "";
})

/* Resets array, also renders table with new array value */
const reset = () => {
    grades.length = 0;
    render(grades);
}

/* Reset button */
const resetBtn = document.querySelector('#reset');

resetBtn.addEventListener('click', () => {
    reset();
})

/* Resets grades array if new high limit is chosen */
highLimitInput.addEventListener('change', () => {
    if (highLimitNotification) {
            tooltip.style.display = 'flex';
            tooltipText.innerHTML = 'Changing highest passing grade <b>resets all</b> grades';
            reset();
    }
})