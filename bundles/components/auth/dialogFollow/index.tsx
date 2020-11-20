import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../configureStore'
import { ChoiceFollow } from '../../../constant/interface'
import _ from 'lodash'
import { useHistory } from 'react-router'
import { detailAuth } from '../../../actions/authActions'
import { AuthTypes } from '../../../constant/authSchma'

interface ContextProps {
    open: ChoiceFollow;
    handleClickClose(e: React.MouseEvent<HTMLElement>) : void;
}

export const DialogFollowContext = React.createContext<Partial<ContextProps>>({})
export const DialogFollowContextApp = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const choice: ChoiceFollow = {
        followers: false,
        followed: false
    }
    const history = useHistory()
    const dispatch = useDispatch()
    const is_authenticate = useSelector((state: ApplicationState) => state.auth.data)

    const onClickProfile = (newValue: string) => {
        dispatch(detailAuth(newValue,history))
        dispatch({
            type: AuthTypes.HIDE_FOLLOW,
            payload: {
                choiceFollow: choice
            }
        })
    }
    const size = window.innerWidth
    return <DialogFollowContext.Consumer>
        {
            ({open, handleClickClose}) => {
                if(open.followed) {
                    return (
                        <Dialog open={open.followed} onClose={handleClickClose} fullScreen={500 > size ? true : false}>
                            <DialogTitle>
                                <div className="knd-dialog-follow">
                                    <div className="knd-dialog-follow-title">
                                        {fields.button ? fields.button.followed : ''}
                                    </div>
                                    <button className="knd-dialog-follow-closed" onClick={handleClickClose}>
                                        <i className="fas fa-times-circle"></i>
                                    </button>
                                </div>
                            </DialogTitle>
                            <DialogContent>
                                <div className="knd-dialog-follow-content">
                                    {_.map(is_authenticate.follow_default ? is_authenticate.follow_default.followed : [], ((base, index) => (
                                        <div className="knd-dialog-follow-headers" key={index}>
                                            <div className="knd-dialog-follow-headers-group">
                                                <img src={base.avatar} alt={base.avatar} className="knd-dialog-follow-headers-avatar"/>
                                                <a onClick={onClickProfile.bind(base, base.public_id)} className="knd-dialog-follow-headers-nickname">{base.user.first_name}</a>
                                            </div>
                                            {/* <button className="knd-dialog-follow-headers-btn">
                                                Follow
                                            </button> */}
                                        </div>
                                    )))}
                                </div>
                            </DialogContent>
                        </Dialog>
                    )
                } else if(open.followers) {
                    return (
                        <Dialog open={open.followers} onClose={handleClickClose} fullScreen={500 > size ? true : false}>
                            <DialogTitle>
                                <div  className="knd-dialog-follow">
                                    <div className="knd-dialog-follow-title">
                                        {fields.button ? fields.button.followers : ''}
                                    </div>
                                    <button className="knd-dialog-follow-closed" onClick={handleClickClose}>
                                        <i className="fas fa-times-circle"></i>
                                    </button>
                                </div>
                            </DialogTitle>
                            <DialogContent>
                                <div className="knd-dialog-follow-content">
                                    {_.map(is_authenticate.follow_default ? is_authenticate.follow_default.followers : [], ((base, index) => (
                                        <div className="knd-dialog-follow-headers" key={index}>
                                            <div className="knd-dialog-follow-headers-group">
                                                <img src={base.avatar} className="knd-dialog-follow-headers-avatar"/>
                                                <a onClick={onClickProfile.bind(base, base.public_id)} className="knd-dialog-follow-headers-nickname">{base.user.first_name}</a>
                                            </div>
                                            {/* <button className="knd-dialog-follow-headers-btn">
                                                Followed
                                            </button> */}
                                        </div>
                                    )))}
                                </div>
                            </DialogContent>
                        </Dialog>
                    )
                }
            }
        }
    </DialogFollowContext.Consumer>
}