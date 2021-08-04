import React, { Component } from 'react'
import { Button, Container, TextField, withStyles, Typography, Modal, Paper, IconButton } from '@material-ui/core'
import { connect } from 'react-redux';
import IngredientesForm from './IngredientesForm';
import BorderedDiv from '../common/BorderedDiv';
import TextEditor from '../common/TextEditor'
import { findReceta } from '../../helpers/findReceta';
import { deleteReceta, getAlimentos, getUnidades } from '../../store/actions';
import Loader from '../common/Loader';
import { findRecetaById, saveReceta } from '../../services/receta.service';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

const DELETE_TEXT = "¿Está seguro que quiere eliminar la receta?"

const SEND_TEXT = "¿Está seguro que quiere guardar la receta?"

const newReceta = {
    nombre: "",
    descripcion: "",
    instrucciones: "<p></p>",
    ingredientes: [],
}

const style = theme => ({
    modal: {
        marginTop: "20%",
        padding: theme.spacing(5),
        textAlign: "center"
    },
    header: {
        margin: theme.spacing(2),
        display: "flex",
        marginLeft: 0,
        marginRight: 0,
    },
    backButton: {
        margin: theme.spacing(1),
        color: theme.palette.text.primary,
    },
    title: {
        color: theme.palette.text.primary,
        margin: "auto",
        marginLeft: 0,
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
    sendButton: {
        float: "right",
        margin: theme.spacing(1),
    },
})

class RecetaForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            receta: null,
            loading: true,
            sending: false,
            modalOpen: false
        }

        this.onChange = this.onChange.bind(this)
        this.onChangeIngredienteCombo = this.onChangeIngredienteCombo.bind(this)
        this.onChangeIngredienteText = this.onChangeIngredienteText.bind(this)
        this.deleteIngrediente = this.deleteIngrediente.bind(this)
        this.addIngrediente = this.addIngrediente.bind(this)
        this.sendReceta = this.sendReceta.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.deleteReceta = this.deleteReceta.bind(this)
        this.handleSend = this.handleSend.bind(this)
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

    async sendReceta() {
        this.setState({ sending: true })
        await saveReceta(this.state.receta)
        this.setState({ sending: false })
        this.closeModal()
        this.props.history.goBack()
    }

    openModal(text, callback) {
        this.setState({ modalOpen: true, modalText: text, modalCallback: callback })
    }

    closeModal() {
        this.setState({ modalOpen: false, })
    }

    deleteReceta() {
        this.props.deleteReceta(this.state.receta.id)
        this.props.history.push("/receta")
        this.closeModal()
    }

    handleSend(e) {
        e.preventDefault();
        this.openModal(SEND_TEXT, this.sendReceta);
    }

    render() {
        const {
            receta, loading, sending,
            modalOpen, modalText, modalCallback
        } = this.state;
        const {
            fetchingRecetas, fetchingAlimentos, fetchingUnidades,
            alimentos, unidadesDeMedida, edit,
            history, match, classes
        } = this.props

        if (loading || fetchingRecetas || fetchingAlimentos || fetchingUnidades) {
            return <Loader />
        }
        const { nombre, descripcion, instrucciones, ingredientes } = receta;
        return (
            <>
                <Modal
                    open={modalOpen}
                    onClose={this.closeModal}
                >
                    <Container maxWidth="sm">
                        <Paper className={classes.modal}>
                            <Typography variant="body1">
                                {modalText}
                            </Typography>
                            {sending ?
                                <Loader />
                                :
                                <>
                                    <Button
                                        className={classes.modalButtons}
                                        variant="contained"
                                        color="primary"
                                        onClick={this.closeModal}
                                    >
                                        CANCELAR
                                    </Button>
                                    <Button
                                        className={classes.modalButtons}
                                        variant="contained"
                                        onClick={modalCallback}
                                    >
                                        CONFIRMAR
                                    </Button>
                                </>
                            }
                        </Paper>
                    </Container>
                </Modal>
                <Container maxWidth="md">
                    <div className={classes.header}>
                        <IconButton
                            className={classes.backIcon}
                            edge="start"
                            onClick={history.goBack}
                            aria-label="back"
                        >
                            <ArrowBack />
                        </IconButton>
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
                            <Button
                                className={classes.deleteButton}
                                variant="contained"
                                onClick={() => this.openModal(DELETE_TEXT, this.deleteReceta)}
                            >
                                Eliminar
                            </Button>
                        </>
                        }
                    </div>
                    <form onSubmit={this.handleSend}>
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

                        {edit &&
                            <Button
                                className={classes.sendButton}
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Guardar
                            </Button>
                        }
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
    deleteReceta: id => dispatch(deleteReceta(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RecetaForm))