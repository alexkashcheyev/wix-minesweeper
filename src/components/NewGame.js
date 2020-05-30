import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
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
    
    // functions used to validate the new games parameters
    
    const validWidth    = () => width   >= minWidth   && width   <= maxWidth  ;
    const validHeight   = () => height  >= minHeight  && height  <= maxHeight ;
    const validMines    = () => mines   >=  minMines  && mines   <= maxMines  ;
    
    const anyError = () => !validWidth() || !validHeight() || !validMines();

    const changeParameter = (e) => {
        if (!!e.target.id && !!e.target.value) {
            dispatch(actions.setNewGameParameter(e.target.id, parseInt(e.target.value)))
        }
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
                    error={ !validWidth() }
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
                    error={ !validHeight() }
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
                    error={ !validMines() }
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
