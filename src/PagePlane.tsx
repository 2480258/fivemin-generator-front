import React, { SyntheticEvent } from "react";
import AttributeInputForm, { HtmlData } from "./AttributeInputForm";
import HtmlBox from "./HtmlBox";
import PageInputForm from "./PageInputForm";
import { Button, Modal } from "react-bootstrap";

type PagePlaneProps = {
    nameChangedCallback: (e: string) => void
    idx: number
    globalCondition: () => string
}

type PagePlaneState = {
}

class PagePlane extends React.Component<PagePlaneProps, PagePlaneState> {
    inputFormRef: PageInputForm | null
    html: HtmlBox | null
    

    constructor(props: PagePlaneProps) {
        super(props)

        this.state = {}
        this.inputFormRef = null
        this.html = null

        this.getHtmlData = this.getHtmlData.bind(this)
    }

    getHtmlData(): HtmlData {
        return {
            html: this.html?.state.html as string,
            uri: this.html?.state.uri as string
        }
    }

    render() {
        return (
            <div className="page-plane">

                <HtmlBox ref={refs => this.html = refs} onUriChanged={val => this.inputFormRef?.onUriVerify(null, val, null)}>

                </HtmlBox>
                <PageInputForm ref={el => this.inputFormRef = el} nameChangedCallback={this.props.nameChangedCallback} getHtmlData={this.getHtmlData} idx={this.props.idx} getGlobalCondition={this.props.globalCondition}></PageInputForm>
            </div>
        )
    }
}

export default PagePlane