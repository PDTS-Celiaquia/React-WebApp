import React from 'react';
import { Checkbox, withStyles } from '@material-ui/core';
import TypographyRe from '../common/TypographyRe';

const styles = theme => ({
    container: {
        display: "flex",
        margin: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.grey['100']
        }
    },
    title: {
        margin: "auto",
        marginLeft: theme.spacing(2),
        flexGrow: 1,
    },
})

function ResumenAlimento({ alimento, re, onChange, classes }) {
    return (
        <div className={classes.container}>
            <TypographyRe
                className={`titulo ${classes.title}`}
                title={alimento.nombre}
                variant="h6"
                re={re}
            />
            <Checkbox id={alimento.id} onChange={onChange} checked={alimento.esAccesible} />
        </div>
    )
}


export default withStyles(styles)(ResumenAlimento)