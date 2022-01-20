import React, { SyntheticEvent } from "react";


type RequesterFormatProps = {

}

type RequesterFormatState = {
    userAgent: string
}

class RequesterFormat extends React.Component<RequesterFormatProps, RequesterFormatState> {
    constructor(props: RequesterFormatProps) {
        super(props)

        this.state = {userAgent: ''}
        this.onUserAgentChanged = this.onUserAgentChanged.bind(this)
    }


    onUserAgentChanged(e: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            userAgent: e.currentTarget.value
        })
    }
    
    render() {
        return (
            <div>
                <p>UserAgent:</p>
                <input
                    type="text"
                    value={this.state.userAgent}
                    onChange={this.onUserAgentChanged}
                />

            </div>
        )
    }
}

export default RequesterFormat