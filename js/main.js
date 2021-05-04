import {Cell} from './cell.js'

// _User settings START
const worldWidth = 250;
const worldHeight = 250;
const cellWidth = 10;
const cellHeight = 10;
const isGridVisible = true;
// _User settings END

const world = document.getElementById("world");
const context = world.getContext("2d");

const targetCells = (worldWidth * worldHeight) / 100;

const minOffset = cellWidth / 2;
const maxOffset = cellWidth + minOffset;

context.canvas.width = worldWidth;
context.canvas.height = worldHeight;


let iterationCounter = 0;
let actualCells = 0;
let cells = [];

function init() {
    console.log('Started initialization process..')

    console.log('----- CELLS -----');
    console.log('Requested generation of a world with a total of  ' + targetCells + ' cells.');

    let currX = 0;
    let currY = 0;
    let audioIndex = 0;

    for (let i = 0; actualCells < targetCells; i++) {
        if (audioIndex === 16) audioIndex = 1;
        else audioIndex++;

        cells.push(new Cell(audioIndex, context, currX, currY, cellWidth, cellHeight, minOffset, maxOffset));

        if (isGridVisible) {
            context.beginPath();
            context.rect(currX, currY, cellWidth, cellHeight);
            context.stroke();
        }

        currX += cellWidth;

        if (currX >= worldWidth) {
            currY += cellHeight;
            currX = 0;
        }

        actualCells++;
    }

    console.log('Successfully generated the world with a total of ' + actualCells + ' cells.');

    console.log('\n----- WORLD SIZE -----');
    console.log('Width : ' + worldWidth + 'px');
    console.log('Height: ' + worldHeight + 'px');

    console.log('\n----- CELLS SIZE -----');
    console.log('Width : ' + cellWidth + 'px');
    console.log('Height: ' + cellHeight + 'px');
    console.log('-----');
    console.log('World generation completed.')
}

function updateWorld() {
    cells.forEach((cell) => cell.draw(isGridVisible));
    cells.forEach((cell) => cell.update());

    iterationCounter++;
    console.log('Iteration: ' + iterationCounter);
}

init();

// Game Loop
setInterval(updateWorld, 1000);

