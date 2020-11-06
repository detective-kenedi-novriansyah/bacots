import React from 'react'
import style from 'styled-components'
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
        <nav className="py-2 bg-white shadow w-full flex items-center px-2">
            {history.location.pathname !== '/' ?
            <Button type="primary" onClick={handleClickHistory.bind('','/')} style={{
                borderRadius: '20px'
            }}>
                Back to bacot
            </Button> : null }
            <div className="flex-1"></div>
            {localStorage.getItem('token') ? (
                <Avatar src={is_authenticate.avatar} className="cursor-pointer"/>
            ) : (
                <div className="flex items-center">
                    <Button type="dashed" className="mx-2" onClick={handleClickHistory.bind('', '/signin')}>
                        {fields.button ? fields.button.signin : ''}
                    </Button>
                    <Button type="dashed" onClick={handleClickHistory.bind('','/signup')}>
                        {fields.button ? fields.button.create_new_account : ''}
                    </Button>
                </div>
            )}
        </nav>
    )
}

export default Navbar