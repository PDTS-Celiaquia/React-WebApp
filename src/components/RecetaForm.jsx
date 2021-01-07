import React, { Component } from 'react'
import { Container, TextField, withStyles } from '@material-ui/core'
import TextEditor from './TextEditor'
import { connect } from 'react-redux';
import IngredientesForm from './IngredientesForm';

const style = theme => ({
    section: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
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
    item: {
        marginTop: theme.spacing(2)
    }
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

    render() {
        const { nombre, descripcion, ingredientes } = this.state
        const { classes } = this.props
        return (
            <Container maxWidth="md">
                <TextField
                    id="nombre"
                    className={classes.item}
                    label="Nombre"
                    value={nombre}
                    onChange={this.onChange}
                    variant="outlined"
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
                    fullWidth
                />
                <TextEditor
                    className={classes.section}
                    id="instrucciones"
                    label="Instrucciones"
                    onChange={this.onChange}
                />
                <IngredientesForm
                    className={classes.section}
                    id="ingredientes"
                    label="Ingredientes"
                    ingredientes={ingredientes}
                    onChangeIngredienteCombo={this.onChangeIngredienteCombo}
                    onChangeIngredienteText={this.onChangeIngredienteText}
                    addIngrediente={this.addIngrediente}
                    deleteIngrediente={this.deleteIngrediente}
                />
            </Container>
        )
    }
}

const mapStateToProps = state => ({ })

const mapDispatchToProps = dispatch => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RecetaForm))