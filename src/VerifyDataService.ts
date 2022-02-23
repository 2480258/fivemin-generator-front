import axios from "axios"

const http = axios.create({

    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    },
    method: "post"
});

export type InternalAttributeVerifyRequest = {
    name: string,
    queryStr: string,
    parseMode: string,

    html: string
}

export type LinkAttributeVerifyRequest = {
    name: string,
    queryStr: string,
    hostUri: string,
    html: string,
    uriRegex: string
}

export type AttributeResponseEntity = {
    mode: string,
    name: string,
    parseResult: Array<string>
}

export type TagRequestEntity = {
    name: string,
    url: string,
    tagRegex: string
}

export type TagResultEntity = {
    name: string,
    value: string,
    flag: any
}

export type VerifyRequestEntity = {
    json: string
}

export type VerifyResponseEntity = {
    collectedErrorMessages: Array<string>,
    notExecutedRules: Array<string>
}

class VerifyDataService {
    request<RequestData, ResponseData>(url: string, params: RequestData, responseCallback: (args0: ResponseData) => void, errorCallback: (reason: string) => void) {
        try {
            http.post(url, params).then((response) => {
                if (response.data.errorCode === undefined) {
                    responseCallback(response.data)
                } else {
                    errorCallback(response.data)
                }
            }).catch((reason) => {
                if (reason?.response?.data?.message) {
                    errorCallback(reason?.response?.data?.message)
                } else {
                    errorCallback(reason.message)
                }
            })
        }
        catch (e) {
            errorCallback((e as Error).message)
        }

    }

    verifyInternalAttribute(data: InternalAttributeVerifyRequest, responseCallback: (args0: AttributeResponseEntity) => void, errorCallback: (reason: string) => void) {
        this.request<InternalAttributeVerifyRequest, AttributeResponseEntity>("/preprocess/text/with/html", data, responseCallback, errorCallback)
    }

    verifyLinkParse(data: LinkAttributeVerifyRequest, responseCallback: (args0: AttributeResponseEntity) => void, errorCallback: (reason: string) => void) {
        this.request<LinkAttributeVerifyRequest, AttributeResponseEntity>("/preprocess/link/with/html", data, responseCallback, errorCallback)
    }

    verifyTag(data: TagRequestEntity, responseCallback: (args0: TagResultEntity) => void, errorCallback: (reason: string) => void) {
        this.request<TagRequestEntity, TagResultEntity>("/preprocess/tag/with/url", data, responseCallback, errorCallback)
    }

    verifyJson(data: VerifyRequestEntity, responseCallback: (args0: VerifyResponseEntity) => void, errorCallback: (reason: string) => void) {
        this.request<VerifyRequestEntity, VerifyResponseEntity>("/verify/json", data, responseCallback, errorCallback)
    }
}

export default VerifyDataService