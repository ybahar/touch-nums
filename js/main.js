'use strict';
var gCellCount = 16;
var gCurrentBoard;
var gNextNum = 1;
var gStartTime;
function createBoard() {
    var nums = [];
    for (var i = 0; i < gCellCount; i++) {
        nums[i] = i + 1;
    }
    shuffle(nums);
    console.log(nums)
    return nums;
}
var gTimerInterval = null;
function cellClicked(elCell) {
    console.log(elCell.innerText, gNextNum)
    if (+elCell.innerText === gNextNum) {
        gNextNum++
        elCell.style.backgroundColor = "red";
        if (gTimerInterval === null) {
            gStartTime = Date.now();
            gTimerInterval = setInterval(runTimer, 1);
        }
    }
}
function renderBoard() {
    var strHtml = '';
    var tableDimensions = Math.sqrt(gCellCount)
    for (var i = 0; i < tableDimensions; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < tableDimensions; j++) {
            var currentNum = gCurrentBoard.pop();
            strHtml += `<td onclick="cellClicked(this)">${currentNum}</td>`
        }
        strHtml += '</tr>'
        document.querySelector('.board').innerHTML = strHtml;
    }
}
function init() {
    gCurrentBoard = createBoard();
    renderBoard();
}

function shuffle(nums) {
    var j;
    var x;
    var i;
    for (i = nums.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = nums[i];
        nums[i] = nums[j];
        nums[j] = x;
    }
    return nums;
}
function runTimer() {
    var currTime = (Date.now() - gStartTime) / 1000
    document.querySelector('.timer').innerText = currTime;
}
function changeDiff(diff){
    gCellCount = diff;
    clearInterval(gTimerInterval)
    init();
}