import React, { SyntheticEvent } from "react";
import { Accordion, Button, Stack } from "react-bootstrap";


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
    
    constructor(props: ExportPageFormatProps) {
        super(props)

        this.state = { pageName: '', targetAttributeNameCount: 0, mode: '', fileNameExp: '' }

        this.onNameChanged = this.onNameChanged.bind(this)
        this.onModeChanged = this.onModeChanged.bind(this)
        this.onExpChanged = this.onExpChanged.bind(this)

        this.onButtonClick = this.onButtonClick.bind(this)
    }

    onNameChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            pageName: e.currentTarget.value
        })
    }

    onModeChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            mode: e.currentTarget.value
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

    render() {
        return (
            <div>
                <Stack gap={5}>
                    <div>
                        <p>PageName:</p>
                        <input type="text" value={this.state.pageName} onChange={this.onNameChanged} />
                    </div>
                    <div>
                        <p>TargettedAttributes:</p>
                        {Array.from(Array(this.state.targetAttributeNameCount).keys()).map((_, idx) => {
                            return (
                                <ExportPageAttributeFormat ref = {refs => this.targetAttributeNameRef.push(refs)}>

                                </ExportPageAttributeFormat>
                            )
                        })}
                        <br />
                        <Button onClick={this.onButtonClick}>Add Targetted Attributes</Button>
                    </div>
                    <div>
                        <p>Adapter:</p>
                        <input type="text" value={this.state.mode} onChange={this.onModeChanged} />
                    </div>
                    <div>
                        <p>File Name Expression:</p>
                        <input type="text" value={this.state.fileNameExp} onChange={this.onExpChanged} />
                    </div>
                </Stack>
            </div>
        )
    }
}

export default ExportFormat