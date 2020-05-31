import React, { useEffect } from 'react';
import { makeStyles, Button, Typography, Paper, CircularProgress } from '@material-ui/core';

import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';

import GameField from './GameField';
import Minimap from './Minimap'
import { connect } from 'react-redux';
import { gameStage } from '../enums';
import * as actions from '../redux/actions';
import { validViewportChange } from '../shared/viewport.helpers';
import config from '../appconfig';


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
        dispatch(actions.moveViewport(dx, dy));
    }

    useEffect(() => {
        const handleKeyPress = (e) => {
            setTimeout(() => {
                let change = false;
    
                if (['KeyW', 'ArrowUp'].indexOf(e.code) >= 0) {
                    change = { dx: 0, dy: -1 }
                } else if (['KeyS', 'ArrowDown'].indexOf(e.code) >= 0) {
                    change = { dx: 0, dy: 1 }
                } else if (['KeyA', 'ArrowLeft'].indexOf(e.code) >= 0) {
                    change = { dx: -1, dy: 0 }
                } else if (['KeyD', 'ArrowRight'].indexOf(e.code) >= 0) {
                    change = { dx: 1, dy: 0 }
                }
    
                if (change) {
                    dispatch(actions.moveViewport(change.dx, change.dy))
                }
            })
        }


        document.addEventListener('keyup', handleKeyPress);
        return () => {
            document.removeEventListener('keyup', handleKeyPress);
        }
    });

    if (stage === gameStage.NOT_STARTED) {
        return (
            <Typography variant='h4'>
                To start the game, click on the hamburger menu in the left upper corner, enter the desired parameters and click "Start" button.
            </Typography>
        ) 
    }

    if (stage === gameStage.LOADING) {
        return (
            <CircularProgress />
        )
    }
    
    

    const stats = buildStats({classes, gameInfo, flagsSet})

    let panel = buildPanel({ stats, viewport, gameInfo, classes, changeOffset }) ;

    const fieldBorder = buildFieldBorder({ viewport, gameInfo });

    return (
        <div className={classes.root}>
            {panel}
            <div className={classes.fieldWrapper}>
                <GameField className={classes.field} border={fieldBorder} />
            </div>
        </div>
    )
}

function buildStats({ classes, gameInfo, flagsSet }) {
    return (
        <div className={classes.stats}>
            <Typography color='secondary' variant='h4' component='div'>
                <FlagRoundedIcon /> &times; {gameInfo.mines - flagsSet}
            </Typography>
        </div>
    );
}

function buildPanel({ stats, viewport, gameInfo, classes, changeOffset}) {

    if (viewport.height < gameInfo.height || viewport.width < gameInfo.width) {
        // panel with minimap and control keys in case scrolling is enabled
        
        let key = 0;

        return (
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
    } else {

        // panel with flag number only
        
        return (
            <Paper className={classes.panel} variant='outlined'>
                {stats}
            </Paper>
        )
    }
}

function buildFieldBorder({ viewport, gameInfo }) {
    return {
        top: viewport.height >= gameInfo.height || !validViewportChange(viewport, gameInfo, 0, -1),
        bottom  : viewport.height >= gameInfo.height || !validViewportChange(viewport, gameInfo, 0, 1),
        left    : viewport.width >= gameInfo.width || !validViewportChange(viewport, gameInfo, -1, 0),
        right   : viewport.width >= gameInfo.width || !validViewportChange(viewport, gameInfo, 1, 0)
    }
}

const mapStateToProps = (state) => state.currentGame;

export default connect(mapStateToProps)(Viewport);