import { TextField } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { recordContent } from '../../actions/contentActions'
import { ApplicationState } from '../../configureStore'
import { RecordContent, FormProps } from '../../constant/interface'

const KndForm: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const [state, setState] = React.useState<RecordContent>({
        description: '',
        user: '',
        loading: false
    })

    const onSubmit = (e: FormProps) : void => {
        e.preventDefault()
        const user_id = localStorage.getItem('token_id').split('$')[1]
        const description = (document.getElementById('knd-home-form-bacot') as HTMLTextAreaElement)
        setState({
            ...state,
            loading: true
        })
        const data = {
            user: user_id,
            description: description.value,
            loading: false
        }
        setTimeout(() => {
            dispatch(recordContent(data,setState))
        }, 500);
    }

    return (
        <section>
            <form onSubmit={onSubmit} id="knd-home-form">
                <TextField name="make-bacot" id="knd-home-form-bacot" fullWidth rows={4} placeholder={fields.bacot ? fields.bacot.description : ''} label={fields.bacot ? fields.bacot.description : ''} multiline required/>
                <div>
                    <button id="knd-home-form-button" disabled={state.loading}>
                        <i className="fas fa-plus"></i>
                        {fields.button ? fields.button.post : ''}
                    </button>
                    <div id="knd-home-form-push"></div>
                    {state.loading ? <div id="knd-home-form-loading"></div> : null }
                </div>
            </form>
        </section>
    )
}

export default KndForm