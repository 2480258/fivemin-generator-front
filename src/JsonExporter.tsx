import { saveAs } from "file-saver";
import React, { SyntheticEvent } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import JsonVerifyAlert from "./JsonVerify";

export type JsonRequestData = {
    webRequest: WebRequest,
    exportFormat: ExportFormat,
    parseFormat: ParseFormat
}

export type ParseFormat = {
    pages: Array<Page>
    globalConditionRegex: string
    bookName: string
    attributeRequester: string
}

export type WebRequest = {
    userAgent: string
}

export type ExportFormat = {
    pages: Array<ExportPage>
    bookName: string
}

export type ExportPage = {
    pageName: string
    targetAttributeName: Array<string>

    mode: string
    fileNameExp: string
}

export type Page = {
    name: string
    uriCondition: string
    workingSet: boolean
    targetRequester: string

    attributes: Array<PageAttribute>,
    tag: Array<PageTag>
}

export type PageTag = {
    name: string,
    tagRegex: string,
    isAlias: boolean
}

export type PageAttribute = {
    type: string,
    name: string,
    queryStr: string,
    uriRegex: string | null,
    parseMode: string | null,
    preDest: string | null,
    preDestSwitch: boolean | null
}

type JsonExporterProps = {
    getJsonData: () => JsonRequestData
}

type JsonExporterState = {
}

class JsonExporter extends React.Component<JsonExporterProps, JsonExporterState>{
    jsonVerify: JsonVerifyAlert | null = null

    constructor(props: JsonExporterProps) {
        super(props)

        this.onExportClick = this.onExportClick.bind(this)
        this.buildJson = this.buildJson.bind(this)
        this.onDownload = this.onDownload.bind(this)
    }

    buildJson() {
        return {
            'requestFormat': this.buildRequest(this.props.getJsonData().webRequest),
            'parseFormat': this.buildParse(this.props.getJsonData().parseFormat),
            'exportFormat': this.buildExport(this.props.getJsonData().exportFormat)
        }
    }

    buildRequest(webRequestFormat: WebRequest) {
        return {
            'engines': [
                {
                    'requesterEngineName': 'Default',
                    'type': 'Default',
                    'requesters': [
                        {
                            'userAgent': webRequestFormat.userAgent
                        }
                    ]
                }
            ],
            'cookiePolicies': []
        }
    }

    buildParse(parseFormat: ParseFormat) {
        return {
            'bookName': parseFormat.bookName,
            'globalCondition': {
                'uriRegex': parseFormat.globalConditionRegex
            },
            'pages': parseFormat.pages.map((d, idx) => {
                return {
                    'pageName': d.name,
                    'condition': {
                        'uriRegex': d.uriCondition
                    },
                    'internalAttributes': d.attributes.filter(attr => attr.type === 'Internal').map((a, idx) => {
                        return {
                            'attributeName': a.name,
                            'queryStr': a.queryStr,
                            'parseMode': a.parseMode
                        }
                    }),
                    'externalAttributes': d.attributes.filter(attr => attr.type === 'External').map((a, idx) => {
                        return {
                            'attributeName': a.name,
                            'queryStr': a.queryStr,
                            'uriRegex': a.uriRegex
                        }
                    }),
                    'linkAttributes': d.attributes.filter(attr => attr.type === 'Link').map((a, idx) => {
                        return {
                            'attributeName': a.name,
                            'queryStr': a.queryStr,
                            'uriRegex': a.uriRegex,
                            ...a.preDestSwitch && {'destPage': a.preDest}
                        }
                    }),
                    'targetContainer': {
                        'workingSetMode': d.workingSet ? "Enabled" : "Disabled"
                    },
                    'tag': d.tag.map((a, idx) => {
                        return {
                            'name': a.name,
                            'tagRegex': a.tagRegex,
                            'isAlias': a.isAlias
                        }
                    }),
                    'targetRequesterEngine': {
                        'targetRequester': 'Default'
                    }
                }
            }),
            'attributeRequester': {
                'targetRequester': 'Default'
            }
        }
    }

    buildExport(exportFormat: ExportFormat) {
        return {
            'bookName': exportFormat.bookName,
            'pages': exportFormat.pages.map((d, idx) => {
                return {
                    'pageName': d.pageName,
                    'targetAttributeName': d.targetAttributeName,
                    'adapter': {
                        'mode': d.mode,
                        'fileNameTagExp': d.fileNameExp
                    }
                }
            })
        }
    }

    onExportClick() {
        let json = this.buildJson()
        let jsonStr = JSON.stringify(json)

        this.jsonVerify?.onVerifyJsonVerifyRequest({
            json: jsonStr
        })
    }

    onDownload() {
        let json = this.buildJson()
        let fileName = "Book_" + json.parseFormat.bookName + ".json"
        let jsonStr = JSON.stringify(json, null, 4)

        this.jsonVerify?.onVerifyJsonVerifyRequest({
            json: jsonStr
        })

        let blob = new Blob([jsonStr], { type: "application/json" })

        saveAs(blob, fileName)
    }

    render() {
        return (
            <div>

                <h1>Congratulations! you finally here XD</h1>
                <br />
                <p>Press below button to verify and export configuration.</p>
                <hr />


                <JsonVerifyAlert ref={refs => this.jsonVerify = refs} onDownload={this.onDownload}>

                </JsonVerifyAlert>

                <Button onClick={this.onExportClick}>Verify and download configuration</Button>

            </div>
        )
    }
}

export default JsonExporter