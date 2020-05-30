import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Cell from './Cell'
import * as actions from '../redux/actions';
import { gameStage } from '../enums';
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

function GameField({ field, dispatch, superman, gameInfo, viewport, stage, border }) {
    
    const classes = useStyles({ border });

    function toggleFlag(x, y) {
        dispatch(actions.toggleFlag(x, y));
    }

    function open(x, y) {
        dispatch(actions.openCell(x, y));
    }

    const columns = field

        // filter only visible columns

        .filter(
            (column, x) =>
                gameInfo.width <= viewport.width
                || (
                    x >= viewport.offset.x
                    && x < viewport.offset.x + viewport.width
                )
        ).map((column, x) => {

            const cells = column.
                filter(
                    (cell, y) =>
                        gameInfo.height <= viewport.height
                        || (
                            y >= viewport.offset.y
                            && y < viewport.offset.y + viewport.height
                        )
                ).map((cell, y) => {

                    const realX = x + viewport.offset.x;
                    const realY = y + viewport.offset.y;

                    const key = realX + '_' + realY;

                    return (
                        <Cell
                            className={classes.cell}
                            key={key}
                            cell={cell}
                            superman={ superman }
                            size={config.cellSize}
                            revealMines={ stage === gameStage.LOST }
                            disabled={ stage === gameStage.LOST || stage === gameStage.WON }
                            onFlag={() => toggleFlag(realX, realY) }
                            onOpen={() => open(realX, realY)}
                        />
                    )
                });

            return (
                <div className={classes.column} key={x}>
                    {cells}
                </div>
            );
        })

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