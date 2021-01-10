import React, { Component } from 'react'
import { Button, Container, TextField, withStyles } from '@material-ui/core'
import TextEditor from './TextEditor'
import { connect } from 'react-redux';
import IngredientesForm from './IngredientesForm';
import { sendReceta } from '../store/actions';
import BorderedDiv from './BorderedDiv';

const style = theme => ({
    item: {
        marginTop: theme.spacing(2),
    },
    send: {
        float: "right",
        marginTop: theme.spacing(2),
    },
})

class RecetaForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            descripcion: "",
            instrucciones: "",
            cantIngredientes: 0,
            ingredientes: {},
        }

        this.onChange = this.onChange.bind(this)
        this.onChangeIngredienteCombo = this.onChangeIngredienteCombo.bind(this)
        this.onChangeIngredienteText = this.onChangeIngredienteText.bind(this)
        this.deleteIngrediente = this.deleteIngrediente.bind(this)
        this.addIngrediente = this.addIngrediente.bind(this)
        this.sendReceta = this.sendReceta.bind(this)
    }

    onChange(e) {
        const { id, value } = e.target;

        this.setState({ [id]: value })
    }

    onChangeIngredienteCombo(key, id, value) {
        this.setState((state) => ({
            ingredientes: {
                ...state.ingredientes,
                [key]: {
                    ...state.ingredientes[key],
                    [id]: value
                }
            },
        }))
    }

    onChangeIngredienteText(key, e) {
        const { id, value } = e.target

        this.setState((state) => ({
            ingredientes: {
                ...state.ingredientes,
                [key]: {
                    ...state.ingredientes[key],
                    [id]: value
                }
            },
        }))
    }

    deleteIngrediente(key) {
        const ingredientes = { ...this.state.ingredientes }
        delete ingredientes[key]

        this.setState({ ingredientes })
    }

    addIngrediente(e) {
        this.setState((state) => ({
            ingredientes: {
                ...state.ingredientes,
                [state.cantIngredientes]: {
                    alimento: "",
                    cantidad: "",
                    unidadDeMedida: ""
                }
            },
            cantIngredientes: state.cantIngredientes + 1
        }))
    }

    sendReceta(e) {
        e.preventDefault()
        const { nombre, descripcion, instrucciones, ingredientes } = this.state
        this.props.sendReceta({ nombre, descripcion, instrucciones, ingredientes })
    }

    render() {
        const { nombre, descripcion, ingredientes } = this.state
        const { classes } = this.props
        return (
            <Container maxWidth="md">
                <form onSubmit={this.sendReceta}>
                    <TextField
                        id="nombre"
                        className={classes.item}
                        label="Nombre"
                        value={nombre}
                        onChange={this.onChange}
                        variant="outlined"
                        required
                        fullWidth
                    />
                    <TextField
                        id="descripcion"
                        className={classes.item}
                        label="Descripción"
                        value={descripcion}
                        onChange={this.onChange}
                        variant="outlined"
                        multiline
                        required
                        fullWidth
                    />
                    <BorderedDiv className={classes.item}>
                        <TextEditor
                            id="instrucciones"
                            label="Instrucciones"
                            onChange={this.onChange}
                        />
                    </BorderedDiv>
                    <BorderedDiv className={classes.item}>
                        <IngredientesForm
                            id="ingredientes"
                            label="Ingredientes"
                            ingredientes={ingredientes}
                            onChangeIngredienteCombo={this.onChangeIngredienteCombo}
                            onChangeIngredienteText={this.onChangeIngredienteText}
                            addIngrediente={this.addIngrediente}
                            deleteIngrediente={this.deleteIngrediente}
                        />
                    </BorderedDiv>
                    <Button
                        className={classes.send}
                        color="primary"
                        variant="contained"
                        type="submit"
                        children="Guardar"
                    />
                </form>
            </Container>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    sendReceta: receta => dispatch(sendReceta(receta)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RecetaForm))