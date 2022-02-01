import React, { SyntheticEvent } from "react";
import { Accordion, Button, ButtonGroup, OverlayTrigger, Popover, Stack, ToggleButton } from "react-bootstrap";


type ExportPageAttributeFormatProps = {

}

type ExportPageAttributeFormatState = {
    attributeName: string
}

type ExportPageFormatProps = {

}

type ExportPageFormatState = {
    pageName: string
    targetAttributeNameCount: number

    mode: string
    fileNameExp: string
}

type ExportFormatProps = {

}

type ExportFormatState = {
    exportPages: Array<JSX.Element>
}

class ExportFormat extends React.Component<ExportFormatProps, ExportFormatState> {
    exportPageRef: Array<ExportPageFormat | null> = []

    constructor(props: ExportFormatProps) {
        super(props)

        this.state = { exportPages: [] }
        this.onButtonClick = this.onButtonClick.bind(this)
    }


    onButtonClick(e: SyntheticEvent<HTMLButtonElement>) {
        const elem = React.createElement(ExportPageFormat, { ref: refs => this.exportPageRef.push(refs) }, {})

        this.setState((prevState) => ({
            exportPages: prevState.exportPages.concat(elem)
        }))
    }

    render() {
        return (
            <div>
                <h1>Export Format Configurator</h1>
                <br />
                <p>Here section is for describing file-saving(serializing) related actions.</p>
                <p>Start by press 'Add Export Page' button. <br /> Hover or focus input box for more information.</p>
                <hr />
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {this.state.exportPages.map((d, idx) => {
                        return (
                            <Accordion.Item eventKey={idx.toString()}>
                                <Accordion.Header><h3>Export Page #{idx}</h3></Accordion.Header>
                                <Accordion.Body>
                                    {d}
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>

                <Button onClick={this.onButtonClick}>Add Export Page</Button>
            </div>
        )
    }
}



class ExportPageAttributeFormat extends React.Component<ExportPageAttributeFormatProps, ExportPageAttributeFormatState> {
    constructor(props: ExportPageAttributeFormatProps) {
        super(props)

        this.state = { attributeName: '' }

        this.onAttributeAdded = this.onAttributeAdded.bind(this)
    }


    onAttributeAdded(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            attributeName: e.currentTarget.value
        })
    }


    render() {
        return (
            <input type="text" value={this.state.attributeName} onChange={this.onAttributeAdded} />
        )
    }
}

class ExportPageFormat extends React.Component<ExportPageFormatProps, ExportPageFormatState> {
    targetAttributeNameRef: Array<ExportPageAttributeFormat | null> = []

    readonly JSON_ADAPTER = "Json"
    readonly BINARY_ADAPTER = "Binary"

    constructor(props: ExportPageFormatProps) {
        super(props)

        this.state = { pageName: '', targetAttributeNameCount: 0, mode: '', fileNameExp: '' }

        this.onNameChanged = this.onNameChanged.bind(this)
        this.onExpChanged = this.onExpChanged.bind(this)

        this.onButtonClick = this.onButtonClick.bind(this)

        this.onClickJsonMode = this.onClickJsonMode.bind(this)
        this.onClickBinaryMode = this.onClickBinaryMode.bind(this)
    }

    onNameChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            pageName: e.currentTarget.value
        })
    }

    onClickJsonMode() {
        this.setState({
            mode: this.JSON_ADAPTER
        })
    }

    onClickBinaryMode() {
        this.setState({
            mode: this.BINARY_ADAPTER
        })
    }

    onExpChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            fileNameExp: e.currentTarget.value
        })
    }

    onButtonClick(e: SyntheticEvent<HTMLButtonElement>) {
        this.setState((prevState) => ({
            targetAttributeNameCount: prevState.targetAttributeNameCount + 1
        }))
    }

    readonly pageNamePopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Export</Popover.Header>
            <Popover.Body>
                Name of page (parser tab) to be applied.
            </Popover.Body>
        </Popover>
    )


    readonly targetAttributePopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Export</Popover.Header>
            <Popover.Body>
                Specifies name of attributes (in provided page) that needed to be exported.
            </Popover.Body>
        </Popover>
    )


    readonly jsonadapterPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Export</Popover.Header>
            <Popover.Body>
                Marks this attribute should be exported via Json file. (for text based attributes)
            </Popover.Body>
        </Popover>
    )


    readonly binaryadapterPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Export</Popover.Header>
            <Popover.Body>
                Marks this attribute should be exported via seperated binary file. (for binary based attributes)
            </Popover.Body>
        </Popover>
    )

    readonly fileNameExpPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing Export</Popover.Header>
            <Popover.Body>
                Specifies where to export files. We can use value of tag by writing &(tagName). Some tags are added automatically for sake of usability. <br /> See below.

                <hr />
                <strong>Tag reference table</strong>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Functions</th>
                    </tr>
                    <tr>
                        <td>inc</td>
                        <td>incremental numbers by attributes.</td>
                    </tr>
                    <tr>
                        <td>ext</td>
                        <td>extension of requested URL. if none, ".bin" will be used instead.</td>
                    </tr>
                    <tr>
                        <td>lastseg</td>
                        <td>last segment of requested URL.</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>name of current attribute.</td>
                    </tr>
                </table>

                <hr />
                <strong>Exceptions</strong>
                <p>- If file name is duplicated, "- (Dup) will be appended after file name. <br /> but, this behavior doesn't apply for files before this crawler starts"</p>
                <p>- Note that directory separators actually work as the directory separators. <br /> If exists, a new directory name followed by directory separator will be created.</p>
            </Popover.Body>
        </Popover>
    )


    render() {
        return (
            <div>
                <Stack gap={5}>
                    <div>
                        <p>PageName:</p>
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.pageNamePopover}>
                            <input type="text" value={this.state.pageName} onChange={this.onNameChanged} />
                        </OverlayTrigger>
                    </div>
                    <div>
                        <p>TargettedAttributes:</p>
                        {Array.from(Array(this.state.targetAttributeNameCount).keys()).map((_, idx) => {
                            return (
                                <ExportPageAttributeFormat ref={refs => this.targetAttributeNameRef.push(refs)}>

                                </ExportPageAttributeFormat>
                            )
                        })}
                        <br />
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.targetAttributePopover}>
                            <Button onClick={this.onButtonClick}>Add Targetted Attributes</Button>
                        </OverlayTrigger>
                    </div>
                    <div>
                        <p>Adapter:</p>
                        <ButtonGroup>

                            <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.jsonadapterPopover}>
                                <ToggleButton value="Json" type="radio" onClick={this.onClickJsonMode} active={this.state.mode === this.JSON_ADAPTER}>
                                    Json
                                </ToggleButton>
                            </OverlayTrigger>

                            <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.binaryadapterPopover}>
                                <ToggleButton value="Binary" type="radio" onClick={this.onClickBinaryMode} active={this.state.mode === this.BINARY_ADAPTER}>
                                    Binary
                                </ToggleButton>
                            </OverlayTrigger>
                        </ButtonGroup>
                    </div>
                    <div>
                        <p>File Name Expression:</p>
                        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.fileNameExpPopover}>
                            <input type="text" value={this.state.fileNameExp} onChange={this.onExpChanged} />
                        </OverlayTrigger>
                    </div>
                </Stack>
            </div>
        )
    }
}

export default ExportFormat