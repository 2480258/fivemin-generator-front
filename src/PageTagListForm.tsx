import React, { SyntheticEvent } from "react";
import { Accordion, Alert, Button, ButtonGroup, OverlayTrigger, Popover, Stack, ToggleButton } from "react-bootstrap";
import { HtmlData } from "./AttributeInputForm";
import VerifyDataService, { TagRequestEntity, TagResultEntity } from "./VerifyDataService";

type PageTagListFormProps = {
    getHtmlData: () => HtmlData
    pageIdx: number
}

type PageTagListFormState = {
    tagCount: number
}

type PageTagProps = {
    pageIdx: number,
    tagIdx: number,
    getHtmlData: () => HtmlData
}

type PageTagState = {

    tagName: string,
    tagRegex: string,
    isAlias: boolean
}

type PageTagVerifyProps = {

}

type PageTagVerifyState = {
    current: string,
    lastResult: TagResultEntity | null,
    errorResult: string | null
}

class PageTagListForm extends React.Component<PageTagListFormProps, PageTagListFormState> {
    tagRefList: Array<PageTag | null> = []

    constructor(props: PageTagListFormProps) {
        super(props)

        this.state = {
            tagCount: 0
        }

        this.onButtonPressed = this.onButtonPressed.bind(this)
        this.addTag = this.addTag.bind(this)
    }


    onButtonPressed() {
        this.addTag()
    }

    addTag() {
        this.setState((prevState) => ({
            tagCount: prevState.tagCount + 1
        }))
    }


    render() {
        this.tagRefList = []

        return (
            <div className="attribute-panel">
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {Array.from(Array(this.state.tagCount).keys()).map((_, idx) => {
                        return (
                            <Accordion.Item eventKey={idx.toString() + "tag"}>
                                <Accordion.Header>
                                    <h3>Tag #{idx}</h3>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div key={"tag" + idx}>
                                        <PageTag getHtmlData={this.props.getHtmlData} ref={refs => this.tagRefList.push(refs)} tagIdx={idx} pageIdx={this.props.pageIdx}></PageTag>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
                <button onClick={this.onButtonPressed} className="mb-2">Add Tag</button>
            </div>
        )
    }
}

class PageTag extends React.Component<PageTagProps, PageTagState> {
    pageVerifyAlertRef: PageTagVerifyAlert | null = null

    constructor(props: PageTagProps) {
        super(props)

        this.state = {
            tagName: "",
            tagRegex: "",
            isAlias: false
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onRegexChange = this.onRegexChange.bind(this)
        this.onAliasEnabledClicked = this.onAliasEnabledClicked.bind(this)
        this.onAliasDisabledClicked = this.onAliasDisabledClicked.bind(this)

        this.onVerify = this.onVerify.bind(this)
    }

    onNameChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            tagName: e.currentTarget.value
        })

        this.pageVerifyAlertRef?.onAttributeChanged()
    }

    onRegexChange(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            tagRegex: e.currentTarget.value
        })

        this.pageVerifyAlertRef?.onAttributeChanged()
    }

    onAliasEnabledClicked(e: SyntheticEvent<HTMLElement>) {
        this.setState({ isAlias: true })
    }

    onAliasDisabledClicked(e: SyntheticEvent<HTMLElement>) {
        this.setState({ isAlias: false })
    }

    onVerify() {
        let htmlData = this.props.getHtmlData()

        this.pageVerifyAlertRef?.onVerifyTagRequest({
            name: this.state.tagName,
            tagRegex: this.state.tagRegex,

            url: htmlData.uri
        })
    }


