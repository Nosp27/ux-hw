let now_month = 1;
let now_year = 2000;
let now_day = 1;

let startTime = 0;

const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
];

$(function () {
    startTime = Date.now();
    spawnDays(now_year, now_month);
    spawnYears();
});

function spawnDays(_year, _month) {
    now_day = 1;

    $('#year-and-month-content').text(`${monthNames[_month - 1]} ${_year.toString()}`);
    const daysInMonth = new Date(_year, _month, 0).getDate();
    console.log(`days ${daysInMonth}`);
    const emptiesCount = new Date(_year, _month, 1).getDay();

    const daysContainer = $('#month-days');
    const numRow = $('#num-row');
    const cellProto = $('#cell');
    const num = $('#num');
    let row = 0;

    for (let i = 1; i > 0; i++) {
        const el = $(`#row-${i}`);
        if (el[0] === undefined)
            break;
        el.remove();
    }

    for (let i = 0; i < 35; i++) {
        if (i % 7 === 0) {
            row++;
            let clone;
            clone = numRow.clone();
            clone.appendTo(daysContainer);
            clone[0].hidden = false;
            clone[0].id = `row-${row}`;
        }

        let cell;
        cell = cellProto.clone();
        cell.appendTo($(`#row-${row}`));
        cell[0].hidden = false;
        cell[0].id = `cell-${i + 1}`;
        cell.empty();
    }

    let day = 1;
    for (let i = 1; day <= daysInMonth; i++) {
        if (i < emptiesCount)
            continue;

        const numClone = num.clone();
        numClone[0].hidden = false;
        numClone.text(day.toString());
        numClone[0].id = `num-${day}`;
        numClone.appendTo($(`#cell-${i}`));
        const dayX=day;
        numClone.click(function () {
            dayClick(dayX)
        });
        day++;
    }

    const currDay = $(`num-${now_day}`);
    if (currDay[0] !== undefined) {
        currDay[0].animate({'color': 'dodgerblue', 'font-weight': 'bolder'}, 300);
    }
}

function spawnYears() {
    const yearsPopup = $('#years-popup');
    const yearTemplate = $('#year-template');

    for (let y = 1900; y < new Date().getFullYear(); y++) {
        const yearClone = yearTemplate.clone();
        yearClone.text(y.toString());
        yearClone[0].hidden = false;
        yearClone.click(function () {
            selectYear(y);
        });
        yearClone.appendTo(yearsPopup);
    }
}

function selectYear(y) {
    now_year = y;
    spawnDays(now_year, now_month);
    $('#years-popup').hide();
}

function showYears() {
    const years = $('#years-popup');
    years.show();
    years.scrollTop((now_year - 1900) * 26);
}

function prevMonth() {
    now_month -= 1;
    if (now_month === 0) {
        now_month = 12;
        now_year -= 1;
    }
    spawnDays(now_year, now_month);
}

function nextMonth() {
    now_month += 1;
    if (now_month === 13) {
        now_month = 1;
        now_year += 1;
    }
    spawnDays(now_year, now_month);
}

function dayClick(day) {
    console.log(`day ${day}`);
    let currDay = $(`#num-${now_day}`);
    if (currDay[0] !== undefined) {
        console.log('unainm');
        currDay.css('color', 'black');
        currDay.css('font-weight', 'normal', 300);
    }
    now_day = day;
    currDay = $(`#num-${now_day}`);
    if (currDay[0] !== undefined) {
        console.log('anim');
        currDay.css('color', 'dodgerblue');
        currDay.css('font-weight', 'bolder', 300);
    }
    $('#select').show();
}

function finalize() {
    $('.datepicker-container').hide();
    $('#final').show();
    $('#final-res').text(`${now_day} ${monthNames[now_month-1]} ${now_year}`);
    $(`#final-timing`).text(`${(Date.now() - startTime) / 1000}s`);
}
