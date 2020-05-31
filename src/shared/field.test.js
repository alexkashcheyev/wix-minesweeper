import { generateField, validGameInfo, openCellsFrom, countClosedCells } from "./field";
import { countCells, createField } from '../shared/testutil';

describe('generateField', () => {

    it.each
    `
        width   | height    | mines
        ${2 }   | ${10}     | ${1}
        ${0 }   | ${10}     | ${1}
        ${10}   | ${1 }     | ${1}
        ${10}   | ${-1}     | ${1}
        ${3 }   | ${3 }     | ${9}
        ${10}   | ${10}     | ${101}
        ${301}  | ${5}      | ${50}
        ${10}   | ${500}    | ${1}
        ${5 }   | ${5 }     | ${-1}
        ${10}   | ${10}     | ${0}
    `('should return null if gameInfo is invalid', (arg) => {
        const res = generateField(arg);
        expect(res).toBeNull();
    });

    it.each
        `
        width   | height    | mines
        ${ 3 }  | ${ 3 }    | ${ 1 }
        ${ 3 }  | ${ 3 }    | ${ 8 }
        ${ 5 }  | ${ 7 }    | ${ 10}
        ${ 7 }  | ${ 5 }    | ${ 10}
        ${300}  | ${ 3 }    | ${ 1 }
        ${ 3 }  | ${300}    | ${899}
        ${300}  | ${300}    | ${ 1 }
        ${300}  | ${300}    | ${89999}
    `('should return field with expected parameters', (arg) => {
            const field = generateField(arg);
            
            const generatedMines = countCells(field, cell => cell.hasMine);

            expect(field).not.toBeNull();
            expect(field.length).toEqual(arg.width);
            expect(field[0].length).toEqual(arg.height);
            expect(generatedMines).toEqual(arg.mines);
        });

});

describe('openCellsFrom', () => {
    
    it ('should open the mine if starting from mine', () => {
        const field = createField([
            '111',
            '1*1',
            '111'
        ])

        const res = openCellsFrom(1,1, field);

        expect(res[1][1].isOpened).toBeTruthy();
        expect(res).not.toBe(field);
    })

    it ('should not change the field if started from a flagged cell', () => {
        const field = createField([
            'E10',
            '110',
            '00F'
        ]);

        // These functions must create two different fields
        // without mutating the original field,
        // still being its clones
        const mine = openCellsFrom(0,0, field);
        expect(mine).not.toBe(field);
        expect(mine).toEqual(field);

        const noMine = openCellsFrom(2,2, field);
        expect(noMine).not.toBe(field);
        expect(noMine).toEqual(field);
    })

    it ('should open only the selected cell if it has mines around', () => {
        const field = createField([
            '*10',
            '121',
            '01*'
        ]);

        [
            { x: 1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 1, y: 2 }
        ].map(
            ({ x, y }) => openCellsFrom(x, y, field)
        ).forEach(newField => { 
            const openedCells = countCells(newField, cell => cell.isOpened)
            expect(openedCells).toEqual(1);
            expect(newField).not.toBe(field);
        });
        
    })

    it('should recursively open the cell neighbours if the cell is empty', () => {
        const field = createField([
            '*100',
            '2200',
            '*100'
        ]);

        [
            { x: 2, y: 0},
            { x: 3, y: 0 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 2 }
        ].map(
            ({x, y}) => openCellsFrom(x, y, field)
        ).forEach(newField => {
            const openedCells = countCells(newField, cell => cell.isOpened);
            expect(openedCells).toEqual(9);
            expect(newField).not.toBe(field);
        })
    })

    it('should not open cell neigbour if it is flagged', () => {
        const field = createField([
            '*F0',
            '110',
            '000'
        ])

        const res = openCellsFrom(2,2, field);
        expect(res[1][0].isOpened).toBeFalsy();
        expect(res).toMatchSnapshot();
    })

})