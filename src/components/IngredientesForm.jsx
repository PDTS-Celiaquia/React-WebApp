import React, { Component } from 'react'
import { IconButton, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IngredienteForm from './IngredienteForm';
import { connect } from 'react-redux';
import { getAlimentos, getUnidades } from '../store/actions';

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
    componentDidMount() {
        const {
            alimentos, unidadesDeMedida, getAlimentos, getUnidades
        } = this.props;

        if (!alimentos) getAlimentos()

        if (!unidadesDeMedida) getUnidades()
    }

    render() {
        const {
            label, ingredientes, alimentos, unidadesDeMedida,
            onChangeIngredienteCombo, onChangeIngredienteText,
            addIngrediente, deleteIngrediente,
            classes, ...restProps
        } = this.props

        return (
            <div {...restProps} >
                <div className={classes.container}>
                    {label && <Typography className="titulo" variant="body1" children={label} />}
                    <div className={classes.ingredientesContainer}>
                        {Object.entries(ingredientes).map(([key, ingrediente]) => (
                            <IngredienteForm
                                key={key}
                                alimentos={alimentos}
                                unidadesDeMedida={unidadesDeMedida}
                                onChangeIngredienteCombo={
                                    (e, newValue) => onChangeIngredienteCombo(key, e, newValue)
                                }
                                onChangeIngredienteText={
                                    (e) => onChangeIngredienteText(key, e)
                                }
                                deleteIngrediente={() => deleteIngrediente(key)}
                                {...ingrediente}
                            />
                        ))}
                    </div>
                    <div className={classes.addContainer}>
                        <IconButton onClick={addIngrediente}>
                            <AddIcon className="icon" />
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    alimentos: state.alimentos,
    unidadesDeMedida: state.unidadesDeMedida
})

const mapDispatchToProps = dispatch => ({
    getAlimentos: () => dispatch(getAlimentos()),
    getUnidades: () => dispatch(getUnidades())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(IngredientesForm))