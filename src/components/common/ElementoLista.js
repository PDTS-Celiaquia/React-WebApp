import React from 'react';
import { withStyles } from '@material-ui/core';
import TypographyRe from './TypographyRe';
import { Link } from 'react-router-dom';

const styles = theme => ({
    container: {
        display: "flex",
        margin: theme.spacing(1),
    },
    title: {
        margin: "auto",
        marginLeft: theme.spacing(2),
        flexGrow: 1,
        textDecoration: "none"
    },
})

function ElementoLista({ id, classes, ...rest }) {
    return (
        <div className={classes.container}>
            <TypographyRe
                className={`titulo ${classes.title}`}
                component={Link}
                to={location => `${location.pathname}/${id}`}
                {...rest}
            />
        </div>
    )
}


export default withStyles(styles)(ElementoLista)