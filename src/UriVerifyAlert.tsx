import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { HtmlData } from "./AttributeInputForm";

type UriVerifyAlertProps = {
}

type UriVerifyAlertState = {
    currentMatches: Boolean
    globalMatches: Boolean
}


class UriVerifyAlert extends React.Component<UriVerifyAlertProps, UriVerifyAlertState> {
    constructor(props: UriVerifyAlertProps) {
        super(props)

        this.state = {
            currentMatches: false,
            globalMatches: false
        }
    }


    onVerify(givenUri: string, curMatch: string, globMatch: string) {
        var _globalMatches = globMatch !== "" ? new RegExp(globMatch).test(givenUri) : false
        var _currentMatches = curMatch !== "" ? new RegExp(curMatch).test(givenUri) : false

        this.setState({
            currentMatches: _currentMatches,
            globalMatches: _globalMatches
        })
    }


    readonly verifyURLPopover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Editing attribute</Popover.Header>
            <Popover.Body>
                <p>Showing result of condition regex matches. <br /> <strong>If result is incorrect, please check right URL box or Regex.</strong></p>
            </Popover.Body>
        </Popover>
    );


    render() {
        return (
            <div>
                <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={this.verifyURLPopover}>
                    <div>
                        <p>Does matches with Global Condition? {this.state.globalMatches ? "✔️" : "❌"}</p>
                        <p>Does matches with Current Page Condition? {this.state.currentMatches ? "✔️" : "❌"}</p>
                    </div>
                </OverlayTrigger>
            </div>
        )
    }
}

export default UriVerifyAlert