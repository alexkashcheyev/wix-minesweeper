import React, { Component } from 'react';
import { Drawer, TextField, makeStyles, styled, withStyles, List, ListItem, IconButton, ListItemSecondaryAction, ListItemText, Button, Icon } from '@material-ui/core';
import NewGame from './NewGame';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    listItem: {
        padding: theme.spacing(2)
    },
    formRow: {
        padding: theme.spacing(2)
    }
}));

function Menu({ open, superman, dispatch }) {
    
    const classes = useStyles();

    const hideMenu = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        dispatch(actions.toggleMenu(false));
    }

    const toggleSuperman = (event) => {
        dispatch(actions.toggleSuperman(!superman));
    }

    const supermanCheckboxIcon = superman ? (
        <CheckBoxRoundedIcon color='primary' />
    ) : ( 
        <CheckBoxOutlineBlankRoundedIcon color='primary' /> 
    )
    
    return (

        <div className={classes.root}>
            <Drawer 
                anchor='left' 
                open={open}
                variant='persistent'
                onClose={hideMenu}>

                    <List>

                        <ListItem>
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

                        <ListItem>
                            <form>
                                <div className={classes.formRow}>
                                    <TextField id="new-field-width" label="Width" />
                                </div>
                                <div className={classes.formRow}>
                                    <TextField id="new-field-height" label="Height" />
                                </div>
                                <div className={classes.formRow}>
                                    <Button 
                                        variant='contained'
                                        color='primary'
                                        fullWidth='true'>
                                            
                                            Start
                                            
                                    </Button>
                                </div>
                            </form>
                        </ListItem>

                        <ListItem button='true' onClick={toggleSuperman}>
                            <ListItemText>
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