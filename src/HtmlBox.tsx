import { auto } from "@popperjs/core";
import React, { SyntheticEvent } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type HtmlBoxProps = {
    onUriChanged: (uri: string) => void
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

        this.props.onUriChanged(e.currentTarget.value)
    }

    readonly URLBoxPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <p>Paste your sample target URL. This will be used verification of parsing result.</p>
            </Popover.Body>
        </Popover>
    );


    readonly HtmlBoxPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <p>Paste your sample target HTML. This will be used verification of parsing result.</p>
            </Popover.Body>
        </Popover>
    );

    render() {
        return (
            <div className="html-box">
                <OverlayTrigger trigger={["hover", "focus"]} placement="left" overlay={this.URLBoxPopover}>
                    <div>
                        <p>Sample URL for this page: </p>
                        <input
                            type="text"
                            value={this.state.uri}
                            onChange={this.onUriChanged}
                            className="html-uri"
                        />
                    </div>
                </OverlayTrigger>
                <br />
                <br />

                <OverlayTrigger trigger={["hover", "focus"]} placement="left" overlay={this.HtmlBoxPopover}>
                    <div>
                        <p>Sample HTML content for this page: </p>
                        <textarea
                            className="html-box-text-area"
                            value={this.state.html}
                            onChange={this.onTextBoxChanged}
                        />
                    </div>
                </OverlayTrigger>

                <SyntaxHighlighter language="javascript" style={docco} className="html-highlighter">
                    {this.state.html}
                </SyntaxHighlighter>

            </div>
        )
    }
}

export default HtmlBox