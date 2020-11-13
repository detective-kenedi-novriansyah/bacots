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
    public_id?: string;
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
    username_validate?: string;
    email_validate?: string
    old_email?: string;
    new_email?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    first_name_validate?: string;
    last_name_validate?: string;
    token?: string;
    password?: string;
    old_password?: string;
    new_password?: string;
    confirm_password?: string;
    password_validate?: string;
    password_regex?: string;
    old_password_validate?: string;
    new_password_validate?: string;
    confirm_password_validate?: string;
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
    follow_default?: Follow
    followers_count?: number;
    followed_count?: string;
}

export interface Likes {
    id?: number;
    info_likes?: string;
    author?: Authenticate;
    create_at?: Moment;
    update_at?: Moment;
    bacot_default?: Content;
}

export interface Comment {
    id?: number;
    comment?: string;
    info_comment?: string;
    author?: Authenticate;
    create_at?: Moment;
    update_at?: Moment;
    bacot_default?: Content;
}

export interface Composite {
    id?: number;
    likes?: Likes;
    comments?: Comment;
    create_at?: Moment;
    update_at?: Moment;
}

export interface Notification {
    public_id?: string;
    author?: Authenticate;
    notifications?: string;
    info?: Composite[];
}

export interface Choice {
    number?: number;
    name?: string;
}

export interface Report {
    id?: number;
    choice?: string | number;
    block?: string | number;
    unfollow?: string | number;
}

export interface Follow {
    id?: number;
    create_at?: Moment;
    update_at?: string;
    followers?: Authenticate[];
    followed?: Authenticate[];
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
        edit?: string;
        settings?: string;
        logout?: string;
        edit_profile?: string;
        change_email?: string;
        change_password?: string;
        change_privasi?: string;
        save?: string;
        personal_information?: string;
        forgot_user?: string;
        submit?: string;
        follow?: string;
        followers?: string;
        followed?: string;
    }
    validate?: {
        validate_not_found?: string;
    }
    bacot?: {
        description?: string;
    }
    report?: {
        choice?: Choice[],
        block?: string;
        unfollow?: string;
        title?: string;
        done_title?: string;
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

export interface ChangeSecurityState {
    old_password: string;
    password: string;
    confirm_password: string;
}

export type  RetrieveUser = Pick<User, "username" | "email" | "password" | "id">

export interface FollowState {
    followers?: number;
    user?: string;
}

export interface ChoiceFollow {
    followers: boolean;
    followed: boolean;
}