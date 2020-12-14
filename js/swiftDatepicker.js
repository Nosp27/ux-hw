$(function () {
    spawnDays();
});

function spawnDays() {
    console.log('asa');
    const now = new Date(Date.now());
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const emptiesCount = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

    const daysContainer = $('#month-days');
    const numRow = $('#num-row');
    const cellProto = $('#cell');
    const num = $('#num');
    let row = 0;
    for (let i = 0; i < daysInMonth; i++) {
        if (i % 7 === 0) {
            row++;
            const clone = numRow.clone();
            console.log(clone);
            clone.show();
            clone.appendTo(daysContainer);
            clone[0].id = `row-${row}`;
        }

        const cell = cellProto.clone();
        cell.show();
        cell.appendTo($(`#row-${row}`));
        cell[0].id = `cell-${i}`;
    }

    for (let i = 0; i < daysInMonth; i++) {
        if (i < emptiesCount)
            continue;

        const numClone = num.clone();
        numClone.show();
        numClone.text(i.toString());
        numClone[0].id = `num-${i}`;
        numClone.appendTo($(`#cell-${i}`));
        numClone.click(function() {
            dayClick(i)
        });
    }
}

function dayClick(day) {

}
