import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveUserSecurity } from '../../../actions/userActions'
import { ApplicationState } from '../../../configureStore'
import { FormProps } from '../../../constant/interface'

const KndChangePassword: React.FunctionComponent = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    let name = window.location.pathname
    const fields_custom = fields.button ? fields.button.change_password : ''

    if(name.split('/')[1] === "changepassword") {
        name = fields_custom
    }
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState<boolean>(false)

    const onSubmit = (e: FormProps) => {
        e.preventDefault()
        const old_pass = (document.getElementById('knd-input-change-old-password') as HTMLInputElement)
        const new_pass = (document.getElementById('knd-input-change-new-password') as HTMLInputElement)
        const con_pass = (document.getElementById('knd-input-change-confirm-password') as HTMLInputElement)
        const val_old = (document.getElementById('knd-input-change-password-old-password') as HTMLSpanElement)
        const val_new = (document.getElementById('knd-input-change-password-new-password') as HTMLSpanElement)
        const val_con = (document.getElementById('knd-input-change-password-confirm-password') as HTMLSpanElement)
        if(!old_pass.value) {
            val_old.innerHTML = fields.auth ? fields.auth.user.old_password_validate : ''
        }
        if(!new_pass.value) {
            val_new.innerHTML = fields.auth ? fields.auth.user.new_password_validate : ''
        }
        if(!con_pass.value) {
            val_con.innerHTML = fields.auth ? fields.auth.user.confirm_password_validate : ''
        }
        if(old_pass.value && new_pass.value && con_pass.value) {
            const data = {
                old_password: old_pass.value,
                password: new_pass.value,
                confirm_password: con_pass.value,
                user: localStorage.getItem('token_id').split('$')[1] as any
            }
            val_old.innerHTML = '';
            val_new.innerHTML = '';
            val_con.innerHTML = '';
            setLoading(true)
            setTimeout(() => {
                dispatch(retrieveUserSecurity(data,setLoading))
            }, 500);
        }
    }
    return (
        <div className="knd-profile-settings">
            <div className="knd-profile-settings-">
                <form onSubmit={onSubmit} className="knd-input-settings-change-password">
                    <div className="knd-input-settings-change-password-label">
                        <label htmlFor="name">{name}</label>
                    </div>
                    <div className="knd-input-settings-change-password-control">
                        <div className="knd-input-settings-change-password-field" id="knd-input-settings-change-password-field-x">
                            <div>
                                <i className="fas fa-lock"></i>
                            </div>
                            <input type="password" name="knd-input-change-old-password" id="knd-input-change-old-password" placeholder={fields.auth ? fields.auth.user.old_password : ''}/>
                        </div>
                        <span id="knd-input-change-password-old-password"></span>
                    </div>
                    <div className="knd-input-settings-change-password-f"></div>
                    <div className="knd-input-settings-change-password-control">
                        <div className="knd-input-settings-change-password-field" id="knd-input-settings-change-password-field-x">
                            <div>
                                <i className="fas fa-lock"></i>
                            </div>
                            <input type="password" name="knd-input-change-new-password" id="knd-input-change-new-password" placeholder={fields.auth ? fields.auth.user.new_password : ''}/>
                        </div>
                        <span id="knd-input-change-password-new-password"></span>
                    </div>
                    <div className="knd-input-settings-change-password-control">
                        <div className="knd-input-settings-change-password-field" id="knd-input-settings-change-password-field-x">
                            <div>
                                <i className="fas fa-lock"></i>
                            </div>
                            <input type="password" name="knd-input-change-confirm-password" id="knd-input-change-confirm-password" placeholder={fields.auth ? fields.auth.user.confirm_password : ''}/>
                        </div>
                        <span id="knd-input-change-password-confirm-password"></span>
                    </div>
                    <div className="knd-input-settings-change-password-fields">
                        <button type="submit" disabled={loading}>
                            {fields.button ? fields.button.save : ''}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default KndChangePassword