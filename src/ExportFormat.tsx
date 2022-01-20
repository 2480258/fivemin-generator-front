import React, { SyntheticEvent } from "react";
import { Button } from "react-bootstrap";


type ExportPageAttributeFormatProps = {

}

type ExportPageAttributeFormatState = {
    attributeName: string
}

type ExportPageFormatProps = {

}

type ExportPageFormatState = {
    pageName: string
    targetAttributeName: Array<JSX.Element>

    mode: string
    fileNameExp: string
}

type ExportFormatProps = {

}

type ExportFormatState = {
    exportPages: Array<JSX.Element>
}

class ExportFormat extends React.Component<ExportFormatProps, ExportFormatState> {
    constructor(props: ExportFormatProps) {
        super(props)

        this.state = {exportPages: []}
        this.onButtonClick = this.onButtonClick.bind(this)
    }


    onButtonClick(e: SyntheticEvent<HTMLButtonElement>) {
        const elem = React.createElement(ExportPageFormat, {}, {})

        this.setState((prevState) => ({
            exportPages: prevState.exportPages.concat(elem)
        }))
    }

    render() {
        return (
            <div>
                {this.state.exportPages}

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
    constructor(props: ExportPageFormatProps) {
        super(props)

        this.state = { pageName: '', targetAttributeName: [], mode: '', fileNameExp: '' }

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
        const elem = React.createElement(ExportPageAttributeFormat, {}, {})

        this.setState((prevState) => ({
            targetAttributeName: prevState.targetAttributeName.concat(elem)
        }))
    }




    render() {
        return (
            <div>
                <p>PageName:</p>
                <input type="text" value={this.state.pageName} onChange={this.onNameChanged} />

                <p>TargettedAttributes:</p>
                {this.state.targetAttributeName}


                <Button onClick={this.onButtonClick}>Add Targetted Attributes</Button>


                <p>Adapter:</p>
                <input type="text" value={this.state.mode} onChange={this.onModeChanged} />

                <p>File Name Expression:</p>
                <input type="text" value={this.state.fileNameExp} onChange={this.onExpChanged} />
            </div>
        )
    }
}

export default ExportFormat