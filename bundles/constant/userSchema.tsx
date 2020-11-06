import { Message, User } from "./interface";

export enum UserTypes {
    REQUEST_USER = 'REQUEST_USER',
    FAILURE_USER = 'FAILURE_USER',
    CLOSE_ALERT = 'CLOSE_ALERT'
}

export interface UserState {
    readonly user: User[];
    readonly data: User;
    readonly validate: boolean;
    readonly message: Message
}