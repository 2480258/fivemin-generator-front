import { reference } from "@popperjs/core";
import React, { SyntheticEvent } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import ExportFormat from "./ExportFormat";
import PageInputForm from "./PageInputForm";
import PagePlane from "./PagePlane";
import RequesterFormat from "./RequesterFormat";


type PageTabProps = {

}

type PageTabState = {
    pageList: Array<TabWithAttribute>
}

type TabWithAttribute = {
    name: string
    element: JSX.Element
    reference: PagePlane | null
}

class PageTab extends React.Component<PageTabProps, PageTabState> {

    constructor(props: PageTabProps) {
        super(props)

        this.state = { pageList: [] }
        this.onClick = this.onClick.bind(this)
    }

    onNameChanged(idx: number, name: string) {
        this.setState((prevState) => ({
            pageList: prevState.pageList.map((d, i) => {
                if (i === idx) {
                    return ({
                        name: name,
                        element: d.element,
                        reference: d.reference
                    })
                }

                return d
            })
        }
        ))
    }


    onClick() {
        let attributeRef: PagePlane | null
        const elem = React.createElement(PagePlane, { ref: ref => attributeRef = ref, nameChangedCallback: this.onNameChanged.bind(this, this.state.pageList.length) }, {})


        this.setState((prevState => ({
            pageList: prevState.pageList.concat({ element: elem, reference: attributeRef, name: this.state.pageList.length.toString() })
        })))
    }

    render() {
        return (
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="requester" title="Web Request Setting">
                    <div className="page-tab-content">
                        <RequesterFormat>

                        </RequesterFormat>
                    </div>
                </Tab>


                {this.state.pageList.map((d, idx) => {
                    return (
                        <Tab eventKey={idx} title={"Page: " + d.name}>
                            <div className="page-tab-content">
                                {d.element}
                            </div>
                        </Tab>)
                })}
                <Tab eventKey="add" title="Add Page">
                    <div className="page-tab-content">
                        <Button onClick={this.onClick}>Add Page</Button>
                    </div>
                </Tab>

                <Tab eventKey="exporter" title="Export Setting">

                    <div className="page-tab-content">
                        <ExportFormat>

                        </ExportFormat>
                    </div>
                </Tab>
            </Tabs>
        )
    }
}

export default PageTab