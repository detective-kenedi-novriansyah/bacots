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
import { DestroyContent, DestroyContentApp } from '../components/home/destoryContent'
import { RetrieveContentContext, RetrieveContentContextApp } from '../components/home/retrieveContent'
import Navbar from '../components/navbar'
import { ValidateContext, ValidateContextApp } from '../components/validate'
import { ApplicationState } from '../configureStore'
import { AuthTypes } from '../constant/authSchma'
import { ContentTypes } from '../constant/contentSchema'
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
        dispatch({
            type: ContentTypes.CLOSE_DIALOG,
            payload: {
                openDialog: false,
                openRetrieveDialog: false
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
        <RetrieveContentContext.Provider value={{
            open: store.content.openRetrieveDialog,
            handleClickClose
        }}>
            <RetrieveContentContextApp/>
                <DestroyContent.Provider value={{
                    open: store.content.openDialog,
                    handleClickClose
                }}>
                    <DestroyContentApp/>
                    <ValidateContext.Provider value={{
                        user: store.user,
                        validateUser: store.user.validate,
                        auth: store.auth,
                        validateAuth: store.auth.validate,
                        validateContent: store.content.validate,
                        content: store.content,
                        handleClickClose
                    }}>
                        <ValidateContextApp/>
                        <div className="relative">
                            <Navbar/>
                        </div>
                        <Switch>
                            <Route path="/" exact={true}>
                                <Home/>
                            </Route>
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
                </DestroyContent.Provider>
        </RetrieveContentContext.Provider>
    )
}

export default Routes