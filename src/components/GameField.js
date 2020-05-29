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

function GameField({ field, dispatch, superman, gameInfo }) {
    const classes = useStyles();

    const cellSize = '80px';

    function toggleFlag(x, y) {
        dispatch(actions.toggleFlag(x, y, !field[x][y].isFlagged));
    }

    function open(x, y) {
        dispatch(actions.openCells(x, y, field));
    }

    const columns = field.map((column, x) => {

        const cells = column.map((cell, y) => {

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
    return {
        field: state.currentGame.field,
        superman: state.currentGame.superman,
        gameInfo: state.currentGame.gameInfo
    }
}

export default connect(mapStateToProps)(GameField)