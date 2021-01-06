import { IconButton, TextField, Typography, withStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { Autocomplete } from '@material-ui/lab'
import React from 'react'

const style = theme => ({
    container: {
        width: "100%",
        display: "flex",
        marginTop: theme.spacing(2),
    },
    alimento: {
        width: "40%",
        float: "left",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3)
    },
    cantidad: {
        flexGrow: 1,
        marginRight: theme.spacing(3)
    },
    unidadDeMedida: {
        width: "30%",
        float: "right",
        marginRight: theme.spacing(3)
    },
    delete: {
    }
})

const CustomTextField = withStyles(theme => ({
    caption: {
        textAlign: "center",
        color: theme.palette.text.secondary,
    }
}))(
    function ({ inputProps, label, classes, ...props }) {
        return (
            <TextField
                {...props}
                inputProps={{ style: { textAlign: 'center' }, ...inputProps }}
                helperText={
                    <Typography
                        variant="caption"
                        className={classes.caption}
                        display="block"
                    >
                        {label}
                    </Typography>
                }
            />
        )
    }
)

function IngredienteForm({
    alimento, cantidad, unidadDeMedida,
    onChangeIngredienteCombo, onChangeIngredienteText, deleteIngrediente,
    classes
}) {
    const alimentos = [{ id: 0, nombre: "Soja" }, { id: 1, nombre: "Pollo" }]
    const unidadesDeMedida = [{ id: 0, nombre: "mg" }, { id: 1, nombre: "g" }, { id: 2, nombre: "kg" }]
    return (
        <div className={classes.container}>
            <Autocomplete
                id="alimento"
                className={classes.alimento}
                options={alimentos}
                value={alimento}
                getOptionSelected={(option, value) => option.id === value.id}
                onChange={(e, newValue) => onChangeIngredienteCombo("alimento", newValue)}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) =>
                    <CustomTextField {...params} label="Alimento" />
                }
            />
            <CustomTextField
                id="cantidad"
                className={classes.cantidad}
                label="Cantidad"
                value={cantidad}
                onChange={onChangeIngredienteText}
                type="number"
                inputProps={{ min: 0 }}
            />
            <Autocomplete
                id="unidadDeMedida"
                className={classes.unidadDeMedida}
                options={unidadesDeMedida}
                value={unidadDeMedida}
                getOptionSelected={(option, value) => option.id === value.id}
                onChange={(e, newValue) => onChangeIngredienteCombo("unidadDeMedida", newValue)}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) =>
                    <CustomTextField {...params} label="Unidad de Medida" />
                }
            />
            <IconButton onClick={deleteIngrediente}>
                <DeleteIcon color="error" />
            </IconButton>
        </div>
    )
}

export default withStyles(style)(IngredienteForm)