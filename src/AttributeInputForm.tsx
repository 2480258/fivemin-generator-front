import React, { SyntheticEvent } from "react";
import { Button, ButtonGroup, Dropdown, Form, OverlayTrigger, Popover, Stack, ToggleButton } from "react-bootstrap";
import AttributeListForm from "./AttributeListForm";
import AttributeVerifyAlert from "./AttributeVerifyAlert";
import VerifyDataService from "./VerifyDataService";

export type HtmlData = {
    html: string,
    uri: string
}

type AttributeSelectButtonProps = {
    onButtonChanged: (msg: string) => void
    id: number
}

type AttributeSelectButtonState = {
    type: string
}

type AttributeInputFormProps = {
    getHtmlData: () => HtmlData
    id: number
}

type AttributeInputFormState = {
    type: string
}

type InternalAttributeFromProps = {
    getHtmlData: () => HtmlData
}

export type InternalAttributeFormState = {
    name: string
    regex: string
    parseMode: string
}


type ExternalAttributeFromProps = {
    getHtmlData: () => HtmlData
}

export type ExternalAttributeFormState = {
    name: string
    regex: string
    uriRegex: string
}


type LinkAttributeFromProps = {
    getHtmlData: () => HtmlData
}

type LinkAttributeFormState = {
    name: string
    regex: string
    uriRegex: string
    preDest: string
    preDestSwitch: boolean
}

interface AttributeJsonConvertable {

}

class AttributeSelectButton extends React.Component<AttributeSelectButtonProps, AttributeSelectButtonState> {
    readonly INTERNAL_ATTRIBUTE = "Internal"
    readonly EXTERNAL_ATTRIBUTE = "External"
    readonly LINK_ATTRIBUTE = "Link"

    constructor(props: AttributeSelectButtonProps) {
        super(props)

        this.state = { type: this.INTERNAL_ATTRIBUTE }

        this.onInternalClick = this.onInternalClick.bind(this)
        this.onExternalClick = this.onExternalClick.bind(this)
        this.onLinkClick = this.onLinkClick.bind(this)
    }

    onInternalClick(e: SyntheticEvent<HTMLElement>) {
        this.setState({
            type: this.INTERNAL_ATTRIBUTE
        })

        this.props.onButtonChanged(this.INTERNAL_ATTRIBUTE)
    }

    onExternalClick(e: SyntheticEvent<HTMLElement>) {
        this.setState({
            type: this.EXTERNAL_ATTRIBUTE
        })

        this.props.onButtonChanged(this.EXTERNAL_ATTRIBUTE)
    }

    onLinkClick(e: SyntheticEvent<HTMLElement>) {
        this.setState({
            type: this.LINK_ATTRIBUTE
        })

        this.props.onButtonChanged(this.LINK_ATTRIBUTE)
    }

    readonly internalPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Selecting attribute type</Popover.Header>
            <Popover.Body>
                <strong>Internal Attribute</strong>
                <br />
                Internal Attribute is attribute from downloaded html pages, and can be saved as JSON format.
            </Popover.Body>
        </Popover>
    );

    readonly externalPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Selecting attribute type</Popover.Header>
            <Popover.Body>
                <strong>External Attribute</strong>
                <br />
                External Attribute is attribute that should be downloaded later. (images or other files)
            </Popover.Body>
        </Popover>
    )

    readonly linkPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Selecting attribute type</Popover.Header>
            <Popover.Body>
                <strong>Link Attribute</strong>
                <br />
                Link Attribute is attribute that should be requested and parsed further.
            </Popover.Body>
        </Popover>
    )

    render() {
        return (
            <div className="attribute-type-select">
                <ButtonGroup>
                    <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.internalPopover}>
                        <ToggleButton value={this.INTERNAL_ATTRIBUTE} type="radio" onClick={this.onInternalClick} active={this.state.type === this.INTERNAL_ATTRIBUTE}>
                            Internal
                        </ToggleButton>
                    </OverlayTrigger>

                    <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.externalPopover}>
                        <ToggleButton value={this.EXTERNAL_ATTRIBUTE} type="radio" onClick={this.onExternalClick} active={this.state.type === this.EXTERNAL_ATTRIBUTE}>
                            External
                        </ToggleButton>
                    </OverlayTrigger>

                    <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.linkPopover}>
                        <ToggleButton value={this.LINK_ATTRIBUTE} type="radio" onClick={this.onLinkClick} active={this.state.type === this.LINK_ATTRIBUTE}>
                            Link
                        </ToggleButton>
                    </OverlayTrigger>
                </ButtonGroup>
            </div >
        )
    }
}


class LinkAttributeInputForm extends React.Component<LinkAttributeFromProps, LinkAttributeFormState> implements AttributeJsonConvertable {
    attributeVerifyAlertRef: AttributeVerifyAlert | null = null

