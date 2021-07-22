import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container, IconButton, InputAdornment, TextField, withStyles
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import { getAlimentos, sendAlimento } from '../../store/actions'
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
        this.onFilterChange = this.onFilterChange.bind(this)
        this.onAccesibleChange = this.onAccesibleChange.bind(this)
    }

    componentDidMount() {
        this.refresh()
    }

    refresh() {
        this.props.getAlimentos()
    }

    onFilterChange(e) {
        const { value } = e.target
        this.setState({ filter: value })
    }

    onAccesibleChange(i, e) {
        const alimento = { ...this.props.alimentos[i], esAccesible: e.target.checked }
        console.log(alimento)
        this.props.sendAlimento(alimento, i)
    }

    render() {
        const { filter } = this.state
        const { alimentos, fetching, classes } = this.props
        if (!alimentos) {
            return <p>Loading...</p>
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
                        <IconButton
                            className={classes.refresh}
                            onClick={this.refresh}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </div>
                    {fetching ? <Loader /> :
                        <BorderedDiv className={classes.list}>
                            {filteredList.map((alimento, i) => (
                                <ResumenAlimentos
                                    key={alimento.numero}
                                    alimento={alimento}
                                    onChange={e => this.onAccesibleChange(i, e)}
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
    sendAlimento: (alimento, index) => dispatch(sendAlimento(alimento, index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ListaAlimentos))
