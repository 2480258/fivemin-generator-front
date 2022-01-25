import { auto } from "@popperjs/core";
import React, { SyntheticEvent } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type HtmlBoxProps = {

}

type HtmlBoxState = {
    html: string
    uri: string
}

class HtmlBox extends React.Component<HtmlBoxProps, HtmlBoxState> {

    constructor(props: HtmlBoxProps) {
        super(props)

        this.state = { html: '', uri: '' }

        this.onTextBoxChanged = this.onTextBoxChanged.bind(this)
        this.onUriChanged = this.onUriChanged.bind(this)
    }

    onTextBoxChanged(e: SyntheticEvent<HTMLTextAreaElement>) {
        this.setState({ html: e.currentTarget.value })
    }

    onUriChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({ uri: e.currentTarget.value })
    }

    render() {
        return (
            <div className="html-box">
                <p>URI for this page: </p>
                <input
                    type="text"
                    value={this.state.uri}
                    onChange={this.onUriChanged}
                    className="html-uri"
                />
                <br />
                <br />
                <p>HTML content for this page: </p>
                <textarea
                    className="html-box-text-area"
                    value={this.state.html}
                    onChange={this.onTextBoxChanged}
                />

                <SyntaxHighlighter language="javascript" style={docco} className="html-highlighter">
                    {this.state.html}
                </SyntaxHighlighter>

            </div>
        )
    }
}

export default HtmlBox