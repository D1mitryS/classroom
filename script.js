const form = document.querySelector('#form');
const highLimitInput = document.querySelector('#high-num');
const lowLimitInput = document.querySelector('#low-num');
const gradeInput = document.querySelector('#input');
const resetBtn = document.querySelector('#reset');
const tooltip = document.querySelector('#tooltip');
const tooltipText = document.querySelector('#tooltip-text');
const tooltipClose = document.querySelector('#tooltip-close')
const grades = [];
let lowLimit = 0;
let highLimitNotification = false;


const getGradesTotal = grades => {
    return (grades.length !== 0) ? grades.length : 'No grades';
}

const getSumOfGrades = grades => {
    if (grades.length !== 0) {
        let sum = 0;
        grades.forEach(grade => {
            sum += grade;
        });
        return sum;
    }
    return 'No grades'
}

const getAverageGrade = grades => {
    return (grades.length !== 0) ? Math.round(getSumOfGrades(grades) / getGradesTotal(grades)) : 'No grades';
}

const getPassingGrades = (grades, lowLimit) => {
    if (grades.length !== 0) {
        const filteredGrades = grades.filter(grade => {
            return grade >= lowLimit;
        });
        return (filteredGrades.length !== 0) ? filteredGrades.join(", ") : "No Passing grades";
    }
    return 'No grades';
}

const getFailingGrades = (grades, lowLimit) => {
    if (grades.length !== 0) {
        const filteredGrades = grades.filter(grade => {
            return grade < lowLimit;
        });
        return (filteredGrades.length !== 0) ? filteredGrades.join(", ") : "No failing grades";
    }
    return 'No grades';
}

const getPassingGradesTotal = (grades, lowLimit) => {
    if (grades.length !== 0) {
        const passingGrades = grades.filter(grade => {
            return grade >= lowLimit;
        });
        return getGradesTotal(passingGrades);
    }
    return "No grades";
}

const getFailingGradesTotal = (grades, lowLimit) => {
    if (grades.length !== 0) {
        const failingGrades = grades.filter(grade => {
            return grade < lowLimit;
        })
        return getGradesTotal(failingGrades);
const getTranscriptedGrades = grades => {
    const transcriptedGrades = grades.map(grade => {
        if (grade <= 19) {
            return getTranscriptedBelowTwenty(grade);
        } 
        else if (grade > 19 && grade <= 99) {
            const gradeToStr = String(grade);
            const firstDigit = Number(gradeToStr[0]);
            const secondDigit = Number(gradeToStr[1]);

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

render = (grades, lowLimit) => {
    render1TableContent(grades);
    render2TableContent(grades, lowLimit);
    render3TableContent(grades, lowLimit);
    render4TableContent(grades);
}

render(grades, lowLimit);


form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    tooltip.style.display = 'none';
    tooltipText.textContent = "";

    const highLimit = Number.parseInt(highLimitInput.value, 10);
    lowLimit = Number.parseInt(lowLimitInput.value, 10);

    if (highLimit > lowLimit) {
        const newGrade = Number.parseInt(gradeInput.value, 10);

        if (newGrade <= highLimit) {
            grades.push(newGrade);
            gradeInput.value = "";
            render(grades, lowLimit);
            highLimitNotification = true;
        } else {
            tooltip.style.display = 'flex';
            tooltipText.innerHTML = 'New grade <b>can\'t exceed</b> highest passing grade';
            gradeInput.value = "";
        }
    } else {
        tooltip.style.display = 'flex';
        tooltipText.innerHTML = '<b>Highest</b> passing grade can\'t be lower or equal to <b>lowest</b> passing grade';
        gradeInput.value = "";
        highLimitInput.value = "";
        lowLimitInput.value = "";
    }
})


const reset = () => {
    grades.length = 0;
    render(grades);
}

resetBtn.addEventListener('click', () => {
    reset();
})


highLimitInput.addEventListener('change', () => {
    if (highLimitNotification) {
        tooltip.style.display = 'flex';
        tooltipText.innerHTML = 'Changing highest passing grade resets <b style="text-transform: uppercase">all</b> grades';
        reset();
    }
})


tooltipClose.addEventListener('click', () => {
    tooltip.style.display = 'none';
    tooltipText.textContent = "";
})