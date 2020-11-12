import { Dialog, DialogContent } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../configureStore'
import _ from 'lodash'
import moment from 'moment'
import { useHistory } from 'react-router'
import { detailAuth } from '../../../actions/authActions'
import { fetchDetailContent } from '../../../actions/contentActions'

interface ContextProps {
    open: boolean;
    handleClickClose(e: React.MouseEvent<HTMLElement>) : void;
}

export const DialogNotificationContext = React.createContext<Partial<ContextProps>>({})
export const DialogNotificationContextApp = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const is_info = useSelector((state: ApplicationState) => state.auth.notification)

    const onClickMoveProfile = (newValue: string) => {
        dispatch(detailAuth(newValue,history))
    }

    const onClickDetailContent = (newValue: string) => {
        dispatch(fetchDetailContent(newValue,history))
    }
    return <DialogNotificationContext.Consumer>
        {
            ({open, handleClickClose}) => {
                return (
                    <Dialog open={open} onClose={handleClickClose} fullScreen>
                        <DialogContent>
                            <div>
                                Dropdown
                            </div>
                        </DialogContent>
                    </Dialog>
                )
            }
        }
    </DialogNotificationContext.Consumer>
}