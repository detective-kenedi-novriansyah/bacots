import { Reducer } from "redux";
import { SchemaState, SchemaTypes } from "../constant/schemaTypes";

const initialState: SchemaState = {
  schema: {},
};

export const schemaReducer: Reducer<SchemaState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SchemaTypes.LOAD_SCHEMA:
      return {
        ...state,
        schema: action.payload.schema,
      };
      break;
    case SchemaTypes.SCHEMA_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };
      break;
    default:
      return state;
      break;
  }
};
