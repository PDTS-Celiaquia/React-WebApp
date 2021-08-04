import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Button, Container, IconButton, InputAdornment, TextField, Typography, withStyles
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import { Link } from 'react-router-dom';
import { getRecetas } from '../../store/actions'
import BorderedDiv from '../common/BorderedDiv'
import Loader from '../common/Loader';
import ElementoLista from '../common/ElementoLista';


const style = theme => ({
    modalButtons: {
        margin: theme.spacing(2),
        marginBottom: 0
    },
    header: {
        margin: theme.spacing(2)
    },
    title: {
        margin: theme.spacing(2),
        marginLeft: 0,
        color: theme.palette.text.primary,
    },
    new: {
        margin: theme.spacing(1),
        marginRight: 0,
        float: "right",
    },
    refresh: {
        float: 'right',
        color: theme.palette.text.primary,
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
        }

        this.onFilterChange = this.onFilterChange.bind(this)
    }

    componentDidMount() {
        this.props.getRecetas()
    }

    onFilterChange(e) {
        const { value } = e.target
        this.setState({ filter: value })
    }

    render() {
        const { filter } = this.state
        const { recetas, fetching, classes } = this.props
        if (!recetas && !fetching) {
            return <p>Error</p>
        }
        const re = filter ? new RegExp(filter, 'ig') : null
        const filteredList = re != null ? recetas.filter(receta => receta.nombre.match(re)) : recetas
        return (
            <Container maxWidth="md">
                <div className={classes.header}>
                    <Typography className={classes.title} variant="h4">
                        Listado de recetas
                    </Typography>
                    <TextField
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
                        to={location => `${location.pathname}/new/edit`}
                    >
                        Nueva Receta
                    </Button>
                    <IconButton
                        className={classes.refresh}
                        onClick={this.refresh}
                    >
                        <Refresh />
                    </IconButton>
                </div>
                {fetching ? <Loader /> :
                    <>
                        {filteredList.map(receta => (
                            <BorderedDiv className={classes.item} key={receta.id}>
                                <ElementoLista
                                    id={receta.id}
                                    title={receta.nombre}
                                    variant="h6"
                                    re={re}
                                />
                            </BorderedDiv>
                        ))}
                    </>
                }
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    fetching: state.fetchingRecetas,
    recetas: state.recetas
})

const mapDispatchToProps = dispatch => ({
    getRecetas: () => dispatch(getRecetas())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ListaRecetas))
