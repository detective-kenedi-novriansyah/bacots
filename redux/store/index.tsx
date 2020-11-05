import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from "history";
import { schemaReducer } from "../reducer/schemaReducer";
import { userReducer } from "../reducer/userReducer";
import { bookReducer } from "../reducer/bookReducer";
import { courseReducer } from "../reducer/couseReducer";
import { subscribeReducer } from "../reducer/subscribeReducer";

const loadStore = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    schema: schemaReducer,
    user: userReducer,
    course: courseReducer,
    book: bookReducer,
    subscribe: subscribeReducer,
  });

export default loadStore;
