import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    List, ListItem, ListItemText, IconButton, //Divider
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { SwipeableDrawer } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
    list: {
        width: 250,
    },
    menuIcon: {
        color: theme.palette.primary.contrastText
    }
});

class TemporaryDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }

        this.toggleDrawer = this.toggleDrawer.bind(this)
        this.list = this.list.bind(this)
    }

    toggleDrawer(open) {
        return (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            this.setState({ open });
        }
    };

    list() {
        const { classes } = this.props
        return (
            <div
                className={classes.list}
                role="presentation"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
            >
                <List>
                    <ListItem button component={Link} to="/receta">
                        <ListItemText primary="Recetas" />
                    </ListItem>
                    <ListItem button component={Link} to="/alimento">
                        <ListItemText primary="Alimentos" />
                    </ListItem>
                    <ListItem button component={Link} to="/cuestionario">
                        <ListItemText primary="Analisis Cuestionario" />
                    </ListItem>
                </List>
                {/* <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
            </div>
        );
    }

    render() {
        const { open } = this.state
        const { classes } = this.props
        return (
            <>
                <IconButton
                    className={classes.menuIcon}
                    onClick={this.toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer anchor="left" open={open} onOpen={console.log} onClose={this.toggleDrawer(false)}>
                    {this.list()}
                </SwipeableDrawer>
            </>
        );
    }
}


export default withStyles(styles)(TemporaryDrawer)