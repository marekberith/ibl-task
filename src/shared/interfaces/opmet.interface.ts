export interface OpmetParam {
    id: string, 
    reportTypes: string[],
    stations: string[],
    countries: string[]
}

export interface OpmetQuery {
    id: string,
    method: string,
    params: OpmetParam[]
}

export interface OpmetResult {
    placeId: string,
    queryType: string,
    receptionTime: string,
    refs: string[],
    reportTime: string,
    reportType: string,
    revision: string,
    stationId: string,
    text: string,
    textHtml: string
}

export interface OpmetResponse {
    error: string,
    id: string,
    result: OpmetResult[]
}