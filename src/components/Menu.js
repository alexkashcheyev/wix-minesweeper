import React, { Component } from 'react';
import { Drawer, makeStyles, List, ListItem, IconButton, ListItemSecondaryAction, ListItemText, Button, Icon } from '@material-ui/core';
import NewGame from './NewGame';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import config from '../appconfig';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    list: {
    },
    listItem: {
        minWidth: config.drawerWidth,
    },
    listItemText: {
        padding: theme.spacing(2)
    },
    drawer: {
    }
}));

function Menu({ open, superman, dispatch }) {

    const classes = useStyles();

    const hideMenu = (event) => {
        dispatch(actions.toggleMenu(false));
    }

    const toggleSuperman = (event) => {
        dispatch(actions.toggleSuperman(!superman));

        if (config.autoCloseMenuOnSupermanToggle) {
            dispatch(actions.toggleMenu(false));
        }
    }

    const supermanCheckboxIcon = superman ? (
        <CheckBoxRoundedIcon color='primary' />
    ) : ( 
        <CheckBoxOutlineBlankRoundedIcon color='primary' /> 
    )
    
    return (

        <div className={classes.root}>
            <Drawer 
                className={classes.drawer}
                anchor='left' 
                open={open}
                variant='persistent'
                onClose={hideMenu}
                >

                    <List className={classes.list}>

                        <ListItem className={classes.listItem}>
                            <ListItemText>&nbsp;</ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge='end'
                                    onClick={hideMenu}
                                    >
                                        <ChevronLeftRoundedIcon />

                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                        <ListItem className={classes.listItem}>
                            <NewGame />
                        </ListItem>

                        <ListItem button={true} onClick={toggleSuperman} className={classes.listItem}>
                            <ListItemText className={classes.listItemText}>
                                Superman
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton onClick={toggleSuperman}>
                                    {supermanCheckboxIcon}
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                    </List>

            </Drawer>
        </div>
    )

}

const mapStateToProps = (state) => { 
    return { 
        open: state.ui.showMenu,
        superman: state.currentGame.superman
    }
}

export default connect(mapStateToProps)(Menu);