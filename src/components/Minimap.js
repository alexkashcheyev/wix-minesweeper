import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid #ccc',
        position: 'relative',

        // root element width will be 100% if the field is horizontal
        // or will be calculated proportionally to the height otherwise.
        width: (props) => props.gameInfo.width >= props.gameInfo.height 
                    ? '100%'
                    : toCssPercent(props.gameInfo.width / props.gameInfo.height),

        // same goes for height if the field is vertical

        height: (props) => props.gameInfo.height >= props.gameInfo.width
                    ? '100%'
                    : toCssPercent(props.gameInfo.height / props.gameInfo.width)
    },
    viewport: {
        background: theme.palette.info.light,
        position: 'absolute',

        // vieport width, height and coordinates are calculated 
        // proportionally to field width and height

        width:      (props) => toCssPercent(props.viewport.width / props.gameInfo.width),
        height:     (props) => toCssPercent(props.viewport.height / props.gameInfo.height),

        left:       (props) => toCssPercent(props.viewport.offset.x / props.gameInfo.width),
        top:        (props) => toCssPercent(props.viewport.offset.y / props.gameInfo.height)
    }
}))

function toCssPercent(fraction) {
    return fraction * 100 + '%';
}

function Minimap(props) {

    const classes = useStyles(props);

    return (
        <Paper 
            variant='outlined'
            square={true}
            className={classes.root}>

            <div className={classes.viewport}>
                &nbsp;
            </div>
        </Paper>
    )
}

export default Minimap;