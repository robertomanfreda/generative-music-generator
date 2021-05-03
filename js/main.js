import {Cell} from './cell.js'

const world = document.getElementById("world");
const context = world.getContext("2d");

const worldWidth = 250;
const worldHeight = 250;
const cellWidth = 10;
const cellHeight = 10;

const targetCells = (worldWidth * worldHeight) / 100;
let actualCells = 0;

context.canvas.width = worldWidth;
context.canvas.height = worldHeight;

const cells = [];

function init() {
    console.log('-----');
    console.log('Requested generation of a world with a total of  ' + targetCells + ' cells.');

    let currX = 0;
    let currY = 0;

    for (let i = 0; actualCells < targetCells; i++) {

        cells.push(new Cell(context, currX, currY, cellWidth, cellHeight));

        currX += cellWidth;
        if (currX >= worldWidth) {
            currY += cellHeight;
            currX = 0;

        }
        actualCells++;

    }

    console.log('Successfully generated the world with a total of ' + actualCells + ' cells.');
    console.log('-----');
    console.log('Cell sizes');
    console.log('Width : ' + cellWidth + 'px');
    console.log('Height: ' +  cellHeight + 'px');
    console.log('-----');
}

function updateWorld() {
    cells.forEach((cell) => cell.draw());
    cells.forEach((cell) => cell.update());
}

init();

// Game Loop
setInterval(updateWorld, 60);

