import React, { Component } from 'react'
import { IconButton, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IngredienteForm from './IngredienteForm';

const style = theme => ({
    container: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    ingredientesContainer: {
        marginTop: theme.spacing(2),
    },
    addContainer: {
        textAlign: "center",
        marginTop: theme.spacing(1),
    },
})

class IngredientesForm extends Component {

    render() {
        const {
            label, ingredientes, alimentos, unidadesDeMedida,
            onChangeIngredienteCombo, onChangeIngredienteText,
            addIngrediente, deleteIngrediente, readOnly,
            classes
        } = this.props

        return (
            <div className={classes.container}>
                {label &&
                    <Typography className="titulo" variant="body1">
                        {label}
                    </Typography>
                }
                <div className={classes.ingredientesContainer}>
                    {ingredientes.map((ingrediente, index) => (
                        <IngredienteForm
                            key={index}
                            index={index}
                            alimentos={alimentos}
                            unidadesDeMedida={unidadesDeMedida}
                            onChangeIngredienteCombo={
                                (e, newValue) => onChangeIngredienteCombo(index, e, newValue)
                            }
                            onChangeIngredienteText={
                                (e) => onChangeIngredienteText(index, e)
                            }
                            deleteIngrediente={() => deleteIngrediente(index)}
                            readOnly={readOnly}
                            {...ingrediente}
                        />
                    ))}
                </div>
                {!readOnly &&
                    <div className={classes.addContainer}>
                        <IconButton
                            id="add-ingrediente"
                            onClick={addIngrediente}
                        >
                            <AddIcon className="icon" />
                        </IconButton>
                    </div>}
            </div>
        )
    }
}



export default withStyles(style)(IngredientesForm)