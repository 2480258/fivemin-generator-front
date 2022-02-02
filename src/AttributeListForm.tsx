import React, { SyntheticEvent } from "react";
import { Accordion } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AttributeInputForm, { HtmlData } from "./AttributeInputForm";
import AttributeInputFormProps from "./AttributeInputForm"
import AttributeInputFormState from "./AttributeInputForm"

type AttributeWithRef = {
    element: JSX.Element
    reference: AttributeInputForm | null
}

type AttributeListFormProps = {
    getHtmlData: () => HtmlData
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
    }


    onButtonPressed() {
        this.addAttribute()
    }

    addAttribute() {
        this.setState((prevState) => ({
            attributeCount: prevState.attributeCount + 1
        }))
    }


    render() {
        this.attributeRefList = []

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
                                        <AttributeInputForm key={idx} id={idx} getHtmlData={this.props.getHtmlData} ref={refs => this.attributeRefList.push(refs)}></AttributeInputForm>
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