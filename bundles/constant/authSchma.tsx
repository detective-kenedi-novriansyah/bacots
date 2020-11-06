import { Authenticate, Message } from "./interface";

export enum AuthTypes {
    IS_AUTHENTICATE = 'IS_AUTHENTICATE',
    EXPIRES_TOKEN = 'EXPIRES_TOKEN',
    CLOSE_ALERT = 'CLOSE_ALERT'
}

export interface AuthState {
    readonly auth: Authenticate[];
    readonly data: Authenticate;
    readonly is_authenticate: Authenticate;
    readonly validate: boolean;
    readonly message: Message;
}