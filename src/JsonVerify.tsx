import React from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import VerifyDataService, { VerifyRequestEntity, VerifyResponseEntity } from "./VerifyDataService";

type JsonVerifyProps = {
    onDownload: () => void
}

type JsonVerifyAlertState = {
    current: string
    lastResult: VerifyResponseEntity | null
    errorResult: string | null
}

class JsonVerifyAlert extends React.Component<JsonVerifyProps, JsonVerifyAlertState>{
    readonly verify = new VerifyDataService()

    readonly READY = "ready"
    readonly VERIFY_PENDING = "pending"
    readonly PROCESSING = "processing"
    readonly COMPLETED = "completed"
    readonly ERROR = "error"

    constructor(props: JsonVerifyProps) {
        super(props)

        this.state = {
            current: this.READY,
            lastResult: null,
            errorResult: null
        }

        this.onVerifyJsonVerifyRequest = this.onVerifyJsonVerifyRequest.bind(this)
        this.onJsonVerifySuccess = this.onJsonVerifySuccess.bind(this)
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

    onVerifyJsonVerifyRequest(data: VerifyRequestEntity) {
        this.setState({
            current: this.PROCESSING
        })

        this.verify.verifyJson(data, this.onJsonVerifySuccess, this.onError)
    }

    onJsonVerifySuccess(entity: VerifyResponseEntity) {
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

    calcContent(data: JsonVerifyAlertState) {
        if (data.errorResult !== null) {
            return <div>
                <p>{data.errorResult}</p>
            </div>
        } else if (data.lastResult !== null) {
            return <div>
                {this.calcParsedResult(data.lastResult)}
            </div>
        }
    }



    calcParsedResult(data: VerifyResponseEntity) {
        if (data.collectedErrorMessages.length === 0) {
            return (
                <div>
                    <Alert variant={"primary"} show={true} transition={false}>
                        <p>I can't see any problems from setting!</p>
                    </Alert>

                    <p>You can download configuration.</p>
                    
                    <Button onClick={this.props.onDownload}>Download Configuration</Button>
                    <hr />
                    <p>or you can modify configuration and verify again.</p>
                </div>
            )
        } else {
            return (
                <div>
                    <Alert variant={"danger"} show={true} transition={false}>
                        <p>Error found. Please check your configuration.</p>
                        <hr />
                        {data.collectedErrorMessages.map((d, idx) => {
                            return (
                                <div>
                                    {d}
                                    <br />
                                </div>
                            )
                        })}
                    </Alert>

                    <p>You can download configuration if you think this warning is wrong.</p>

                    <Button onClick={this.props.onDownload}>Download Configuration</Button>
                    <hr />
                    <p>or you can modify configuration and verify again.</p>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.calcContent(this.state)}
            </div>
        )
    }
}

export default JsonVerifyAlert