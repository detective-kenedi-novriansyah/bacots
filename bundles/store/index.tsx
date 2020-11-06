import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { authReducer } from '../reducer/authReducer'
import { contentReducer } from '../reducer/contentReducer'
import { schemaReducer } from '../reducer/schemaReducer'
import { userReducer } from '../reducer/userReducer'

const fetchStore = (history: History) => combineReducers({
    router: connectRouter(history),
    schema: schemaReducer,
    user: userReducer,
    auth: authReducer,
    content: contentReducer
})

export default fetchStore