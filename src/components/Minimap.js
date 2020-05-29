import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        
    }
}))

function Minimap() {
    const classes = useStyles();
    return (
        <div className={classes.root}>Minimap!</div>
    )
}

export default Minimap;