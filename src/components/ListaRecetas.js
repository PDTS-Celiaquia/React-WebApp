import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Button, CircularProgress, Container, IconButton, InputAdornment, TextField, withStyles
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { getRecetas } from '../store/actions'
import BorderedDiv from './common/BorderedDiv'
import TypographyRe from './common/TypographyRe';


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

        return (
            <div className={classes.container}>
                <TypographyRe
                    className={`titulo ${classes.title}`}
                    title={receta.nombre}
                    variant="h6"
                    re={re}
                />
                <IconButton component={Link} to={location => `${location.pathname}/${receta.idReceta}`}>
                    <EditIcon className="icon" />
                </IconButton>
                <IconButton onClick={() => console.log("Todavia no arme el flujo para borrar :)")}>
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
            filter: ""
        }

        this.refresh = this.refresh.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)
    }

    componentDidMount() {
        this.refresh()
    }

    refresh() {
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
        const filteredList = re != null ?
            recetas.filter(receta => receta.nombre.match(re))
            : recetas
        return (
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
                    <IconButton
                        className={classes.refresh}
                        onClick={this.refresh}
                    >
                        <RefreshIcon />
                    </IconButton>
                </div>
                {fetching ? <CircularProgress /> :
                    <div className={classes.list}>
                        {filteredList.map(receta => (
                            <BorderedDiv className={classes.item} key={receta.idReceta}>
                                <ResumenReceta receta={receta} re={re} />
                            </BorderedDiv>
                        ))}
                    </div>
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
    getRecetas: () => dispatch(getRecetas()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ListaRecetas))
