import React, { SyntheticEvent } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";


type RequesterFormatProps = {

}

type RequesterFormatState = {
    userAgent: string
}

class RequesterFormat extends React.Component<RequesterFormatProps, RequesterFormatState> {
    constructor(props: RequesterFormatProps) {
        super(props)

        this.state = { userAgent: 'FiveMinCrawler/1.0' }
        this.onUserAgentChanged = this.onUserAgentChanged.bind(this)
    }


    onUserAgentChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            userAgent: e.currentTarget.value
        })
    }


    readonly userAgentPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Configurating Request</Popover.Header>
            <Popover.Body>
                User-Agent is for notifying type of client application. You can provide custom user-agent string.
            </Popover.Body>
        </Popover>
    )

    render() {
        return (
            <div>

                <h1>Web Request Configurator</h1>
                <br />
                <p>Here section is for describing web requesting related actions.</p>
                <p>Hover or focus input box for more information.</p>
                <hr />

                <p>UserAgent:</p>
                <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.userAgentPopover}>
                    <input
                        type="text"
                        value={this.state.userAgent}
                        onChange={this.onUserAgentChanged}
                    />
                </OverlayTrigger>
            </div>
        )
    }
}

export default RequesterFormat