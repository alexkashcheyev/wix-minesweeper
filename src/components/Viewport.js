import React, { useEffect, useRef } from 'react';
import { makeStyles, Button, Typography, Paper } from '@material-ui/core';
import GameField from './GameField';
import Minimap from './Minimap'
import { connect } from 'react-redux';
import { gameStage, actionType } from '../enums';
import * as actions from '../redux/actions';
import { validViewportChange } from '../shared/viewport';
import config from '../appconfig';

import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row'
    },
    panel : {
        margin: theme.spacing(1),
        flex: '0',
        alignItems: 'center',
        minWidth: config.panelWidth,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1)
    },
    stats: {
        marginBottom: theme.spacing(2)
    },
    minimap: {
        height: config.minimapSize,
        width: config.minimapSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    divider: {
        flex: '1'
    },
    buttons: {
        display: 'grid',
        gridColumnGap: theme.spacing(1),
        gridRowGap: theme.spacing(1),
        gridTemplateAreas: ' ". U ." "L D R" '
    },
    fieldWrapper: {

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

function Viewport({ dispatch, viewport, gameInfo, stage, flagsSet }) {
    
    const classes = useStyles();
    
    const changeOffset = (dx, dy) => {
        dispatch(actions.changeOffset(dx, dy));
    }

    const handleKeyPress = (e) => {
        
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
    }, [document]);

    let stats = (
        <div className={classes.stats}>
            <Typography color='secondary' variant='h4' component='div'>
                <FlagRoundedIcon /> &times; { gameInfo.mines - flagsSet }
            </Typography>
        </div>
    );

    let panel = (
        <Paper className={classes.panel} variant='outlined'>
            {stats}
        </Paper>
    );
    let key = 0;

    if (viewport.height < gameInfo.height || viewport.width < gameInfo.width) {

        panel =
            (
                <Paper 
                    variant='outlined'
                    className={classes.panel}>

                    {stats}
                    <div className={classes.minimap}>
                        <Minimap 
                            gameInfo={gameInfo} 
                            viewport={viewport} />
                        <Typography variant='caption'>Minimap</Typography>
                    </div>
                    <div className={classes.divider}>
                        &nbsp;
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
                </Paper>
            )
    }

    const fieldBorder = {
        top     : viewport.height>= gameInfo.height || !validViewportChange(viewport, gameInfo,  0, -1),
        bottom  : viewport.height>= gameInfo.height || !validViewportChange(viewport, gameInfo,  0,  1),
        left    : viewport.width >= gameInfo.width || !validViewportChange(viewport, gameInfo, -1,  0),
        right   : viewport.width >= gameInfo.width || !validViewportChange(viewport, gameInfo,  1,  0)
    }

    return stage === gameStage.NOT_STARTED ? (
        <Typography variant='h4'>
            To start the game, click on the hamburger menu in the left upper corner, enter the desired parameters and click "Start" button.
        </Typography>
    ) : (
        <div className={classes.root}>
            {panel}
            <div className={classes.fieldWrapper}>
                <GameField className={classes.field} border={fieldBorder} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => state.currentGame;

export default connect(mapStateToProps)(Viewport);