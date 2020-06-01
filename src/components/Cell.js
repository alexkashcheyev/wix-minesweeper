import React from 'react';
import { makeStyles, Icon, Paper, Button } from '@material-ui/core';
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';

import Mine from '../assets/mine.svg';
import config from '../appconfig';

const useStyles = makeStyles((theme) => ({
    root: {
        height: props => props.size,
        width: props => props.size,

        boxSizing: 'border-box',
        margin: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '0',
        fontSize: config.cellFontSize,
        padding: '0'
    },
    mineDetected: {
        background: theme.palette.primary.light,
    },
    opened: {

    },
    closed: {
        border: '1px solid transparent'
    },
    icon: {
        height: config.cellSize,
        width: config.cellSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    //classes for numbers

    1: {
        color: 'blue',
    },
    2: {
        color: 'green',
    },
    3: {
        color: 'red',
    },
    4: {
        color: 'purple',
    },
    5: {
        color: 'maroon'
    },
    6: {
        color: 'turquoise'
    },
    7: {
        color: 'black'
    },
    8: {
        color: 'gray'
    }

}));


function Cell({ 
    disabled, 
    revealMine, 
    cell, 
    superman, 
    size, 
    showFlagOnMine, 
    onOpen, 
    onFlag 
}) {
    const classes = useStyles({ size });

    // all the classes to apply to the cell
    // regarding on its state
    const resClasses = [
        classes.root,
        cell.isOpened ? classes.opened : classes.closed
    ];

    // add a background to cell if mine is
    // detected in superman mode
    if (superman && cell.hasMine && !revealMine) resClasses.push(classes.mineDetected);

    // add a class depeneding on mines-around
    // to color the number as in classic minesweeper
    if (cell.isOpened && !cell.hasMine && cell.minesAround > 0) resClasses.push(classes[cell.minesAround]);

    // cell content may be nothing, a mine image or 
    // a number of mines around, or flag icon
    const content = calculateContent(cell, classes, revealMine, showFlagOnMine);

    // if the cell is opened, show a paper element,
    // otherwise a button
    return cell.isOpened
        ? createOpenCell(resClasses, content)
        : createClosedCell({ resClasses, content, disabled, flagged: cell.isFlagged, onOpen, onFlag })
}

function calculateContent(cell, classes, revealMines, showFlagOnMine) {

    // show mine icon if the cell has one and it is either open 
    // or the game has ended and all mines are revealed

    if (cell.hasMine && (cell.isOpened || revealMines)) {
        return (
            <Icon className={classes.icon}>
                <img src='https://alexkashcheyev.github.io/wix-minesweeper/static/media/mine.6561ee48.svg' height='100%' width='100%' alt='mine' />
            </Icon>
        )
    }

    // if a cell has no mine inside but at least one mine around,
    // show the number

    if (cell.isOpened && !cell.hasMine && cell.minesAround > 0) {
        return cell.minesAround
    }

    // if a cell is closed and flagged, show flag icon
    // also if the cell has a mine and the game is won

    if (
        (!cell.isOpened && cell.isFlagged)
        ||
        (cell.hasMine && showFlagOnMine)
    ) {
        return (
            <FlagRoundedIcon className={classes.icon} color='secondary' />
        )
    }


    // in all other cases, show nothing
    return ' ';
}

function createOpenCell(resClasses, content) {

    return (
        <Paper
            variant='outlined'
            className={resClasses.join(' ')}
        >

            {content}
        </Paper>
    );
    
}

function createClosedCell({ resClasses, content, disabled, flagged, onOpen, onFlag }) {

    const handleClick = (e) => {
        if (e.shiftKey) {
            onFlag()
        } else if (!flagged) {
            onOpen()
        }
    }
    
    return (
        <Button
            disabled={disabled}
            className={resClasses.join(' ')}
            variant='contained'
            onClick={handleClick}
        >
            {content}
        </Button>
    )
}


export default Cell;