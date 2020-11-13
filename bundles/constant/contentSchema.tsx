import { Content, Message } from './interface'

export enum ContentTypes {
    MOVE_DETAIL_CONTENT = "MOVE_DETAIL_CONTENT",
    DESTROY_DETAIL_COMMENT = "DESTROY_DETAIL_COMMENT",
    DESTROY_COMMENT = "DESTROY_COMMENT",
    COMMENT_CONTENT = "COMMENT_CONTENT",
    LIKES_CONTENT = "LIKES_CONTENT",
    RETRIEVE_CONTENT = "RETRIEVE_CONTENT",
    RETRIEVE_CONTENT_DIALOG = "RETRIEVE_CONTENT_DIALOG",
    RECORD_CONTENT = "RECORD_CONTENT",
    DETAIL_CONTENT = "DETAIL_CONTENT",
    DETAIL_CONTENT_DIALOG = "DETAIL_CONTENT_DIALOG",
    CLOSE_DIALOG = "CLOSE_DIALOG",
    DESTROY_CONTENT = "DESTROY_CONTENT",
    LOAD_CONTENT = "LOAD_CONTENT",
    FAILURE_CONTENT = 'FAILURE_CONTENT',
    CLOSE_ALERT = "CLOSE_ALERT",
    DIALOG_REPORT = "DIALOG_REPORT"
}

export interface ContentState {
    readonly content: Content[];
    readonly detail: Content;
    readonly openDialog: boolean;
    readonly openDialogReport: boolean;
    readonly activeReport: boolean;
    readonly validate: boolean;
    readonly softDetail: boolean
    readonly loadingScreen: boolean;
    readonly openRetrieveDialog: boolean;
    readonly message: Message
}