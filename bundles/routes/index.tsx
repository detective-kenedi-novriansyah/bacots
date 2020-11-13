import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { isAuthenticate } from '../actions/authActions'
import { fetchSchema } from '../actions/schemaActions'
import KndChangePassword from '../components/auth/change_password'
import KndPersonalInformation from '../components/auth/editProfile/personal_information'
import KndFormEditProfile from '../components/auth/editProfile/profile'
import ForgotScreen from '../components/auth/ForgotScreen'
import LoginScreen from '../components/auth/LoginScreen'
import KndProfile from '../components/auth/profile/knd-profile'
import RegisterScreen from '../components/auth/RegisterScreen'
import Home from '../components/home'
import { DestroyContent, DestroyContentApp } from '../components/home/destoryContent'
import KndDetail from '../components/home/detail'
import { DialogReportContext, DialogReportContextApp } from '../components/home/report'
import { RetrieveContentContext, RetrieveContentContextApp } from '../components/home/retrieveContent'
import Navbar from '../components/navbar'
import { DialogNotificationContext, DialogNotificationContextApp } from '../components/navbar/dialogFull'
import { ValidateContext, ValidateContextApp } from '../components/validate'
import { ApplicationState } from '../configureStore'
import { AuthTypes } from '../constant/authSchma'
import { ContentTypes } from '../constant/contentSchema'
import { ReportTypes } from '../constant/reportSchema'
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
                validate: false,
                is_open_notification: false
            }
        })
        dispatch({
            type: ContentTypes.CLOSE_ALERT,
            payload: {
                validate: false
            }
        })
        dispatch({
            type: ContentTypes.CLOSE_DIALOG,
            payload: {
                openDialog: false,
                openRetrieveDialog: false,
                openDialogReport: false
            }
        })
        dispatch({
            type: ReportTypes.CLOSE_ALERT,
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
        }
    },[])
    
    return (
        <DialogReportContext.Provider value={{
            open: store.content.openDialogReport,
            handleClickClose
        }}>
            <DialogReportContextApp/>
            <DialogNotificationContext.Provider value={{
                open: store.auth.is_open_notification,
                handleClickClose
                }}>
                <DialogNotificationContextApp/>
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
                                report: store.report,
                                validateAuth: store.auth.validate,
                                validateContent: store.content.validate,
                                validateReport: store.report.validate,
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
                                    <Route path="/detail" render={({location}) => localStorage.getItem('token') ? (
                                        <KndDetail/>
                                    ) : (<Redirect to={{pathname: '/', state: {from: location} }}/>
                                    )}/>
                                    <Route path="/profile" render={({location}) => localStorage.getItem('token') ? (
                                        <KndProfile/>
                                    ) : (<Redirect to={{pathname: '/', state: {from: location} }}/>
                                    )}/>
                                    <Route path="/editprofile" render={({location}) => localStorage.getItem('token') ? (
                                        <KndFormEditProfile/>
                                    ) : (<Redirect to={{pathname: '/', state: {from: location} }}/>
                                    )}/>
                                    <Route path="/personalinformation" render={({location}) => localStorage.getItem('token') ? (
                                        <KndPersonalInformation/>
                                    ) : (<Redirect to={{pathname: '/', state: {from: location} }}/>
                                    )}/>
                                    <Route path="/changepassword" render={({location}) => localStorage.getItem('token') ? (
                                        <KndChangePassword/>
                                    ) : (<Redirect to={{pathname: '/', state: {from: location} }}/>
                                    )}/>
                                </Switch>
                            </ValidateContext.Provider>
                        </DestroyContent.Provider>
                </RetrieveContentContext.Provider>
            </DialogNotificationContext.Provider>
        </DialogReportContext.Provider>
    )
}

export default Routes