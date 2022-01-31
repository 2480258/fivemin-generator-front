import { reference } from "@popperjs/core";
import React, { SyntheticEvent } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import { ExternalAttributeFormState, InternalAttributeFormState } from "./AttributeInputForm";
import ExportFormat from "./ExportFormat";
import JsonExporter, { JsonRequestData } from "./JsonExporter";
import PageInputForm from "./PageInputForm";
import PagePlane from "./PagePlane";
import ParsePageFormat from "./ParsePageFormat";
import RequesterFormat from "./RequesterFormat";

type PageTabProps = {

}

type PageTabState = {
    pageList: Array<TabWithAttribute>
}

type TabWithAttribute = {
    name: string
}

class PageTab extends React.Component<PageTabProps, PageTabState> {
    requestRef: RequesterFormat | null = null
    exporterRef: ExportFormat | null = null
    parseFormatRef: ParsePageFormat | null = null

    pageRef: Array<PagePlane | null> = []

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
                        name: name
                    })
                }

                return d
            })
        }
        ))
    }


    onClick() {
        this.setState((prevState => ({
            pageList: prevState.pageList.concat({ name: this.state.pageList.length.toString() })
        })))
    }

    getJsonData(): JsonRequestData {
        if (this.requestRef === null || this.parseFormatRef === null || this.exporterRef === null) {
            throw Error("null ref")
        }

        return {
            webRequest: {
                userAgent: this.requestRef.state.userAgent
            },
            parseFormat: {
                pages: this.pageRef.map((d, idx) => {
                    if (d === null || d.inputFormRef === null || d.inputFormRef.attributeReference === null || d.inputFormRef.tagReference === null) {
                        throw Error("null ref")
                    }

                    return {
                        name: d.inputFormRef.state.name,
                        uriCondition: d.inputFormRef.state.uriCondition,
                        workingSet: d.inputFormRef.state.workingSet,
                        targetRequester: 'Default',

                        attributes: d.inputFormRef.attributeReference.attributeRefList.map((d, idx) => {
                            if (d === null || d.attributeReference === null) {
                                throw Error("null ref")
                            }

                            return {
                                type: d.state.type,
                                name: d.attributeReference.state.name,
                                queryStr: d.attributeReference.state.regex,
                                uriRegex: (d.attributeReference.state as any).uriRegex,
                                parseMode: (d.attributeReference.state as any).parseMode
                            }
                        }),

                        tag: d.inputFormRef.tagReference.tagRefList.map((d, idx) => {
                            if (d === null) {
                                throw Error("null ref")
                            }

                            return {
                                name: d.state.tagName,
                                tagRegex: d.state.tagRegex,
                                isAlias: d.state.isAlias
                            }
                        })
                    }
                }),
                attributeRequester: 'Default',
                globalConditionRegex: this.parseFormatRef.state.globalConditionRegex,
                bookName: this.parseFormatRef.state.bookName,
            },
            exportFormat: {
                bookName: this.parseFormatRef.state.bookName,
                pages: this.exporterRef.exportPageRef.map((d, idx) => {
                    if (d === null) {
                        throw Error("null ref")
                    }

                    return {
                        pageName: d.state.pageName,
                        targetAttributeName: d.targetAttributeNameRef.map((d, idx) => {
                            if (d === null) {
                                throw Error("null ref")
                            }

                            return d.state.attributeName
                        }),
                        mode: d.state.mode,
                        fileNameExp: d.state.fileNameExp
                    }
                })
            }
        }
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="requester" title="Web Request Setting">
                        <div className="page-tab-content">
                            <RequesterFormat ref={(refs) => this.requestRef = refs}>

                            </RequesterFormat>
                        </div>
                    </Tab>


                    {this.state.pageList.map((d, idx) => {
                        return (
                            <Tab eventKey={idx} title={"Page: " + d.name}>
                                <div className="page-tab-content" key={"page1" + idx}>
                                    <PagePlane ref={refs => this.pageRef.push(refs) } nameChangedCallback={this.onNameChanged.bind(this, idx)} idx={idx} globalCondition={() => this.parseFormatRef?.state.globalConditionRegex ?? ""}>

                                    </PagePlane>
                                </div>
                            </Tab>)
                    })}
                    <Tab eventKey="add" title="Parse Setting">
                        <ParsePageFormat ref={refs => this.parseFormatRef = refs} onGlobalChanged={(val) => this.pageRef.forEach((value) => {
                            value?.inputFormRef?.onUriVerify(null, null, val)
                        })}>

                        </ParsePageFormat>
                        <div className="page-tab-content">
                            <Button onClick={this.onClick}>Add Page</Button>
                        </div>
                    </Tab>

                    <Tab eventKey="exporter" title="Export Setting">

                        <div className="page-tab-content">
                            <ExportFormat ref={(refs) => this.exporterRef = refs}>

                            </ExportFormat>
                        </div>
                    </Tab>
                    <Tab eventKey="jsonSave" title="Save to JSON">

                        <div className="page-tab-content">
                            <JsonExporter getJsonData={() => this.getJsonData()}>

                            </JsonExporter>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default PageTab