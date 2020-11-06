import { Content, Message } from './interface'

export enum ContentTypes {
    LOAD_CONTENT = "LOAD_CONTENT",
    FAILURE_CONTENT = 'FAILURE_CONTENT'
}

export interface ContentState {
    readonly content: Content[];
    readonly detail: Content;
    readonly validate: boolean;
    readonly message: Message
}