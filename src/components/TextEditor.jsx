import { Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react'
import RichTextEditor from 'react-rte';

const style = theme => ({
    label: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    editor: {
        border: "none",
    },
    innerEditor: {
        fontFamily: theme.typography.fontFamily
    }
})

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: RichTextEditor.createEmptyValue(),
        }

        this.onChange = this.onChange.bind(this)
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
        const { id, classes, label, ...restProps } = this.props
        const { value } = this.state
        return (
            <div {...restProps}>
                <Typography className={classes.label} variant="body1">
                    {label}
                </Typography>
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