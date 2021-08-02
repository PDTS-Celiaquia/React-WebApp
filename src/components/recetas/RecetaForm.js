import React, { Component } from 'react'
import { Button, Container, TextField, withStyles, Snackbar, Typography, Icon, IconButton } from '@material-ui/core'
import { connect } from 'react-redux';
import IngredientesForm from './IngredientesForm';
import BorderedDiv from '../common/BorderedDiv';
import TextEditor from '../common/TextEditor'
import { findReceta } from '../../helpers/findReceta';
import { getAlimentos, getUnidades } from '../../store/actions';
import Loader from '../common/Loader';
import { findRecetaById, saveReceta } from '../../services/receta.service';
import MuiAlert from '@material-ui/lab/Alert'
import Delete from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const newReceta = {
    nombre: "",
    descripcion: "",
    instrucciones: "<p></p>",
    ingredientes: [],
}

const style = theme => ({
    header: {
        margin: theme.spacing(2),
        display: "flex",
        marginLeft: 0,
        marginRight: 0,
    },
    title: {
        margin: theme.spacing(2),
        marginLeft: 0,
        color: theme.palette.text.primary,
        margin: "auto",
    },
    editButton: {
        margin: theme.spacing(1),
    },
    deleteButton: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        margin: theme.spacing(1),
        marginRight: 0,
        "&:hover": {
            backgroundColor: theme.palette.error.dark,
        }
    },
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
            receta: null,
            loading: true,
            successToastOpen: false,
            sending: false
        }

        this.onChange = this.onChange.bind(this)
        this.onChangeIngredienteCombo = this.onChangeIngredienteCombo.bind(this)
        this.onChangeIngredienteText = this.onChangeIngredienteText.bind(this)
        this.deleteIngrediente = this.deleteIngrediente.bind(this)
        this.addIngrediente = this.addIngrediente.bind(this)
        this.handleToastClose = this.handleToastClose.bind(this);
        this.sendReceta = this.sendReceta.bind(this)
    }

    async componentDidMount() {
        this.props.getAlimentos()
        this.props.getUnidades()

        const { recetas } = this.props;
        const { id } = this.props.match.params
        if (id !== "new") {
            let recetaInit;
            if (recetas) {
                recetaInit = findReceta(recetas, id);
            } else {
                recetaInit = (await findRecetaById(id)).data;
            }
            if (recetaInit) {
                this.setState({ receta: recetaInit, loading: false })
            } else {
                // TODO: handle invalid id
                console.log("Add invalid id toast or screen")
            }
        } else {
            this.setState({ receta: newReceta, loading: false })
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

    async sendReceta(e) {
        e.preventDefault();
        this.setState({ sending: true });
        const receta = (await saveReceta(this.state.receta)).data;
        this.setState({ receta, successToastOpen: true, sending: false })
    }

    handleToastClose(e, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ successToastOpen: false });
    };

    render() {
        const { receta, loading, successToastOpen, sending } = this.state;
        const {
            fetchingRecetas, fetchingAlimentos, fetchingUnidades,
            alimentos, unidadesDeMedida, edit,
            match, classes
        } = this.props

        if (loading || fetchingRecetas || fetchingAlimentos || fetchingUnidades) {
            return <Loader />
        }
        const { nombre, descripcion, instrucciones, ingredientes } = receta;
        return (
            <Container maxWidth="md">
                <div className={classes.header}>
                    <Typography className={classes.title} variant="h4">
                        {edit ? "Editar Receta" : "Visualización de receta"}
                    </Typography>
                    {!edit && <>
                        <Button
                            className={classes.editButton}
                            color="primary"
                            variant="contained"
                            component={Link}
                            to={`${match.url}/edit`}
                        >
                            Editar
                        </Button>
                        <Button className={classes.deleteButton} variant="contained">Eliminar</Button>
                    </>
                    }
                </div>
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
                        InputProps={{
                            readOnly: !edit,
                        }}
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
                        InputProps={{
                            readOnly: !edit,
                        }}
                    />
                    <BorderedDiv className={classes.item}>
                        <TextEditor
                            readOnly={true}
                            id="instrucciones"
                            label="Instrucciones"
                            value={instrucciones}
                            onChange={this.onChange}
                            readOnly={!edit}
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
                            readOnly={!edit}
                        />
                    </BorderedDiv>

                    <Snackbar
                        open={successToastOpen}
                        autoHideDuration={2000}
                        onClose={this.handleToastClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <MuiAlert variant="filled" onClose={this.handleToastClose} severity="success">
                            Receta guardada correctamente
                        </MuiAlert>
                    </Snackbar>

                    {edit &&
                        <>
                            {sending ? <Loader /> : (
                                <Button
                                    className={classes.send}
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    children="Guardar"
                                />
                            )}
                        </>
                    }
                </form>
            </Container>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RecetaForm))