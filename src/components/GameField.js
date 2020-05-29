import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Cell from './Cell'
import * as actions from '../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));

function GameField({ field, dispatch, superman, gameInfo, viewport }) {
    const classes = useStyles();

    const cellSize = '80px';

    function toggleFlag(x, y) {
        dispatch(actions.toggleFlag(x, y, !field[x][y].isFlagged));
    }

    function open(x, y) {
        dispatch(actions.openCells(x, y, field));
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

                    const key = x + '_' + y;

                    return (
                        <Cell
                            className={classes.cell}
                            key={key}
                            cell={cell}
                            superman={superman}
                            size={cellSize}
                            onFlag={() => { toggleFlag(x, y) }}
                            onOpen={() => { open(x, y) }}
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