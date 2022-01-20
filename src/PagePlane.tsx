import React, { SyntheticEvent } from "react";
import AttributeInputForm from "./AttributeInputForm";
import HtmlBox from "./HtmlBox";
import PageInputForm from "./PageInputForm";

type PagePlaneProps = {
    nameChangedCallback: (e: string) => void
}

type PagePlaneState = {
}

class PagePlane extends React.Component<PagePlaneProps, PagePlaneState> {
    inputFormRef: PageInputForm | null

    constructor(props: PagePlaneProps) {
        super(props)

        this.state = { }
        this.inputFormRef = null
    }




    render() {
        return (
            <div className="page-plane">
                <HtmlBox>

                </HtmlBox>
                <PageInputForm ref={el => this.inputFormRef = el} nameChangedCallback={this.props.nameChangedCallback}></PageInputForm>
            </div>
        )
    }
}

export default PagePlane