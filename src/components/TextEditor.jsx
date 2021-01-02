import React, { Component } from 'react'
import RichTextEditor from 'react-rte';

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
        const { id } = this.props
        const { value } = this.state
        return (
            <RichTextEditor
                id={id}
                value={value}
                onChange={this.onChange}
            />
        )
    }
}

export default TextEditor