import React, { SyntheticEvent } from "react";
import AttributeInputForm from "./AttributeInputForm";
import HtmlBox from "./HtmlBox";
import PageInputForm from "./PageInputForm";
import AttributeVerifyModal from "./AttributeVerifyModal";
import { Button, Modal } from "react-bootstrap";

type PagePlaneProps = {
    nameChangedCallback: (e: string) => void
}

type PagePlaneState = {
}

class PagePlane extends React.Component<PagePlaneProps, PagePlaneState> {
    inputFormRef: PageInputForm | null
    html: HtmlBox | null
    verifyModal: AttributeVerifyModal | null
    infoModal: InfoModal | null = null
    constructor(props: PagePlaneProps) {
        super(props)

        this.state = {}
        this.inputFormRef = null
        this.html = null
        this.verifyModal = null
        this.onVerify = this.onVerify.bind(this)
    }

    onVerify(attributeIndex: number) {
        let attribute: any = this.inputFormRef?.reference?.attributeRefList.at(attributeIndex)?.attributeReference
        let type = this.inputFormRef?.reference?.attributeRefList.at(attributeIndex)?.state.type

        let htmlStr: any = this.html?.state.html
        let uri: any = this.html?.state.uri

        if (type === "Internal") {
            this.verifyModal?.onVerifyInternalAttributeRequest({
                name: attribute.name,
                queryStr: attribute.regex,
                parseMode: attribute.parseMode,

                html: htmlStr,
            })
        } else if (type === "Link" || type === "External") {
            this.verifyModal?.onVerifyExternalAttributeRequest({
                name: attribute.name,
                queryStr: attribute.regex,
                uriRegex: attribute.uriRegex,

                html: htmlStr,
                hostUri: uri
            })
        } else {
            throw "Not supported types"
        }
    }


    render() {
        return (
            <div className="page-plane">

                <HtmlBox ref={refs => this.html = refs}>

                </HtmlBox>
                <PageInputForm ref={el => this.inputFormRef = el} nameChangedCallback={this.props.nameChangedCallback} onVerify={this.onVerify}></PageInputForm>
                <Button onClick={() => { this.infoModal?.open() }}></Button>

                <InfoModal ref={refs => this.infoModal = refs}>

                </InfoModal>
            </div>
        )
    }
}

class InfoModal extends React.Component {
    state = { show: false }

    open() {
        this.setState({
            show: true
        })
    }

    render() {
        return (
            <Modal show={this.state.show} className="info-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>)
    }
}
export default PagePlane