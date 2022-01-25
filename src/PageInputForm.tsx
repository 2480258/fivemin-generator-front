import React, { SyntheticEvent } from "react";
import { ButtonGroup, Dropdown, Stack, ToggleButton } from "react-bootstrap";
import AttributeInputForm from "./AttributeInputForm";
import AttributeListForm from "./AttributeListForm";

type PageInputFormProps = {
    nameChangedCallback: (e: string) => void
    onVerify: (idx: number) => void
}

type PageInputFormState = {
    name: string
    uriCondition: string
    workingSet: boolean
    targetRequester: string

    
}


class PageInputForm extends React.Component<PageInputFormProps, PageInputFormState> {
    reference: AttributeListForm | null = null

    constructor(props: PageInputFormProps) {
        super(props)

        this.state = { name: '', uriCondition: '', workingSet: true, targetRequester: '' }

        this.onNameChanged = this.onNameChanged.bind(this)
        this.onUriConditionChanged = this.onUriConditionChanged.bind(this)
        this.onWorkingSetEnabledClicked = this.onWorkingSetEnabledClicked.bind(this)
        this.onWorkingSetDisabledClicked = this.onWorkingSetDisabledClicked.bind(this)
        this.onTargetRequesterChanged = this.onTargetRequesterChanged.bind(this)
    }

    onNameChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({ name: e.currentTarget.value })
        this.props.nameChangedCallback(e.currentTarget.value)
    }

    onUriConditionChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({ uriCondition: e.currentTarget.value })
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


    render() {
        return (
            <div>
                <h1>Setup for page: {this.state.name}</h1>
                <p>Please see documentation for further infomation</p>
                <Stack gap={5}>
                    <div>
                        <p>Name:</p>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.onNameChanged}
                        />
                    </div>
                    <div>
                        <p>UriCondition:</p>
                        <input
                            type="text"
                            value={this.state.uriCondition}
                            onChange={this.onUriConditionChanged}
                        />
                    </div>

                    <div>
                        <p>TargetRequester:</p>
                        <input
                            type="text"
                            value={this.state.targetRequester}
                            onChange={this.onTargetRequesterChanged}
                        />
                    </div>
                    <div>
                        <div className="working-set-select">
                            <ButtonGroup className="mb-2">
                                <ToggleButton
                                    id="toggle-check"
                                    type="checkbox"
                                    variant="outline-primary"
                                    checked={this.state.workingSet}
                                    value="1"
                                    onChange={(e) => { if (!this.state.workingSet) { this.onWorkingSetEnabledClicked(e) } else { this.onWorkingSetDisabledClicked(e) } }}
                                >
                                    Working Set
                                </ToggleButton>
                            </ButtonGroup>
                            {this.state.workingSet ? " ✔ Working Set Enabled" : "  Working Set Disabled"}
                        </div>
                    </div>
                </Stack>
                <br />
                <AttributeListForm ref={r => this.reference = r} onVerify={this.props.onVerify}>

                </AttributeListForm>
            </div>
        )
    }
}

export default PageInputForm
