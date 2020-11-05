import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { schemaReducer } from '../reducer/schemaReducer'

const fetchStore = (history: History) => combineReducers({
    router: connectRouter(history),
    schema: schemaReducer
})

export default fetchStore