import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container, IconButton, InputAdornment, TextField, withStyles
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import { changeAlimentoAccesible, getAlimentos } from '../../store/actions'
import BorderedDiv from '../common/BorderedDiv'
import Loader from '../common/Loader';
import ResumenAlimentos from './ResumenAlimentos';


const style = theme => ({
    header: {
        margin: theme.spacing(2)
    },
    filter: {},
    refresh: {
        float: 'right',
    },
    list: {
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
        this.handleAccesibleChange = this.handleAccesibleChange.bind(this)
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

    handleAccesibleChange(e) {
        const {id, checked} =  e.target;
        console.log(id, checked)
        this.props.changeAlimentoAccesible(parseInt(id), checked)
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
            <>
                <Container maxWidth="md">
                    <div className={classes.header}>
                        <TextField
                            className={classes.filter}
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
                        <BorderedDiv className={classes.list}>
                            {filteredList.map((alimento) => (
                                <ResumenAlimentos
                                    key={alimento.numero}
                                    alimento={alimento}
                                    onChange={this.handleAccesibleChange}
                                    re={re}
                                />
                            ))}
                        </BorderedDiv>
                    }
                </Container>
            </>
        )
    }
}

const mapStateToProps = state => ({
    fetching: state.fetchingAlimentos,
    alimentos: state.alimentos
})

const mapDispatchToProps = dispatch => ({
    getAlimentos: () => dispatch(getAlimentos()),
    changeAlimentoAccesible: (alimentoId, esAccesible) => dispatch(changeAlimentoAccesible(alimentoId, esAccesible)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ListaAlimentos))
