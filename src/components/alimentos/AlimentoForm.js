import { Button, Checkbox, Container, IconButton, Typography, withStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { findById } from '../../helpers/findById';
import { findAlimentoById } from '../../services/alimento.service';
import { changeAlimentoAccesible } from '../../store/actions';
import Loader from '../common/Loader';

const styles = theme => ({
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
})

class AlimentoForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            alimento: null,
            loading: true
        }

        this.handleAccesibleChange = this.handleAccesibleChange.bind(this)
    }

    async componentDidMount() {
        const { alimentos } = this.props;
        const { id } = this.props.match.params
        let alimento;
        if (alimentos) {
            alimento = findById(alimentos, id);
        } else {
            alimento = (await findAlimentoById(id)).data;
        }
        if (alimento) {
            this.setState({ alimento, loading: false })
        } else {
            // TODO: handle invalid id
            console.log("Add invalid id toast or screen")
        }
    }

    handleAccesibleChange(e) {
        const { checked } = e.target;
        this.setState(state => ({ ...state, alimento: { ...state.alimento, esAccesible: checked } }))

        // this.props.changeAlimentoAccesible(parseInt(id), checked)
    }

    saveChanges(e) {
        console.log("Save changes")
    }

    render() {
        const { classes, history } = this.props;
        const { alimento, loading } = this.state;
        return (
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
                        Vista de Alimento
                    </Typography>
                </div>
                {loading ? <Loader /> :
                    <>
                        <p>{JSON.stringify(alimento)}</p>
                        <Checkbox checked={alimento.esAccesible} onChange={this.handleAccesibleChange} />
                        <Button color="primary" variant="contained" onClick={this.saveChanges}>
                            GUARDAR CAMBIOS
                        </Button>
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
    changeAlimentoAccesible: (alimentoId, esAccesible) => dispatch(changeAlimentoAccesible(alimentoId, esAccesible)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AlimentoForm))
