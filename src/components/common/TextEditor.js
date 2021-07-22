import { Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react'
import RichTextEditor from 'react-rte';

function createValueFromString(string) {
    return RichTextEditor.createValueFromString(string, "html")
}


const style = theme => ({
    container: {
        margin: theme.spacing(2),
    },
    editor: {
        border: "none",
        marginRight: -theme.spacing(1),
        marginLeft: -theme.spacing(1),
    },
    innerEditor: {
        fontFamily: theme.typography.fontFamily
    }
})

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: createValueFromString("<p></p>"),
        }

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        const { value } = this.props;
        if (value) {
            this.setState({ value: createValueFromString(value) })
        }
    }

    onChange(value) {
        this.setState({ value })
        const { onChange, id } = this.props
        if (onChange) {
            const e = new Event('change')
            Object.defineProperty(e, 'target', {
                writable: false,
                value: {
                    id: id,
                    value: value.toString('html')
                }
            });
            onChange(e)
        }
    }

    render() {
        const { id, label, classes } = this.props
        const { value } = this.state
        return (
            <div className={classes.container}>
                {label && <Typography className="titulo" variant="body1" children={label} />}
                <RichTextEditor
                    editorClassName={classes.innerEditor}
                    className={classes.editor}
                    id={id}
                    value={value}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

export default withStyles(style)(TextEditor)