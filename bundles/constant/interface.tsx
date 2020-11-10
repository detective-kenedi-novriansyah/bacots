import { Moment } from "moment"

export interface Like {
    id?: number;
    info_like?: string;
    create_at?: Moment
    update_at?: Moment
    author?: Authenticate
}

export interface Comment {
    id?: number;
    info_comment?: string;
    comment?: string;
    create_at?: Moment;
    update_at?: Moment;
    author?: Authenticate;
}

export interface Content {
    id?: number;
    description?: string;
    create_at?: Moment;
    update_at?: Moment;
    comment_count?: number;
    like_count?: number;
    like?: Like[];
    comment?: Comment[];
    author?: Authenticate
}

export interface User {
    id?: number
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    token?: string;
    password?: string;
    confirm_password?: string;
    password_regex?: string;
}


export interface Authenticate {
    id?: number
    public_id?: string;
    avatar?: string;
    background?: string;
    country?: string;
    city?: string;
    address?: string;
    phone_number?: string;
    create_at?: Moment;
    update_at?: Moment;
    user?: User
}

export interface Schema {
    auth?: Authenticate;
    button?: {
        signin?: string;
        login?: string;
        register?: string;
        create_new_account?: string;
        forgot?: string;
        title_login?: string;
        title_register?: string;
        child_title_register?: string;
        title_forgot?: string;
        child_title_forgot?: string;
        new_account?: string;
        forgot_button?: string;
        already_account?: string;
        post?: string;
        delete?: string;
        update?: string;
        yes?: string;
        no?: string;
        text_delete?: string;
        close?: string;
        text_update?: string;
        logo?: string;
        comment?: string;
        text_comment?: string;
        send_comment?: string;
        like?: string;
        report?: string;
        back?: string;
    }
    validate?: {
        validate_not_found?: string;
    }
    bacot?: {
        description?: string;
    }
}

export interface Message {
    message?: string;
    validate?: boolean;
}

export interface LoadingButton {
    loading: boolean;
    user?: string;
}

type CompositeUserLoading = User & LoadingButton

export type LoginUser = Pick<CompositeUserLoading, "username" | "password" | "loading">

export type RecordUser = Pick<CompositeUserLoading, "username" | "email" | "password" | "confirm_password" | "first_name" | "last_name" | "loading">
export type ResetUser = Pick<CompositeUserLoading, "token" | "loading">

export type InputProps = React.ChangeEvent<HTMLInputElement>
export type TextareaProps = React.ChangeEvent<HTMLTextAreaElement>
export type FormProps = React.FormEvent<HTMLFormElement>

interface RecordContentState {
    description?: string
    pk?: number;
}

type CompositeBacotLoading = RecordContentState & LoadingButton

export type RecordContent = Pick<CompositeBacotLoading, "description" | "loading" | "user">
export type RetrieveContent = Pick<CompositeBacotLoading, "description" | "loading" | "pk">

export interface LikesContent {
    content?: number;
    user?: string;
    detail?: boolean;
}

export interface CommentContent {
    content?: number;
    user?: string;
    comment?: string;
    detail?: boolean;
    loading?: number;
}

export interface DestroyCommentDetail {
    loading: number;
    detail: boolean
}