    readonly namePopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Tag</Popover.Header>
            <Popover.Body>
                Name of Tag. Should be unique in page scope.
            </Popover.Body>
        </Popover>
    )


    readonly regexPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Tag</Popover.Header>
            <Popover.Body>
                Specifies how to extract tag from URL. Only first match of string will be added.
            </Popover.Body>
        </Popover>
    )

    readonly tagPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Tag</Popover.Header>
            <Popover.Body>
                Specifies whether it is alias of URL. If enabled, Documents have same tag will not be downloaded.
            </Popover.Body>
        </Popover>
    )

    render() {
        return (
            <div>
                <Stack gap={5}>
                    <div>
                        <p>Name:</p>
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.namePopover}>
                            <input type="text" value={this.state.tagName} onChange={this.onNameChange} />
                        </OverlayTrigger>
                    </div>
                    <div>
                        <p>Regex:</p>
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.regexPopover}>
                            <input type="text" value={this.state.tagRegex} onChange={this.onRegexChange} />
                        </OverlayTrigger>
                    </div>
                    <div className="tag-alias-select">
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.tagPopover}>
                            <ButtonGroup className="mb-2">
                                <ToggleButton
                                    id={"tag-check" + this.props.tagIdx + (this.props.pageIdx * 10007)}
                                    type="checkbox"
                                    variant="outline-primary"
                                    checked={this.state.isAlias}
                                    value="2"
                                    onChange={(e) => { if (!this.state.isAlias) { this.onAliasEnabledClicked(e) } else { this.onAliasDisabledClicked(e) } }}
                                >
                                    Alias
                                </ToggleButton>
                            </ButtonGroup>
                        </OverlayTrigger>
                        {this.state.isAlias ? " ✔ This tag is a alias" : "  This tag is not a alias"}
                    </div>
                </Stack>
                <br />
                <PageTagVerifyAlert ref={refs => this.pageVerifyAlertRef = refs}>

                </PageTagVerifyAlert>
                <Button onClick={this.onVerify}>Verify</Button>
            </div>
        )
    }
}


class PageTagVerifyAlert extends React.Component<PageTagVerifyProps, PageTagVerifyState>{
    readonly verify = new VerifyDataService()

    readonly READY = "ready"
    readonly VERIFY_PENDING = "pending"
    readonly PROCESSING = "processing"
    readonly COMPLETED = "completed"
    readonly ERROR = "error"

    constructor(props: PageTagVerifyProps) {
        super(props)

        this.state = {
            current: this.READY,
            lastResult: null,
            errorResult: null
        }

        this.onVerifyTagRequest = this.onVerifyTagRequest.bind(this)
        this.onAttributeVerifySuccess = this.onAttributeVerifySuccess.bind(this)
        this.onError = this.onError.bind(this)
        this.onAttributeChanged = this.onAttributeChanged.bind(this)
    }

    onAttributeChanged() {
        if (this.state.current !== this.READY) {
            this.setState({
                current: this.VERIFY_PENDING
            })
        }
    }

    onVerifyTagRequest(data: TagRequestEntity) {
        this.setState({
            current: this.PROCESSING
        })

        this.verify.verifyTag(data, this.onAttributeVerifySuccess, this.onError)
    }

    onAttributeVerifySuccess(entity: TagResultEntity) {
        this.setState({
            current: this.COMPLETED,
            lastResult: entity,
            errorResult: null
        })
    }

    onError(message: string) {
        this.setState({
            current: this.ERROR,
            lastResult: null,
            errorResult: message
        })
    }

    calcHeading(current: string): JSX.Element {
        if (current === this.ERROR) {
            return <div>
                <p>Error Encounted</p>
            </div>
        } else if (current === this.READY) {
            return <div>
                <p>You can verify result by pressing verify button!</p>
            </div>
        } else if (current === this.VERIFY_PENDING) {
            return <div>
                <p>Showing your last verify result. Please press verify button again.</p>
            </div>
        } else if (current === this.PROCESSING) {
            return <div>
                <p>Processing verify....</p>
            </div>
        } else if (current === this.COMPLETED) {
            return <div>
                <p>Verify Result!!</p>
            </div>
        }

        else {
            return <div>
                <p>Internal error</p>
            </div>
        }
    }

    calcContent(data: PageTagVerifyState) {
        if (data.errorResult !== null) {
            return <div>
                <p>{data.errorResult}</p>
            </div>
        } else if (data.lastResult !== null) {
            return <div>
                {data.lastResult.name}
                <hr />
                {data.lastResult.value}
            </div>
        }
    }

    render() {
        return (
            <Alert variant="primary" show={true} transition={false}>
                <Alert.Heading>
                    {this.calcHeading(this.state.current)}
                </Alert.Heading>
                {this.calcContent(this.state)}
            </Alert>
        )
    }
}

export default PageTagListForm