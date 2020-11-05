import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { fetchSchema } from '../actions/schemaActions'
import Home from '../components/home'

const Routes = () => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        let mounted = true
        if(mounted) {
            dispatch(fetchSchema())
        }
    },[])
    return (
        <Switch>
            <Route path="/" exact={true} component={Home}/>
        </Switch>
    )
}

export default Routes