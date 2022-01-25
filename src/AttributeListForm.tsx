import React, { SyntheticEvent } from "react";
import { Accordion } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AttributeInputForm from "./AttributeInputForm";
import AttributeInputFormProps from "./AttributeInputForm"
import AttributeInputFormState from "./AttributeInputForm"

type AttributeWithRef = {
    element: JSX.Element
    reference: AttributeInputForm | null
}

type AttributeListFormProps = {
    onVerify: (idx: number) => void
}

type AttributeListFormState = {
    attributeCount: number
}

class AttributeListForm extends React.Component<AttributeListFormProps, AttributeListFormState> {
    attributeRefList: Array<AttributeInputForm | null> = []

    constructor(props: AttributeListFormProps) {
        super(props)

        this.state = { attributeCount: 0 }

        this.onButtonPressed = this.onButtonPressed.bind(this)
        this.addAttribute = this.addAttribute.bind(this)
        this.addRefList = this.addRefList.bind(this)
    }


    onButtonPressed() {
        this.addAttribute()
    }

    addAttribute() {
        this.setState((prevState) => ({
            attributeCount: prevState.attributeCount + 1
        }))
    }

    //addAttribute() {
    //    let attributeRef: AttributeInputForm | null = null
    //    let props = { key: this.state.attributeList.length, id: this.state.attributeList.length, onVerify: () => this.props.onVerify(this.state.attributeList.length) }
    //    const elem = React.createElement(AttributeInputForm, 
    //        { ...props, 
    //            ref: (refs) => attributeRef = refs,  })
    //    this.setState((prevState) => ({
    //        attributeList: prevState.attributeList.concat(elem)
    //    }))
    //    this.attributeRefList.push(attributeRef)
    //}

    addRefList = (element: any) => {
        this.attributeRefList.push(element)
    };


    render() {
        return (
            <div className="attribute-panel">
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {Array.from(Array(this.state.attributeCount).keys()).map((_, idx) => {
                        return (
                            <Accordion.Item eventKey={idx.toString()}>
                                <Accordion.Header>
                                    <h3>Attribute #{idx}</h3>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div key={idx}>
                                        <AttributeInputForm key={idx} id={idx} onVerify={this.props.onVerify.bind(this, idx)} ref={this.addRefList}></AttributeInputForm>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
                <button onClick={this.onButtonPressed} className="mb-2">Add Attribute</button>
            </div>
        )
    }
}

export default AttributeListForm