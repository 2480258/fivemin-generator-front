import React, { SyntheticEvent } from "react";
import { Dropdown } from "react-bootstrap";
import AttributeListForm from "./AttributeListForm";

type AttributeSelectButtonProps = {
    onButtonChanged: (msg: string) => void
    id: number
}

type AttributeSelectButtonState = {
    type: string
}

type AttributeInputFormProps = {
    id: number
}

type AttributeInputFormState = {
    type: JSX.Element
}

type InternalAttributeFromProps = {

}

type InternalAttributeFormState = {
    name: string
    regex: string
    parseMode: string
}


type ExternalAttributeFromProps = {

}

type ExternalAttributeFormState = {
    name: string
    regex: string
    uriRegex: string
}


type LinkAttributeFromProps = {

}

type LinkAttributeFormState = {
    name: string
    regex: string
    uriRegex: string
}

class AttributeSelectButton extends React.Component<AttributeSelectButtonProps, AttributeSelectButtonState> {
    readonly INTERNAL_ATTRIBUTE = "Internal"
    readonly EXTERNAL_ATTRIBUTE = "External"
    readonly LINK_ATTRIBUTE = "Link"

    constructor(props: AttributeSelectButtonProps) {
        super(props)

        this.state = { type: "Internal" }

        this.onInternalClick = this.onInternalClick.bind(this)
        this.onExternalClick = this.onExternalClick.bind(this)
        this.onLinkClick = this.onLinkClick.bind(this)
    }

    onInternalClick(e: SyntheticEvent<HTMLElement>) {
        this.props.onButtonChanged(this.INTERNAL_ATTRIBUTE)
    }

    onExternalClick(e: SyntheticEvent<HTMLElement>) {
        this.props.onButtonChanged(this.EXTERNAL_ATTRIBUTE)
    }

    onLinkClick(e: SyntheticEvent<HTMLElement>) {
        this.props.onButtonChanged(this.LINK_ATTRIBUTE)
    }

    render() {
        return (
            <div className="attribute-type-select" key={this.props.id}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Attribute Type
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.onInternalClick}>Internal</Dropdown.Item>
                        <Dropdown.Item onClick={this.onExternalClick}>External</Dropdown.Item>
                        <Dropdown.Item onClick={this.onLinkClick}>Link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}


class LinkAttributeInputForm extends React.Component<ExternalAttributeFromProps, ExternalAttributeFormState> {
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
                <form onSubmit={this.onSubmit}>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.onNameChange} />

                    Regex:
                    <input type="text" value={this.state.regex} onChange={this.onRegexChange} />

                    UriRegex:
                    <input type="text" value={this.state.uriRegex} onChange={this.onUriRegexChange} />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}


class ExternalAttributeInputForm extends React.Component<ExternalAttributeFromProps, ExternalAttributeFormState> {
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
                <form onSubmit={this.onSubmit}>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.onNameChange} />

                    Regex:
                    <input type="text" value={this.state.regex} onChange={this.onRegexChange} />

                    UriRegex:
                    <input type="text" value={this.state.uriRegex} onChange={this.onUriRegexChange} />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

class InternalAttirbuteInputForm extends React.Component<InternalAttributeFromProps, InternalAttributeFormState> {
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
        this.onParseModeChange = this.onParseModeChange.bind(this)
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

    onParseModeChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            parseMode: e.currentTarget.value
        })
    }



    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.onNameChange} />

                    Regex:
                    <input type="text" value={this.state.regex} onChange={this.onRegexChange} />


                    <div >
                        ParseMode:
                        <input type="radio" value="OuterHtml" name="type" onChange={this.onParseModeChange} /> OuterHtml
                        <input type="radio" value="InnerHtml" name="type" onChange={this.onParseModeChange} /> InnerHtml
                        <input type="radio" value="TextContent" name="type" onChange={this.onParseModeChange} /> TextContent
                    </div>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

class AttributeInputForm extends React.Component<AttributeInputFormProps, AttributeInputFormState> {
    readonly INTERNAL_ATTRIBUTE = "Internal"
    readonly EXTERNAL_ATTRIBUTE = "External"
    readonly LINK_ATTRIBUTE = "Link"


    constructor(props: AttributeInputFormProps) {
        super(props)

        this.state = { type: <InternalAttirbuteInputForm></InternalAttirbuteInputForm> }

        this.onAttributeTypeChanged = this.onAttributeTypeChanged.bind(this)
    }


    onAttributeTypeChanged(e: string) {
        let attributeInput: JSX.Element
        if (e === this.INTERNAL_ATTRIBUTE) {
            attributeInput = <InternalAttirbuteInputForm></InternalAttirbuteInputForm>
        } else if (e === this.EXTERNAL_ATTRIBUTE) {
            attributeInput = <ExternalAttributeInputForm></ExternalAttributeInputForm>
        } else if (e === this.LINK_ATTRIBUTE) {
            attributeInput = <LinkAttributeInputForm></LinkAttributeInputForm>
        } else {
            attributeInput = <p>ERROR</p>
        }

        this.setState({ type: attributeInput })
    }


    render() {
        return (
            <div>
                <p>Select Attribute Type</p>
                <AttributeSelectButton onButtonChanged={this.onAttributeTypeChanged} id={this.props.id} ></AttributeSelectButton>
                {this.state.type}
            </div>
        )
    }
}

export default AttributeInputForm