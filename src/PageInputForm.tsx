import React, { SyntheticEvent } from "react";
import { Button, ButtonGroup, Dropdown, OverlayTrigger, Popover, Stack, ToggleButton } from "react-bootstrap";
import AttributeInputForm, { HtmlData } from "./AttributeInputForm";
import AttributeListForm from "./AttributeListForm";
import PageTagListForm from "./PageTagListForm";
import UriVerifyAlert from "./UriVerifyAlert";

type PageInputFormProps = {
    nameChangedCallback: (e: string) => void
    getHtmlData: () => HtmlData
    getGlobalCondition: () => string
    idx: number
}

export type PageInputFormState = {
    name: string
    uriCondition: string
    workingSet: boolean
    targetRequester: string
}


class PageInputForm extends React.Component<PageInputFormProps, PageInputFormState> {
    attributeReference: AttributeListForm | null = null
    tagReference: PageTagListForm | null = null
    uriVerifyRef: UriVerifyAlert | null = null


    constructor(props: PageInputFormProps) {
        super(props)

        this.state = { name: '', uriCondition: '', workingSet: true, targetRequester: '' }

        this.onNameChanged = this.onNameChanged.bind(this)
        this.onUriConditionChanged = this.onUriConditionChanged.bind(this)
        this.onWorkingSetEnabledClicked = this.onWorkingSetEnabledClicked.bind(this)
        this.onWorkingSetDisabledClicked = this.onWorkingSetDisabledClicked.bind(this)
        this.onTargetRequesterChanged = this.onTargetRequesterChanged.bind(this)
        this.onUriVerify = this.onUriVerify.bind(this)
    }

    onNameChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({ name: e.currentTarget.value })
        this.props.nameChangedCallback(e.currentTarget.value)
    }

    onUriConditionChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({ uriCondition: e.currentTarget.value })

        this.onUriVerify(e.currentTarget.value, null, null)
    }

    onWorkingSetEnabledClicked(e: SyntheticEvent<HTMLElement>) {
        this.setState({ workingSet: true })
    }

    onWorkingSetDisabledClicked(e: SyntheticEvent<HTMLElement>) {
        this.setState({ workingSet: false })
    }

    onTargetRequesterChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({ targetRequester: e.currentTarget.value })
    }

    onUriVerify(curMatch: string | null, uri: string | null, globalCond: string | null) {
        this.uriVerifyRef?.onVerify(uri ?? this.props.getHtmlData().uri, curMatch ?? this.state.uriCondition, globalCond ?? this.props.getGlobalCondition())
    }



    readonly namePopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Page</Popover.Header>
            <Popover.Body>
                Literally, name of <strong>page</strong>. Should be unique!
            </Popover.Body>
        </Popover>
    )


    readonly conditionPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Page</Popover.Header>
            <Popover.Body>
                Specify whether this <strong>document</strong> is converted to be this page. <br />
                If regex of this box matches with right box URL, response will be parsed with below rules. <br />
                <hr />
                You can check regex acceptablity below note.
            </Popover.Body>
        </Popover>
    )


    readonly workingSetPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Page</Popover.Header>
            <Popover.Body>
                - If the page is marked as working set enabled, it means that the page and its children page are <i>atomic</i>, they<br />
                will not change over time and no need to be downloaded again.<br />
                - If the page is marked as working set disabled, it will be downloaded again.<br />
                If you are not going to use resume feature, just let them Enabled.
            </Popover.Body>
        </Popover>
    )


    render() {
        return (
            <div>
                <h1>Setup for page: {this.state.name}</h1>
                <Stack gap={5}>
                    <div>
                        <p>Name:</p>
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.namePopover}>
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={this.onNameChanged}
                            />
                        </OverlayTrigger>
                    </div>
                    <div>
                        <p>UriCondition (Regex):</p>

                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.conditionPopover}>
                            <input
                                type="text"
                                value={this.state.uriCondition}
                                onChange={this.onUriConditionChanged}
                            />
                        </OverlayTrigger>
                    </div>
                    <div>
                        <div className="working-set-select">

                            <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.workingSetPopover}>
                                <ButtonGroup className="mb-2">
                                    <ToggleButton
                                        id={"toggle-check" + this.props.idx}
                                        type="checkbox"
                                        variant="outline-primary"
                                        checked={this.state.workingSet}
                                        value="1"
                                        onChange={(e) => { if (!this.state.workingSet) { this.onWorkingSetEnabledClicked(e) } else { this.onWorkingSetDisabledClicked(e) } }}
                                    >
                                        Working Set
                                    </ToggleButton>
                                </ButtonGroup>
                            </OverlayTrigger>
                            {this.state.workingSet ? " ✔ Working Set Enabled" : "  Working Set Disabled"}
                        </div>
                    </div>

                    <div>
                        <UriVerifyAlert ref={refs => this.uriVerifyRef = refs}>

                        </UriVerifyAlert>
                    </div>
                </Stack>
                <br />
                <AttributeListForm ref={r => this.attributeReference = r} getHtmlData={this.props.getHtmlData}>

                </AttributeListForm>
                <PageTagListForm getHtmlData={this.props.getHtmlData} ref={refs => this.tagReference = refs} pageIdx={this.props.idx}>

                </PageTagListForm>
            </div>
        )
    }
}

export default PageInputForm
