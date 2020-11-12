import { Authenticate, Notification, Content, Message } from "./interface";

export enum AuthTypes {
    IS_AUTHENTICATE = 'IS_AUTHENTICATE',
    DETAIL_AUTH = "DETAIL_AUTH",
    FAILURE_AUTH = "FAILURE_AUTH",
    EXPIRES_TOKEN = 'EXPIRES_TOKEN',
    CLOSE_ALERT = 'CLOSE_ALERT',
    RECORD_CONTENT = "RECORD_CONTENT",
    DESTROY_CONTENT = "DESTROY_CONTENT",
    RETRIEVE_CONTENT = "RETRIEVE_CONTENT",
    OPEN_DIALOG_NOTIFICATION = "OPEN_DIALOG_NOTIFICATION",
    RETRIEVE_AUTH = "RETRIEVE_AUTH"
}

export interface AuthState {
    readonly auth: Authenticate[];
    readonly data: Authenticate;
    readonly content: Content[];
    readonly notification: Notification
    readonly is_authenticate: Authenticate;
    readonly validate: boolean;
    readonly is_open_notification: boolean;
    readonly message: Message;
}