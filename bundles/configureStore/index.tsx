import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import { routerMiddleware, RouterState } from 'connected-react-router'
import Stores from '../store'
import { createBrowserHistory } from 'history'
import { SchemaState } from '../constant/schemaTypes'

export const history = createBrowserHistory();

export interface ApplicationState {
    router: RouterState;
    schema: SchemaState;
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