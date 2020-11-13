import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { AuthState } from '../../constant/authSchma'
import { ContentState } from '../../constant/contentSchema'
import { ReportState } from '../../constant/reportSchema'
import { UserState } from '../../constant/userSchema'

interface ContextProps {
    user: UserState;
    validateUser: boolean;
    auth: AuthState;
    report: ReportState
    content: ContentState;
    validateAuth: boolean;
    validateContent: boolean;
    validateReport: boolean;
    handleClickClose(e: React.MouseEvent<HTMLElement>) : void;
}

export const ValidateContext = React.createContext<Partial<ContextProps>>({})

export const ValidateContextApp: React.FunctionComponent = () => {
    return (
        <ValidateContext.Consumer>
            {
                ({user, validateUser, validateAuth, validateContent, validateReport, report, content, auth, handleClickClose}) => {
                    if(validateUser) {
                        return (
                            <Snackbar open={validateUser} onClose={handleClickClose}>
                                <Alert onClose={handleClickClose} severity={user.message.validate ? "success" : "error"} className="knd-validate">
                                    {user.message.message}
                                </Alert>
                            </Snackbar>
                        )
                    } else if(validateAuth){
                        return (
                            <Snackbar open={validateAuth} onClose={handleClickClose}>
                                <Alert onClose={handleClickClose} severity={auth.message.validate ? "success" : "error"} className="knd-validate">
                                    {auth.message.message}
                                </Alert>
                            </Snackbar>
                        )
                    } else if(validateContent) {
                        return (
                            <Snackbar open={validateContent} onClose={handleClickClose}>
                                <Alert onClose={handleClickClose} severity={content.message.validate ? "success" : "error"} className="knd-validate">
                                    {content.message.message}
                                </Alert>
                            </Snackbar>
                        )
                    } else if(validateReport) {
                        return (
                            <Snackbar open={validateReport} onClose={handleClickClose}>
                                <Alert onClose={handleClickClose} severity={report.message.validate ? "success" : "error"} className="knd-validate">
                                    {report.message.message}
                                </Alert>
                            </Snackbar>
                        )
                    }
                }
            }
        </ValidateContext.Consumer>
    )
}