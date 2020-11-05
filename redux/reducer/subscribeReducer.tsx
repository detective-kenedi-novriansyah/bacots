import { Reducer } from "redux";
import { SubscribeState, SubscribeTypes } from "../constant/subcribeTypes";

const initialState: SubscribeState = {
  subscribe: [],
  data: {},
  validate: false,
  message: {},
};

export const subscribeReducer: Reducer<SubscribeState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SubscribeTypes.REQUEST_SUBDCRIBE:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.message,
      };
      break;

    case SubscribeTypes.SUBSCRIBE_FAILURE:
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
