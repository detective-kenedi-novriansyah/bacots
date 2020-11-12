import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveAuth } from '../../../../actions/authActions'
import { ApplicationState } from '../../../../configureStore'
import { FormProps } from '../../../../constant/interface'

const KndFormEditProfile: React.FunctionComponent = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    let name = window.location.pathname
    const fields_custom = fields.button ? fields.button.edit_profile : ''
    if(name.split('/')[1].toString() === 'editprofile') {
        name = fields_custom
    }
    const dispatch = useDispatch()
    const is_authenticate = useSelector((state: ApplicationState) => state.auth.is_authenticate)
    const [loading ,setLoading] = React.useState<boolean>(false)

    const onSubmit = (e: FormProps) => {
        e.preventDefault()
        const first = (document.getElementById('knd-input-first-name') as HTMLInputElement)
        const last = (document.getElementById('knd-input-last-name') as HTMLInputElement)
        const country = (document.getElementById('knd-input-country') as HTMLInputElement)
        const city = (document.getElementById('knd-input-city') as HTMLInputElement)
        const address = (document.getElementById('knd-input-address') as HTMLTextAreaElement)
        const password = (document.getElementById('knd-edit-profile-input-password') as HTMLInputElement)
        const val_password = (document.getElementById('knd-edit-profile-password') as HTMLSpanElement)
        const val_first_name = (document.getElementById('knd-edit-profile-first-name') as HTMLSpanElement)
        const val_last_name = (document.getElementById('knd-edit-profile-last-name') as HTMLSpanElement)
        if(!password.value) {
            val_password.innerHTML = fields.auth ? fields.auth.user.password_validate : ''
        }
        if(!first.value) {
            val_first_name.innerHTML = fields.auth ? fields.auth.user.first_name_validate : ''
        }
        if(!last.value) {
            val_last_name.innerHTML = fields.auth ? fields.auth.user.last_name_validate : ''
        }
        const data = new FormData()
        if(country.value) {
            data.append('country', country.value)
        }
        if(city.value) {
            data.append('city', city.value)
        }
        if(address.value) {
            data.append('address', address.value)
        }
        if(first.value && last.value && password.value) {
            setLoading(true)
            setTimeout(() => {
                data.append('first_name', first.value)
                data.append('last_name', last.value)
                data.append('password', password.value)
                val_password.innerHTML = ''
                val_first_name.innerHTML = ''
                val_last_name.innerHTML = ''
                dispatch(retrieveAuth(localStorage.getItem('token_id').split('$')[1] as any,data,setLoading))
            },500)
        }
    }
    return (
        <section className="knd-profile-settings">
            <div className="knd-profile-settings-">
                <form onSubmit={onSubmit} className="knd-profile-settings-form">
                    <div className="knd-profile-settings-form-label">
                        <label htmlFor="label">{name}</label>
                    </div>
                    <div className="knd-profile-settings-field-control">
                        <div className="knd-profile-settings-field">
                            <input type="text" name="knd-input-first-name" id="knd-input-first-name" placeholder={fields.auth ? fields.auth.user.first_name : ''} autoComplete="off" defaultValue={is_authenticate.user ? is_authenticate.user.first_name : ''}/>
                        </div>
                        <span id="knd-edit-profile-first-name"></span>
                    </div>
                    <div className="knd-profile-settings-field-control">
                        <div className="knd-profile-settings-field">
                            <input type="text" name="knd-input-last-name" id="knd-input-last-name" placeholder={fields.auth ? fields.auth.user.last_name : ''} autoComplete="off" defaultValue={is_authenticate.user ? is_authenticate.user.last_name : ''}/>
                        </div>
                        <span id="knd-edit-profile-last-name"></span>
                    </div>
                    <div className="knd-profile-settings-field"  id="knd-input-profile-settings-field-globe">
                        <div>
                            <i className="fas fa-globe-asia"></i>
                        </div>
                        <input type="text" name="knd-input-country" id="knd-input-country" placeholder={fields.auth ? fields.auth.country : ''} autoComplete="off" defaultValue={is_authenticate.user ? is_authenticate.country : ''}/>
                    </div>
                    <div className="knd-profile-settings-field" id="knd-input-profile-settings-field-city">
                        <div>
                            <i className="fas fa-city"></i>
                        </div>
                        <input type="text" name="knd-input-city" id="knd-input-city" placeholder={fields.auth ? fields.auth.city : ''} autoComplete="off" defaultValue={is_authenticate.user ? is_authenticate.city : ''}/>
                    </div>
                    <div className="knd-profile-settings-field">
                        <textarea name="knd-input-address" id="knd-input-address" className="knd-input-address" placeholder={fields.auth ? fields.auth.address : ''} autoComplete="off" defaultValue={is_authenticate.user ? is_authenticate.address : ''}></textarea>
                    </div>
                    <div className="knd-profile-settings-field-control">
                        <div className="knd-profile-settings-field" id="knd-input-profile-settings-field-lock">
                            <div>
                                <i className="fas fa-lock"></i>
                            </div>
                            <input type="password" name="knd-edit-profile-input-password" id="knd-edit-profile-input-password" placeholder={fields.auth ? fields.auth.user.password : ''} autoComplete="off"/>
                        </div>
                        <span id="knd-edit-profile-password"></span>
                    </div>
                    <div className="knd-profile-settings-field-submit">
                        <button type="submit" disabled={loading}>
                            {fields.button ? fields.button.save : ''}
                        </button>
                        <div className="knd-push"></div>
                        <div className="knd-profile-settings-field-submit-loader"></div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default KndFormEditProfile