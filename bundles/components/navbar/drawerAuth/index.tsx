import { Drawer } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../configureStore'
import _ from 'lodash'
import { detailFilterAuth } from '../../../actions/authActions'

interface ContextProps {
    open: boolean;
    handleClickClose(e: React.MouseEvent<HTMLElement>) : void;
}

export const DrawerAuthContext = React.createContext<Partial<ContextProps>>({})
export const DrawerAuthContextApp = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const auth = useSelector((state: ApplicationState) => state.auth)
    const dispatch = useDispatch()
    const handleClickFake = () => {}
    
    const onClickDetailAuth = (newValue: string) => {
        dispatch(detailFilterAuth(newValue))
    }

    return <DrawerAuthContext.Consumer>
        {
            ({open, handleClickClose}) => {
                return (
                    <Drawer open={open} onClose={handleClickFake} variant="persistent" anchor="bottom">
                        <div className="knd-auth-drawer">
                            <div className="knd-auth-drawer-x">
                                <div className="knd-auth-drawer-header-x">
                                    <img src={fields.button ? fields.button.logo : ''} alt="" className="knd-auth-drawer-logo"/>
                                    <button className="knd-auth-drawer-header-x-button" onClick={handleClickClose}>
                                        <i className="fas fa-arrow-down"></i>
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
                                    <a href="" className="knd-auth-drawer-vector-nickname">{auth.detail.user ? auth.detail.user.first_name : ''}</a>
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
                    </Drawer>
                )
            }
        }
    </DrawerAuthContext.Consumer>
}