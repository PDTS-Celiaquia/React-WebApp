import { withStyles } from '@material-ui/core'
import React from 'react'

const style = theme => ({
    main: {
        borderRadius: "5px",
        border: `1px solid ${theme.palette.grey["400"]}`,
        // colorea el borde negro cuando el mouse se posiciona sobre la region
        "&:hover": {
            borderColor: "black",
        },
        // colorea el borde y lo agranda cuando está seleccionado
        "&:focus-within": {
            borderWidth: "1px",
            borderColor: theme.palette.primary.main,
            boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}`,
        },
        // colorea el titulo de la región
        "& .titulo": {
            color: theme.palette.text.secondary,
        },
        // colorea el titulo de la región cuando está seleccionado
        "&:focus-within .titulo": {
            color: theme.palette.primary.main
        },
        // colorea los iconos (que tienen la clase icon) de la región cuando está seleccionado
        "&:focus-within .icon": {
            fill: theme.palette.primary.main
        },
    },
})

function BorderedDiv({ className, classes, children, ...props }) {
    const childrenWithProps = React.Children.map(children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...props });
        }
        return child;
    });
    return (
        <div className={`${className} ${classes.main}`}> {childrenWithProps} </div>
    )
}

export default withStyles(style)(BorderedDiv)