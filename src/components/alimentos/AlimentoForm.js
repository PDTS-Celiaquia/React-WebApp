import React, { Component } from 'react'
import { Button, Checkbox, Container, IconButton, Typography, withStyles, FormControlLabel, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
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
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <p>nombre</p>
                            <p>clasif</p>
                            <p>genero_especie_variedad</p>
                            <p>tipo</p>
                            <p>energia_kJ</p>
                            <p>agua</p>
                            <p>proteina</p>
                            <p>grasa_total</p>
                            <p>carbohidrato_total</p>
                            <p>carbohidrato_disponible</p>
                            <p>fibra_dietetica</p>
                            <p>ceniza</p>
                            <p>sodio</p>
                            <p>potasio</p>
                            <p>calcio</p>
                            <p>fosforo</p>
                            <p>hierro</p>
                            <p>zinc</p>
                            <p>tiamina</p>
                            <p>rivoflavina</p>
                            <p>niacina</p>
                            <p>vitamina_c</p>
                            <p>acidos_grasos_saturados</p>
                            <p>acidos_grasos_monoinsaturados</p>
                            <p>acidos_grasos_poliinsaturados</p>
                            <p>colesterol</p>
                            <p>esAccesible</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p>{alimento.nombre}</p>
                            <p>{alimento.clasif}</p>
                            <p>{alimento.genero_especie_variedad}</p>
                            <p>{alimento.tipo}</p>
                            <p>{alimento.energia_kJ}</p>
                            <p>{alimento.agua}</p>
                            <p>{alimento.proteina}</p>
                            <p>{alimento.grasa_total}</p>
                            <p>{alimento.carbohidrato_total}</p>
                            <p>{alimento.carbohidrato_disponible}</p>
                            <p>{alimento.fibra_dietetica}</p>
                            <p>{alimento.ceniza}</p>
                            <p>{alimento.sodio}</p>
                            <p>{alimento.potasio}</p>
                            <p>{alimento.calcio}</p>
                            <p>{alimento.fosforo}</p>
                            <p>{alimento.hierro}</p>
                            <p>{alimento.zinc}</p>
                            <p>{alimento.tiamina}</p>
                            <p>{alimento.rivoflavina}</p>
                            <p>{alimento.niacina}</p>
                            <p>{alimento.vitamina_c}</p>
                            <p>{alimento.acidos_grasos_saturados}</p>
                            <p>{alimento.acidos_grasos_monoinsaturados}</p>
                            <p>{alimento.acidos_grasos_poliinsaturados}</p>
                            <p>{alimento.colesterol}</p>
                            <p>{alimento.esAccesible ? "si": "no"}</p>
                            {/* <Checkbox checked={alimento.esAccesible} onChange={this.handleAccesibleChange} /> */}
                        </Grid>
                        {/* <Button color="primary" variant="contained" onClick={this.saveChanges}>
                            GUARDAR CAMBIOS
                        </Button> */}
                    </Grid>
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
