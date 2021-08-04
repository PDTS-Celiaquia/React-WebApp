import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container, IconButton, InputAdornment, TextField, withStyles
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import { getAlimentos } from '../../store/actions'
import BorderedDiv from '../common/BorderedDiv'
import Loader from '../common/Loader';
import ElementoLista from '../common/ElementoLista';


const style = theme => ({
    header: {
        margin: theme.spacing(2)
    },
    refresh: {
        float: 'right',
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
                    <TextField
                        value={filter}
                        onChange={this.handleFilterChange}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton
                        className={classes.refresh}
                        onClick={this.refresh}
                    >
                        <RefreshIcon />
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
