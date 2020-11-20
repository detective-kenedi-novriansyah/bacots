import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { isAuthenticate } from '../actions/authActions'
import { fetchSchema } from '../actions/schemaActions'
import KndChangePassword from '../components/auth/change_password'
import { DialogFollowContext, DialogFollowContextApp } from '../components/auth/dialogFollow'
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
import KndLegal from '../components/legal'
import Navbar from '../components/navbar'
import { DialogFilterAuthContext, DialogFilterAuthContextApp } from '../components/navbar/dialogFilterAuth'
import { DialogNotificationContext, DialogNotificationContextApp } from '../components/navbar/dialogFull'
import { DrawerAuthContext, DrawerAuthContextApp } from '../components/navbar/drawerAuth'
import { ValidateContext, ValidateContextApp } from '../components/validate'
import { ApplicationState } from '../configureStore'
import { AuthTypes } from '../constant/authSchma'
import { ContentTypes } from '../constant/contentSchema'
import { ChoiceFollow } from '../constant/interface'
import { ReportTypes } from '../constant/reportSchema'
import { UserTypes } from '../constant/userSchema'

const Routes = () => {
    const store = useSelector((state: ApplicationState) => state)
    const choice: ChoiceFollow = {
        followers: false,
        followed: false
    }
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
                is_open_notification: false,
                openDrawerAuth: false
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
        dispatch({
            type: AuthTypes.HIDE_FOLLOW,
            payload: {
                choiceFollow: choice
            }
        })
    }

    const handleClickCloseDrawer = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        document.querySelector('body').style.overflow = 'auto'
        dispatch({
            type: AuthTypes.CLOSE_DRAWER,
            payload: {
                openDrawerAuth: false,
                openDialogAuth: false
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
        <DialogFilterAuthContext.Provider value={{
            open: store.auth.openDialogAuth,
            handleClickClose: handleClickCloseDrawer
        }}>
            <DialogFilterAuthContextApp/>
            <DrawerAuthContext.Provider value={{
                open: store.auth.openDrawerAuth,
                handleClickClose: handleClickCloseDrawer
            }}>
                <DrawerAuthContextApp/>
                <DialogFollowContext.Provider value={{
                    open: store.auth.choiceFollow,
                    handleClickClose
                }}>
                <DialogFollowContextApp/>
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
                                                <Route path={['/','/public']} exact={true} render={({location}) => localStorage.getItem('token') ? (
                                                    <Home/>
                                                ) : (
                                                    <Redirect to={{pathname: '/signin', state: { from: location}}}/>
                                                )}/>
                                                <Route path="/signin" render={({location}) => localStorage.getItem('token') ? (
                                                    <Redirect to={{ pathname: '/signin', state: { from: location } }}/>
                                                ) : (
                                                    <LoginScreen/>
                                                )}/>
                                                <Route path="/signup" render={({location}) => localStorage.getItem('token') ? (
                                                    <Redirect to={{ pathname: '/signin', state: { from: location } }}/>
                                                ) : (
                                                    <RegisterScreen/>
                                                )}/>
                                                <Route path="/forgot" render={({location}) => localStorage.getItem('token') ? (
                                                    <Redirect to={{ pathname: '/signin', state: { from: location } }}/>
                                                ) : (
                                                    <ForgotScreen/>
                                                )}/>
                                                <Route path="/detail" render={({location}) => localStorage.getItem('token') ? (
                                                    <KndDetail/>
                                                ) : (<Redirect to={{pathname: '/signin', state: {from: location} }}/>
                                                )}/>
                                                <Route path="/profile" render={({location}) => localStorage.getItem('token') ? (
                                                    <KndProfile/>
                                                ) : (<Redirect to={{pathname: '/signin', state: {from: location} }}/>
                                                )}/>
                                                <Route path="/editprofile" render={({location}) => localStorage.getItem('token') ? (
                                                    <KndFormEditProfile/>
                                                ) : (<Redirect to={{pathname: '/signin', state: {from: location} }}/>
                                                )}/>
                                                <Route path="/personalinformation" render={({location}) => localStorage.getItem('token') ? (
                                                    <KndPersonalInformation/>
                                                ) : (<Redirect to={{pathname: '/signin', state: {from: location} }}/>
                                                )}/>
                                                <Route path="/changepassword" render={({location}) => localStorage.getItem('token') ? (
                                                    <KndChangePassword/>
                                                ) : (<Redirect to={{pathname: '/signin', state: {from: location} }}/>
                                                )}/>
                                                <Route path="/legal">
                                                    <KndLegal/>
                                                </Route>
                                            </Switch>
                                        </ValidateContext.Provider>
                                    </DestroyContent.Provider>
                            </RetrieveContentContext.Provider>
                        </DialogNotificationContext.Provider>
                    </DialogReportContext.Provider>
                </DialogFollowContext.Provider>
            </DrawerAuthContext.Provider>
        </DialogFilterAuthContext.Provider>
    )
}

export default Routes