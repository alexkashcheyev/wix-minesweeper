import React from 'react'
import { makeStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab'
import config from '../appconfig';
import * as actions from '../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'start',
        position: 'absolute',
        right: '0',
        top: '0',
        width: '20rem'
    }
}));

function Message ({ severity, visible, title, content, dispatch }) {
    const classes = useStyles();

    if (!visible) return '';

    setTimeout(
        () => dispatch(actions.toggleMessage(false)),
        config.messageTimeout
    );

    return (
        <Alert
            variant='filled'
            className={classes.root}
            severity={severity}>

            <AlertTitle>{title}</AlertTitle>
            {content}
        </Alert>
    )
}

const mapStateToProps = (state) => state.ui.message;

export default connect(mapStateToProps)(Message);