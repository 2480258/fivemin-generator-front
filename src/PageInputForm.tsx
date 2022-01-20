import React, { SyntheticEvent } from "react";
import { Dropdown, Stack } from "react-bootstrap";
import AttributeInputForm from "./AttributeInputForm";
import AttributeListForm from "./AttributeListForm";

type PageInputFormProps = {
    nameChangedCallback: (e: string) => void
}

type PageInputFormState = {
    name: string
    uriCondition: string
    workingSet: boolean
    targetRequester: string

    reference: React.RefObject<AttributeListForm> | null
}


class PageInputForm extends React.Component<PageInputFormProps, PageInputFormState> {
    constructor(props: PageInputFormProps) {
        super(props)

        this.state = { name: '', uriCondition: '', workingSet: true, targetRequester: '', reference: null }

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
                <h2>Setup for page: {this.state.name}</h2>
                <p>Please see documentation for further infomation</p>
                <Stack gap={3}>
                    <div className="bg-light border">
                        <p>Name:</p>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.onNameChanged}
                        />
                    </div>
                    <div className="bg-light border">
                        <p>UriCondition:</p>
                        <input
                            type="text"
                            value={this.state.uriCondition}
                            onChange={this.onUriConditionChanged}
                        />
                    </div>

                    <div className="bg-light border">
                        <p>TargetRequester:</p>
                        <input
                            type="text"
                            value={this.state.targetRequester}
                            onChange={this.onTargetRequesterChanged}
                        />
                    </div>

                    <div className="bg-light border">
                        <div className="working-set-select">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    WorkingSet Mode:
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.onWorkingSetEnabledClicked}>Enabled</Dropdown.Item>
                                    <Dropdown.Item onClick={this.onWorkingSetDisabledClicked}>Disabled</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </Stack>
                <AttributeListForm ref={this.state.reference}>

                </AttributeListForm>
            </div>
        )
    }
}

export default PageInputForm
