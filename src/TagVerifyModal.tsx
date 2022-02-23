import React, { SyntheticEvent, useState } from "react";
import { Tabs, Tab, Button, Modal, Spinner } from "react-bootstrap";
import 'react-responsive-modal/styles.css';

import VerifyDataService, { AttributeResponseEntity, TagRequestEntity, TagResultEntity } from "./VerifyDataService"

type VerifyModalProps = {

}

type VerifyModalState = {
    openModal: boolean
    elementInternal: JSX.Element | null
}

class TagVerifyModal extends React.Component<VerifyModalProps, VerifyModalState> {
    readonly verify = new VerifyDataService()

    constructor(props: VerifyModalState) {
        super(props)

        this.setState({
            openModal: false,
            elementInternal: <div>
                <p>Loading....</p>
                <Spinner animation="border" />
            </div>
        })

        
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onVerifyTagRequest = this.onVerifyTagRequest.bind(this)
        this.onTagVerifySuccess = this.onTagVerifySuccess.bind(this)
        this.onError = this.onError.bind(this)
    }

    onCloseModal = () => {
        this.setState({ openModal: false })
    }

    onVerifyTagRequest(data: TagRequestEntity) {
        this.setState({ openModal: true })

        this.verify.verifyTag(data, this.onTagVerifySuccess, this.onError)
    }

    onTagVerifySuccess(entity: TagResultEntity) {
        this.setState({
            elementInternal: <div>
                <p>Name: </p>
                {entity.name}
                <br />
                <p>Value: </p>
                {entity.value}
            </div>
        })
    }

    onError(message: string) {
        this.setState({
            elementInternal: <div>
                <h2>Error!</h2>
                <p>{message}</p>
            </div>
        })
    }


    render() {
        return (
            <div>
                <Modal open={this.state.openModal} onClose={this.onCloseModal}>
                    <h1>Verifying Attributes!</h1>
                </Modal>
            </div>
        )
    }
}