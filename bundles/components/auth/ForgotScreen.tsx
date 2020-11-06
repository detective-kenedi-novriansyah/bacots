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
        <section id="dkwqmkdqw">
            <div id="col-1" className="flex items-center justify-center">
                <form onSubmit={onSubmit}>
                    <div className="field">
                        <div className="control">
                            <h1 id="title">
                                {fields.button ? fields.button.title_forgot : ''}
                            </h1>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <div id="content-regex">
                                <p className="font-sans text-sm">{fields.button ? fields.button.child_title_forgot : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control is-expanded">
                            <Input type="text" placeholder={fields.auth ? fields.auth.user.token : ''} name="username" id="username" autoComplete="off" value={state.token} onChange={onChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control flex items-center justify-center">
                            <Button type="dashed" htmlType="submit" loading={state.loading}>
                                {fields.button ? fields.button.forgot_button : ''}
                            </Button>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control flex items-center justify-center">
                            <Button type="link" onClick={handleClickHistory.bind('','/signin')}>
                                {fields.button ? fields.button.already_account : ''}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <div id="col" className="bg-white shadow">
                dwqdqw
            </div>
        </section>
    )
}

export default ForgotScreen