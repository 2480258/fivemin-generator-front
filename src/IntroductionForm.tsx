import React, { SyntheticEvent, useState } from "react";

type IntroductionFormProps = {

}

type IntroductionFormState = {

}



class IntroductionForm extends React.Component<IntroductionFormProps, IntroductionFormState> {
    render() {
        return (
            <div>
                <h1>Welcome to Fivemin-Crawler-generator</h1>
                <p>Before start, please read <a href="https://github.com/2480258/FiveMinCrawler/blob/master/GUIDE.md">guide</a> first. It should help you understand how this works.</p>
                <hr />
            </div>
        )
    }
}

export default IntroductionForm