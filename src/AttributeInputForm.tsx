import React, { SyntheticEvent } from "react";
import { Button, ButtonGroup, Dropdown, Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
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

    render() {
        return (
            <div className="attribute-type-select">
                <ButtonGroup>
                    <ToggleButton value={this.INTERNAL_ATTRIBUTE} type="radio" onClick={this.onInternalClick} active={this.state.type === this.INTERNAL_ATTRIBUTE}>
                        Internal
                    </ToggleButton>

                    <ToggleButton value={this.EXTERNAL_ATTRIBUTE} type="radio" onClick={this.onExternalClick} active={this.state.type === this.EXTERNAL_ATTRIBUTE}>
                        External
                    </ToggleButton>

                    <ToggleButton value={this.LINK_ATTRIBUTE} type="radio" onClick={this.onLinkClick} active={this.state.type === this.LINK_ATTRIBUTE}>
                        Link
                    </ToggleButton>
                </ButtonGroup>
            </div>
        )
    }
}


class LinkAttributeInputForm extends React.Component<LinkAttributeFromProps, LinkAttributeFormState> implements AttributeJsonConvertable {
    attributeVerifyAlertRef : AttributeVerifyAlert | null = null

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

    render() {
        return (
            <div>
                <Stack gap={5}>
                    <div>
                        <br />
                        Name:<br />
                        <input type="text" value={this.state.name} onChange={this.onNameChange} />
                    </div>
                    <div>
                        Regex:<br />
                        <input type="text" value={this.state.regex} onChange={this.onRegexChange} />
                    </div>
                    <div>
                        UriRegex:<br />
                        <input type="text" value={this.state.uriRegex} onChange={this.onUriRegexChange} />
                        <br />
                        <br />
                    </div>
                </Stack>
                <br />
                <AttributeVerifyAlert ref={refs => this.attributeVerifyAlertRef = refs}>
                    
                </AttributeVerifyAlert>
                <Button onClick={this.onVerify}>Verify</Button>
            </div>
        )
    }
}


class ExternalAttributeInputForm extends React.Component<ExternalAttributeFromProps, ExternalAttributeFormState> implements AttributeJsonConvertable {
    attributeVerifyAlertRef : AttributeVerifyAlert | null = null

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

    render() {
        return (
            <div>
                <Stack gap={5}>
                    <div>
                        <br />
                        Name:<br />
                        <input type="text" value={this.state.name} onChange={this.onNameChange} />
                    </div>
                    <div>
                        Regex:<br />
                        <input type="text" value={this.state.regex} onChange={this.onRegexChange} />
                    </div>
                    <div>
                        UriRegex:<br />
                        <input type="text" value={this.state.uriRegex} onChange={this.onUriRegexChange} />
                        <br />
                        <br />
                    </div>
                </Stack>
                <br />
                <AttributeVerifyAlert ref={refs => this.attributeVerifyAlertRef = refs}>
                    
                </AttributeVerifyAlert>
                <Button onClick={this.onVerify}>Verify</Button>
            </div>
        )
    }
}

class InternalAttirbuteInputForm extends React.Component<InternalAttributeFromProps, InternalAttributeFormState> implements AttributeJsonConvertable {
    readonly OUTER_HTML = "OUTER_HTML"
    readonly INNER_HTML = "INNER_HTML"
    readonly TEXT_CONTENT = "TEXT_CONTENT"

    attributeVerifyAlertRef : AttributeVerifyAlert | null = null

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


    render() {
        return (
            <div>
                <Stack gap={5}>
                    <div>
                        <br />
                        <p>Name:</p>
                        <input type="text" value={this.state.name} onChange={this.onNameChange} />
                    </div>
                    <div>
                        <br />
                        <p>Regex:</p>
                        <input type="text" value={this.state.regex} onChange={this.onRegexChange} />
                    </div>
                    <div>
                        <br />
                        <p>Parse Mode:</p>
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
                    </div>
                </Stack>
                <br />
                <AttributeVerifyAlert ref={refs => this.attributeVerifyAlertRef = refs}>
                    
                </AttributeVerifyAlert>
                <Button onClick={this.onVerify}>Verify</Button>
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
                <h4>Select Attribute Type</h4>
                <AttributeSelectButton onButtonChanged={this.onAttributeTypeChanged} id={this.props.id} ></AttributeSelectButton>
                {this.selectAttribute(this.state.type)}
            </div>
        )
    }
}

export default AttributeInputForm