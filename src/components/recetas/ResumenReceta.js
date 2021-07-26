import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TypographyRe from '../common/TypographyRe';
import { IconButton, withStyles } from '@material-ui/core';
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
    },
})

function ResumenReceta({ receta, re, onDelete, classes }) {
    return (
        <div className={classes.container}>
            <TypographyRe
                className={`titulo ${classes.title}`}
                title={receta.nombre}
                variant="h6"
                re={re}
            />
            <IconButton component={Link} to={location => `${location.pathname}/${receta.id}`}>
                <EditIcon className="icon" />
            </IconButton>
            <IconButton onClick={onDelete}>
                <DeleteIcon color="error" />
            </IconButton>
        </div>
    )
}


export default withStyles(style)(ResumenReceta);