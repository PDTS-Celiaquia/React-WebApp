import React, { Component } from 'react';
import { Button, Container, TextField, Typography, withStyles, Snackbar } from '@material-ui/core';
import { registerService } from '../../services/auth';
import Loader from '../common/Loader';
import MuiAlert from '@material-ui/lab/Alert';


const styles = theme => ({
    title: {
        color: theme.palette.text.primary,
    },
    container: {
        marginTop: theme.spacing(2)
    },
    element: {
        marginTop: theme.spacing(2),
        margin: "auto"
    }
})

class RegisterOperarioPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            passwordConfirm: "",
            passwordsNotMatch: false,
            successToastOpen: false,
            error: null,
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleToastClose = this.handleToastClose.bind(this);
        this.register = this.register.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value })
    }

    register(e) {
        e.preventDefault()
        const { nombre, apellido, email, password, passwordConfirm } = this.state
        if (password === passwordConfirm) {
            this.setState({ passwordsNotMatch: false, error: null, loading: true })
            registerService({ nombre, apellido, email, password })
                .then(
                    () => this.setState({successToastOpen: true, loading: false}),
                    error => this.setState({ error, loading: false })
                )
        } else {
            this.setState({ passwordsNotMatch: true })
        }
    }

    handleToastClose(e, reason){
        if (reason === 'clickaway') {
          return;
        }
        this.setState({successToastOpen: false});
    };

    render() {
        const { nombre, apellido, email, password, passwordConfirm, passwordsNotMatch, successToastOpen, error, loading } = this.state
        const { classes } = this.props
        return (
            <Container className={classes.container} maxWidth="xs">
                {error && (
                    <Typography color="error" variant="body1">
                        Ya existe un usuario con el email ingresado.
                    </Typography>
                )}
                <Typography className={classes.title} variant="h6">
                    Registro de Operario
                </Typography>
                <form onSubmit={this.register}>
                    <TextField
                        className={classes.element}
                        id="nombre"
                        type="text"
                        label="Nombre"
                        fullWidth
                        variant="outlined"
                        required
                        autoComplete="given-name"
                        value={nombre}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className={classes.element}
                        id="apellido"
                        type="text"
                        label="Apellido"
                        fullWidth
                        variant="outlined"
                        required
                        autoComplete="family-name"
                        value={apellido}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className={classes.element}
                        id="email"
                        type="email"
                        label="Correo electr??nico"
                        fullWidth
                        variant="outlined"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className={classes.element}
                        id="password"
                        type="password"
                        label="Contrase??a"
                        fullWidth
                        variant="outlined"
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className={classes.element}
                        id="passwordConfirm"
                        type="password"
                        label="Confirmar contrase??a"
                        fullWidth
                        variant="outlined"
                        required
                        error={passwordsNotMatch}
                        helperText={passwordsNotMatch && "Las contrase??as no coinciden"}
                        autoComplete="new-password"
                        value={passwordConfirm}
                        onChange={this.handleChange}
                    />
                    <Snackbar 
                        open={successToastOpen} 
                        autoHideDuration={2000} 
                        onClose={this.handleToastClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <MuiAlert variant="filled" onClose={this.handleToastClose} severity="success">
                            Operario registrado correctamente
                        </MuiAlert>
                    </Snackbar>
                    {loading ? <Loader /> : (
                        <Button
                            id="submit"
                            className={classes.element}
                            type="submit"
                            fullWidth
                            color="primary"
                            variant="contained"
                        >
                            ACEPTAR
                        </Button>
                    )}
                </form>
            </Container>
        )
    }
}

export default withStyles(styles)(RegisterOperarioPage);
