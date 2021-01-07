import React, { Component } from 'react'
import { IconButton, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IngredienteForm from './IngredienteForm';
import { connect } from 'react-redux';
import { getAlimentos, getUnidades } from '../store/actions';

const style = theme => ({
    addContainer: {
        textAlign: "center"
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
                {label && <Typography className="titulo" variant="body1" children={label} />}
                {Object.entries(ingredientes).map(([key, ingrediente]) => (
                    <IngredienteForm
                        key={key}
                        {...ingrediente}
                        alimentos={alimentos}
                        unidadesDeMedida={unidadesDeMedida}
                        onChangeIngredienteCombo={
                            (e, newValue) => onChangeIngredienteCombo(key, e, newValue)
                        }
                        onChangeIngredienteText={
                            (e) => onChangeIngredienteText(key, e)
                        }
                        deleteIngrediente={() => deleteIngrediente(key)}
                    />

                ))}
                <div className={classes.addContainer}>
                    <IconButton onClick={addIngrediente}>
                        <AddIcon className="icon" />
                    </IconButton>
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