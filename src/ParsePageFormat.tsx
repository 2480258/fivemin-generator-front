import React, { SyntheticEvent } from "react";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

type ParsePageFormatProps = {
    onGlobalChanged: (global: string) => void
}

type ParsePageFormatState = {
    bookName: string,
    globalConditionRegex: string
}

class ParsePageFormat extends React.Component<ParsePageFormatProps, ParsePageFormatState> {
    constructor(props: ParsePageFormatProps) {
        super(props)

        this.state = {
            bookName: '',
            globalConditionRegex: ''
        }

        this.onBookNameChanged = this.onBookNameChanged.bind(this)
        this.onGlobalConditionRegexChanged = this.onGlobalConditionRegexChanged.bind(this)
    }

    onBookNameChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            bookName: e.currentTarget.value
        })

    }

    onGlobalConditionRegexChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            globalConditionRegex: e.currentTarget.value
        })

        this.props.onGlobalChanged(e.currentTarget.value)
    }



    readonly bookNamePopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Parser</Popover.Header>
            <Popover.Body>
                Book Name is for specifiying configuration and root directory name.
            </Popover.Body>
        </Popover>
    )


    readonly globalConditionPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Parser</Popover.Header>
            <Popover.Body>
                Global Condiiton is a regex restricting request that doesn't match with requesting URL. <br />All requests should match this regex, including external and link attributes.
                <br /><strong>Please make sure that external attributes are matching with global condition or they will be rejected.</strong>
            </Popover.Body>
        </Popover>
    )

    render() {
        return (
            <div>
                <Stack gap={5}>
                    <div>
                        <p>BookName:</p>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.bookNamePopover}>
                            <input
                                type="text"
                                value={this.state.bookName}
                                onChange={this.onBookNameChanged}
                            />
                        </OverlayTrigger>
                    </div>
                    <div>
                        <p>GlobalConditionRegex:</p>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.globalConditionPopover}>
                            <input
                                type="text"
                                value={this.state.globalConditionRegex}
                                onChange={this.onGlobalConditionRegexChanged}
                            />
                        </OverlayTrigger>
                    </div>
                </Stack>
            </div>
        )
    }
}

export default ParsePageFormat