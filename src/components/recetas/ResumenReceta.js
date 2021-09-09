import React from 'react'
import TypographyRe from '../common/TypographyRe';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const style = theme => ({
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

function ResumenReceta({ receta, re, classes }) {
    return (
        <div className={classes.container}>
            <TypographyRe
                id={`resumen-receta-${receta.id}`}
                className={`titulo ${classes.title}`}
                title={receta.nombre}
                variant="h6"
                component={Link}
                to={location => `${location.pathname}/${receta.id}`}
                re={re}
            />
        </div>
    )
}


export default withStyles(style)(ResumenReceta);