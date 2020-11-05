import { Message, User } from ".";

export enum UserTypes {
  IS_AUTHENTICATED = "IS_AUTHENTICATED",
  REQUEST_USER = "REQUEST_USER",
  REQUEST_USER_PUT = "REQUEST_USER_PUT",
  REQUEST_USER_DEL = "REQUEST_USER_DEL",
  USER_FAILURE = "USER_FAILURE",
}

export interface UserState {
  readonly user: User[];
  readonly data: User;
  readonly is_authenticated: User;
  readonly validate: boolean;
  readonly message: Message;
}
