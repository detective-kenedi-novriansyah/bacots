import { Message, Subscribe } from ".";

export enum SubscribeTypes {
  REQUEST_SUBDCRIBE = "REQUEST_SUBDCRIBE",
  SUBSCRIBE_FAILURE = "SUBSCRIBE_FAILURE",
}

export interface SubscribeState {
  readonly subscribe: Subscribe[];
  readonly data: Subscribe;
  readonly validate: boolean;
  readonly message: Message;
}
