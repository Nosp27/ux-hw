// let state = '#intro';
let age = "";
let month = "";
let day = "";
let state = '#intro';
let startTime = 0;

const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
];

function transit(newState) {
    $(state).hide();
    state = newState;
    $(state).fadeIn();
}

$(function () {
    startTime = Date.now();
    fillAgeFrame();
    fillMonthFrame();
    fillDayFrame();
});

function fillAgeFrame () {
    const numbers = $("#numbers");
    const num = $("#num");
    for (let i = 1; i <= 9; i++) {
        const cloneWrapped = num.clone();
        const clone = cloneWrapped[0];
        clone.id = `num-${i}`;
        clone.innerText = i.toString();
        clone.hidden = false;
        cloneWrapped.click(function () {
            selectAgeDigit(i)
        });
        cloneWrapped.appendTo(numbers);
    }

    let cloneWrapped = num.clone();
    let clone = cloneWrapped[0];
    clone.id = `empty-num`;
    clone.innerText = '_';
    clone.hidden = false;
    clone.style['color'] = '#FFFFFF';
    cloneWrapped.click(() => {
    });
    cloneWrapped.appendTo(numbers);

    cloneWrapped = num.clone();
    clone = cloneWrapped[0];
    clone.id = `num-0`;
    clone.innerText = '0';
    clone.hidden = false;
    cloneWrapped.click(() => selectAgeDigit(0));
    cloneWrapped.appendTo(numbers);


    const eraseCloneWrapped = $('#delete-btn').clone();
    const eraseClone = eraseCloneWrapped[0];
    eraseClone.hidden = false;
    eraseCloneWrapped.click(() => selectAgeDigit(-1));
    eraseCloneWrapped.appendTo(numbers);
}

function fillMonthFrame(){
    const container = $('#months-container');
    for (let idx in monthNames) {
        const m = monthNames[idx];
        const clone = $('#m-num').clone();
        clone.appendTo(container);
        clone.show();
        clone[0].id=`m-${m}`;
        clone[0].innerHTML = m;
        clone.click(function () {
            selectMonth(m);
        });
    }
}

function fillDayFrame() {
    const monthLen = new Date(2000, new Date().getMonth() + 1, 0).getDate();

    const numPrototype = $('#d-num');
    const monthDays = $('#days-container');

    for (let i = 1; i <= monthLen; i++) {
        const clone = numPrototype.clone();
        clone[0].hidden = false;
        clone[0].id = `month-day-${i}`;
        if (i < 10) {
            clone[0].innerHTML = `<span style="color: transparent">0</span>${i}`
        }
        else
            clone[0].innerText = i.toString();
        clone.appendTo(monthDays);
        clone.click(function () {
            selectDay(i);
        })
    }
}

function selectAgeDigit(digit) {
    console.log(digit.toString());
    if (digit === -1) { // erase
        if (age.length === 0)
            return;
        age = age.substr(0, age.length - 1);
    } else if (digit === -100) { // skip
        transit('#months');
    } else {
        age += digit.toString();
    }

    if (age.length === 2) {
        transit('#months');
    }

    let msg = "";
    switch (age.length) {
        case 0:
            msg = "How old are you?";
            $('#done-age').hide();
            break;
        case 1:
            msg = `I am ${age}_`;
            $('#done-age').show();
            break;
        case 2:
            msg = `I am ${age}`;
            break;
        default:
            msg = `Error`;
            break;
    }
    $('#age')[0].innerText = msg;
}

function selectMonth(m) {
    month = m;
    transit('#days');
}

function selectDay(d) {
    day = d;
    prepareFinal();
    transit('#final');
}

function prepareFinal() {
    const a=parseInt(age);
    const y = new Date();
    y.setFullYear(new Date().getFullYear() - a);
    const year = y.getFullYear();
    $('#final-result').text(`${day} ${month} ${year}`);
    const timeSpent = (Date.now() - startTime) / 1000;
    $('.timing').show().text(`Your time is: ${timeSpent}s`);
    console.log(timeSpent);
    $('#again').show();
}