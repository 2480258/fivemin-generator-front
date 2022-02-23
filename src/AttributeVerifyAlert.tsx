import React from "react";
import { Alert, Spinner } from "react-bootstrap";
import VerifyDataService, { AttributeResponseEntity, InternalAttributeVerifyRequest, LinkAttributeVerifyRequest } from "./VerifyDataService";

type AttributeVerifyProps = {

}

type AttributeVerifyAlertState = {
    current: string
    lastResult: AttributeResponseEntity | null
    errorResult: string | null
}

class AttributeVerifyAlert extends React.Component<AttributeVerifyProps, AttributeVerifyAlertState>{
    readonly verify = new VerifyDataService()

    readonly READY = "ready"
    readonly VERIFY_PENDING = "pending"
    readonly PROCESSING = "processing"
    readonly COMPLETED = "completed"
    readonly ERROR = "error"

    constructor(props: AttributeVerifyProps) {
        super(props)

        this.state = {
            current: this.READY,
            lastResult: null,
            errorResult: null
        }

        this.onVerifyExternalAttributeRequest = this.onVerifyExternalAttributeRequest.bind(this)
        this.onVerifyInternalAttributeRequest = this.onVerifyInternalAttributeRequest.bind(this)
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

    onVerifyInternalAttributeRequest(data: InternalAttributeVerifyRequest) {
        this.setState({
            current: this.PROCESSING
        })

        this.verify.verifyInternalAttribute(data, this.onAttributeVerifySuccess, this.onError)
    }

    onVerifyExternalAttributeRequest(data: LinkAttributeVerifyRequest) {
        this.setState({
            current: this.PROCESSING
        })

        this.verify.verifyLinkParse(data, this.onAttributeVerifySuccess, this.onError)
    }

    onAttributeVerifySuccess(entity: AttributeResponseEntity) {
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

    calcContent(data: AttributeVerifyAlertState) {
        if (data.errorResult !== null) {
            return <div>
                <p>{data.errorResult}</p>
            </div>
        } else if (data.lastResult !== null) {
            return <div>
                {data.lastResult.name}
                <br />
                {data.lastResult.mode}
                <hr />
                {this.calcParsedResult(data.lastResult.parseResult)}
            </div>
        }
    }

    calcParsedResult(data: Array<string>) {
        if (data.length === 0) {
            return (
                <div>
                    <p>No parsed result! :(</p>
                    <br />
                    <p>Please make sure that you have used corrent jsoup query string. </p>
                </div>
            )
        } else {
            return (
                <div>
                    {data.map((d, idx) => {
                        return (
                            <div>
                                {d}
                            </div>)
                    })}
                </div>
            )
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

export default AttributeVerifyAlert