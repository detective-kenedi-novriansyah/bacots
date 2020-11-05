import { Reducer } from "redux";
import { BookState, BookTypes } from "../constant/bookSchema";

const initialState: BookState = {
  book: [],
  data: {},
  validate: false,
  loadingScreen: true,
  message: {},
};

export const bookReducer: Reducer<BookState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BookTypes.RECORD_BOOK:
      return {
        ...state,
        book: [action.payload.book, ...state.book],
        validate: action.payload.validate,
        message: action.payload.message,
      };
      break;
    case BookTypes.L_BOOK:
      return {
        ...state,
        book: action.payload.book,
        loadingScreen: action.payload.loadingScreen,
      };
      break;
    case BookTypes.DSTRY_BOOK:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.message,
        book: state.book.filter(function (x) {
          return x.id !== action.payload.id;
        }),
      };
      break;
    case BookTypes.RTR_BOOK:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payliad.message,
        book: state.book.filter((x) =>
          x.id === action.payload.id ? action.payload.book : x
        ),
      };
      break;
    case BookTypes.BOOK_FAILURE:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.message,
      };
      break;
    default:
      return state;

      break;
  }
};