    constructor(props: LinkAttributeFromProps) {
        super(props)

        this.state = {
            name: "",
            regex: "",
            uriRegex: "",
            preDest: "",
            preDestSwitch: false
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onRegexChange = this.onRegexChange.bind(this)
        this.onUriRegexChange = this.onUriRegexChange.bind(this)
        this.onPreDestChange = this.onPreDestChange.bind(this)
        this.onPreDestSwitchChange = this.onPreDestSwitchChange.bind(this)
        this.onVerify = this.onVerify.bind(this)

    }

    onNameChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            name: e.currentTarget.value
        })

        this.attributeVerifyAlertRef?.onAttributeChanged()
    }

    onRegexChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            regex: e.currentTarget.value
        })

        this.attributeVerifyAlertRef?.onAttributeChanged()
    }

    onUriRegexChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            uriRegex: e.currentTarget.value
        })

        this.attributeVerifyAlertRef?.onAttributeChanged()
    }

    onPreDestChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            preDest: e.currentTarget.value
        })
    }

    onVerify() {
        let htmlData = this.props.getHtmlData()

        this.attributeVerifyAlertRef?.onVerifyExternalAttributeRequest({
            name: this.state.name,
            queryStr: this.state.regex,
            uriRegex: this.state.uriRegex,

            html: htmlData.html,
            hostUri: htmlData.uri
        })
    }

    onPreDestSwitchChange(e: SyntheticEvent<HTMLInputElement>) {
        let checked = e.currentTarget.checked
        this.setState({
            preDestSwitch: checked
        })
    }

    readonly namePopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <strong>Name</strong>
                <br />
                Name of attribute. Should be <strong>unique</strong> in page scope and recommend being unique in global
                scope due to possible file duplication.
            </Popover.Body>
        </Popover>
    );

    readonly queryStrPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <strong>Query String</strong>
                <br />
                CSS selector or JSoup query string select range of query. <i>(optional; default is select all)</i>
            </Popover.Body>
        </Popover>
    );

    readonly uriRegexPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <strong>Uri Regex</strong>
                <br />
                Filters URL to downloaded by given regex.
            </Popover.Body>
        </Popover>
    );

    readonly verifyPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                You can verify parse result of this attribute by clicking this button.
                Evaluation result by backend will be displayed.
                <hr />
                <strong>Please make sure that you fill right Html and URL box.</strong>
            </Popover.Body>
        </Popover>
    )

    readonly preDestPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <strong>Pre Dest Page</strong>
                <br />
                Pins Page parsing to specified name. It's useful when hard to get regex that matches with Page
            </Popover.Body>
        </Popover>
    )


    render() {
        return (
            <div>
                <Stack gap={5}>
                    <div>
                        <br />
                        Name:<br />
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.namePopover}>
                            <input type="text" value={this.state.name} onChange={this.onNameChange} />
                        </OverlayTrigger>

                    </div>
                    <div>
                        Query String:<br />
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.queryStrPopover}>
                            <input type="text" value={this.state.regex} onChange={this.onRegexChange} />
                        </OverlayTrigger>
                    </div>
                    <div>
                        UriRegex:<br />

                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.uriRegexPopover}>
                            <input type="text" value={this.state.uriRegex} onChange={this.onUriRegexChange} />
                        </OverlayTrigger>

                    </div>
                    <div>
                        <Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Enable PreDest"
                                onChange={this.onPreDestSwitchChange}
                            />
                        </Form>
                        {this.state.preDestSwitch ? (
                            <div>
                                PreDest:<br />

                                <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.preDestPopover}>
                                    <input type="text" value={this.state.preDest} onChange={this.onPreDestChange} />
                                </OverlayTrigger>
                            </div>
                        ) : (
                            <div>
                            </div>
                        )}
                    </div>
                </Stack >
                <br />
                <br />
                <br />
                <AttributeVerifyAlert ref={refs => this.attributeVerifyAlertRef = refs}>

                </AttributeVerifyAlert>

                <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.verifyPopover}>
                    <Button onClick={this.onVerify}>Verify</Button>
                </OverlayTrigger>
            </div >
        )
    }
}


class ExternalAttributeInputForm extends React.Component<ExternalAttributeFromProps, ExternalAttributeFormState> implements AttributeJsonConvertable {
    attributeVerifyAlertRef: AttributeVerifyAlert | null = null

