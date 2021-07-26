import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Button, Container, IconButton, InputAdornment, Modal, Paper, TextField, Typography, withStyles
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Link } from 'react-router-dom';
import { deleteReceta, getRecetas } from '../../store/actions'
import BorderedDiv from '../common/BorderedDiv'
import Loader from '../common/Loader';
import ResumenReceta from './ResumenReceta';


const style = theme => ({
    modal: {
        marginTop: "20%",
        padding: theme.spacing(5),
        textAlign: "center"
    },
    modalButtons: {
        margin: theme.spacing(2),
        marginBottom: 0
    },
    header: {
        margin: theme.spacing(2)
    },
    filter: {
    },
    new: {
        margin: theme.spacing(1),
        marginRight: 0,
        float: "right",
    },
    refresh: {
        float: 'right',
    },
    list: {

    },
    item: {
        margin: theme.spacing(2),
    },
})


class ListaRecetas extends Component {

    constructor(props) {
        super(props)

        this.state = {
            filter: "",
            deleteModalOpen: false,
            recetaDeleteId: null
        }

        this.onFilterChange = this.onFilterChange.bind(this)
        this.openDeleteModal = this.openDeleteModal.bind(this)
        this.closeDeleteModal = this.closeDeleteModal.bind(this)
    }

    componentDidMount() {
        this.props.getRecetas()
    }

    onFilterChange(e) {
        const { value } = e.target
        this.setState({ filter: value })
    }

    openDeleteModal(id) {
        this.setState({ deleteModalOpen: true, recetaDeleteId: id })
    }

    deleteReceta(id) {
        this.props.deleteReceta(id)
        this.closeDeleteModal()
    }

    closeDeleteModal() {
        this.setState({ deleteModalOpen: false, recetaDeleteId: null })
    }

    render() {
        const { filter, deleteModalOpen, recetaDeleteId } = this.state
        const { recetas, fetching, classes } = this.props
        if (!recetas && !fetching) {
            return <p>Error</p>
        }
        const re = filter ? new RegExp(filter, 'ig') : null
        const filteredList = re != null ? recetas.filter(receta => receta.nombre.match(re)) : recetas
        return (
            <>
                <Modal
                    open={deleteModalOpen}
                    onClose={this.closeDeleteModal}
                >
                    <Container maxWidth="sm">
                        <Paper className={classes.modal}>
                            <Typography variant="body1">
                                ¿Está seguro que quiere eliminar la receta?
                            </Typography>
                            <Button
                                className={classes.modalButtons}
                                variant="contained"
                                color="primary"
                                onClick={this.closeDeleteModal}
                            >
                                CANCELAR
                            </Button>
                            <Button
                                className={classes.modalButtons}
                                variant="contained"
                                onClick={() => this.deleteReceta(recetaDeleteId)}
                            >
                                ELIMINAR
                            </Button>
                        </Paper>
                    </Container>
                </Modal>
                <Container maxWidth="md">
                    <div className={classes.header}>
                        <TextField
                            className={classes.filter}
                            value={filter}
                            onChange={this.onFilterChange}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            className={classes.new}
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={location => `${location.pathname}/new`}
                        >
                            Nueva Receta
                        </Button>
                        <IconButton
                            className={classes.refresh}
                            onClick={this.refresh}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </div>
                    {fetching ? <Loader /> :
                        <div className={classes.list}>
                            {filteredList.map(receta => (
                                <BorderedDiv className={classes.item} key={receta.id}>
                                    <ResumenReceta
                                        receta={receta}
                                        re={re}
                                        onDelete={() => this.openDeleteModal(receta.id)}
                                    />
                                </BorderedDiv>
                            ))}
                        </div>
                    }
                </Container>
            </>
        )
    }
}

const mapStateToProps = state => ({
    fetching: state.fetchingRecetas,
    recetas: state.recetas
})

const mapDispatchToProps = dispatch => ({
    getRecetas: () => dispatch(getRecetas()),
    deleteReceta: id => dispatch(deleteReceta(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ListaRecetas))
