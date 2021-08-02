import React from 'react'
import { AppBar, Container, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import TemporaryDrawer from './TemporaryDrawer'
import { getUser } from '../../services/auth'
const styles = theme => ({
    bar: {
        // background: 'transparent',
        boxShadow: 'none'
    },
    icon: {
        color: theme.palette.primary.contrastText
    },
    title: {
        color: theme.palette.primary.contrastText,
        textDecoration: "none"
    }
})


function NavBar({ children, classes }) {
    const user = getUser();
    const role = user ? user.role : null;
    return (
        <AppBar position="static" className={classes.bar}>
            <Container maxWidth="xl">
                <Toolbar>
                    {role && <TemporaryDrawer role={role} />}
                    <Typography
                        variant="h6"
                        className={classes.title}
                        component={Link}
                        to="/"
                    >
                        Celiaquia
                    </Typography>
                    {children}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default withStyles(styles)(NavBar)