    constructor(props: LinkAttributeFromProps) {
        super(props)

        this.state = {
            name: "",
            regex: "",
            uriRegex: ""
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onRegexChange = this.onRegexChange.bind(this)
        this.onUriRegexChange = this.onUriRegexChange.bind(this)
        this.onVerify = this.onVerify.bind(this)

    }

    onNameChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            name: e.currentTarget.value
        })

        this.attributeVerifyAlertRef?.onAttributeChanged()
    }

    onRegexChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            regex: e.currentTarget.value
        })

        this.attributeVerifyAlertRef?.onAttributeChanged()
    }

    onUriRegexChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            uriRegex: e.currentTarget.value
        })

        this.attributeVerifyAlertRef?.onAttributeChanged()
    }

    onVerify() {
        let htmlData = this.props.getHtmlData()

        this.attributeVerifyAlertRef?.onVerifyExternalAttributeRequest({
            name: this.state.name,
            queryStr: this.state.regex,
            uriRegex: this.state.uriRegex,

            html: htmlData.html,
            hostUri: htmlData.uri
        })
    }

    readonly namePopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <strong>Name</strong>
                <br />
                Name of attribute. Should be <strong>unique</strong> in page scope and recommend being unique in global
                scope due to possible file duplication.
            </Popover.Body>
        </Popover>
    );

    readonly queryStrPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <strong>Query String</strong>
                <br />
                CSS selector or JSoup query string select range of query. <i>(optional; default is select all)</i>
            </Popover.Body>
        </Popover>
    );

    readonly uriRegexPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <strong>Uri Regex</strong>
                <br />
                Filters URL to downloaded by given regex.
            </Popover.Body>
        </Popover>
    );

    readonly verifyPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Verifying attribute</Popover.Header>
            <Popover.Body>
                You can verify parse result of this attribute by clicking this button.
                Evaluation result by backend will be displayed.
                <hr />
                <strong>Please make sure that you fill right Html and URL box.</strong>
            </Popover.Body>
        </Popover>
    )

    render() {
        return (
            <div>
                <Stack gap={5}>
                    <div>
                        <br />
                        Name:<br />
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.namePopover}>
                            <input type="text" value={this.state.name} onChange={this.onNameChange} />
                        </OverlayTrigger>

                    </div>
                    <div>
                        Query String:<br />
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.queryStrPopover}>
                            <input type="text" value={this.state.regex} onChange={this.onRegexChange} />
                        </OverlayTrigger>
                    </div>
                    <div>
                        UriRegex:<br />

                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.uriRegexPopover}>
                            <input type="text" value={this.state.uriRegex} onChange={this.onUriRegexChange} />
                        </OverlayTrigger>
                        <br />
                        <br />
                    </div>
                </Stack >
                <br />
                <AttributeVerifyAlert ref={refs => this.attributeVerifyAlertRef = refs}>

                </AttributeVerifyAlert>

                <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.verifyPopover}>
                    <Button onClick={this.onVerify}>Verify</Button>
                </OverlayTrigger>
            </div >
        )
    }
}

class InternalAttirbuteInputForm extends React.Component<InternalAttributeFromProps, InternalAttributeFormState> implements AttributeJsonConvertable {
    readonly OUTER_HTML = "OUTER_HTML"
    readonly INNER_HTML = "INNER_HTML"
    readonly TEXT_CONTENT = "TEXT_CONTENT"

    attributeVerifyAlertRef: AttributeVerifyAlert | null = null

