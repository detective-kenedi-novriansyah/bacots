import { Authenticate, Content, Message } from "./interface";

export enum AuthTypes {
    IS_AUTHENTICATE = 'IS_AUTHENTICATE',
    DETAIL_AUTH = "DETAIL_AUTH",
    FAILURE_AUTH = "FAILURE_AUTH",
    EXPIRES_TOKEN = 'EXPIRES_TOKEN',
    CLOSE_ALERT = 'CLOSE_ALERT',
    RECORD_CONTENT = "RECORD_CONTENT",
    DESTROY_CONTENT = "DESTROY_CONTENT",
    RETRIEVE_CONTENT = "RETRIEVE_CONTENT"
}

export interface AuthState {
    readonly auth: Authenticate[];
    readonly data: Authenticate;
    readonly content: Content[];
    readonly is_authenticate: Authenticate;
    readonly validate: boolean;
    readonly message: Message;
}