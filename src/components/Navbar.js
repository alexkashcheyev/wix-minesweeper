import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';
import { connect } from 'react-redux';
import * as actions from '../redux/actions'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1, 
    },
    timer : {
        marginRight: theme.spacing(2),
    },
    flagCounter: {
        
    },
    flagIcon: {
        color: 'rgb(252, 150, 40)'
    }
  }));

function Navbar({ dispatch }) {
    const classes = useStyles(); 

    const showMenu = () => {
        dispatch(actions.toggleMenu(true));
    }

    return (
        <AppBar position="static">

            <Toolbar>

                <IconButton 
                    edge="start" 
                    className={classes.menuButton} 
                    color="inherit" 
                    aria-label="menu"
                    onClick={showMenu}>

                    <MenuIcon />

                </IconButton>

                <Typography variant="h6" className={classes.title}>
                    Minesweeper
                </Typography>
            </Toolbar>

        </AppBar>
    )
}

export default connect()(Navbar)