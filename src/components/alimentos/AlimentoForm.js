import { Container, IconButton, Typography, withStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeAlimentoAccesible } from '../../store/actions';

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


        this.handleAccesibleChange = this.handleAccesibleChange.bind(this)
    }

    handleAccesibleChange(e) {
        const { checked } = e.target;
        const { id } = this.props.match.params
        this.props.changeAlimentoAccesible(parseInt(id), checked)
    }

    render() {
        const { classes, history } = this.props;
        const { id } = this.props.match.params
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
                <p>{`Vista de alimento id ${id}`}</p>
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
