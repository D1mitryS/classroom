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

const getTranscriptedGrades = grades => {
    if (grades.length !== 0) {
        const mapedGrades = grades.map(grade => {
            if (grade === 0) return 'Zero';
            else if (grade === 1) return 'One';
            else if (grade === 2) return 'Two';
            else if (grade === 3) return 'Three';
            else if (grade === 4) return 'Four';
            else if (grade === 5) return 'Five';
            else if (grade === 6) return 'Six';
            else if (grade === 7) return 'Seven';
            else if (grade === 8) return 'Eight';
            else if (grade === 9) return 'Nine';
            else if (grade === 10) return 'Ten';
            else if (grade === 11) return 'Eleven';
            else if (grade === 12) return 'Twelve';
            else if (grade === 13) return 'Thirteen';
            else if (grade === 14) return 'Fourteen';
            else if (grade === 15) return 'Fifteen';
            else if (grade === 16) return 'Sixteen';
            else if (grade === 17) return 'Seventeen';
            else if (grade === 18) return 'Eighteen';
            else if (grade === 19) return 'Nineteen';
            else if (grade === 20) return 'Twenty';
            else if (grade === 21) return 'Twenty-one';
            else if (grade === 22) return 'Twenty-two';
            else if (grade === 23) return 'Twenty-three';
            else if (grade === 24) return 'Twenty-four';
            else if (grade === 25) return 'Twenty-five';
            else if (grade === 26) return 'Twenty-six';
            else if (grade === 27) return 'Twenty-seven';
            else if (grade === 28) return 'Twenty-eight';
            else if (grade === 29) return 'Twenty-nine';
            else if (grade === 30) return 'Thirty';
            else if (grade === 31) return 'Thirty-one';
            else if (grade === 32) return 'Thirty-two';
            else if (grade === 33) return 'Thirty-three';
            else if (grade === 34) return 'Thirty-four';
            else if (grade === 35) return 'Thirty-five';
            else if (grade === 36) return 'Thirty-six';
            else if (grade === 37) return 'Thirty-seven';
            else if (grade === 38) return 'Thirty-eight';
            else if (grade === 39) return 'Thirty-nine';
            else if (grade === 40) return 'Fourty';
            else if (grade === 41) return 'Fourty-one';
            else if (grade === 42) return 'Fourty-two';
            else if (grade === 43) return 'Fourty-three';
            else if (grade === 44) return 'Fourty-four';
            else if (grade === 45) return 'Fourty-five';
            else if (grade === 46) return 'Fourty-six';
            else if (grade === 47) return 'Fourty-seven';
            else if (grade === 48) return 'Fourty-eight';
            else if (grade === 49) return 'Fourty-nine';
            else if (grade === 50) return 'Fifty';
            else if (grade === 51) return 'Fifty-one';
            else if (grade === 52) return 'Fifty-two';
            else if (grade === 53) return 'Fifty-three';
            else if (grade === 54) return 'Fifty-four';
            else if (grade === 55) return 'Fifty-five';
            else if (grade === 56) return 'Fifty-six';
            else if (grade === 57) return 'Fifty-seven';
            else if (grade === 58) return 'Fifty-eight';
            else if (grade === 59) return 'Fifty-nine';
            else if (grade === 60) return 'Sixty';
            else if (grade === 61) return 'Sixty-one';
            else if (grade === 62) return 'Sixty-two';
            else if (grade === 63) return 'Sixty-three';
            else if (grade === 64) return 'Sixty-four';
            else if (grade === 65) return 'Sixty-five';
            else if (grade === 66) return 'Sixty-six';
            else if (grade === 67) return 'Sixty-seven';
            else if (grade === 68) return 'Sixty-eight';
            else if (grade === 69) return 'Sixty-nine';
            else if (grade === 70) return 'Seventy';
            else if (grade === 71) return 'Seventy-one';
            else if (grade === 72) return 'Seventy-two';
            else if (grade === 73) return 'Seventy-three';
            else if (grade === 74) return 'Seventy-four';
            else if (grade === 75) return 'Seventy-five';
            else if (grade === 76) return 'Seventy-six';
            else if (grade === 77) return 'Seventy-seven';
            else if (grade === 78) return 'Seventy-eight';
            else if (grade === 79) return 'Seventy-nine';
            else if (grade === 80) return 'Eighty';
            else if (grade === 81) return 'Eighty-one';
            else if (grade === 82) return 'Eighty-two';
            else if (grade === 83) return 'Eighty-three';
            else if (grade === 84) return 'Eighty-four';
            else if (grade === 85) return 'Eighty-five';
            else if (grade === 86) return 'Eighty-six';
            else if (grade === 87) return 'Eighty-seven';
            else if (grade === 88) return 'Eighty-eight';
            else if (grade === 89) return 'Eighty-nine';
            else if (grade === 90) return 'Ninety';
            else if (grade === 91) return 'Ninety-one';
            else if (grade === 92) return 'Ninety-two';
            else if (grade === 93) return 'Ninety-three';
            else if (grade === 94) return 'Ninety-four';
            else if (grade === 95) return 'Ninety-five';
            else if (grade === 96) return 'Ninety-six';
            else if (grade === 97) return 'Ninety-seven';
            else if (grade === 98) return 'Ninety-eight';
            else if (grade === 99) return 'Ninety-nine';
            else if (grade === 100) return 'Hundred';
        });
        return mapedGrades.join(', ');
    }
    return "No grades";
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
    }
    return "No grades";
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