    constructor(props: InternalAttributeFromProps) {
        super(props)

        this.state = {
            name: "",
            regex: "",
            parseMode: this.TEXT_CONTENT
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onRegexChange = this.onRegexChange.bind(this)
        this.onClickOuterHtml = this.onClickOuterHtml.bind(this)
        this.onClickInnerHtml = this.onClickInnerHtml.bind(this)
        this.onClickTextContent = this.onClickTextContent.bind(this)

        this.onVerify = this.onVerify.bind(this)
    }

    onNameChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            name: e.currentTarget.value
        })

        this.attributeVerifyAlertRef?.onAttributeChanged()
    }

    onRegexChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            regex: e.currentTarget.value
        })

        this.attributeVerifyAlertRef?.onAttributeChanged()
    }

    onClickOuterHtml(e: SyntheticEvent<HTMLButtonElement>) {
        this.setState({
            parseMode: this.OUTER_HTML
        })

        this.attributeVerifyAlertRef?.onAttributeChanged()
    }

    onClickInnerHtml(e: SyntheticEvent<HTMLButtonElement>) {
        this.setState({
            parseMode: this.INNER_HTML
        })

        this.attributeVerifyAlertRef?.onAttributeChanged()
    }

    onClickTextContent(e: SyntheticEvent<HTMLButtonElement>) {
        this.setState({
            parseMode: this.TEXT_CONTENT
        })

        this.attributeVerifyAlertRef?.onAttributeChanged()
    }

    onVerify() {
        let htmlData = this.props.getHtmlData()

        this.attributeVerifyAlertRef?.onVerifyInternalAttributeRequest({
            name: this.state.name,
            queryStr: this.state.regex,
            parseMode: this.state.parseMode,

            html: htmlData.html
        })
    }


    readonly verifyPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Verifying attribute</Popover.Header>
            <Popover.Body>
                You can verify parse result of this attribute by clicking this button.
                Evaluation result by backend will be displayed.
                <hr />
                <strong>Please make sure that you fill right Html and URL box.</strong>
            </Popover.Body>
        </Popover>
    )


    readonly namePopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <strong>Name</strong>
                <br />
                Name of attribute. Should be <strong>unique</strong> in page scope and recommend being unique in global
                scope due to possible file duplication.
            </Popover.Body>
        </Popover>
    );

    readonly queryStrPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <strong>Query String</strong>
                <br />
                CSS selector or JSoup query string select range of query. <i>(optional; default is select all)</i>
            </Popover.Body>
        </Popover>
    );

    readonly parseModePopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <strong>Parse Mode</strong>
                <br />
                selects between OUTER_HTML, TEXT_CONTENT, INNER_HTML. <br />
                If confused, select <strong>TEXT_CONTENT</strong>
            </Popover.Body>
        </Popover>
    )

    render() {
        return (
            <div>
                <Stack gap={5}>
                    <div>
                        <br />
                        <p>Name:</p>
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.namePopover}>
                            <input type="text" value={this.state.name} onChange={this.onNameChange} />
                        </OverlayTrigger>
                    </div>
                    <div>
                        <br />
                        <p>Regex:</p>
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.queryStrPopover}>
                            <input type="text" value={this.state.regex} onChange={this.onRegexChange} />
                        </OverlayTrigger>
                    </div>
                    <div>
                        <p>Parse Mode:</p>
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.parseModePopover}>
                            <ButtonGroup>
                                <ToggleButton value="OuterHtml" type="radio" onClick={this.onClickOuterHtml} active={this.state.parseMode === this.OUTER_HTML}>
                                    OuterHtml
                                </ToggleButton>

                                <ToggleButton value="InnerHtml" type="radio" onClick={this.onClickInnerHtml} active={this.state.parseMode === this.INNER_HTML}>
                                    InnerHtml
                                </ToggleButton>

                                <ToggleButton value="TextContent" type="radio" onClick={this.onClickTextContent} active={this.state.parseMode === this.TEXT_CONTENT}>
                                    TextContent
                                </ToggleButton>
                            </ButtonGroup>
                        </OverlayTrigger>
                    </div>
                </Stack>
                <br />
                <AttributeVerifyAlert ref={refs => this.attributeVerifyAlertRef = refs}>

                </AttributeVerifyAlert>

                <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.verifyPopover}>
                    <Button onClick={this.onVerify}>Verify</Button>
                </OverlayTrigger>

            </div>
        )
    }
}

class AttributeInputForm extends React.Component<AttributeInputFormProps, AttributeInputFormState> {
    readonly INTERNAL_ATTRIBUTE = "Internal"
    readonly EXTERNAL_ATTRIBUTE = "External"
    readonly LINK_ATTRIBUTE = "Link"

    attributeReference: InternalAttirbuteInputForm | ExternalAttributeInputForm | LinkAttributeInputForm | null = null

    constructor(props: AttributeInputFormProps) {
        super(props)

        this.state = { type: this.INTERNAL_ATTRIBUTE }

        this.onAttributeTypeChanged = this.onAttributeTypeChanged.bind(this)
    }


    onAttributeTypeChanged(e: string) {
        this.setState({ type: e })
    }

    selectAttribute(e: string) {
        if (e === this.INTERNAL_ATTRIBUTE) {
            return <InternalAttirbuteInputForm getHtmlData={this.props.getHtmlData} ref={refs => this.attributeReference = refs}></InternalAttirbuteInputForm>
        } else if (e === this.EXTERNAL_ATTRIBUTE) {
            return <ExternalAttributeInputForm getHtmlData={this.props.getHtmlData} ref={refs => this.attributeReference = refs}></ExternalAttributeInputForm>
        } else if (e === this.LINK_ATTRIBUTE) {
            return <LinkAttributeInputForm getHtmlData={this.props.getHtmlData} ref={refs => this.attributeReference = refs}></LinkAttributeInputForm>
        } else {
            return <p>ERROR</p>
        }
    }


    render() {
        return (
            <div>
                <p>AttributeType:</p>
                <AttributeSelectButton onButtonChanged={this.onAttributeTypeChanged} id={this.props.id} ></AttributeSelectButton>
                {this.selectAttribute(this.state.type)}
            </div>
        )
    }
}

export default AttributeInputForm