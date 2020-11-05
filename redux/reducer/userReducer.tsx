import { Reducer } from "redux";
import { UserState, UserTypes } from "../constant/userTypes";

const initialState: UserState = {
  user: [],
  data: {},
  is_authenticated: {},
  validate: false,
  message: {},
};

export const userReducer: Reducer<UserState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserTypes.REQUEST_USER:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.message,
      };
      break;
    case UserTypes.REQUEST_USER_DEL:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.message,
        user: state.user.filter(function (x) {
          return x.id !== action.payload.id;
        }),
      };
      break;
    case UserTypes.REQUEST_USER_PUT:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.message,
        user: state.user.filter((x) =>
          x.id === action.payload.id ? action.payload.newUser : x
        ),
      };
      break;
    case UserTypes.USER_FAILURE:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.message,
      };
      break;
    case UserTypes.IS_AUTHENTICATED:
      return {
        ...state,
        is_authenticated: action.payload.is_authenticated
      }
      break
    default:
      return state;
      break;
  }
};
