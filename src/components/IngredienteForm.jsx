import { IconButton, TextField, Typography, withStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { Autocomplete } from '@material-ui/lab'
import React from 'react'

const style = theme => ({
    container: {
        width: "100%",
        display: "flex",
        marginTop: theme.spacing(1),
    },
    alimento: {
        width: "50%",
        float: "left",
        marginRight: theme.spacing(2)
    },
    cantidad: {
        flexGrow: 1,
        marginRight: theme.spacing(2)
    },
    unidadDeMedida: {
        width: "30%",
        float: "right",
        marginRight: theme.spacing(1)
    },
    delete: {
    }
})

function CustomTextField(props) {
    return (
        <TextField
            variant="outlined"
            {...props}
        />
    )
}

function IngredienteForm({
    alimentos = [], unidadesDeMedida = [],
    alimento, cantidad, unidadDeMedida,
    onChangeIngredienteCombo, onChangeIngredienteText, deleteIngrediente,
    classes
}) {
    return (
        <div className={classes.container}>
            <Autocomplete
                id="alimento"
                className={classes.alimento}
                options={alimentos}
                value={alimento}
                getOptionSelected={(option, value) => option.numero === value.numero}
                onChange={(e, newValue) => onChangeIngredienteCombo("alimento", newValue)}
                getOptionLabel={(option) => option.nombre ? option.nombre : ""}
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
                getOptionLabel={(option) => option.nombre ? option.nombre : ""}
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