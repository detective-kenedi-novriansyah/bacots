import { Store, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import reduxLogger from "redux-logger";
import loadStore from "../store";
import { routerMiddleware, RouterState } from "connected-react-router";
import { createBrowserHistory } from "history";
import { SchemaState } from "../constant/schemaTypes";
import { UserState } from "../constant/userTypes";
import { BookState } from "../constant/bookSchema";
import { CourseState } from "../constant/courseTypes";
import { SubscribeState } from "../constant/subcribeTypes";

export const history = createBrowserHistory();

export interface ApplicationState {
  router: RouterState;
  schema: SchemaState;
  user: UserState;
  book: BookState;
  course: CourseState;
  subscribe: SubscribeState;
}

export default function configureStore(preloadedState?: any) {
  const middleware = [reduxThunk];
  const store: Store<ApplicationState> = createStore(
    loadStore(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(...middleware, reduxLogger, routerMiddleware(history))
    )
  );
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(loadStore(history));
    });
  }
  return store;
}
