import React, { Component } from 'react'
import { Container, IconButton, TextField, withStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import TextEditor from './TextEditor'
import IngredienteForm from './IngredienteForm';

const style = theme => ({
    section: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: "5px",
        border: `1px solid ${theme.palette.grey["400"]}`,
        "&:hover": {
            borderColor: "black",
        },
        "&:focus-within": {
            borderWidth: "1px",
            borderColor: theme.palette.primary.main,
            boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}`,
        },
        "&:focus-within p": {
            color: theme.palette.primary.main
        }
    },
    item: {
        marginTop: theme.spacing(2)
    },
    addContainer: {
        textAlign: 'center'
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
        const ingredientes = {...this.state.ingredientes}
        delete ingredientes[key]

        this.setState({ ingredientes })
    }

    addIngrediente(e) {
        this.setState((state) => ({
            ingredientes: {
                ...state.ingredientes,
                [state.cantIngredientes]: {
                    alimento: null,
                    cantidad: null,
                    unidadDeMedida: null
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
                <div className={`${classes.section} ${classes.addContainer}`}>
                {Object.entries(ingredientes).map(([key, ingrediente]) => (
                    <IngredienteForm
                        key={key}
                        {...ingrediente}
                        onChangeIngredienteCombo={
                            (e, newValue) => this.onChangeIngredienteCombo(key, e, newValue)
                        }
                        onChangeIngredienteText={
                            (e) => this.onChangeIngredienteText(key, e)
                        }
                        deleteIngrediente={() => this.deleteIngrediente(key)}
                    />

                ))}
                    <IconButton className={classes.addContainer} onClick={this.addIngrediente}>
                        <AddIcon className={classes.add} color="primary" />
                    </IconButton>
                </div>
            </Container>
        )
    }
}

export default withStyles(style)(RecetaForm)