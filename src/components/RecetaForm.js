import React, { Component } from 'react'
import { Button, Container, TextField, withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import IngredientesForm from './IngredientesForm';
import BorderedDiv from './common/BorderedDiv';
import TextEditor from './common/TextEditor'
import { findRecetaById } from '../helpers/findReceta';
import { getAlimentos, getUnidades, sendReceta } from '../store/actions';

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
            receta: {
                nombre: "",
                descripcion: "",
                instrucciones: "",
                ingredientes: []
            },
        }

        this.onChange = this.onChange.bind(this)
        this.onChangeIngredienteCombo = this.onChangeIngredienteCombo.bind(this)
        this.onChangeIngredienteText = this.onChangeIngredienteText.bind(this)
        this.deleteIngrediente = this.deleteIngrediente.bind(this)
        this.addIngrediente = this.addIngrediente.bind(this)
        this.sendReceta = this.sendReceta.bind(this)
    }

    componentDidMount() {
        const {
            recetas, alimentos, unidadesDeMedida, getAlimentos, getUnidades
        } = this.props;

        if (!alimentos) getAlimentos()

        if (!unidadesDeMedida) getUnidades()

        const { id } = this.props.match.params
        // si me envian una receta por parametro la setteo
        if (id !== "new" && recetas) {
            const receta = findRecetaById(recetas, id);
            if (receta) this.setState({ receta })
        }
    }

    onChange(e) {
        const { id, value } = e.target;

        this.setState(state => ({
            receta: {
                ...state.receta,
                [id]: value
            }
        }))
    }

    onChangeIngredienteCombo(index, id, value) {
        const ingredientes = [...this.state.receta.ingredientes]
        ingredientes[index] = {
            ...ingredientes[index],
            [id]: value
        }
        this.setState(state => ({
            receta: {
                ...state.receta,
                ingredientes,
            },
        }))
    }

    onChangeIngredienteText(index, e) {
        const { id, value } = e.target
        const ingredientes = [...this.state.receta.ingredientes]
        ingredientes[index] = {
            ...ingredientes[index],
            [id]: value
        }

        this.setState(state => ({
            receta: {
                ...state.receta,
                ingredientes,
            },
        }))
    }

    deleteIngrediente(index) {
        const ingredientes = this.state.receta.ingredientes

        this.setState(state => ({
            receta: {
                ...state.receta,
                ingredientes: [
                    ...ingredientes.slice(0, index),
                    ...ingredientes.slice(index + 1)
                ]
            }
        }))
    }

    addIngrediente(e) {
        this.setState(state => ({
            receta: {
                ...state.receta,
                ingredientes: [
                    ...state.receta.ingredientes,
                    {
                        alimento: "",
                        cantidad: "",
                        unidadDeMedida: ""
                    }
                ]
            }
        }))
    }

    sendReceta(e) {
        e.preventDefault()
        this.props.sendReceta(this.state.receta)
    }

    render() {
        const { nombre, descripcion, ingredientes } = this.state.receta
        const {
            fetchingRecetas, fetchingAlimentos, fetchingUnidades,
            alimentos, unidadesDeMedida,
            classes
        } = this.props

        if (fetchingRecetas || fetchingAlimentos || fetchingUnidades) {
            return <p>Loading...</p>
        }
        return (
            <>
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
                            alimentos={alimentos}
                            unidadesDeMedida={unidadesDeMedida}
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
            </>
        )
    }
}

const mapStateToProps = state => ({
    fetchingRecetas: state.fetchingRecetas,
    fetchingAlimentos: state.fetchingAlimentos,
    fetchingUnidades: state.fetchingUnidades,

    recetas: state.recetas,
    alimentos: state.alimentos,
    unidadesDeMedida: state.unidadesDeMedida,
})

const mapDispatchToProps = dispatch => ({
    getAlimentos: () => dispatch(getAlimentos()),
    getUnidades: () => dispatch(getUnidades()),
    sendReceta: receta => dispatch(sendReceta(receta)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RecetaForm))