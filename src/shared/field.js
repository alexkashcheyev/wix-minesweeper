import config from '../appconfig';
import { clone } from 'lodash';


export function generateField(gameInfo) {

    // data validation
    if (!validGameInfo(gameInfo)) {
        return null;
    }

    // generate mines at random locations
    const mineCoordinates = getRandomCells(gameInfo, gameInfo.mines);

    // build an array reflecting the field
    const field = buildField(gameInfo, mineCoordinates);

    return field;
}


export function openCellsFrom(x, y, field) {

    const newField = clone(field);

    // using BFS to open cells surrounding an empty cell
    const queue = [{ x, y }];

    let maxQueueLen = 0;

    while (queue.length > 0) {
        //console.log(queue.length, 'cells in queue');
        maxQueueLen = Math.max(maxQueueLen, queue.length);

        // take first cell from the queue
        const c = queue.shift();

        // ignore already opened cells and flagged cells
        if (!newField[c.x][c.y].isOpened && !newField[c.x][c.y].isFlagged) {

            // open the current cell
            newField[c.x][c.y].isOpened = true;

            // add its neighbours to the queue if there are
            // no mines around
            if (
                newField[c.x][c.y].minesAround === 0
            ) {
                const neighbors = getNeighborsCoordinates(
                    c.x, c.y,
                    newField.length,
                    newField[c.x].length
                ).filter(
                    // This filter duplicates the if, and removing it will not 
                    // change the functionality, but it reduces the maximum reached 
                    // queue length from 4773 to 2388 for a 300x300 field with 1 mine.
                    // The "if" is still needed, because the cells still waiting in the 
                    // queue, can be already opened.
                    n => !newField[n.x][n.y].isOpened
                        && !newField[c.x][c.y].isFlagged
                );

                queue.push(...neighbors);
            }
        }

    }

    console.log('max queue length was', maxQueueLen)

    return newField;
}

export function countClosedCells(field) {

    return field.reduce(
        (fieldSum, column) => {
            const fieldSumAddition = column.reduce(
                (colSum, cell) => {
                    const addition = (cell.isOpened ? 0 : 1);
                    return colSum + addition;
                },
                0
            )
            return fieldSum + fieldSumAddition;
        },
        0
    )

}

function validGameInfo({ width, height, mines }) {

    const hasErrors = (width < config.minWidth)
        || (width > config.maxWidth)
        || (height < config.minHeight)
        || (height > config.maxHeight)
        || (mines < config.minMines)
        || (mines > (width * height - config.minFreeCells));

    return !hasErrors;

}

function getRandomCells({ height, width}, amount) {
   
    const res = [];
    const allCells = [];
    
    // generate an aray of all possible coordinates of given field
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            allCells.push({x,y});
        }
    }

    // get requested amount of coordinates by random index
    for (let i = 0; i < amount; i++) {
        const index = Math.floor(Math.random() * allCells.length);

        // removing the element at random index
        // the result of splice is an array
        const cell = allCells.splice(index, 1);
        res.push(...cell)
    }

    return res;
}

function getNeighborsCoordinates(x, y, width, height) {

    return [
        { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
        { x: -1, y: 0 }, { x: 1, y: 0 },
        { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
    ].map(
        delta => ({ x: x + delta.x, y: y + delta.y })
    ).filter(
        neighbor => neighbor.x >= 0 && neighbor.x < width
            && neighbor.y >= 0 && neighbor.y < height
    );

}

function buildField({ width, height }, mineCoordinates) {
    const field = [];

    // create a 2d array filled with empty cells
    for (let x = 0; x < width; x++) {
        field[x] = [];
        for (let y = 0; y < height; y++) {
            field[x][y] = {
                isFlagged: false,
                isOpened: false,
                hasMine: false,
                minesAround: null
            }
        }
    }

    // plant the mines
    for (let m of mineCoordinates) {
        field[m.x][m.y].hasMine = true;
    }

    // calculate the numbers of mines around each cell
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            
            // if the cell has mine inside, don't calculate
            if (!field[x][y].hasMine) {

                const minesAround = getNeighborsCoordinates(x, y, width, height)
                    .filter(n => field[n.x][n.y].hasMine)
                    .length;

                field[x][y].minesAround = minesAround;
            }
        }
    }

    return field;
}
