import React, { Component } from 'react'
import { Container, TextField } from '@material-ui/core'
import TextEditor from './TextEditor'

class RecetaForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            descripcion: "",
            instrucciones: ""
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const { id, value } = e.target;

        this.setState({ [id]: value }, () => console.debug(this.state))
    }

    render() {
        const { nombre, descripcion } = this.state
        return (
            <Container maxWidth="md">
                <TextField
                    id="nombre"
                    label="Nombre"
                    value={nombre}
                    onChange={this.onChange}
                    fullWidth
                />
                <TextField
                    id="descripcion"
                    label="Descripcion"
                    value={descripcion}
                    onChange={this.onChange}
                    multiline
                    fullWidth
                />
                <TextEditor
                    id="instrucciones"
                    onChange={this.onChange}
                />
            </Container>
        )
    }
}

export default RecetaForm