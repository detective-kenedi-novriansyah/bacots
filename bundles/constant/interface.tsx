export interface Content {
    description?: string;
    create_at?: string;
    update_at?: string;
    author?: Authenticate
}

export interface User {
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
    avatar?: string;
    country?: string;
    city?: string;
    address?: string;
    phone_number?: string;
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
    }
}

export interface Message {
    message?: string;
    validate?: boolean;
}

export interface LoadingButton {
    loading: boolean;
}

type CompositeUserLoading = User & LoadingButton

export type LoginUser = Pick<CompositeUserLoading, "username" | "password" | "loading">

export type RecordUser = Pick<CompositeUserLoading, "username" | "email" | "password" | "confirm_password" | "first_name" | "last_name" | "loading">
export type ResetUser = Pick<CompositeUserLoading, "token" | "loading">

export type InputProps = React.ChangeEvent<HTMLInputElement>
export type TextareaProps = React.ChangeEvent<HTMLTextAreaElement>
export type FormProps = React.FormEvent<HTMLFormElement>