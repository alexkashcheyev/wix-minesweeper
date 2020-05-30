import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import Cell from './Cell'
import { gameStage } from '../enums';
import * as actions from '../redux/actions';
import config from '../appconfig';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderTopColor      : props => props.border.top     ? theme.palette.primary.light : 'transparent',
        borderBottomColor   : props => props.border.bottom  ? theme.palette.primary.light : 'transparent',
        borderLeftColor     : props => props.border.left    ? theme.palette.primary.light : 'transparent',
        borderRightColor    : props => props.border.right   ? theme.palette.primary.light : 'transparent'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));

function buildCell({x, y, key, cell, classes, superman, stage, handleFlag, handleOpen}) {
    return (
        <Cell
            className={classes.cell}
            key={key}
            cell={cell}
            superman={superman}
            size={config.cellSize}
            revealMines={stage === gameStage.LOST}
            disabled={stage === gameStage.LOST || stage === gameStage.WON}
            onFlag={() => handleFlag(x, y)}
            onOpen={() => handleOpen(x, y)}
        />
    )
}

function buildColumns({ field, gameInfo, viewport, classes, superman, stage, handleFlag, handleOpen }) {
    return field
    
        // filter only visible columns
        .filter(
            (column, x) =>
                gameInfo.width <= viewport.width
                || (
                    x >= viewport.offset.x
                    && x < viewport.offset.x + viewport.width
                )
        ).map((column, x) => {

            const cells = column.filter(
                    // filter only visible cells

                    (cell, y) =>
                        gameInfo.height <= viewport.height
                        || (
                            y >= viewport.offset.y
                            && y < viewport.offset.y + viewport.height
                        )
                ).map((cell, y) => {

                    // x and y here are relative to the viewport,
                    // not to the actual field

                    const fieldX = x + viewport.offset.x;
                    const fieldY = y + viewport.offset.y;

                    // a unique key for reactjs
                    const key = fieldX + '_' + fieldY;
                    
                    return buildCell({ x: fieldX, y: fieldY, key, cell, classes, superman, stage, handleFlag, handleOpen })
                });

            return (
                <div className={classes.column} key={x}>
                    {cells}
                </div>
            );
        })
}

function GameField({ field, dispatch, superman, gameInfo, viewport, stage, border }) {
    
    const classes = useStyles({ border });

    function handleFlag(x, y) {
        dispatch(actions.toggleFlag(x, y));
    }

    function handleOpen(x, y) {
        dispatch(actions.openCell(x, y));
    }

    const columns = buildColumns({ field, gameInfo, viewport, classes, superman, stage, handleFlag, handleOpen });

    return (
        <div className={classes.root} >
            {columns}
        </div>
    )
}


function mapStateToProps(state) {
    return state.currentGame;
}

export default connect(mapStateToProps)(GameField)