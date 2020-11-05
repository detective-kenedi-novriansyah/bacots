import { Reducer } from "redux";
import { CourseTypes, CourseState } from "../constant/courseTypes";

const initialState: CourseState = {
  course: [],
  data: {},
  validate: false,
  message: {},
};

export const courseReducer: Reducer<CourseState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CourseTypes.RECORD_COUSE:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.message,
        course: [action.payload.course, ...state.course],
      };
      break;
    case CourseTypes.L_COURSE:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.message,
        course: action.payload.course,
      };
      break;
    case CourseTypes.RTR_COURSE:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.message,
        course: state.course.filter((x) =>
          x.id === action.payload.id ? action.payload.course : x
        ),
      };
      break;
    case CourseTypes.DSTRY_COURSE:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.message,
        course: state.course.filter(function (x) {
          return x.id !== action.payload.id;
        }),
      };
      break;
    case CourseTypes.FAILURE_COURSE:
      return {
        ...state,
        validate: action.payload.validate,
        message: action.payload.messag,
      };
      break;
    default:
      return state;
      break;
  }
};
