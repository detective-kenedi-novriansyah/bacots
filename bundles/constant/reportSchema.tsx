import {Message, Report} from './interface'

export enum ReportTypes {
    REQUEST_REPORT = "REQUEST_REPORT",
    FAILURE_REPORT = "FAILURE_REPORT",
    CLOSE_ALERT = "CLOSE_ALERT"
}

export interface ReportState {
    readonly report: Report[];
    readonly data: Report
    readonly validate: boolean;
    readonly message: Message
}