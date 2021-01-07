import { Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react'
import RichTextEditor from 'react-rte';

const style = theme => ({
    editor: {
        border: "none",
        margin: -theme.spacing(1)
    },
    innerEditor: {
        fontFamily: theme.typography.fontFamily
    }
})

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: RichTextEditor.createValueFromString("<p></p>", "html"),
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
            <div {...restProps} >
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