import React from 'react'
import { AppBar, Container, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { Link, withRouter } from 'react-router-dom'
import TemporaryDrawer from './TemporaryDrawer'
import { getUser } from '../../services/auth'
const styles = theme => ({
    bar: {
        // background: 'transparent',
        boxShadow: 'none'
    },
    homeIcon: {
        color: theme.palette.primary.contrastText
    },
    title: {
        color: theme.palette.primary.contrastText
    }
})


function NavBar({ children, location, classes }) {
    const homeButton = location.pathname !== "/";
    const user = getUser();
    const role = user? user.role : null;
    console.log(role)
    return (
        <AppBar position="static" className={classes.bar}>
            <Container maxWidth="xl">
                <Toolbar>
                {role && (<> 
                        <TemporaryDrawer role={role}/>
                        <IconButton
                            className={classes.homeIcon}
                            edge="start"
                            component={Link}
                            to="/"
                            aria-label="home"
                            style={homeButton ? {} : { visibility: "hidden" }}
                        >
                            <HomeIcon />
                        </IconButton> 
                    </>
                )}
                    <Typography variant="h6" className={classes.title}>
                        Celiaquia
                    </Typography>
                    {children}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default withStyles(styles)(withRouter(NavBar))