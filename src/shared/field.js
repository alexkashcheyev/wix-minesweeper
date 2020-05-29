import config from '../appconfig';
import { clone } from 'lodash';

function validGameInfo({ width, height, mines }) {

    const hasErrors = (width < config.minWidth)
        || (width > config.maxWidth)
        || (height < config.minHeight)
        || (height > config.maxHeight)
        || (mines < config.minMines)
        || (mines > (width * height - config.minFreeCells));

    return !hasErrors;
}

function generateRandomMines({ height, width, mines }) {
    // hangs if height=300, width=300 and mines=8999
    // maybe generate empty cells if mines > (height * width / 2)

    const res = [];

    while (res.length < mines) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        if (
            !res.find(
                el => el.x === x
                    && el.y === y
            )
        ) {
            res.push({ x, y });
        }
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

    for (let m of mineCoordinates) {
        field[m.x][m.y].hasMine = true;
    }

    console.log('calculating numbers');

    for (let x = 0; x < width; x++) {

        for (let y = 0; y < height; y++) {

            if (!field[x][y].hasMine) {

                const minesAround = getNeighborsCoordinates(x, y, width, height)
                    .filter(n => field[n.x][n.y].hasMine)
                    .length;

                field[x][y].minesAround = minesAround;

            }

        }
    }

    console.log('ready');

    return field;
}

export function generateField(gameInfo) {

    // data validation
    if (!validGameInfo(gameInfo)) {
        return null;
    }
    // generate mines at random locations
    const mineCoordinates = generateRandomMines(gameInfo);

    // build an array reflecting the field
    // (It could take by about 2 Mb of RAM)
    const field = buildField(gameInfo, mineCoordinates);

    return field;
}


export function openCellsFrom(x, y, field) {
    const newField = clone(field);

    const queue = [{ x, y }];

    let i = 0;

    while (queue.length > 0) {
        const c = queue.shift();

        if (!newField[c.x][c.y].isOpened) {

            newField[c.x][c.y].isOpened = true;
            if (
                newField[c.x][c.y].minesAround === 0
            ) {
                const neighbors = getNeighborsCoordinates(
                    c.x, c.y,
                    newField.length,
                    newField[c.x].length
                ).filter(
                    n => !newField[n.x][n.y].isOpened
                );

                queue.push(...neighbors);
            }
        }

    }

    return newField;
}