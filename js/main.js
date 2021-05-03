import {Cell} from './cell.js'

const world = document.getElementById("world");
const context = world.getContext("2d");

//context.canvas.width = window.innerWidth;
//context.canvas.height = window.innerHeight;
//const worldW = window.innerWidth;
//const worldH = window.innerHeight;

const size = 250;

context.canvas.width = size;
context.canvas.height = size;
const worldW = size;
const worldH = size;

const cellWidth = 10;
const cellHeight = 10;

let cells = [];

function init() {
    let currX = 0;
    let currY = 0;

    for (let i = 0; currY < worldH; i++) {
        let cell = new Cell(context, currX, currY, cellWidth, cellHeight);

        // 1st draw
        cell.draw(true);

        cells.push(cell);

        currX += cellWidth;

        if (currX >= worldW) {
            currY += cellHeight;
            currX = 0;
        }
    }
}

function updateWorld() {
    cells.forEach((cell) => cell.draw());
    cells.forEach((cell) => cell.update());
}

init();

// Game Loop
setInterval(updateWorld, 30);

