import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container, IconButton, InputAdornment, TextField, Typography, withStyles
} from '@material-ui/core'
import { getAlimentos } from '../../store/actions'
import BorderedDiv from '../common/BorderedDiv'
import Loader from '../common/Loader';
import ElementoLista from '../common/ElementoLista';
import { Refresh, Search } from '@material-ui/icons';


const style = theme => ({
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
    }
})


class ListaAlimentos extends Component {

    constructor(props) {
        super(props)

        this.state = {
            filter: ""
        }

        this.refresh = this.refresh.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    componentDidMount() {
        this.refresh()
    }

    refresh() {
        this.props.getAlimentos()
    }

    handleFilterChange(e) {
        const { value } = e.target
        this.setState({ filter: value })
    }

    render() {
        const { filter } = this.state
        const { alimentos, fetching, classes } = this.props
        if (!alimentos) {
            return <Loader />
        }
        const re = filter ? new RegExp(filter, 'ig') : null
        const filteredList = re != null ?
            alimentos.filter(alimento => alimento.nombre.match(re))
            : alimentos
        return (
            <Container maxWidth="md">
                <div className={classes.header}>
                    <Typography className={classes.title} variant="h4">
                        Listado de alimentos
                    </Typography>
                    <TextField
                        value={filter}
                        onChange={this.handleFilterChange}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton
                        className={classes.refresh}
                        onClick={this.refresh}
                    >
                        <Refresh />
                    </IconButton>
                </div>
                {fetching ? <Loader /> :
                    <>
                        {filteredList.map((alimento) => (
                            <BorderedDiv className={classes.item} key={alimento.id}>
                                <ElementoLista
                                    id={alimento.id}
                                    title={alimento.nombre}
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
    fetching: state.fetchingAlimentos,
    alimentos: state.alimentos
})

const mapDispatchToProps = dispatch => ({
    getAlimentos: () => dispatch(getAlimentos()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ListaAlimentos))
