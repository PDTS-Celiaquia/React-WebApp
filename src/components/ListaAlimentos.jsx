import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Button, Checkbox, Container, IconButton, InputAdornment, TextField, Typography, withStyles
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { getAlimentos, sendAlimento } from '../store/actions'
import BorderedDiv from './common/BorderedDiv'
import TypographyRe from './common/TypographyRe';


const ResumenAlimento = withStyles(theme => ({
    container: {
        display: "flex",
        margin: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.grey['100']
        }
    },
    title: {
        margin: "auto",
        marginLeft: theme.spacing(2),
        flexGrow: 1,
    },
}))(
    ({ alimento, re, onChange, classes }) => {
        return (
            <div className={classes.container}>
                <TypographyRe
                    className={`titulo ${classes.title}`}
                    title={alimento.nombre}
                    variant="h6"
                    re={re}
                />
                <Checkbox onChange={onChange} checked={alimento.esAccesible} />
            </div>
        )
    }
)

const style = theme => ({
    header: {
        margin: theme.spacing(2)
    },
    filter: {
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

        this.onFilterChange = this.onFilterChange.bind(this)
        this.onAccesibleChange = this.onAccesibleChange.bind(this)
    }

    componentDidMount() {
        this.props.getAlimentos()
    }

    onFilterChange(e) {
        const { value } = e.target
        this.setState({ filter: value })
    }

    onAccesibleChange(i, e) {
        const alimento = {...this.props.alimentos[i], esAccesible: e.target.checked}
        console.log(alimento)
        this.props.sendAlimento(alimento, i)
    }

    render() {
        const { filter } = this.state
        const { alimentos, classes } = this.props
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
                    </div>
                    <BorderedDiv className={classes.list}>
                        {filteredList.map((alimento, i) => (
                            <ResumenAlimento
                                key={alimento.numero}
                                alimento={alimento}
                                onChange={e => this.onAccesibleChange(i, e)}
                                re={re}
                            />
                        ))}
                    </BorderedDiv>
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
