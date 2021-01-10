import { IconButton, TextField, withStyles } from '@material-ui/core'
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
    }
})

function CustomTextField(props) {
    return (
        <TextField
            variant="outlined"
            required
            {...props}
        />
    )
}

function CustomAutocomplete({ id, label, onChangeIngredienteCombo, ...restProps }) {
    return (
        <Autocomplete
            onChange={(e, newValue) => onChangeIngredienteCombo(id, newValue)}
            getOptionLabel={(option) => option.nombre ? option.nombre : ""}
            renderInput={(params) =>
                <CustomTextField {...params} label={label} />
            }
            {...restProps}
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
            <CustomAutocomplete
                id="alimento"
                className={classes.alimento}
                options={alimentos}
                value={alimento}
                label="Alimentos"
                getOptionSelected={(option, value) => option.numero === value.numero}
                onChangeIngredienteCombo={onChangeIngredienteCombo}
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
            <CustomAutocomplete
                id="unidadDeMedida"
                className={classes.unidadDeMedida}
                options={unidadesDeMedida}
                value={unidadDeMedida}
                label="Unidades de Medida"
                getOptionSelected={(option, value) => option.id === value.id}
                onChangeIngredienteCombo={onChangeIngredienteCombo}
            />
            <IconButton onClick={deleteIngrediente}>
                <DeleteIcon color="error" />
            </IconButton>
        </div>
    )
}

export default withStyles(style)(IngredienteForm)