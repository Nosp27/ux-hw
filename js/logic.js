// let state = '#intro';
let age = "";
let state = '#how-old';

function transit(newState) {
    $(state).hide();
    state = newState;
    $(state).show();
}

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

function fillDayFrame() {
    const monthLen = new Date(2000, new Date().getMonth() + 1, 0).getDate();

    const numPrototype = $('#num');
    const monthDays = $('#monthDays');

    for (let i = 1; i <= monthLen; i++) {
        const clone = numPrototype.clone();
        clone.show();
        clone[0].id = `month-day-${i}`;
        clone[0].innerText = i.toString();
        clone.appendTo(monthDays);
    }
}

function selectAgeDigit(digit) {
    console.log(digit.toString());
    if (digit === -1) { // erase
        if (age.length === 0)
            return;
        age = age.substr(0, age.length - 1);
    } else {
        age += digit.toString();
    }

    if (age.length === 2) {
        transit('#month');
    }

    let msg = "";
    switch (age.length) {
        case 0:
            msg = "How old are you?";
            break;
        case 1:
            msg = `I am ${age}_`;
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