import React from 'react';
import TestRenderer from 'react-test-renderer';

import Cell from './Cell'

const defaultProps = {
    disabled            : false,
    revealMine          : false,
    cell: {
        isOpened        : false,
        hasMine         : false,
        isFlagged       : false,
        minesAround     : 0
    },
    superman            : false,
    size                : '2rem',
    showFlagOnMine      : false,
    onOpen              : jest.fn(),
    onFlag              : jest.fn()
};

describe('Cell component', () => {

    it('Should create', () => {
        const cellComponent = createCell(defaultProps);
        expect(cellComponent).toBeTruthy();
    });

    it('should show mine icon if there is a mine and the cell is opened', () => {
        const props = {
            ...defaultProps,
            cell: {
                ...defaultProps.cell,
                hasMine: true,
                isOpened: true
            }
        }
        const cellComponent = createCell(props);
        expect(cellComponent).toMatchSnapshot();
    });

    it('should show mine icon if there is a mine and the mines are revealed', () => {
        const props = {
            ...defaultProps,
            revealMine: true,
            cell: {
                ...defaultProps.cell,
                hasMine: true,
            }
        }
        const cellComponent = createCell(props);
        expect(cellComponent).toMatchSnapshot();
    });

    it.each`
        minesAround
        ${0}
        ${1}
        ${2}
        ${3}
        ${4}
        ${5}
        ${6}
        ${7}
        ${8}
    `('should show mine number if there are mines around and the cell is opened', ({minesAround}) => {
        const props = {
            ...defaultProps,
            cell: {
                ...defaultProps.cell,
                isOpened: true,
                minesAround
            }
        }

        const cell = createCell(props);
        expect(cell).toMatchSnapshot();
    });

    it('should show flag on flagged closed cell', () => {
        const props = {
            ...defaultProps,
            cell: {
                ...defaultProps.cell,
                isFlagged: true
            }
        }

        const cell = createCell(props);
        expect(cell).toMatchSnapshot();
    });

    it ('should show flag on mined closed cell if it has mine and flags are shown on all mines', () => {
        const props = {
            ...defaultProps,
            showFlagOnMine: true,
            cell: {
                ...defaultProps.cell,
                hasMine: true
            }
        }

        const cell = createCell(props);
        expect(cell).toMatchSnapshot();
    });

    it('should have button as root element if the cell is closed', () => {
        const cell = createCell(defaultProps);
        expect(cell.type).toEqual('button');
        expect(cell).toMatchSnapshot();
    });

    it('should not have button as root element if the cell is open', () => {
        const cell = createCell({
            ...defaultProps,
            cell: {
                ...defaultProps.cell,
                isOpened: true
            }
        });

        expect(cell.type).not.toEqual('button');
        expect(cell).toMatchSnapshot();
    });

});

function createCell(props) {
    const tr = TestRenderer.create(<Cell {...props} />);
    return tr.toJSON();
}
