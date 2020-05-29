import React, { useEffect } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import GameField from './GameField';
import Minimap from './Minimap'
import { connect } from 'react-redux';
import { gameStage, actionType } from '../enums';
import * as actions from '../redux/actions';
import { validViewportChange } from '../shared/viewport';

import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row'
    },
    panel : {
        flex: '0',
        minWidth: '20rem',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1)
    },
    minimap: {
        flex: '1'
    },
    buttons: {
        display: 'grid',
        gridTemplateAreas: ' ". U ." "L D R" '
    },
    btnUp: {
        gridArea: 'U'
    },
    btnDown: {
        gridArea: 'D'
    },
    btnLeft: {
        gridArea: 'L'
    },
    btnRight: {
        gridArea: 'R'
    }
}));

function Viewport({ dispatch, viewport, gameInfo, stage }) {

    
    const classes = useStyles();
    
    const changeOffset = (dx, dy) => {
        dispatch(actions.changeOffset(dx, dy));
    }

    const handleKeyPress = (e) => {
        console.log(e.code);
        
        let change = false;

        if ( ['KeyW', 'ArrowUp'].indexOf(e.code) >= 0 ) {
            change = { dx: 0 , dy: -1 }
        } else if (['KeyS', 'ArrowDown'].indexOf(e.code) >= 0) {
            change = { dx: 0, dy: 1 }
        } else if (['KeyA', 'ArrowLeft'].indexOf(e.code) >= 0) {
            change = { dx: -1, dy: 0 }
        } else if (['KeyD', 'ArrowRight'].indexOf(e.code) >= 0) {
            change = { dx: 1, dy: 0 }
        }

        if (change) {
            dispatch(actions.changeOffset(change.dx, change.dy))
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleKeyPress);
        return () => {
            document.removeEventListener('keyup', handleKeyPress);
        }
    });

    let panel = '';
    let key = 0;

    if (viewport.height < gameInfo.height || viewport.width < gameInfo.width) {

        panel =
            (
                <div className={classes.panel}>
                    <div className={classes.minimap}>
                        <Minimap />
                    </div>
                    <div className={classes.buttons}>
                        <Button
                            key={key++}
                            variant='contained'
                            className={classes.btnUp}
                            disabled={!validViewportChange(viewport, gameInfo, 0, -1)}
                            startIcon={<KeyboardArrowUpRoundedIcon />}
                            onClick={() => changeOffset(0, -1)}>

                            W
                        </Button>
                        <Button
                            key={key++}
                            variant='contained'
                            className={classes.btnDown}
                            disabled={!validViewportChange(viewport, gameInfo, 0, 1)}
                            startIcon={<KeyboardArrowDownRoundedIcon />}
                            onClick={() => changeOffset(0, 1)}>

                            S
                        </Button>
                        <Button
                            key={key++}
                            variant='contained'
                            className={classes.btnLeft}
                            disabled={!validViewportChange(viewport, gameInfo, -1, 0)}
                            startIcon={<KeyboardArrowLeftRoundedIcon />}
                            onClick={() => changeOffset(-1, 0)}>

                            A
                        </Button>
                        <Button
                            key={key++}
                            variant='contained'
                            className={classes.btnRight}
                            disabled={!validViewportChange(viewport, gameInfo, 1, 0)}
                            startIcon={<KeyboardArrowRightRoundedIcon />}
                            onClick={() => changeOffset(1, 0)}>
                            D
                        </Button>
                    </div>
                </div>
            )
    }

    return stage === gameStage.NOT_STARTED ? (
        <h4>Start the game first!</h4>
    ) : (
        <div className={classes.root}>
            {panel}
            <GameField className={classes.field} />
        </div>
    )
}

const mapStateToProps = (state) => state.currentGame;

export default connect(mapStateToProps)(Viewport);