import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { AuthState } from '../../constant/authSchma'
import { UserState } from '../../constant/userSchema'

interface ContextProps {
    user: UserState;
    validateUser: boolean;
    auth: AuthState;
    validateAuth: boolean;
    handleClickClose(e: React.MouseEvent<HTMLElement>) : void;
}

export const ValidateContext = React.createContext<Partial<ContextProps>>({})

export const ValidateContextApp: React.FunctionComponent = () => {
    return (
        <ValidateContext.Consumer>
            {
                ({user, validateUser, validateAuth, auth, handleClickClose}) => {
                    if(validateUser) {
                        return (
                            <Snackbar open={validateUser} onClose={handleClickClose}>
                                <Alert onClose={handleClickClose} severity={user.message.validate ? "success" : "error"}>
                                    {user.message.message}
                                </Alert>
                            </Snackbar>
                        )
                    } else {
                        return (
                            <Snackbar open={validateAuth} onClose={handleClickClose}>
                                <Alert onClose={handleClickClose} severity={auth.message.validate ? "success" : "error"}>
                                    {auth.message.message}
                                </Alert>
                            </Snackbar>
                        )
                    }
                }
            }
        </ValidateContext.Consumer>
    )
}