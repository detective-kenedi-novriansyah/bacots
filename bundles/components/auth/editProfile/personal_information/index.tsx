import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotUser, retrieveUserUsernameAndEmail } from '../../../../actions/userActions'
import { ApplicationState } from '../../../../configureStore'
import { FormProps } from '../../../../constant/interface'

const KndPersonalInformation: React.FunctionComponent = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    let name = window.location.pathname
    const fields_custom = fields.button ? fields.button.personal_information : ''
    if(name.split('/')[1] === 'personalinformation') {
        name = fields_custom
    }
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState<boolean>(false)

    const onSubmit = (e: FormProps) => {
        e.preventDefault()
        const username = (document.getElementById('knd-input-settings-username') as HTMLInputElement)
        const email = (document.getElementById('knd-input-settings-email') as HTMLInputElement)
        const password = (document.getElementById('knd-input-password-change-email') as HTMLInputElement)
        const val_us = (document.getElementById('val-us') as HTMLSpanElement)
        const val_em = (document.getElementById('val-em') as HTMLSpanElement)
        const val_pwd = (document.getElementById('val-pwd') as HTMLInputElement)
        if(!username.value && !email.value) {
            val_us.innerHTML = fields.auth ? fields.auth.user.username_validate : ''
            val_em.innerHTML = fields.auth ? fields.auth.user.email_validate : ''
        } else {
            val_us.innerHTML = ''
            val_em.innerHTML = ''
        }
        if(!password.value) {
            val_pwd.innerHTML = fields.auth ? fields.auth.user.password_validate : ''
        } else {
            val_pwd.innerHTML = ''
            if(username.value || email.value) {
                setLoading(true)
                let data: any;
                if(username.value && email.value) {
                    data = {
                        username: username.value,
                        email: email.value,
                        password: password.value,
                        id: localStorage.getItem('token_id').split('$')[1] as any
                    }
                } else if(username.value) {
                    data = {
                        username: username.value,
                        password: password.value,
                        id: localStorage.getItem('token_id').split('$')[1] as any
                    }
                } else if(email.value) {
                    data = {
                        email: email.value,
                        password: password.value,
                        id: localStorage.getItem('token_id').split('$')[1] as any
                    }
                }
                setTimeout(() => {
                    dispatch(retrieveUserUsernameAndEmail(data,setLoading))
                }, 500);
            }
        }
    }

    const onClickForgotUser = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        dispatch(forgotUser(localStorage.getItem('token_id').split('$')[1] as any,setLoading))
    }
    return (
        <div className="knd-profile-settings">
            <div className="knd-profile-settings-">
                <form onSubmit={onSubmit} className="knd-form-profile-settings-change-email">
                    <div className="knd-profile-settings-change-email-label">
                        <label htmlFor="label">{name}</label>
                    </div>
                    <div className="knd-input-profile-settings-change-email-field-control">
                        <div className="knd-input-profile-settings-change-email-field" id="knd-input-profile-change-email-field-x">
                            <div>
                                <i className="fas fa-user-circle"></i>
                            </div>
                            <input type="text" name="knd-input-settings-username" id="knd-input-settings-username" placeholder={fields.auth ? fields.auth.user.username : ''} autoComplete="off"/>
                        </div>
                        <span id="val-us"></span>
                    </div>
                    <div className="knd-input-profile-settings-change-email-field-control">
                        <div className="knd-input-profile-settings-change-email-field" id="knd-input-profile-change-email-field-x">
                            <div>
                                <i className="fas fa-envelope"></i>
                            </div>
                            <input type="email" name="knd-input-settings-email" id="knd-input-settings-email" placeholder={fields.auth ? fields.auth.user.email : ''} autoComplete="off"/>
                        </div>
                        <span id="val-em"></span>
                    </div>
                    <div className="knd-input-profile-settings-change-email-field-control">
                        <a onClick={onClickForgotUser}>
                            {fields.button ? fields.button.forgot_user : ''}
                        </a>
                    </div>
                    <div className="knd-input-profile-change-email-f"></div>
                    <div className="knd-input-profile-settings-change-email-field-control">
                        <div className="knd-input-profile-settings-change-email-field" id="knd-input-profile-change-password">
                            <div>
                                <i className="fas fa-lock"></i>
                            </div>
                            <input type="password" name="knd-input-password-change-email" id="knd-input-password-change-email" placeholder={fields.auth ? fields.auth.user.password : ''} autoComplete="off"/>
                        </div>
                        <span id="val-pwd"></span>
                    </div>
                    <div className="knd-input-profile-settings-change-email-fields">
                        <button disabled={loading} type="submit">
                            {fields.button ? fields.button.save : ''}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default KndPersonalInformation