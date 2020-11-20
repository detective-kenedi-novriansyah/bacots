import { Button, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { ApplicationState } from '../../configureStore'
import { FormProps, InputProps, ResetUser } from '../../constant/interface'
import { resetUser } from '../../actions/userActions'

const ForgotScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const [state, setState] = React.useState<ResetUser>({
        token: '',
        loading: false
    })
    const onChange = (e: InputProps) : void => {
        setState({
            ...state,
            token: e.currentTarget.value
        })
    }

    const onSubmit = (e: FormProps) : void => {
        e.preventDefault()
        setState({
            ...state,
            loading: true,
        })
        setTimeout(() => {
            dispatch(resetUser(state,setState,history))
        }, 500);
    }
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const history = useHistory()

    const handleClickHistory = (newValue: string) : void => {
        history.push(newValue)
    }
    return (
        <section className="knd-x-form-x">
            <form onSubmit={onSubmit} className="knd-x-form-register">
                <div className="knd-form-x-t">
                    <div className="knd-form-x-title">
                        {fields.button ? fields.button.title_forgot : ''}
                    </div>
                    <div className="knd-form-x-child-title-forgot">
                        {fields.button ? fields.button.child_title_forgot : ''}
                    </div>
                </div>
                <div className="knd-x-form-field">
                    <i className="fas fa-user-circle"></i>
                    <input type="text" name="token" id="knd-form-token-field" className="knd-form-token-field" placeholder={fields.auth ? fields.auth.user.token : ''} value={state.token} onChange={onChange}/>
                </div>
                <div className="knd-x-form-field-button">
                    <a onClick={handleClickHistory.bind('','/signup')}>
                        {fields.button ? fields.button.create_new_account : ''}
                    </a>
                </div>
                <div className="knd-x-form-field-group">
                    <button type="submit" disabled={state.loading}>
                        {fields.button ? fields.button.submit : ''}
                    </button>
                    <a onClick={handleClickHistory.bind('','/signin')}>
                        {fields.button ? fields.button.already_account : ''}
                    </a>
                </div>
            </form>
        </section>
    )
}

export default ForgotScreen