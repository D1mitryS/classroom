const form = document.querySelector('#form');
const highLimitInput = document.querySelector('#high-num');
const lowLimitInput = document.querySelector('#low-num');
const gradeInput = document.querySelector('#input');
const resetBtn = document.querySelector('#reset');
const grades = [];
let lowLimit = 0;


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
    return (grades.length !== 0) ? getSumOfGrades(grades) / getGradesTotal(grades) : 'No grades';
}

const getPassingGrades = (grades, lowLimit) => {
    if (grades.length !== 0) {
        const filteredGrades = grades.filter(grade => {
            return grade >= lowLimit;
        });
        return (filteredGrades.length !== 0) ? filteredGrades : "No Passing grades";
    }
    return 'No grades';
}

const getFailingGrades = (grades, lowLimit) => {
    if (grades.length !== 0) {
        const filteredGrades = grades.filter(grade => {
            return grade < lowLimit;
        });
        return (filteredGrades.length !== 0) ? filteredGrades : "No failing grades";
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
        return passingGrades.length;
    }
    return "No grades";
}

const getFailingGradesTotal = (grades, lowLimit) => {
    if (grades.length !== 0) {
        const failingGrades = grades.filter(grade => {
            return grade < lowLimit;
        })
        return failingGrades.length;
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


    const highLimit = Number.parseInt(highLimitInput.value, 10);
    lowLimit = Number.parseInt(lowLimitInput.value, 10);

    if (highLimit > lowLimit) {
        const newGrade = Number.parseInt(gradeInput.value, 10);

        if (newGrade <= highLimit) {
            grades.push(newGrade);
            gradeInput.value = "";
            render(grades, lowLimit);
        } else {
            gradeInput.value = "";
        }
    } else {
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
})