import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { isAuthenticate } from '../actions/authActions'
import { fetchContent } from '../actions/contentActions'
import { fetchSchema } from '../actions/schemaActions'
import ForgotScreen from '../components/auth/ForgotScreen'
import LoginScreen from '../components/auth/LoginScreen'
import RegisterScreen from '../components/auth/RegisterScreen'
import Home from '../components/home'
import Navbar from '../components/navbar'
import { ValidateContext, ValidateContextApp } from '../components/validate'
import { ApplicationState } from '../configureStore'
import { AuthTypes } from '../constant/authSchma'
import { UserTypes } from '../constant/userSchema'

const Routes = () => {
    const store = useSelector((state: ApplicationState) => state)
    const handleClickClose = (e: React.MouseEvent<HTMLElement>) : void => {
        dispatch({
            type: UserTypes.CLOSE_ALERT,
            payload: {
                validate: false
            }
        })
        dispatch({
            type: AuthTypes.CLOSE_ALERT,
            payload: {
                validate: false
            }
        })
    }
    const dispatch = useDispatch()
    React.useEffect(() => {
        let mounted = true
        if(mounted) {
            dispatch(fetchSchema())
            if(localStorage.getItem('token')) {
                dispatch(isAuthenticate())
            }
            dispatch(fetchContent())
        }
    },[])
    
    return (
        <ValidateContext.Provider value={{
            user: store.user,
            validateUser: store.user.validate,
            auth: store.auth,
            validateAuth: store.auth.validate,
            handleClickClose
        }}>
            <ValidateContextApp/>
            <Navbar/>
            <Switch>
                <Route path="/" exact={true} component={Home}/>
                <Route path="/signin" render={({location}) => localStorage.getItem('token') ? (
                    <Redirect to={{ pathname: '/', state: { from: location } }}/>
                ) : (
                    <LoginScreen/>
                )}/>
                <Route path="/signup" render={({location}) => localStorage.getItem('token') ? (
                    <Redirect to={{ pathname: '/', state: { from: location } }}/>
                ) : (
                    <RegisterScreen/>
                )}/>
                <Route path="/forgot" render={({location}) => localStorage.getItem('token') ? (
                    <Redirect to={{ pathname: '/', state: { from: location } }}/>
                ) : (
                    <ForgotScreen/>
                )}/>
            </Switch>
        </ValidateContext.Provider>
    )
}

export default Routes