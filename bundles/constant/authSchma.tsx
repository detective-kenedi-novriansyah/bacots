import { Authenticate, Notification, Content, Message, Follow, ChoiceFollow } from "./interface";

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
    RETRIEVE_AUTH = "RETRIEVE_AUTH",
    FOLLOW_AUTH = "FOLLOW_AUTH",
    SHOW_FOLLOW = "SHOW_FOLLOW",
    HIDE_FOLLOW = "HIDE_FOLLOW",
    FETCH_AUTH = "FETCH_AUTH",
    CLOSE_DRAWER = "CLOSE_DRAWER",
    FILTER_AUTH = "FILTER_AUTH",
    DETAIL_F_AUTH = "DETAIL_F_AUTH",
    DIALOG_FILTER_AUTH = "DIALOG_FILTER_AUTH"
}

export interface AuthState {
    readonly auth: Authenticate[];
    readonly data: Authenticate;
    readonly detail: Authenticate;
    readonly content: Content[];
    readonly is_authenticate: Authenticate;
    readonly is_active_follow: boolean;
    readonly is_auth_active: boolean;
    readonly choiceFollow: ChoiceFollow;
    readonly validate: boolean;
    readonly is_open_notification: boolean;
    readonly message: Message;
    readonly openDrawerAuth: boolean;
    readonly openDialogAuth: boolean;
}