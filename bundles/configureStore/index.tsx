import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import { routerMiddleware, RouterState } from 'connected-react-router'
import Stores from '../store'
import { createBrowserHistory } from 'history'
import { SchemaState } from '../constant/schemaTypes'
import { UserState } from '../constant/userSchema'
import { AuthState } from '../constant/authSchma'
import { ContentState } from '../constant/contentSchema'

export const history = createBrowserHistory();

export interface ApplicationState {
    router: RouterState;
    schema: SchemaState;
    user: UserState;
    auth: AuthState;
    content: ContentState
}

export default function configureStore(preloadedState?: any) {
    const middleware = [thunkMiddleware]
    const store: Store<ApplicationState> = createStore(
        Stores(history),
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                ...middleware,
                loggerMiddleware,
                routerMiddleware(history)
            )
        )
    )
    if(module.hot) {
        module.hot.accept(() => {
            store.replaceReducer(Stores(history))
        })
    }
    return store
}