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

                <h1>Page Configurator</h1>

                <br />
                <p>Here section is for describing file-saving(serializing) related actions.</p>
                <hr />
                <h2>Notations</h2>
                <h3>Document</h3>
                <p>Document means web pages (on other words, HTML files), literally.</p>

                <h3>Page</h3>
                <p>Page means kinds of documents. For example, You can name documents that containing list of images as "
                    ImageListPage"<br />Pages can convert a document to attributes and conditions for documents.
                </p>

                <h3>Attribute</h3>
                <p>Attribute means what you want to extract. (Parsed text contents, downloaded images, links, and other things)</p>
                <hr />
                <p>Start by press 'Add Export Page' button. <br /> Hover or focus input box for more information.</p>
                <hr />



                <HtmlBox ref={refs => this.html = refs} onUriChanged={val => this.inputFormRef?.onUriVerify(null, val, null)}>

                </HtmlBox>
                <PageInputForm ref={el => this.inputFormRef = el} nameChangedCallback={this.props.nameChangedCallback} getHtmlData={this.getHtmlData} idx={this.props.idx} getGlobalCondition={this.props.globalCondition}></PageInputForm>
            </div>
        )
    }
}

export default PagePlane