import React from 'react'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../configureStore'
import { useHistory } from 'react-router'
import Avatar from 'antd/lib/avatar/avatar'

const Navbar: React.FunctionComponent = () => {
    const is_authenticate = useSelector((state: ApplicationState) => state.auth.is_authenticate)
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const history = useHistory()
    const handleClickHistory = (newValue: string) : void => {
        history.push(newValue)
    }
    return (
        <nav className="flex items-center py-4 px-2 shadow bg-white w-full">
            <img src={fields.button ? fields.button.logo : ''} alt="" className="w-32 h-6"/>
            <div className="flex-1"></div>
            {localStorage.getItem('token') ? (
                <button className="bg-white shadow rounded-full full py-1 px-2 w-32 flex items-center justify-center" style={{
                    outline: 'none',
                    border: 'none'
                }}>
                    <Avatar src={is_authenticate.avatar} size="small"/>
                    <a id="nickname">
                        Profile
                    </a>
                    <i className="fas fa-caret-down ml-1"></i>
                </button>
            ) : 
            <div className="flex items-center">
                <Button type="dashed" size="small" shape="round" onClick={handleClickHistory.bind('','/signin')}>
                    {fields.button ? fields.button.signin : ''}
                </Button>
                <Button type="dashed" size="small" shape="round" className="ml-2" onClick={handleClickHistory.bind('','/signup')}>
                    {fields.button ? fields.button.create_new_account : ''}
                </Button>
            </div>}
        </nav>
    )
}

export default Navbar