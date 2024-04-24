
let level = 0;
let totalCells = 0;
let randomMinePosition = [];
let checkAttempts = 0;

function setLevel(chosenLevel) {
    const gridContainer = document.getElementById('minesGrid');
    const startButton = document.getElementById('start');
    const attempts = document.getElementById('attempts');
    startStopTimer(false);

    gridContainer.innerHTML = ""
    switch (chosenLevel) {
        case '1':
            startButton.disabled = false;
            level = 1;
            totalCells = 25;
            checkAttempts = 5;
            attempts.textContent = checkAttempts;
            return createGrid(5, 5);
        case '2':
            startButton.disabled = false;
            level = 2
            totalCells = 100;
            checkAttempts = 10;
            attempts.textContent = checkAttempts;
            return createGrid(10, 10);
        case '3':
            startButton.disabled = false;
            level = 3
            totalCells = 225;
            checkAttempts = 15;
            attempts.textContent = checkAttempts;
            return createGrid(15, 15);
        default:
            startButton.disabled = true;
            level = 3;
            totalCells = 0;
            checkAttempts = 0;
            attempts.textContent = checkAttempts;
            break;
    }
}

function createGrid(rows, columns) {
    const gridContainer = document.getElementById('minesGrid');
    const cells = rows * columns;
    gridContainer.style.width = (rows * 30) + 'px';
    gridContainer.style.height = (columns * 30) + 'px';

    for (let i = 0; i < cells; i++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.id = i + 1;
        cell.onclick = pushed;
        cell.oncontextmenu = checkBomb;
        cell.disabled = true;

        cell.textContent = i + 1;
        gridContainer.appendChild(cell);
    }
}

function generateMine() {
    const totalBombes = (totalCells * 40) / 100;

    const randomMinePosition = [];
    for (let i = 0; i < totalBombes; i++) {
        const randomNumber = Math.floor(Math.random() * (0 - totalCells + 1)) + totalCells;
        randomMinePosition.push(randomNumber);
    }
    return randomMinePosition;    
}

function startStopTimer(start) {
    const timerElement = document.getElementById("timer");
    let maxTime = 121;
        const chrono = window.setInterval(() => {
            maxTime--;
            timerElement.textContent = maxTime + '/120 seconds';
            if (maxTime === 0 || !start) {
                window.clearTimeout(chrono);
            }
            if (maxTime <= 15) {
                timerElement.style.background = 'red';
            }
        }, 1000);
}

function initGrid() {
    const gridContainer = document.getElementById('minesGrid');
    const cells = gridContainer.children;

    for (let i = 0; i < cells.length; i++) {
        const childElement = cells[i];
        childElement.disabled = false;
    }
}

function checkBomb() {
    console.log('pour check les bomb', randomMinePosition, quadriDirectionList)

    // bombCountAround
    const id = parseInt(this.id);
    let quadriDirectionList = [];
    let countBombs = 0;
    if (checkAttempts !== 0 ) {
        checkAttempts--;
        quadriDirectionList.push(Math.abs(id - Math.sqrt(totalCells)), id + Math.sqrt(totalCells), id - 1, id + 1) // c'est l'équivalent de la dimension !!
        quadriDirectionList.map((position) => {
            if (randomMinePosition.includes(position)) {
                countBombs++
            }
        })
    }
    const bombCount = document.getElementById('bombCount');
    const attempts = document.getElementById('attempts');
    bombCount.textContent = countBombs;
    attempts.textContent = checkAttempts;
}

function isBomb(id) {
    return randomMinePosition.includes(parseInt(id));
}
/**
 * action fonction
 */

function start() {
    initGrid()
    randomMinePosition = generateMine();
    startStopTimer(true);
}

function pushed() {
    const pushedCell = document.getElementById(this.id);
    pushedCell.disabled = true
    const boom = isBomb(this.id);
    if (boom) {
        alert('you loose');
    }
}


