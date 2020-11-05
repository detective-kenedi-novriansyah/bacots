import { UserState } from "./userTypes";
import React from "react";

export interface User {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  confirmPassword?: string;
  token?: string;
}

export interface Authenticate {
  id?: number;
  avatar?: string;
  country?: string;
  city?: string;
  address?: string;
  user?: User;
}

export interface Course {
  id?: number;
  name?: string;
  description?: string;
  link?: string;
  book?: number;
  author?: Authenticate;
}

export interface Book {
  id?: number;
  name?: string;
  image?: string;
  course?: Course;
  description?: string;
  author?: Authenticate;
}

export interface Subscribe {
  token?: string;
}

export interface Schema {
  button?: {
    signin?: string;
    login?: string;
    titleLogin?: string;
    register?: string;
    createNewAccount?: string;
    join?: string;
    regexPassword?: string;
    titleRegister?: string;
    childTitleRegister?: string;
    forgot?: string;
    forgotButton?: string;
    titleForgot?: string;
    childTitleForgot?: string;
    readyExists?: string;
    course?: string;
    uploadBook?: string;
    uploadCourse?: string;
    settings?: string;
    logout?: string;
    submit?: string;
  };
  book?: Book;
  validate?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    token?: string;
  };
  my: {
    hai?: string;
    username?: string;
    job?: string;
    avatar?: string;
    contact?: string;
    contactPhoneWa?: string;
    email?: string;
    about?: string;
    experince?: string;
    aboutMe?: string;
    skill?: string;
    thanks?: string;
    validateSuccess?: string;
    savePhone?: string;
    saveEmail?: string;
    subscribe?: string;
    manipulations?: string;
    emailAddress?: string;
    cancel?: string;
  };
  auth?: Authenticate;
}

export interface Message {
  message?: string;
}

export type LoginUserState = Pick<User, "username" | "password">;
export type RecordUserState = Pick<
  User,
  "username" | "email" | "password" | "confirmPassword"
>;
export type ResetUserState = Pick<User, "token">;
export type SubscribeRequestState = Pick<Subscribe, "token">;

export type RecordBookState = Pick<Book, "name" | "image" | "author">;
export type RecordCouseState = Pick<
  Course,
  "name" | "description" | "book" | "author"
>;

export interface ValidateState {
  user: {
    validate: boolean;
    loading: boolean;
  };
  book: {
    validate: boolean;
    loading: boolean;
  };
  subscribe: {
    validate: boolean;
    loading: boolean;
  };
}

export type InputProps = React.ChangeEvent<HTMLInputElement>;
export type TextareaProps = React.ChangeEvent<HTMLTextAreaElement>;
export type FormProps = React.FormEvent<HTMLFormElement>;
