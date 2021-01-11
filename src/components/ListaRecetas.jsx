import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Button, Container, IconButton, InputAdornment, TextField, Typography, withStyles
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { getRecetas } from '../store/actions'
import NavBar from './common/NavBar';
import BorderedDiv from './common/BorderedDiv'


const ResumenReceta = withStyles(theme => ({
    container: {
        display: "flex",
        margin: theme.spacing(1),
    },
    title: {
        margin: "auto",
        marginLeft: theme.spacing(2),
        flexGrow: 1,
    },
}))(
    ({ receta, re, classes }) => {
        let title
        if (re != null) {
            const split = receta.nombre.split(re)
            const highlight = receta.nombre.match(re)
            const arr = Array.from(Array(split.length + highlight.length).keys())
            title = <Typography className={`titulo ${classes.title}`} variant="h6">
                {arr.map(index => {
                    const i = Math.floor(index / 2)
                    if (index % 2 === 0) {
                        return split[i]
                    } else {
                        return <b>{highlight[i]}</b>
                    }
                })}
            </Typography>
        } else {
            title = <Typography className={`titulo ${classes.title}`} variant="h6">
                {receta.nombre}
            </Typography>
        }

        return (
            <div className={classes.container}>
                {title}
                <IconButton component={Link} to={`/${receta.idReceta}`}>
                    <EditIcon className="icon" />
                </IconButton>
                <IconButton component={Link} to={`/${receta.idReceta}`}>
                    <DeleteIcon color="error" />
                </IconButton>
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
    new: {
        margin: theme.spacing(1),
        marginRight: 0,
        float: "right",
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
            filter: ""
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
        const { recetas, classes } = this.props
        if (!recetas) {
            return <p>Loading...</p>
        }
        const re = filter ? new RegExp(filter, 'ig') : null
        const filteredList = re != null ?
            recetas.filter(receta => receta.nombre.match(re))
            : recetas
        return (
            <>
                <NavBar />
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
                            to="/new"
                        >
                            Nueva Receta
                    </Button>
                    </div>
                    <div className={classes.list}>
                        {filteredList.map(receta => (
                            <BorderedDiv className={classes.item} key={receta.idReceta}>
                                <ResumenReceta receta={receta} re={re} />
                            </BorderedDiv>
                        ))}
                    </div>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ListaRecetas))
