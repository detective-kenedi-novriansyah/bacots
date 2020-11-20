import { Dialog } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailAuth, detailFilterAuth, filterAuth } from '../../../actions/authActions'
import { ApplicationState } from '../../../configureStore'
import _ from 'lodash'
import { useHistory } from 'react-router'
import { AuthTypes } from '../../../constant/authSchma'

interface ContextProps {
    open: boolean;
    handleClickClose(e: React.MouseEvent<HTMLElement>) : void;
}

export const DialogFilterAuthContext = React.createContext<Partial<ContextProps>>({})
export const DialogFilterAuthContextApp = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const auth = useSelector((state: ApplicationState) => state.auth)
    const history = useHistory()
    const dispatch = useDispatch()
    
    const onClickDetailAuth = (newValue: string) => {
        dispatch(detailFilterAuth(newValue))
    }

    const onClickFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const data = (document.getElementById('knd-auth-filter-vector-nickname') as HTMLInputElement)
        if (data.value) {
            dispatch(filterAuth(data.value))
        }
    }

    const onClickGoToProfile = (newValue: string) => {
        dispatch(detailAuth(newValue,history))
        document.querySelector('body').style.overflow = 'auto'
        dispatch({
            type: AuthTypes.CLOSE_DRAWER,
            payload: {
                openDrawerAuth: false,
                openDialogAuth: false
            }
        })
    }

    return <DialogFilterAuthContext.Consumer>
        {
            ({open, handleClickClose}) => {
                return (
                    <Dialog open={open} onClose={handleClickClose} fullScreen>
                        <div className="knd-auth-drawer">
                            <div className="knd-auth-drawer-x">
                                <div className="knd-auth-drawer-header-x">
                                    <img src={fields.button ? fields.button.logo : ''} alt="" className="knd-auth-drawer-logo"/>
                                    <button className="knd-auth-drawer-header-x-button" onClick={handleClickClose}>
                                        <i className="fas fa-arrow-down"></i>
                                    </button>
                                </div>
                                <div className="knd-auth-drawer-x-input-filter">
                                    <input type="text" name="knd-auth-filter-vector-nickname" id="knd-auth-filter-vector-nickname" className="knd-auth-drawer-x-input" placeholder={fields.button ? fields.button.search : ''}/>
                                    <button className="knd-auth-drawer-x-button-filter" onClick={onClickFilter}>
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                                <div className="knd-auth-drawer-content">
                                    {_.map(auth.auth, ((base, index) => (
                                        <div className="knd-auth-drawer-headers" key={index}>
                                            <img src={base.avatar} alt="" className="knd-auth-drawer-avatar"/>
                                            <a onClick={onClickDetailAuth.bind(base, base.public_id)} className="knd-auth-drawer-nickname">
                                                {base.user.first_name}
                                            </a>
                                        </div>
                                    )))}
                                </div>
                            </div>
                            {auth.detail.public_id ? 
                            <div className="knd-auth-drawer-vector">
                                <img src={auth.detail.background} alt="" className="knd-auth-drawer-vector-back"/>
                                <div className="knd-auth-drawer-vector-header">
                                    <img src={auth.detail.avatar} alt="" className="knd-auth-drawer-vector-avatar"/>
                                    <a onClick={onClickGoToProfile.bind(auth.detail, auth.detail.public_id)} className="knd-auth-drawer-vector-nickname">{auth.detail.user ? auth.detail.user.first_name : ''}</a>
                                </div>
                                <div className="knd-auth-drawer-group">
                                    <div className="knd-auth-drawer-btn-xy">
                                        <span>
                                            {auth.detail.followers_count}
                                        </span>
                                        <button className="knd-auth-drawer-btn-x">
                                            {fields.button ? fields.button.followers : ''}
                                        </button>
                                    </div>
                                    <div className="knd-auth-drawer-btn-xy">
                                        <span>
                                            {auth.detail.followed_count}
                                        </span>
                                        <button className="knd-auth-drawer-btn-x">
                                            {fields.button ? fields.button.followed : ''}
                                        </button>
                                    </div>
                                </div>
                            </div> : null }
                        </div>
                    </Dialog>
                )
            }
        }
    </DialogFilterAuthContext.Consumer>
}