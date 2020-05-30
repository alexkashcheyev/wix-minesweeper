import React from 'react';
import { makeStyles, Icon, SvgIcon, Paper, Button } from '@material-ui/core';
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';
import Mine from '../assets/mine.svg';
import config from '../appconfig';
import { gameStage } from '../enums';

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

function Cell({ disabled, revealMines, cell, superman, size, onOpen, onFlag }) {
    const classes = useStyles({ size });

    const resClasses = [
        classes.root,
        cell.isOpened ? classes.opened : classes.closed
    ];

    if (superman && cell.hasMine && !revealMines) resClasses.push(classes.mineDetected);

    let content = ' ';

    if (cell.hasMine && (cell.isOpened || revealMines) ) {
        content = (
            <Icon className={classes.icon}>
                <img src={Mine} height='100%' width='100%' />
            </Icon>
        )
    }

    if (cell.isOpened && !cell.hasMine && cell.minesAround > 0) {
        resClasses.push(classes[cell.minesAround]);
        
        content = (
            <div>{cell.minesAround}</div>
        )
    }

    if (!cell.isOpened && cell.isFlagged) {
        content = (
            <FlagRoundedIcon className={classes.icon} color='secondary' />
        )
    }

    const handleClick = (e) => {
        if (e.shiftKey) {
            onFlag()
        } else if (!cell.isFlagged) {
            onOpen()
        }
    }

    return cell.isOpened ? (
        <Paper
            variant='outlined'
            className={resClasses.join(' ')}
        >

            {content}
        </Paper>
    ) : (
            <Button
                disabled={disabled}
                className={resClasses.join(' ')}
                variant='contained'
                onClick={handleClick}
            >
                { content}
            </Button>
        )
}

export default Cell;