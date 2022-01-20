import React, { SyntheticEvent } from "react";
import AttributeInputForm from "./AttributeInputForm";
import AttributeInputFormProps from "./AttributeInputForm"
import AttributeInputFormState from "./AttributeInputForm"

type AttributeWithRef = {
    element: JSX.Element
    reference: AttributeInputForm | null
}

type AttributeListFormProps = {

}

type AttributeListFormState = {
    attributeList: Array<AttributeWithRef>
}

class AttributeListForm extends React.Component<AttributeListFormProps, AttributeListFormState> {
    constructor(props: AttributeListForm) {
        super(props)

        this.state = { attributeList: [] }

        this.onButtonPressed = this.onButtonPressed.bind(this)
        this.addAttribute = this.addAttribute.bind(this)
    }


    onButtonPressed() {
        this.addAttribute()
    }

    addAttribute() {
        let attributeRef: AttributeInputForm | null

        const elem = React.createElement(AttributeInputForm, { key: this.state.attributeList.length, id: this.state.attributeList.length, ref: ref => attributeRef = ref }, {})
        this.setState((prevState) => ({
            attributeList: prevState.attributeList.concat({ element: elem, reference: attributeRef })
        }))
    }


    render() {
        return (
            <div>
                {this.state.attributeList.map((d, idx) => {
                    return (
                        <AttributeInputForm key={idx} id={idx} ></AttributeInputForm>
                    )
                })}
                <button onClick={this.onButtonPressed}>Add Attribute</button>
            </div>
        )
    }
}

export default AttributeListForm