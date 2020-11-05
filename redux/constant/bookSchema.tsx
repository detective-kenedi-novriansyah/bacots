import { Message, Book } from ".";

export enum BookTypes {
  RECORD_BOOK = "RECORD_BOOK",
  DSTRY_BOOK = "DSTRY_BOOK",
  RTR_BOOK = "RTR_BOOK",
  L_BOOK = "L_BOOK",
  BOOK_FAILURE = "BOOK_FAILURE",
}

export interface BookState {
  readonly book: Book[];
  readonly data: Book;
  readonly validate: boolean;
  readonly loadingScreen: boolean;
  readonly message: Message;
}
