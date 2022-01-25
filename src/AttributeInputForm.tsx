import React, { SyntheticEvent } from "react";
import { Button, ButtonGroup, Dropdown, Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import AttributeListForm from "./AttributeListForm";

type AttributeSelectButtonProps = {
    onButtonChanged: (msg: string) => void
    id: number
}

type AttributeSelectButtonState = {
    type: string
}

type AttributeInputFormProps = {
    onVerify: () => void
    id: number
}

type AttributeInputFormState = {
    type: string
}

type InternalAttributeFromProps = {
    onVerify: () => void
}

type InternalAttributeFormState = {
    name: string
    regex: string
    parseMode: string
}


type ExternalAttributeFromProps = {
    onVerify: () => void
}

type ExternalAttributeFormState = {
    name: string
    regex: string
    uriRegex: string
}


type LinkAttributeFromProps = {
    onVerify: () => void
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
    constructor(props: LinkAttributeFromProps) {
        super(props)

        this.state = {
            name: "",
            regex: "",
            uriRegex: ""
        }


        this.onSubmit = this.onSubmit.bind(this)

        this.onNameChange = this.onNameChange.bind(this)
        this.onRegexChange = this.onRegexChange.bind(this)
        this.onUriRegexChange = this.onUriRegexChange.bind(this)

    }

    onSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()

        alert('submitted' +
            (this.state.name + this.state.regex + this.state.uriRegex))
    }

    onNameChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            name: e.currentTarget.value
        })
    }

    onRegexChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            regex: e.currentTarget.value
        })
    }

    onUriRegexChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            uriRegex: e.currentTarget.value
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
                <Button onClick={this.props.onVerify}>Verify</Button>
            </div>
        )
    }
}


class ExternalAttributeInputForm extends React.Component<ExternalAttributeFromProps, ExternalAttributeFormState> implements AttributeJsonConvertable {
    constructor(props: ExternalAttributeFromProps) {
        super(props)

        this.state = {
            name: "",
            regex: "",
            uriRegex: ""
        }

        this.onSubmit = this.onSubmit.bind(this)

        this.onNameChange = this.onNameChange.bind(this)
        this.onRegexChange = this.onRegexChange.bind(this)
        this.onUriRegexChange = this.onUriRegexChange.bind(this)

    }

    onSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()

        alert('submitted' +
            (this.state.name + this.state.regex + this.state.uriRegex))
    }

    onNameChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            name: e.currentTarget.value
        })
    }

    onRegexChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            regex: e.currentTarget.value
        })
    }

    onUriRegexChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            uriRegex: e.currentTarget.value
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
                <Button onClick={this.props.onVerify}>Verify</Button>
            </div>
        )
    }
}

class InternalAttirbuteInputForm extends React.Component<InternalAttributeFromProps, InternalAttributeFormState> implements AttributeJsonConvertable {
    readonly OUTER_HTML = "OuterHtml"
    readonly INNER_HTML = "InnerHtml"
    readonly TEXT_CONTENT = "TextContent"

    constructor(props: InternalAttributeFromProps) {
        super(props)

        this.state = {
            name: "",
            regex: "",
            parseMode: "TextContent"
        }


        this.onSubmit = this.onSubmit.bind(this)

        this.onNameChange = this.onNameChange.bind(this)
        this.onRegexChange = this.onRegexChange.bind(this)
        this.onClickOuterHtml = this.onClickOuterHtml.bind(this)
        this.onClickInnerHtml = this.onClickInnerHtml.bind(this)
        this.onClickTextContent = this.onClickTextContent.bind(this)
    }

    onSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()

        alert('submitted' +
            (this.state.name + this.state.regex + this.state.parseMode))
    }

    onNameChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            name: e.currentTarget.value
        })
    }

    onRegexChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            regex: e.currentTarget.value
        })
    }

    onClickOuterHtml(e: SyntheticEvent<HTMLButtonElement>) {
        this.setState({
            parseMode: this.OUTER_HTML
        })
    }

    onClickInnerHtml(e: SyntheticEvent<HTMLButtonElement>) {
        this.setState({
            parseMode: this.INNER_HTML
        })
    }

    onClickTextContent(e: SyntheticEvent<HTMLButtonElement>) {
        this.setState({
            parseMode: this.TEXT_CONTENT
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
                            <ToggleButton value="OuterHtml" type="radio" onClick={this.onClickOuterHtml} active={this.state.parseMode === "OuterHtml"}>
                                OuterHtml
                            </ToggleButton>

                            <ToggleButton value="InnerHtml" type="radio" onClick={this.onClickInnerHtml} active={this.state.parseMode === "InnerHtml"}>
                                InnerHtml
                            </ToggleButton>

                            <ToggleButton value="TextContent" type="radio" onClick={this.onClickTextContent} active={this.state.parseMode === "TextContent"}>
                                TextContent
                            </ToggleButton>
                        </ButtonGroup>
                    </div>
                </Stack>
                <br />
                <Button onClick={this.props.onVerify}>Verify</Button>
            </div>
        )
    }
}

class AttributeInputForm extends React.Component<AttributeInputFormProps, AttributeInputFormState> {
    readonly INTERNAL_ATTRIBUTE = "Internal"
    readonly EXTERNAL_ATTRIBUTE = "External"
    readonly LINK_ATTRIBUTE = "Link"

    attributeReference: AttributeJsonConvertable | null = null

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
            return <InternalAttirbuteInputForm onVerify={this.props.onVerify} ref={refs => this.attributeReference = refs}></InternalAttirbuteInputForm>
        } else if (e === this.EXTERNAL_ATTRIBUTE) {
            return <ExternalAttributeInputForm onVerify={this.props.onVerify} ref={refs => this.attributeReference = refs}></ExternalAttributeInputForm>
        } else if (e === this.LINK_ATTRIBUTE) {
            return <LinkAttributeInputForm onVerify={this.props.onVerify} ref={refs => this.attributeReference = refs}></LinkAttributeInputForm>
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