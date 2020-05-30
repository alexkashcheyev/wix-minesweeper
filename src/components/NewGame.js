import React from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import * as actions from '../redux/actions';
import config from '../appconfig';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            width: '100%'
        },
        formRow: {
            padding: theme.spacing(2)
        }
    }
})

function NewGame({ width, height, mines, dispatch }) {

    const classes = useStyles();
    
    const { minWidth, maxWidth, minHeight, maxHeight, minMines, minFreeCells } = config;
    const maxMines = width * height - minFreeCells;
    
    const widthError = () => width < minWidth || width > maxWidth;
    const heightError = () => height < minHeight || height > maxHeight;
    const mineError = () => mines < minMines || mines > maxMines;
    const anyError = () => widthError() || heightError() || mineError();

    const changeParameter = (e) => {
        dispatch(actions.changeNewGameParameter(e.target.id, e.target.value))
    }

    const startGame = (e) => {
        dispatch(actions.startGame({ width, height, mines }));

        if (config.autoCloseMenuAfterStart) {
            dispatch(actions.toggleMenu(false));
        }
    }
    
    return (

        <form className={classes.root}>
            <div className={classes.formRow}>

                <TextField 
                    id='width' 
                    label='Width' 
                    type='number' 
                    value={width} 
                    fullWidth={true}
                    inputProps={ {min: minWidth, max: maxWidth} }
                    error={ widthError() }
                    onChange={changeParameter}
                />

            </div>

            <div className={classes.formRow}>

                <TextField 
                    id="height" 
                    label="Height" 
                    type='number' 
                    value={height}
                    fullWidth={true}
                    inputProps={ {min: minHeight, max: maxHeight} }
                    error={ heightError() }
                    onChange={changeParameter}
                />

            </div>

            <div className={classes.formRow}>

                <TextField 
                    id="mines" 
                    label="Mines" 
                    type='number' 
                    value={mines}
                    fullWidth={true}
                    inputProps={ {min: minMines, max: maxMines} }
                    error={ mineError() }
                    onChange={changeParameter}
                />

            </div>

            <div className={classes.formRow} onSubmit={startGame}>

                <Button 
                    variant='contained'
                    color='primary'
                    fullWidth={true}
                    onClick={startGame}
                    disabled={ anyError() }
                    >
                        
                        Start
                        
                </Button>
            </div>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.newGame.gameInfo
    }
}

export default connect(mapStateToProps)(NewGame)
