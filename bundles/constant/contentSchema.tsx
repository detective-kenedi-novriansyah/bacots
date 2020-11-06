import { Content, Message } from './interface'

export enum ContentTypes {
    RETRIEVE_CONTENT = "RETRIEVE_CONTENT",
    RETRIEVE_CONTENT_DIALOG = "RETRIEVE_CONTENT_DIALOG",
    RECORD_CONTENT = "RECORD_CONTENT",
    DETAIL_CONTENT = "DETAIL_CONTENT",
    DETAIL_CONTENT_DIALOG = "DETAIL_CONTENT_DIALOG",
    CLOSE_DIALOG = "CLOSE_DIALOG",
    DESTROY_CONTENT = "DESTROY_CONTENT",
    LOAD_CONTENT = "LOAD_CONTENT",
    FAILURE_CONTENT = 'FAILURE_CONTENT',
    CLOSE_ALERT = "CLOSE_ALERT"
}

export interface ContentState {
    readonly content: Content[];
    readonly detail: Content;
    readonly openDialog: boolean;
    readonly validate: boolean;
    readonly openRetrieveDialog: boolean;
    readonly message: Message
}